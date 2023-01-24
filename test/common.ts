import { libvips, libgobject } from "../lib/ffi.ts";
import { dirname, fromFileUrl, join, resolve } from "https://deno.land/std@0.173.0/path/mod.ts";

export function cstring(txt: string): Uint8Array {
    return new TextEncoder().encode(`${txt}\0`);
}
const __dirname = dirname(fromFileUrl(import.meta.url));
export const getImg512 = () => resolve(join(__dirname, '..', 'img', 'darth_vader_512.png'));
export const getImg254 = () => resolve(join(__dirname, '..', 'img', 'darth_vader_254.png'));
export const getImgp = () => resolve(join(__dirname, '..', 'img', 'darth_vader_p.png'));
export const getImgpJPG = () => resolve(join(__dirname, '..', 'img', 'darth_vader_p.jpg'));
const result = libvips.symbols.vips_init(cstring("vips4deno"));
if (result) {
    throw new Error(`vips_init Failed and return ${result}`);
}

export { libvips, libgobject }