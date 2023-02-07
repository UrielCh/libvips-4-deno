import {
  buf,
  cstringArrayT,
  cstringT,
  gbooleanT,
  int,
  ptr,
  VipsOperationClassT,
  VipsOperationFlagsT,
  VipsOperationT,
} from "./typeDefinitions.ts";

export const vips_cache_drop_all = {
  parameters: [],
  result: "void",
} as const;

export const vips_cache_get_max = {
  parameters: [],
  result: int,
} as const;

export const vips_cache_get_max_files = {
  parameters: [],
  result: int,
} as const;

export const vips_cache_get_max_mem = {
  parameters: [],
  result: int,
} as const;

export const vips_cache_get_size = {
  parameters: [],
  result: int,
} as const;

export const vips_cache_operation_add = {
  parameters: [
    ptr(VipsOperationT), // operation
  ],
  result: "void",
} as const;

export const vips_cache_operation_build = {
  parameters: [
    ptr(VipsOperationT), // operation
  ],
  result: ptr(VipsOperationT),
} as const;

export const vips_cache_operation_buildp = {
  parameters: [
    buf(buf(VipsOperationT)), // operation
  ],
  result: int,
} as const;

export const vips_cache_operation_lookup = {
  parameters: [
    ptr(VipsOperationT), // operation
  ],
  result: ptr(VipsOperationT),
} as const;

export const vips_cache_print = {
  parameters: [],
  result: "void",
} as const;

export const vips_cache_set_dump = {
  parameters: [
    gbooleanT, // dump
  ],
  result: "void",
} as const;

export const vips_cache_set_max = {
  parameters: [
    int, // max
  ],
  result: "void",
} as const;

export const vips_cache_set_max_files = {
  parameters: [
    int, // max_files
  ],
  result: "void",
} as const;

export const vips_cache_set_max_mem = {
  parameters: [
    int, // max_mem
  ],
  result: "void",
} as const;

export const vips_cache_set_trace = {
  parameters: [
    gbooleanT, // trace
  ],
  result: "void",
} as const;

export const vips_call = {
  parameters: [
    cstringT, // operation_name
  ],
  result: int,
} as const;

export const vips_call_argv = {
  parameters: [
    ptr(VipsOperationT), // operation
    int, // argc
    cstringArrayT, // argv
  ],
  result: int,
} as const;

export const vips_call_options = {
  parameters: [
    buf(int), // group
    ptr(VipsOperationT), // operation
  ],
  result: "void",
} as const;

export const vips_call_required_optional = {
  parameters: [
    buf(buf(VipsOperationT)), // operation
    int, // required
    int, // optional
  ],
  result: int,
} as const;

export const vips_call_split = {
  parameters: [
    cstringT, // operation_name
    int, // optional
  ],
  result: int,
} as const;

export const vips_call_split_option_string = {
  parameters: [
    cstringT, // operation_name
    cstringT, // option_string
    int, // optional
  ],
  result: int,
} as const;

export const vips_concurrency_get = {
  parameters: [],
  result: int,
} as const;

export const vips_concurrency_set = {
  parameters: [
    int, // concurrency
  ],
  result: "void",
} as const;

// Symbol vips_operation_call_valist not exported by lib libvips.so
export const vips_operation_class_print_usage = {
  parameters: [
    buf(VipsOperationClassT), // operation_class
  ],
  result: "void",
} as const;

export const vips_operation_get_flags = {
  parameters: [
    ptr(VipsOperationT), // operation
  ],
  result: VipsOperationFlagsT,
} as const;

export const vips_operation_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_operation_invalidate = {
  parameters: [
    ptr(VipsOperationT), // operation
  ],
  result: "void",
} as const;

export const vips_operation_new = {
  parameters: [
    cstringT, // name
  ],
  result: ptr(VipsOperationT),
} as const;
