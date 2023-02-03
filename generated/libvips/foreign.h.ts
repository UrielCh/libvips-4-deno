import {
  buf,
  cstringT,
  int,
  ptr,
  VipsForeignFlagsT,
} from "./typeDefinitions.ts";

export const vips_foreign_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_foreign_map = {
  parameters: [
    cstringT, // base
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_foreign_load_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_foreign_find_load = {
  parameters: [
    cstringT, // filename
  ],
  result: cstringT,
} as const;

export const vips_foreign_find_load_buffer = {
  parameters: [
    ptr("void"), // data
    int, // size
  ],
  result: cstringT,
} as const;

export const vips_foreign_find_load_source = {
  parameters: [
    buf(int), // source
  ],
  result: cstringT,
} as const;

export const vips_foreign_flags = {
  parameters: [
    cstringT, // loader
    cstringT, // filename
  ],
  result: VipsForeignFlagsT,
} as const;

export const vips_foreign_is_a = {
  parameters: [
    cstringT, // loader
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_foreign_is_a_buffer = {
  parameters: [
    cstringT, // loader
    ptr("void"), // data
    int, // size
  ],
  result: int,
} as const;

export const vips_foreign_is_a_source = {
  parameters: [
    cstringT, // loader
    buf(int), // source
  ],
  result: int,
} as const;

export const vips_foreign_load_invalidate = {
  parameters: [
    buf(int), // image
  ],
  result: "void",
} as const;

export const vips_foreign_save_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_foreign_find_save = {
  parameters: [
    cstringT, // filename
  ],
  result: cstringT,
} as const;

export const vips_foreign_get_suffixes = {
  parameters: [],
  result: buf(buf(int)),
} as const;

export const vips_foreign_find_save_buffer = {
  parameters: [
    cstringT, // suffix
  ],
  result: cstringT,
} as const;

export const vips_foreign_find_save_target = {
  parameters: [
    cstringT, // suffix
  ],
  result: cstringT,
} as const;

export const vips_vipsload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_vipsload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_vipssave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_vipssave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_openslideload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_openslideload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jpegload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jpegload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jpegload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jpegsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_jpegsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_jpegsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_jpegsave_mime = {
  parameters: [
    buf(int), // in
  ],
  result: int,
} as const;

export const vips_webpload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_webpload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_webpload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_webpsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_webpsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_webpsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_webpsave_mime = {
  parameters: [
    buf(int), // in
  ],
  result: int,
} as const;

export const vips_tiffload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_tiffload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_tiffload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_tiffsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_tiffsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_openexrload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_fitsload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_fitssave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_analyzeload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rawload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
    int, // width
    int, // height
    int, // bands
  ],
  result: int,
} as const;

export const vips_rawsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_rawsave_fd = {
  parameters: [
    buf(int), // in
    int, // fd
  ],
  result: int,
} as const;

export const vips_csvload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_csvload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_csvsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_csvsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_matrixload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_matrixload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_matrixsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_matrixsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_matrixprint = {
  parameters: [
    buf(int), // in
  ],
  result: int,
} as const;

export const vips_magickload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_magickload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_magicksave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_magicksave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_pngload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pngload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pngload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pngsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_pngsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_pngsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_ppmload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_ppmload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_ppmsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_ppmsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_matload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_radload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_radload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_radload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_radsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_radsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_radsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_pdfload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pdfload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pdfload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_svgload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_svgload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_svgload_string = {
  parameters: [
    cstringT, // str
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_svgload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_gifload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_gifload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_gifload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_gifsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_gifsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_gifsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_heifload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_heifload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_heifload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_heifsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_heifsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_heifsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_niftiload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_niftiload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_niftisave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_jp2kload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jp2kload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jp2kload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jp2ksave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_jp2ksave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_jp2ksave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_jxlload_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jxlload_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jxlload = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_jxlsave = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const vips_jxlsave_buffer = {
  parameters: [
    buf(int), // in
    buf(ptr("void")), // buf
    buf(int), // len
  ],
  result: int,
} as const;

export const vips_jxlsave_target = {
  parameters: [
    buf(int), // in
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_dzsave = {
  parameters: [
    buf(int), // in
    cstringT, // name
  ],
  result: int,
} as const;
