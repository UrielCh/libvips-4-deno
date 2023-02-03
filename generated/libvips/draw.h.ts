import {
  buf,
  double,
  int,
} from "./typeDefinitions.ts";

export const vips_draw_rect = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_draw_rect1 = {
  parameters: [
    buf(int), // image
    double, // ink
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_draw_point = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_point1 = {
  parameters: [
    buf(int), // image
    double, // ink
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_image = {
  parameters: [
    buf(int), // image
    buf(int), // sub
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_mask = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    buf(int), // mask
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_mask1 = {
  parameters: [
    buf(int), // image
    double, // ink
    buf(int), // mask
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_line = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    int, // x1
    int, // y1
    int, // x2
    int, // y2
  ],
  result: int,
} as const;

export const vips_draw_line1 = {
  parameters: [
    buf(int), // image
    double, // ink
    int, // x1
    int, // y1
    int, // x2
    int, // y2
  ],
  result: int,
} as const;

export const vips_draw_circle = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    int, // cx
    int, // cy
    int, // radius
  ],
  result: int,
} as const;

export const vips_draw_circle1 = {
  parameters: [
    buf(int), // image
    double, // ink
    int, // cx
    int, // cy
    int, // radius
  ],
  result: int,
} as const;

export const vips_draw_flood = {
  parameters: [
    buf(int), // image
    buf(double), // ink
    int, // n
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_flood1 = {
  parameters: [
    buf(int), // image
    double, // ink
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_draw_smudge = {
  parameters: [
    buf(int), // image
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;
