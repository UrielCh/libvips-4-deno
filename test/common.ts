import { libvips, libgobject } from "../lib/ffi.ts";
import { dirname, fromFileUrl, join, resolve } from "https://deno.land/std@0.173.0/path/mod.ts";
import { assertEquals as assertEqualsOrg } from "https://deno.land/std@0.173.0/testing/asserts.ts"

export function cstring(txt: string): Uint8Array {
    return new TextEncoder().encode(`${txt}\0`);
}
const __dirname = dirname(fromFileUrl(import.meta.url));
export const getImg512 = () => resolve(join(__dirname, '..', 'img', 'darth_vader_512.png'));
export const getImg254 = () => resolve(join(__dirname, '..', 'img', 'darth_vader_254.png'));
export const getImgp = () => resolve(join(__dirname, '..', 'img', 'darth_vader_p.png'));
export const getImgpJPG = () => resolve(join(__dirname, '..', 'img', 'darth_vader_p.jpg'));
export const getPixelGif = () => resolve(join(__dirname, '..', 'img', 'p.gif'));

const result = libvips.symbols.vips_init(cstring("vips4deno"));
if (result) {
    throw new Error(`vips_init Failed and return ${result}`);
}

export function assertEqualsBuf(actual: ArrayBufferLike, expected: ArrayBufferLike, msg = '') {
    const a = new Uint8Array(actual)
    const e = new Uint8Array(expected)
    assertEqualsOrg(a, e, `${msg} value: "${a}" should be eq to "${e}"`);
}

export function assertEquals<T>(actual: T, expected: T, msg = "") {
    assertEqualsOrg(actual, expected, `${msg} value: "${actual}" should be eq to "${expected}"`)
}

export { libvips, libgobject }

