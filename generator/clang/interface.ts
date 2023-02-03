import { DISPOSE } from "./common.ts";

/**
 * Target information for a given translation unit.
 */
export interface TargetInfo {
    /**
     * Normalized target triple.
     */
    triple: string;
    /**
     * Pointer width of the target in bits.
     */
    pointerWidth: number;
  }
  
  /**
   * Provides the contents of a file that has not yet been saved to disk.
   *
   * Each {@link UnsavedFile} instance provides the name of a file on the
   * system along with the current contents of that file that have not
   * yet been saved to disk.
   */
  export interface UnsavedFile {
    /**
     * The file whose contents have not yet been saved.
     *
     * This file must already exist in the file system.
     */
    filename: string;
    /**
     * A buffer containing the unsaved contents of this file.
     */
    contents: Uint8Array;
  }
  
  export interface Dependent {
    [DISPOSE]?(): void;
  }
  
export type DependentsSet = Set<WeakRef<Dependent>>;

export interface CXTUResourceUsageEntry {
  /**
   * Human-readable string that represents the name of the memory category.
   */
  kind: string;
  /**
   * Number of bytes used by the memory category.
   */
  bytes: number;
}


