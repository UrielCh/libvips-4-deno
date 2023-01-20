// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_analyzeload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_csvload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_csvload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_csvsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_csvsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_dzsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_dzsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_dzsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_fitsload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_fitssave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_foreign_find_load = {
  parameters: [
    "buffer", // filename as const char *
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_find_load_buffer = {
  parameters: [
    "buffer", // data as const void *
    "usize", // size as size_t
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_find_load_source = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_find_save = {
  parameters: [
    "buffer", // filename as const char *
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_find_save_buffer = {
  parameters: [
    "buffer", // suffix as const char *
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_find_save_target = {
  parameters: [
    "buffer", // suffix as const char *
  ],
  result: "buffer" // const char *
} as const

export const vips_foreign_flags = {
  parameters: [
    "buffer", // loader as const char *
    "buffer", // filename as const char *
  ],
  result: "u32" // VipsForeignFlags
} as const

export const vips_foreign_get_suffixes = {
  parameters: [
  
  ],
  result: "pointer" // gchar **
} as const

export const vips_foreign_get_type = {
  parameters: [
  
  ],
  result: "i64" // GType
} as const

export const vips_foreign_is_a = {
  parameters: [
    "buffer", // loader as const char *
    "buffer", // filename as const char *
  ],
  result: "bool" // gboolean
} as const

export const vips_foreign_is_a_buffer = {
  parameters: [
    "buffer", // loader as const char *
    "buffer", // data as const void *
    "usize", // size as size_t
  ],
  result: "bool" // gboolean
} as const

export const vips_foreign_is_a_source = {
  parameters: [
    "buffer", // loader as const char *
    "buffer", // source as VipsSource *
  ],
  result: "bool" // gboolean
} as const

export const vips_foreign_load_get_type = {
  parameters: [
  
  ],
  result: "i64" // GType
} as const

export const vips_foreign_load_invalidate = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "void" // void
} as const

export const vips_foreign_map = {
  parameters: [
    "buffer", // base as const char *
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer" // void *
} as const

export const vips_foreign_save_get_type = {
  parameters: [
  
  ],
  result: "i64" // GType
} as const

export const vips_gifload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_gifload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_gifload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_gifsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_gifsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_gifsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_heifsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2kload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2kload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2kload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2ksave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2ksave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jp2ksave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegsave_mime = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jpegsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_jxlsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_magickload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_magickload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_magicksave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_magicksave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matrixload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matrixload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matrixprint = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matrixsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_matrixsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_niftiload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_niftiload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_niftisave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_openexrload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_openslideload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_openslideload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pdfload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pdfload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pdfload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_pngsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_ppmload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_ppmload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_ppmsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_ppmsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_radsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_rawload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "i32", // bands as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_rawsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_rawsave_fd = {
  parameters: [
    "pointer", // in as VipsImage *
    "i32", // fd as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_svgload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_svgload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_svgload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_svgload_string = {
  parameters: [
    "buffer", // str as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_tiffsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_vipsload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_vipsload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_vipssave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_vipssave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpload = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpload_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpload_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpsave = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // filename as const char *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpsave_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // buf as void **
    "buffer", // len as size_t *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpsave_mime = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_webpsave_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const
