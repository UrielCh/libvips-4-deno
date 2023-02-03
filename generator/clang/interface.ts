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

export type SemVerString = `${number}.${number}.${number}`;

/**
 * Describes the availability of a given entity on a particular platform, e.g.,
 * a particular class might only be available on Mac OS 10.7 or newer.
 */
export interface AvailabilityEntry {
  /**
   * The version number in which this entity was deprecated (but is
   * still available).
   */
  deprecated: SemVerString;
  /**
   * The version number in which this entity was introduced.
   */
  introduced: SemVerString;
  /**
   * An optional message to provide to a user of this API, e.g., to
   * suggest replacement APIs.
   */
  message: string;
  /**
   * The version number in which this entity was obsoleted, and therefore
   * is no longer available.
   */
  obsoleted: SemVerString;
  /**
   * A string that describes the platform for which this structure
   * provides availability information.
   *
   * Possible values are "ios" or "macos".
   */
  platform: string;
  /**
   * Whether the entity is unconditionally unavailable on this platform.
   */
  unavailable: boolean;
}

export interface GlobalOptions {
  /**
   * Used to indicate that threads that libclang creates for indexing
   * purposes should use background priority.
   *
   * Affects {@link CXIndexAction#indexSourceFile}, {@link CXIndexAction.indexTranslationUnit},
   * {@link CXIndex#parseTranslationUnit}, {@link CXTranslationUnit#save}.
   */
  threadBackgroundPriorityForIndexing: boolean;
  /**
   * Used to indicate that threads that libclang creates for editing
   * purposes should use background priority.
   *
   * Affects {@link CXIndex#reparseTranslationUnit}, {@link CXTranslationUnit#codeCompleteAt},
   * {@link CXTranslationUnit#annotateTokens}
   */
  threadBackgroundPriorityForEditing: boolean;
}

