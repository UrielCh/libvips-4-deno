import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";
import { CXCompletionContext, CXCursorKind } from "./include/typeDefinitions.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { CXDiagnostic } from "./CXDiagnostic.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { cxstringToString, NULL } from "./utils.ts";
import { CXCompletionString } from "./CXCompletionString.ts";

const COMPLETION_RESULTS_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_disposeCodeCompleteResults(pointer));

const OUT = new Uint8Array(16);

/**
 * Contains the results of code-completion.
 *
 * This data structure contains the results of code completion, as
 * produced by {@link CXTranslationUnit.codeCompleteAt()}.
 */
export class CXCodeCompleteResults {
  static #constructable = false;
  #pointer: Deno.PointerValue;
  #resultsPointer: Deno.PointerValue;
  #numberOfResults: number;
  tu: CXTranslationUnit;
  #resultsArray?: {
    kind: CXCursorKind;
    completionString: CXCompletionString;
  }[];

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(
    tu: CXTranslationUnit,
    pointer: Deno.PointerValue,
  ) {
    if (CXCodeCompleteResults.#constructable !== true) {
      throw new Error("CXCodeCompleteResults is not constructable");
    }
    this.#pointer = pointer;
    const view = new Deno.UnsafePointerView(pointer);
    this.#resultsPointer = view.getBigUint64();
    this.#numberOfResults = view.getUint32(8);
    this.tu = tu;
    COMPLETION_RESULTS_FINALIZATION_REGISTRY.register(this, pointer, this);
  }

  /**
   * The list of possible code-completions.
   */
  get results(): {
    kind: CXCursorKind;
    completionString: CXCompletionString;
  }[] {
    if (!this.#resultsArray) {
      this.#resultsArray = [];
      const view = new Deno.UnsafePointerView(this.#resultsPointer);
      for (let i = 0; i < this.#numberOfResults; i++) {
        const kind = view.getUint32(i * 2 * 8);
        const completionStringPointer = view.getBigUint64((i * 2 + 1) * 8);
        this.#resultsArray.push({
          kind,
          completionString: CXCompletionString[CONSTRUCTOR](
            completionStringPointer,
          ),
        });
      }
    }

    return this.#resultsArray;
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    tu: CXTranslationUnit,
    pointer: Deno.PointerValue,
  ): CXCodeCompleteResults {
    CXCodeCompleteResults.#constructable = true;
    const result = new CXCodeCompleteResults(tu, pointer);
    CXCodeCompleteResults.#constructable = false;
    return result;
  }

  /**
   * Retrieve the number of fix-its for the given completion index.
   *
   * Calling this makes sense only if {@link CXCodeComplete_Flags.CXCodeComplete_IncludeCompletionsWithFixIts}
   * option was set.
   *
   * @param index The index of the completion.
   * @returns The number of fix-its which must be applied before the completion at
   * `index` can be applied.
   */
  getNumberOfFixIts(index: number): number {
    return libclang.symbols.clang_getCompletionNumFixIts(this.#pointer, index);
  }

  /**
   * Fix-its that *must* be applied before inserting the text for the
   * corresponding completion.
   *
   * By default, {@link CXTranslationUnit#codeCompleteAt()} only returns
   * completions with empty fix-its. Extra completions with non-empty
   * fix-its should be explicitly requested by setting
   * {@link CXCodeComplete_Flags.CXCodeComplete_IncludeCompletionsWithFixIts}.
   *
   * For the clients to be able to compute position of the cursor after applying
   * fix-its, the following conditions are guaranteed to hold for
   * replacement_range of the stored fix-its:
   * - Ranges in the fix-its are guaranteed to never contain the completion
   * point (or identifier under completion point, if any) inside them, except
   * at the start or at the end of the range.
   * - If a fix-it range starts or ends with completion point (or starts or
   * ends after the identifier under completion point), it will contain at
   * least one character. It allows to unambiguously recompute completion
   * point after applying the fix-it.
   *
   * The intuition is that provided fix-its change code around the identifier we
   * complete, but are not allowed to touch the identifier itself or the
   * completion point. One example of completions with corrections are the ones
   * replacing '.' with '->' and vice versa:
   *
   * Example:
   * ```text
   * std::unique_ptr<std::vector<int>> vec_ptr;
   * In 'vec_ptr.^', one of the completions is 'push_back', it requires
   * replacing '.' with '->'.
   * In 'vec_ptr->^', one of the completions is 'release', it requires
   * replacing '->' with '.'.
   * ```
   *
   * @param completionIndex The index of the completion.
   * @param fixitIndex The index of the fix-it for the completion at
   * {@link completionIndex}.
   * @returns The fix-it string and range. The code in the range must be replaced
   * with the string before the completion at {@link completionIndex} can be applied.
   */
  getFixIt(
    completionIndex: number,
    fixitIndex: number,
  ): {
    fixit: string;
    range: CXSourceRange;
  } {
    const replacementRangeBuffer = new Uint8Array(24);
    const fixit = cxstringToString(
      libclang.symbols.clang_getCompletionFixIt(
        this.#pointer,
        completionIndex,
        fixitIndex,
        replacementRangeBuffer,
      ),
    );
    const range = CXSourceRange[CONSTRUCTOR](this.tu, replacementRangeBuffer);
    if (range === null) {
      throw new Error("Out of bounds");
    }
    return {
      fixit,
      range,
    };
  }

  /**
   * Sort the code-completion results in case-insensitive alphabetical
   * order. This recreates the {@link results} array.
   */
  sortCodeCompletionResults(): void {
    libclang.symbols.clang_sortCodeCompletionResults(
      this.#resultsPointer,
      this.#numberOfResults,
    );
    if (this.#resultsArray) {
      // Remove cached value
      this.#resultsArray = undefined;
    }
  }

  /**
   * Determine the number of diagnostics produced prior to the
   * location where code completion was performed.
   */
  getNumberOfDiagnostics(): number {
    return libclang.symbols.clang_codeCompleteGetNumDiagnostics(this.#pointer);
  }

  /**
   * Retrieve a diagnostic associated with this code completion.
   *
   * @param index The zero-based diagnostic number to retrieve.
   * @returns The requested {@link CXDiagnostic}.
   */
  getDiagnostic(index: number): CXDiagnostic {
    const result = libclang.symbols.clang_codeCompleteGetDiagnostic(
      this.#pointer,
      index,
    );
    if (result === NULL) {
      throw new Error("Unexpected null code-complete diagnostic");
    }
    return CXDiagnostic[CONSTRUCTOR](
      this.tu,
      result,
    );
  }

  /**
   * Determines what completions are appropriate for the context
   * this code completion.
   *
   * @returns The an array of {@link CXCompletionContext} that are appropriate for use
   * along with these code completion results.
   */
  getContexts(): CXCompletionContext[] {
    const contexts = Number(
      libclang.symbols.clang_codeCompleteGetContexts(this.#pointer),
    );
    const result: CXCompletionContext[] = [];
    if (
      (contexts & CXCompletionContext.CXCompletionContext_Unexposed) ===
        CXCompletionContext.CXCompletionContext_Unexposed
    ) {
      result.push(CXCompletionContext.CXCompletionContext_Unexposed);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_AnyType) ===
        CXCompletionContext.CXCompletionContext_AnyType
    ) {
      result.push(CXCompletionContext.CXCompletionContext_AnyType);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_AnyValue) ===
        CXCompletionContext.CXCompletionContext_AnyValue
    ) {
      result.push(CXCompletionContext.CXCompletionContext_AnyValue);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCObjectValue) ===
        CXCompletionContext.CXCompletionContext_ObjCObjectValue
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCObjectValue);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCSelectorValue) ===
        CXCompletionContext.CXCompletionContext_ObjCSelectorValue
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCSelectorValue);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_CXXClassTypeValue) ===
        CXCompletionContext.CXCompletionContext_CXXClassTypeValue
    ) {
      result.push(CXCompletionContext.CXCompletionContext_CXXClassTypeValue);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_DotMemberAccess) ===
        CXCompletionContext.CXCompletionContext_DotMemberAccess
    ) {
      result.push(CXCompletionContext.CXCompletionContext_DotMemberAccess);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ArrowMemberAccess) ===
        CXCompletionContext.CXCompletionContext_ArrowMemberAccess
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ArrowMemberAccess);
    }
    if (
      (contexts &
        CXCompletionContext.CXCompletionContext_ObjCPropertyAccess) ===
        CXCompletionContext.CXCompletionContext_ObjCPropertyAccess
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCPropertyAccess);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_EnumTag) ===
        CXCompletionContext.CXCompletionContext_EnumTag
    ) {
      result.push(CXCompletionContext.CXCompletionContext_EnumTag);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_UnionTag) ===
        CXCompletionContext.CXCompletionContext_UnionTag
    ) {
      result.push(CXCompletionContext.CXCompletionContext_UnionTag);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_StructTag) ===
        CXCompletionContext.CXCompletionContext_StructTag
    ) {
      result.push(CXCompletionContext.CXCompletionContext_StructTag);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ClassTag) ===
        CXCompletionContext.CXCompletionContext_ClassTag
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ClassTag);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_Namespace) ===
        CXCompletionContext.CXCompletionContext_Namespace
    ) {
      result.push(CXCompletionContext.CXCompletionContext_Namespace);
    }
    if (
      (contexts &
        CXCompletionContext.CXCompletionContext_NestedNameSpecifier) ===
        CXCompletionContext.CXCompletionContext_NestedNameSpecifier
    ) {
      result.push(CXCompletionContext.CXCompletionContext_NestedNameSpecifier);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCInterface) ===
        CXCompletionContext.CXCompletionContext_ObjCInterface
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCInterface);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCProtocol) ===
        CXCompletionContext.CXCompletionContext_ObjCProtocol
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCProtocol);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCCategory) ===
        CXCompletionContext.CXCompletionContext_ObjCCategory
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCCategory);
    }
    if (
      (contexts &
        CXCompletionContext.CXCompletionContext_ObjCInstanceMessage) ===
        CXCompletionContext.CXCompletionContext_ObjCInstanceMessage
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCInstanceMessage);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCClassMessage) ===
        CXCompletionContext.CXCompletionContext_ObjCClassMessage
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCClassMessage);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_ObjCSelectorName) ===
        CXCompletionContext.CXCompletionContext_ObjCSelectorName
    ) {
      result.push(CXCompletionContext.CXCompletionContext_ObjCSelectorName);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_MacroName) ===
        CXCompletionContext.CXCompletionContext_MacroName
    ) {
      result.push(CXCompletionContext.CXCompletionContext_MacroName);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_NaturalLanguage) ===
        CXCompletionContext.CXCompletionContext_NaturalLanguage
    ) {
      result.push(CXCompletionContext.CXCompletionContext_NaturalLanguage);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_IncludedFile) ===
        CXCompletionContext.CXCompletionContext_IncludedFile
    ) {
      result.push(CXCompletionContext.CXCompletionContext_IncludedFile);
    }
    if (
      (contexts & CXCompletionContext.CXCompletionContext_Unknown) ===
        CXCompletionContext.CXCompletionContext_Unknown
    ) {
      result.push(CXCompletionContext.CXCompletionContext_Unknown);
    }
    return result;
  }

  /**
   * Returns the cursor kind for the container for this code
   * completion context. The container is only guaranteed to be set for
   * contexts where a container exists (i.e. member accesses or Objective-C
   * message sends); if there is not a container, this function will return
   * {@link CXCursorKind.CXCursor_InvalidCode}.
   *
   * @returns The container kind, or {@link CXCursorKind.CXCursor_InvalidCode} if there is no
   * container, and an `incomplete` boolean whose value will be false if Clang has complete
   * information about the container. If Clang does not have complete
   * information, this value will be true.
   */
  getContainerKind(): {
    /**
     * The container kind, or {@link CXCursorKind.CXCursor_InvalidCode} if there is no container.
     */
    kind: CXCursorKind;
    /**
     * `true` if Clang has complete information about the container, `false` otherwise.
     */
    incomplete: boolean;
  } {
    const kind = libclang.symbols.clang_codeCompleteGetContainerKind(
      this.#pointer,
      OUT,
    );
    return {
      kind,
      incomplete: (OUT[0] + OUT[1] + OUT[2] + OUT[3]) > 0,
    };
  }

  /**
   * Returns the USR (Unified Symbol Resolution) for the container for this code completion
   * context. If there is no container for the current context, this
   * function will return the empty string.
   */
  getContainerUSR(): string {
    return cxstringToString(
      libclang.symbols.clang_codeCompleteGetContainerUSR(this.#pointer),
    );
  }

  /**
   * Returns the currently-entered selector for an Objective-C message
   * send, formatted like `"initWithFoo:bar:"`. Only guaranteed to return a
   * non-empty string for {@link CXCompletionContext.CXCompletionContext_ObjCInstanceMessage} and
   * {@link CXCompletionContext.CXCompletionContext_ObjCClassMessage}.
   *
   * @returns The selector (or partial selector) that has been entered thus far
   * for an Objective-C message send.
   */
  getObjCSelector(): string {
    return cxstringToString(
      libclang.symbols.clang_codeCompleteGetObjCSelector(this.#pointer),
    );
  }

  /**
   * Free this set of code-completion results.
   *
   * Calling any methods on the {@link CXCodeCompleteResults}
   * after disposing will result in undefined behaviour. It
   * is not strictly necessary to call this method, the memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    libclang.symbols.clang_disposeCodeCompleteResults(this.#pointer);
    COMPLETION_RESULTS_FINALIZATION_REGISTRY.unregister(this);
  }
}