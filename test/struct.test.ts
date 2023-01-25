import { assertEquals, assertNotEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts"
import { Struct } from '../lib/struct.ts';

Deno.test("Simple bigEndian struct", () => {
    const struct1 = new Struct('>iii')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    assertEquals(view.getInt32(0), 1, "view.getInt32(0) should be 1")
    assertEquals(view.getInt32(4), 2, "view.getInt32(4) should be 2")
    assertEquals(view.getInt32(8), 3, "view.getInt32(8) should be 3")
});

Deno.test("Simple littleEndian struct", () => {
    const struct1 = new Struct('<iii')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    assertEquals(view.getInt32(0, true), 1, "view.getInt32(0) should be 1")
    assertEquals(view.getInt32(4, true), 2, "view.getInt32(4) should be 2")
    assertEquals(view.getInt32(8, true), 3, "view.getInt32(8) should be 3")
});

Deno.test("Simple bigEndian struct multiplier", () => {
    const struct1 = new Struct('>3i')
    const buffer = struct1.pack(1, 2, 3)
    const view = new DataView(buffer);
    assertEquals(view.getInt32(0), 1, "view.getInt32(0) should be 1")
    assertEquals(view.getInt32(4), 2, "view.getInt32(4) should be 2")
    assertEquals(view.getInt32(8), 3, "view.getInt32(8) should be 3")
});

Deno.test("Pack pack_into with offset and multiplier", () => {
    const struct1 = new Struct('>3i')
    const buffer = new ArrayBuffer(16)
    struct1.pack_into(buffer, 4, 1, 2, 3)
    const view = new DataView(buffer);
    // assertEquals(view.getInt32(0), 0, "view.getInt32(0) should be 0")
    assertEquals(view.getInt32(4), 1, "view.getInt32(4) should be 1")
    assertEquals(view.getInt32(8), 2, "view.getInt32(8) should be 2")
    assertEquals(view.getInt32(12), 3, "view.getInt32(12) should be 3")
});
