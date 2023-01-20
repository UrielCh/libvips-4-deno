// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_affine = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // a as double
    "f64", // b as double
    "f64", // c as double
    "f64", // d as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_mapim = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // index as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_quadratic = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // coeff as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_reduce = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // hshrink as double
    "f64", // vshrink as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_reduceh = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // hshrink as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_reducev = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // vshrink as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_resize = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // scale as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_rotate = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // angle as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_shrink = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "f64", // hshrink as double
    "f64", // vshrink as double
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_shrinkh = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // hshrink as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_shrinkv = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // vshrink as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_similarity = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_thumbnail = {
  parameters: [
    "buffer", // filename as const char *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_thumbnail_buffer = {
  parameters: [
    "pointer", // buf as void *
    "usize", // len as size_t
    "pointer", // out as VipsImage **
    "i32", // width as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_thumbnail_image = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_thumbnail_source = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "pointer", // args as void *
  ],
  result: "i32"
} as const
