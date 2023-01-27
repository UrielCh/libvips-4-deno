import { packModel } from "./packModel.descriptor.ts";

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