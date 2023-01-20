// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_array_image_append = {
  parameters: [
    "pointer", // array as VipsArrayImage *
    "pointer", // image as VipsImage *
  ],
  result: "pointer"
} as const

export const vips_array_image_empty = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_array_image_get = {
  parameters: [
    "pointer", // array as VipsArrayImage *
    "buffer", // n as int *
  ],
  result: "pointer"
} as const

export const vips_array_image_new = {
  parameters: [
    "pointer", // array as VipsImage **
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_array_image_new_from_string = {
  parameters: [
    "buffer", // string as const char *
    "u32", // flags as VipsAccess
  ],
  result: "pointer"
} as const

export const vips_array_image_newv = {
  parameters: [
    "i32", // n as int
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_band_format_is8bit = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "bool"
} as const

export const vips_band_format_iscomplex = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "bool"
} as const

export const vips_band_format_isfloat = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "bool"
} as const

export const vips_band_format_isint = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "bool"
} as const

export const vips_band_format_isuint = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "bool"
} as const

export const vips_filename_get_filename = {
  parameters: [
    "buffer", // vips_filename as const char *
  ],
  result: "buffer"
} as const

export const vips_filename_get_options = {
  parameters: [
    "buffer", // vips_filename as const char *
  ],
  result: "buffer"
} as const

export const vips_get_disc_threshold = {
  parameters: [
  
  ],
  result: "u64"
} as const

export const vips_image_copy_memory = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "pointer"
} as const

export const vips_image_decode = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_image_decode_predict = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // bands as int *
    "buffer", // format as VipsBandFormat *
  ],
  result: "i32"
} as const

export const vips_image_encode = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "u32", // coding as VipsCoding
  ],
  result: "i32"
} as const

export const vips_image_free_buffer = {
  parameters: [
    "pointer", // image as VipsImage *
    "pointer", // buffer as void *
  ],
  result: "void"
} as const

export const vips_image_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_image_hasalpha = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_inplace = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_invalidate_all = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "void"
} as const

export const vips_image_is_sequential = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_isfile = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_iskilled = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_isMSBfirst = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_ispartial = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_matrix_from_array = {
  parameters: [
    "i32", // width as int
    "i32", // height as int
    "buffer", // array as const double *
    "i32", // size as int
  ],
  result: "pointer"
} as const

export const vips_image_memory = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_image_minimise_all = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "void"
} as const

export const vips_image_new = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_image_new_from_buffer = {
  parameters: [
    "buffer", // buf as const void *
    "usize", // len as size_t
    "buffer", // option_string as const char *
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_image_new_from_file = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_image_new_from_file_raw = {
  parameters: [
    "buffer", // filename as const char *
    "i32", // xsize as int
    "i32", // ysize as int
    "i32", // bands as int
    "u64", // offset as guint64
  ],
  result: "pointer"
} as const

export const vips_image_new_from_file_RW = {
  parameters: [
    "buffer", // filename as const char *
  ],
  result: "pointer"
} as const

export const vips_image_new_from_image = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // c as const double *
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_image_new_from_image1 = {
  parameters: [
    "pointer", // image as VipsImage *
    "f64", // c as double
  ],
  result: "pointer"
} as const

export const vips_image_new_from_memory = {
  parameters: [
    "buffer", // data as const void *
    "usize", // size as size_t
    "i32", // width as int
    "i32", // height as int
    "i32", // bands as int
    "u32", // format as VipsBandFormat
  ],
  result: "pointer"
} as const

export const vips_image_new_from_memory_copy = {
  parameters: [
    "buffer", // data as const void *
    "usize", // size as size_t
    "i32", // width as int
    "i32", // height as int
    "i32", // bands as int
    "u32", // format as VipsBandFormat
  ],
  result: "pointer"
} as const

export const vips_image_new_from_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "buffer", // option_string as const char *
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_image_new_matrix = {
  parameters: [
    "i32", // width as int
    "i32", // height as int
  ],
  result: "pointer"
} as const

export const vips_image_new_matrix_from_array = {
  parameters: [
    "i32", // width as int
    "i32", // height as int
    "buffer", // array as const double *
    "i32", // size as int
  ],
  result: "pointer"
} as const

export const vips_image_new_matrixv = {
  parameters: [
    "i32", // width as int
    "i32", // height as int
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_image_new_memory = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_image_new_temp_file = {
  parameters: [
    "buffer", // format as const char *
  ],
  result: "pointer"
} as const

export const vips_image_pio_input = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_pio_output = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_set_delete_on_close = {
  parameters: [
    "pointer", // image as VipsImage *
    "bool", // delete_on_close as gboolean
  ],
  result: "void"
} as const

export const vips_image_set_kill = {
  parameters: [
    "pointer", // image as VipsImage *
    "bool", // kill as gboolean
  ],
  result: "void"
} as const

export const vips_image_set_progress = {
  parameters: [
    "pointer", // image as VipsImage *
    "bool", // progress as gboolean
  ],
  result: "void"
} as const

export const vips_image_wio_input = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_write = {
  parameters: [
    "pointer", // image as VipsImage *
    "pointer", // out as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_write_line = {
  parameters: [
    "pointer", // image as VipsImage *
    "i32", // ypos as int
    "pointer", // linebuffer as VipsPel *
  ],
  result: "i32"
} as const

export const vips_image_write_prepare = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_write_to_buffer = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // suffix as const char *
    "pointer", // buf as void **
    "buffer", // size as size_t *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_image_write_to_file = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_image_write_to_memory = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // size as size_t *
  ],
  result: "pointer"
} as const

export const vips_image_write_to_target = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // suffix as const char *
    "buffer", // target as VipsTarget *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_progress_set = {
  parameters: [
    "bool", // progress as gboolean
  ],
  result: "void"
} as const

export const vips_reorder_margin_hint = {
  parameters: [
    "pointer", // image as VipsImage *
    "i32", // margin as int
  ],
  result: "void"
} as const

export const vips_reorder_prepare_many = {
  parameters: [
    "pointer", // image as VipsImage *
    "pointer", // regions as VipsRegion **
    "pointer", // r as VipsRect *
  ],
  result: "i32"
} as const

export const vips_system = {
  parameters: [
    "buffer", // cmd_format as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_value_get_array_image = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // n as int *
  ],
  result: "pointer"
} as const

export const vips_value_set_array_image = {
  parameters: [
    "buffer", // value as GValue *
    "i32", // n as int
  ],
  result: "void"
} as const
