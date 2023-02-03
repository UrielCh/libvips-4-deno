import { BUFFER, CONSTRUCTOR, POINTER } from "./common.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { libclang } from "./ffi.ts";
import { CXTokenKind } from "./include/typeDefinitions.ts";
import { CXTranslationUnit } from "./rest.ts";
import { cxstringToString } from "./utils.ts";

const TOKEN_POINTER_USAGE_MAP = new Map<
    Deno.PointerValue,
    { tu: Deno.PointerValue; count: number; disposed: number }
>();
const disposeToken = (pointer: Deno.PointerValue) => {
    const entry = TOKEN_POINTER_USAGE_MAP.get(pointer);
    if (!entry) {
        console.error(
            "Tried to dispose CXToken for which no base pointer exists anymore! Double-free!",
        );
        Deno.exit(-1);
    }
    entry.disposed++;
    if (entry.disposed === entry.count) {
        libclang.symbols.clang_disposeTokens(entry.tu, pointer, entry.count);
        TOKEN_POINTER_USAGE_MAP.delete(pointer);
    }
};
const TOKEN_FINALIZATION_REGISTRY = new FinalizationRegistry<
    Deno.PointerValue
>((pointer) => disposeToken(pointer));

/**
* Describes a single preprocessing token.
*
* @hideconstructor
*/
export class CXToken {
    static #constructable = false;
    tu: CXTranslationUnit;
    #pointer: Deno.PointerValue;
    #buffer: Uint8Array;
    #kind: CXTokenKind;
    #disposed = false;

    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(
        tu: CXTranslationUnit,
        pointer: Deno.PointerValue,
        buffer: Uint8Array,
    ) {
        if (CXToken.#constructable !== true) {
            throw new Error("CXToken is not constructable");
        }
        this.tu = tu;
        this.#pointer = pointer;
        const usageEntry = TOKEN_POINTER_USAGE_MAP.get(pointer);
        if (usageEntry) {
            usageEntry.count++;
        } else {
            TOKEN_POINTER_USAGE_MAP.set(pointer, {
                count: 1,
                disposed: 0,
                tu: tu[POINTER],
            });
        }
        TOKEN_FINALIZATION_REGISTRY.register(this, pointer, this);
        this.#buffer = buffer;
        this.#kind = libclang.symbols.clang_getTokenKind(this.#buffer);
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
        tu: CXTranslationUnit,
        pointer: Deno.PointerValue,
        buffer: Uint8Array,
    ): CXToken {
        CXToken.#constructable = true;
        const result = new CXToken(tu, pointer, buffer);
        CXToken.#constructable = false;
        return result;
    }

    /**
     * The kind of this token.
     */
    get kind(): CXTokenKind {
        return this.#kind;
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    get [BUFFER](): Uint8Array {
        return this.#buffer;
    }

    /**
     * Retrieve a source range that covers this token.
     */
    getExtent(): CXSourceRange {
        if (this.#disposed) {
            throw new Error("Cannot get extent of disposed CXToken");
        }
        return CXSourceRange[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getTokenExtent(this.tu[POINTER], this.#buffer),
        )!;
    }

    /**
     * Retrieve the source location of this token.
     */
    getLocation(): CXSourceLocation {
        if (this.#disposed) {
            throw new Error("Cannot get location of disposed CXToken");
        }
        return CXSourceLocation[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getTokenLocation(this.tu[POINTER], this.#buffer),
        );
    }

    /**
     * Determine the spelling of this token.
     *
     * The spelling of a token is the textual representation of that token, e.g.,
     * the text of an identifier or keyword.
     */
    getSpelling(): string {
        if (this.#disposed) {
            throw new Error("Cannot get spelling of disposed CXToken");
        }
        return cxstringToString(
            libclang.symbols.clang_getTokenSpelling(this.tu[POINTER], this.#buffer),
        );
    }

    /**
     * Free this token.
     *
     * It is not strictly necessary to call this method. The memory
     * will be released as part of JavaScript garbage collection.
     */
    dispose(): void {
        if (this.#disposed) {
            return;
        }
        disposeToken(this.#pointer);
        TOKEN_FINALIZATION_REGISTRY.unregister(this);
        this.#disposed = true;
    }
}
