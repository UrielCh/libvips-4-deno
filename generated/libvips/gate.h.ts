import {
  cstringT,
  gbooleanT,
} from "./typeDefinitions.ts";

export const vips__thread_gate_start = {
  parameters: [
    cstringT, // gate_name
  ],
  result: "void",
} as const;

export const vips__thread_gate_stop = {
  parameters: [
    cstringT, // gate_name
  ],
  result: "void",
} as const;

// type gint64T                                                 missing from typeDefinitions.ts, vips__thread_malloc_free will not be available
export const vips__thread_profile_attach = {
  parameters: [
    cstringT, // thread_name
  ],
  result: "void",
} as const;

export const vips__thread_profile_detach = {
  parameters: [],
  result: "void",
} as const;

export const vips__thread_profile_stop = {
  parameters: [],
  result: "void",
} as const;

export const vips_profile_set = {
  parameters: [
    gbooleanT, // profile
  ],
  result: "void",
} as const;
