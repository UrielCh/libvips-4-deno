// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_black = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_buildlut = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_eye = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_fractsurf = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // fractal_dimension as double
  ],
  result: "i32"
} as const

export const vips_gaussmat = {
  parameters: [
    "pointer", // out as VipsImage **
    "f64", // sigma as double
    "f64", // min_ampl as double
  ],
  result: "i32"
} as const

export const vips_gaussnoise = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_grey = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_identity = {
  parameters: [
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_invertlut = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_logmat = {
  parameters: [
    "pointer", // out as VipsImage **
    "f64", // sigma as double
    "f64", // min_ampl as double
  ],
  result: "i32"
} as const

export const vips_mask_butterworth = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // order as double
    "f64", // frequency_cutoff as double
    "f64", // amplitude_cutoff as double
  ],
  result: "i32"
} as const

export const vips_mask_butterworth_band = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // order as double
    "f64", // frequency_cutoff_x as double
    "f64", // frequency_cutoff_y as double
    "f64", // radius as double
    "f64", // amplitude_cutoff as double
  ],
  result: "i32"
} as const

export const vips_mask_butterworth_ring = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // order as double
    "f64", // frequency_cutoff as double
    "f64", // amplitude_cutoff as double
    "f64", // ringwidth as double
  ],
  result: "i32"
} as const

export const vips_mask_fractal = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // fractal_dimension as double
  ],
  result: "i32"
} as const

export const vips_mask_gaussian = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff as double
    "f64", // amplitude_cutoff as double
  ],
  result: "i32"
} as const

export const vips_mask_gaussian_band = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff_x as double
    "f64", // frequency_cutoff_y as double
    "f64", // radius as double
    "f64", // amplitude_cutoff as double
  ],
  result: "i32"
} as const

export const vips_mask_gaussian_ring = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff as double
    "f64", // amplitude_cutoff as double
    "f64", // ringwidth as double
  ],
  result: "i32"
} as const

export const vips_mask_ideal = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff as double
  ],
  result: "i32"
} as const

export const vips_mask_ideal_band = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff_x as double
    "f64", // frequency_cutoff_y as double
    "f64", // radius as double
  ],
  result: "i32"
} as const

export const vips_mask_ideal_ring = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
    "f64", // frequency_cutoff as double
    "f64", // ringwidth as double
  ],
  result: "i32"
} as const

export const vips_perlin = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_sines = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_text = {
  parameters: [
    "pointer", // out as VipsImage **
    "buffer", // text as const char *
  ],
  result: "i32"
} as const

export const vips_tonelut = {
  parameters: [
    "pointer", // out as VipsImage **
  ],
  result: "i32"
} as const

export const vips_worley = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_xyz = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const

export const vips_zone = {
  parameters: [
    "pointer", // out as VipsImage **
    "i32", // width as int
    "i32", // height as int
  ],
  result: "i32"
} as const
