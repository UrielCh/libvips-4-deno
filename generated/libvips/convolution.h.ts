import {
  buf,
  double,
  int,
} from "./typeDefinitions.ts";

export const vips_conv = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_convf = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_convi = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_conva = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_convsep = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_convasep = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_compass = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_gaussblur = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // sigma
  ],
  result: int,
} as const;

export const vips_sharpen = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_spcor = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_fastcor = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sobel = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_canny = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;
