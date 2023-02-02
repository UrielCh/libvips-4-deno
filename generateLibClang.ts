import {
  dirname,
  join,
  fromFileUrl,
} from "https://deno.land/std@0.170.0/path/mod.ts";
import { FFIgenerator } from "./generator/FFIgenerator.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const includeDirectory = join(__dirname, "sample", "libClang");
const destination = join(__dirname, "generated", 'clang');
const includePaths = [
  "/usr/lib/clang/14.0.0/include/",
  `${includeDirectory}`,
];
const libFile = '/usr/lib/llvm-14/lib/libclang.so.1'
const generator = new FFIgenerator({ headers: includeDirectory, libFile, destination, includePaths });
await generator.generate();
console.log('All done!')

