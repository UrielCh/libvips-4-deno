import { libvips } from "./lib/ffi.ts";

function cstring(txt: string): Uint8Array {
  return new TextEncoder().encode(`${txt}\0`);
}

console.log("Try to init libvips");
const api_name = new TextEncoder().encode("vipsTest");
const result = libvips.symbols.vips_init(api_name); //0
console.log(`vips_init return ${result}`);

const testFile = "img/darth_vader_512.png";

console.log(`Try vips_foreign_find_load function call`);
// vips_image_new_from_file
const imgType = libvips.symbols.vips_foreign_find_load(cstring(testFile));
const imgLoader = Deno.UnsafePointerView.getCString(imgType);
console.log(`${testFile} can be load with ${imgLoader}`);

if ("VipsForeignLoadJpegFile" === imgLoader) {
  const img = libvips.symbols.vips_image_new();
  console.log(`Try VipsForeignLoadJpegFile function call`);
  const r = libvips.symbols.vips_jpegload(cstring(testFile), img, null);
  console.log(`vips_jpegload return ${r}`);
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

console.log(`Try vips_image_new_from_file call`);
const vipImg = libvips.symbols.vips_image_new_from_file(
  cstring(testFile),
  null,
);
console.log(
  `Try vips_image_new_from_file return ${vipImg} should be a VipsImage *`,
);
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
