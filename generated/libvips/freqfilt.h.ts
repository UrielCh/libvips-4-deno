import {
  buf,
  int,
} from "./typeDefinitions.ts";

export const vips_fwfft = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_invfft = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_freqmult = {
  parameters: [
    buf(int), // in
    buf(int), // mask
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_spectrum = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_phasecor = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(buf(int)), // out
  ],
  result: int,
} as const;
