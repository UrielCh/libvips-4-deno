import {
  buf,
  cstringT,
  int,
  ptr,
  size_t,
  va_listT,
} from "./typeDefinitions.ts";

export const vips_enum_string = {
  parameters: [
    int, // enm
    int, // value
  ],
  result: cstringT,
} as const;

export const vips_enum_nick = {
  parameters: [
    int, // enm
    int, // value
  ],
  result: cstringT,
} as const;

export const vips_enum_from_nick = {
  parameters: [
    cstringT, // domain
    int, // type
    cstringT, // str
  ],
  result: int,
} as const;

export const vips_flags_from_nick = {
  parameters: [
    cstringT, // domain
    int, // type
    cstringT, // nick
  ],
  result: int,
} as const;

export const vips_slist_equal = {
  parameters: [
    buf(int), // l1
    buf(int), // l2
  ],
  result: int,
} as const;

export const vips_slist_map2 = {
  parameters: [
    buf(int), // list
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_slist_map2_rev = {
  parameters: [
    buf(int), // list
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_slist_map4 = {
  parameters: [
    buf(int), // list
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
    ptr("void"), // d
  ],
  result: ptr("void"),
} as const;

export const vips_slist_fold2 = {
  parameters: [
    buf(int), // list
    ptr("void"), // start
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_slist_filter = {
  parameters: [
    buf(int), // list
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: buf(int),
} as const;

export const vips_slist_free_all = {
  parameters: [
    buf(int), // list
  ],
  result: "void",
} as const;

export const vips_map_equal = {
  parameters: [
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_hash_table_map = {
  parameters: [
    buf(int), // hash
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_strncpy = {
  parameters: [
    cstringT, // dest
    cstringT, // src
    int, // n
  ],
  result: cstringT,
} as const;

export const vips_strrstr = {
  parameters: [
    cstringT, // haystack
    cstringT, // needle
  ],
  result: cstringT,
} as const;

export const vips_ispostfix = {
  parameters: [
    cstringT, // a
    cstringT, // b
  ],
  result: int,
} as const;

export const vips_iscasepostfix = {
  parameters: [
    cstringT, // a
    cstringT, // b
  ],
  result: int,
} as const;

export const vips_isprefix = {
  parameters: [
    cstringT, // a
    cstringT, // b
  ],
  result: int,
} as const;

export const vips_break_token = {
  parameters: [
    cstringT, // str
    cstringT, // brk
  ],
  result: cstringT,
} as const;

export const vips__chomp = {
  parameters: [
    cstringT, // str
  ],
  result: "void",
} as const;

export const vips_vsnprintf = {
  parameters: [
    cstringT, // str
    size_t, // size
    cstringT, // format
    va_listT, // ap
  ],
  result: int,
} as const;

export const vips_snprintf = {
  parameters: [
    cstringT, // str
    size_t, // size
    cstringT, // format
  ],
  result: int,
} as const;
