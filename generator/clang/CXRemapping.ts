import { libclang } from "./ffi.ts";
import { cstr, CStringArray, cxstringToString, NULL } from "./utils.ts";

const OUT = new Uint8Array(16);

const REMAPPINGS_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_remap_dispose(pointer));
/**
 * A remapping of original source files and their translated files.
 */
export class CXRemapping {
  #pointer: Deno.PointerValue;
  #length: number;
  #disposed = false;

  /**
   * Retrieve a remapping.
   *
   * @param fileNames A path that contains metadata about remappings, or an array of
   * file paths containing remapping info.
   * @returns The requested remapping. An error is thrown if an error occurred while
   * retrieving the remapping.
   */
  constructor(fileNames: string | string[]) {
    if (typeof fileNames === "string") {
      this.#pointer = libclang.symbols.clang_getRemappings(cstr(fileNames));
    } else {
      this.#pointer = libclang.symbols.clang_getRemappingsFromFileList(
        new CStringArray(fileNames),
        fileNames.length,
      );
    }
    if (this.#pointer === NULL) {
      throw new Error("Failed to create get CXRemappings");
    }
    REMAPPINGS_FINALIZATION_REGISTRY.register(this, this.#pointer, this);
    this.#length = libclang.symbols.clang_remap_getNumFiles(
      this.#pointer,
    );
  }

  /**
   * The number of remappings.
   */
  get length(): number {
    return this.#length;
  }

  /**
   * Get the original and the associated filename from this remapping.
   */
  getFileNames(index: number): {
    /**
     * The original filename of the remapping at {@link index}.
     */
    original: string;
    /**
     * The filename that the {@link original} is associated with.
     */
    transformed: string;
  } {
    if (this.#disposed) {
      throw new Error("Cannot get file names of disposed CXRemapping");
    } else if (index < 0 || this.length <= index) {
      throw new Error(
        "Invalid argument, index must be unsigned integer within half-open range [0, length)",
      );
    }
    const transformedOut = new Uint8Array(16);
    libclang.symbols.clang_remap_getFilenames(
      this.#pointer,
      index,
      OUT,
      transformedOut,
    );
    const original = cxstringToString(OUT);
    const transformed = cxstringToString(transformedOut);
    return {
      original,
      transformed,
    };
  }

  /**
   * Dispose the remapping.
   *
   * It is not strictly necessary to call this method. The memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    libclang.symbols.clang_remap_dispose(this.#pointer);
    this.#disposed = true;
    REMAPPINGS_FINALIZATION_REGISTRY.unregister(this);
  }
}
