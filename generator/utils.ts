// import { FunctionType } from "./build_utils.ts";
import * as pc from "https://deno.land/std@0.171.0/fmt/colors.ts";

/**
 * format a source file using deno fmt
 */
// export const formatSync = (filePath: string) => {
//     new Deno.Command("deno", {
//         args: ["fmt", filePath],
//     }).outputSync();
// };

// export const filterSymboles = (libFile: string, apiFunctions: FunctionType[]): FunctionType[] {
//     for (const { name } of apiFunctions) {
//         try {
//           Deno.dlopen(
//             libFile,
//             { [name]: { type: "pointer" } },
//           );
//         } catch (_err) {
//           isAvailable = false;
//         }
//   
// 
// }

export function writeTextFileSync(dest: string, data: string) {
    let old = '';
    try {
        old = Deno.readTextFileSync(dest);
    } catch (_e) {
        // keep it empty
    }
    if (old.replaceAll(/[\r\n]+/g, '\n') !== data.replaceAll(/[\r\n]+/g, '\n')) {
        console.log(`Writing ${pc.magenta(dest)}`)
        Deno.writeTextFileSync(dest, data);
    }
}
