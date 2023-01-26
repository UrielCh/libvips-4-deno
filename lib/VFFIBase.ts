import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";

const sym_Model = Symbol("model");
const sym_NField = Symbol("nbFields");
const sym_buffer = Symbol("buffer");// : ArrayBuffer;
const sym_view = Symbol("view");//: DataView;
const sym_struct = Symbol("struct");//: DataView;

export interface FFIMapped {
    [sym_Model]: string
    [sym_NField]: Array<{ key: string, fid: number }>
    [sym_buffer]: ArrayBuffer
    [sym_view]: DataView
    [sym_struct]: Struct
}

export function packModel(format: string) {
    return function (t: Object, key: string) {
        const target = t as FFIMapped;
        target[sym_Model] = (target[sym_Model] || '') + format;
        if (!target[sym_NField]) {
            target[sym_NField] = [];
        }
        const fid = target[sym_NField].length;
        target[sym_NField].push({ key, fid });

    }
}

export function setupStruct(self: unknown): FFIMapped {
    const target = self as unknown as FFIMapped;
    const model = target[sym_Model] || '';
    target[sym_struct] = new Struct(model)

    for (const { key, fid } of target[sym_NField]) {
        const offset = target[sym_struct].offsets[fid];
        Object.defineProperty(target, key, {
            get: () => {
                console.log('call getter ', key)
                return offset.get(target[sym_view])
            },
            set: (value: unknown) => {
                console.log('call setter ', key)
                offset.set(target[sym_view], value)
            },
            // value: 1,
            enumerable: true,
            configurable: true,
            // writable: true,
        })
    }
    return target;
}


export class VFFIBase {
    postInit(pointer?: Deno.PointerValue) {
        const ffiobj = setupStruct(this as unknown as FFIMapped);
        const size = ffiobj[sym_struct].size;
        console.log('aloloc buff of size', size, 'bytes')
        if (pointer) {
            ffiobj[sym_buffer] = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
            ffiobj[sym_view] = new DataView(ffiobj[sym_buffer]);
        } else {
            ffiobj[sym_buffer] = new ArrayBuffer(size) // TMP aprox value
            ffiobj[sym_view] = new DataView(ffiobj[sym_buffer])
        }
    }
    public asRef(): Deno.PointerValue {
        return Deno.UnsafePointer.of((this as unknown as FFIMapped)[sym_buffer])
    }

    public getBuffer(): ArrayBuffer {
        return (this as unknown as FFIMapped)[sym_buffer]
    }
}

