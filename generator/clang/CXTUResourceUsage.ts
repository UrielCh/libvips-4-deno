import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";
import { CXTUResourceUsageEntry } from "./interface.ts";

const RESOURCE_USAGE_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Uint8Array
>((buffer) => libclang.symbols.clang_disposeCXTUResourceUsage(buffer));
/**
 * The memory usage of a CXTranslationUnit, broken into categories.
 *
 * @hideconstructor
 */
export class CXTUResourceUsage {
  static #constructable = false;
  #buffer: Uint8Array;
  #length: number;
  #pointer: Deno.PointerValue;
  #disposed = false;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(buffer: Uint8Array) {
    if (CXTUResourceUsage.#constructable !== true) {
      throw new Error("CXTUResourceUsage is not constructable");
    } else if (buffer.byteLength < 3 * 8) {
      throw new Error("Unexpected CXTUResourceUsage buffer size");
    }
    this.#buffer = buffer;
    RESOURCE_USAGE_FINALIZATION_REGISTRY.register(this, buffer, this);
    const u32Buf = new Uint32Array(buffer.buffer, 8, 1);
    this.#length = u32Buf[0];
    const u64Buf = new BigUint64Array(buffer.buffer, 16, 1);
    this.#pointer = Number(u64Buf[0]);
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](buffer: Uint8Array): CXTUResourceUsage {
    CXTUResourceUsage.#constructable = true;
    const result = new CXTUResourceUsage(buffer);
    CXTUResourceUsage.#constructable = false;
    return result;
  }

  /**
   * The number of resource usage entries in this {@link CXTUResourceUsage}.
   */
  get length(): number {
    return this.#length;
  }

  /**
   * Returns the human-readable string name and number of bytes
   * of the memory category at the given {@link index}.
   */
  at(index: number): CXTUResourceUsageEntry {
    if (this.#disposed) {
      throw new Error(
        "Cannot get entry at index of a disposed CXTUResourceUsage",
      );
    }
    if (index < 0 || index >= this.length) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    const buffer = Deno.UnsafePointerView.getArrayBuffer(
      this.#pointer,
      16,
      16 * index,
    );
    const [kind, , bytes] = new Uint32Array(buffer, 0, 3);
    return {
      kind: Deno.UnsafePointerView.getCString(
        libclang.symbols.clang_getTUResourceUsageName(kind),
      ),
      bytes,
    };
  }

  /**
   * Disposes this {@link CXTUResourceUsage}.
   *
   * It is not strictly necessary to call this method, the memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    libclang.symbols.clang_disposeCXTUResourceUsage(this.#buffer);
    RESOURCE_USAGE_FINALIZATION_REGISTRY.unregister(this);
    this.#disposed = true;
  }
}