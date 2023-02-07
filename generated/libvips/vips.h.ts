import {
  cstringT,
  gbooleanT,
  int,
} from "./typeDefinitions.ts";

// type GOptionGroupT                                           missing from typeDefinitions.ts, vips_add_option_entries will not be available
export const vips_get_argv0 = {
  parameters: [],
  result: cstringT,
} as const;

export const vips_get_prgname = {
  parameters: [],
  result: cstringT,
} as const;

export const vips_guess_libdir = {
  parameters: [
    cstringT, // argv0
    cstringT, // env_name
  ],
  result: cstringT,
} as const;

export const vips_guess_prefix = {
  parameters: [
    cstringT, // argv0
    cstringT, // env_name
  ],
  result: cstringT,
} as const;

export const vips_init = {
  parameters: [
    cstringT, // argv0
  ],
  result: int,
} as const;

export const vips_leak_set = {
  parameters: [
    gbooleanT, // leak
  ],
  result: "void",
} as const;

export const vips_shutdown = {
  parameters: [],
  result: "void",
} as const;

export const vips_thread_shutdown = {
  parameters: [],
  result: "void",
} as const;

export const vips_version = {
  parameters: [
    int, // flag
  ],
  result: int,
} as const;

export const vips_version_string = {
  parameters: [],
  result: cstringT,
} as const;
