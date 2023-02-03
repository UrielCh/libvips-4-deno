import { BUFFER, CONSTRUCTOR, DEREGISTER, DISPOSE, POINTER, REGISTER } from "./common.ts";
import { CXCodeCompleteResults } from "./CXCodeCompleteResults.ts";
import { CXDiagnostic } from "./CXDiagnostic.ts";
import { CXDiagnosticSet } from "./CXDiagnosticSet.ts";
import { CXFile } from "./CXFile.ts";
import { CXModule } from "./CXModule.ts";
import { CXRewriter } from "./CXRewriter.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { CXSourceRangeList } from "./CXSourceRangeList.ts";
import { CXToken } from "./CXToken.ts";
import { CXTUResourceUsage } from "./CXTUResourceUsage.ts";
import { libclang } from "./ffi.ts";
import { GLOBAL } from "./global.ts";
import { CXCodeComplete_Flags, CXInclusionVisitorCallbackDefinition, CXReparse_Flags, CXResult, CXSaveError, CXVisitorResult } from "./include/typeDefinitions.ts";
import { Dependent, DependentsSet, TargetInfo, UnsavedFile } from "./interface.ts";
import { CXCursor, CX_CURSOR_AND_RANGE_VISITOR_CALLBACK } from "./rest.ts";
import { cstr, cxstringToString, NULL, NULLBUF, throwIfError } from "./utils.ts";

const OUT = new Uint8Array(16);
const OUT_64 = new BigUint64Array(OUT.buffer);

let CURRENT_INCLUSION_VISITOR_CALLBACK: (
    includedFile: CXFile,
    inclusionStack: CXSourceLocation[],
) => void = () => {
    throw new Error("Invalid CXInclusionVisitor callback");
};
const CX_INCLUSION_VISITOR_CALLBACK = new Deno.UnsafeCallback(
    CXInclusionVisitorCallbackDefinition,
    (includedFilePointer, inclusionStackPointer, includeLength, _clientData) => {
        const tu = GLOBAL.CURRENT_TU!;
        const includedFile = CXFile[CONSTRUCTOR](tu, includedFilePointer);
        const inclusionStack: CXSourceLocation[] = [];
        for (let i = 0; i < includeLength; i++) {
            inclusionStack.push(
                CXSourceLocation[CONSTRUCTOR](
                    tu,
                    new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(
                        inclusionStackPointer,
                        3 * 8,
                        i * 3 * 8,
                    )),
                ),
            );
        }
        CURRENT_INCLUSION_VISITOR_CALLBACK(
            includedFile,
            inclusionStack,
        );
    },
);


const TU_FINALIZATION_REGISTRY = new FinalizationRegistry<Deno.PointerValue>(
    (tuPointer) => libclang.symbols.clang_disposeTranslationUnit(tuPointer),
);
/**
 * A single translation unit, which resides in a {@link CXIndex}.
 */
export class CXTranslationUnit {
    static #constructable = false;
    #dependents: DependentsSet = new Set();
    #pointer: Deno.PointerValue;
    #disposed = false;
    #suspended = false;

    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(pointer: Deno.PointerValue) {
        if (!CXTranslationUnit.#constructable) {
            throw new Error("CXTranslationUnit is not constructable");
        }
        this.#pointer = pointer;
        TU_FINALIZATION_REGISTRY.register(this, pointer, this);
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](pointer: Deno.PointerValue): CXTranslationUnit {
        CXTranslationUnit.#constructable = true;
        const result = new CXTranslationUnit(pointer);
        CXTranslationUnit.#constructable = false;
        return result;
    }

    get [POINTER](): Deno.PointerValue {
        return this.#pointer;
    }

    /**
     * Saves the translation unit into a serialized representation of
     * that translation unit on disk. An error will be thrown if the saving failed.
     *
     * Any translation unit that was parsed without error can be saved
     * into a file. The translation unit can then be deserialized into a
     * new {@link CXTranslationUnit} with {@link CXIndex#createTranslationUnit} or,
     * if it is an incomplete translation unit that corresponds to a
     * header, used as a precompiled header when parsing other translation
     * units.
     *
     * @param fileName The file to which the translation unit will be saved.
     */
    save(
        fileName: string,
        options: number = libclang.symbols.clang_defaultSaveOptions(this.#pointer),
    ): void {
        if (this.#disposed) {
            throw new Error("Cannot save disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot save suspended CXTranslationUnit");
        }
        const saveFileName = cstr(fileName);
        const result = libclang.symbols.clang_saveTranslationUnit(
            this.#pointer,
            saveFileName,
            options,
        );
        if (result === CXSaveError.CXSaveError_InvalidTU) {
            throw new Error(
                "Saving CXTranslationUnit failed: Invalid CXTranslationUnit",
                { cause: result },
            );
        } else if (result === CXSaveError.CXSaveError_Unknown) {
            throw new Error(
                "Saving CXTranslationUnit failed: Unknown error occurred",
                { cause: result },
            );
        } else if (result === CXSaveError.CXSaveError_TranslationErrors) {
            throw new Error(
                "Saving CXTranslationUnit failed: Unit contains translation errors",
                { cause: result },
            );
        } else if (result !== 0) {
            throw new Error("Saving CXTranslationUnit failed: Unkown error code", {
                cause: result,
            });
        }
    }

    /**
     * Suspend the translation unit in order to free memory associated with it.
     *
     * A suspended translation unit uses significantly less memory but on the other
     * side does not support any other calls than {@link reparse} to resume it or
     * {@link dispose} to dispose it completely.
     *
     * Any {@link CXCursor}s, {@link CXSourceLocation}s, {@link CXSourceRange}s etc.
     * created from the translation unit will become invalid upon suspending.
     */
    suspend(): number {
        if (this.#disposed) {
            throw new Error("Cannot suspend disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot suspend suspended CXTranslationUnit");
        }
        return libclang.symbols.clang_suspendTranslationUnit(this.#pointer);
    }

    /**
     * Reparse the source files that produced this translation unit. This can
     * only be called on a translation unit that was originally built from source
     * files. An error based on the `CXErrorCode` is thrown if reparsing failed.
     * If an error is thrown, then the translation unit can no longer be used for
     * anything.
     *
     * This routine can be used to re-parse the source files that originally
     * created the translation unit, for example because those source files
     * have changed (either on disk or as passed via `unsavedFiles`). The
     * source code will be reparsed with the same command-line options as it
     * was originally parsed.
     *
     * Reparsing a translation unit invalidates all cursors and source locations
     * that refer into that translation unit. This makes reparsing a translation
     * unit semantically equivalent to destroying the translation unit and then
     * creating a new translation unit with the same command-line arguments.
     * However, it may be more efficient to reparse a translation
     * unit using this routine.
     *
     * @param options A bitset of options composed of the flags in CXReparse_Flags.
     * A default set of options recommended for most uses based on the translation unit
     * is used as a default.
     */
    reparse(
        unsavedFiles: UnsavedFile[] = [],
        options: CXReparse_Flags = libclang.symbols.clang_defaultReparseOptions(
            this.#pointer,
        ),
    ): void {
        if (this.#disposed) {
            throw new Error("Cannot reparse disposed CXTranslationUnit");
        }

        const unsavedFilesCount = unsavedFiles.length;
        const unsavedFilesBuffer: Uint8Array = unsavedFilesCount
            ? new Uint8Array(24 * unsavedFilesCount)
            : NULLBUF;
        let nameBuffers: undefined | Uint8Array[];
        if (unsavedFilesCount) {
            const unsavedFiles64 = new BigUint64Array(unsavedFilesBuffer.buffer);
            nameBuffers = Array.from({ length: unsavedFilesCount });
            for (let i = 0; i < unsavedFilesCount; i++) {
                const unsavedFile = unsavedFiles[i];
                nameBuffers[i] = cstr(unsavedFile.filename);
                unsavedFiles64[i * 3] = BigInt(Deno.UnsafePointer.of(nameBuffers[i]));
                unsavedFiles64[i * 3 + 1] = BigInt(
                    Deno.UnsafePointer.of(unsavedFile.contents),
                );
                unsavedFiles64[i * 3 + 2] = BigInt(unsavedFile.contents.length);
            }
        }

        const result = libclang.symbols.clang_reparseTranslationUnit(
            this.#pointer,
            unsavedFilesCount,
            unsavedFilesBuffer,
            options,
        );
        throwIfError(result, "Reparsing CXTranslationUnit failed");
        this.#suspended = false;
    }

    /**
     * Get the original translation unit source file name.
     */
    getSpelling(): string {
        return cxstringToString(
            libclang.symbols.clang_getTranslationUnitSpelling(this.#pointer),
        );
    }

    /**
     * Get target information for this translation unit.
     */
    getTargetInfo(): TargetInfo {
        if (this.#disposed) {
            throw new Error("Cannot get TargetInfo of disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot get TargetInfo of suspended CXTranslationUnit");
        }
        const targetInfo = libclang.symbols.clang_getTranslationUnitTargetInfo(
            this.#pointer,
        );
        const pointerWidth = libclang.symbols.clang_TargetInfo_getPointerWidth(
            targetInfo,
        );
        const tripleCXString = libclang.symbols.clang_TargetInfo_getTriple(
            targetInfo,
        );
        libclang.symbols.clang_TargetInfo_dispose(targetInfo);
        const triple = cxstringToString(tripleCXString);
        if (pointerWidth === -1 || triple.length === 0) {
            throw new Error("Getting TargetInfo failed: Unknown error occurred");
        }
        return {
            triple,
            pointerWidth,
        };
    }

    /**
     * Retrieve all ranges from all files that were skipped by the
     * preprocessor.
     *
     * The preprocessor will skip lines when they are surrounded by an
     * if/ifdef/ifndef directive whose condition does not evaluate to true.
     */
    getAllSkippedRanges(): null | CXSourceRangeList {
        if (this.#disposed) {
            throw new Error(
                "Cannot get skipped ranges of disposed CXTranslationUnit",
            );
        } else if (this.#suspended) {
            throw new Error(
                "Cannot get skipped ranges of suspended CXTranslationUnit",
            );
        }
        const listPointer = libclang.symbols.clang_getAllSkippedRanges(
            this.#pointer,
        );
        const view = new Deno.UnsafePointerView(listPointer);
        const count = view.getUint32();
        if (count === 0) {
            libclang.symbols.clang_disposeSourceRangeList(listPointer);
            return null;
        }
        const rangesPointer = Number(view.getBigUint64(8));
        return CXSourceRangeList[CONSTRUCTOR](
            this,
            listPointer,
            rangesPointer,
            count,
        );
    }

    /**
     * Retrieve a diagnostic by index of the translation unit.
     *
     * @param index the zero-based diagnostic number to retrieve.
     */
    getDiagnostic(index: number): CXDiagnostic {
        if (this.#disposed) {
            throw new Error("Cannot get diagnostic of disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot get diagnostic of suspended CXTranslationUnit");
        } else if (index < 0) {
            throw new Error("Invalid argument, index must be unsigned integer");
        }
        const diagnostic = libclang.symbols.clang_getDiagnostic(
            this.#pointer,
            index,
        );
        return CXDiagnostic[CONSTRUCTOR](this, diagnostic);
    }

    /**
     * Retrieve the complete set of diagnostics associated with a
     * translation unit.
     */
    getDiagnosticSet(): CXDiagnosticSet {
        if (this.#disposed) {
            throw new Error(
                "Cannot get diagnostic set of disposed CXTranslationUnit",
            );
        } else if (this.#suspended) {
            throw new Error(
                "Cannot get diagnostic set of suspended CXTranslationUnit",
            );
        }
        return CXDiagnosticSet[CONSTRUCTOR](
            this,
            libclang.symbols.clang_getDiagnosticSetFromTU(this.#pointer),
        );
    }

    /**
     * Retrieve a file handle within the translation unit.
     *
     * @param fileName The name of the file.
     * @returns The `CXFile` for the named file in the translation unit `tu,` or `null` if the file was not a part of this translation unit.
     */
    getFile(fileName: string): null | CXFile {
        if (this.#disposed) {
            throw new Error("Cannot get file from disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot get file from suspended CXTranslationUnit");
        }
        const file_name = cstr(fileName);
        const handle = libclang.symbols.clang_getFile(this.#pointer, file_name);
        if (handle === NULL) {
            return null;
        }
        const file = CXFile[CONSTRUCTOR](this, handle);
        return file;
    }

    /**
     * Determine the number of diagnostics produced for the given
     * translation unit.
     */
    getNumberOfDiagnostics(): number {
        if (this.#disposed) {
            throw new Error(
                "Cannot get number of diagnostics from disposed CXTranslationUnit",
            );
        } else if (this.#suspended) {
            throw new Error(
                "Cannot get number of diagnostics from suspended CXTranslationUnit",
            );
        }
        return libclang.symbols.clang_getNumDiagnostics(this.#pointer);
    }

    /**
     * Retrieve the cursor that represents the translation unit.
     *
     * The translation unit cursor can be used to start traversing the
     * various declarations within the given translation unit.
     *
     * @returns A {@link CXCursor} representing the translation unit.
     */
    getCursor(): CXCursor;
    /**
     * Map a source location to the cursor that describes the entity at that
     * location in the source code.
     *
     * {@link getCursor()} maps an arbitrary source location within a translation
     * unit down to the most specific cursor that describes the entity at that
     * location. For example, given an expression `x + y`, invoking
     * {@link getCursor()} with a source location pointing to "x" will return the
     * cursor for "x"; similarly for "y". If the cursor points anywhere between
     * "x" or "y" (e.g., on the + or the whitespace around it), {@link getCursor()}
     * will return a cursor referring to the "+" expression.
     *
     * @param sourceLocation A {@link CXSourceLocation} pointing to a location in the source code.
     *
     * @returns A {@link CXCursor} representing the entity at the given source location, or
     * `null` if no such entity can be found.
     */
    getCursor(sourceLocation: CXSourceLocation): CXCursor | null;
    getCursor(
        sourceLocation?: CXSourceLocation,
    ) {
        if (this.#disposed) {
            throw new Error("Cannot get cursor from disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot get cursor from suspended CXTranslationUnit");
        }
        let cursor: Uint8Array;

        if (sourceLocation) {
            cursor = libclang.symbols.clang_getCursor(
                this.#pointer,
                sourceLocation[BUFFER],
            );
            if (sourceLocation && libclang.symbols.clang_Cursor_isNull(cursor)) {
                return null;
            }
        } else {
            cursor = libclang.symbols.clang_getTranslationUnitCursor(
                this.#pointer,
            );
        }
        return CXCursor[CONSTRUCTOR](this, cursor);
    }

    /**
     * Get the memory usage of the translation unit as a {@link CXTUResourceUsage} object.
     */
    getResourceUsage(): CXTUResourceUsage {
        if (this.#disposed) {
            throw new Error(
                "Cannot get resource usage of disposed CXTranslationUnit",
            );
        } else if (this.#suspended) {
            throw new Error(
                "Cannot get resoure usage of suspended CXTranslationUnit",
            );
        }
        const resourceUsage = CXTUResourceUsage[CONSTRUCTOR](
            libclang.symbols.clang_getCXTUResourceUsage(this.#pointer),
        );
        return resourceUsage;
    }

    /**
     * Create a {@link CXRewriter} in the translation unit.
     */
    createRewriter(): CXRewriter {
        return CXRewriter[CONSTRUCTOR](
            this,
            libclang.symbols.clang_CXRewriter_create(this.#pointer),
        );
    }

    /**
     * Annotate the given set of tokens by providing cursors for each token
     * that can be mapped to a specific entity within the abstract syntax tree.
     *
     * This token-annotation routine is equivalent to invoking
     * {@link getCursor()} for the source locations of each of the
     * tokens. The cursors provided are filtered, so that only those
     * cursors that have a direct correspondence to the token are
     * accepted. For example, given a function call `f(x)`, {@link getCursor()}
     * would provide the following cursors:
     *
     * * when the cursor is over the 'f', a `DeclRefExpr` cursor referring to 'f'.
     * * when the cursor is over the '(' or the ')', a `CallExpr` referring to 'f'.
     * * when the cursor is over the 'x', a `DeclRefExpr` cursor referring to 'x'.
     *
     * Only the first and last of these cursors will occur within the
     * annotate, since the tokens "f" and "x' directly refer to a function
     * and a variable, respectively, but the parentheses are just a small
     * part of the full syntax of the function call expression, which is
     * not provided as an annotation.
     *
     * @param tokens The set of tokens to annotate.
     * @returns An array of {@link CXCursor}s.
     */
    annotateTokens(tokens: CXToken[]): CXCursor[] {
        if (this.#disposed) {
            throw new Error("Cannot annotate tokens of disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot annotate tokens of suspended CXTranslationUnit");
        }
        const tokenArray = new Uint8Array(8 * 3 * tokens.length);
        tokens.forEach((token, index) => {
            tokenArray.set(token[BUFFER], 8 * 3 * index);
        });
        const cursorArray = new Uint8Array(8 * 4 * tokens.length);
        libclang.symbols.clang_annotateTokens(
            this.#pointer,
            tokenArray,
            tokens.length,
            cursorArray,
        );
        return Array.from({ length: tokens.length }, (_, index) => {
            const offset = 8 * 4 * index;
            return CXCursor[CONSTRUCTOR](
                this,
                cursorArray.subarray(offset, offset + 8 * 4),
            )!;
        });
    }

    /**
     * Get the raw lexical token starting with the given location.
     *
     * @param location The source location at which the token starts.
     * @returns The {@link CXToken} starting with the given location or `null` if no such token
     * exist.
     */
    getToken(location: CXSourceLocation): null | CXToken {
        if (this.#disposed) {
            throw new Error("Cannot get token from disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot get token from suspended CXTranslationUnit");
        }
        const tokenPointer = libclang.symbols.clang_getToken(
            this.#pointer,
            location[BUFFER],
        );
        if (tokenPointer === NULL) {
            return null;
        }
        return CXToken[CONSTRUCTOR](
            this,
            tokenPointer,
            new Uint8Array(
                Deno.UnsafePointerView.getArrayBuffer(tokenPointer, 8 * 3),
            ),
        );
    }

    /**
     * Tokenize the source code described by the given range into raw
     * lexical tokens.
     *
     * @param range The {@link CXSourceRange} in which text should be tokenized. All of the
     * tokens produced by tokenization will fall within this source range.
     *
     * @returns An array of {@link CXToken}s.
     */
    tokenize(range: CXSourceRange): CXToken[] {
        if (this.#disposed) {
            throw new Error("Cannot tokenize disposed CXTranslationUnit");
        } else if (this.#suspended) {
            throw new Error("Cannot tokenize suspended CXTranslationUnit");
        }
        libclang.symbols.clang_tokenize(
            this.#pointer,
            range[BUFFER],
            OUT,
            OUT.subarray(8),
        );
        const tokensPointer = Number(OUT_64[0]);
        const numTokens = new Uint32Array(OUT.buffer, 8, 1)[0];
        return Array.from({ length: numTokens }, (_, index) => {
            const tokenBuffer = new Uint8Array(
                Deno.UnsafePointerView.getArrayBuffer(
                    tokensPointer,
                    8 * 3,
                    8 * 3 * index,
                ),
            );
            return CXToken[CONSTRUCTOR](this, tokensPointer, tokenBuffer);
        });
    }

    /**
     * Returns the set of flags that is suitable for saving a translation
     * unit.
     *
     * The set of flags returned provide options for {@link save()} by
     * default. The returned flag set contains an unspecified set
     * of options that save translation units with the most
     * commonly-requested data.
     */
    defaultSaveOptions(): number {
        return libclang.symbols.clang_defaultSaveOptions(this.#pointer);
    }

    /**
     * Given a {@link CXFile} header file, return the {@link CXModule} that
     * contains it if one exists, or `null` otherwise.
     */
    getModuleForFile(file: CXFile): null | CXModule {
        const result = libclang.symbols.clang_getModuleForFile(
            this.#pointer,
            file[POINTER],
        );
        if (result === NULL) {
            return null;
        }
        return CXModule[CONSTRUCTOR](this, result);
    }

    /**
     * Visit the set of preprocessor inclusions in this translation unit.
     * The callback is called for every included file. This does not
     * include headers included by the PCH file (unless one is inspecting
     * the inclusions in the PCH file itself).
     */
    getInclusions(
        callback: (file: CXFile, inclusionStack: CXSourceLocation[]) => void,
    ): void {
        const savedTu = GLOBAL.CURRENT_TU;
        const savedCallback = CURRENT_INCLUSION_VISITOR_CALLBACK;
        GLOBAL.CURRENT_TU = this;
        CURRENT_INCLUSION_VISITOR_CALLBACK = callback;
        try {
            libclang.symbols.clang_getInclusions(
                this.#pointer,
                CX_INCLUSION_VISITOR_CALLBACK.pointer,
                NULL,
            );
        } finally {
            GLOBAL.CURRENT_TU = savedTu;
            CURRENT_INCLUSION_VISITOR_CALLBACK = savedCallback;
        }
    }

    /**
     * Find #import/#include directives in a specific file.
     *
     * @param file The {@link CXFile} to search #import/#include directives in.
     * @param callback Callback that will receive pairs of {@link CXCursor}/{@link CXSourceRange} for
     * each directive found.
     * @returns One of the {@link CXResult} values.
     */
    findIncludesInFile(
        file: CXFile,
        callback: (cursor: CXCursor, sourceRange: CXSourceRange) => CXVisitorResult,
    ): CXResult {
        const savedTu = GLOBAL.CURRENT_TU;
        const savedCallback = GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK;
        GLOBAL.CURRENT_TU = this;
        // @ts-expect-error The sourceRange is guaranteed to be non-null.
        CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK = callback;
        OUT_64[1] = BigInt(CX_CURSOR_AND_RANGE_VISITOR_CALLBACK.pointer);
        try {
            const result = libclang.symbols.clang_findIncludesInFile(
                this.#pointer,
                file[POINTER],
                OUT.subarray(0, 16),
            );
            return result;
        } finally {
            GLOBAL.CURRENT_TU = savedTu;
            GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK = savedCallback;
        }
    }

    /**
     * Perform code completion at a given location in this translation unit.
     *
     * This function performs code completion at a particular file, line, and
     * column within source code, providing results that suggest potential
     * code snippets based on the context of the completion. The basic model
     * for code completion is that Clang will parse a complete source file,
     * performing syntax checking up to the location where code-completion has
     * been requested. At that point, a special code-completion token is passed
     * to the parser, which recognizes this token and determines, based on the
     * current location in the C/Objective-C/C++ grammar and the state of
     * semantic analysis, what completions to provide. These completions are
     * returned via a new {@link CXCodeCompleteResults} structure.
     *
     * Code completion itself is meant to be triggered by the client when the
     * user types punctuation characters or whitespace, at which point the
     * code-completion location will coincide with the cursor. For example,
     * if `p` is a pointer, code-completion might be triggered after the "-" and then
     * after the ">" in `p->`. When the code-completion location is after the ">",
     * the completion results will provide, e.g., the members of the struct that
     * "p" points to. The client is responsible for placing the cursor at the
     * beginning of the token currently being typed, then filtering the results
     * based on the contents of the token. For example, when code-completing for
     * the expression `p->get`, the client should provide the location just after
     * the ">" (e.g., pointing at the "g") to this code-completion hook. Then, the
     * client can filter the results based on the current token text ("get"), only
     * showing those results that start with "get". The intent of this interface
     * is to separate the relatively high-latency acquisition of code-completion
     * results from the filtering of results on a per-character basis, which must
     * have a lower latency.
     *
     * The source files for this translation unit need not be
     * completely up-to-date (and the contents of those source files may
     * be overridden via `unsavedFiles`). {@link CXCursor}s referring into this
     * translation unit may be invalidated by this invocation.
     *
     * @param fileName The name of the source file where code
     * completion should be performed. This filename may be any file
     * included in the translation unit.
     * @param line The line at which code-completion should occur.
     * @param column The column at which code-completion should occur.
     * Note that the column should point just after the syntactic construct that
     * initiated code completion, and not in the middle of a lexical token.
     * @param [unsavedFiles] The files that have not yet been saved to disk
     * but may be required for parsing or code completion, including the
     * contents of those files.
     * @param [flags] Extra options that control the behavior of code
     * completion, passed as an array of values of the
     * {@link CXCodeComplete_Flags} enumeration.
     * {@link defaultCodeCompleteFlags()} static method returns the default set
     * of code-completion options.
     * @returns If successful, a new {@link CXCodeCompleteResults} structure
     * containing code-completion results. If code completion fails, returns `null`.
     */
    codeCompleteAt(
        fileName: string,
        line: number,
        column: number,
        unsavedFiles: UnsavedFile[] = [],
        flags: CXCodeComplete_Flags[],
    ): CXCodeCompleteResults | null {
        const options: number = flags
            ? flags.reduce((acc, flag) => acc | flag, 0)
            : libclang.symbols.clang_defaultCodeCompleteOptions();

        const unsavedFilesCount = unsavedFiles.length;
        const unsavedFilesBuffer: Uint8Array = unsavedFilesCount
            ? new Uint8Array(24 * unsavedFilesCount)
            : NULLBUF;
        let nameBuffers: undefined | Uint8Array[];
        if (unsavedFilesCount) {
            const unsavedFiles64 = new BigUint64Array(unsavedFilesBuffer.buffer);
            nameBuffers = Array.from({ length: unsavedFilesCount });
            for (let i = 0; i < unsavedFilesCount; i++) {
                const unsavedFile = unsavedFiles[i];
                nameBuffers[i] = cstr(unsavedFile.filename);
                unsavedFiles64[i * 3] = BigInt(Deno.UnsafePointer.of(nameBuffers[i]));
                unsavedFiles64[i * 3 + 1] = BigInt(
                    Deno.UnsafePointer.of(unsavedFile.contents),
                );
                unsavedFiles64[i * 3 + 2] = BigInt(unsavedFile.contents.length);
            }
        }

        const result = libclang.symbols.clang_codeCompleteAt(
            this.#pointer,
            cstr(fileName),
            line,
            column,
            unsavedFilesBuffer,
            unsavedFilesCount,
            options,
        );
        if (result === NULL) {
            return null;
        }

        return CXCodeCompleteResults[CONSTRUCTOR](this, result);
    }

    /**
     * Returns a default set of code-completion options that can be
     * passed to {@link codeCompleteAt()}.
     */
    static defaultCodeCompleteFlags(): CXCodeComplete_Flags[] {
        const options = libclang.symbols.clang_defaultCodeCompleteOptions();
        const flags: CXCodeComplete_Flags[] = [];
        if (
            (options & CXCodeComplete_Flags.CXCodeComplete_IncludeMacros) ===
            CXCodeComplete_Flags.CXCodeComplete_IncludeMacros
        ) {
            flags.push(CXCodeComplete_Flags.CXCodeComplete_IncludeMacros);
        }
        if (
            (options & CXCodeComplete_Flags.CXCodeComplete_IncludeCodePatterns) ===
            CXCodeComplete_Flags.CXCodeComplete_IncludeCodePatterns
        ) {
            flags.push(CXCodeComplete_Flags.CXCodeComplete_IncludeCodePatterns);
        }
        if (
            (options & CXCodeComplete_Flags.CXCodeComplete_IncludeBriefComments) ===
            CXCodeComplete_Flags.CXCodeComplete_IncludeBriefComments
        ) {
            flags.push(CXCodeComplete_Flags.CXCodeComplete_IncludeBriefComments);
        }
        if (
            (options & CXCodeComplete_Flags.CXCodeComplete_SkipPreamble) ===
            CXCodeComplete_Flags.CXCodeComplete_SkipPreamble
        ) {
            flags.push(CXCodeComplete_Flags.CXCodeComplete_SkipPreamble);
        }
        if (
            (options &
                CXCodeComplete_Flags.CXCodeComplete_IncludeCompletionsWithFixIts) ===
            CXCodeComplete_Flags.CXCodeComplete_IncludeCompletionsWithFixIts
        ) {
            flags.push(
                CXCodeComplete_Flags.CXCodeComplete_IncludeCompletionsWithFixIts,
            );
        }
        return flags;
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    [REGISTER](dependent: Dependent) {
        this.#dependents.add(new WeakRef(dependent));
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    [DEREGISTER](dependent: Dependent) {
        for (const weakRef of this.#dependents) {
            if (weakRef.deref() == dependent) {
                this.#dependents.delete(weakRef);
                return;
            }
        }
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    [DISPOSE](): void {
        for (const dependent of this.#dependents) {
            const dep = dependent.deref();
            if (dep && typeof dep[DISPOSE] === "function") {
                dep[DISPOSE]();
            }
        }
        this.#dependents.clear();
        this.#disposed = true;
        libclang.symbols.clang_disposeTranslationUnit(this.#pointer);
        // Manually disposed: unregister from FinalizationRegistry.
        TU_FINALIZATION_REGISTRY.unregister(this);
    }

    /**
     * Destroy the {@link CXTranslationUnit} object.
     *
     * This will mark all dependent objects (eg. {@link CXCursor},
     * {@link CXTUResourceUsage}) disposed as well as
     * using those is no longer safe. However, this marking
     * is not yet fully implemented and should not be relied on.
     *
     * It is not strictly necessary to call this method, the memory
     * will be released as part of JavaScript garbage collection.
     */
    dispose(): void {
        if (this.#disposed) {
            return;
        }
        this[DISPOSE]();
    }
}
