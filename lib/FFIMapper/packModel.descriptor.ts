import { Struct, type Operation } from "https://deno.land/x/pystruct@0.0.3/mod.ts";
import { symFormat, symFields, symOffsetIndex, symStruct } from "./symboles.ts";

/**
 * hidden part of the interface added to all FFI mapped struct
 */
export interface VFFData {
    [symFormat]: string;
    [symFields]: Array<{ key: string, fid: number }>;
    [symStruct]: Struct;
    [symOffsetIndex]: Map<string, Operation>;
}

/**
 * field decorator
 * @param format python struct single element pack format
 */
export function packModel(format: string) {
    return function (t: unknown, key: string) {
        const target = t as VFFData;
        target[symFormat] = (target[symFormat] || '') + format;
        if (!target[symFields]) {
            target[symFields] = [];
        }
        const fid = target[symFields].length;
        target[symFields].push({ key, fid });
    }
}
