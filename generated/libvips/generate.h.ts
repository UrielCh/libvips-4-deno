import {
  buf,
  int,
  ptr,
  VipsRegionWriteT,
  VipsSinkNotifyT,
} from "./typeDefinitions.ts";

export const vips_sink_disc = {
  parameters: [
    buf(int), // im
    VipsRegionWriteT, // write_fn
    ptr("void"), // a
  ],
  result: int,
} as const;

export const vips_sink = {
  parameters: [
    buf(int), // im
    int, // start_fn
    int, // generate_fn
    int, // stop_fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const vips_sink_tile = {
  parameters: [
    buf(int), // im
    int, // tile_width
    int, // tile_height
    int, // start_fn
    int, // generate_fn
    int, // stop_fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const vips_sink_screen = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // tile_width
    int, // tile_height
    int, // max_tiles
    int, // priority
    VipsSinkNotifyT, // notify_fn
    ptr("void"), // a
  ],
  result: int,
} as const;

export const vips_sink_memory = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const vips_start_one = {
  parameters: [
    buf(int), // out
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_stop_one = {
  parameters: [
    ptr("void"), // seq
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const vips_start_many = {
  parameters: [
    buf(int), // out
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_stop_many = {
  parameters: [
    ptr("void"), // seq
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const vips_allocate_input_array = {
  parameters: [
    buf(int), // out
  ],
  result: buf(buf(int)),
} as const;

export const vips_image_generate = {
  parameters: [
    buf(int), // image
    int, // start_fn
    int, // generate_fn
    int, // stop_fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const vips_image_pipeline_array = {
  parameters: [
    buf(int), // image
    int, // hint
    buf(buf(int)), // in
  ],
  result: int,
} as const;

export const vips_image_pipelinev = {
  parameters: [
    buf(int), // image
    int, // hint
  ],
  result: int,
} as const;
