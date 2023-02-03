import {
  buf,
  cstringT,
  double,
  int,
  ptr,
  VipsExecutorT,
  VipsVectorT,
} from "./typeDefinitions.ts";

export const vips_vector_init = {
  parameters: [],
  result: "void",
} as const;

export const vips_vector_isenabled = {
  parameters: [],
  result: int,
} as const;

export const vips_vector_set_enabled = {
  parameters: [
    int, // enabled
  ],
  result: "void",
} as const;

export const vips_vector_free = {
  parameters: [
    ptr(VipsVectorT), // vector
  ],
  result: "void",
} as const;

export const vips_vector_new = {
  parameters: [
    cstringT, // name
    int, // dsize
  ],
  result: ptr(VipsVectorT),
} as const;

export const vips_vector_constant = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // value
    int, // size
  ],
  result: "void",
} as const;

export const vips_vector_source_scanline = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // line
    int, // size
  ],
  result: "void",
} as const;

export const vips_vector_source_name = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // size
  ],
  result: int,
} as const;

export const vips_vector_temporary = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // size
  ],
  result: "void",
} as const;

export const vips_vector_parameter = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // size
  ],
  result: int,
} as const;

export const vips_vector_destination = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // name
    int, // size
  ],
  result: int,
} as const;

export const vips_vector_asm2 = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // op
    cstringT, // a
    cstringT, // b
  ],
  result: "void",
} as const;

export const vips_vector_asm3 = {
  parameters: [
    ptr(VipsVectorT), // vector
    cstringT, // op
    cstringT, // a
    cstringT, // b
    cstringT, // c
  ],
  result: "void",
} as const;

export const vips_vector_full = {
  parameters: [
    ptr(VipsVectorT), // vector
  ],
  result: int,
} as const;

export const vips_vector_compile = {
  parameters: [
    ptr(VipsVectorT), // vector
  ],
  result: int,
} as const;

export const vips_vector_print = {
  parameters: [
    ptr(VipsVectorT), // vector
  ],
  result: "void",
} as const;

export const vips_executor_set_program = {
  parameters: [
    buf(VipsExecutorT), // executor
    ptr(VipsVectorT), // vector
    int, // n
  ],
  result: "void",
} as const;

export const vips_executor_set_scanline = {
  parameters: [
    buf(VipsExecutorT), // executor
    buf(int), // ir
    int, // x
    int, // y
  ],
  result: "void",
} as const;

export const vips_executor_set_destination = {
  parameters: [
    buf(VipsExecutorT), // executor
    ptr("void"), // value
  ],
  result: "void",
} as const;

export const vips_executor_set_parameter = {
  parameters: [
    buf(VipsExecutorT), // executor
    int, // var
    int, // value
  ],
  result: "void",
} as const;

export const vips_executor_set_array = {
  parameters: [
    buf(VipsExecutorT), // executor
    int, // var
    ptr("void"), // value
  ],
  result: "void",
} as const;

export const vips_executor_run = {
  parameters: [
    buf(VipsExecutorT), // executor
  ],
  result: "void",
} as const;

export const vips_vector_to_fixed_point = {
  parameters: [
    buf(double), // in
    buf(int), // out
    int, // n
    int, // scale
  ],
  result: "void",
} as const;
