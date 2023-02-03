import { BUFFER, CONSTRUCTOR } from "./common.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { libclang } from "./ffi.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { cstr } from "./utils.ts";

const REWRITER_FINALIZATION_REGISTRY = new FinalizationRegistry<
Deno.PointerValue
>((pointer) => libclang.symbols.clang_CXRewriter_dispose(pointer));

/**
 * @hideconstructor
 */
export class CXRewriter {
    static #constructable = false;
    tu: CXTranslationUnit;
    #pointer: Deno.PointerValue;
  
    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(
      tu: CXTranslationUnit,
      pointer: Deno.PointerValue,
    ) {
      if (CXRewriter.#constructable !== true) {
        throw new Error("CXRewriter is not constructable");
      }
      this.tu = tu;
      this.#pointer = pointer;
      REWRITER_FINALIZATION_REGISTRY.register(this, pointer, this);
    }
  
    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
      tu: CXTranslationUnit,
      pointer: Deno.PointerValue,
    ): CXRewriter {
      CXRewriter.#constructable = true;
      const result = new CXRewriter(tu, pointer);
      CXRewriter.#constructable = false;
      return result;
    }
  
    /**
     * Insert the specified string at the specified location in the original buffer.
     */
    insertTextBefore(location: CXSourceLocation, insert: string): void {
      libclang.symbols.clang_CXRewriter_insertTextBefore(
        this.#pointer,
        location[BUFFER],
        cstr(insert),
      );
    }
  
    /**
     * Replace the specified range of characters in the input with the specified
     * replacement.
     */
    replaceText(
      range: CXSourceRange,
      replacement: string,
    ): void {
      libclang.symbols.clang_CXRewriter_replaceText(
        this.#pointer,
        range[BUFFER],
        cstr(replacement),
      );
    }
  
    /**
     * Remove the specified range.
     */
    removeText(range: CXSourceRange): void {
      libclang.symbols.clang_CXRewriter_removeText(this.#pointer, range[BUFFER]);
    }
  
    /**
     * Save all changed files to disk.
     *
     * An error is thrown if all files could not be saved successfully.
     */
    overwriteChangedFiles(): void {
      const result = libclang.symbols.clang_CXRewriter_overwriteChangedFiles(
        this.#pointer,
      );
  
      if (result !== 0) {
        throw new Error("Could not overwrite some changed files.");
      }
    }
  
    /**
     * Write out rewritten version of the main file to stdout.
     */
    writeMainFileToStdOut(): void {
      libclang.symbols.clang_CXRewriter_writeMainFileToStdOut(this.#pointer);
    }
  
    /**
     * Free this CXRewriter.
     *
     * It is not strictly necessary to call this method. The memory
     * will be released as part of JavaScript garbage collection.
     */
    dispose(): void {
      libclang.symbols.clang_CXRewriter_dispose(this.#pointer);
      REWRITER_FINALIZATION_REGISTRY.unregister(this);
    }
  }
  