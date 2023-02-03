import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";
import { CXEvalResultKind } from "./include/typeDefinitions.ts";

const EVAL_RESULT_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_EvalResult_dispose(pointer));

/**
 * Evaluation result of a cursor
 *
 * @hideconstructor
 */
export class CXEvalResult {
  static #constructable = false;
  #pointer: Deno.PointerValue;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(
    pointer: Deno.PointerValue,
  ) {
    if (CXEvalResult.#constructable !== true) {
      throw new Error("CXEvalResult is not constructable");
    }
    this.#pointer = pointer;
    EVAL_RESULT_FINALIZATION_REGISTRY.register(this, pointer, this);
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    pointer: Deno.PointerValue,
  ): CXEvalResult {
    CXEvalResult.#constructable = true;
    const result = new CXEvalResult(pointer);
    CXEvalResult.#constructable = false;
    return result;
  }

  /**
   * Returns the kind of the evaluated result.
   */
  getKind(): CXEvalResultKind {
    return libclang.symbols.clang_EvalResult_getKind(this.#pointer);
  }

  /**
   * Returns the evaluation result as integer if the
   * kind is Int.
   */
  getAsInt(): number {
    return libclang.symbols.clang_EvalResult_getAsInt(this.#pointer);
  }

  /**
   * Returns the evaluation result as a long long integer if the
   * kind is Int. This prevents overflows that may happen if the result is
   * returned with {@link getAsInt}.
   */
  getAsLongLong(): number | bigint {
    return libclang.symbols.clang_EvalResult_getAsLongLong(this.#pointer);
  }

  /**
   * Returns a `true` value if the kind is Int and the evaluation
   * result resulted in an unsigned integer.
   */
  isUnsignedInt(): boolean {
    return libclang.symbols.clang_EvalResult_isUnsignedInt(this.#pointer) !== 0;
  }

  /**
   * Returns the evaluation result as an unsigned integer if
   * the kind is Int and {@link isUnsignedInt} is `true`.
   */
  getAsUnsigned(): number | bigint {
    return libclang.symbols.clang_EvalResult_getAsUnsigned(this.#pointer);
  }

  /**
   * Returns the evaluation result as double if the
   * kind is double.
   */
  getAsDouble(): number {
    return libclang.symbols.clang_EvalResult_getAsDouble(this.#pointer);
  }

  /**
   * Returns the evaluation result as a constant string if the
   * kind is other than Int or float.
   */
  getAsStr(): string {
    return Deno.UnsafePointerView.getCString(
      libclang.symbols.clang_EvalResult_getAsStr(this.#pointer),
    );
  }

  /**
   * Disposes the created Eval memory.
   *
   * Calling any other methods after calling {@link dispose()} causes
   * undefined behaviour. It is not strictly necessary to call this method,
   * the memory will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    libclang.symbols.clang_EvalResult_dispose(this.#pointer);
    EVAL_RESULT_FINALIZATION_REGISTRY.unregister(this);
  }
}

