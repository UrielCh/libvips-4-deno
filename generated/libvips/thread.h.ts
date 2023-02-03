import {
  buf,
  cstringT,
  int,
  ptr,
} from "./typeDefinitions.ts";

export const vips_g_mutex_new = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_g_mutex_free = {
  parameters: [
    buf(int),
  ],
  result: "void",
} as const;

export const vips_g_cond_new = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_g_cond_free = {
  parameters: [
    buf(int),
  ],
  result: "void",
} as const;

export const vips_g_thread_new = {
  parameters: [
    cstringT,
    int, // GThreadFunc
    int, // gpointer
  ],
  result: buf(int),
} as const;

export const vips_g_thread_join = {
  parameters: [
    buf(int), // thread
  ],
  result: ptr("void"),
} as const;

export const vips_thread_isworker = {
  parameters: [],
  result: int,
} as const;
