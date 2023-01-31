import {
    dirname,
    join,
    fromFileUrl,
  } from "https://deno.land/std@0.170.0/path/mod.ts";
  import { generateLibMapping } from "./build.ts";

// const includeDirectory = '/home/uriel/libclang_deno/build/include/'
const includeDirectory = join(dirname(fromFileUrl(import.meta.url)), "..", "..", "sample", "libClang");
const includePaths = [
    "/usr/lib/clang/14.0.0/include/",
    `${includeDirectory}`,
];
await generateLibMapping({ headerRoot: includeDirectory, libFile: "/lib64/libclang.so.14.0.6", destination: './gen', includePaths });
console.log('All done!')

