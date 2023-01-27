import { assertEquals, assertNotEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts"
import { FFIMapper } from "../lib/FFIMapper.ts";
import { VipsImage } from "../lib/VipsImage.ts";
import { VipsRect } from "../lib/VipsRect.ts";
import * as res from "./common.ts"
// import * as pc from "https://deno.land/std@0.171.0/fmt/colors.ts";
// import { VipsRect } from "./lib/VipsRect.ts";
// import { VipsBandFormat } from "./lib/enums.ts";
// import { VipsImage } from "./lib/VipsImage.ts";

const { libvips, libgobject, cstring } = res;

Deno.test("load png 512 and check size", () => {
    const imgPath = cstring(res.getImg512())
    const imgType = libvips.symbols.vips_foreign_find_load(imgPath)
    const imgLoader = Deno.UnsafePointerView.getCString(imgType)
    assertEquals(imgLoader, "VipsForeignLoadPngFile", "imgLoader should be VipsForeignLoadPngFile")

    const vipImgPtr = libvips.symbols.vips_image_new_from_file(imgPath, null);
    assertNotEquals(vipImgPtr, 0, "vipImgPtr should not be null")

    // load mapper
    const vipImg = FFIMapper.map(VipsImage, vipImgPtr);

    const width = libvips.symbols.vips_image_get_width(vipImgPtr);
    const height = libvips.symbols.vips_image_get_height(vipImgPtr);

    assertEquals(width, 512, "width should be 512")
    assertEquals(height, 512, "height should be 512")

    const xres = libvips.symbols.vips_image_get_xres(vipImgPtr);
    const yres = libvips.symbols.vips_image_get_yres(vipImgPtr);

    assertEquals(vipImg.Xres, xres, "vips_image_get_xres should match VipsImage struct mapper")
    assertEquals(vipImg.Yres, yres, "vips_image_get_yres should match VipsImage struct mapper")

    libgobject.symbols.g_object_unref(vipImgPtr);
});

Deno.test("load jpg 345x486 23BPP", () => {
    // TODO call libvips.symbols.vips_jpegload(cstring(testFile), img, null);
    const imgPath = cstring(res.getImgpJPG())
    const imgType = libvips.symbols.vips_foreign_find_load(imgPath)
    const imgLoader = Deno.UnsafePointerView.getCString(imgType)
    assertEquals(imgLoader, "VipsForeignLoadJpegFile", "imgLoader should be VipsForeignLoadJpegFile")

    const vipImgPtr = libvips.symbols.vips_image_new_from_file(imgPath, null);
    assertNotEquals(vipImgPtr, 0, "vipImgPtr should not be null")

    // load mapper
    const vipImg = FFIMapper.map(VipsImage, vipImgPtr);

    const width = libvips.symbols.vips_image_get_width(vipImgPtr);
    const height = libvips.symbols.vips_image_get_height(vipImgPtr);

    assertEquals(width, 345, "width should be 345")
    assertEquals(height, 486, "height should be 486")

    const xres = libvips.symbols.vips_image_get_xres(vipImgPtr);
    const yres = libvips.symbols.vips_image_get_yres(vipImgPtr);

    assertEquals(vipImg.Xres, xres, "vips_image_get_xres should match VipsImage struct mapper")
    assertEquals(vipImg.Yres, yres, "vips_image_get_yres should match VipsImage struct mapper")

    libgobject.symbols.g_object_unref(vipImgPtr);
});


Deno.test("load gif 1x1 8BPP", () => {
    const imgPath = cstring(res.getPixelGif())
    const imgType = libvips.symbols.vips_foreign_find_load(imgPath)
    const imgLoader = Deno.UnsafePointerView.getCString(imgType)
    assertEquals(imgLoader, "VipsForeignLoadNsgifFile", `imgLoader should be VipsForeignLoadGif but found ${imgLoader}`)

    const vipImgPtr = libvips.symbols.vips_image_new_from_file(imgPath, null);
    assertNotEquals(vipImgPtr, 0, "vipImgPtr should not be null")

    // load mapper
    const vipImg = FFIMapper.map(VipsImage, vipImgPtr);
    const width = libvips.symbols.vips_image_get_width(vipImgPtr);
    const height = libvips.symbols.vips_image_get_height(vipImgPtr);

    assertEquals(width, 1, "width should be 1")
    assertEquals(height, 1, "height should be 1")

    const xres = libvips.symbols.vips_image_get_xres(vipImgPtr);
    const yres = libvips.symbols.vips_image_get_yres(vipImgPtr);

    assertEquals(vipImg.Xres, xres, "vips_image_get_xres should match VipsImage struct mapper")
    assertEquals(vipImg.Yres, yres, "vips_image_get_yres should match VipsImage struct mapper")

    libgobject.symbols.g_object_unref(vipImgPtr);
});


Deno.test("crop png 512", () => {
    const imgPath = cstring(res.getImg512())
    const vipImgPtr = libvips.symbols.vips_image_new_from_file(imgPath, null);
    assertNotEquals(vipImgPtr, 0, "vipImgPtr should not be null")
    // ask for a 100x100 pixel region at 0x0 (top left)
    //const vipRegion = libvips.symbols.vips_region_new(vipImgPtr);
    const rect = new VipsRect()
    rect.top = 0;
    rect.left = 0;
    rect.width = 100;
    rect.height = 100;
    // console.log('buffer:', rect.getBuffer());
    // const err = libvips.symbols.vips_region_prepare(vipRegion, rect.asRef())
    // assertEquals(err, 0, "vips_region_prepare should return 0")

    // const out = libvips.symbols.vips_image_new();
    //// vips_embed: { parameters: ["pointer", "pointer", "i32", "i32", "i32", "i32"], result: "i32" },
    //const r = libvips.symbols.vips_embed(vipImg, out, x, y, width, height)
    //console.log({ r });
    //const error = dylib.symbols.vips_error_buffer_copy();
    //console.log({ error });
    //console.log({ error: Deno.UnsafePointerView.getCString(error) });


    //libgobject.symbols.g_object_unref(vipRegion)
    //libgobject.symbols.g_object_unref(vipImgPtr);
});
