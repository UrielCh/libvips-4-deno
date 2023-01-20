// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_allocate_input_array = {
  parameters: [
    "pointer", // out as VipsImage *
    "pointer", // args as void *
  ],
  result: "pointer" // VipsImage **
} as const

export const vips_image_generate = {
  parameters: [
    "pointer", // image as VipsImage *
    "function", // start_fn as VipsStartFn
    "function", // generate_fn as VipsGenerateFn
    "function", // stop_fn as VipsStopFn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "i32" // int
} as const

export const vips_image_pipeline_array = {
  parameters: [
    "pointer", // image as VipsImage *
    "u32", // hint as VipsDemandStyle
    "pointer", // in as VipsImage **
  ],
  result: "i32" // int
} as const

export const vips_image_pipelinev = {
  parameters: [
    "pointer", // image as VipsImage *
    "u32", // hint as VipsDemandStyle
    "pointer", // args as void *
  ],
  result: "i32" // int
} as const

export const vips_sink = {
  parameters: [
    "pointer", // im as VipsImage *
    "function", // start_fn as VipsStartFn
    "function", // generate_fn as VipsGenerateFn
    "function", // stop_fn as VipsStopFn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "i32" // int
} as const

export const vips_sink_disc = {
  parameters: [
    "pointer", // im as VipsImage *
    "function", // write_fn as VipsRegionWrite
    "pointer", // a as void *
  ],
  result: "i32" // int
} as const

export const vips_sink_memory = {
  parameters: [
    "pointer", // im as VipsImage *
  ],
  result: "i32" // int
} as const

export const vips_sink_screen = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage *
    "pointer", // mask as VipsImage *
    "i32", // tile_width as int
    "i32", // tile_height as int
    "i32", // max_tiles as int
    "i32", // priority as int
    "function", // notify_fn as VipsSinkNotify
    "pointer", // a as void *
  ],
  result: "i32" // int
} as const

export const vips_sink_tile = {
  parameters: [
    "pointer", // im as VipsImage *
    "i32", // tile_width as int
    "i32", // tile_height as int
    "function", // start_fn as VipsStartFn
    "function", // generate_fn as VipsGenerateFn
    "function", // stop_fn as VipsStopFn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "i32" // int
} as const

export const vips_start_many = {
  parameters: [
    "pointer", // out as VipsImage *
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer" // void *
} as const

export const vips_start_one = {
  parameters: [
    "pointer", // out as VipsImage *
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer" // void *
} as const

export const vips_stop_many = {
  parameters: [
    "pointer", // seq as void *
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "i32" // int
} as const

export const vips_stop_one = {
  parameters: [
    "pointer", // seq as void *
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "i32" // int
} as const
