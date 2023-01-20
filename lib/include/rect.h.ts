// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_rect_dup = {
  parameters: [
    "pointer", // r as const VipsRect *
  ],
  result: "pointer"
} as const

export const vips_rect_equalsrect = {
  parameters: [
    "pointer", // r1 as const VipsRect *
    "pointer", // r2 as const VipsRect *
  ],
  result: "bool"
} as const

export const vips_rect_includespoint = {
  parameters: [
    "pointer", // r as const VipsRect *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "bool"
} as const

export const vips_rect_includesrect = {
  parameters: [
    "pointer", // r1 as const VipsRect *
    "pointer", // r2 as const VipsRect *
  ],
  result: "bool"
} as const

export const vips_rect_intersectrect = {
  parameters: [
    "pointer", // r1 as const VipsRect *
    "pointer", // r2 as const VipsRect *
    "pointer", // out as VipsRect *
  ],
  result: "void"
} as const

export const vips_rect_isempty = {
  parameters: [
    "pointer", // r as const VipsRect *
  ],
  result: "bool"
} as const

export const vips_rect_marginadjust = {
  parameters: [
    "pointer", // r as VipsRect *
    "i32", // n as int
  ],
  result: "void"
} as const

export const vips_rect_normalise = {
  parameters: [
    "pointer", // r as VipsRect *
  ],
  result: "void"
} as const

export const vips_rect_overlapsrect = {
  parameters: [
    "pointer", // r1 as const VipsRect *
    "pointer", // r2 as const VipsRect *
  ],
  result: "bool"
} as const

export const vips_rect_unionrect = {
  parameters: [
    "pointer", // r1 as const VipsRect *
    "pointer", // r2 as const VipsRect *
    "pointer", // out as VipsRect *
  ],
  result: "void"
} as const
