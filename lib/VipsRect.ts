export class VipsRect {
    buffer = new ArrayBuffer(16);
    view = new DataView(this.buffer);
    constructor() {
    }

    get left(): number { return this.view.getInt32(0); }
    set left(v: number) { this.view.setInt32(0, v); }

    get top(): number { return this.view.getInt32(4); }
    set top(v: number) { this.view.setInt32(4, v); }

    get width(): number { return this.view.getInt32(8); }
    set width(v: number) { this.view.setInt32(8, v); }

    get height(): number { return this.view.getInt32(12); }
    set height(v: number) { this.view.setInt32(12, v); }

    asRef(): Deno.PointerValue {
        return Deno.UnsafePointer.of(this.buffer)
    }
}