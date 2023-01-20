// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_area_copy = {
  parameters: [
    "pointer", // area as VipsArea *
  ],
  result: "pointer"
} as const

export const vips_area_free_cb = {
  parameters: [
    "pointer", // mem as void *
    "pointer", // area as VipsArea *
  ],
  result: "i32"
} as const

export const vips_area_get_data = {
  parameters: [
    "pointer", // area as VipsArea *
    "buffer", // length as size_t *
    "buffer", // n as int *
    "pointer", // type as GType *
    "buffer", // sizeof_type as size_t *
  ],
  result: "pointer"
} as const

export const vips_area_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_area_new = {
  parameters: [
    "function", // free_fn as VipsCallbackFn
    "pointer", // data as void *
  ],
  result: "pointer"
} as const

export const vips_area_new_array = {
  parameters: [
    "i64", // type as GType
    "usize", // sizeof_type as size_t
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_area_new_array_object = {
  parameters: [
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_area_unref = {
  parameters: [
    "pointer", // area as VipsArea *
  ],
  result: "void"
} as const

export const vips_array_double_get = {
  parameters: [
    "pointer", // array as VipsArrayDouble *
    "buffer", // n as int *
  ],
  result: "buffer"
} as const

export const vips_array_double_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_array_double_new = {
  parameters: [
    "buffer", // array as const double *
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_array_double_newv = {
  parameters: [
    "i32", // n as int
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_array_image_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_array_int_get = {
  parameters: [
    "pointer", // array as VipsArrayInt *
    "buffer", // n as int *
  ],
  result: "buffer"
} as const

export const vips_array_int_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_array_int_new = {
  parameters: [
    "pointer", // array as const int *
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_array_int_newv = {
  parameters: [
    "i32", // n as int
    "pointer", // args as void *
  ],
  result: "pointer"
} as const

export const vips_blob_copy = {
  parameters: [
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "pointer"
} as const

export const vips_blob_get = {
  parameters: [
    "pointer", // blob as VipsBlob *
    "buffer", // length as size_t *
  ],
  result: "buffer"
} as const

export const vips_blob_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_blob_new = {
  parameters: [
    "function", // free_fn as VipsCallbackFn
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "pointer"
} as const

export const vips_blob_set = {
  parameters: [
    "pointer", // blob as VipsBlob *
    "function", // free_fn as VipsCallbackFn
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "void"
} as const

export const vips_ref_string_get = {
  parameters: [
    "pointer", // refstr as VipsRefString *
    "buffer", // length as size_t *
  ],
  result: "buffer"
} as const

export const vips_ref_string_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_ref_string_new = {
  parameters: [
    "buffer", // str as const char *
  ],
  result: "pointer"
} as const

export const vips_save_string_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_thing_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_thing_new = {
  parameters: [
    "i32", // i as int
  ],
  result: "pointer"
} as const

export const vips_value_get_area = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // length as size_t *
  ],
  result: "pointer"
} as const

export const vips_value_get_array = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // n as int *
    "pointer", // type as GType *
    "buffer", // sizeof_type as size_t *
  ],
  result: "pointer"
} as const

export const vips_value_get_array_double = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // n as int *
  ],
  result: "buffer"
} as const

export const vips_value_get_array_int = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // n as int *
  ],
  result: "buffer"
} as const

export const vips_value_get_array_object = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // n as int *
  ],
  result: "pointer"
} as const

export const vips_value_get_blob = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // length as size_t *
  ],
  result: "pointer"
} as const

export const vips_value_get_ref_string = {
  parameters: [
    "pointer", // value as const GValue *
    "buffer", // length as size_t *
  ],
  result: "buffer"
} as const

export const vips_value_get_save_string = {
  parameters: [
    "pointer", // value as const GValue *
  ],
  result: "buffer"
} as const

export const vips_value_set_area = {
  parameters: [
    "buffer", // value as GValue *
    "function", // free_fn as VipsCallbackFn
    "pointer", // data as void *
  ],
  result: "void"
} as const

export const vips_value_set_array = {
  parameters: [
    "buffer", // value as GValue *
    "i32", // n as int
    "i64", // type as GType
    "usize", // sizeof_type as size_t
  ],
  result: "void"
} as const

export const vips_value_set_array_double = {
  parameters: [
    "buffer", // value as GValue *
    "buffer", // array as const double *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_value_set_array_int = {
  parameters: [
    "buffer", // value as GValue *
    "pointer", // array as const int *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_value_set_array_object = {
  parameters: [
    "buffer", // value as GValue *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_value_set_blob = {
  parameters: [
    "buffer", // value as GValue *
    "function", // free_fn as VipsCallbackFn
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "void"
} as const

export const vips_value_set_blob_free = {
  parameters: [
    "buffer", // value as GValue *
    "pointer", // data as void *
    "usize", // length as size_t
  ],
  result: "void"
} as const

export const vips_value_set_ref_string = {
  parameters: [
    "buffer", // value as GValue *
    "buffer", // str as const char *
  ],
  result: "void"
} as const

export const vips_value_set_save_string = {
  parameters: [
    "buffer", // value as GValue *
    "buffer", // str as const char *
  ],
  result: "void"
} as const

export const vips_value_set_save_stringf = {
  parameters: [
    "buffer", // value as GValue *
    "buffer", // fmt as const char *
    "pointer", // args as void *
  ],
  result: "void"
} as const
