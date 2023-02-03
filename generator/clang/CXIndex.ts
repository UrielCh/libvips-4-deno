import { CONSTRUCTOR } from "./common.ts";
import { CXIndexAction } from "./CXIndexAction.ts";
import { libclang } from "./ffi.ts";
import { CXErrorCode, CXGlobalOptFlags, CXReparse_Flags, CXTranslationUnit_Flags } from "./include/typeDefinitions.ts";
import { GlobalOptions } from "./interface.ts";
import { CXTranslationUnit } from "./rest.ts";
import { cstr, CStringArray, NULL, NULLBUF, throwIfError } from "./utils.ts";

const OUT = new Uint8Array(16);
const OUT_64 = new BigUint64Array(OUT.buffer);

const INDEX_FINALIZATION_REGISTRY = new FinalizationRegistry<Deno.PointerValue>(
    (pointer) => libclang.symbols.clang_disposeIndex(pointer),
  );
  /**
   * An "index" that consists of a set of translation units that would
   * typically be linked together into an executable or library.
   */
  export class CXIndex {
    #pointer: Deno.PointerValue;
    #disposed = false;
  
    translationUnits = new Map<string, CXTranslationUnit>();
  
    constructor(excludeDeclarationsFromPCH = false, displayDiagnostics = false) {
      this.#pointer = libclang.symbols.clang_createIndex(
        Number(excludeDeclarationsFromPCH),
        Number(displayDiagnostics),
      );
      if (this.#pointer === NULL) {
        throw new Error("Creating CXIndex failed: Unknown error occurred");
      }
      INDEX_FINALIZATION_REGISTRY.register(this, this.#pointer, this);
    }
  
    /**
     * Gets the general options associated with a CXIndex.
     *
     * @returns Object of options associated with the given CXIndex object.
     */
    get options(): GlobalOptions {
      if (this.#disposed) {
        throw new Error("Cannot set options of disposed CXIndex");
      }
      const opts = libclang.symbols.clang_CXIndex_getGlobalOptions(this.#pointer);
      return {
        threadBackgroundPriorityForIndexing: (opts &
          CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForIndexing) ===
          CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForIndexing,
        threadBackgroundPriorityForEditing: (opts &
          CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForEditing) ===
          CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForEditing,
      };
    }
  
    /**
     * Sets general options associated with a CXIndex.
     */
    set options(opts: GlobalOptions) {
      if (this.#disposed) {
        throw new Error("Cannot get options of disposed CXIndex");
      }
      libclang.symbols.clang_CXIndex_setGlobalOptions(
        this.#pointer,
        (opts.threadBackgroundPriorityForIndexing
          ? CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForIndexing
          : CXGlobalOptFlags.CXGlobalOpt_None) |
          (opts.threadBackgroundPriorityForEditing
            ? CXGlobalOptFlags.CXGlobalOpt_ThreadBackgroundPriorityForEditing
            : CXGlobalOptFlags.CXGlobalOpt_None),
      );
    }
  
    /**
     * Parse the given source file and return the translation unit corresponding
     * to that file. An error is thrown if something went wrong in the parsing.
     *
     * This routine is the main entry point for the Clang C API, providing the
     * ability to parse a source file into a translation unit that can then be
     * queried by other functions in the API. This routine accepts a set of
     * command-line arguments so that the compilation can be configured in the same
     * way that the compiler is configured on the command line.
     *
     * @param fileName The name of the source file to load.
     * @param commandLineArguments The command-line arguments that would be
     * passed to the `clang` executable if it were being invoked out-of-process.
     * These command-line options will be parsed and will affect how the translation
     * unit is parsed. Note that the following options are ignored: '-c',
     * '-emit-ast', '-fsyntax-only' (which is the default), and '-o <output file>'.
     * @param flags An array of CXTranslationUnit_XXX flags that affects how the translation unit
     * is managed but not its compilation.
     */
    parseTranslationUnit(
      fileName: string,
      commandLineArguments: string[] = [],
      flags?: CXTranslationUnit_Flags[],
    ): CXTranslationUnit {
      if (this.#disposed) {
        throw new Error("Cannot parse translation unit of disposed CXIndex");
      }
      const source_filename = cstr(fileName);
      const command_line_args = new CStringArray(commandLineArguments);
      let options = 0;
      if (flags) {
        for (const option of flags) {
          options |= option;
        }
      }
      const result: CXErrorCode = libclang.symbols.clang_parseTranslationUnit2(
        this.#pointer,
        source_filename,
        command_line_args,
        commandLineArguments.length,
        NULLBUF,
        0,
        options,
        OUT,
      );
  
      const pointer = Number(OUT_64[0]);
      throwIfError(result, "Parsing CXTranslationUnit failed");
  
      const tu = CXTranslationUnit[CONSTRUCTOR](pointer);
      this.translationUnits.set(fileName, tu);
      return tu;
    }
  
    /**
     * Returns the set of flags that is suitable for parsing a translation
     * unit that is being edited.
     *
     * The set of flags returned provide options for {@link parseTranslationUnit}
     * to indicate that the translation unit is likely to be reparsed many times,
     * either explicitly (via {@link CXTranslationUnit#reparse}) or implicitly
     * (e.g., by code completion (`clang_codeCompletionAt()`)). The returned flag
     * set contains an unspecified set of optimizations (e.g., the precompiled
     * preamble) geared toward improving the performance of these routines. The
     * set of optimizations enabled may change from one version to the next.
     */
    static getDefaultEditingOptions(): CXReparse_Flags {
      return libclang.symbols.clang_defaultEditingTranslationUnitOptions();
    }
  
    /**
     * Sets the invocation emission path option in a CXIndex.
     *
     * The invocation emission path specifies a path which will contain log
     * files for certain libclang invocations. A null value (default) implies that
     * libclang invocations are not logged.
     */
    setInvocationEmissionPathOption(path: null | string = null): void {
      if (this.#disposed) {
        throw new Error(
          "Cannot set invocation emission path option of disposed CXIndex",
        );
      }
      libclang.symbols.clang_CXIndex_setInvocationEmissionPathOption(
        this.#pointer,
        typeof path === "string" ? cstr(path) : path,
      );
    }
  
    /**
     * Create a translation unit from an AST file (`-emit-ast).`
     * An error is thrown if something went wrong in the parsing.
     *
     * @param astFileName AST file
     */
    createTranslationUnit(astFileName: string): CXTranslationUnit {
      if (this.#disposed) {
        throw new Error("Cannot create translation unit in disposed CXIndex");
      }
      const result = libclang.symbols.clang_createTranslationUnit2(
        this.#pointer,
        cstr(astFileName),
        OUT,
      );
      throwIfError(result, "Parsing CXTranslationUnit failed");
  
      const pointer = Number(OUT_64[0]);
      const tu = CXTranslationUnit[CONSTRUCTOR](pointer);
      this.translationUnits.set(astFileName, tu);
      return tu;
    }
  
    // createTranslationUnitFromSourceFile(
    //  arg_0: CXIndex, arg_1: constCharPtr, arg_2: int, arg_3: constCharPtr, arg_4: unsigned, arg_5: CXUnsavedFile, arg_6: )  {
    //    libclang.symbols.clang_createTranslationUnitFromSourceFile(arg_0, arg_1, arg_2, arg_3, arg_4, arg_5, arg_6);
    // }
    // parseTranslationUnit2FullArgv(
    //  arg_0: CXIndex, arg_1: constCharPtr, arg_2: CStringArray, arg_3: int, arg_4: CXUnsavedFile, arg_5: unsigned, arg_6: unsigned, arg_7: out(CXTranslationUnitT), arg_8: )  {
    //    libclang.symbols.clang_parseTranslationUnit2FullArgv(arg_0, arg_1, arg_2, arg_3, arg_4, arg_5, arg_6, arg_7, arg_8);
    // }
  
    /**
     * An indexing action/session, to be applied to one or multiple
     * translation units.
     */
    createIndexAction(): CXIndexAction {
      return CXIndexAction[CONSTRUCTOR](
        libclang.symbols.clang_IndexAction_create(this.#pointer),
      );
    }
  
    /**
     * Destroy the given index.
     *
     * Destroying the index will destroy all the translation units created
     * within that index. It is not strictly necessary to call this method,
     * the memory will be released as part of JavaScript garbage collection.
     */
    dispose(): void {
      if (this.#disposed) {
        return;
      }
      for (const tu of this.translationUnits.values()) {
        tu.dispose();
      }
      this.translationUnits.clear();
      libclang.symbols.clang_disposeIndex(this.#pointer);
      INDEX_FINALIZATION_REGISTRY.unregister(this);
      this.#disposed = true;
    }
  }