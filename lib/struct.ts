/**
 * stuct builder like python stuct
 * https://docs.python.org/3/library/struct.html
 */
export type Opperation<T> = {
    type: string;
    get: (view: DataView, buffer: ArrayBuffer) => T;
    set: (view: DataView, value: T) => void;
    offset: number;
}

const Op_b = (offset: number) => {
    return {
        type: 'int8',
        get: (view: DataView) => view.getInt8(offset),
        set: (view: DataView, value: number) => view.setInt8(offset, value),
        offset,
    } as Opperation<number>
}
const Op_B = (offset: number) => {
    return {
        type: 'uint8',
        get: (view: DataView) => view.getUint8(offset),
        set: (view: DataView, value: number) => view.setUint8(offset, value),
        offset,
    } as Opperation<number>
}
const Op_Bool = (offset: number) => {
    return {
        type: 'bool8',
        get: (view: DataView) => !!view.getUint8(offset),
        set: (view: DataView, value: boolean) => view.setUint8(offset, value ? 1 : 0),
        offset,
    } as Opperation<boolean>
}

const Op_h = (offset: number, littleEndian: boolean) => {
    return {
        type: 'short16',
        get: (view: DataView) => view.getInt16(offset, littleEndian),
        set: (view: DataView, value: number) => view.setInt16(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}
const Op_H = (offset: number, littleEndian: boolean) => {
    return {
        type: 'ushort16',
        get: (view: DataView) => view.getUint16(offset, littleEndian),
        set: (view: DataView, value: number) => view.setUint16(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}

const Op_i = (offset: number, littleEndian: boolean) => {
    return {
        type: 'int32',
        get: (view: DataView) => view.getInt32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setInt32(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}
const Op_I = (offset: number, littleEndian: boolean) => {
    return {
        type: 'uint32',
        get: (view: DataView) => view.getUint32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setUint32(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}

const Op_q = (offset: number, littleEndian: boolean) => {
    return {
        type: 'int64',
        get: (view: DataView) => view.getBigInt64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigInt64(offset, value, littleEndian),
        offset: offset,
    } as Opperation<bigint>
}
const Op_Q = (offset: number, littleEndian: boolean) => {
    return {
        type: 'uint64',
        get: (view: DataView) => view.getBigUint64(offset, littleEndian),
        set: (view: DataView, value: bigint) => view.setBigUint64(offset, value, littleEndian),
        offset,
    } as Opperation<bigint>
}

const Op_f = (offset: number, littleEndian: boolean) => {
    return {
        type: 'float32',
        get: (view: DataView) => view.getFloat32(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat32(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}
const Op_d = (offset: number, littleEndian: boolean) => {
    return {
        type: 'float64',
        get: (view: DataView) => view.getFloat64(offset, littleEndian),
        set: (view: DataView, value: number) => view.setFloat64(offset, value, littleEndian),
        offset,
    } as Opperation<number>
}

const Op_p = (offset: number) => {
    return {
        type: 'pointer',
        get: (view: DataView, buffer: ArrayBuffer) => Deno.UnsafePointer.of(new DataView(buffer, offset)),
        set: (view: DataView, value: Deno.PointerValue) => view.setBigUint64(offset, value as bigint),
        offset,
    } as Opperation<Deno.PointerValue>
}

/** padding */
const Op_x = (offset: number) => {
    return {
        type: 'padding',
        get: () => null,
        set: () => { },
        offset,
    } as Opperation<null>
}

export function buildStruct(model: string): { offsets: Opperation<any>[], size: number } {
    let littleEndian = false;
    const offsets: Opperation<any>[] = [];
    let size = 0;
    let next = model[0];
    // struct like https://docs.python.org/3/library/struct.html
    for (let i = 0; i < model.length; i++) {
        let s = 0;
        switch (next) {
            case '<':
                littleEndian = true;
                break;
            case '>':
                littleEndian = false;
                break;
            case 'x':
                offsets.push(Op_x(size));
                break;
            case 'c':
            case 'b':
                offsets.push(Op_b(size));
                s = 1;
                break;
            case 'B':
                offsets.push(Op_B(size));
                s = 1;
                break;
            case '?':
                offsets.push(Op_Bool(size));
                s = 1;
                break;
            case 'h':
                offsets.push(Op_h(size, littleEndian));
                s = 2;
                break;
            case 'H':
                offsets.push(Op_H(size, littleEndian));
                s = 2;
                break;
            case 'i':
            case 'l':
                offsets.push(Op_i(size, littleEndian));
                s = 4;
                break;
            case 'I':
            case 'L':
                offsets.push(Op_I(size, littleEndian));
                s = 4;
                break;
            case 'q':
            case 'n': // 64 bit only
                offsets.push(Op_q(size, littleEndian));
                s = 8;
                break;
            case 'Q':
            case 'N': // 64 bit only
                offsets.push(Op_Q(size, littleEndian));
                s = 8;
                break;

            //case 'e': // float 16bit not available in deno
            //    offsets.push(Op_f(size, littleEndian));
            //    s = 4;
            //    break;

            case 'f':
                offsets.push(Op_f(size, littleEndian));
                s = 4;
                break;
            case 'd':
                offsets.push(Op_d(size, littleEndian));
                s = 8;
                break;
            case 's': // should be a buffer ?
            case 'p':
            case 'P':
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
    return { offsets, size }
}

