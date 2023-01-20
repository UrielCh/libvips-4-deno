// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips__file_read = {
  parameters: [
    "pointer", // fp as FILE *
    "buffer", // name as const char *
    "buffer", // length_out as size_t *
  ],
  result: "buffer"
} as const

export const vips__filename_split8 = {
  parameters: [
    "buffer", // name as const char *
    "buffer", // filename as char *
    "buffer", // option_string as char *
  ],
  result: "void"
} as const

export const vips__get_bytes = {
  parameters: [
    "buffer", // filename as const char *
    "u8", // buf[] as unsigned char
    "i64", // len as gint64
  ],
  result: "i64"
} as const

export const vips__open = {
  parameters: [
    "buffer", // filename as const char *
    "i32", // flags as int
    "i32", // mode as int
  ],
  result: "i32"
} as const

export const vips__seek = {
  parameters: [
    "i32", // fd as int
    "i64", // pos as gint64
    "i32", // whence as int
  ],
  result: "i64"
} as const

export const vips__temp_name = {
  parameters: [
    "buffer", // format as const char *
  ],
  result: "buffer"
} as const

export const vips__write = {
  parameters: [
    "i32", // fd as int
    "buffer", // buf as const void *
    "usize", // count as size_t
  ],
  result: "i32"
} as const

export const vips_amiMSBfirst = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_break_token = {
  parameters: [
    "buffer", // str as char *
    "buffer", // brk as const char *
  ],
  result: "buffer"
} as const

export const vips_enum_from_nick = {
  parameters: [
    "buffer", // domain as const char *
    "i64", // type as GType
    "buffer", // str as const char *
  ],
  result: "i32"
} as const

export const vips_enum_nick = {
  parameters: [
    "i64", // enm as GType
    "i32", // value as int
  ],
  result: "buffer"
} as const

export const vips_enum_string = {
  parameters: [
    "i64", // enm as GType
    "i32", // value as int
  ],
  result: "buffer"
} as const

export const vips_existsf = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_file_length = {
  parameters: [
    "i32", // fd as int
  ],
  result: "i64"
} as const

export const vips_filename_suffix_match = {
  parameters: [
    "buffer", // path as const char *
    "buffer", // suffixes[] as const char *
  ],
  result: "i32"
} as const

export const vips_flags_from_nick = {
  parameters: [
    "buffer", // domain as const char *
    "i64", // type as GType
    "buffer", // nick as const char *
  ],
  result: "i32"
} as const

export const vips_hash_table_map = {
  parameters: [
    "pointer", // hash as GHashTable *
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_iscasepostfix = {
  parameters: [
    "buffer", // a as const char *
    "buffer", // b as const char *
  ],
  result: "bool"
} as const

export const vips_isdirf = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_ispostfix = {
  parameters: [
    "buffer", // a as const char *
    "buffer", // b as const char *
  ],
  result: "bool"
} as const

export const vips_ispoweroftwo = {
  parameters: [
    "i32", // p as int
  ],
  result: "i32"
} as const

export const vips_isprefix = {
  parameters: [
    "buffer", // a as const char *
    "buffer", // b as const char *
  ],
  result: "bool"
} as const

export const vips_map_equal = {
  parameters: [
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_mkdirf = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_realpath = {
  parameters: [
    "buffer", // path as const char *
  ],
  result: "buffer"
} as const

export const vips_rename = {
  parameters: [
    "buffer", // old_name as const char *
    "buffer", // new_name as const char *
  ],
  result: "i32"
} as const

export const vips_rmdirf = {
  parameters: [
    "buffer", // name as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_slist_equal = {
  parameters: [
    "buffer", // l1 as GSList *
    "buffer", // l2 as GSList *
  ],
  result: "bool"
} as const

export const vips_slist_filter = {
  parameters: [
    "buffer", // list as GSList *
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "buffer"
} as const

export const vips_slist_fold2 = {
  parameters: [
    "buffer", // list as GSList *
    "pointer", // start as void *
    "function", // fn as VipsSListFold2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_slist_free_all = {
  parameters: [
    "buffer", // list as GSList *
  ],
  result: "void"
} as const

export const vips_slist_map2 = {
  parameters: [
    "buffer", // list as GSList *
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_slist_map2_rev = {
  parameters: [
    "buffer", // list as GSList *
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_slist_map4 = {
  parameters: [
    "buffer", // list as GSList *
    "function", // fn as VipsSListMap4Fn
    "pointer", // a as void *
    "pointer", // b as void *
    "pointer", // c as void *
    "pointer", // d as void *
  ],
  result: "pointer"
} as const

export const vips_snprintf = {
  parameters: [
    "buffer", // str as char *
    "usize", // size as size_t
    "buffer", // format as const char *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_strncpy = {
  parameters: [
    "buffer", // dest as char *
    "buffer", // src as const char *
    "i32", // n as int
  ],
  result: "buffer"
} as const

export const vips_strrstr = {
  parameters: [
    "buffer", // haystack as const char *
    "buffer", // needle as const char *
  ],
  result: "buffer"
} as const

export const vips_strtod = {
  parameters: [
    "buffer", // str as const char *
    "buffer", // out as double *
  ],
  result: "i32"
} as const

export const vips_vsnprintf = {
  parameters: [
    "buffer", // str as char *
    "usize", // size as size_t
    "buffer", // format as const char *
    "pointer", // ap as va_list
  ],
  result: "i32"
} as const
