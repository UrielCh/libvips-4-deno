// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_countlines = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // nolines as double *
    "u32", // direction as VipsDirection
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_fill_nearest = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_labelregions = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // mask as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_median = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // size as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_morph = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // mask as VipsImage *
    "u32", // morph as VipsOperationMorphology
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_rank = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "i32", // index as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const
