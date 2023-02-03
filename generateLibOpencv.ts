// apt install libvips-dev
import {
  dirname,
  join,
  fromFileUrl,
} from "https://deno.land/std@0.170.0/path/mod.ts";
import { FFIgenerator } from "./generator/FFIgenerator.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const includeDirectory =  "/usr/include/opencv4/";
// ''join(__dirname, "sample", "libvips-8.14.1");
const destination = join(__dirname, "generated", 'opencv4_core');
const includePaths = [
  "/usr/include/",
  // `${includeDirectory}`,
  '/usr/include/opencv4/',
  // '/usr/lib/x86_64-linux-gnu/glib-2.0/include/',
];
const libFile = '/usr/lib/x86_64-linux-gnu/libopencv_core.so'
// files: ['vips.h'], 
const generator = new FFIgenerator({ headers: includeDirectory, libFile, destination, includePaths });
await generator.generate();
console.log('All done!')

