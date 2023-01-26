import { packModel, VFFIBase } from "./VFFIBase.ts";

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