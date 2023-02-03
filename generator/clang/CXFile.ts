import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";
import { CONSTRUCTOR, POINTER, DISPOSE } from "./common.ts";
import {
  charBufferToString,
  cxstringToString,
  NULL,
} from "./utils.ts";
import { CXSourceRangeList } from "./CXSourceRangeList.ts";
import { libclang } from "./ffi.ts";

const OUT = new Uint8Array(16);
const OUT_64 = new BigUint64Array(OUT.buffer);

/**
 * A particular source file that is part of a translation unit.
 */
export class CXFile {
  static #constructable = false;
  tu: CXTranslationUnit;
  #pointer: Deno.PointerValue;
  #disposed = false;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: CXTranslationUnit, pointer: Deno.PointerValue) {
    if (!CXFile.#constructable) {
      throw new Error("CXFile is not constructable");
    }
    this.tu = tu;
    this.#pointer = pointer;
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    tu: CXTranslationUnit,
    pointer: Deno.PointerValue,
  ): CXFile {
    CXFile.#constructable = true;
    const result = new CXFile(tu, pointer);
    CXFile.#constructable = false;
    return result;
  }

  /**
   * private
   */
  get [POINTER](): Deno.PointerValue {
    return this.#pointer;
  }

  /**
   * private
   */
  [DISPOSE](): void {
    this.#disposed = true;
  }

  /**
   * Returns `true` if this and {@link other} point to the same file.
   */
  equals(other: CXFile): boolean {
    if (this.#disposed || other.#disposed) {
      throw new Error("Cannot compare disposed files");
    }
    return libclang.symbols.clang_File_isEqual(
      this.#pointer,
      other.#pointer,
    ) !== 0;
  }

  /**
   * Retrieve the complete file and path name of this file.
   */
  getName(): string {
    return cxstringToString(libclang.symbols.clang_getFileName(this.#pointer));
  }

  /**
   * Retrieve the last modification time of this file.
   */
  getTime(): number | bigint {
    return libclang.symbols.clang_getFileTime(this.#pointer);
  }

  /**
   * Retrieve the unique ID for this file.
   */
  getUniqueID(): `${number}-${number}-${number}` {
    const result = libclang.symbols.clang_getFileUniqueID(
      this.#pointer,
      OUT,
    );
    if (result) {
      throw new Error("Failed to get file unique ID");
    }
    return `${Number(OUT_64[0])}-${Number(OUT_64[1])}-${Number(OUT_64[2])}`;
  }

  /**
   * Returns the real path name of this file.
   *
   * An empty string may be returned. Use {@link getName()} in that case.
   */
  tryGetRealPathName(): string {
    return cxstringToString(
      libclang.symbols.clang_File_tryGetRealPathName(this.#pointer),
    );
  }

  /**
   * Retrieve the string contents of this file.
   *
   * An error is thrown if the file is not loaded.
   */
  getContents(): string {
    if (this.#disposed) {
      throw new Error("Cannot get file contents of disposed File");
    }
    const pointer = libclang.symbols.clang_getFileContents(
      this.tu[POINTER],
      this.#pointer,
      OUT,
    );
    if (pointer === NULL) {
      throw new Error("File not loaded");
    }
    const byteLength = Number(OUT_64[0]);
    const buffer = Deno.UnsafePointerView.getArrayBuffer(pointer, byteLength);
    return charBufferToString(new Uint8Array(buffer));
  }

  /**
   * Retrieves the source location associated in this file at the given line and column.
   */
  getLocation(line: number, column: number): CXSourceLocation {
    if (this.#disposed) {
      throw new Error("Cannot get location of disposed File");
    } else if (line < 0) {
      throw new Error("Invalid argument, line must be unsigned integer");
    } else if (column < 0) {
      throw new Error("Invalid argument, column must be unsigned integer");
    }
    const res = libclang.symbols.clang_getLocation(
      this.tu[POINTER],
      this.#pointer,
      line,
      column,
    );
    return CXSourceLocation[CONSTRUCTOR](this.tu, res);
  }

  /**
   * Retrieve all ranges that were skipped by the preprocessor.
   *
   * The preprocessor will skip lines when they are surrounded by an
   * if/ifdef/ifndef directive whose condition does not evaluate to true.
   */
  getSkippedRanges(): null | CXSourceRangeList {
    if (this.#disposed) {
      throw new Error("Cannot get skipped ranges from disposed CXFile");
    }
    const listPointer = libclang.symbols.clang_getSkippedRanges(
      this.tu[POINTER],
      this.#pointer,
    );
    const view = new Deno.UnsafePointerView(listPointer);
    const count = view.getUint32();
    if (count === 0) {
      return null;
    }
    const rangesPointer = Number(view.getBigUint64(8));
    return CXSourceRangeList[CONSTRUCTOR](
      this.tu,
      listPointer,
      rangesPointer,
      count,
    );
  }

  /**
   * Determine whether the given header is guarded against
   * multiple inclusions, either with the conventional
   * \#ifndef/\#define/\#endif macro guards or with \#pragma once.
   */
  isFileMultipleIncludeGuarded(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get include guard data from disposed CXFile");
    }
    return libclang.symbols.clang_isFileMultipleIncludeGuarded(
      this.tu[POINTER],
      this.#pointer,
    ) > 0;
  }

  /**
   * Retrieves the source location associated with a given character offset.
   */
  getLocationForOffset(offset: number): CXSourceLocation {
    if (this.#disposed) {
      throw new Error("Cannot get location for offset from disposed CXFile");
    }
    return CXSourceLocation[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_getLocationForOffset(
        this.tu[POINTER],
        this.#pointer,
        offset,
      ),
    );
  }
}

