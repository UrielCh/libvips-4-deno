import { libvips, libgobject } from "./lib/ffi.ts";
import * as pc from "https://deno.land/std@0.171.0/fmt/colors.ts";
import { VipsRect } from "./lib/VipsRect.ts";
import { VipsBandFormat } from "./lib/enums.ts";
import { VipsImage } from "./lib/VipsImage.ts";


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

console.log();
const testFile = "img/darth_vader_512.png"; // [ 0, 0, 2, 0 ] 512
// const testFile = "img/darth_vader_p.png";
// const testFile = "img/darth_vader_254.png"; // [ 0, 254, 0, 0 ] 16646144

console.log(`Try loading img file with ${yellow('vips_foreign_find_load')} function call`);
const imgType = libvips.symbols.vips_foreign_find_load(cstring(testFile));
const imgLoader = Deno.UnsafePointerView.getCString(imgType);
console.log(`${green(testFile)} can be load with ${pc.green(imgLoader)}`);

if ("VipsForeignLoadJpegFile" === imgLoader) {
  const img = libvips.symbols.vips_image_new();
  console.log(`Try ${yellow('VipsForeignLoadJpegFile')} function call`);
  const r = libvips.symbols.vips_jpegload(cstring(testFile), img, null);
  console.log(`${yellow('vips_jpegload')} return ${green(r)}`);
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

console.log(`Try ${yellow('vips_image_new_from_file')} call`);
const vipImgPtr = libvips.symbols.vips_image_new_from_file(
  cstring(testFile),
  null,
);
console.log(
  `Try ${yellow('vips_image_new_from_file')} return ${green(vipImgPtr)} should be a VipsImage *`,
);
console.log();

const vipImg = new VipsImage(vipImgPtr);
console.log({
  width: vipImg.Xsize,
  height: vipImg.Ysize,
  Bands: vipImg.Bands,
  Coding: vipImg.Coding,
});

// Get img info
const width = libvips.symbols.vips_image_get_width(vipImgPtr);
const height = libvips.symbols.vips_image_get_height(vipImgPtr);
const Bands = libvips.symbols.vips_image_get_bands(vipImgPtr);
const coding = libvips.symbols.vips_image_get_coding(vipImgPtr);
// const type = libvips.symbols.vips_image_get_type(vipImgPtr);
const xres = libvips.symbols.vips_image_get_xres(vipImgPtr);
const yres = libvips.symbols.vips_image_get_yres(vipImgPtr);

console.log({
  width: width,
  height: height,
  Bands: Bands,
  Coding: coding,
});

console.log();

console.log({
  // Type: vipImg.Type,
  Xres: vipImg.Xres,
  Yres: vipImg.Yres,
  // Xoffset: vipImg.Xoffset,
  // Yoffset: vipImg.Yoffset,
  // Length: vipImg.Length,
  // Compression: vipImg.Compression,
  // Level: vipImg.Level,
  // Bbits: vipImg.Bbits,
  // time: vipImg.time,
});

console.log({
  xres: xres,
  yres: yres,
});

console.log();

console.log(`source image dimentions: ${green(width)}x${green(height)} bands: ${Bands}`);

const fmt: VipsBandFormat = libvips.symbols.vips_image_get_format(vipImgPtr);
console.log(`source image vips_image_get_format: ${green(fmt)}`);


// ask for a 100x100 pixel region at 0x0 (top left)
{
  console.log(`Try ${yellow('vips_region_new')} call`);
  const vipRegion = libvips.symbols.vips_region_new(vipImgPtr);
  console.log(
    `Try ${yellow('vips_region_new')} return ${green(vipRegion)} should be a VipsRegion *`,
  );

  console.log(`Try ${yellow('vips_region_prepare')} call`);
  const r = new VipsRect()
  r.top = 0;
  r.left = 0;
  r.width = 100;
  r.height = 100;
  const err = libvips.symbols.vips_region_prepare(vipRegion, r.asRef())
  console.log(`Try ${yellow('vips_region_prepare')} return ${err}`);
  if (err != 0) throw Error('vips_region_prepare should return 0')
  // free allocated data in gObject
  {
    const err = libgobject.symbols.g_object_unref(vipRegion)
    console.log(`Try ${yellow('g_object_unref')} return ${err}`);
  }
}


  // const out = new VipsImage();

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

  // const a = new Deno.UnsafeFnPointer()