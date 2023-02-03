import {
  buf,
  cstringT,
  double,
  int,
} from "./typeDefinitions.ts";

export const vips_black = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_xyz = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_grey = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_gaussmat = {
  parameters: [
    buf(buf(int)), // out
    double, // sigma
    double, // min_ampl
  ],
  result: int,
} as const;

export const vips_logmat = {
  parameters: [
    buf(buf(int)), // out
    double, // sigma
    double, // min_ampl
  ],
  result: int,
} as const;

export const vips_text = {
  parameters: [
    buf(buf(int)), // out
    cstringT, // text
  ],
  result: int,
} as const;

export const vips_gaussnoise = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_eye = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_sines = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_zone = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_identity = {
  parameters: [
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_buildlut = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_invertlut = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_tonelut = {
  parameters: [
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_mask_ideal = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff
  ],
  result: int,
} as const;

export const vips_mask_ideal_ring = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff
    double, // ringwidth
  ],
  result: int,
} as const;

export const vips_mask_ideal_band = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff_x
    double, // frequency_cutoff_y
    double, // radius
  ],
  result: int,
} as const;

export const vips_mask_butterworth = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // order
    double, // frequency_cutoff
    double, // amplitude_cutoff
  ],
  result: int,
} as const;

export const vips_mask_butterworth_ring = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // order
    double, // frequency_cutoff
    double, // amplitude_cutoff
    double, // ringwidth
  ],
  result: int,
} as const;

export const vips_mask_butterworth_band = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // order
    double, // frequency_cutoff_x
    double, // frequency_cutoff_y
    double, // radius
    double, // amplitude_cutoff
  ],
  result: int,
} as const;

export const vips_mask_gaussian = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff
    double, // amplitude_cutoff
  ],
  result: int,
} as const;

export const vips_mask_gaussian_ring = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff
    double, // amplitude_cutoff
    double, // ringwidth
  ],
  result: int,
} as const;

export const vips_mask_gaussian_band = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // frequency_cutoff_x
    double, // frequency_cutoff_y
    double, // radius
    double, // amplitude_cutoff
  ],
  result: int,
} as const;

export const vips_mask_fractal = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // fractal_dimension
  ],
  result: int,
} as const;

export const vips_fractsurf = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
    double, // fractal_dimension
  ],
  result: int,
} as const;

export const vips_worley = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_perlin = {
  parameters: [
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;
