import { CONSTRUCTOR, POINTER } from "./common.ts";
import { CXFile } from "./CXFile.ts";
import { libclang } from "./ffi.ts";
import { CXTranslationUnit } from "./rest.ts";
import { cxstringToString, NULL } from "./utils.ts";

/**
 * @hideconstructor
 */
export class CXModule {
  static #constructable = false;
  tu: CXTranslationUnit;
  #pointer: Deno.PointerValue;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: CXTranslationUnit, pointer: Deno.PointerValue) {
    if (CXModule.#constructable !== true) {
      throw new Error("CXModule is not constructable");
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
  ): CXModule {
    CXModule.#constructable = true;
    const result = new CXModule(tu, pointer);
    CXModule.#constructable = false;
    return result;
  }

  /**
   * Get the name of this module, e.g. for the `std.vector` sub-module it
   * will return "vector".
   */
  getName(): string {
    return cxstringToString(
      libclang.symbols.clang_Module_getName(this.#pointer),
    );
  }

  /**
   * Get the module file where this module object came from.
   */
  getASTFile(): CXFile {
    if (this.tu === null) {
      throw new Error("Cannot get AST file of null CXModule");
    }
    return CXFile[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_Module_getASTFile(this.#pointer),
    );
  }

  /**
   * Get the full name of this module, e.g. "std.vector".
   */
  getFullName(): string {
    return cxstringToString(
      libclang.symbols.clang_Module_getFullName(this.#pointer),
    );
  }

  /**
   * Get the number of top level headers associated with this module.
   */
  getNumberOfTopLevelHeaders(): number {
    return libclang.symbols.clang_Module_getNumTopLevelHeaders(
      this.tu[POINTER],
      this.#pointer,
    );
  }

  /**
   * Get the parent of this sub-module or `null` if it is top-level,
   * e.g. for 'std.vector' it will return the 'std' module.
   */
  getParent(): null | CXModule {
    const pointer = libclang.symbols.clang_Module_getParent(this.#pointer);
    if (pointer === NULL) {
      return null;
    }
    return CXModule[CONSTRUCTOR](this.tu, pointer);
  }

  /**
   * @param index Top level header index (zero-based).
   * @returns The specified top level header associated with this module.
   */
  getTopLevelHeader(index: number): CXFile {
    if (index < 0) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    const pointer = libclang.symbols.clang_Module_getTopLevelHeader(
      this.tu[POINTER],
      this.#pointer,
      index,
    );
    if (pointer === NULL) {
      throw new Error("Could not get top level header");
    }
    return CXFile[CONSTRUCTOR](this.tu, pointer);
  }

  /**
   * Returns `true` if this module is a system one.
   */
  isSystem(): boolean {
    return libclang.symbols.clang_Module_isSystem(this.#pointer) !== 0;
  }
}
