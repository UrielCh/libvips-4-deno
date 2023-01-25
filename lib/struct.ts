import { endianness } from "https://deno.land/std@0.165.0/node/os.ts";
const isNativelittleEndian = endianness() === 'LE';
/**
 * stuct builder like python stuct
 * https://docs.python.org/3/library/struct.html
 */
export type Opperation<T> = {
    type: string;
    get: (view: DataView) => T;
    set: (view: DataView, value: T) => void;
    size: number,
    offset: number;
    isPadding?: boolean;
}
type OpGenerator = (offset: number, littleEndian?: boolean) => Opperation<any>;

const Op_b = (offset: number) => {
    return {
        type: 'int8',
        get: (view: DataView) => view.getInt8(offset),
        set: (view: DataView, value: number) => view.setInt8(offset, value),
        offset,
        size: 1,
    } as Opperation<number>
}
const Op_B = (offset: number) => {
    return {
        type: 'uint8',
        get: (view: DataView) => view.getUint8(offset),
        set: (view: DataView, value: number) => view.setUint8(offset, value),
        offset,
        size: 1,
    } as Opperation<number>
}
const Op_Bool = (offset: number) => {
    return {
        type: 'bool8',
        get: (view: DataView) => !!view.getUint8(offset),
        set: (view: DataView, value: boolean) => view.setUint8(offset, value ? 1 : 0),
        size: 1,
        offset,
    } as Opperation<boolean>
}

const Op_h = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'short16',
        get: (view: DataView) => view.getInt16(offset, littleEndian),
        set: (view: DataView, value: number) => view.setInt16(offset, value, littleEndian),
        size: 2,
        offset,
    } as Opperation<number>
}
const Op_H = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'ushort16',
        get: (view: DataView) => view.getUint16(offset, littleEndian),
        set: (view: DataView, value: number) => view.setUint16(offset, value, littleEndian),
        size: 2,
        offset,
    } as Opperation<number>
}

const Op_i = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'int32',
        get: (view: DataView) => view.getInt32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setInt32(offset, value, littleEndian),
        size: 4,
        offset,
    } as Opperation<number>
}
const Op_I = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'uint32',
        get: (view: DataView) => view.getUint32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setUint32(offset, value, littleEndian),
        size: 4,
        offset,
    } as Opperation<number>
}

const Op_q = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'int64',
        get: (view: DataView) => view.getBigInt64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigInt64(offset, value, littleEndian),
        size: 8,
        offset: offset,
    } as Opperation<bigint>
}
const Op_Q = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'uint64',
        get: (view: DataView) => view.getBigUint64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigUint64(offset, value, littleEndian),
        size: 8,
        offset,
    } as Opperation<bigint>
}

const Op_f = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'float32',
        get: (view: DataView) => view.getFloat32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat32(offset, value, littleEndian),
        size: 4,
        offset,
    } as Opperation<number>
}
const Op_d = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'float64',
        get: (view: DataView) => view.getFloat64(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat64(offset, value, littleEndian),
        size: 8,
        offset,
    } as Opperation<number>
}

const Op_p = (offset: number) => {
    return {
        type: 'pointer',
        //get: (view: DataView, buffer: ArrayBuffer) => Deno.UnsafePointer.of(new DataView(buffer, offset)),
        get: (view: DataView) => Deno.UnsafePointer.of(new DataView(view.buffer, offset + view.byteOffset)),
        set: (view: DataView, value: Deno.PointerValue) => view.setBigUint64(offset, value as bigint),
        size: 8,
        offset,
    } as Opperation<Deno.PointerValue>
}

/** padding */
const Op_x = (offset: number) => {
    return {
        type: 'padding',
        get: () => null,
        set: () => { },
        size: 1,
        offset,
        isPadding: true,
    } as Opperation<null>
}

export class Struct {
    readonly offsets: Opperation<any>[];
    readonly size: number;
    constructor(model: string) {
        let littleEndian = isNativelittleEndian;
        const offsets: Opperation<any>[] = [];
        let size = 0;
        let next = model[0];
        // struct like https://docs.python.org/3/library/struct.html
        let multiplier = ''
        for (let i = 0; i < model.length; i++) {
            let nextOp: OpGenerator | null = null
            switch (next) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    multiplier += next
                    break
                case '@': // native
                case '=': // native
                    littleEndian = isNativelittleEndian
                    break
                case '<': // little endian
                    littleEndian = true
                    break
                case '!': // network (= big-endian)
                case '>': // big endian
                    littleEndian = false
                    break;
                case 'x': // padding
                    nextOp = Op_x
                    break;
                case 'c': // char
                case 'b': // signed char
                    nextOp = Op_b
                    break;
                case 'B': // unsigned char
                    nextOp = Op_B
                    break;
                case '?': // bool
                    nextOp = Op_Bool
                    break;
                case 'h': // short
                    nextOp = Op_h
                    break;
                case 'H': // unsigned short
                    nextOp = Op_H
                    break;
                case 'i': // int
                case 'l': // long
                    nextOp = Op_i
                    break;
                case 'I': // unsigned int
                case 'L': // unsigned long
                    nextOp = Op_I
                    break;
                case 'q': // long long
                case 'n': // ssize_t 64 bit only
                    nextOp = Op_q
                    break
                case 'Q': // unsigned long long
                case 'N': // size_t 64 bit only
                    nextOp = Op_Q
                    break

                //case 'e': // float 16bit not available in deno
                //    nextOp = Op_e(size, littleEndian));
                //    break;

                case 'f': // float
                    nextOp = Op_f
                    break
                case 'd': // double
                    nextOp = Op_d
                    break
                case 's': // char[] should be a buffer ?
                case 'p': // char[]
                case 'P': // void*
                    nextOp = Op_p
                    break
                default:
                    throw new Error(`Unknown Packing type ${next}`)
            }
            if (nextOp) {
                const times = Number(multiplier || '1')
                for (let j = 0; j < times; j++) {
                    const getter = nextOp(size, littleEndian)
                    // (size, littleEndian)
                    if (!getter.isPadding) {
                        offsets.push(getter)
                    }
                    size += getter.size
                }
                multiplier = ''
            }
            next = model[i + 1]
        }
        // console.log('model:', model)
        // console.log('offsets:', offsets)
        // console.log('size:', size)
        this.offsets = offsets;
        this.size = size;
    }
    /**
     * Return a bytes object containing the values v1, v2, … packed according to the format string format. The arguments must match the values required by the format exactly.
     * @param values values to pack
     * @returns a bytes object containing the values v1, v2, … packed according to the format string format.
     */
    pack(...values: any[]): ArrayBuffer {
        const buffer = new ArrayBuffer(this.size);
        const view = new DataView(buffer);
        const max = Math.min(this.offsets.length, values.length);
        for (let i = 0; i < max; i++) {
            const op = this.offsets[i];
            op.set(view, values[i]);
        }
        return buffer;
    }
    /**
     * Unpack from the buffer buffer (presumably packed by pack(format, ...)) according to the format string format.
     * The result is a tuple even if it contains exactly one item. The buffer’s size in bytes must match the size required by the format, as reflected by calcsize().
     * 
     * @param buffer destination buffer
     * @param offset in destination offset
     * @param values values to pack
     * @returns the inputed buffer
     */
    pack_into(buffer: ArrayBuffer, offset: number, ...values: any[]) {
        const view = new DataView(buffer, offset);
        const max = Math.min(this.offsets.length, values.length);
        for (let i = 0; i < max; i++) {
            this.offsets[i].set(view, values[i]);
        }
        return buffer;
    }
    /**
     * Unpack from buffer starting at position offset, according to the format string format.
     * The result is a tuple even if it contains exactly one item. The buffer’s size in bytes,
     * starting at position offset, must be at least the size required by the format,
     * as reflected by calcsize().
     */
    unpack_from(buffer: ArrayBuffer, offset = 0) {
        const view = new DataView(buffer, offset);
        const values = [];
        for (const op of this.offsets) {
            values.push(op.get(view));
        }
        return values;
    }

    /**
     * Iteratively unpack from the buffer buffer according to the format string format.
     * This function returns an iterator which will read equally sized chunks from the buffer until all its contents have been consumed.
     * The buffer’s size in bytes must be a multiple of the size required by the format, as reflected by calcsize().
     * Each iteration yields a tuple as specified by the format string.
     */
    *iter_unpack(buffer: ArrayBuffer) {
        const view = new DataView(buffer);
        const max = this.offsets.length;
        for (let i = 0; i < max; i++) {
            yield this.offsets[i].get(view);
        }
    }

    /**
     * Return the size of the struct (and hence of the bytes object produced by pack(format, ...)) corresponding to the format string format.
     * @returns packing size
     */
    calcsize(): number {
        return this.size;
    }
}
