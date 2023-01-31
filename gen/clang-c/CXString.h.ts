import { cstringT, CXStringSetT, CXStringT, ptr } from "../typeDefinitions.ts";

/**
 * Retrieve the character data associated with the given string.
 */
// deno-lint-ignore no-unused-vars
const clang_getCString = {
  parameters: [
    CXStringT, // string
  ],
  result: cstringT,
} as const;

/**
 * Free the given string.
 */
// deno-lint-ignore no-unused-vars
const clang_disposeString = {
  parameters: [
    CXStringT, // string
  ],
  result: "void",
} as const;

/**
 * Free the given string set.
 */
// deno-lint-ignore no-unused-vars
const clang_disposeStringSet = {
  parameters: [
    ptr(CXStringSetT), // set
  ],
  result: "void",
} as const;
