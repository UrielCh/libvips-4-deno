// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_buf_all = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "buffer" // const char *
} as const

export const vips_buf_append_size = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "usize", // n as size_t
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendc = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "i8", // ch as char
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendd = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "i32", // d as int
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendf = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // fmt as const char *
    "pointer", // args as void *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendg = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "f64", // g as double
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendgv = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // value as GValue *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appendns = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // str as const char *
    "i32", // sz as int
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_appends = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // str as const char *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_change = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // o as const char *
    "buffer", // n as const char *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_destroy = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "void" // void
} as const

export const vips_buf_firstline = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "buffer" // const char *
} as const

export const vips_buf_init = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "void" // void
} as const

export const vips_buf_init_dynamic = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "i32", // mx as int
  ],
  result: "void" // void
} as const

export const vips_buf_init_static = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // base as char *
    "i32", // mx as int
  ],
  result: "void" // void
} as const

export const vips_buf_is_empty = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_is_full = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_len = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "i32" // int
} as const

export const vips_buf_removec = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "i8", // ch as char
  ],
  result: "bool" // gboolean
} as const

export const vips_buf_rewind = {
  parameters: [
    "pointer", // buf as VipsBuf *
  ],
  result: "void" // void
} as const

export const vips_buf_set_dynamic = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "i32", // mx as int
  ],
  result: "void" // void
} as const

export const vips_buf_set_static = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // base as char *
    "i32", // mx as int
  ],
  result: "void" // void
} as const

export const vips_buf_vappendf = {
  parameters: [
    "pointer", // buf as VipsBuf *
    "buffer", // fmt as const char *
    "pointer", // ap as va_list
  ],
  result: "bool" // gboolean
} as const
