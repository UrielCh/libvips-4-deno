import * as pc from "https://deno.land/std@0.175.0/fmt/colors.ts";
import { FFIObject, getProto } from "./FFIMapper.ts";
import { symOffsetIndex, symStruct } from "./symboles.ts";
import { VFFData } from "./packModel.descriptor.ts";
import { FFIView } from "./FFIView.tsx";
import { Operation } from "https://deno.land/x/pystruct@0.0.3/mod.ts";

export const FFIDevBox = {
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
        const u8array = new Uint8Array(obj.getBuffer(), offset);
        const lineCount = Math.ceil(u8array.length / 16);
        const indexLen = 1 + lineCount.toString(16).length
        let out = '';
        const collumn = opts.collumn ?? 4;
        let BytePerBlock = 16;
        if (collumn === 2)
            BytePerBlock = 8;
        else if (collumn === 4)
            BytePerBlock = 4;
        else if (collumn === 8)
            BytePerBlock = 2;
        const charPerLine = 16 * 3 + collumn + 1;
        for (let line = 0; line < lineCount; line++) {
            const start = line * 16;
            const lineBytes = u8array.slice(start, start + 16);
            const asArray = Array.from(lineBytes);
            let prefix = `${start.toString(16).padStart(indexLen, '0')}: `;
            if (opts.color)
                prefix = pc.green(prefix);
            out += prefix;
            let pp = asArray
                .map((v, i) => v.toString(16).padStart(2, '0') + ((i + 1) % BytePerBlock === 0 ? ' ' : ''))
                .join(' ')
            pp = pp.padEnd(charPerLine, ' ');
            // console.log({pp})
            if (opts.color) {
                pp = pp.replace(/00/g, pc.dim('00'));
            }
            out += pp;
            out += asArray.map(byte => byte > 31 && byte < 127 ? String.fromCharCode(byte) : '.').join('');
            out += "\n";
        }
        return out;
    },

    viewObject(obj: FFIObject, opts: { offset?: number | string, color?: boolean, collumn?: 1 | 2 | 4 | 8 } = {}): Promise<void> {
        const operations: Map<string, Operation> = (obj as unknown as VFFData)[symOffsetIndex];

        let offset = 0;
        if (typeof opts.offset === 'string') {
            const of = operations.get(opts.offset);
            if (!of)
                throw new Error(`offset for key ${offset} not found`)
            offset = of.offset;
        } else if (typeof opts.offset === 'number') {
            offset = opts.offset;
        }
        const buffer = new Uint8Array(obj.getBuffer(), offset);
        const instance = FFIView(buffer, {offset, operations});
        return instance.waitUntilExit()
    }
}