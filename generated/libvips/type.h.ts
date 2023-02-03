import {
  buf,
  cstringT,
  double,
  int,
  ptr,
  VipsAreaT,
  VipsArrayDoubleT,
  VipsArrayIntT,
  VipsBlobT,
  VipsRefStringT,
  VipsThingT,
} from "./typeDefinitions.ts";

export const vips_thing_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_thing_new = {
  parameters: [
    int, // i
  ],
  result: ptr(VipsThingT),
} as const;

export const vips_area_copy = {
  parameters: [
    ptr(VipsAreaT), // area
  ],
  result: ptr(VipsAreaT),
} as const;

export const vips_area_free_cb = {
  parameters: [
    ptr("void"), // mem
    ptr(VipsAreaT), // area
  ],
  result: int,
} as const;

export const vips_area_unref = {
  parameters: [
    ptr(VipsAreaT), // area
  ],
  result: "void",
} as const;

export const vips_area_new = {
  parameters: [
    int, // free_fn
    ptr("void"), // data
  ],
  result: ptr(VipsAreaT),
} as const;

export const vips_area_new_array = {
  parameters: [
    int, // type
    int, // sizeof_type
    int, // n
  ],
  result: ptr(VipsAreaT),
} as const;

export const vips_area_new_array_object = {
  parameters: [
    int, // n
  ],
  result: ptr(VipsAreaT),
} as const;

export const vips_area_get_data = {
  parameters: [
    ptr(VipsAreaT), // area
    buf(int), // length
    buf(int), // n
    buf(int), // type
    buf(int), // sizeof_type
  ],
  result: ptr("void"),
} as const;

export const vips_area_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_save_string_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_ref_string_new = {
  parameters: [
    cstringT, // str
  ],
  result: ptr(VipsRefStringT),
} as const;

export const vips_ref_string_get = {
  parameters: [
    ptr(VipsRefStringT), // refstr
    buf(int), // length
  ],
  result: cstringT,
} as const;

export const vips_ref_string_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_blob_new = {
  parameters: [
    int, // free_fn
    ptr("void"), // data
    int, // length
  ],
  result: ptr(VipsBlobT),
} as const;

export const vips_blob_copy = {
  parameters: [
    ptr("void"), // data
    int, // length
  ],
  result: ptr(VipsBlobT),
} as const;

export const vips_blob_get = {
  parameters: [
    ptr(VipsBlobT), // blob
    buf(int), // length
  ],
  result: ptr("void"),
} as const;

export const vips_blob_set = {
  parameters: [
    ptr(VipsBlobT), // blob
    int, // free_fn
    ptr("void"), // data
    int, // length
  ],
  result: "void",
} as const;

export const vips_blob_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_array_double_new = {
  parameters: [
    buf(double), // array
    int, // n
  ],
  result: ptr(VipsArrayDoubleT),
} as const;

export const vips_array_double_newv = {
  parameters: [
    int, // n
  ],
  result: ptr(VipsArrayDoubleT),
} as const;

export const vips_array_double_get = {
  parameters: [
    ptr(VipsArrayDoubleT), // array
    buf(int), // n
  ],
  result: buf(double),
} as const;

export const vips_array_double_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_array_int_new = {
  parameters: [
    buf(int), // array
    int, // n
  ],
  result: ptr(VipsArrayIntT),
} as const;

export const vips_array_int_newv = {
  parameters: [
    int, // n
  ],
  result: ptr(VipsArrayIntT),
} as const;

export const vips_array_int_get = {
  parameters: [
    ptr(VipsArrayIntT), // array
    buf(int), // n
  ],
  result: buf(int),
} as const;

export const vips_array_int_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_array_image_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_value_set_area = {
  parameters: [
    buf(int), // value
    int, // free_fn
    ptr("void"), // data
  ],
  result: "void",
} as const;

export const vips_value_get_area = {
  parameters: [
    buf(int), // value
    buf(int), // length
  ],
  result: ptr("void"),
} as const;

export const vips_value_get_save_string = {
  parameters: [
    buf(int), // value
  ],
  result: cstringT,
} as const;

export const vips_value_set_save_string = {
  parameters: [
    buf(int), // value
    cstringT, // str
  ],
  result: "void",
} as const;

export const vips_value_set_save_stringf = {
  parameters: [
    buf(int), // value
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_value_get_ref_string = {
  parameters: [
    buf(int), // value
    buf(int), // length
  ],
  result: cstringT,
} as const;

export const vips_value_set_ref_string = {
  parameters: [
    buf(int), // value
    cstringT, // str
  ],
  result: "void",
} as const;

export const vips_value_get_blob = {
  parameters: [
    buf(int), // value
    buf(int), // length
  ],
  result: ptr("void"),
} as const;

export const vips_value_set_blob = {
  parameters: [
    buf(int), // value
    int, // free_fn
    ptr("void"), // data
    int, // length
  ],
  result: "void",
} as const;

export const vips_value_set_blob_free = {
  parameters: [
    buf(int), // value
    ptr("void"), // data
    int, // length
  ],
  result: "void",
} as const;

export const vips_value_set_array = {
  parameters: [
    buf(int), // value
    int, // n
    int, // type
    int, // sizeof_type
  ],
  result: "void",
} as const;

export const vips_value_get_array = {
  parameters: [
    buf(int), // value
    buf(int), // n
    buf(int), // type
    buf(int), // sizeof_type
  ],
  result: ptr("void"),
} as const;

export const vips_value_get_array_double = {
  parameters: [
    buf(int), // value
    buf(int), // n
  ],
  result: buf(double),
} as const;

export const vips_value_set_array_double = {
  parameters: [
    buf(int), // value
    buf(double), // array
    int, // n
  ],
  result: "void",
} as const;

export const vips_value_get_array_int = {
  parameters: [
    buf(int), // value
    buf(int), // n
  ],
  result: buf(int),
} as const;

export const vips_value_set_array_int = {
  parameters: [
    buf(int), // value
    buf(int), // array
    int, // n
  ],
  result: "void",
} as const;

export const vips_value_get_array_object = {
  parameters: [
    buf(int), // value
    buf(int), // n
  ],
  result: buf(buf(int)),
} as const;

export const vips_value_set_array_object = {
  parameters: [
    buf(int), // value
    int, // n
  ],
  result: "void",
} as const;
