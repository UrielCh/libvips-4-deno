import { CONSTRUCTOR } from "./common.ts";
import { CXDiagnostic } from "./CXDiagnostic.ts";
import { libclang } from "./ffi.ts";
import { CXLoadDiag_Error } from "./include/typeDefinitions.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { cstr, cxstringToString, NULL } from "./utils.ts";

const DIAGNOSTIC_SET_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_disposeDiagnosticSet(pointer));
/**
 * A group of {@link CXDiagnostic}s.
 *
 * @hideconstructor
 */
export class CXDiagnosticSet {
  static #constructable = false;
  tu: null | CXTranslationUnit;
  #pointer: Deno.PointerValue;
  #length: number;
  #disposed = false;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: null | CXTranslationUnit, pointer: Deno.PointerValue) {
    if (CXDiagnosticSet.#constructable !== true) {
      throw new Error("CXDiagnosticSet is not constructable");
    }
    this.tu = tu;
    this.#pointer = pointer;
    DIAGNOSTIC_SET_FINALIZATION_REGISTRY.register(this, pointer, this);
    this.#length = libclang.symbols.clang_getNumDiagnosticsInSet(this.#pointer);
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    tu: null | CXTranslationUnit,
    pointer: Deno.PointerValue,
  ): CXDiagnosticSet {
    CXDiagnosticSet.#constructable = true;
    const result = new CXDiagnosticSet(tu, pointer);
    CXDiagnosticSet.#constructable = false;
    return result;
  }

  /**
   * Number of {@link CXDiagnostic}s in this set.
   */
  get length(): number {
    return this.#length;
  }

  /**
   * Retrieve a {@link CXDiagnostic} associated with the given {@link index}.
   *
   * @param index The zero-based diagnostic number to retrieve.
   * @returns The requested diagnostic.
   */
  at(index: number): CXDiagnostic {
    if (this.#disposed) {
      throw new Error(
        "Cannot get CXDiagnostic at index from a disposed CXDiagnosticSet",
      );
    } else if (index < 0 || this.#length <= index) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    return CXDiagnostic[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_getDiagnosticInSet(this.#pointer, index),
    );
  }

  /**
   * Deserialize a set of diagnostics from a Clang diagnostics bitcode
   * file.
   *
   * @param fileName The name of the file to deserialize.
   *
   * @returns A loaded {@link CXDiagnosticSet} if successful. An error is thrown otherwise.
   */
  static loadDiagnostics(fileName: string): CXDiagnosticSet {
    const errorStringOut = new Uint8Array(8 * 2 + 4);
    const errorOut = errorStringOut.subarray(8 * 2);
    const pointer = libclang.symbols.clang_loadDiagnostics(
      cstr(fileName),
      errorOut,
      errorStringOut,
    );
    if (pointer === NULL) {
      // Error
      const errorNumber = errorOut[0];
      const errorString = cxstringToString(errorStringOut);
      if (errorNumber === CXLoadDiag_Error.CXLoadDiag_InvalidFile) {
        throw new Error(
          "Loading diagnostics failed: File is invalid",
          errorString ? { cause: errorString } : undefined,
        );
      } else if (errorNumber === CXLoadDiag_Error.CXLoadDiag_CannotLoad) {
        throw new Error(
          "Loading diagnostics failed: Could not open file",
          errorString ? { cause: errorString } : undefined,
        );
      } else if (errorNumber === CXLoadDiag_Error.CXLoadDiag_Unknown) {
        throw new Error(
          "Loading diagnostics failed: Unkown error",
          errorString ? { cause: errorString } : undefined,
        );
      } else {
        throw new Error(
          `Loading diagnostics failed: ${
            errorString || "Error code and string missing"
          }`,
        );
      }
    }
    return CXDiagnosticSet[CONSTRUCTOR](null, pointer);
  }

  /**
   * Release this {@link CXDiagnosticSet} and all of its contained diagnostics.
   *
   * It is not strictly necessary to call this method. The memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    libclang.symbols.clang_disposeDiagnosticSet(this.#pointer);
    this.#disposed = true;
    DIAGNOSTIC_SET_FINALIZATION_REGISTRY.unregister(this);
  }
}
