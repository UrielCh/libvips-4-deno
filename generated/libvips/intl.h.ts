import {
  cstringT,
  unsignedLong,
} from "./typeDefinitions.ts";

export const vips__gettext = {
  parameters: [
    cstringT, // msgid
  ],
  result: cstringT,
} as const;

export const vips__ngettext = {
  parameters: [
    cstringT, // msgid
    cstringT, // plural
    unsignedLong, // n
  ],
  result: cstringT,
} as const;
