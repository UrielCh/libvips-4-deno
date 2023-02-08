import {
  buf,
  cstringT,
  int,
  ptr,
  VipsBufferT,
  VipsRegionFillFnT,
  VipsWindowT,
} from "./typeDefinitions.ts";

export const vips__argument_get_instance = {
  parameters: [
    buf(int), // argument_class
    buf(int), // object
  ],
  result: buf(int),
} as const;

export const vips__argument_table_lookup = {
  parameters: [
    buf(int), // table
    buf(int), // pspec
  ],
  result: buf(int),
} as const;

export const vips__demand_hint_array = {
  parameters: [
    ptr("void"), // image
    int, // hint
    buf(ptr("void")), // in
  ],
  result: "void",
} as const;

export const vips__get_sizeof_vipsobject = {
  parameters: [],
  result: int,
} as const;

export const vips__image_copy_fields_array = {
  parameters: [
    ptr("void"), // out
    buf(ptr("void")), // in
  ],
  result: int,
} as const;

// Symbol vips__image_pio_output not exported by lib libvips.so
export const vips__image_wio_output = {
  parameters: [
    ptr("void"), // image
  ],
  result: int,
} as const;

export const vips__init = {
  parameters: [
    cstringT, // argv0
  ],
  result: int,
} as const;

export const vips__meta_init = {
  parameters: [],
  result: "void",
} as const;

export const vips__region_check_ownership = {
  parameters: [
    ptr("void"), // reg
  ],
  result: "void",
} as const;

// Symbol vips__region_count_pixels not exported by lib libvips.so
export const vips__region_no_ownership = {
  parameters: [
    ptr("void"), // reg
  ],
  result: "void",
} as const;

export const vips__region_take_ownership = {
  parameters: [
    ptr("void"), // reg
  ],
  result: "void",
} as const;

export const vips__render_shutdown = {
  parameters: [],
  result: "void",
} as const;

export const vips__view_image = {
  parameters: [
    ptr("void"), // image
  ],
  result: int,
} as const;

export const vips_buffer_done = {
  parameters: [
    ptr(VipsBufferT), // buffer
  ],
  result: "void",
} as const;

export const vips_buffer_dump_all = {
  parameters: [],
  result: "void",
} as const;

export const vips_buffer_new = {
  parameters: [
    ptr("void"), // im
    buf(int), // area
  ],
  result: ptr(VipsBufferT),
} as const;

export const vips_buffer_print = {
  parameters: [
    ptr(VipsBufferT), // buffer
  ],
  result: "void",
} as const;

export const vips_buffer_ref = {
  parameters: [
    ptr("void"), // im
    buf(int), // area
  ],
  result: ptr(VipsBufferT),
} as const;

export const vips_buffer_undone = {
  parameters: [
    ptr(VipsBufferT), // buffer
  ],
  result: "void",
} as const;

export const vips_buffer_unref = {
  parameters: [
    ptr(VipsBufferT), // buffer
  ],
  result: "void",
} as const;

export const vips_buffer_unref_ref = {
  parameters: [
    ptr(VipsBufferT), // buffer
    ptr("void"), // im
    buf(int), // area
  ],
  result: ptr(VipsBufferT),
} as const;

// Symbol vips_region_dump_all not exported by lib libvips.so
export const vips_region_fill = {
  parameters: [
    ptr("void"), // reg
    buf(int), // r
    VipsRegionFillFnT, // fn
    ptr("void"), // a
  ],
  result: int,
} as const;

export const vips_region_prepare_many = {
  parameters: [
    buf(ptr("void")), // reg
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_window_print = {
  parameters: [
    buf(VipsWindowT), // window
  ],
  result: "void",
} as const;

export const vips_window_unref = {
  parameters: [
    buf(VipsWindowT), // window
  ],
  result: int,
} as const;
