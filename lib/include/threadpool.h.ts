// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_get_tile_size = {
  parameters: [
    "pointer", // im as VipsImage *
    "buffer", // tile_width as int *
    "buffer", // tile_height as int *
    "buffer", // n_lines as int *
  ],
  result: "void"
} as const

export const vips_thread_state_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_thread_state_new = {
  parameters: [
    "pointer", // im as VipsImage *
    "pointer", // a as void *
  ],
  result: "buffer"
} as const

export const vips_thread_state_set = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_threadpool_run = {
  parameters: [
    "pointer", // im as VipsImage *
    "function", // start as VipsThreadStartFn
    "function", // allocate as VipsThreadpoolAllocateFn
    "function", // work as VipsThreadpoolWorkFn
    "function", // progress as VipsThreadpoolProgressFn
    "pointer", // a as void *
  ],
  result: "i32"
} as const
