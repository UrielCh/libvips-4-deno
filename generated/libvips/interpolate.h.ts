import {
  buf,
  cstringT,
  double,
  int,
  ptr,
  VipsInterpolateMethodT,
  VipsInterpolateT,
} from "./typeDefinitions.ts";

export const vips_interpolate = {
  parameters: [
    ptr(VipsInterpolateT), // interpolate
    ptr("void"), // out
    buf(int), // in
    double, // x
    double, // y
  ],
  result: "void",
} as const;

export const vips_interpolate_bilinear_static = {
  parameters: [],
  result: ptr(VipsInterpolateT),
} as const;

export const vips_interpolate_get_method = {
  parameters: [
    ptr(VipsInterpolateT), // interpolate
  ],
  result: VipsInterpolateMethodT,
} as const;

export const vips_interpolate_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_interpolate_get_window_offset = {
  parameters: [
    ptr(VipsInterpolateT), // interpolate
  ],
  result: int,
} as const;

export const vips_interpolate_get_window_size = {
  parameters: [
    ptr(VipsInterpolateT), // interpolate
  ],
  result: int,
} as const;

export const vips_interpolate_nearest_static = {
  parameters: [],
  result: ptr(VipsInterpolateT),
} as const;

export const vips_interpolate_new = {
  parameters: [
    cstringT, // nickname
  ],
  result: ptr(VipsInterpolateT),
} as const;
