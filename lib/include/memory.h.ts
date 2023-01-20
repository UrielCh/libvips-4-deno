// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_malloc = {
  parameters: [
    "buffer", // object as VipsObject *
    "usize", // size as size_t
  ],
  result: "pointer"
} as const

export const vips_strdup = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // str as const char *
  ],
  result: "buffer"
} as const

export const vips_tracked_close = {
  parameters: [
    "i32", // fd as int
  ],
  result: "i32"
} as const

export const vips_tracked_free = {
  parameters: [
    "pointer", // s as void *
  ],
  result: "void"
} as const

export const vips_tracked_get_allocs = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_tracked_get_files = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_tracked_get_mem = {
  parameters: [
  
  ],
  result: "usize"
} as const

export const vips_tracked_get_mem_highwater = {
  parameters: [
  
  ],
  result: "usize"
} as const

export const vips_tracked_malloc = {
  parameters: [
    "usize", // size as size_t
  ],
  result: "pointer"
} as const

export const vips_tracked_open = {
  parameters: [
    "buffer", // pathname as const char *
    "i32", // flags as int
    "i32", // mode as int
  ],
  result: "i32"
} as const
