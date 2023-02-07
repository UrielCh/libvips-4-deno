import {
  buf,
  cstringArrayT,
  cstringT,
  int,
  ptr,
  VipsArgumentClassMapFnT,
  VipsArgumentClassT,
  VipsArgumentFlagsT,
  VipsArgumentInstanceT,
  VipsArgumentMapFnT,
  VipsClassMapFnT,
  VipsObjectClassT,
  VipsObjectSetArgumentsT,
  VipsObjectT,
  VipsTypeMap2FnT,
  VipsTypeMapFnT,
} from "./typeDefinitions.ts";

export const vips__object_set_member = {
  parameters: [
    ptr(VipsObjectT), // object
    buf(int), // pspec
    buf(buf(int)), // member
    buf(int), // argument
  ],
  result: "void",
} as const;

export const vips_argument_class_map = {
  parameters: [
    ptr(VipsObjectClassT), // object_class
    VipsArgumentClassMapFnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_argument_class_needsstring = {
  parameters: [
    buf(VipsArgumentClassT), // argument_class
  ],
  result: int,
} as const;

export const vips_argument_get_id = {
  parameters: [],
  result: int,
} as const;

export const vips_argument_map = {
  parameters: [
    ptr(VipsObjectT), // object
    VipsArgumentMapFnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_class_find = {
  parameters: [
    cstringT, // basename
    cstringT, // nickname
  ],
  result: ptr(VipsObjectClassT),
} as const;

export const vips_class_map_all = {
  parameters: [
    int, // type
    VipsClassMapFnT, // fn
    ptr("void"), // a
  ],
  result: ptr("void"),
} as const;

export const vips_nickname_find = {
  parameters: [
    int, // type
  ],
  result: cstringT,
} as const;

export const vips_object_argument_isset = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_object_argument_needsstring = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_object_build = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: int,
} as const;

export const vips_object_class_install_argument = {
  parameters: [
    ptr(VipsObjectClassT), // cls
    buf(int), // pspec
    VipsArgumentFlagsT, // flags
    int, // priority
    int, // offset
  ],
  result: "void",
} as const;

export const vips_object_dump = {
  parameters: [
    ptr(VipsObjectT), // object
    buf(int), // buf
  ],
  result: "void",
} as const;

export const vips_object_get_args = {
  parameters: [
    ptr(VipsObjectT), // object
    buf(cstringArrayT), // names
    buf(buf(int)), // flags
    buf(int), // n_args
  ],
  result: int,
} as const;

export const vips_object_get_argument = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
    buf(buf(int)), // pspec
    buf(buf(VipsArgumentClassT)), // argument_class
    buf(buf(VipsArgumentInstanceT)), // argument_instance
  ],
  result: int,
} as const;

export const vips_object_get_argument_flags = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
  ],
  result: VipsArgumentFlagsT,
} as const;

export const vips_object_get_argument_priority = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
  ],
  result: int,
} as const;

export const vips_object_get_argument_to_string = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
    cstringT, // arg
  ],
  result: int,
} as const;

export const vips_object_get_description = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: cstringT,
} as const;

export const vips_object_get_property = {
  parameters: [
    buf(int), // gobject
    int, // property_id
    buf(int), // value
    buf(int), // pspec
  ],
  result: "void",
} as const;

export const vips_object_get_type = {
  parameters: [],
  result: int,
} as const;

export const vips_object_local_array = {
  parameters: [
    ptr(VipsObjectT), // parent
    int, // n
  ],
  result: buf(buf(VipsObjectT)),
} as const;

export const vips_object_local_cb = {
  parameters: [
    ptr(VipsObjectT), // vobject
    buf(int), // gobject
  ],
  result: "void",
} as const;

export const vips_object_map = {
  parameters: [
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_object_new = {
  parameters: [
    int, // type
    VipsObjectSetArgumentsT, // set
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr(VipsObjectT),
} as const;

export const vips_object_new_from_string = {
  parameters: [
    ptr(VipsObjectClassT), // object_class
    cstringT, // p
  ],
  result: ptr(VipsObjectT),
} as const;

export const vips_object_preclose = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_object_print_all = {
  parameters: [],
  result: "void",
} as const;

export const vips_object_print_dump = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_object_print_name = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_object_print_summary = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_object_print_summary_class = {
  parameters: [
    ptr(VipsObjectClassT), // klass
  ],
  result: "void",
} as const;

export const vips_object_rewind = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_object_sanity = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: int,
} as const;

export const vips_object_sanity_all = {
  parameters: [],
  result: "void",
} as const;

export const vips_object_set = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: int,
} as const;

export const vips_object_set_argument_from_string = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // name
    cstringT, // value
  ],
  result: int,
} as const;

export const vips_object_set_from_string = {
  parameters: [
    ptr(VipsObjectT), // object
    cstringT, // string
  ],
  result: int,
} as const;

export const vips_object_set_property = {
  parameters: [
    buf(int), // gobject
    int, // property_id
    buf(int), // value
    buf(int), // pspec
  ],
  result: "void",
} as const;

// Symbol vips_object_set_required not exported by lib libvips.so
export const vips_object_set_static = {
  parameters: [
    ptr(VipsObjectT), // object
    int, // static_object
  ],
  result: "void",
} as const;

export const vips_object_set_valist = {
  parameters: [
    ptr(VipsObjectT), // object
    int, // ap
  ],
  result: int,
} as const;

export const vips_object_summary = {
  parameters: [
    ptr(VipsObjectT), // object
    buf(int), // buf
  ],
  result: "void",
} as const;

export const vips_object_summary_class = {
  parameters: [
    ptr(VipsObjectClassT), // klass
    buf(int), // buf
  ],
  result: "void",
} as const;

export const vips_object_to_string = {
  parameters: [
    ptr(VipsObjectT), // object
    buf(int), // buf
  ],
  result: "void",
} as const;

export const vips_object_unref_outputs = {
  parameters: [
    ptr(VipsObjectT), // object
  ],
  result: "void",
} as const;

export const vips_type_depth = {
  parameters: [
    int, // type
  ],
  result: int,
} as const;

export const vips_type_find = {
  parameters: [
    cstringT, // basename
    cstringT, // nickname
  ],
  result: int,
} as const;

export const vips_type_map = {
  parameters: [
    int, // base
    VipsTypeMap2FnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

export const vips_type_map_all = {
  parameters: [
    int, // base
    VipsTypeMapFnT, // fn
    ptr("void"), // a
  ],
  result: ptr("void"),
} as const;

export const vips_value_is_null = {
  parameters: [
    buf(int), // psoec
    buf(int), // value
  ],
  result: int,
} as const;
