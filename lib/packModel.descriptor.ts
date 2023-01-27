import { Struct } from "https://deno.land/x/pystruct@0.0.2/mod.ts";
import { sym_Model, sym_NField, sym_offsetIndex, sym_struct } from "./symboles.ts";
// todo Export type from pystruct
// replace Opperation<T>  by Operation<T = unknown> 
import { type Opperation } from "https://deno.land/x/pystruct@0.0.2/struct.ts";

export interface VFFData {
    [sym_Model]: string;
    [sym_NField]: Array<{ key: string, fid: number }>;
    [sym_struct]: Struct;
    // todo replace by Map<string, Opperation<any>>
    // [sym_offsetIndex]: Map<string, number>;
    [sym_offsetIndex]: Map<string, Opperation<unknown>>;
}


/**
 * field decorator
 * @param format python struct single element pack format
 */
export function packModel(format: string) {
    return function (t: unknown, key: string) {
        const target = t as VFFData;
        target[sym_Model] = (target[sym_Model] || '') + format;
        if (!target[sym_NField]) {
            target[sym_NField] = [];
        }
        const fid = target[sym_NField].length;
        target[sym_NField].push({ key, fid });
    }
}
