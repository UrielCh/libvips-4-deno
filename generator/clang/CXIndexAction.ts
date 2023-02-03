import { CONSTRUCTOR } from "./common.ts";
import { libclang } from "./ffi.ts";

const INDEX_ACTION_FINALIZATION_REGISTRY = new FinalizationRegistry<
    Deno.PointerValue
>((pointer) => libclang.symbols.clang_IndexAction_dispose(pointer));

/**
* An indexing action/session, to be applied to one or multiple
* translation units.
*
* @hideconstructor
*/
export class CXIndexAction {
    static #constructable = false;
    #pointer: Deno.PointerValue;

    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(
        pointer: Deno.PointerValue,
    ) {
        if (CXIndexAction.#constructable !== true) {
            throw new Error("CXIndexAction is not constructable");
        }
        this.#pointer = pointer;
        INDEX_ACTION_FINALIZATION_REGISTRY.register(this, pointer, this);
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
        pointer: Deno.PointerValue,
    ): CXIndexAction {
        CXIndexAction.#constructable = true;
        const result = new CXIndexAction(pointer);
        CXIndexAction.#constructable = false;
        return result;
    }

    // indexSourceFile(callbacks: [], options: CXIndexOptFlags[])  {
    //   libclang.symbols.clang_indexSourceFile(this.#pointer, NULL, new Uint8Array(), 0, options.reduce((acc, flag) => acc | flag, 0), NULL, arg_6, arg_7, arg_8, arg_9, arg_10, arg_11, arg_12);
    // }

    // indexSourceFileFullArgv(arg_0: CXIndexAction, arg_1: CXClientData, arg_2: buf(IndexerCallbacks), arg_3: unsigned, arg_4: unsigned, arg_5: constCharPtr, arg_6: string, arg_7: int, arg_8: CXUnsavedFile, arg_9: unsigned, arg_10: CXTranslationUnit, arg_11: unsigned, arg_12: asd)  { libclang.symbols.clang_indexSourceFileFullArgv(arg_0, arg_1, arg_2, arg_3, arg_4, arg_5, arg_6, arg_7, arg_8, arg_9, arg_10, arg_11, arg_12); }

    // indexTranslationUnit(arg_0: CXIndexAction, arg_1: CXClientData, arg_2: IndexerCallbacks, arg_3: unsigned, arg_4: unsigned, arg_5: CXTranslationUnit, arg_6: asd )  { libclang.symbols.clang_indexTranslationUnit(arg_0, arg_1, arg_2, arg_3, arg_4, arg_5, arg_6); }

    /**
     * Destroy the given index action.
     *
     * The index action must not be destroyed until all of the translation units
     * created within that index action have been destroyed.
     */
    dispose(): void {
        libclang.symbols.clang_IndexAction_dispose(this.#pointer);
        INDEX_ACTION_FINALIZATION_REGISTRY.unregister(this);
    }
}
