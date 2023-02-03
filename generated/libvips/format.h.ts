import {
  buf,
  cstringArrayT,
  cstringT,
  int,
  ptr,
  VipsFormatClassT,
  VipsFormatFlagsT,
} from "./typeDefinitions.ts";

export const vips_format_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_format_map = {
  parameters: [
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_format_for_file = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(VipsFormatClassT),
} as const;

export const vips_format_for_name = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(VipsFormatClassT),
} as const;

export const vips_format_get_flags = {
  parameters: [
    ptr(VipsFormatClassT), // format
    cstringT, // filename
  ],
  result: VipsFormatFlagsT,
} as const;

export const vips_format_read = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const vips_format_write = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_jpeg2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_bufjpeg2vips = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(int), // out
    int, // header_only
  ],
  result: int,
} as const;

export const im_vips2jpeg = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_vips2mimejpeg = {
  parameters: [
    buf(int), // in
    int, // qfac
  ],
  result: int,
} as const;

export const im_vips2bufjpeg = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // qfac
    cstringArrayT, // obuf
    buf(int), // olen
  ],
  result: int,
} as const;

export const im_tiff2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2tiff = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_tile_cache = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // tile_width
    int, // tile_height
    int, // max_tiles
  ],
  result: int,
} as const;

export const im_magick2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_bufmagick2vips = {
  parameters: [
    ptr("void"), // buf
    int, // len
    buf(int), // out
    int, // header_only
  ],
  result: int,
} as const;

export const im_exr2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_ppm2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2ppm = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_analyze2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_csv2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2csv = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_png2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2png = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_vips2bufpng = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // compression
    int, // interlace
    cstringArrayT, // obuf
    buf(int), // olen
  ],
  result: int,
} as const;

export const im_webp2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2webp = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_raw2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
    int, // width
    int, // height
    int, // bpp
    int, // offset
  ],
  result: int,
} as const;

export const im_vips2raw = {
  parameters: [
    buf(int), // in
    int, // fd
  ],
  result: int,
} as const;

export const im_mat2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rad2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2rad = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_fits2vips = {
  parameters: [
    cstringT, // filename
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2fits = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_vips2dz = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: int,
} as const;
