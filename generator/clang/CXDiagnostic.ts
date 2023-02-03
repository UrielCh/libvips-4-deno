import { CONSTRUCTOR } from "./common.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { libclang } from "./ffi.ts";
import { CXDiagnosticDisplayOptions, CXDiagnosticSeverity } from "./include/typeDefinitions.ts";
import { CXDiagnosticSet, CXSourceLocation, CXTranslationUnit } from "./rest.ts";
import { cxstringToString, NULL } from "./utils.ts";

const OUT = new Uint8Array(16);

const DIAGNOSTIC_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_disposeDiagnostic(pointer));
/**
 * A single diagnostic, containing the diagnostic's severity,
 * location, text, source ranges, and fix-it hints.
 */
export class CXDiagnostic {
  static #constructable = false;
  tu: null | CXTranslationUnit;
  #pointer: Deno.PointerValue;
  #disposed = false;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: null | CXTranslationUnit, pointer: Deno.PointerValue) {
    if (CXDiagnostic.#constructable !== true) {
      throw new Error("CXDiagnostic is not constructable");
    }
    this.tu = tu;
    this.#pointer = pointer;
    DIAGNOSTIC_FINALIZATION_REGISTRY.register(this, pointer, this);
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    tu: null | CXTranslationUnit,
    pointer: Deno.PointerValue,
  ): CXDiagnostic {
    CXDiagnostic.#constructable = true;
    const result = new CXDiagnostic(tu, pointer);
    CXDiagnostic.#constructable = false;
    return result;
  }

  /**
   * Retrieve the child diagnostics of this {@link CXDiagnostic}.
   */
  getChildDiagnostics(): null | CXDiagnosticSet {
    if (this.#disposed) {
      throw new Error("Cannot get children of diposed CXDiagnostic");
    }
    const pointer = libclang.symbols.clang_getChildDiagnostics(this.#pointer);
    if (pointer === NULL) {
      return null;
    }
    const diagnosticSet = CXDiagnosticSet[CONSTRUCTOR](this.tu, pointer);
    // "This CXDiagnosticSet does not need to be released by clang_disposeDiagnosticSet"
    DIAGNOSTIC_FINALIZATION_REGISTRY.unregister(diagnosticSet);
    diagnosticSet.dispose = () => {};
    return diagnosticSet;
  }

  /**
   * Format the given diagnostic in a manner that is suitable for display.
   *
   * This routine will format the given diagnostic to a string, rendering
   * the diagnostic according to the various options given. The
   * `clang_defaultDiagnosticDisplayOptions(`) function returns the set of
   * options that most closely mimics the behavior of the clang compiler.
   *
   * @param [options] An optional options object that control the diagnostic display,
   * see {@link CXDiagnosticDisplayOptions}.
   * @returns A string containing the formatted diagnostic.
   */
  formatDiagnostic(options?: {
    /**
     * Display the source-location information where the
     * diagnostic was located.
     *
     * When set, diagnostics will be prefixed by the file, line, and
     * (optionally) column to which the diagnostic refers. For example,
     *
     * ```cpp
     * test.c:28: warning: extra tokens at end of #endif directive
     * ```
     * This option corresponds to the clang flag `-fshow-source-location.`
     */
    displaySourceLocation: boolean;
    /**
     * If displaying the source-location information of the
     * diagnostic, also include the column number.
     *
     * This option corresponds to the clang flag `-fshow-column.`
     */
    displayColumn: boolean;
    /**
     * If displaying the source-location information of the
     * diagnostic, also include information about source ranges in a
     * machine-parsable format.
     *
     * This option corresponds to the clang flag
     * `-fdiagnostics-print-source-range-info.`
     */
    displaySourceRanges: boolean;
    /**
     * Display the option name associated with this diagnostic, if any.
     *
     * The option name displayed (e.g., -Wconversion) will be placed in brackets
     * after the diagnostic text. This option corresponds to the clang flag
     * `-fdiagnostics-show-option.`
     */
    displayOption: boolean;
    /**
     * Display the category number associated with this diagnostic, if any.
     *
     * The category number is displayed within brackets after the diagnostic text.
     * This option corresponds to the clang flag
     * `-fdiagnostics-show-category=id.`
     */
    displayCategoryId: boolean;
    /**
     * Display the category name associated with this diagnostic, if any.
     *
     * The category name is displayed within brackets after the diagnostic text.
     * This option corresponds to the clang flag
     * `-fdiagnostics-show-category=name.`
     */
    displayCategoryName: boolean;
  }): string {
    if (this.#disposed) {
      throw new Error("Cannot format disposed CXDiagnostic");
    }
    let opts: number;
    if (!options) {
      opts = libclang.symbols.clang_defaultDiagnosticDisplayOptions();
    } else {
      opts = (options.displayCategoryId
        ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplayCategoryId
        : 0) |
        (options.displayCategoryName
          ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplayCategoryName
          : 0) |
        (
          options.displayColumn
            ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplayColumn
            : 0
        ) | (options.displayOption
          ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplayOption
          : 0) |
        (
          options.displaySourceLocation
            ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplaySourceLocation
            : 0
        ) | (options.displaySourceRanges
          ? CXDiagnosticDisplayOptions.CXDiagnostic_DisplaySourceRanges
          : 0);
    }
    const result = libclang.symbols.clang_formatDiagnostic(this.#pointer, opts);
    return cxstringToString(
      result,
    );
  }

  /**
   * Retrieve the category number for this diagnostic.
   *
   * Diagnostics can be categorized into groups along with other, related
   * diagnostics (e.g., diagnostics under the same warning flag). This method
   * retrieves the category number for this diagnostic.
   *
   * @returns The number of the category that contains this diagnostic, or zero
   * if this diagnostic is uncategorized.
   */
  getCategory(): number {
    if (this.#disposed) {
      throw new Error("Cannot get category of disposed CXDiagnostic");
    }
    return libclang.symbols.clang_getDiagnosticCategory(this.#pointer);
  }

  /**
   * Retrieve the name of this diagnostic category.
   *
   * @deprecated This is now deprecated. Use {@link getCategoryText()}
   * instead.
   *
   * @returns The name of this diagnostic category.
   */
  getCategoryName(): string {
    if (this.#disposed) {
      throw new Error("Cannot get category name of disposed CXDiagnostic");
    }
    return cxstringToString(libclang.symbols.clang_getDiagnosticCategoryName(
      libclang.symbols.clang_getDiagnosticCategory(this.#pointer),
    ));
  }

  /**
   * Retrieve the diagnostic category text of this diagnostic.
   *
   * @returns The text of this diagnostic category.
   */
  getCategoryText(): string {
    if (this.#disposed) {
      throw new Error("Cannot get category text of disposed CXDiagnostic");
    }
    return cxstringToString(libclang.symbols.clang_getDiagnosticCategoryText(
      this.#pointer,
    ));
  }

  /**
   * Retrieve the source location of this diagnostic.
   *
   * This location is where Clang would print the caret ('^') when
   * displaying this diagnostic on the command line.
   */
  getLocation(): CXSourceLocation {
    if (this.#disposed) {
      throw new Error("Cannot get location of disposed CXDiagnostic");
    }
    return CXSourceLocation[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_getDiagnosticLocation(this.#pointer),
    );
  }

  /**
   * Determine the number of source ranges associated with this
   * diagnostic.
   */
  getNumberOfRanges(): number {
    if (this.#disposed) {
      throw new Error(
        "Cannot get number of CXSourceRanges of disposed CXDiagnostic",
      );
    }
    return libclang.symbols.clang_getDiagnosticNumRanges(this.#pointer);
  }

  /**
   * Retrieve the name of the command-line option that enabled and/or disabled this
   * diagnostic.
   *
   * @returns A pair of strings that contains the command-line option used to enable
   * and/or disable this warning, such as "-Wconversion" or "-pedantic".
   */
  getOptions(): {
    disabledBy: string;
    enabledBy: string;
  } {
    if (this.#disposed) {
      throw new Error("Cannot get options of disposed CXDiagnostic");
    }
    const enabledByCxstring = libclang.symbols.clang_getDiagnosticOption(
      this.#pointer,
      OUT,
    );

    const disabledBy = cxstringToString(OUT);
    const enabledBy = cxstringToString(enabledByCxstring);
    return {
      disabledBy,
      enabledBy,
    };
  }

  /**
   * Retrieve a source range associated with this diagnostic.
   *
   * A diagnostic's source ranges highlight important elements in the source
   * code. On the command line, Clang displays source ranges by
   * underlining them with '~' characters.
   *
   * @param index The zero-based index specifying which range to retrieve.
   * @returns The requested source range.
   */
  getRange(index: number): CXSourceRange {
    if (this.#disposed) {
      throw new Error("Cannot get range of disposed CXDiagnostic");
    } else if (index < 0) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    return CXSourceRange[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_getDiagnosticRange(this.#pointer, index),
    )!;
  }

  /**
   * Determine the severity of this diagnostic.
   */
  getSeverity(): CXDiagnosticSeverity {
    if (this.#disposed) {
      throw new Error("Cannot get severity of disposed CXDiagnostic");
    }
    return libclang.symbols.clang_getDiagnosticSeverity(this.#pointer);
  }

  /**
   * Retrieve the text of this diagnostic.
   */
  getSpelling(): string {
    if (this.#disposed) {
      throw new Error("Cannot get spelling of disposed CXDiagnostic");
    }
    return cxstringToString(libclang.symbols.clang_getDiagnosticSpelling(
      this.#pointer,
    ));
  }

  /**
   * Determine the number of fix-it hints associated with this
   * diagnostic.
   */
  getNumberOfFixIts(): number {
    if (this.#disposed) {
      throw new Error("Cannot get number of FixIts of disposed CXDiagnostic");
    }
    return libclang.symbols.clang_getDiagnosticNumFixIts(this.#pointer);
  }

  /**
   * Retrieve the replacement information for a given fix-it.
   *
   * Fix-its are described in terms of a source range whose contents
   * should be replaced by a string. This approach generalizes over
   * three kinds of operations: removal of source code (the range covers
   * the code to be removed and the replacement string is empty),
   * replacement of source code (the range covers the code to be
   * replaced and the replacement string provides the new code), and
   * insertion (both the start and end of the range point at the
   * insertion location, and the replacement string provides the text to
   * insert).
   *
   * @param index The zero-based index of the fix-it.
   * @returns An object containing the string containing text that should
   * replace the source code indicated by the range in the object.
   */
  getFixIt(index: number): {
    /**
     * The string that should replace the source code indicated by {@link sourceRange}.
     */
    replacementText: string;
    /**
     * The source range whose contents should be
     * replaced with the {@link replacementText} string. Note that source
     * ranges are half-open ranges [a, b), so the source code should be
     * replaced from a and up to (but not including) b.
     */
    sourceRange: CXSourceRange;
  } {
    if (this.#disposed) {
      throw new Error("Cannot get FixIt of disposed CXDiagnostic");
    } else if (index < 0) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    const sourceRangeBuffer = new Uint8Array(8 * 3);
    const cxstring = libclang.symbols.clang_getDiagnosticFixIt(
      this.#pointer,
      index,
      sourceRangeBuffer,
    );
    const replacementText = cxstringToString(cxstring);
    const sourceRange = CXSourceRange[CONSTRUCTOR](this.tu, sourceRangeBuffer)!;
    return {
      replacementText,
      sourceRange,
    };
  }

  /**
   * Destroy a diagnostic.
   *
   * It is not strictly necessary to call this method. The memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    libclang.symbols.clang_disposeDiagnostic(this.#pointer);
    this.#disposed = true;
    DIAGNOSTIC_FINALIZATION_REGISTRY.unregister(this);
  }
}
