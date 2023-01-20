// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_cache_drop_all = {
  parameters: [
  
  ],
  result: "void"
} as const

export const vips_cache_get_max = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_cache_get_max_files = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_cache_get_max_mem = {
  parameters: [
  
  ],
  result: "usize"
} as const

export const vips_cache_get_size = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_cache_operation_add = {
  parameters: [
    "pointer", // operation as VipsOperation *
  ],
  result: "void"
} as const

export const vips_cache_operation_build = {
  parameters: [
    "pointer", // operation as VipsOperation *
  ],
  result: "pointer"
} as const

export const vips_cache_operation_buildp = {
  parameters: [
    "pointer", // operation as VipsOperation **
  ],
  result: "i32"
} as const

export const vips_cache_operation_lookup = {
  parameters: [
    "pointer", // operation as VipsOperation *
  ],
  result: "pointer"
} as const

export const vips_cache_print = {
  parameters: [
  
  ],
  result: "void"
} as const

export const vips_cache_set_dump = {
  parameters: [
    "bool", // dump as gboolean
  ],
  result: "void"
} as const

export const vips_cache_set_max = {
  parameters: [
    "i32", // max as int
  ],
  result: "void"
} as const

export const vips_cache_set_max_files = {
  parameters: [
    "i32", // max_files as int
  ],
  result: "void"
} as const

export const vips_cache_set_max_mem = {
  parameters: [
    "usize", // max_mem as size_t
  ],
  result: "void"
} as const

export const vips_cache_set_trace = {
  parameters: [
    "bool", // trace as gboolean
  ],
  result: "void"
} as const

export const vips_call = {
  parameters: [
    "buffer", // operation_name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_call_argv = {
  parameters: [
    "pointer", // operation as VipsOperation *
    "i32", // argc as int
    "pointer", // argv as char **
  ],
  result: "i32"
} as const

export const vips_call_options = {
  parameters: [
    "pointer", // group as GOptionGroup *
    "pointer", // operation as VipsOperation *
  ],
  result: "void"
} as const

export const vips_call_required_optional = {
  parameters: [
    "pointer", // operation as VipsOperation **
    "pointer", // required as va_list
    "pointer", // optional as va_list
  ],
  result: "i32"
} as const

export const vips_call_split = {
  parameters: [
    "buffer", // operation_name as const char *
    "pointer", // optional as va_list
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_call_split_option_string = {
  parameters: [
    "buffer", // operation_name as const char *
    "buffer", // option_string as const char *
    "pointer", // optional as va_list
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_concurrency_get = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_concurrency_set = {
  parameters: [
    "i32", // concurrency as int
  ],
  result: "void"
} as const

export const vips_operation_block_set = {
  parameters: [
    "buffer", // name as const char *
    "bool", // state as gboolean
  ],
  result: "void"
} as const

export const vips_operation_class_print_usage = {
  parameters: [
    "pointer", // operation_class as VipsOperationClass *
  ],
  result: "void"
} as const

export const vips_operation_get_flags = {
  parameters: [
    "pointer", // operation as VipsOperation *
  ],
  result: "pointer"
} as const

export const vips_operation_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_operation_invalidate = {
  parameters: [
    "pointer", // operation as VipsOperation *
  ],
  result: "void"
} as const

export const vips_operation_new = {
  parameters: [
    "buffer", // name as const char *
  ],
  result: "pointer"
} as const
