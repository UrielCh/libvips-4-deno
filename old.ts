import { libvips } from "./lib/ffi.ts";
import * as pc from "https://deno.land/std@0.171.0/fmt/colors.ts";
import { VipsBandFormat } from "./lib/enums.ts";

function green(txt: string | number | bigint) {
  return pc.green(txt.toString());
}

function yellow(txt: string | number | bigint) {
  return pc.yellow(txt.toString());
}

function cstring(txt: string): Uint8Array {
  return new TextEncoder().encode(`${txt}\0`);
}

console.log(`Try to init libvips calling ${yellow('vips_init')}`);
const api_name = new TextEncoder().encode("vipsTest");
const result = libvips.symbols.vips_init(api_name); //0
console.log(`init lib with ${yellow('vips_init')} return ${pc.green(String(result))}`);

const testFile = "img/darth_vader_254.png"; // [ 0, 254, 0, 0 ] 16646144

console.log(`Try loading img file with ${yellow('vips_foreign_find_load')} function call`);
const imgType = libvips.symbols.vips_foreign_find_load(cstring(testFile));
const imgLoader = Deno.UnsafePointerView.getCString(imgType);
console.log(`${green(testFile)} can be load with ${pc.green(imgLoader)}`);


console.log(`Try ${yellow('vips_image_new_from_file')} call`);
const vipImgPtr = libvips.symbols.vips_image_new_from_file(
  cstring(testFile),
  null,
);
console.log(
  `Try ${yellow('vips_image_new_from_file')} return ${green(vipImgPtr)} should be a VipsImage *`,
);

const fmt: VipsBandFormat = libvips.symbols.vips_image_get_format(vipImgPtr);
console.log(`source image vips_image_get_format: ${green(fmt)}`);
