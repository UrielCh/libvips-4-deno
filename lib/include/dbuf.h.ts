// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_dbuf_allocate = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "usize", // size as size_t
  ],
  result: "bool" // gboolean
} as const

export const vips_dbuf_destroy = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
  ],
  result: "void" // void
} as const

export const vips_dbuf_get_write = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // size as size_t *
  ],
  result: "buffer" // unsigned char *
} as const

export const vips_dbuf_init = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
  ],
  result: "void" // void
} as const

export const vips_dbuf_minimum_size = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "usize", // size as size_t
  ],
  result: "bool" // gboolean
} as const

export const vips_dbuf_read = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // data as unsigned char *
    "usize", // size as size_t
  ],
  result: "usize" // size_t
} as const

export const vips_dbuf_reset = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
  ],
  result: "void" // void
} as const

export const vips_dbuf_seek = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "usize", // offset as off_t
    "i32", // whence as int
  ],
  result: "bool" // gboolean
} as const

export const vips_dbuf_steal = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // size as size_t *
  ],
  result: "buffer" // unsigned char *
} as const

export const vips_dbuf_string = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // size as size_t *
  ],
  result: "buffer" // unsigned char *
} as const

export const vips_dbuf_tell = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
  ],
  result: "usize" // off_t
} as const

export const vips_dbuf_truncate = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
  ],
  result: "void" // void
} as const

export const vips_dbuf_write = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // data as const unsigned char *
    "usize", // size as size_t
  ],
  result: "bool" // gboolean
} as const

export const vips_dbuf_write_amp = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // str as const char *
  ],
  result: "bool" // gboolean
} as const

export const vips_dbuf_writef = {
  parameters: [
    "pointer", // dbuf as VipsDbuf *
    "buffer", // fmt as const char *
    "pointer", // args as void *
  ],
  result: "bool" // gboolean
} as const
