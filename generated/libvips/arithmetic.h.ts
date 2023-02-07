import {
  buf,
  double,
  int,
  VipsOperationBooleanT,
  VipsOperationComplex2T,
  VipsOperationComplexgetT,
  VipsOperationComplexT,
  VipsOperationMath2T,
  VipsOperationMathT,
  VipsOperationRelationalT,
  VipsOperationRoundT,
} from "./typeDefinitions.ts";

export const vips_abs = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_acos = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_acosh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_add = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_andimage = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_andimage_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_andimage_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_asin = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_asinh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_atan = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_atan2 = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_atan2_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_atan2_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_atanh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_avg = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_boolean = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
    VipsOperationBooleanT, // boolean
  ],
  result: int,
} as const;

export const vips_boolean_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationBooleanT, // boolean
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_boolean_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationBooleanT, // boolean
    double, // c
  ],
  result: int,
} as const;

export const vips_ceil = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_complex = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationComplexT, // cmplx
  ],
  result: int,
} as const;

export const vips_complex2 = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
    VipsOperationComplex2T, // cmplx
  ],
  result: int,
} as const;

export const vips_complexform = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_complexget = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationComplexgetT, // get
  ],
  result: int,
} as const;

export const vips_conj = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cos = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cosh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_cross_phase = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_deviate = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_divide = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_eorimage = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_eorimage_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_eorimage_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_equal = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_equal_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_equal_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_exp = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_exp10 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_find_trim = {
  parameters: [
    buf(int), // in
    buf(int), // left
    buf(int), // top
    buf(int), // width
    buf(int), // height
  ],
  result: int,
} as const;

export const vips_floor = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_getpoint = {
  parameters: [
    buf(int), // in
    buf(buf(double)), // vector
    buf(int), // n
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const vips_hist_find = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_find_indexed = {
  parameters: [
    buf(int), // in
    buf(int), // index
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hist_find_ndim = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hough_circle = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_hough_line = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_imag = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_invert = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_less = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_less_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_less_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_lesseq = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_lesseq_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_lesseq_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_linear = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // a
    buf(double), // b
    int, // n
  ],
  result: int,
} as const;

export const vips_linear1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // a
    double, // b
  ],
  result: int,
} as const;

export const vips_log = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_log10 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_lshift = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_lshift_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_lshift_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_math = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationMathT, // math
  ],
  result: int,
} as const;

export const vips_math2 = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
    VipsOperationMath2T, // math2
  ],
  result: int,
} as const;

export const vips_math2_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationMath2T, // math2
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_math2_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationMath2T, // math2
    double, // c
  ],
  result: int,
} as const;

export const vips_max = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_measure = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // h
    int, // v
  ],
  result: int,
} as const;

export const vips_min = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_more = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_more_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_more_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_moreeq = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_moreeq_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_moreeq_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_multiply = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_notequal = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_notequal_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_notequal_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_orimage = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_orimage_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_orimage_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_polar = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pow = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_pow_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_pow_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_profile = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // columns
    buf(buf(int)), // rows
  ],
  result: int,
} as const;

export const vips_project = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // columns
    buf(buf(int)), // rows
  ],
  result: int,
} as const;

export const vips_real = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rect = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_relational = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
    VipsOperationRelationalT, // relational
  ],
  result: int,
} as const;

export const vips_relational_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationRelationalT, // relational
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_relational_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationRelationalT, // relational
    double, // c
  ],
  result: int,
} as const;

export const vips_remainder = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_remainder_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_remainder_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_rint = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_round = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsOperationRoundT, // round
  ],
  result: int,
} as const;

export const vips_rshift = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_rshift_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_rshift_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;

export const vips_sign = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sin = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sinh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_stats = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_subtract = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sum = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const vips_tan = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_tanh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_wop = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_wop_const = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    buf(double), // c
    int, // n
  ],
  result: int,
} as const;

export const vips_wop_const1 = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    double, // c
  ],
  result: int,
} as const;
