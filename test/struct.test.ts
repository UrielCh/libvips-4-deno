import { assertEquals as assertEqualsOrg, assertThrows } from "https://deno.land/std@0.173.0/testing/asserts.ts"
import { pack, Struct, unpack } from '../lib/struct.ts';

function assertEquals<T>(actual: T, expected: T, msg = '') {
    assertEqualsOrg(actual, expected, `${msg} value: "${actual}" should be eq to "${expected}"`);
}

Deno.test("Simple bigEndian struct", () => {
    const struct1 = new Struct('>iii')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    assertEquals(view.getInt32(0), 1, "view.getInt32(0)")
    assertEquals(view.getInt32(4), 2, "view.getInt32(4)")
    assertEquals(view.getInt32(8), 3, "view.getInt32(8)")
});

Deno.test("Simple littleEndian struct", () => {
    const struct1 = new Struct('<iii')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    const littleEndian = true;
    assertEquals(view.getInt32(0, littleEndian), 1, "view.getInt32(0)")
    assertEquals(view.getInt32(4, littleEndian), 2, "view.getInt32(4)")
    assertEquals(view.getInt32(8, littleEndian), 3, "view.getInt32(8)")
});

Deno.test("Simple bigEndian struct multiplier", () => {
    const struct1 = new Struct('>3i')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    assertEquals(view.getInt32(0), 1, "view.getInt32(0)")
    assertEquals(view.getInt32(4), 2, "view.getInt32(4)")
    assertEquals(view.getInt32(8), 3, "view.getInt32(8)")
});

Deno.test("Pack pack_into with offset and multiplier", () => {
    const struct1 = new Struct('>3i')
    const buffer = new ArrayBuffer(16)
    struct1.pack_into(buffer, 4, 1, 2, 3)
    const view = new DataView(buffer);
    // assertEquals(view.getInt32(0), 0, "view.getInt32(0) should be 0")
    assertEquals(view.getInt32(4), 1, "view.getInt32(4)")
    assertEquals(view.getInt32(8), 2, "view.getInt32(8)")
    assertEquals(view.getInt32(12), 3, "view.getInt32(12)")
});

Deno.test("littleEndian all types", () => {
    // all aligne on 8bytes with padding
    //                          ptr,   byte,  short,   int,    long,  longlong, float, double
    //                           1     2       3       4       5       6       7       8
    const struct1 = new Struct('<p' + 'b7x' + 'h6x' + 'i4x' + 'l4x' + 'q' + 'f4x' + 'd')
    const buffer = struct1.pack(1n, 2, 3, 4, 5, 6n, 7, 8)
    const view = new DataView(buffer);
    const littleEndian = true;
    // Ptr are always OS native orderd
    assertEquals(view.getBigInt64(0, false), 1n, `view.getBigInt64(0, littleEndian:${littleEndian})`)
    assertEquals(view.getInt8(8), 2, "view.getInt32(8)")
    assertEquals(view.getInt16(16, littleEndian), 3, "view.getInt16(16)")
    assertEquals(view.getInt32(24, littleEndian), 4, "view.getInt32(24)")
    assertEquals(view.getInt32(32, littleEndian), 5, "view.getInt32(32)")
    assertEquals(view.getBigInt64(40, littleEndian), 6n, "view.getBigInt64(40)")
    assertEquals(view.getFloat32(48, littleEndian), 7, "view.getFloat32(48)")
    assertEquals(view.getFloat64(56, littleEndian), 8, "view.getFloat64(56)")
});


Deno.test("Python Examples pack / unpack >bhl", () => {
    const seq = [1, 2, 3]
    const buf = pack(">bhl", ...seq)
    const valuesBack = unpack('>bhl', buf)
    assertEquals(valuesBack, seq, "unpack('>bhl', ar)")
});

Deno.test("Python Examples unpack \\x01\\x00\\x02\\x00\\x00\\x00\\x03", () => {
    const seq = [1, 2, 3]
    const ar: ArrayBuffer = new TextEncoder().encode('\x01\x00\x02\x00\x00\x00\x03').buffer;
    const values = unpack('>bhl', ar)
    assertEquals(values, seq, "unpack('>bhl', ar)")
});
