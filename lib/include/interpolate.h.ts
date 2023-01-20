// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_interpolate = {
  parameters: [
    "pointer", // interpolate as VipsInterpolate *
    "pointer", // out as void *
    "pointer", // in as VipsRegion *
    "f64", // x as double
    "f64", // y as double
  ],
  result: "void"
} as const

export const vips_interpolate_bilinear_static = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_interpolate_get_method = {
  parameters: [
    "pointer", // interpolate as VipsInterpolate *
  ],
  result: "pointer"
} as const

export const vips_interpolate_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_interpolate_get_window_offset = {
  parameters: [
    "pointer", // interpolate as VipsInterpolate *
  ],
  result: "i32"
} as const

export const vips_interpolate_get_window_size = {
  parameters: [
    "pointer", // interpolate as VipsInterpolate *
  ],
  result: "i32"
} as const

export const vips_interpolate_nearest_static = {
  parameters: [
  
  ],
  result: "pointer"
} as const

export const vips_interpolate_new = {
  parameters: [
    "buffer", // nickname as const char *
  ],
  result: "pointer"
} as const
