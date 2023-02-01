// apt install libvips-dev
import {
  dirname,
  join,
  fromFileUrl,
} from "https://deno.land/std@0.170.0/path/mod.ts";
import { FFIgenerator } from "./generator/FFIgenerator.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const includeDirectory =  "/usr/include/vips/";
// ''join(__dirname, "sample", "libvips-8.14.1");
const destination = join(__dirname, "generated", 'libvips');
const includePaths = [
  "/usr/include/",
  // `${includeDirectory}`,
  '/usr/include/glib-2.0/',
  '/usr/lib/x86_64-linux-gnu/glib-2.0/include/',
];
const libFile = '/usr/lib/x86_64-linux-gnu/libvips.so'
const generator = new FFIgenerator({ headers: includeDirectory, files: ['vips.h'], libFile, destination, includePaths });
await generator.generate();
console.log('All done!')

