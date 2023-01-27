import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";
import { VFFData } from "./packModel.descriptor.ts";

import { sym_buffer, sym_Model, sym_NField, sym_offsetIndex, sym_struct, sym_view } from "./symboles.ts";

export interface FFIObject {
    [sym_buffer]: ArrayBuffer;
    [sym_view]: DataView;
    getBuffer: () => ArrayBuffer;
    asRef(): Deno.PointerValue;
}

const ProtoCache = new Map<new () => unknown, unknown>();

// deno-lint-ignore ban-types
function getProto(clazz: new () => unknown): object {
    const cached = ProtoCache.get(clazz)
    if (cached) return cached;
    // const oldProto = clazz as unknown as VFFData
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

export const FFIMapper = {
    allocate<T>(clazz: new () => T): T & FFIObject {
        const proto = getProto(clazz);
        const obj = Object.create(proto) as T & FFIObject;
        // Object.setPrototypeOf(obj, proto);
        // const p = Object.getPrototypeOf(obj)      
        // console.log(p);
        // console.log('Proto of the parent class');
        // console.log(Object.getPrototypeOf(p));
        const ret = obj as T & FFIObject & VFFData;
        const size = ret[sym_struct].size;
        ret[sym_buffer] = new ArrayBuffer(size) // TMP aprox value
        ret[sym_view] = new DataView(ret[sym_buffer])
        return obj as T & FFIObject;
    },
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
    getFieldOffset(clazz: new () => unknown, fieldname: string): number {
        const proto = getProto(clazz) as VFFData;
        const op = proto[sym_offsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.offset
    },
    getFieldType(clazz: new () => unknown, fieldname: string): string {
        const proto = getProto(clazz) as VFFData;
        const op = proto[sym_offsetIndex].get(fieldname);
        if (op === undefined) {
            throw new Error(`offset for key ${fieldname} not found`)
        }
        return op.type;
    },
    getSize(clazz: new () => unknown, fieldname: string): number {
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
