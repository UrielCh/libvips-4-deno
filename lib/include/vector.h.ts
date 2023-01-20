// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_executor_run = {
  parameters: [
    "pointer", // executor as VipsExecutor *
  ],
  result: "void" // void
} as const

export const vips_executor_set_array = {
  parameters: [
    "pointer", // executor as VipsExecutor *
    "i32", // var as int
    "pointer", // value as void *
  ],
  result: "void" // void
} as const

export const vips_executor_set_destination = {
  parameters: [
    "pointer", // executor as VipsExecutor *
    "pointer", // value as void *
  ],
  result: "void" // void
} as const

export const vips_executor_set_parameter = {
  parameters: [
    "pointer", // executor as VipsExecutor *
    "i32", // var as int
    "i32", // value as int
  ],
  result: "void" // void
} as const

export const vips_executor_set_program = {
  parameters: [
    "pointer", // executor as VipsExecutor *
    "buffer", // vector as VipsVector *
    "i32", // n as int
  ],
  result: "void" // void
} as const

export const vips_executor_set_scanline = {
  parameters: [
    "pointer", // executor as VipsExecutor *
    "pointer", // ir as VipsRegion *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "void" // void
} as const

export const vips_vector_asm2 = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // op as const char *
    "buffer", // a as const char *
    "buffer", // b as const char *
  ],
  result: "void" // void
} as const

export const vips_vector_asm3 = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // op as const char *
    "buffer", // a as const char *
    "buffer", // b as const char *
    "buffer", // c as const char *
  ],
  result: "void" // void
} as const

export const vips_vector_compile = {
  parameters: [
    "buffer", // vector as VipsVector *
  ],
  result: "bool" // gboolean
} as const

export const vips_vector_constant = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as char *
    "i32", // value as int
    "i32", // size as int
  ],
  result: "void" // void
} as const

export const vips_vector_destination = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as const char *
    "i32", // size as int
  ],
  result: "i32" // int
} as const

export const vips_vector_free = {
  parameters: [
    "buffer", // vector as VipsVector *
  ],
  result: "void" // void
} as const

export const vips_vector_full = {
  parameters: [
    "buffer", // vector as VipsVector *
  ],
  result: "bool" // gboolean
} as const

export const vips_vector_init = {
  parameters: [
  
  ],
  result: "void" // void
} as const

export const vips_vector_isenabled = {
  parameters: [
  
  ],
  result: "bool" // gboolean
} as const

export const vips_vector_new = {
  parameters: [
    "buffer", // name as const char *
    "i32", // dsize as int
  ],
  result: "buffer" // VipsVector *
} as const

export const vips_vector_parameter = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as const char *
    "i32", // size as int
  ],
  result: "i32" // int
} as const

export const vips_vector_print = {
  parameters: [
    "buffer", // vector as VipsVector *
  ],
  result: "void" // void
} as const

export const vips_vector_set_enabled = {
  parameters: [
    "bool", // enabled as gboolean
  ],
  result: "void" // void
} as const

export const vips_vector_source_name = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as const char *
    "i32", // size as int
  ],
  result: "i32" // int
} as const

export const vips_vector_source_scanline = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as char *
    "i32", // line as int
    "i32", // size as int
  ],
  result: "void" // void
} as const

export const vips_vector_temporary = {
  parameters: [
    "buffer", // vector as VipsVector *
    "buffer", // name as const char *
    "i32", // size as int
  ],
  result: "void" // void
} as const

export const vips_vector_to_fixed_point = {
  parameters: [
    "buffer", // in as double *
    "buffer", // out as int *
    "i32", // n as int
    "i32", // scale as int
  ],
  result: "void" // void
} as const
