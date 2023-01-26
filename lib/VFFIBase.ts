import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";

const sym_Model = Symbol("model");
const sym_NField = Symbol("nbFields");
const sym_buffer = Symbol("buffer");// : ArrayBuffer;
const sym_view = Symbol("view");//: DataView;
const sym_struct = Symbol("struct");//: DataView;

const sym_offsetIndex = Symbol("offsetIndex");//: DataView;

export interface VFFData {
    [sym_Model]: string;
    [sym_NField]: Array<{ key: string, fid: number }>;
    [sym_struct]: Struct;
    [sym_offsetIndex]: Map<string, number>;
}

/**
 * field decorator
 * @param format python struct single element pack format
 */
export function packModel(format: string) {
    return function (t: unknown, key: string) {
        const target = t as VFFData;
        target[sym_Model] = (target[sym_Model] || '') + format;
        if (!target[sym_NField]) {
            target[sym_NField] = [];
        }
        const fid = target[sym_NField].length;
        target[sym_NField].push({ key, fid });
    }
}

/**
 * base class for FFI struct mapped.
 * 
 * all the struct field must be declare in the same order as the C struct.
 * all field must be declare with the @packModel() decorator.
 * postInit must be call after the constructor.
 */
export class VFFIBase {
    [sym_buffer]!: ArrayBuffer;
    [sym_view]!: DataView;

    /**
     * if no PointerValue is given, will alocate the space needed to store the C struct.
     * if a PointerValue is given, the class will use this memory to retrieve and update the C struct data.
     * @param pointer an FFI buffer pointer
     */
    postInit(pointer?: Deno.PointerValue) {
        const target: VFFData = Object.getPrototypeOf(this);
        const model = target[sym_Model] || '';
        if (!target[sym_struct]) {
            target[sym_struct] = new Struct(model)
            target[sym_offsetIndex] = new Map<string, number>();
            for (const { key, fid } of target[sym_NField]) {
                const offset = target[sym_struct].offsets[fid];
                target[sym_offsetIndex].set(key, offset.offset)
            }
        }

        for (const { key, fid } of target[sym_NField]) {
            const offset = target[sym_struct].offsets[fid];
            Object.defineProperty(this, key, {
                get: () => {
                    return offset.get(this[sym_view])
                },
                set: (value: unknown) => {
                    offset.set(this[sym_view], value)
                },
                enumerable: true,
                configurable: true,
            })
        }
        const size = target[sym_struct].size;
        if (pointer) {
            this[sym_buffer] = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
            this[sym_view] = new DataView(this[sym_buffer]);
        } else {
            this[sym_buffer] = new ArrayBuffer(size) // TMP aprox value
            this[sym_view] = new DataView(this[sym_buffer])
        }
    }

    public asRef(): Deno.PointerValue {
        return Deno.UnsafePointer.of(this[sym_buffer])
    }

    /**
     * 
     * @returns the buffer mapped to the C struct
     */
    public getBuffer(): ArrayBuffer {
        return this[sym_buffer]
    }

    /**
     * get in bytes the offset of the field in the C struct
     * @param key field name
     * @returns offset in bytes
     */
    public getOffset(key: string): number {
        const target: VFFData = Object.getPrototypeOf(this);
        const offset = target[sym_offsetIndex].get(key);
        if (offset === undefined) {
            throw new Error(`offset for key ${key} not found`)
        }
        return offset
    }
}

