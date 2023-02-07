import {
  buf,
  cstringT,
  double,
  int,
  ptr,
  VipsAccessT,
  VipsBandFormatT,
  VipsCodingT,
} from "./typeDefinitions.ts";

export const vips_array_image_append = {
  parameters: [
    buf(int), // array
    buf(int), // image
  ],
  result: buf(int),
} as const;

export const vips_array_image_empty = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_array_image_get = {
  parameters: [
    buf(int), // array
    buf(int), // n
  ],
  result: buf(buf(int)),
} as const;

export const vips_array_image_new = {
  parameters: [
    buf(buf(int)), // array
    int, // n
  ],
  result: buf(int),
} as const;

export const vips_array_image_new_from_string = {
  parameters: [
    cstringT, // string
    VipsAccessT, // flags
  ],
  result: buf(int),
} as const;

export const vips_array_image_newv = {
  parameters: [
    int, // n
  ],
  result: buf(int),
} as const;

export const vips_band_format_is8bit = {
  parameters: [
    VipsBandFormatT, // format
  ],
  result: int,
} as const;

export const vips_band_format_iscomplex = {
  parameters: [
    VipsBandFormatT, // format
  ],
  result: int,
} as const;

export const vips_band_format_isfloat = {
  parameters: [
    VipsBandFormatT, // format
  ],
  result: int,
} as const;

export const vips_band_format_isint = {
  parameters: [
    VipsBandFormatT, // format
  ],
  result: int,
} as const;

export const vips_band_format_isuint = {
  parameters: [
    VipsBandFormatT, // format
  ],
  result: int,
} as const;

export const vips_filename_get_filename = {
  parameters: [
    cstringT, // vips_filename
  ],
  result: cstringT,
} as const;

export const vips_filename_get_options = {
  parameters: [
    cstringT, // vips_filename
  ],
  result: cstringT,
} as const;

export const vips_get_disc_threshold = {
  parameters: [],
  result: int,
} as const;

export const vips_image_copy_memory = {
  parameters: [
    buf(int), // image
  ],
  result: buf(int),
} as const;

export const vips_image_decode = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
  ],
  result: int,
} as const;

export const vips_image_decode_predict = {
  parameters: [
    buf(int), // in
    buf(int), // bands
    buf(VipsBandFormatT), // format
  ],
  result: int,
} as const;

export const vips_image_encode = {
  parameters: [
    buf(int), // in
    buf(buf(int)), // out
    VipsCodingT, // coding
  ],
  result: int,
} as const;

export const vips_image_free_buffer = {
  parameters: [
    buf(int), // image
    ptr("void"), // buffer
  ],
  result: "void",
} as const;

export const vips_image_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_image_hasalpha = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_inplace = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_invalidate_all = {
  parameters: [
    buf(int), // image
  ],
  result: "void",
} as const;

export const vips_image_is_sequential = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_isfile = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_iskilled = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_isMSBfirst = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_ispartial = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_matrix_from_array = {
  parameters: [
    int, // width
    int, // height
    buf(double), // array
    int, // size
  ],
  result: buf(int),
} as const;

export const vips_image_memory = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_image_minimise_all = {
  parameters: [
    buf(int), // image
  ],
  result: "void",
} as const;

export const vips_image_new = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_image_new_from_buffer = {
  parameters: [
    ptr("void"), // buf
    int, // len
    cstringT, // option_string
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_file = {
  parameters: [
    cstringT, // name
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_file_raw = {
  parameters: [
    cstringT, // filename
    int, // xsize
    int, // ysize
    int, // bands
    int, // offset
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_file_RW = {
  parameters: [
    cstringT, // filename
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_image = {
  parameters: [
    buf(int), // image
    buf(double), // c
    int, // n
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_image1 = {
  parameters: [
    buf(int), // image
    double, // c
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_memory = {
  parameters: [
    ptr("void"), // data
    int, // size
    int, // width
    int, // height
    int, // bands
    VipsBandFormatT, // format
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_memory_copy = {
  parameters: [
    ptr("void"), // data
    int, // size
    int, // width
    int, // height
    int, // bands
    VipsBandFormatT, // format
  ],
  result: buf(int),
} as const;

export const vips_image_new_from_source = {
  parameters: [
    buf(int), // source
    cstringT, // option_string
  ],
  result: buf(int),
} as const;

export const vips_image_new_matrix = {
  parameters: [
    int, // width
    int, // height
  ],
  result: buf(int),
} as const;

export const vips_image_new_matrix_from_array = {
  parameters: [
    int, // width
    int, // height
    buf(double), // array
    int, // size
  ],
  result: buf(int),
} as const;

export const vips_image_new_matrixv = {
  parameters: [
    int, // width
    int, // height
  ],
  result: buf(int),
} as const;

export const vips_image_new_memory = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_image_new_temp_file = {
  parameters: [
    cstringT, // format
  ],
  result: buf(int),
} as const;

export const vips_image_pio_input = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_pio_output = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_set_delete_on_close = {
  parameters: [
    buf(int), // image
    int, // delete_on_close
  ],
  result: "void",
} as const;

export const vips_image_set_kill = {
  parameters: [
    buf(int), // image
    int, // kill
  ],
  result: "void",
} as const;

export const vips_image_set_progress = {
  parameters: [
    buf(int), // image
    int, // progress
  ],
  result: "void",
} as const;

export const vips_image_wio_input = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_write = {
  parameters: [
    buf(int), // image
    buf(int), // out
  ],
  result: int,
} as const;

export const vips_image_write_line = {
  parameters: [
    buf(int), // image
    int, // ypos
    buf(int), // linebuffer
  ],
  result: int,
} as const;

export const vips_image_write_prepare = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_image_write_to_buffer = {
  parameters: [
    buf(int), // in
    cstringT, // suffix
    buf(ptr("void")), // buf
    buf(int), // size
  ],
  result: int,
} as const;

export const vips_image_write_to_file = {
  parameters: [
    buf(int), // image
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_image_write_to_memory = {
  parameters: [
    buf(int), // in
    buf(int), // size
  ],
  result: ptr("void"),
} as const;

export const vips_image_write_to_target = {
  parameters: [
    buf(int), // in
    cstringT, // suffix
    buf(int), // target
  ],
  result: int,
} as const;

export const vips_progress_set = {
  parameters: [
    int, // progress
  ],
  result: "void",
} as const;

export const vips_reorder_margin_hint = {
  parameters: [
    buf(int), // image
    int, // margin
  ],
  result: "void",
} as const;

export const vips_reorder_prepare_many = {
  parameters: [
    buf(int), // image
    buf(buf(int)), // regions
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_system = {
  parameters: [
    cstringT, // cmd_format
  ],
  result: int,
} as const;

export const vips_value_get_array_image = {
  parameters: [
    buf(int), // value
    buf(int), // n
  ],
  result: buf(buf(int)),
} as const;

export const vips_value_set_array_image = {
  parameters: [
    buf(int), // value
    int, // n
  ],
  result: "void",
} as const;
