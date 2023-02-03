import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";

import { CXSourceRange, CXTranslationUnit } from "./rest.ts";

const SOURCE_RANGE_LIST_FINALIZATION_REGISTRY = new FinalizationRegistry<
Deno.PointerValue
>((pointer) => libclang.symbols.clang_disposeSourceRangeList(pointer));
/**
* Identifies an array of ranges.
*
* @hideconstructor
*/
export class CXSourceRangeList {
static #constructable = false;
tu: CXTranslationUnit;
#pointer: Deno.PointerValue;
#arrayPointer: Deno.PointerValue;
#length: number;
#disposed = false;

/**
 * The number of ranges in this array.
 */
get length(): number {
  return this.#length;
}

/**
 * @private Private API, cannot be used from outside.
 */
constructor(
  tu: CXTranslationUnit,
  pointer: Deno.PointerValue,
  arrayPointer: Deno.PointerValue,
  length: number,
) {
  if (CXSourceRangeList.#constructable !== true) {
    throw new Error("CXSourceRangeList is not constructable");
  }
  SOURCE_RANGE_LIST_FINALIZATION_REGISTRY.register(this, pointer, this);
  this.tu = tu;
  this.#pointer = pointer;
  this.#arrayPointer = arrayPointer;
  this.#length = length;
}

/**
 * @private Private API, cannot be used from outside.
 */
static [CONSTRUCTOR](
  tu: CXTranslationUnit,
  pointer: Deno.PointerValue,
  arrayPointer: Deno.PointerValue,
  length: number,
): CXSourceRangeList {
  CXSourceRangeList.#constructable = true;
  const result = new CXSourceRangeList(tu, pointer, arrayPointer, length);
  CXSourceRangeList.#constructable = false;
  return result;
}

/**
 * Get the {@link CXSourceRange} at the specified index of the array.
 *
 * An error is thrown on out-of-bounds access.
 */
at(index: number): CXSourceRange {
  if (this.#disposed) {
    throw new Error(
      "Cannot get CXSourceRange at index of disposed CXSourceRangeList",
    );
  } else if (index < 0 || this.#length <= index) {
    throw new Error("Invalid argument, index must be unsigned integer");
  }
  return CXSourceRange[CONSTRUCTOR](
    this.tu,
    new Uint8Array(
      Deno.UnsafePointerView.getArrayBuffer(
        this.#arrayPointer,
        // Two pointers, two unsigned integers per CXSourceRange
        2 * (8 + 4),
        index * 2 * (8 + 4),
      ),
    ),
  )!;
}

/**
 * Destroy this {@link CXSourceRangeList}.
 *
 * It is not strictly necessary to call this method. The memory
 * will be released as part of JavaScript garbage collection.
 */
dispose(): void {
  if (this.#disposed) {
    return;
  }
  libclang.symbols.clang_disposeSourceRangeList(this.#pointer);
  SOURCE_RANGE_LIST_FINALIZATION_REGISTRY.unregister(this);
}
}
