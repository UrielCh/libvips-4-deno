import {
  buf,
  cstringT,
  double,
  DOUBLEMASKT,
  int,
  INTMASKT,
  ptr,
} from "./typeDefinitions.ts";

export const im_create_dmask = {
  parameters: [
    cstringT, // filename
    int, // xsize
    int, // ysize
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_create_dmaskv = {
  parameters: [
    cstringT, // filename
    int, // xsize
    int, // ysize
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_create_imask = {
  parameters: [
    cstringT, // filename
    int, // xsize
    int, // ysize
  ],
  result: ptr(INTMASKT),
} as const;

export const im_create_imaskv = {
  parameters: [
    cstringT, // filename
    int, // xsize
    int, // ysize
  ],
  result: ptr(INTMASKT),
} as const;

export const im_dmask2imask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_dup_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_dup_imask = {
  parameters: [
    ptr(INTMASKT), // in
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_free_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
  ],
  result: int,
} as const;

export const im_free_imask = {
  parameters: [
    ptr(INTMASKT), // in
  ],
  result: int,
} as const;

export const im_gauss_dmask = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_gauss_dmask_sep = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_gauss_imask = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(INTMASKT),
} as const;

export const im_gauss_imask_sep = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(INTMASKT),
} as const;

export const im_imask2dmask = {
  parameters: [
    ptr(INTMASKT), // in
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_local_dmask = {
  parameters: [
    ptr("void"), // out
    ptr(DOUBLEMASKT), // mask
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_local_imask = {
  parameters: [
    ptr("void"), // out
    ptr(INTMASKT), // mask
  ],
  result: ptr(INTMASKT),
} as const;

export const im_log_dmask = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_log_imask = {
  parameters: [
    cstringT, // filename
    double, // sigma
    double, // min_ampl
  ],
  result: ptr(INTMASKT),
} as const;

export const im_lu_decomp = {
  parameters: [
    ptr(DOUBLEMASKT), // mat
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_lu_solve = {
  parameters: [
    ptr(DOUBLEMASKT), // lu
    buf(double), // vec
  ],
  result: int,
} as const;

export const im_matcat = {
  parameters: [
    ptr(DOUBLEMASKT), // top
    ptr(DOUBLEMASKT), // bottom
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_matinv = {
  parameters: [
    ptr(DOUBLEMASKT), // mat
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_matinv_inplace = {
  parameters: [
    ptr(DOUBLEMASKT), // mat
  ],
  result: int,
} as const;

export const im_matmul = {
  parameters: [
    ptr(DOUBLEMASKT), // in1
    ptr(DOUBLEMASKT), // in2
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_mattrn = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_norm_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // mask
  ],
  result: "void",
} as const;

export const im_print_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
  ],
  result: "void",
} as const;

export const im_print_imask = {
  parameters: [
    ptr(INTMASKT), // in
  ],
  result: "void",
} as const;

export const im_read_dmask = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_read_imask = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_rotate_dmask45 = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_rotate_dmask90 = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(DOUBLEMASKT),
} as const;

export const im_rotate_imask45 = {
  parameters: [
    ptr(INTMASKT), // in
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_rotate_imask90 = {
  parameters: [
    ptr(INTMASKT), // in
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_scale_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: ptr(INTMASKT),
} as const;

export const im_write_dmask = {
  parameters: [
    ptr(DOUBLEMASKT), // in
  ],
  result: int,
} as const;

export const im_write_dmask_name = {
  parameters: [
    ptr(DOUBLEMASKT), // in
    cstringT, // filename
  ],
  result: int,
} as const;

export const im_write_imask = {
  parameters: [
    ptr(INTMASKT), // in
  ],
  result: int,
} as const;

export const im_write_imask_name = {
  parameters: [
    ptr(INTMASKT), // in
    cstringT, // filename
  ],
  result: int,
} as const;
