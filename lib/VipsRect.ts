import { packModel } from "./FFIMapper/mod.ts";

export class VipsRect {
    @packModel("<i")
    left!: number;
    @packModel("i")
    top!: number;
    @packModel("i")
    width!: number;
    @packModel("i")
    height!: number;
}