// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_globalbalance = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_match = {
  parameters: [
    "pointer", // ref as VipsImage *
    "pointer", // sec as VipsImage *
    "pointer", // out as VipsImage **
    "i32", // xr1 as int
    "i32", // yr1 as int
    "i32", // xs1 as int
    "i32", // ys1 as int
    "i32", // xr2 as int
    "i32", // yr2 as int
    "i32", // xs2 as int
    "i32", // ys2 as int
  ],
  result: "i32"
} as const

export const vips_matrixinvert = {
  parameters: [
    "pointer", // m as VipsImage *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_merge = {
  parameters: [
    "pointer", // ref as VipsImage *
    "pointer", // sec as VipsImage *
    "pointer", // out as VipsImage **
    "u32", // direction as VipsDirection
    "i32", // dx as int
    "i32", // dy as int
  ],
  result: "i32"
} as const

export const vips_mosaic = {
  parameters: [
    "pointer", // ref as VipsImage *
    "pointer", // sec as VipsImage *
    "pointer", // out as VipsImage **
    "u32", // direction as VipsDirection
    "i32", // xref as int
    "i32", // yref as int
    "i32", // xsec as int
    "i32", // ysec as int
  ],
  result: "i32"
} as const

export const vips_mosaic1 = {
  parameters: [
    "pointer", // ref as VipsImage *
    "pointer", // sec as VipsImage *
    "pointer", // out as VipsImage **
    "u32", // direction as VipsDirection
    "i32", // xr1 as int
    "i32", // yr1 as int
    "i32", // xs1 as int
    "i32", // ys1 as int
    "i32", // xr2 as int
    "i32", // yr2 as int
    "i32", // xs2 as int
    "i32", // ys2 as int
  ],
  result: "i32"
} as const

export const vips_remosaic = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "buffer", // old_str as const char *
    "buffer", // new_str as const char *
  ],
  result: "i32"
} as const
