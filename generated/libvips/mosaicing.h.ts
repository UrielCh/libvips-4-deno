import {
  buf,
  cstringT,
  int,
} from "./typeDefinitions.ts";

export const vips_globalbalance = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_match = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(buf(int)), // out
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
  ],
  result: int,
} as const;

export const vips_matrixinvert = {
  parameters: [
    buf(int), // m
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_merge = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(buf(int)), // out
    int, // direction
    int, // dx
    int, // dy
  ],
  result: int,
} as const;

export const vips_mosaic = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(buf(int)), // out
    int, // direction
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
  ],
  result: int,
} as const;

export const vips_mosaic1 = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(buf(int)), // out
    int, // direction
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
  ],
  result: int,
} as const;

export const vips_remosaic = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    cstringT, // old_str
    cstringT, // new_str
  ],
  result: int,
} as const;
