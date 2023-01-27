import { Struct, Operation } from "https://deno.land/x/pystruct@0.0.3/mod.ts";
import { VFFData } from "./packModel.descriptor.ts";

import { symBuffer, symFormat, symFields, symOffsetIndex, symStruct, symView } from "./symboles.ts";
import * as pc from "https://deno.land/std@0.173.0/fmt/colors.ts";

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
function getProto(clazz: new () => unknown): object {
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
    /**
     * Get the effective offset of the field, should be used to check if the field had been mapped as expected
     * 
     * @param clazz a class containing the @packModel() decorator
     * @param fieldname the name of the field
     * @returns the C offset of the field
     */
    getFieldOffset(clazz: new () => unknown, fieldname: string): number {
        const proto = getProto(clazz) as VFFData;
        const op = proto[symOffsetIndex].get(fieldname);
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
        const op = proto[symOffsetIndex].get(fieldname);
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
            return proto[symStruct].size;
        const op = proto[symOffsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.size;
    },

    /**
     * Dump the content of the struct as a hex string
     * 
     * @param obj a FFIObject instance
     * @param opts.offset the offset to start dumping from, can be a number or a string (field name)
     * @param opts.color enable ANSI color codes
     * @param opts.collumn the collumn per 16Byte length can be 1 2 or 8
     * @returns 
     */
    hexDump(obj: FFIObject, opts: { offset?: number | string, color?: boolean, collumn?: 1 | 2 | 4 | 8 } = {}): string {
        let offset = opts.offset ?? 0;
        if (typeof offset === 'string') {
            const of = (obj as unknown as VFFData)[symOffsetIndex].get(offset);
            if (!of)
                throw new Error(`offset for key ${offset} not found`)
            offset = of.offset;
        }
        const u8_ = new Uint8Array(obj.getBuffer(), offset);
        let pp = Array.from(u8_)
            .map((i) => i.toString(16).padStart(2, '0'))
            .join(' ')
            .replace(/([a-f0-9 ]{45} )/g, '$1\n');
        const collumn = opts.collumn ?? 4;
        if (collumn === 8)  // 4 collumn
            pp = pp.replace(/([a-f0-9 ]{4} )/g, '$1  ')
        else if (collumn === 4)  // 4 collumn
            pp = pp.replace(/([a-f0-9 ]{10} )/g, '$1  ')
        else if (collumn === 2)  // 4 collumn
            pp = pp.replace(/([a-f0-9 ]{23} )/g, '$1  ')

        if (opts.color) {
            pp = pp.replace(/00/g, pc.dim('00'));
        }

        const lines = pp.split(/\n/);
        const indexLen = lines.length.toString(16).length
        pp = lines.map((l, i) => {
            let prefix = `${i.toString(16).padStart(indexLen, '0')}0:`;
            if (opts.color)
                prefix = pc.green(prefix);
            return `${prefix} ${l}`
        }).join('\n')
        return pp;
    }

}
