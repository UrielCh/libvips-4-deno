import {
  buf,
  double,
  int,
  VipsAngleT,
  VipsBlendModeT,
  VipsCompassDirectionT,
  VipsDirectionT,
} from "./typeDefinitions.ts";

export const vips_addalpha = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_arrayjoin = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_autorot = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_autorot_remove_angle = {
  parameters: [
    buf(int), // image
  ],
  result: "void",
} as const;

export const vips_bandand = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandbool = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // boolean
  ],
  result: int,
} as const;

export const vips_bandeor = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandfold = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandjoin = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_bandjoin_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_bandjoin_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_bandjoin2 = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandmean = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandor = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_bandrank = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_bandunfold = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_byteswap = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cache = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // format
  ],
  result: int,
} as const;

export const vips_cast_char = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_complex = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_double = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_dpcomplex = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_float = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_int = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_short = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_uchar = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_uint = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cast_ushort = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_composite = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
    buf(int), // mode
  ],
  result: int,
} as const;

export const vips_composite2 = {
  parameters: [
    buf(int), // base
    buf(int), // overlay
    buf(buf(int)), // out
    VipsBlendModeT, // mode1
  ],
  result: int,
} as const;

export const vips_copy = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_copy_file = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_crop = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_embed = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // x
    int, // y
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_extract_area = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_extract_band = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // band
  ],
  result: int,
} as const;

export const vips_falsecolour = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_flatten = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_flip = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsDirectionT, // direction
  ],
  result: int,
} as const;

export const vips_gamma = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_gravity = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsCompassDirectionT, // direction
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_grid = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // tile_height
    int, // across
    int, // down
  ],
  result: int,
} as const;

export const vips_ifthenelse = {
  parameters: [
    buf(int), // cond
    buf(int), // in1
    buf(int), // in2
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_insert = {
  parameters: [
    buf(int), // main
    buf(int), // sub
    buf(buf(int)), // out
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_join = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(buf(int)), // out
    VipsDirectionT, // direction
  ],
  result: int,
} as const;

export const vips_linecache = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_msb = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_premultiply = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_recomb = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(int), // m
  ],
  result: int,
} as const;

export const vips_replicate = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // across
    int, // down
  ],
  result: int,
} as const;

export const vips_rot = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsAngleT, // angle
  ],
  result: int,
} as const;

export const vips_rot180 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rot270 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rot45 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rot90 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_scale = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sequential = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_smartcrop = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const vips_subsample = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // xfac
    int, // yfac
  ],
  result: int,
} as const;

export const vips_switch = {
  parameters: [
    buf(buf(int)), // tests
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_tilecache = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_transpose3d = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_unpremultiply = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_wrap = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_zoom = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // xfac
    int, // yfac
  ],
  result: int,
} as const;
