import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";
import { symFormat, symFields, symOffsetIndex, symStruct } from "./symboles.ts";
// todo Export type from pystruct
// replace Opperation<T>  by Operation<T = unknown> 
import { type Opperation } from "https://deno.land/x/pystruct@0.0.2/struct.ts";

export interface VFFData {
    [symFormat]: string;
    [symFields]: Array<{ key: string, fid: number }>;
    [symStruct]: Struct;
    [symOffsetIndex]: Map<string, Opperation<unknown>>;
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
