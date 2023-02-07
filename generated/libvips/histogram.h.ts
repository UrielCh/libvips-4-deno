import {
  buf,
  double,
  int,
} from "./typeDefinitions.ts";

export const vips_case = {
  parameters: [
    buf(int), // index
    buf(buf(int)), // cases
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_hist_cum = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_entropy = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_hist_equal = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_ismonotonic = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const vips_hist_local = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_hist_match = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_norm = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_plot = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_maplut = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // lut
  ],
  result: int,
} as const;

export const vips_percent = {
  parameters: [
    buf(int), // in
    double, // percent
    buf(int), // threshold
  ],
  result: int,
} as const;

export const vips_stdif = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;
