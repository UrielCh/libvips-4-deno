import { BUFFER, CONSTRUCTOR } from "./common.ts";
import { CXFile } from "./CXFile.ts";
import { libclang } from "./ffi.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { cxstringToString } from "./utils.ts";

const OUT = new Uint8Array(16);

/**
 * Identifies a specific source location within a translation
 * unit.
 *
 * Use {@link getExpansionLocation()} or {@link getSpellingLocation()}
 * to map a source location to a particular file, line, and column.
 */
export class CXSourceLocation {
  static #constructable = false;
  tu: null | CXTranslationUnit;
  #buffer: Uint8Array;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: null | CXTranslationUnit, buffer: Uint8Array) {
    if (CXSourceLocation.#constructable !== true) {
      throw new Error("CXSourceLocation is not constructable");
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
  ): CXSourceLocation {
    CXSourceLocation.#constructable = true;
    const result = new CXSourceLocation(tu, buffer);
    CXSourceLocation.#constructable = false;
    return result;
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  get [BUFFER](): Uint8Array {
    return this.#buffer;
  }

  /**
   * Retrieve a NULL (invalid) source location.
   */
  static getNullLocation(): CXSourceLocation {
    return CXSourceLocation[CONSTRUCTOR](
      null,
      libclang.symbols.clang_getNullLocation(),
    );
  }

  /**
   * Determine whether two source locations, which must refer into
   * the same translation unit, refer to exactly the same point in the source
   * code.
   *
   * @returns `true` if the source locations refer to the same location, `false`
   * if they refer to different locations.
   */
  equals(other: CXSourceLocation): boolean {
    return libclang.symbols.clang_equalLocations(
      this.#buffer,
      other.#buffer,
    ) !== 0;
  }

  /**
   * Returns `true` if this source location is in a system header.
   */
  isInSystemHeader(): boolean {
    return libclang.symbols.clang_Location_isInSystemHeader(this.#buffer) !== 0;
  }

  /**
   * Returns `true` if this source location is in the main file of
   * the corresponding translation unit.
   */
  isFromMainFile(): boolean {
    return libclang.symbols.clang_Location_isFromMainFile(this.#buffer) !== 0;
  }

  /**
   * Legacy API to retrieve the file, line, column, and offset represented
   * by this source location.
   *
   * This method has been replaced by the newer method
   * {@link getExpansionLocation()}. See that method's documentation for
   * details.
   *
   * @deprecated
   */
  clang_getInstantiationLocation(): {
    file: CXFile;
    line: number;
    column: number;
    offset: number;
  } {
    if (this.tu === null) {
      throw new Error(
        "Cannot get instantiation location of null source location",
      );
    }
    const cxfileOut = new Uint8Array(8 + 4 * 3);
    const lineOut = cxfileOut.subarray(8, 8 + 4);
    const columnOut = cxfileOut.subarray(8 + 4, 8 + 4 * 2);
    const offsetOut = cxfileOut.subarray(8 + 4 * 2);
    libclang.symbols.clang_getInstantiationLocation(
      this.#buffer,
      cxfileOut,
      lineOut,
      columnOut,
      offsetOut,
    );
    const file = CXFile[CONSTRUCTOR](
      this.tu,
      Number(new BigUint64Array(cxfileOut.buffer, 0, 1)[0]),
    );
    const unsignedArray = new Uint32Array(cxfileOut.buffer, 8, 3);
    const [line, column, offset] = unsignedArray;
    return {
      file,
      line,
      column,
      offset,
    };
  }

  /**
   * Retrieve the file, line, column, and offset represented by
   * this source location.
   *
   * If the location refers into a macro expansion, retrieves the
   * location of the macro expansion.
   */
  getExpansionLocation(): {
    /**
     * The file to which this source location points.
     */
    file: CXFile;
    /**
     * The line to which this source location points.
     */
    line: number;
    /**
     * The column to which this source location points.
     */
    column: number;
    /**
     * The offset into the buffer to which this source location points.
     */
    offset: number;
  } {
    if (this.tu === null) {
      throw new Error("Cannot get expansion location of null source location");
    }
    const cxfileOut = new Uint8Array(8 + 4 * 3);
    const lineOut = cxfileOut.subarray(8, 8 + 4);
    const columnOut = cxfileOut.subarray(8 + 4, 8 + 4 * 2);
    const offsetOut = cxfileOut.subarray(8 + 4 * 2);
    libclang.symbols.clang_getExpansionLocation(
      this.#buffer,
      cxfileOut,
      lineOut,
      columnOut,
      offsetOut,
    );
    const file = CXFile[CONSTRUCTOR](
      this.tu,
      Number(new BigUint64Array(cxfileOut.buffer, 0, 1)[0]),
    );
    const unsignedArray = new Uint32Array(cxfileOut.buffer, 8, 3);
    const [line, column, offset] = unsignedArray;
    return {
      file,
      line,
      column,
      offset,
    };
  }

  /**
   * Retrieve the file, line and column represented by this source
   * location, as specified in a # line directive.
   *
   * Example: given the following source code in a file somefile.c
   *
   * ```cpp
   * #123 "dummy.c" 1
   * static int func(void)
   * {
   *     return 0;
   * }
   * ```
   * the location information returned by this function would be
   *
   * File: dummy.c Line: 124 Column: 12
   *
   * whereas clang_getExpansionLocation would have returned
   *
   * File: somefile.c Line: 3 Column: 12
   */
  getPresumedLocation(): {
    /**
     * The filename of the source location. Note that filenames returned will be for "virtual" files,
     * which don't necessarily exist on the machine running clang - e.g. when
     * parsing preprocessed output obtained from a different environment. For an invalid
     * source location, an empty string is returned.
     */
    filename: string;
    /**
     * The line number of the source location. For an invalid source location, zero is returned.
     */
    line: number;
    /**
     * The column number of the source location. For an invalid source location, zero is returned.
     */
    column: number;
  } {
    if (this.tu === null) {
      throw new Error("Cannot get presumed location of null source location");
    }
    const lineOut = new Uint8Array(8);
    const columnOut = lineOut.subarray(4);
    libclang.symbols.clang_getPresumedLocation(
      this.#buffer,
      OUT,
      lineOut,
      columnOut,
    );
    const filename = cxstringToString(OUT);
    const unsignedArray = new Uint32Array(lineOut.buffer);
    const [line, column] = unsignedArray;
    return {
      filename,
      line,
      column,
    };
  }

  /**
   * Retrieve the file, line, column, and offset represented by
   * this source location.
   *
   * If the location refers into a macro instantiation, return where the
   * location was originally spelled in the source file.
   */
  getSpellingLocation(): {
    /**
     * The file to which this source location points.
     */
    file: CXFile;
    /**
     * The line to which this source location points.
     */
    line: number;
    /**
     * The column to which this source location points.
     */
    column: number;
    /**
     * The offset into the buffer to which this source location points.
     */
    offset: number;
  } {
    if (this.tu === null) {
      throw new Error("Cannot get spelling location of null source location");
    }
    const cxfileOut = new Uint8Array(8 + 4 * 3);
    const lineOut = cxfileOut.subarray(8, 8 + 4);
    const columnOut = cxfileOut.subarray(8 + 4, 8 + 4 * 2);
    const offsetOut = cxfileOut.subarray(8 + 4 * 2);
    libclang.symbols.clang_getSpellingLocation(
      this.#buffer,
      cxfileOut,
      lineOut,
      columnOut,
      offsetOut,
    );
    const file = CXFile[CONSTRUCTOR](
      this.tu,
      Number(new BigUint64Array(cxfileOut.buffer, 0, 1)[0]),
    );
    const unsignedArray = new Uint32Array(cxfileOut.buffer, 8, 3);
    const [line, column, offset] = unsignedArray;
    return {
      file,
      line,
      column,
      offset,
    };
  }

  /**
   * Retrieve the file, line, column, and offset represented by
   * this source location.
   *
   * If the location refers into a macro expansion, return where the macro was
   * expanded or where the macro argument was written, if the location points at
   * a macro argument.
   */
  getFileLocation(): {
    /**
     * The file to which this source location points.
     */
    file: CXFile;
    /**
     * The line to which this source location points.
     */
    line: number;
    /**
     * The column to which this source location points.
     */
    column: number;
    /**
     * The offset into the buffer to which this source location points.
     */
    offset: number;
  } {
    if (this.tu === null) {
      throw new Error("Cannot get file location of null source location");
    }
    const cxfileOut = new Uint8Array(8 + 4 * 3);
    const lineOut = cxfileOut.subarray(8, 8 + 4);
    const columnOut = cxfileOut.subarray(8 + 4, 8 + 4 * 2);
    const offsetOut = cxfileOut.subarray(8 + 4 * 2);
    libclang.symbols.clang_getFileLocation(
      this.#buffer,
      cxfileOut,
      lineOut,
      columnOut,
      offsetOut,
    );
    const file = CXFile[CONSTRUCTOR](
      this.tu,
      Number(new BigUint64Array(cxfileOut.buffer, 0, 1)[0]),
    );
    const unsignedArray = new Uint32Array(cxfileOut.buffer, 8, 3);
    const [line, column, offset] = unsignedArray;
    return {
      file,
      line,
      column,
      offset,
    };
  }
}
