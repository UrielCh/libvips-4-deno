import { BUFFER, CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";

/**
 * Identifies a half-open character range in the source code.
 *
 * Use {@link getRangeStart()} and {@link getRangeEnd()} to retrieve the
 * starting and end locations from a source range, respectively.
 *
 * @hideconstructor
 */
export class CXSourceRange {
    static #constructable = false;
    tu: null | CXTranslationUnit;
    #buffer: Uint8Array;
  
    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(tu: null | CXTranslationUnit, buffer: Uint8Array) {
      if (CXSourceRange.#constructable !== true) {
        throw new Error("CXSourceRange is not constructable");
      }
      this.tu = tu;
      this.#buffer = buffer;
    }
  
    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
      tu: null | CXTranslationUnit,
      buffer: Uint8Array,
    ): CXSourceRange | null {
      if (libclang.symbols.clang_Range_isNull(buffer)) {
        return null;
      }
      CXSourceRange.#constructable = true;
      const result = new CXSourceRange(tu, buffer);
      CXSourceRange.#constructable = false;
      return result;
    }
  
    /**
     * Retrieve a NULL (invalid) source range.
     */
    static getNullRange(): CXSourceRange {
      CXSourceRange.#constructable = true;
      const result = new CXSourceRange(
        null,
        libclang.symbols.clang_getNullRange(),
      );
      CXSourceRange.#constructable = false;
      return result;
    }
  
    /**
     * Retrieve a source range given the beginning and ending source
     * locations.
     */
    static getRange(
      begin: CXSourceLocation,
      end: CXSourceLocation,
    ): CXSourceRange {
      return CXSourceRange[CONSTRUCTOR](
        begin.tu,
        libclang.symbols.clang_getRange(begin[BUFFER], end[BUFFER]),
      )!;
    }
  
    /**
     * @private Private API, cannot be used from outside.
     */
    get [BUFFER](): Uint8Array {
      return this.#buffer;
    }
  
    /**
     * Returns `true` if this range is null.
     */
    isNull(): boolean {
      return libclang.symbols.clang_Range_isNull(this.#buffer) !== 0;
    }
  
    /**
     * Determine whether two ranges are equivalent.
     *
     * @returns `true` if the ranges are the same, `false` if they differ.
     */
    equals(other: CXSourceRange): boolean {
      return libclang.symbols.clang_equalRanges(this.#buffer, other.#buffer) !==
        0;
    }
  
    /**
     * Retrieve a source location representing the first character within this
     * source range.
     */
    getRangeStart(): CXSourceLocation {
      return CXSourceLocation[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getRangeStart(this.#buffer),
      );
    }
  
    /**
     * Retrieve a source location representing the last character within this
     * source range.
     */
    getRangeEnd(): CXSourceLocation {
      return CXSourceLocation[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getRangeEnd(this.#buffer),
      );
    }
  }
  