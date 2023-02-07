import {
  buf,
  cstringT,
  int,
  ptr,
  unsignedChar,
  VipsConnectionT,
  VipsSourceCustomT,
  VipsSourceGInputStreamT,
  VipsSourceT,
  VipsTargetCustomT,
  VipsTargetT,
} from "./typeDefinitions.ts";

export const vips_connection_filename = {
  parameters: [
    buf(VipsConnectionT), // connection
  ],
  result: cstringT,
} as const;

export const vips_connection_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_connection_nick = {
  parameters: [
    buf(VipsConnectionT), // connection
  ],
  result: cstringT,
} as const;

export const vips_g_input_stream_new_from_source = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: buf(int),
} as const;

export const vips_pipe_read_limit_set = {
  parameters: [
    int, // limit
  ],
  result: "void",
} as const;

export const vips_source_custom_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_source_custom_new = {
  parameters: [],
  result: ptr(VipsSourceCustomT),
} as const;

export const vips_source_decode = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_source_g_input_stream_new = {
  parameters: [
    buf(int), // stream
  ],
  result: ptr(VipsSourceGInputStreamT),
} as const;

export const vips_source_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_source_is_file = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_source_is_mappable = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_source_length = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_source_map = {
  parameters: [
    ptr(VipsSourceT), // source
    buf(int), // length
  ],
  result: ptr("void"),
} as const;

export const vips_source_map_blob = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: buf(int),
} as const;

export const vips_source_minimise = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: "void",
} as const;

export const vips_source_new_from_blob = {
  parameters: [
    buf(int), // blob
  ],
  result: ptr(VipsSourceT),
} as const;

export const vips_source_new_from_descriptor = {
  parameters: [
    int, // descriptor
  ],
  result: ptr(VipsSourceT),
} as const;

export const vips_source_new_from_file = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(VipsSourceT),
} as const;

export const vips_source_new_from_memory = {
  parameters: [
    ptr("void"), // data
    int, // size
  ],
  result: ptr(VipsSourceT),
} as const;

export const vips_source_new_from_options = {
  parameters: [
    cstringT, // options
  ],
  result: ptr(VipsSourceT),
} as const;

export const vips_source_read = {
  parameters: [
    ptr(VipsSourceT), // source
    ptr("void"), // data
    int, // length
  ],
  result: int,
} as const;

export const vips_source_rewind = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_source_seek = {
  parameters: [
    ptr(VipsSourceT), // source
    int, // offset
    int, // whence
  ],
  result: int,
} as const;

export const vips_source_sniff = {
  parameters: [
    ptr(VipsSourceT), // source
    int, // length
  ],
  result: buf(unsignedChar),
} as const;

export const vips_source_sniff_at_most = {
  parameters: [
    ptr(VipsSourceT), // source
    buf(buf(unsignedChar)), // data
    int, // length
  ],
  result: int,
} as const;

export const vips_source_unminimise = {
  parameters: [
    ptr(VipsSourceT), // source
  ],
  result: int,
} as const;

export const vips_target_custom_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_target_custom_new = {
  parameters: [],
  result: ptr(VipsTargetCustomT),
} as const;

export const vips_target_finish = {
  parameters: [
    ptr(VipsTargetT), // target
  ],
  result: "void",
} as const;

export const vips_target_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_target_new_to_descriptor = {
  parameters: [
    int, // descriptor
  ],
  result: ptr(VipsTargetT),
} as const;

export const vips_target_new_to_file = {
  parameters: [
    cstringT, // filename
  ],
  result: ptr(VipsTargetT),
} as const;

export const vips_target_new_to_memory = {
  parameters: [],
  result: ptr(VipsTargetT),
} as const;

export const vips_target_putc = {
  parameters: [
    ptr(VipsTargetT), // target
    int, // ch
  ],
  result: int,
} as const;

export const vips_target_steal = {
  parameters: [
    ptr(VipsTargetT), // target
    buf(int), // length
  ],
  result: buf(unsignedChar),
} as const;

export const vips_target_steal_text = {
  parameters: [
    ptr(VipsTargetT), // target
  ],
  result: cstringT,
} as const;

export const vips_target_write = {
  parameters: [
    ptr(VipsTargetT), // target
    ptr("void"), // data
    int, // length
  ],
  result: int,
} as const;

export const vips_target_write_amp = {
  parameters: [
    ptr(VipsTargetT), // target
    cstringT, // str
  ],
  result: int,
} as const;

export const vips_target_writef = {
  parameters: [
    ptr(VipsTargetT), // target
    cstringT, // fmt
  ],
  result: int,
} as const;

export const vips_target_writes = {
  parameters: [
    ptr(VipsTargetT), // target
    cstringT, // str
  ],
  result: int,
} as const;
