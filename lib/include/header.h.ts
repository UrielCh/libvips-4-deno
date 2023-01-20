// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_format_sizeof = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "u64"
} as const

export const vips_format_sizeof_unsafe = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "u64"
} as const

export const vips_image_get = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "buffer", // value_copy as GValue *
  ],
  result: "i32"
} as const

export const vips_image_get_area = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "pointer", // data as const void **
  ],
  result: "i32"
} as const

export const vips_image_get_array_double = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "pointer", // out as double **
    "buffer", // n as int *
  ],
  result: "i32"
} as const

export const vips_image_get_array_int = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "pointer", // out as int **
    "buffer", // n as int *
  ],
  result: "i32"
} as const

export const vips_image_get_as_string = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "pointer", // out as char **
  ],
  result: "i32"
} as const

export const vips_image_get_bands = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_blob = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "pointer", // data as const void **
    "buffer", // length as size_t *
  ],
  result: "i32"
} as const

export const vips_image_get_coding = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "u32"
} as const

export const vips_image_get_concurrency = {
  parameters: [
    "pointer", // image as VipsImage *
    "i32", // default_concurrency as int
  ],
  result: "i32"
} as const

export const vips_image_get_data = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "buffer"
} as const

export const vips_image_get_double = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "buffer", // out as double *
  ],
  result: "i32"
} as const

export const vips_image_get_fields = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "pointer"
} as const

export const vips_image_get_filename = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "buffer"
} as const

export const vips_image_get_format = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "u32"
} as const

export const vips_image_get_format_max = {
  parameters: [
    "u32", // format as VipsBandFormat
  ],
  result: "f64"
} as const

export const vips_image_get_height = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_history = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "buffer"
} as const

export const vips_image_get_image = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_image_get_int = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "buffer", // out as int *
  ],
  result: "i32"
} as const

export const vips_image_get_interpretation = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "u32"
} as const

export const vips_image_get_mode = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "buffer"
} as const

export const vips_image_get_n_pages = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_n_subifds = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_offset = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "f64"
} as const

export const vips_image_get_orientation = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_orientation_swap = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "bool"
} as const

export const vips_image_get_page_height = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_scale = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "f64"
} as const

export const vips_image_get_string = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
    "pointer", // out as const char **
  ],
  result: "i32"
} as const

export const vips_image_get_typeof = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
  ],
  result: "i64"
} as const

export const vips_image_get_width = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_xoffset = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_xres = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "f64"
} as const

export const vips_image_get_yoffset = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "i32"
} as const

export const vips_image_get_yres = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "f64"
} as const

export const vips_image_guess_format = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "u32"
} as const

export const vips_image_guess_interpretation = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "u32"
} as const

export const vips_image_history_args = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "i32", // argc as int
    "buffer", // argv[] as char *
  ],
  result: "i32"
} as const

export const vips_image_history_printf = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // format as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_image_init_fields = {
  parameters: [
    "pointer", // image as VipsImage *
    "i32", // xsize as int
    "i32", // ysize as int
    "i32", // bands as int
    "u32", // format as VipsBandFormat
    "u32", // coding as VipsCoding
    "u32", // interpretation as VipsInterpretation
    "f64", // xres as double
    "f64", // yres as double
  ],
  result: "void"
} as const

export const vips_image_map = {
  parameters: [
    "pointer", // image as VipsImage *
    "function", // fn as VipsImageMapFn
    "pointer", // a as void *
  ],
  result: "pointer"
} as const

export const vips_image_print_field = {
  parameters: [
    "pointer", // image as const VipsImage *
    "buffer", // name as const char *
  ],
  result: "void"
} as const

export const vips_image_remove = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
  ],
  result: "bool"
} as const

export const vips_image_set = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "buffer", // value as GValue *
  ],
  result: "void"
} as const

export const vips_image_set_area = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "function", // free_fn as VipsCallbackFn
    "pointer", // data as void *
  ],
  result: "void"
} as const

export const vips_image_set_array_double = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "buffer", // array as const double *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_image_set_array_int = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "pointer", // array as const int *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_image_set_blob = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "function", // free_fn as VipsCallbackFn
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "void"
} as const

export const vips_image_set_blob_copy = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "void"
} as const

export const vips_image_set_double = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "f64", // d as double
  ],
  result: "void"
} as const

export const vips_image_set_image = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "pointer", // im as VipsImage *
  ],
  result: "void"
} as const

export const vips_image_set_int = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "i32", // i as int
  ],
  result: "void"
} as const

export const vips_image_set_string = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // name as const char *
    "buffer", // str as const char *
  ],
  result: "void"
} as const
