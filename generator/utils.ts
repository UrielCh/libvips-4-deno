// import { FunctionType } from "./build_utils.ts";

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