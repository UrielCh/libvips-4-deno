import {
  buf,
  cstringT,
  double,
  float,
  int,
  ptr,
} from "./typeDefinitions.ts";

export const vips_CMC2LCh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

// Symbol vips_CMC2XYZ not exported by lib libvips.so
export const vips_CMYK2XYZ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_col_ab2Ch = {
  parameters: [
    float, // a
    float, // b
    buf(float), // C
    buf(float), // h
  ],
  result: "void",
} as const;

export const vips_col_ab2h = {
  parameters: [
    double, // a
    double, // b
  ],
  result: double,
} as const;

export const vips_col_C2Ccmc = {
  parameters: [
    float, // C
  ],
  result: float,
} as const;

export const vips_col_Ccmc2C = {
  parameters: [
    float, // Ccmc
  ],
  result: float,
} as const;

export const vips_col_Ch2ab = {
  parameters: [
    float, // C
    float, // h
    buf(float), // a
    buf(float), // b
  ],
  result: "void",
} as const;

export const vips_col_Ch2hcmc = {
  parameters: [
    float, // C
    float, // h
  ],
  result: float,
} as const;

export const vips_col_Chcmc2h = {
  parameters: [
    float, // C
    float, // hcmc
  ],
  result: float,
} as const;

export const vips_col_dE00 = {
  parameters: [
    float, // L1
    float, // a1
    float, // b1
    float, // L2
    float, // a2
    float, // b2
  ],
  result: float,
} as const;

export const vips_col_L2Lcmc = {
  parameters: [
    float, // L
  ],
  result: float,
} as const;

export const vips_col_Lab2XYZ = {
  parameters: [
    float, // L
    float, // a
    float, // b
    buf(float), // X
    buf(float), // Y
    buf(float), // Z
  ],
  result: "void",
} as const;

export const vips_col_Lcmc2L = {
  parameters: [
    float, // Lcmc
  ],
  result: float,
} as const;

export const vips_col_make_tables_CMC = {
  parameters: [],
  result: "void",
} as const;

export const vips_col_scRGB2BW_16 = {
  parameters: [
    float, // R
    float, // G
    float, // B
    buf(int), // g
    buf(int), // og
  ],
  result: int,
} as const;

export const vips_col_scRGB2BW_8 = {
  parameters: [
    float, // R
    float, // G
    float, // B
    buf(int), // g
    buf(int), // og
  ],
  result: int,
} as const;

export const vips_col_scRGB2sRGB_16 = {
  parameters: [
    float, // R
    float, // G
    float, // B
    buf(int), // r
    buf(int), // g
    buf(int), // b
    buf(int), // og
  ],
  result: int,
} as const;

export const vips_col_scRGB2sRGB_8 = {
  parameters: [
    float, // R
    float, // G
    float, // B
    buf(int), // r
    buf(int), // g
    buf(int), // b
    buf(int), // og
  ],
  result: int,
} as const;

export const vips_col_scRGB2XYZ = {
  parameters: [
    float, // R
    float, // G
    float, // B
    buf(float), // X
    buf(float), // Y
    buf(float), // Z
  ],
  result: int,
} as const;

export const vips_col_sRGB2scRGB_16 = {
  parameters: [
    int, // r
    int, // g
    int, // b
    buf(float), // R
    buf(float), // G
    buf(float), // B
  ],
  result: int,
} as const;

// Symbol vips_col_sRGB2scRGB_16_noclip not exported by lib libvips.so
export const vips_col_sRGB2scRGB_8 = {
  parameters: [
    int, // r
    int, // g
    int, // b
    buf(float), // R
    buf(float), // G
    buf(float), // B
  ],
  result: int,
} as const;

// Symbol vips_col_sRGB2scRGB_8_noclip not exported by lib libvips.so
export const vips_col_XYZ2Lab = {
  parameters: [
    float, // X
    float, // Y
    float, // Z
    buf(float), // L
    buf(float), // a
    buf(float), // b
  ],
  result: "void",
} as const;

export const vips_col_XYZ2scRGB = {
  parameters: [
    float, // X
    float, // Y
    float, // Z
    buf(float), // R
    buf(float), // G
    buf(float), // B
  ],
  result: int,
} as const;

export const vips_colourspace = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    int, // space
  ],
  result: int,
} as const;

export const vips_colourspace_issupported = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_dE00 = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_dE76 = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_dECMC = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_float2rad = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_HSV2sRGB = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_icc_ac2rc = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    cstringT, // profile_filename
  ],
  result: int,
} as const;

export const vips_icc_export = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_icc_import = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_icc_is_compatible_profile = {
  parameters: [
    buf(int), // image
    ptr("void"), // data
    int, // data_length
  ],
  result: int,
} as const;

export const vips_icc_present = {
  parameters: [],
  result: int,
} as const;

export const vips_icc_transform = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    cstringT, // output_profile
  ],
  result: int,
} as const;

export const vips_Lab2LabQ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_Lab2LabS = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_Lab2LCh = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_Lab2XYZ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LabQ2Lab = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LabQ2LabS = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LabQ2sRGB = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LabS2Lab = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LabS2LabQ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LCh2CMC = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_LCh2Lab = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_profile_load = {
  parameters: [
    cstringT, // name
    buf(buf(int)), // profile
  ],
  result: int,
} as const;

export const vips_pythagoras = {
  parameters: [
    float, // L1
    float, // a1
    float, // b1
    float, // L2
    float, // a2
    float, // b2
  ],
  result: float,
} as const;

export const vips_rad2float = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_scRGB2BW = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_scRGB2sRGB = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_scRGB2XYZ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sRGB2HSV = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_sRGB2scRGB = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_XYZ2CMYK = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_XYZ2Lab = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_XYZ2scRGB = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_XYZ2Yxy = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

// Symbol vips_Yxy2Lab not exported by lib libvips.so
export const vips_Yxy2XYZ = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;
