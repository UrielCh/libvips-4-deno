import {
  buf,
  cstringT,
  int,
  ptr,
} from "./typeDefinitions.ts";

export const vips_malloc = {
  parameters: [
    buf(int), // object
    int, // size
  ],
  result: ptr("void"),
} as const;

export const vips_strdup = {
  parameters: [
    buf(int), // object
    cstringT, // str
  ],
  result: cstringT,
} as const;

export const vips_tracked_close = {
  parameters: [
    int, // fd
  ],
  result: int,
} as const;

export const vips_tracked_free = {
  parameters: [
    ptr("void"), // s
  ],
  result: "void",
} as const;

export const vips_tracked_get_allocs = {
  parameters: [],
  result: int,
} as const;

export const vips_tracked_get_files = {
  parameters: [],
  result: int,
} as const;

export const vips_tracked_get_mem = {
  parameters: [],
  result: int,
} as const;

export const vips_tracked_get_mem_highwater = {
  parameters: [],
  result: int,
} as const;

export const vips_tracked_malloc = {
  parameters: [
    int, // size
  ],
  result: ptr("void"),
} as const;

export const vips_tracked_open = {
  parameters: [
    cstringT, // pathname
    int, // flags
    int, // mode
  ],
  result: int,
} as const;
