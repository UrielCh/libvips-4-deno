export const ptr = (_type: unknown) => "pointer" as const;
export const buf = (_type: unknown) => "buffer" as const;
export const func = (_func: unknown) => "function" as const;
export const int = "i32" as const;

/**
 * `const char *`, C string
 */
export const cstringT = "buffer" as const;

