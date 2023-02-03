import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";
import { CXAvailabilityKind, CXCompletionChunkKind } from "./include/typeDefinitions.ts";
import { cxstringToString, NULL, NULLBUF } from "./utils.ts";

/**
 * A semantic string that describes a code-completion result.
 *
 * A semantic string that describes the formatting of a code-completion
 * result as a single "template" of text that should be inserted into the
 * source buffer when a particular code-completion result is selected.
 * Each semantic string is made up of some number of "chunks", each of which
 * contains some text along with a description of what that text means, e.g.,
 * the name of the entity being referenced, whether the text chunk is part of
 * the template, or whether it is a "placeholder" that the user should replace
 * with actual code,of a specific kind. See {@link CXCompletionChunkKind} for a
 * description of the different kinds of chunks.
 *
 * @hideconstructor
 */
export class CXCompletionString {
  static #constructable = false;
  #pointer: Deno.PointerValue;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(
    pointer: Deno.PointerValue,
  ) {
    if (CXCompletionString.#constructable !== true) {
      throw new Error("CXCompletionString is not constructable");
    }
    this.#pointer = pointer;
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](
    pointer: Deno.PointerValue,
  ): CXCompletionString {
    CXCompletionString.#constructable = true;
    const result = new CXCompletionString(pointer);
    CXCompletionString.#constructable = false;
    return result;
  }

  /**
   * Determine the kind of a particular chunk within this completion string.
   *
   * @param index The 0-based index of the chunk in the completion string.
   * @returns The kind of the chunk at {@link index}.
   */
  getChunkKind(index: number): CXCompletionChunkKind {
    return libclang.symbols.clang_getCompletionChunkKind(this.#pointer, index);
  }

  /**
   * Retrieve the text associated with a particular chunk within a
   * completion string.
   *
   * @param index The 0-based index of the chunk in the completion string.
   * @returns The text associated with the chunk {@link index}.
   */
  getChunkText(index: number): string {
    return cxstringToString(
      libclang.symbols.clang_getCompletionChunkText(this.#pointer, index),
    );
  }

  /**
   * Retrieve the completion string associated with a particular chunk
   * within this completion string.
   *
   * @param index The 0-based index of the chunk in the completion string.
   * @returns The completion string associated with the chunk at {@link index}.
   */
  getChunkCompletionString(index: number): null | CXCompletionString {
    const result = libclang.symbols.clang_getCompletionChunkCompletionString(
      this.#pointer,
      index,
    );
    if (result === NULL) {
      return null;
    }
    return CXCompletionString[CONSTRUCTOR](result);
  }

  /**
   * Retrieve the number of chunks in this code-completion string.
   */
  getNumberOfCompletionChunks(): number {
    return libclang.symbols.clang_getNumCompletionChunks(this.#pointer);
  }

  /**
   * Determine the priority of this code completion.
   *
   * The priority of a code completion indicates how likely it is that this
   * particular completion is the completion that the user will select. The
   * priority is selected by various internal heuristics.
   *
   * @returns The priority of this completion string. Smaller values indicate
   * higher-priority (more likely) completions.
   */
  getPriority(): number {
    return libclang.symbols.clang_getCompletionPriority(this.#pointer);
  }

  /**
   * Determine the availability of the entity that this code-completion
   * string refers to.
   *
   * @returns The availability of the completion string.
   */
  getAvailability(): CXAvailabilityKind {
    return libclang.symbols.clang_getCompletionAvailability(this.#pointer);
  }

  /**
   * Retrieve the number of annotations associated with this
   * completion string.
   *
   * @returns The number of annotations associated with this completion string.
   */
  getNumberOfAnnotations(): number {
    return libclang.symbols.clang_getCompletionNumAnnotations(this.#pointer);
  }

  /**
   * Retrieve the annotation associated with this completion string.
   *
   * @param index The 0-based index of the annotation of the
   * completion string.
   * @returns Annotation string associated with the completion at {@link index},
   * or an empty string if that annotation is not available.
   */
  getAnnotation(index: number): string {
    return cxstringToString(
      libclang.symbols.clang_getCompletionAnnotation(this.#pointer, index),
    );
  }

  /**
   * Retrieve the parent context of this completion string.
   *
   * The parent context of a completion string is the semantic parent of
   * the declaration (if any) that the code completion represents. For example,
   * a code completion for an Objective-C method would have the method's class
   * or protocol as its context.
   *
   * @returns The name of the completion parent, e.g., "NSObject" if
   * the completion string represents a method in the NSObject class.
   */
  getParent(): string {
    return cxstringToString(
      libclang.symbols.clang_getCompletionParent(this.#pointer, NULLBUF),
    );
  }

  /**
   * Retrieve the brief documentation comment attached to the declaration
   * that corresponds to this completion string.
   */
  getBriefComment(): string {
    return cxstringToString(
      libclang.symbols.clang_getCompletionBriefComment(this.#pointer),
    );
  }
}
