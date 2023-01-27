import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";
import { VFFData } from "./packModel.descriptor.ts";

import { sym_buffer, sym_Model, sym_NField, sym_offsetIndex, sym_struct, sym_view } from "./symboles.ts";

/**
 * public interface added to all FFI mapped struct
 */
export interface FFIObject {
    [sym_buffer]: ArrayBuffer;
    [sym_view]: DataView;
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
function getProto(clazz: new () => unknown): object {
    const cached = ProtoCache.get(clazz)
    if (cached) return cached;
    const oldProto = Object.getPrototypeOf(new clazz());
    const newProto = Object.create(null)
    Object.setPrototypeOf(newProto, oldProto);

    const model = oldProto[sym_Model];
    if (!model)
        throw new Error('No model defined for ' + clazz.name)
    newProto[sym_struct] = new Struct(model)
    newProto[sym_offsetIndex] = new Map<string, number>();
    for (const { key, fid } of oldProto[sym_NField]) {
        const offset = newProto[sym_struct].offsets[fid];
        newProto[sym_offsetIndex].set(key, offset.offset)
    }

    for (const { key, fid } of oldProto[sym_NField]) {
        const offset = newProto[sym_struct].offsets[fid];
        Object.defineProperty(newProto, key, {
            get: function () {
                return offset.get(this[sym_view])
            },
            set: function (value: unknown) {
                offset.set(this[sym_view], value)
            },
            enumerable: true,
            configurable: true,
        })
    }

    newProto.getBuffer = function (): ArrayBuffer {
        return this[sym_buffer]
    };

    newProto.asRef = function () {
        return Deno.UnsafePointer.of(this[sym_buffer])
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
     * allocate a new instance of the given class from the heap
     * @param clazz a class containing the @packModel() decorator
     * @returns a new instance of the class with the FFIObject interface
     */
    allocate<T>(clazz: new () => T): T & FFIObject {
        const proto = getProto(clazz);
        const obj = Object.create(proto) as T & FFIObject;
        const ret = obj as T & FFIObject & VFFData;
        const size = ret[sym_struct].size;
        ret[sym_buffer] = new ArrayBuffer(size) // TMP aprox value
        ret[sym_view] = new DataView(ret[sym_buffer])
        return obj as T & FFIObject;
    },
    /**
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param pointer an FFI pointer to a struct of the given class
     * @returns a mapped instance of the class with the FFIObject interface
     */
    map<T>(clazz: new () => T, pointer: Deno.PointerValue): T & FFIObject {
        const obj = new clazz();
        const proto = getProto(clazz);
        Object.setPrototypeOf(obj, proto);
        const ret = obj as T & FFIObject & VFFData;
        const size = ret[sym_struct].size;
        ret[sym_buffer] = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
        ret[sym_view] = new DataView(ret[sym_buffer]);
        return obj as T & FFIObject;
    },
    /**
     * Get the effective offset of the field, should be used to check if the field had been mapped as expected
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param fieldname the name of the field
     * @returns the C offset of the field
     */
    getFieldOffset(clazz: new () => unknown, fieldname: string): number {
        const proto = getProto(clazz) as VFFData;
        const op = proto[sym_offsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.offset
    },
    /**
     * Get the type of the field, should be used to check if the field had been mapped as expected
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param fieldname the name of the field
     * @returns the C type of the field
     */
    getFieldType(clazz: new () => unknown, fieldname: string): string {
        const proto = getProto(clazz) as VFFData;
        const op = proto[sym_offsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.type;
    },
    /**
     * Get the size of the field, should be used to check if the field had been mapped as expected
     * if fieldname is not provided, the size of the struct will be returned
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param fieldname the name of the field
     * @returns the size of the field in bytes
     */
    getSize(clazz: new () => unknown, fieldname?: string): number {
        const proto = getProto(clazz) as VFFData;
        if (!fieldname)
            return proto[sym_struct].size;
        const op = proto[sym_offsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.size;
    }
}
