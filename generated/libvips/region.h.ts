import {
  buf,
  int,
  VipsRegionShrinkT,
} from "./typeDefinitions.ts";

export const vips_region_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_region_new = {
  parameters: [
    buf(int), // image
  ],
  result: buf(int),
} as const;

export const vips_region_buffer = {
  parameters: [
    buf(int), // reg
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_region_image = {
  parameters: [
    buf(int), // reg
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_region_region = {
  parameters: [
    buf(int), // reg
    buf(int), // dest
    buf(int), // r
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_region_equalsregion = {
  parameters: [
    buf(int), // reg1
    buf(int), // reg2
  ],
  result: int,
} as const;

export const vips_region_position = {
  parameters: [
    buf(int), // reg
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_region_paint = {
  parameters: [
    buf(int), // reg
    buf(int), // r
    int, // value
  ],
  result: "void",
} as const;

export const vips_region_paint_pel = {
  parameters: [
    buf(int), // reg
    buf(int), // r
    buf(int), // ink
  ],
  result: "void",
} as const;

export const vips_region_black = {
  parameters: [
    buf(int), // reg
  ],
  result: "void",
} as const;

export const vips_region_copy = {
  parameters: [
    buf(int), // reg
    buf(int), // dest
    buf(int), // r
    int, // x
    int, // y
  ],
  result: "void",
} as const;

export const vips_region_shrink_method = {
  parameters: [
    buf(int), // from
    buf(int), // to
    buf(int), // target
    VipsRegionShrinkT, // method
  ],
  result: int,
} as const;

export const vips_region_shrink = {
  parameters: [
    buf(int), // from
    buf(int), // to
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_region_prepare = {
  parameters: [
    buf(int), // reg
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_region_prepare_to = {
  parameters: [
    buf(int), // reg
    buf(int), // dest
    buf(int), // r
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_region_fetch = {
  parameters: [
    buf(int), // region
    int, // left
    int, // top
    int, // width
    int, // height
    buf(int), // len
  ],
  result: buf(int),
} as const;

export const vips_region_width = {
  parameters: [
    buf(int), // region
  ],
  result: int,
} as const;

export const vips_region_height = {
  parameters: [
    buf(int), // region
  ],
  result: int,
} as const;

export const vips_region_invalidate = {
  parameters: [
    buf(int), // reg
  ],
  result: "void",
} as const;
