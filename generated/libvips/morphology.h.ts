import {
  buf,
  double,
  int,
  VipsOperationMorphologyT,
} from "./typeDefinitions.ts";

export const vips_countlines = {
  parameters: [
    buf(int), // in
    buf(double), // nolines
    int, // direction
  ],
  result: int,
} as const;

export const vips_fill_nearest = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_labelregions = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // mask
  ],
  result: int,
} as const;

export const vips_median = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // size
  ],
  result: int,
} as const;

export const vips_morph = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
    VipsOperationMorphologyT, // morph
  ],
  result: int,
} as const;

export const vips_rank = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // width
    int, // height
    int, // index
  ],
  result: int,
} as const;
