import {
  buf,
  cstringArrayT,
  cstringT,
  im_functionT,
  im_objectT,
  im_packageT,
  int,
  ptr,
  VipsSListMap2FnT,
} from "./typeDefinitions.ts";

export const im__iprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__ivprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__dprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__dvprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__dmsprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__cprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im__sprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

// Symbol im__displayprint not exported by lib libvips.so
export const im__gprint = {
  parameters: [
    im_objectT, // obj
  ],
  result: int,
} as const;

export const im_load_plugin = {
  parameters: [
    cstringT, // name
  ],
  result: ptr(im_packageT),
} as const;

export const im_load_plugins = {
  parameters: [
    cstringT, // fmt
  ],
  result: int,
} as const;

export const im_close_plugins = {
  parameters: [],
  result: int,
} as const;

export const im_map_packages = {
  parameters: [
    VipsSListMap2FnT, // fn
    ptr("void"), // a
  ],
  result: ptr("void"),
} as const;

export const im_find_function = {
  parameters: [
    cstringT, // name
  ],
  result: ptr(im_functionT),
} as const;

export const im_find_package = {
  parameters: [
    cstringT, // name
  ],
  result: ptr(im_packageT),
} as const;

export const im_package_of_function = {
  parameters: [
    cstringT, // name
  ],
  result: ptr(im_packageT),
} as const;

export const im_free_vargv = {
  parameters: [
    ptr(im_functionT), // fn
    buf(im_objectT), // vargv
  ],
  result: int,
} as const;

export const im_allocate_vargv = {
  parameters: [
    ptr(im_functionT), // fn
    buf(im_objectT), // vargv
  ],
  result: int,
} as const;

export const im_run_command = {
  parameters: [
    cstringT, // name
    int, // argc
    cstringArrayT, // argv
  ],
  result: int,
} as const;

export const vips__input_interpolate_init = {
  parameters: [
    buf(im_objectT), // obj
    cstringT, // str
  ],
  result: int,
} as const;
