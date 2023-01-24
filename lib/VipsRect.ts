import { buildStruct } from "./struct.ts";

const { offsets, size } = buildStruct('<iiii')

export class VipsRect {
    private buffer: ArrayBuffer;
    private view: DataView;
    constructor(pointer?: Deno.PointerValue) {
        if (pointer) {
            this.buffer = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
            this.view = new DataView(this.buffer);
        } else {
            this.buffer = new ArrayBuffer(size) // TMP aprox value
            this.view = new DataView(this.buffer)
        }
    }

    asRef(): Deno.PointerValue {
        return Deno.UnsafePointer.of(this.buffer)
    }

    get left(): number { return offsets[0].get(this.view, this.buffer) }
    set left(v: number) { offsets[0].set(this.view, v) }

    get top(): number { return offsets[1].get(this.view, this.buffer) }
    set top(v: number) { offsets[1].set(this.view, v) }

    get width(): number { return offsets[2].get(this.view, this.buffer) }
    set width(v: number) { offsets[2].set(this.view, v) }

    get height(): number { return offsets[3].get(this.view, this.buffer) }
    set height(v: number) { offsets[3].set(this.view, v) }
}