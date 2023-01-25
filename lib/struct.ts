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

export type PackSupportedType = bigint | number | string | boolean | Deno.PointerValue;
//type OpGenerator = (offset: number, littleEndian?: boolean) => Opperation<bigint> | Opperation<number> | Opperation<boolean> | Opperation<Deno.PointerValue>;

type OpGenerator<T = any> = ((offset: number, littleEndian?: boolean, multiplicator?: number, alignmentMask?: number) => Opperation<T>) & { isPadding?: boolean, size: number };

// Need to find python spec about s type
// : OpGenerator<string> = (offset: number, multiplicator: number)
const Op_s16: OpGenerator<string> = (offset: number, littleEndian?: boolean, multiplicator = 1) => {
    return {
        type: 'string',
        get: (view: DataView): string => {
            const of = offset + view.byteOffset;
            const data = view.buffer.slice(of, of + multiplicator + multiplicator);
            return String.fromCharCode(...new Uint16Array(data))
        },
        set: (view: DataView, value: string) => {
            for (let i = 0, strLen = value.length; i < strLen; i++) {
                view.setInt16(offset + i + i, value.charCodeAt(i), littleEndian)
            }
        },
        offset,
        size: multiplicator * 2,
    } as Opperation<string>
}
Op_s16.size = 2


const Op_s8: OpGenerator<string> = (offset: number, _littleEndian?: boolean, multiplicator = 1, alignmentMask = 0) => {
    return {
        type: 'string',
        get: (view: DataView): string => {
            const of = offset + view.byteOffset;
            const data = view.buffer.slice(of, of + multiplicator);
            return String.fromCharCode(...new Uint8Array(data))
        },
        set: (view: DataView, value: string) => {
            let strLen = value.length
            for (let i = 0; i < strLen; i++) {
                view.setInt8(offset + i, value.charCodeAt(i))
            }
            while ( strLen & alignmentMask !- 0) {
               view.setInt8(offset + strLen, ' '.charCodeAt(0))
               strLen++;
            }
        },
        offset,
        size: multiplicator,
    } as Opperation<string>
}
Op_s8.size = 1


const Op_b: OpGenerator<number> = (offset: number) => {
    return {
        type: 'int8',
        get: (view: DataView) => view.getInt8(offset),
        set: (view: DataView, value: number) => {
            if (value < -128 || value > 127) {
                throw new Error(`B format requires -128 <= number <= 127, got ${value}`)
            }
            view.setInt8(offset, value)
        },
        offset,
        size: 1,
    } as Opperation<number>
}
Op_b.size = 1

const Op_B: OpGenerator<number> = (offset: number) => {
    return {
        type: 'uint8',
        get: (view: DataView) => view.getUint8(offset),
        set: (view: DataView, value: number) => {
            if (value < 0 || value > 255) {
                throw new Error(`B format requires 0 <= number <= 255, got ${value}`)
            }
            view.setUint8(offset, value)
        },
        offset,
        size: 1,
    } as Opperation<number>
}
Op_B.size = 1

const Op_Bool: OpGenerator<boolean> = (offset: number) => {
    return {
        type: 'bool8',
        get: (view: DataView) => !!view.getUint8(offset),
        set: (view: DataView, value: number | boolean) => {
            return view.setUint8(offset, value ? 1 : 0)
        },
        size: 1,
        offset,
    } as Opperation<boolean>
}
Op_Bool.size = 1

const Op_h: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'short16',
        get: (view: DataView) => view.getInt16(offset, littleEndian),
        set: (view: DataView, value: number) => {
            if (value < -32768 || value > 32767) {
                throw new Error(`h format requires -32768 <= number <= 32767, got ${value}`)
            }
            return view.setInt16(offset, value, littleEndian)
        },
        size: 2,
        offset,
    } as Opperation<number>
}
Op_h.size = 2

const Op_H: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'ushort16',
        get: (view: DataView) => view.getUint16(offset, littleEndian),
        set: (view: DataView, value: number) => {
            if (value < 0 || value > 65535) {
                throw new Error(`H format requires 0 <= number <= 65535, got ${value}`)
            }
            return view.setUint16(offset, value, littleEndian)
        },
        size: 2,
        offset,
    } as Opperation<number>
}
Op_H.size = 2

const Op_i: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'int32',
        get: (view: DataView) => view.getInt32(offset, littleEndian),
        set: (view: DataView, value: number) => {
            if (value < -2147483648 || value > 2147483647) {
                throw new Error(`i/l format requires -2147483648 <= number <= 2147483647, got ${value}`)
            }
            return view.setInt32(offset, value, littleEndian)
        },
        size: 4,
        offset,
    } as Opperation<number>
}
Op_i.size = 4

const Op_I: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'uint32',
        get: (view: DataView) => view.getUint32(offset, littleEndian),
        set: (view: DataView, value: number) => {
            if (value < 0 || value > 4294967295) {
                throw new Error(`I/L format requires 0 <= number <= 4294967295, got ${value}`)
            }
            view.setUint32(offset, value, littleEndian)
        },
        size: 4,
        offset,
    } as Opperation<number>
}
Op_I.size = 4

const Op_q: OpGenerator<bigint> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'int64',
        get: (view: DataView) => view.getBigInt64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigInt64(offset, value, littleEndian),
        size: 8,
        offset: offset,
    } as Opperation<bigint>
}
Op_q.size = 8

const Op_Q: OpGenerator<bigint> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'uint64',
        get: (view: DataView) => view.getBigUint64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigUint64(offset, value, littleEndian),
        size: 8,
        offset,
    } as Opperation<bigint>
}
Op_Q.size = 8

const Op_f: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'float32',
        get: (view: DataView) => view.getFloat32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat32(offset, value, littleEndian),
        size: 4,
        offset,
    } as Opperation<number>
}
Op_f.size = 4

const Op_d: OpGenerator<number> = (offset: number, littleEndian?: boolean) => {
    return {
        type: 'float64',
        get: (view: DataView) => view.getFloat64(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat64(offset, value, littleEndian),
        size: 8,
        offset,
    } as Opperation<number>
}
Op_d.size = 8

const Op_p: OpGenerator<Deno.PointerValue> = (offset: number) => {
    return {
        type: 'pointer',
        //get: (view: DataView, buffer: ArrayBuffer) => Deno.UnsafePointer.of(new DataView(buffer, offset)),
        get: (view: DataView) => Deno.UnsafePointer.of(new DataView(view.buffer, offset + view.byteOffset)),
        set: (view: DataView, value: Deno.PointerValue) => view.setBigUint64(offset, value as bigint),
        size: 8,
        offset,
    } as Opperation<Deno.PointerValue>
}
Op_p.size = 8

/** padding */
const Op_x: OpGenerator<number> = (offset: number) => {
    return {
        type: 'padding',
        get: () => 0,
        set: () => { },
        size: 1,
        offset,
        isPadding: true,
    } as Opperation<number>
}
Op_x.isPadding = true;
Op_x.size = 1

/**
 * This module converts between Deno values and C structs represented as ArrayBuffer objects.
 * 
 * see python doc for usage https://docs.python.org/3/library/struct.html
 */
export class Struct {
    readonly offsets: Opperation<any>[];
    public readonly size: number;

    constructor(public readonly format: string) {
        let littleEndian = isNativelittleEndian;
        let alignmentMask = 0;
        const offsets: Opperation<any>[] = [];
        let size = 0;
        let multiplier = ''
        for (let i = 0; i < format.length; i++) {
            const next = format[i];
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
                    alignmentMask = 7;
                    littleEndian = isNativelittleEndian
                    break
                case '=': // native
                    alignmentMask = 0;
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
                    nextOp = Op_s8 // or 16 ?
                    break
                case 'p': // char[]
                case 'P': // void*
                    nextOp = Op_p
                    break
                default:
                    throw new Error(`Unknown Packing type ${next}`)
            }
            if (nextOp) {
                const times = Number(multiplier || '1')
                if (next === 's') {
                    const getter = nextOp(size, littleEndian, times, alignmentMask)
                    offsets.push(getter)
                    size += getter.size
                    if (alignmentMask) {
                        while ((size & alignmentMask) != 0) {
                            // console.log('add aliognement from', size, 'check', size & alignment, 'alignment', alignment)
                            size += 1
                        }
                    }
                }
                else for (let j = 0; j < times; j++) {
                    // (size, littleEndian)
                    if (!nextOp.isPadding) {
                        const getter = nextOp(size, littleEndian)
                        offsets.push(getter)
                    }
                    size += nextOp.size
                    // aligne ??
                    if (alignmentMask) {
                        while ((size & alignmentMask) != 0) {
                            // console.log('add aliognement from', size, 'check', size & alignment, 'alignment', alignment)
                            size += 1
                        }
                    }
                }
                multiplier = ''
            }
        }
        this.offsets = offsets;
        this.size = size;
    }
    /**
     * Return a bytes object containing the values v1, v2, … packed according to the format string format. The arguments must match the values required by the format exactly.
     * @param values values to pack
     * @returns a bytes object containing the values v1, v2, … packed according to the format string format.
     */
    pack(...values: Array<PackSupportedType>): ArrayBuffer {
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
    pack_into(buffer: ArrayBuffer, offset: number, ...values: Array<PackSupportedType>): ArrayBuffer {
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
    unpack_from(buffer: ArrayBuffer, offset = 0): Array<PackSupportedType> {
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
    *iter_unpack(buffer: ArrayBuffer): Generator<PackSupportedType, void, void> {
        const view = new DataView(buffer);
        const max = this.offsets.length;
        for (let i = 0; i < max; i++) {
            yield this.offsets[i].get(view);
        }
    }
}

/**
 * Return a bytes object containing the values v1, v2, … packed according to the format string format. The arguments must match the values required by the format exactly.
 */
export function pack(format: string, ...values: Array<PackSupportedType>): ArrayBuffer {
    return new Struct(format).pack(...values)
}

/**
 * Pack the values v1, v2, … according to the format string format and write the packed bytes into the writable buffer buffer starting at position offset. Note that offset is a required argument.
 */
export function pack_into(format: string, buffer: ArrayBuffer, offset: number, ...values: Array<PackSupportedType>): ArrayBuffer {
    return new Struct(format).pack_into(buffer, offset, ...values)
}

/**
 * Unpack from the buffer buffer (presumably packed by pack(format, ...)) according to the format string format. The result is a tuple even if it contains exactly one item. The buffer’s size in bytes must match the size required by the format, as reflected by calcsize().
 */
export function unpack(format: string, buffer: ArrayBuffer): Array<PackSupportedType> {
    return new Struct(format).unpack_from(buffer);
}

/**
 * Unpack from buffer starting at position offset, according to the format string format. The result is a tuple even if it contains exactly one item. The buffer’s size in bytes, starting at position offset, must be at least the size required by the format, as reflected by calcsize().
 */
export function unpack_from(format: string, buffer: ArrayBuffer, offset = 0): Array<PackSupportedType> {
    return new Struct(format).unpack_from(buffer, offset);
}

/**
 * Iteratively unpack from the buffer buffer according to the format string format. This function returns an iterator which will read equally sized chunks from the buffer until all its contents have been consumed. The buffer’s size in bytes must be a multiple of the size required by the format, as reflected by calcsize().
 * Each iteration yields a tuple as specified by the format string.
 */
export function iter_unpack(format: string, buffer: ArrayBuffer): Generator<PackSupportedType, void, void> {
    return new Struct(format).iter_unpack(buffer);
}

/**
 * Return the size of the struct (and hence of the bytes object produced by pack(format, ...)) corresponding to the format string format.
 */
export function calcsize(format: string): number {
    return new Struct(format).size;
}