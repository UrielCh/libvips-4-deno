import {
  buf,
  cstringT,
  gbooleanT,
  int,
  off_t,
  size_t,
  unsignedChar,
  VipsDbufT,
} from "./typeDefinitions.ts";

export const vips_dbuf_allocate = {
  parameters: [
    buf(VipsDbufT), // dbuf
    size_t, // size
  ],
  result: gbooleanT,
} as const;

export const vips_dbuf_destroy = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: "void",
} as const;

export const vips_dbuf_destroy = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: "void",
} as const;

export const vips_dbuf_get_write = {
  parameters: [
    buf(VipsDbufT), // dbuf
    buf(size_t), // size
  ],
  result: buf(unsignedChar),
} as const;

export const vips_dbuf_init = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: "void",
} as const;

export const vips_dbuf_read = {
  parameters: [
    buf(VipsDbufT), // dbuf
    buf(unsignedChar), // data
    size_t, // size
  ],
  result: size_t,
} as const;

export const vips_dbuf_reset = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: "void",
} as const;

export const vips_dbuf_seek = {
  parameters: [
    buf(VipsDbufT), // dbuf
    off_t, // offset
    int, // whence
  ],
  result: gbooleanT,
} as const;

export const vips_dbuf_steal = {
  parameters: [
    buf(VipsDbufT), // dbuf
    buf(size_t), // size
  ],
  result: buf(unsignedChar),
} as const;

export const vips_dbuf_string = {
  parameters: [
    buf(VipsDbufT), // dbuf
    buf(size_t), // size
  ],
  result: buf(unsignedChar),
} as const;

export const vips_dbuf_tell = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: off_t,
} as const;

export const vips_dbuf_truncate = {
  parameters: [
    buf(VipsDbufT), // dbuf
  ],
  result: "void",
} as const;

export const vips_dbuf_write = {
  parameters: [
    buf(VipsDbufT), // dbuf
    buf(unsignedChar), // data
    size_t, // size
  ],
  result: gbooleanT,
} as const;

export const vips_dbuf_write_amp = {
  parameters: [
    buf(VipsDbufT), // dbuf
    cstringT, // str
  ],
  result: gbooleanT,
} as const;

export const vips_dbuf_writef = {
  parameters: [
    buf(VipsDbufT), // dbuf
    cstringT, // fmt
  ],
  result: gbooleanT,
} as const;
