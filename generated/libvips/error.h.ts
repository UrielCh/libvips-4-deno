import {
  buf,
  cstringT,
  int,
} from "./typeDefinitions.ts";

export const vips_check_8or16 = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_bandno = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // bandno
  ],
  result: int,
} as const;

export const vips_check_bands = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // bands
  ],
  result: int,
} as const;

export const vips_check_bands_1or3 = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_bands_1orn = {
  parameters: [
    cstringT, // domain
    buf(int), // im1
    buf(int), // im2
  ],
  result: int,
} as const;

export const vips_check_bands_1orn_unary = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // n
  ],
  result: int,
} as const;

export const vips_check_bands_atleast = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // bands
  ],
  result: int,
} as const;

export const vips_check_bands_same = {
  parameters: [
    cstringT, // domain
    buf(int), // im1
    buf(int), // im2
  ],
  result: int,
} as const;

export const vips_check_coding = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // coding
  ],
  result: int,
} as const;

export const vips_check_coding_known = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_coding_noneorlabq = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_coding_same = {
  parameters: [
    cstringT, // domain
    buf(int), // im1
    buf(int), // im2
  ],
  result: int,
} as const;

export const vips_check_complex = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_format = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // fmt
  ],
  result: int,
} as const;

export const vips_check_format_same = {
  parameters: [
    cstringT, // domain
    buf(int), // im1
    buf(int), // im2
  ],
  result: int,
} as const;

export const vips_check_hist = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_int = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_matrix = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_check_mono = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_noncomplex = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_oddsquare = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_precision_intfloat = {
  parameters: [
    cstringT, // domain
    int, // precision
  ],
  result: int,
} as const;

export const vips_check_separable = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_size_same = {
  parameters: [
    cstringT, // domain
    buf(int), // im1
    buf(int), // im2
  ],
  result: int,
} as const;

export const vips_check_twocomponents = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_u8or16 = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_u8or16orf = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_uint = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_uintorf = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_uncoded = {
  parameters: [
    cstringT, // domain
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_vector = {
  parameters: [
    cstringT, // domain
    int, // n
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_check_vector_length = {
  parameters: [
    cstringT, // domain
    int, // n
    int, // len
  ],
  result: int,
} as const;

export const vips_error = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_error_buffer = {
  parameters: [],
  result: cstringT,
} as const;

export const vips_error_buffer_copy = {
  parameters: [],
  result: cstringT,
} as const;

export const vips_error_clear = {
  parameters: [],
  result: "void",
} as const;

export const vips_error_exit = {
  parameters: [
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_error_freeze = {
  parameters: [],
  result: "void",
} as const;

export const vips_error_g = {
  parameters: [
    buf(buf(int)), // error
  ],
  result: "void",
} as const;

export const vips_error_system = {
  parameters: [
    int, // err
    cstringT, // domain
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_error_thaw = {
  parameters: [],
  result: "void",
} as const;

export const vips_g_error = {
  parameters: [
    buf(buf(int)), // error
  ],
  result: "void",
} as const;

export const vips_verror = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
    int, // ap
  ],
  result: "void",
} as const;

export const vips_verror_system = {
  parameters: [
    int, // err
    cstringT, // domain
    cstringT, // fmt
    int, // ap
  ],
  result: "void",
} as const;
