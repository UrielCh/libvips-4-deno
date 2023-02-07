import {
  buf,
  cstringT,
  int,
  ptr,
  VipsSbufT,
} from "./typeDefinitions.ts";

export const vips_sbuf_get_line = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: cstringT,
} as const;

export const vips_sbuf_get_line_copy = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: cstringT,
} as const;

export const vips_sbuf_get_non_whitespace = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: cstringT,
} as const;

export const vips_sbuf_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_sbuf_getc = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: int,
} as const;

export const vips_sbuf_new_from_source = {
  parameters: [
    buf(int), // source
  ],
  result: ptr(VipsSbufT),
} as const;

export const vips_sbuf_require = {
  parameters: [
    ptr(VipsSbufT), // sbuf
    int, // require
  ],
  result: int,
} as const;

export const vips_sbuf_skip_whitespace = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: int,
} as const;

export const vips_sbuf_unbuffer = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: "void",
} as const;

export const vips_sbuf_ungetc = {
  parameters: [
    ptr(VipsSbufT), // sbuf
  ],
  result: "void",
} as const;
