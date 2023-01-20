import { libvips, libgobject } from "./lib/ffi.ts";
import * as pc from "https://deno.land/std@0.171.0/fmt/colors.ts";
import { VipsRect } from "./lib/VipsRect.ts";

function cstring(txt: string): Uint8Array {
  return new TextEncoder().encode(`${txt}\0`);
}

console.log(`Try to init libvips calling ${pc.yellow('vips_init')}`);
const api_name = new TextEncoder().encode("vipsTest");
const result = libvips.symbols.vips_init(api_name); //0
console.log(`${pc.yellow('vips_init')} return ${pc.green(String(result))}`);

const testFile = "img/darth_vader_512.png";

console.log(`Try ${pc.yellow('vips_foreign_find_load')} function call`);
// vips_image_new_from_file
const imgType = libvips.symbols.vips_foreign_find_load(cstring(testFile));
const imgLoader = Deno.UnsafePointerView.getCString(imgType);
console.log(`${pc.green(String(testFile))} can be load with ${pc.green(imgLoader)}`);

if ("VipsForeignLoadJpegFile" === imgLoader) {
  const img = libvips.symbols.vips_image_new();
  console.log(`Try ${pc.yellow('VipsForeignLoadJpegFile')} function call`);
  const r = libvips.symbols.vips_jpegload(cstring(testFile), img, null);
  console.log(`${pc.yellow('vips_jpegload')} return ${pc.green(String(r))}`);
  // libvips.symbols.vips_image_write_to_file(img, fn2);
  //   vips_jpegload: {parameters: ["buffer", "pointer"], result: "i32" },
}
// const usp = new Deno.UnsafePointerView(VImage);
//
// const byteLength = usp.getCString(0);
//const buffer = Deno.UnsafePointerView.getArrayBuffer(VImage, byteLength);
//const txt = new TextDecoder().decode(new Uint8Array(buffer));
//console.log(VImage);
//console.log(img);
// const ret = dylib.symbols.vips_image_write_to_file(VImage, fn2);

console.log(`Try ${pc.yellow('vips_image_new_from_file')} call`);
const vipImg = libvips.symbols.vips_image_new_from_file(
  cstring(testFile),
  null,
);
console.log(
  `Try ${pc.yellow('vips_image_new_from_file')} return ${pc.green(String(vipImg))} should be a VipsImage *`,
);

console.log(`Try ${pc.yellow('vips_region_new')} call`);
const vipRegion = libvips.symbols.vips_region_new(vipImg);
console.log(
  `Try ${pc.yellow('vips_region_new')} return ${pc.green(String(vipRegion))} should be a VipsRegion *`,
);

console.log(`Try ${pc.yellow('vips_region_prepare')} call`);

// ask for a 100x100 pixel region at 0x0 (top left)
const r = new VipsRect()
r.top = 0;
r.left = 0;
r.width = 100;
r.height = 100;
const err = libvips.symbols.vips_region_prepare( vipRegion, r.asRef() ) 
console.log(`Try ${pc.yellow('vips_region_prepare')} return ${err}`);

{
  const err = libgobject.symbols.g_object_unref( vipRegion )
  console.log(`Try ${pc.yellow('g_object_unref')} return ${err}`);
}

// g_object_unref( region );
// const x = 10;
// const y = 10;
// const width = 1000;
// const height = 1000;
// const out = libvips.symbols.vips_image_new();
// vips_embed: { parameters: ["pointer", "pointer", "i32", "i32", "i32", "i32"], result: "i32" },
// const r = dylib.symbols.vips_embed(vipImg, out, x, y, width, height)
// console.log({ r });
// const error = dylib.symbols.vips_error_buffer_copy();
// console.log({ error });
// console.log({ error: Deno.UnsafePointerView.getCString(error) });
