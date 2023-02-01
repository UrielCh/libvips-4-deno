import * as vips from "./vips.h.ts";

const IMPORTS = {
  ...vips,
} as const;

export type libShape = ReturnType<typeof Deno.dlopen<typeof IMPORTS>>;

export function getLib(path: string): libShape {
  return Deno.dlopen(path, IMPORTS);
}