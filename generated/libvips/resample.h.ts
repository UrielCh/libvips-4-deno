import {
  buf,
  cstringT,
  double,
  int,
  ptr,
} from "./typeDefinitions.ts";

export const vips_affine = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // a
    double, // b
    double, // c
    double, // d
  ],
  result: int,
} as const;

export const vips_mapim = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // index
  ],
  result: int,
} as const;

export const vips_quadratic = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // coeff
  ],
  result: int,
} as const;

export const vips_reduce = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // hshrink
    double, // vshrink
  ],
  result: int,
} as const;

export const vips_reduceh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // hshrink
  ],
  result: int,
} as const;

export const vips_reducev = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // vshrink
  ],
  result: int,
} as const;

export const vips_resize = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // scale
  ],
  result: int,
} as const;

export const vips_rotate = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // angle
  ],
  result: int,
} as const;

export const vips_shrink = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // hshrink
    double, // vshrink
  ],
  result: int,
} as const;

export const vips_shrinkh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // hshrink
  ],
  result: int,
} as const;

export const vips_shrinkv = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // vshrink
  ],
  result: int,
} as const;

export const vips_similarity = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_thumbnail = {
  parameters: [
    cstringT, // filename
    buf(buf(int)), // out
    int, // width
  ],
  result: int,
} as const;

export const vips_thumbnail_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(buf(int)), // out
    int, // width
  ],
  result: int,
} as const;

export const vips_thumbnail_image = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // width
  ],
  result: int,
} as const;

export const vips_thumbnail_source = {
  parameters: [
    buf(int), // source
    buf(buf(int)), // out
    int, // width
  ],
  result: int,
} as const;
