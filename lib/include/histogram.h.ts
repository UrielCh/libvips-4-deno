// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_case = {
  parameters: [
    "pointer", // index as VipsImage *
    "pointer", // cases as VipsImage **
    "pointer", // out as VipsImage **
    "i32", // n as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_cum = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_entropy = {
  parameters: [
    "pointer", // in as VipsImage *
    "buffer", // out as double *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_equal = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_ismonotonic = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as gboolean *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_local = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_match = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // ref as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_norm = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_hist_plot = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_maplut = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // lut as VipsImage *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_percent = {
  parameters: [
    "pointer", // in as VipsImage *
    "f64", // percent as double
    "buffer", // threshold as int *
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_stdif = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const
