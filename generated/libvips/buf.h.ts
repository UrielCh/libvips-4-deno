import {
  buf,
  char,
  cstringT,
  gbooleanT,
  int,
  va_listT,
  VipsBufT,
} from "./typeDefinitions.ts";

export const vips_buf_rewind = {
  parameters: [
    buf(VipsBufT), // buf
  ],
  result: "void",
} as const;

export const vips_buf_destroy = {
  parameters: [
    buf(VipsBufT), // buf
  ],
  result: "void",
} as const;

export const vips_buf_init = {
  parameters: [
    buf(VipsBufT), // buf
  ],
  result: "void",
} as const;

export const vips_buf_set_static = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // base
    int, // mx
  ],
  result: "void",
} as const;

export const vips_buf_set_dynamic = {
  parameters: [
    buf(VipsBufT), // buf
    int, // mx
  ],
  result: "void",
} as const;

export const vips_buf_init_static = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // base
    int, // mx
  ],
  result: "void",
} as const;

export const vips_buf_init_dynamic = {
  parameters: [
    buf(VipsBufT), // buf
    int, // mx
  ],
  result: "void",
} as const;

export const vips_buf_appendns = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // str
    int, // sz
  ],
  result: gbooleanT,
} as const;

export const vips_buf_appends = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // str
  ],
  result: gbooleanT,
} as const;

export const vips_buf_appendf = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // fmt
  ],
  result: gbooleanT,
} as const;

export const vips_buf_vappendf = {
  parameters: [
    buf(VipsBufT), // buf
    cstringT, // fmt
    va_listT, // ap
  ],
  result: gbooleanT,
} as const;

export const vips_buf_appendc = {
  parameters: [
    buf(VipsBufT), // buf
    char, // ch
  ],
  result: gbooleanT,
} as const;

// Symbol vips_buf_appendsc not exported by lib libvips.so