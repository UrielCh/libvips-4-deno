// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips__region_no_ownership = {
  parameters: [
    "pointer", // reg as struct _VipsRegion *
  ],
  result: "void" // void
} as const

export const vips_buffer_done = {
  parameters: [
    "pointer", // buffer as VipsBuffer *
  ],
  result: "void" // void
} as const

export const vips_buffer_dump_all = {
  parameters: [
  
  ],
  result: "void" // void
} as const

export const vips_buffer_new = {
  parameters: [
    "pointer", // im as struct _VipsImage *
    "pointer", // area as VipsRect *
  ],
  result: "pointer" // VipsBuffer *
} as const

export const vips_buffer_print = {
  parameters: [
    "pointer", // buffer as VipsBuffer *
  ],
  result: "void" // void
} as const

export const vips_buffer_ref = {
  parameters: [
    "pointer", // im as struct _VipsImage *
    "pointer", // area as VipsRect *
  ],
  result: "pointer" // VipsBuffer *
} as const

export const vips_buffer_undone = {
  parameters: [
    "pointer", // buffer as VipsBuffer *
  ],
  result: "void" // void
} as const

export const vips_buffer_unref = {
  parameters: [
    "pointer", // buffer as VipsBuffer *
  ],
  result: "void" // void
} as const

export const vips_buffer_unref_ref = {
  parameters: [
    "pointer", // buffer as VipsBuffer *
    "pointer", // im as struct _VipsImage *
    "pointer", // area as VipsRect *
  ],
  result: "pointer" // VipsBuffer *
} as const

export const vips_region_fill = {
  parameters: [
    "pointer", // reg as struct _VipsRegion *
    "pointer", // r as const VipsRect *
    "function", // fn as VipsRegionFillFn
    "pointer", // a as void *
  ],
  result: "i32" // int
} as const

export const vips_region_prepare_many = {
  parameters: [
    "pointer", // reg as struct _VipsRegion **
    "pointer", // r as const VipsRect *
  ],
  result: "i32" // int
} as const

export const vips_window_print = {
  parameters: [
    "pointer", // window as VipsWindow *
  ],
  result: "void" // void
} as const

export const vips_window_unref = {
  parameters: [
    "pointer", // window as VipsWindow *
  ],
  result: "i32" // int
} as const
