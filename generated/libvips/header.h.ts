import {
  buf,
  cstringArrayT,
  cstringT,
  double,
  int,
  ptr,
  VipsImageMapFnT,
} from "./typeDefinitions.ts";

export const vips_format_sizeof = {
  parameters: [
    int, // format
  ],
  result: int,
} as const;

export const vips_format_sizeof_unsafe = {
  parameters: [
    int, // format
  ],
  result: int,
} as const;

export const vips_image_get = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // value_copy
  ],
  result: int,
} as const;

export const vips_image_get_area = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(ptr("void")), // data
  ],
  result: int,
} as const;

export const vips_image_get_array_double = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(buf(double)), // out
    buf(int), // n
  ],
  result: int,
} as const;

export const vips_image_get_array_int = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(buf(int)), // out
    buf(int), // n
  ],
  result: int,
} as const;

export const vips_image_get_as_string = {
  parameters: [
    buf(int), // image
    cstringT, // name
    cstringArrayT, // out
  ],
  result: int,
} as const;

export const vips_image_get_bands = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_blob = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(ptr("void")), // data
    buf(int), // length
  ],
  result: int,
} as const;

export const vips_image_get_coding = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_data = {
  parameters: [
    buf(int), // image
  ],
  result: ptr("void"),
} as const;

export const vips_image_get_double = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(double), // out
  ],
  result: int,
} as const;

export const vips_image_get_fields = {
  parameters: [
    buf(int), // image
  ],
  result: buf(buf(int)),
} as const;

export const vips_image_get_filename = {
  parameters: [
    buf(int), // image
  ],
  result: cstringT,
} as const;

export const vips_image_get_format = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_format_max = {
  parameters: [
    int, // format
  ],
  result: double,
} as const;

export const vips_image_get_height = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_image = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_image_get_int = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // out
  ],
  result: int,
} as const;

export const vips_image_get_interpretation = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_mode = {
  parameters: [
    buf(int), // image
  ],
  result: cstringT,
} as const;

export const vips_image_get_n_pages = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_n_subifds = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_offset = {
  parameters: [
    buf(int), // image
  ],
  result: double,
} as const;

export const vips_image_get_orientation = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_orientation_swap = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_page_height = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_scale = {
  parameters: [
    buf(int), // image
  ],
  result: double,
} as const;

export const vips_image_get_string = {
  parameters: [
    buf(int), // image
    cstringT, // name
    cstringArrayT, // out
  ],
  result: int,
} as const;

export const vips_image_get_typeof = {
  parameters: [
    buf(int), // image
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_image_get_width = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_xoffset = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_xres = {
  parameters: [
    buf(int), // image
  ],
  result: double,
} as const;

export const vips_image_get_yoffset = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_get_yres = {
  parameters: [
    buf(int), // image
  ],
  result: double,
} as const;

export const vips_image_guess_format = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_guess_interpretation = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_history_printf = {
  parameters: [
    buf(int), // image
    cstringT, // format
  ],
  result: int,
} as const;

export const vips_image_init_fields = {
  parameters: [
    buf(int), // image
    int, // xsize
    int, // ysize
    int, // bands
    int, // format
    int, // coding
    int, // interpretation
    double, // xres
    double, // yres
  ],
  result: "void",
} as const;

export const vips_image_map = {
  parameters: [
    buf(int), // image
    VipsImageMapFnT, // fn
    ptr("void"), // a
  ],
  result: ptr("void"),
} as const;

export const vips_image_print_field = {
  parameters: [
    buf(int), // image
    cstringT, // field
  ],
  result: "void",
} as const;

export const vips_image_remove = {
  parameters: [
    buf(int), // image
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_image_set = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // value
  ],
  result: "void",
} as const;

export const vips_image_set_area = {
  parameters: [
    buf(int), // image
    cstringT, // name
    int, // free_fn
    ptr("void"), // data
  ],
  result: "void",
} as const;

export const vips_image_set_array_double = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(double), // array
    int, // n
  ],
  result: "void",
} as const;

export const vips_image_set_array_int = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // array
    int, // n
  ],
  result: "void",
} as const;

export const vips_image_set_blob = {
  parameters: [
    buf(int), // image
    cstringT, // name
    int, // free_fn
    ptr("void"), // data
    int, // length
  ],
  result: "void",
} as const;

export const vips_image_set_blob_copy = {
  parameters: [
    buf(int), // image
    cstringT, // name
    ptr("void"), // data
    int, // length
  ],
  result: "void",
} as const;

export const vips_image_set_double = {
  parameters: [
    buf(int), // image
    cstringT, // name
    double, // d
  ],
  result: "void",
} as const;

export const vips_image_set_image = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // im
  ],
  result: "void",
} as const;

export const vips_image_set_int = {
  parameters: [
    buf(int), // image
    cstringT, // name
    int, // i
  ],
  result: "void",
} as const;

export const vips_image_set_string = {
  parameters: [
    buf(int), // image
    cstringT, // name
    cstringT, // str
  ],
  result: "void",
} as const;
