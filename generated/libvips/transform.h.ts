import {
  buf,
  double,
  int,
  VipsTransformationT,
} from "./typeDefinitions.ts";

export const vips__affine = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(VipsTransformationT), // trn
  ],
  result: int,
} as const;

export const vips__transform_add = {
  parameters: [
    buf(VipsTransformationT), // in1
    buf(VipsTransformationT), // in2
    buf(VipsTransformationT), // out
  ],
  result: int,
} as const;

export const vips__transform_calc_inverse = {
  parameters: [
    buf(VipsTransformationT), // trn
  ],
  result: int,
} as const;

export const vips__transform_forward_point = {
  parameters: [
    buf(VipsTransformationT), // trn
    double, // x
    double, // y
    buf(double), // ox
    buf(double), // oy
  ],
  result: "void",
} as const;

export const vips__transform_forward_rect = {
  parameters: [
    buf(VipsTransformationT), // trn
    buf(int), // in
    buf(int), // out
  ],
  result: "void",
} as const;

export const vips__transform_init = {
  parameters: [
    buf(VipsTransformationT), // trn
  ],
  result: "void",
} as const;

export const vips__transform_invert_point = {
  parameters: [
    buf(VipsTransformationT), // trn
    double, // x
    double, // y
    buf(double), // ox
    buf(double), // oy
  ],
  result: "void",
} as const;

export const vips__transform_invert_rect = {
  parameters: [
    buf(VipsTransformationT), // trn
    buf(int), // in
    buf(int), // out
  ],
  result: "void",
} as const;

export const vips__transform_isidentity = {
  parameters: [
    buf(VipsTransformationT), // trn
  ],
  result: int,
} as const;

export const vips__transform_print = {
  parameters: [
    buf(VipsTransformationT), // trn
  ],
  result: "void",
} as const;

export const vips__transform_set_area = {
  parameters: [
    buf(VipsTransformationT),
  ],
  result: "void",
} as const;
