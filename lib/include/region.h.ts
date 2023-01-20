// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_region_black = {
  parameters: [
    "pointer", // reg as VipsRegion *
  ],
  result: "void"
} as const

export const vips_region_buffer = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // r as const VipsRect *
  ],
  result: "i32"
} as const

export const vips_region_copy = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // dest as VipsRegion *
    "pointer", // r as const VipsRect *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "void"
} as const

export const vips_region_equalsregion = {
  parameters: [
    "pointer", // reg1 as VipsRegion *
    "pointer", // reg2 as VipsRegion *
  ],
  result: "i32"
} as const

export const vips_region_fetch = {
  parameters: [
    "pointer", // region as VipsRegion *
    "i32", // left as int
    "i32", // top as int
    "i32", // width as int
    "i32", // height as int
    "buffer", // len as size_t *
  ],
  result: "pointer"
} as const

export const vips_region_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_region_height = {
  parameters: [
    "pointer", // region as VipsRegion *
  ],
  result: "i32"
} as const

export const vips_region_image = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // r as const VipsRect *
  ],
  result: "i32"
} as const

export const vips_region_invalidate = {
  parameters: [
    "pointer", // reg as VipsRegion *
  ],
  result: "void"
} as const

export const vips_region_new = {
  parameters: [
    "pointer", // image as VipsImage *
  ],
  result: "pointer"
} as const

export const vips_region_paint = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // r as const VipsRect *
    "i32", // value as int
  ],
  result: "void"
} as const

export const vips_region_paint_pel = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // r as const VipsRect *
    "buffer", // ink as const VipsPel *
  ],
  result: "void"
} as const

export const vips_region_position = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "i32"
} as const

export const vips_region_prepare = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // r as const VipsRect *
  ],
  result: "i32"
} as const

export const vips_region_prepare_to = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // dest as VipsRegion *
    "pointer", // r as const VipsRect *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "i32"
} as const

export const vips_region_region = {
  parameters: [
    "pointer", // reg as VipsRegion *
    "pointer", // dest as VipsRegion *
    "pointer", // r as const VipsRect *
    "i32", // x as int
    "i32", // y as int
  ],
  result: "i32"
} as const

export const vips_region_shrink = {
  parameters: [
    "pointer", // from as VipsRegion *
    "pointer", // to as VipsRegion *
    "pointer", // target as const VipsRect *
  ],
  result: "i32"
} as const

export const vips_region_shrink_method = {
  parameters: [
    "pointer", // from as VipsRegion *
    "pointer", // to as VipsRegion *
    "pointer", // target as const VipsRect *
    "u32", // method as VipsRegionShrink
  ],
  result: "i32"
} as const

export const vips_region_width = {
  parameters: [
    "pointer", // region as VipsRegion *
  ],
  result: "i32"
} as const
