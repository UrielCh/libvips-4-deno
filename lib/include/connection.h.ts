// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_connection_filename = {
  parameters: [
    "pointer", // connection as VipsConnection *
  ],
  result: "buffer", // const char *
} as const;

export const vips_connection_get_type = {
  parameters: [],
  result: "i64", // GType
} as const;

export const vips_connection_nick = {
  parameters: [
    "pointer", // connection as VipsConnection *
  ],
  result: "buffer", // const char *
} as const;

export const vips_g_input_stream_new_from_source = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "pointer", // GInputStream *
} as const;

export const vips_pipe_read_limit_set = {
  parameters: [
    "i64", // limit as gint64
  ],
  result: "void", // void
} as const;

export const vips_source_custom_get_type = {
  parameters: [],
  result: "i64", // GType
} as const;

export const vips_source_custom_new = {
  parameters: [],
  result: "buffer", // VipsSourceCustom *
} as const;

export const vips_source_decode = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "i32", // int
} as const;

export const vips_source_g_input_stream_new = {
  parameters: [
    "pointer", // stream as GInputStream *
  ],
  result: "buffer", // VipsSourceGInputStream *
} as const;

export const vips_source_get_type = {
  parameters: [],
  result: "i64", // GType
} as const;

export const vips_source_is_file = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "bool", // gboolean
} as const;

export const vips_source_is_mappable = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "bool", // gboolean
} as const;

export const vips_source_length = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "i64", // gint64
} as const;

export const vips_source_map = {
  parameters: [
    "buffer", // source as VipsSource *
    "buffer", // length as size_t *
  ],
  result: "buffer", // const void *
} as const;

export const vips_source_map_blob = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "pointer", // VipsBlob *
} as const;

export const vips_source_minimise = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "void", // void
} as const;

export const vips_source_new_from_blob = {
  parameters: [
    "pointer", // blob as VipsBlob *
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_new_from_descriptor = {
  parameters: [
    "i32", // descriptor as int
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_new_from_file = {
  parameters: [
    "buffer", // filename as const char *
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_new_from_memory = {
  parameters: [
    "buffer", // data as const void *
    "usize", // size as size_t
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_new_from_options = {
  parameters: [
    "buffer", // options as const char *
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_new_from_target = {
  parameters: [
    "buffer", // target as VipsTarget *
  ],
  result: "buffer", // VipsSource *
} as const;

export const vips_source_read = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // data as void *
    "usize", // length as size_t
  ],
  result: "i64", // gint64
} as const;

export const vips_source_rewind = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "i32", // int
} as const;

export const vips_source_seek = {
  parameters: [
    "buffer", // source as VipsSource *
    "i64", // offset as gint64
    "i32", // whence as int
  ],
  result: "i64", // gint64
} as const;

export const vips_source_sniff = {
  parameters: [
    "buffer", // source as VipsSource *
    "usize", // length as size_t
  ],
  result: "buffer", // unsigned char *
} as const;

export const vips_source_sniff_at_most = {
  parameters: [
    "buffer", // source as VipsSource *
    "pointer", // data as unsigned char **
    "usize", // length as size_t
  ],
  result: "i64", // gint64
} as const;

export const vips_source_unminimise = {
  parameters: [
    "buffer", // source as VipsSource *
  ],
  result: "i32", // int
} as const;

export const vips_target_custom_get_type = {
  parameters: [],
  result: "i64", // GType
} as const;

export const vips_target_custom_new = {
  parameters: [],
  result: "pointer", // VipsTargetCustom *
} as const;

export const vips_target_end = {
  parameters: [
    "buffer", // target as VipsTarget *
  ],
  result: "i32", // int
} as const;

export const vips_target_get_type = {
  parameters: [],
  result: "i64", // GType
} as const;

export const vips_target_new_temp = {
  parameters: [
    "buffer", // target as VipsTarget *
  ],
  result: "buffer", // VipsTarget *
} as const;

export const vips_target_new_to_descriptor = {
  parameters: [
    "i32", // descriptor as int
  ],
  result: "buffer", // VipsTarget *
} as const;

export const vips_target_new_to_file = {
  parameters: [
    "buffer", // filename as const char *
  ],
  result: "buffer", // VipsTarget *
} as const;

export const vips_target_new_to_memory = {
  parameters: [],
  result: "buffer", // VipsTarget *
} as const;

export const vips_target_putc = {
  parameters: [
    "buffer", // target as VipsTarget *
    "i32", // ch as int
  ],
  result: "i32", // int
} as const;

export const vips_target_read = {
  parameters: [
    "buffer", // target as VipsTarget *
    "pointer", // buffer as void *
    "usize", // length as size_t
  ],
  result: "i64", // gint64
} as const;

export const vips_target_seek = {
  parameters: [
    "buffer", // target as VipsTarget *
    "usize", // offset as off_t
    "i32", // whence as int
  ],
  result: "usize", // off_t
} as const;

export const vips_target_steal = {
  parameters: [
    "buffer", // target as VipsTarget *
    "buffer", // length as size_t *
  ],
  result: "buffer", // unsigned char *
} as const;

export const vips_target_steal_text = {
  parameters: [
    "buffer", // target as VipsTarget *
  ],
  result: "buffer", // char *
} as const;

export const vips_target_write = {
  parameters: [
    "buffer", // target as VipsTarget *
    "buffer", // data as const void *
    "usize", // length as size_t
  ],
  result: "i32", // int
} as const;

export const vips_target_write_amp = {
  parameters: [
    "buffer", // target as VipsTarget *
    "buffer", // str as const char *
  ],
  result: "i32", // int
} as const;

export const vips_target_writef = {
  parameters: [
    "buffer", // target as VipsTarget *
    "buffer", // fmt as const char *
    "pointer", // args as void *
  ],
  result: "i32", // int
} as const;

export const vips_target_writes = {
  parameters: [
    "buffer", // target as VipsTarget *
    "buffer", // str as const char *
  ],
  result: "i32", // int
} as const;
