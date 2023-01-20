// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_sbuf_get_line = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "buffer"
} as const

export const vips_sbuf_get_line_copy = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "buffer"
} as const

export const vips_sbuf_get_non_whitespace = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "buffer"
} as const

export const vips_sbuf_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_sbuf_getc = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "i32"
} as const

export const vips_sbuf_new_from_source = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "pointer"
} as const

export const vips_sbuf_require = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
    "i32", // require as int
  ],
  result: "i32"
} as const

export const vips_sbuf_skip_whitespace = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "i32"
} as const

export const vips_sbuf_unbuffer = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "void"
} as const

export const vips_sbuf_ungetc = {
  parameters: [
    "pointer", // sbuf as VipsSbuf *
  ],
  result: "void"
} as const
