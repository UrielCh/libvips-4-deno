// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_CMC2LCh = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_CMYK2XYZ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_col_ab2Ch = {
  parameters: [
    "f32", // a as float
    "f32", // b as float
    "buffer", // C as float *
    "buffer", // h as float *
  ],
  result: "void", // void
} as const;

export const vips_col_ab2h = {
  parameters: [
    "f64", // a as double
    "f64", // b as double
  ],
  result: "f64", // double
} as const;

export const vips_col_C2Ccmc = {
  parameters: [
    "f32", // C as float
  ],
  result: "f32", // float
} as const;

export const vips_col_Ccmc2C = {
  parameters: [
    "f32", // Ccmc as float
  ],
  result: "f32", // float
} as const;

export const vips_col_Ch2ab = {
  parameters: [
    "f32", // C as float
    "f32", // h as float
    "buffer", // a as float *
    "buffer", // b as float *
  ],
  result: "void", // void
} as const;

export const vips_col_Ch2hcmc = {
  parameters: [
    "f32", // C as float
    "f32", // h as float
  ],
  result: "f32", // float
} as const;

export const vips_col_Chcmc2h = {
  parameters: [
    "f32", // C as float
    "f32", // hcmc as float
  ],
  result: "f32", // float
} as const;

export const vips_col_dE00 = {
  parameters: [
    "f32", // L1 as float
    "f32", // a1 as float
    "f32", // b1 as float
    "f32", // L2 as float
    "f32", // a2 as float
    "f32", // b2 as float
  ],
  result: "f32", // float
} as const;

export const vips_col_L2Lcmc = {
  parameters: [
    "f32", // L as float
  ],
  result: "f32", // float
} as const;

export const vips_col_Lab2XYZ = {
  parameters: [
    "f32", // L as float
    "f32", // a as float
    "f32", // b as float
    "buffer", // X as float *
    "buffer", // Y as float *
    "buffer", // Z as float *
  ],
  result: "void", // void
} as const;

export const vips_col_Lcmc2L = {
  parameters: [
    "f32", // Lcmc as float
  ],
  result: "f32", // float
} as const;

export const vips_col_make_tables_CMC = {
  parameters: [],
  result: "void", // void
} as const;

export const vips_col_scRGB2BW_16 = {
  parameters: [
    "f32", // R as float
    "f32", // G as float
    "f32", // B as float
    "buffer", // g as int *
    "buffer", // og as int *
  ],
  result: "i32", // int
} as const;

export const vips_col_scRGB2BW_8 = {
  parameters: [
    "f32", // R as float
    "f32", // G as float
    "f32", // B as float
    "buffer", // g as int *
    "buffer", // og as int *
  ],
  result: "i32", // int
} as const;

export const vips_col_scRGB2sRGB_16 = {
  parameters: [
    "f32", // R as float
    "f32", // G as float
    "f32", // B as float
    "buffer", // r as int *
    "buffer", // g as int *
    "buffer", // b as int *
    "buffer", // og as int *
  ],
  result: "i32", // int
} as const;

export const vips_col_scRGB2sRGB_8 = {
  parameters: [
    "f32", // R as float
    "f32", // G as float
    "f32", // B as float
    "buffer", // r as int *
    "buffer", // g as int *
    "buffer", // b as int *
    "buffer", // og as int *
  ],
  result: "i32", // int
} as const;

export const vips_col_scRGB2XYZ = {
  parameters: [
    "f32", // R as float
    "f32", // G as float
    "f32", // B as float
    "buffer", // X as float *
    "buffer", // Y as float *
    "buffer", // Z as float *
  ],
  result: "i32", // int
} as const;

export const vips_col_sRGB2scRGB_16 = {
  parameters: [
    "i32", // r as int
    "i32", // g as int
    "i32", // b as int
    "buffer", // R as float *
    "buffer", // G as float *
    "buffer", // B as float *
  ],
  result: "i32", // int
} as const;

export const vips_col_sRGB2scRGB_8 = {
  parameters: [
    "i32", // r as int
    "i32", // g as int
    "i32", // b as int
    "buffer", // R as float *
    "buffer", // G as float *
    "buffer", // B as float *
  ],
  result: "i32", // int
} as const;

export const vips_col_XYZ2Lab = {
  parameters: [
    "f32", // X as float
    "f32", // Y as float
    "f32", // Z as float
    "buffer", // L as float *
    "buffer", // a as float *
    "buffer", // b as float *
  ],
  result: "void", // void
} as const;

export const vips_col_XYZ2scRGB = {
  parameters: [
    "f32", // X as float
    "f32", // Y as float
    "f32", // Z as float
    "buffer", // R as float *
    "buffer", // G as float *
    "buffer", // B as float *
  ],
  result: "i32", // int
} as const;

export const vips_colourspace = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "u32", // space as VipsInterpretation
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_colourspace_issupported = {
  parameters: [
    "pointer", // image as const VipsImage *
  ],
  result: "bool", // gboolean
} as const;

export const vips_dE00 = {
  parameters: [
    "pointer", // left as VipsImage *
    "pointer", // right as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_dE76 = {
  parameters: [
    "pointer", // left as VipsImage *
    "pointer", // right as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_dECMC = {
  parameters: [
    "pointer", // left as VipsImage *
    "pointer", // right as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_float2rad = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_HSV2sRGB = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_icc_ac2rc = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "buffer", // profile_filename as const char *
  ],
  result: "i32", // int
} as const;

export const vips_icc_export = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_icc_import = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_icc_is_compatible_profile = {
  parameters: [
    "pointer", // image as VipsImage *
    "buffer", // data as const void *
    "usize", // data_length as size_t
  ],
  result: "bool", // gboolean
} as const;

export const vips_icc_present = {
  parameters: [],
  result: "i32", // int
} as const;

export const vips_icc_transform = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "buffer", // output_profile as const char *
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_Lab2LabQ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_Lab2LabS = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_Lab2LCh = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_Lab2XYZ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LabQ2Lab = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LabQ2LabS = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LabQ2sRGB = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LabS2Lab = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LabS2LabQ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LCh2CMC = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_LCh2Lab = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_profile_load = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // profile as VipsBlob **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_pythagoras = {
  parameters: [
    "f32", // L1 as float
    "f32", // a1 as float
    "f32", // b1 as float
    "f32", // L2 as float
    "f32", // a2 as float
    "f32", // b2 as float
  ],
  result: "f32", // float
} as const;

export const vips_rad2float = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_scRGB2BW = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_scRGB2sRGB = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_scRGB2XYZ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_sRGB2HSV = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_sRGB2scRGB = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_XYZ2CMYK = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_XYZ2Lab = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_XYZ2scRGB = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_XYZ2Yxy = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_Yxy2XYZ = {
  parameters: [
    "pointer", // in as VipsImage *
    "pointer", // out as VipsImage **
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;
