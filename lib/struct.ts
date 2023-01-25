import { endianness } from "https://deno.land/std@0.165.0/node/os.ts";
const isNativelittleEndian = endianness() === 'LE';
/**
 * stuct builder like python stuct
 * https://docs.python.org/3/library/struct.html
 */
export type Opperation<T> = {
    type: string;
    get: (view: DataView, buffer: ArrayBuffer) => T;
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
        get: (view: DataView, buffer: ArrayBuffer) => Deno.UnsafePointer.of(new DataView(buffer, offset)),
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
    offsets: Opperation<any>[];
    size: number;
    constructor(model: string) {
        let littleEndian = isNativelittleEndian;
        const offsets: Opperation<any>[] = [];
        let size = 0;
        let next = model[0];
        // struct like https://docs.python.org/3/library/struct.html
        for (let i = 0; i < model.length; i++) {
            let s = 0;
            switch (next) {
                case '@': // native
                case '=': // native
                    littleEndian = isNativelittleEndian;
                    break;
                case '<': // little endian
                    littleEndian = true;
                    break;
                case '!': // network (= big-endian)
                case '>': // big endian
                    littleEndian = false;
                    break;
                case 'x': // padding
                    offsets.push(Op_x(size));
                    s = 1;
                    break;
                case 'c': // char
                case 'b': // signed char
                    offsets.push(Op_b(size));
                    s = 1;
                    break;
                case 'B': // unsigned char
                    offsets.push(Op_B(size));
                    s = 1;
                    break;
                case '?': // bool
                    offsets.push(Op_Bool(size));
                    s = 1;
                    break;
                case 'h': // short
                    offsets.push(Op_h(size, littleEndian));
                    s = 2;
                    break;
                case 'H': // unsigned short
                    offsets.push(Op_H(size, littleEndian));
                    s = 2;
                    break;
                case 'i': // int
                case 'l': // long
                    offsets.push(Op_i(size, littleEndian));
                    s = 4;
                    break;
                case 'I': // unsigned int
                case 'L': // unsigned long
                    offsets.push(Op_I(size, littleEndian));
                    s = 4;
                    break;
                case 'q': // long long
                case 'n': // ssize_t 64 bit only
                    offsets.push(Op_q(size, littleEndian));
                    s = 8;
                    break;
                case 'Q': // unsigned long long
                case 'N': // size_t 64 bit only
                    offsets.push(Op_Q(size, littleEndian));
                    s = 8;
                    break;

                //case 'e': // float 16bit not available in deno
                //    offsets.push(Op_f(size, littleEndian));
                //    s = 4;
                //    break;

                case 'f': // float
                    offsets.push(Op_f(size, littleEndian));
                    s = 4;
                    break;
                case 'd': // double
                    offsets.push(Op_d(size, littleEndian));
                    s = 8;
                    break;
                case 's': // char[] should be a buffer ?
                case 'p': // char[]
                case 'P': // void*
                    offsets.push(Op_p(size));
                    s = 8;
                    break;
                default:
                    throw new Error(`Unknown type ${next}`);
            }
            next = model[i + 1]
            if (next === '{') {
                const end = model.indexOf('}', i + 2);
                // if (s)
                // console.log(`change offset from type ${prev} from ${s} to ${model.slice(i + 2, end)}`)
                s = parseInt(model.slice(i + 2, end));
                i = end;
                next = model[i + 1];
            }
            size += s;
        }
        this.offsets = offsets;
        this.size = size;
    }

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
    pack_into(buffer: ArrayBuffer, offset: number, ...values: any[]) {
        const view = new DataView(buffer);
        const max = Math.min(this.offsets.length, values.length);
        for (let i = 0; i < max; i++) {
            let op = this.offsets[i];
            op = {...op}
            op.offset += offset;
            op.set(view, values[i]);
        }
        return buffer;
    }
    calcsize(): number {
        return this.size;
    } 
}
