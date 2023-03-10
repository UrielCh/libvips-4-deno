import { Struct, type Operation } from "./deps.ts";
import { VFFData } from "./packModel.descriptor.ts";

import { symBuffer, symFormat, symFields, symOffsetIndex, symStruct, symView } from "./symboles.ts";

/**
 * public interface added to all FFI mapped struct
 */
export interface FFIObject {
    [symBuffer]: ArrayBuffer;
    [symView]: DataView;
    getBuffer: () => ArrayBuffer;
    asRef(): Deno.PointerValue;
}

/**
 * localmodule only cache of all prototypes
 */
const ProtoCache = new Map<new () => unknown, unknown>();

/**
 * construct the new prototype for the given class and cache it
 * @param clazz a class containing the @packModel() decorator
 * @returns the supercharged prototype
 */
// deno-lint-ignore ban-types
export function getProto(clazz: new () => unknown): object {
    const cached = ProtoCache.get(clazz)
    if (cached) return cached;
    const oldProto = Object.getPrototypeOf(new clazz());
    const newProto: (VFFData & FFIObject) = Object.create(null)
    Object.setPrototypeOf(newProto, oldProto);

    const format = oldProto[symFormat];
    if (!format)
        throw new Error('No model defined for ' + clazz.name)
    newProto[symStruct] = new Struct(format)
    newProto[symOffsetIndex] = new Map<string, Operation>();
    for (const { key, fid } of oldProto[symFields]) {
        const offset = newProto[symStruct].offsets[fid];
        newProto[symOffsetIndex].set(key, offset)
    }

    for (const { key, fid } of oldProto[symFields]) {
        const offset = newProto[symStruct].offsets[fid];
        Object.defineProperty(newProto, key, {
            get: function () {
                return offset.get(this[symView])
            },
            set: function (value: unknown) {
                offset.set(this[symView], value)
            },
            enumerable: true,
            configurable: true,
        })
    }

    newProto.getBuffer = function (): ArrayBuffer {
        return this[symBuffer]
    };

    newProto.asRef = function () {
        return Deno.UnsafePointer.of(this[symBuffer])
    };

    ProtoCache.set(clazz, newProto);
    return newProto;
}

/**
 * # FFIMapper
 * 
 * This module is responsible for mapping a class to a FFI struct
 * 
 * Note: the constructor of the class must be empty, it will be called with `new`
 */
export const FFIMapper = {
    /**
     * Allocate a new instance of the given class from the heap
     * 
     * @param clazz a class containing the @packModel() decorator
     * @returns a new instance of the class with the FFIObject interface
     */
    allocate<T>(clazz: new () => T): T & FFIObject {
        const proto = getProto(clazz);
        const obj = Object.create(proto) as T & FFIObject;
        const ret = obj as T & FFIObject & VFFData;
        const size = ret[symStruct].size;
        ret[symBuffer] = new ArrayBuffer(size) // TMP aprox value
        ret[symView] = new DataView(ret[symBuffer])
        return obj as T & FFIObject;
    },
    /**
     * Attach an existing FFI struct to a new instance of the given class
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param pointer an FFI pointer to a struct of the given class
     * @returns a mapped instance of the class with the FFIObject interface
     */
    attach<T>(clazz: new () => T, pointer: Deno.PointerValue): T & FFIObject {
        const proto = getProto(clazz);
        const obj = Object.create(proto) as T & FFIObject;
        const ret = obj as T & FFIObject & VFFData;
        const size = ret[symStruct].size;
        ret[symBuffer] = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
        ret[symView] = new DataView(ret[symBuffer]);
        return obj as T & FFIObject;
    },
}
