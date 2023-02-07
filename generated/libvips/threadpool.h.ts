import {
  GTypeT,
  ptr,
  VipsObjectT,
} from "./typeDefinitions.ts";

// type VipsImageT                                              missing from typeDefinitions.ts, vips_get_tile_size will not be available
export const vips_thread_state_get_type = {
  parameters: [],
  result: GTypeT,
} as const;

// type VipsImageT                                              missing from typeDefinitions.ts, vips_thread_state_new will not be available
export const vips_thread_state_set = {
  parameters: [
    ptr(VipsObjectT), // object
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: ptr("void"),
} as const;

// type VipsImageT                                              missing from typeDefinitions.ts, vips_threadpool_run will not be available