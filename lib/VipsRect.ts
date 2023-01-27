import { packModel } from "./packModel.descriptor.ts";
import { VFFIBase } from "./VFFIBase.ts";

export class VipsRect extends VFFIBase {
    @packModel("<i")
    left!: number;
    @packModel("i")
    top!: number;
    @packModel("i")
    width!: number;
    @packModel("i")
    height!: number;
}