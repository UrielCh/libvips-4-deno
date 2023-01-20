// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_semaphore_destroy = {
  parameters: [
    "pointer", // s as VipsSemaphore *
  ],
  result: "void" // void
} as const

export const vips_semaphore_down = {
  parameters: [
    "pointer", // s as VipsSemaphore *
  ],
  result: "i32" // int
} as const

export const vips_semaphore_down_timeout = {
  parameters: [
    "pointer", // s as VipsSemaphore *
    "i64", // timeout as gint64
  ],
  result: "i32" // int
} as const

export const vips_semaphore_downn = {
  parameters: [
    "pointer", // s as VipsSemaphore *
    "i32", // n as int
  ],
  result: "i32" // int
} as const

export const vips_semaphore_init = {
  parameters: [
    "pointer", // s as VipsSemaphore *
    "i32", // v as int
    "buffer", // name as char *
  ],
  result: "void" // void
} as const

export const vips_semaphore_up = {
  parameters: [
    "pointer", // s as VipsSemaphore *
  ],
  result: "i32" // int
} as const

export const vips_semaphore_upn = {
  parameters: [
    "pointer", // s as VipsSemaphore *
    "i32", // n as int
  ],
  result: "i32" // int
} as const
