// this code is generarated by file:///C:/1/libvips-4-deno/build/generator.ts

export const vips_argument_class_map = {
  parameters: [
    "pointer", // object_class as VipsObjectClass *
    "function", // fn as VipsArgumentClassMapFn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_argument_class_needsstring = {
  parameters: [
    "pointer", // argument_class as VipsArgumentClass *
  ],
  result: "bool"
} as const

export const vips_argument_get_id = {
  parameters: [
  
  ],
  result: "i32"
} as const

export const vips_argument_map = {
  parameters: [
    "buffer", // object as VipsObject *
    "function", // fn as VipsArgumentMapFn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_class_find = {
  parameters: [
    "buffer", // basename as const char *
    "buffer", // nickname as const char *
  ],
  result: "pointer"
} as const

export const vips_class_map_all = {
  parameters: [
    "i64", // type as GType
    "function", // fn as VipsClassMapFn
    "pointer", // a as void *
  ],
  result: "pointer"
} as const

export const vips_nickname_find = {
  parameters: [
    "i64", // type as GType
  ],
  result: "buffer"
} as const

export const vips_object_argument_isset = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
  ],
  result: "bool"
} as const

export const vips_object_argument_needsstring = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
  ],
  result: "bool"
} as const

export const vips_object_build = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "i32"
} as const

export const vips_object_class_install_argument = {
  parameters: [
    "pointer", // cls as VipsObjectClass *
    "pointer", // pspec as GParamSpec *
    "u32", // flags as VipsArgumentFlags
    "i32", // priority as int
    "u32", // offset as guint
  ],
  result: "void"
} as const

export const vips_object_dump = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // buf as VipsBuf *
  ],
  result: "void"
} as const

export const vips_object_get_args = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // names as const char ***
    "pointer", // flags as int **
    "buffer", // n_args as int *
  ],
  result: "i32"
} as const

export const vips_object_get_argument = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
    "pointer", // pspec as GParamSpec **
    "pointer", // argument_class as VipsArgumentClass **
    "pointer", // argument_instance as VipsArgumentInstance **
  ],
  result: "i32"
} as const

export const vips_object_get_argument_flags = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
  ],
  result: "u32"
} as const

export const vips_object_get_argument_priority = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
  ],
  result: "i32"
} as const

export const vips_object_get_argument_to_string = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
    "buffer", // arg as const char *
  ],
  result: "i32"
} as const

export const vips_object_get_description = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "buffer"
} as const

export const vips_object_get_property = {
  parameters: [
    "pointer", // gobject as GObject *
    "u32", // property_id as guint
    "buffer", // value as GValue *
    "pointer", // pspec as GParamSpec *
  ],
  result: "void"
} as const

export const vips_object_get_type = {
  parameters: [
  
  ],
  result: "i64"
} as const

export const vips_object_local_array = {
  parameters: [
    "buffer", // parent as VipsObject *
    "i32", // n as int
  ],
  result: "pointer"
} as const

export const vips_object_local_cb = {
  parameters: [
    "buffer", // vobject as VipsObject *
    "pointer", // gobject as GObject *
  ],
  result: "void"
} as const

export const vips_object_map = {
  parameters: [
    "function", // fn as VipsSListMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_object_new = {
  parameters: [
    "i64", // type as GType
    "function", // set as VipsObjectSetArguments
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "buffer"
} as const

export const vips_object_new_from_string = {
  parameters: [
    "pointer", // object_class as VipsObjectClass *
    "buffer", // p as const char *
  ],
  result: "buffer"
} as const

export const vips_object_preclose = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_object_print_all = {
  parameters: [
  
  ],
  result: "void"
} as const

export const vips_object_print_dump = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_object_print_name = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_object_print_summary = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_object_print_summary_class = {
  parameters: [
    "pointer", // klass as VipsObjectClass *
  ],
  result: "void"
} as const

export const vips_object_rewind = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_object_sanity = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "bool"
} as const

export const vips_object_sanity_all = {
  parameters: [
  
  ],
  result: "void"
} as const

export const vips_object_set = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // args as void *
  ],
  result: "i32"
} as const

export const vips_object_set_argument_from_string = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // name as const char *
    "buffer", // value as const char *
  ],
  result: "i32"
} as const

export const vips_object_set_from_string = {
  parameters: [
    "buffer", // object as VipsObject *
    "buffer", // string as const char *
  ],
  result: "i32"
} as const

export const vips_object_set_property = {
  parameters: [
    "pointer", // gobject as GObject *
    "u32", // property_id as guint
    "pointer", // value as const GValue *
    "pointer", // pspec as GParamSpec *
  ],
  result: "void"
} as const

export const vips_object_set_static = {
  parameters: [
    "buffer", // object as VipsObject *
    "bool", // static_object as gboolean
  ],
  result: "void"
} as const

export const vips_object_set_valist = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // ap as va_list
  ],
  result: "i32"
} as const

export const vips_object_summary = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // buf as VipsBuf *
  ],
  result: "void"
} as const

export const vips_object_summary_class = {
  parameters: [
    "pointer", // klass as VipsObjectClass *
    "pointer", // buf as VipsBuf *
  ],
  result: "void"
} as const

export const vips_object_to_string = {
  parameters: [
    "buffer", // object as VipsObject *
    "pointer", // buf as VipsBuf *
  ],
  result: "void"
} as const

export const vips_object_unref_outputs = {
  parameters: [
    "buffer", // object as VipsObject *
  ],
  result: "void"
} as const

export const vips_type_depth = {
  parameters: [
    "i64", // type as GType
  ],
  result: "i32"
} as const

export const vips_type_find = {
  parameters: [
    "buffer", // basename as const char *
    "buffer", // nickname as const char *
  ],
  result: "i64"
} as const

export const vips_type_map = {
  parameters: [
    "i64", // base as GType
    "function", // fn as VipsTypeMap2Fn
    "pointer", // a as void *
    "pointer", // b as void *
  ],
  result: "pointer"
} as const

export const vips_type_map_all = {
  parameters: [
    "i64", // base as GType
    "function", // fn as VipsTypeMapFn
    "pointer", // a as void *
  ],
  result: "pointer"
} as const

export const vips_value_is_null = {
  parameters: [
    "pointer", // psoec as GParamSpec *
    "pointer", // value as const GValue *
  ],
  result: "bool"
} as const
