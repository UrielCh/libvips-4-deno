import {
    dirname,
    join,
    fromFileUrl,
  } from "https://deno.land/std@0.170.0/path/mod.ts";
  import { FFIgenerator } from "./build.ts";

// const includeDirectory = '/home/uriel/libclang_deno/build/include/'
const includeDirectory = join(dirname(fromFileUrl(import.meta.url)), "..", "..", "sample", "libClang");
const includePaths = [
    "/usr/lib/clang/14.0.0/include/",
    `${includeDirectory}`,
];
const libFile = '/usr/lib/llvm-14/lib/libclang.so.1'
const generator = new FFIgenerator({ headerRoot: includeDirectory, libFile, destination: './gen', includePaths });
await generator.generate();
console.log('All done!')

