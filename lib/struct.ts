/**
 * stuct builder like python stuct
 * https://docs.python.org/3/library/struct.html
 */
export type Opperation<T> = {
    get: (view: DataView, buffer: ArrayBuffer) => T;
    set: (view: DataView, value: T) => void;
    offset: number;
}

export function buildPaser(model: string, littleEndian?: boolean): { offsets: Opperation<any>[], size: number } {
    const Op_b = (offset: number) => {
        return {
            get: (view: DataView) => view.getInt8(offset),
            set: (view: DataView, value: number) => view.setInt8(offset, value),
            offset,
        } as Opperation<number>
    }
    const Op_B = (offset: number) => {
        return {
            get: (view: DataView) => view.getUint8(offset),
            set: (view: DataView, value: number) => view.setUint8(offset, value),
            offset,
        } as Opperation<number>
    }
    const Op_Bool = (offset: number) => {
        return {
            get: (view: DataView) => !!view.getUint8(offset),
            set: (view: DataView, value: boolean) => view.setUint8(offset, value ? 1 : 0),
            offset,
        } as Opperation<boolean>
    }

    const Op_h = (offset: number) => {
        return {
            get: (view: DataView) => view.getInt16(offset, littleEndian),
            set: (view: DataView, value: number) => view.setInt16(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }
    const Op_H = (offset: number) => {
        return {
            get: (view: DataView) => view.getUint16(offset, littleEndian),
            set: (view: DataView, value: number) => view.setUint16(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }

    const Op_i = (offset: number) => {
        return {
            get: (view: DataView) => view.getInt32(offset, littleEndian),
            set: (view: DataView, value: number) => view.setInt32(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }
    const Op_I = (offset: number) => {
        return {
            get: (view: DataView) => view.getUint32(offset, littleEndian),
            set: (view: DataView, value: number) => view.setUint32(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }

    const Op_q = (offset: number) => {
        return {
            get: (view: DataView) => view.getBigInt64(offset, littleEndian),
            set: (view: DataView, value: bigint) => view.setBigInt64(offset, value, littleEndian),
            offset: offset,
        } as Opperation<bigint>
    }
    const Op_Q = (offset: number) => {
        return {
            get: (view: DataView) => view.getBigUint64(offset, littleEndian),
            set: (view: DataView, value: bigint) => view.setBigUint64(offset, value, littleEndian),
            offset,
        } as Opperation<bigint>
    }

    const Op_f = (offset: number) => {
        return {
            get: (view: DataView) => view.getFloat32(offset, littleEndian),
            set: (view: DataView, value: number) => view.setFloat32(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }
    const Op_d = (offset: number) => {
        return {
            get: (view: DataView) => view.getFloat64(offset, littleEndian),
            set: (view: DataView, value: number) => view.setFloat64(offset, value, littleEndian),
            offset,
        } as Opperation<number>
    }

    const Op_p = (offset: number) => {
        return {
            get: (view: DataView, buffer: ArrayBuffer) => Deno.UnsafePointer.of(new DataView(buffer, offset)),
            set: (view: DataView, value: Deno.PointerValue) => view.setBigUint64(offset, value as bigint),
            offset,
        } as Opperation<Deno.PointerValue>
    }

    /** padding */
    const Op_x = (offset: number) => {
        return {
            get: () => null,
            set: () => { },
            offset,
        } as Opperation<null>
    }

    const offsets: Opperation<any>[] = [];
    let size = 0;
    let next = model[0];
    // struct like https://docs.python.org/3/library/struct.html
    for (let i = 0; i < model.length; i++) {
        let s = 0;
        switch (next) {
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
                offsets.push(Op_h(size));
                s = 2;
                break;
            case 'H':
                offsets.push(Op_H(size));
                s = 2;
                break;
            case 'i':
            case 'l':
                offsets.push(Op_i(size));
                s = 4;
                break;
            case 'I':
            case 'L':
                offsets.push(Op_I(size));
                s = 4;
                break;
            case 'q':
                offsets.push(Op_q(size));
                s = 8;
                break;
            case 'Q':
                offsets.push(Op_Q(size));
                s = 8;
                break;
            case 'f':
                offsets.push(Op_f(size));
                s = 4;
                break;
            case 'd':
                offsets.push(Op_d(size));
                s = 8;
                break;
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
            s = parseInt(model.slice(i + 2, end));
            i = end;
            next = model[i + 1];
        }
        size += s;
    }
    return { offsets, size }
}

