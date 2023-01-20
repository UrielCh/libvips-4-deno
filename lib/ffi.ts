import { join } from "https://deno.land/std@0.172.0/path/mod.ts";

import * as arithmetic from "./include/arithmetic.h.ts";
import * as buf from "./include/buf.h.ts";
import * as colour from "./include/colour.h.ts";
import * as connection from "./include/connection.h.ts";
import * as convolution from "./include/convolution.h.ts";
import * as create from "./include/create.h.ts";
import * as dbuf from "./include/dbuf.h.ts";
import * as draw from "./include/draw.h.ts";
import * as enumtypes from "./include/enumtypes.h.ts";
import * as error from "./include/error.h.ts";
import * as foreign from "./include/foreign.h.ts";
import * as freqfilt from "./include/freqfilt.h.ts";
import * as gate from "./include/gate.h.ts";
import * as generate from "./include/generate.h.ts";
import * as header from "./include/header.h.ts";
import * as histogram from "./include/histogram.h.ts";
import * as image from "./include/image.h.ts";
import * as interpolate from "./include/interpolate.h.ts";
import * as memory from "./include/memory.h.ts";
import * as morphology from "./include/morphology.h.ts";
import * as mosaicing from "./include/mosaicing.h.ts";
import * as object from "./include/object.h.ts";
import * as operation from "./include/operation.h.ts";
import * as _private from "./include/private.h.ts";
import * as rect from "./include/rect.h.ts";
import * as region from "./include/region.h.ts";
import * as resample from "./include/resample.h.ts";
import * as sbuf from "./include/sbuf.h.ts";
import * as semaphore from "./include/semaphore.h.ts";
import * as thread from "./include/thread.h.ts";
import * as threadpool from "./include/threadpool.h.ts";
import * as type from "./include/type.h.ts";
import * as unit from "./include/util.h.ts";
import * as vector from "./include/vector.h.ts";
import * as vips from "./include/vips.h.ts";

const IMPORTS = {
    ...arithmetic,
    ...buf,
    ...colour,
    ...connection,
    ...convolution,
    ...create,
    ...dbuf,
    ...draw,
    ...enumtypes,
    ...error,
    ...foreign,
    ...freqfilt,
    ...gate,
    ...generate,
    ...header,
    ...histogram,
    ...image,
    ...interpolate,
    ...memory,
    ...morphology,
    ...mosaicing,
    ...object,
    ...operation,
    ..._private,
    ...rect,
    ...region,
    ...resample,
    ...sbuf,
    ...semaphore,
    ...thread,
    ...threadpool,
    ...type,
    ...unit,
    ...vector,
    ...vips,
} as const;

let libSuffix = "";
switch (Deno.build.os) {
   case "windows": libSuffix = "dll"; break;
   case "darwin": libSuffix = "dylib"; break;
   default: libSuffix = "so"; break;
}

const libFileName = `libvips-42.${libSuffix}`;
// const libPath = join('2', 'vips-dev-8.14','bin', libFileName);
const libPath = join('vips-dev-8.14', 'bin', libFileName);
// const libPath = '/usr/lib/x86_64-linux-gnu/libvips.so.42'
const stats = Deno.statSync(libPath);
console.log(`Stats of lib Pass, its size is: ${(stats.size / 1042).toFixed(1)} KB`);
const lib = new URL(libPath, import.meta.url);
console.log(`loading ${lib}`)
const libvips = Deno.dlopen(
   lib,
   IMPORTS
);

export { libvips }

