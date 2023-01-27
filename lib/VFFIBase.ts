import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";
// todo Export type from pystruct
// replace Opperation<T>  by Operation<T = unknown> 
import { type Opperation } from "https://deno.land/x/pystruct@0.0.2/struct.ts";
import { packModel, VFFData } from "./packModel.descriptor.ts";
import { sym_buffer, sym_Model, sym_NField, sym_offsetIndex, sym_struct, sym_view } from "./symboles.ts";

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

        // called once
        if (!target[sym_struct]) {
            const model = target[sym_Model] || '';
            target[sym_struct] = new Struct(model)
            target[sym_offsetIndex] = new Map<string, Opperation<unknown>>();
            if (target[sym_NField])
                for (const { key, fid } of target[sym_NField]) {
                    const offset = target[sym_struct].offsets[fid];
                    target[sym_offsetIndex].set(key, offset)
                }
        }
        // called for each instance can be mode to factory and called once
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
        // called for each instance
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
        const op = target[sym_offsetIndex].get(key);
        if (op === undefined) {
            throw new Error(`offset for key ${key} not found`)
        }
        return op.offset;
    }
}

// export class toto {
//     @packModel("<i")
//     aa!: number;
// }
//  extends toto
export class VipsRect {
    @packModel("<i")
    left!: number;
    @packModel("i")
    top!: number;
    @packModel("i")
    width!: number;
    @packModel("i")
    height!: number;
}

