import { assertEquals as assertEqualsOrg, assertThrows } from "https://deno.land/std@0.173.0/testing/asserts.ts"
import { pack, Struct, unpack } from '../lib/struct.ts';

function assertEquals<T>(actual: T, expected: T, msg = '') {
    assertEqualsOrg(actual, expected, `${msg} value: "${actual}" should be eq to "${expected}"`);
}

function assertEqualsBuf(actual: ArrayBufferLike, expected: ArrayBufferLike, msg = '') {
    const a = new Uint8Array(actual)
    const e = new Uint8Array(expected)
    assertEqualsOrg(a, e, `${msg} value: "${a}" should be eq to "${e}"`);
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


Deno.test("test int32", () => {
    assertEqualsBuf(pack('>i', 0), new Uint8Array([0, 0, 0, 0]).buffer, "big-endian 0 as int32")
    assertEqualsBuf(pack('>i', 1), new Uint8Array([0, 0, 0, 1]).buffer, "big-endian 1 as int32")
    assertEqualsBuf(pack('<i', 1), new Uint8Array([1, 0, 0, 0]).buffer, "little-endian 1 as int32")
    assertEqualsBuf(pack('>i', -1), new Uint8Array([255, 255, 255, 255]).buffer, "big-endian -1 as int32")
    assertEqualsBuf(pack('>i', 2 ** 31 - 1), new Uint8Array([127, 255, 255, 255]).buffer, "big-endian Max_value as int32")
    assertThrows(() => pack('>i', 2 ** 32), "big-endian 2**32 as int32")
});

Deno.test("test uint32", () => {
    assertEqualsBuf(pack('>I', 0), new Uint8Array([0, 0, 0, 0]).buffer, "big-endian 0 as uint32")
    assertEqualsBuf(pack('>I', 1), new Uint8Array([0, 0, 0, 1]).buffer, "big-endian 1 as uint32")
    assertEqualsBuf(pack('<I', 1), new Uint8Array([1, 0, 0, 0]).buffer, "little-endian 1 as uint32")
    assertEqualsBuf(pack('>I', 2 ** 32 - 1), new Uint8Array([255, 255, 255, 255]).buffer, "uint32 max value")
    assertThrows(() => pack('>I', -1), "big-endian -1 as uint32")
});

Deno.test("test int16", () => {
    assertEqualsBuf(pack('>h', 0), new Uint8Array([0, 0]).buffer, "big-endian 0 as int16")
    assertEqualsBuf(pack('>h', 1), new Uint8Array([0, 1]).buffer, "big-endian 1 as int16")
    assertEqualsBuf(pack('<h', 1), new Uint8Array([1, 0]).buffer, "little-endian 1 as int16")
    assertEqualsBuf(pack('>h', -1), new Uint8Array([255, 255]).buffer, "big-endian -1 as int16")
    assertEqualsBuf(pack('>h', 2 ** 15 - 1), new Uint8Array([127, 255]).buffer, "big-endian Max_value as int16")
    assertThrows(() => pack('>h', 2 ** 16), "big-endian 2**32 as int16")
});

Deno.test("test uint16", () => {
    assertEqualsBuf(pack('>H', 0), new Uint8Array([0, 0]).buffer, "big-endian 0 as uint16")
    assertEqualsBuf(pack('>H', 1), new Uint8Array([0, 1]).buffer, "big-endian 1 as uint16")
    assertEqualsBuf(pack('<H', 1), new Uint8Array([1, 0]).buffer, "little-endian 1 as uint16")
    assertEqualsBuf(pack('>H', 2 ** 16 - 1), new Uint8Array([255, 255]).buffer, "big-endian Max_value as uint16")
    assertThrows(() => pack('>H', 2 ** 16), "big-endian 2**32 as uint16")
});

Deno.test("test int8", () => {
    assertEqualsBuf(pack('b', 1), new Uint8Array([1]).buffer, "1 as int8")
    assertEqualsBuf(pack('b', -1), new Uint8Array([255]).buffer, "-1 as int8")
    assertEqualsBuf(pack('b', 127), new Uint8Array([127]).buffer, "Max_value as int8")
    assertEqualsBuf(pack('b', -128), new Uint8Array([128]).buffer, "Min_value as int8")
    assertThrows(() => pack('b', 128), "over max as int8")
    assertThrows(() => pack('b', -129), "under min as int8")
});

Deno.test("test uint8", () => {
    assertEqualsBuf(pack('>B', 0), new Uint8Array([0]).buffer, "0 as uint8")
    assertEqualsBuf(pack('>B', 1), new Uint8Array([1]).buffer, "1 as uint8")
    assertEqualsBuf(pack('>B', 255), new Uint8Array([255]).buffer, "Max_value as uint8")
    assertThrows(() => pack('B', 256), "over max as uint8")
    assertThrows(() => pack('B', -1), "under min as uint8")
});

Deno.test("test float32 BE", () => {
    assertEqualsBuf(pack('>f', 0), new Uint8Array([0, 0, 0, 0]).buffer, "0 as float")
    assertEqualsBuf(pack('>f', .000001), new Uint8Array([53, 134, 55, 189]).buffer, ".000001 as float")
    assertEqualsBuf(pack('>f', 1), new Uint8Array([63, 128, 0, 0]).buffer, "1 as float")
    assertEqualsBuf(pack('>f', -1), new Uint8Array([191, 128, 0, 0]).buffer, "-1 as float")
    assertEqualsBuf(pack('>f', 1024), new Uint8Array([68, 128, 0, 0]).buffer, "1024 as float")
    assertEqualsBuf(pack('>f', 1024.1), new Uint8Array([68, 128, 3, 51]).buffer, "1024.1 as float")
});

Deno.test("test float32 LE", () => {
    assertEqualsBuf(pack('<f', 0), new Uint8Array([0, 0, 0, 0]).buffer, "0 as float LE")
    assertEqualsBuf(pack('<f', .000001), new Uint8Array([189, 55, 134, 53]).buffer, ".000001 as float LE")
    assertEqualsBuf(pack('<f', 1), new Uint8Array([0, 0, 128, 63]).buffer, "1 as float LE")
    assertEqualsBuf(pack('<f', -1), new Uint8Array([0, 0, 128, 191]).buffer, "-1 as float LE")
    assertEqualsBuf(pack('<f', 1024), new Uint8Array([0, 0, 128, 68]).buffer, "1024 as float LE")
    assertEqualsBuf(pack('<f', 1024.1), new Uint8Array([51, 3, 128, 68]).buffer, "1024.1 as float LE")
});

Deno.test("test float64 BE", () => {
    assertEqualsBuf(pack('>d', 0), new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]).buffer, "0 as double BE")
    assertEqualsBuf(pack('>d', .000001), new Uint8Array([62, 176, 198, 247, 160, 181, 237, 141]).buffer, ".000001 as double BE")
    assertEqualsBuf(pack('>d', 1), new Uint8Array([63, 240, 0, 0, 0, 0, 0, 0]).buffer, "1 as double BE")
    assertEqualsBuf(pack('>d', -1), new Uint8Array([191, 240, 0, 0, 0, 0, 0, 0]).buffer, "-1 as double BE")
    assertEqualsBuf(pack('>d', 1024), new Uint8Array([64, 144, 0, 0, 0, 0, 0, 0]).buffer, "1024 as double BE")
    assertEqualsBuf(pack('>d', 1024.1), new Uint8Array([64, 144, 0, 102, 102, 102, 102, 102]).buffer, "1024.1 as double BE")
});

Deno.test("test float64 LE", () => {
    assertEqualsBuf(pack('<d', 0), new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]).buffer, "0 as double LE")
    assertEqualsBuf(pack('<d', .000001), new Uint8Array([141, 237, 181, 160, 247, 198, 176, 62]).buffer, ".000001 as double LE")
    assertEqualsBuf(pack('<d', 1), new Uint8Array([0, 0, 0, 0, 0, 0, 240, 63]).buffer, "1 as double LE")
    assertEqualsBuf(pack('<d', -1), new Uint8Array([0, 0, 0, 0, 0, 0, 240, 191]).buffer, "-1 as double LE")
    assertEqualsBuf(pack('<d', 1024), new Uint8Array([0, 0, 0, 0, 0, 0, 144, 64]).buffer, "1024 as double LE")
    assertEqualsBuf(pack('<d', 1024.1), new Uint8Array([102, 102, 102, 102, 102, 0, 144, 64]).buffer, "1024.1 as double LE")
});

// deno-lint-ignore no-unused-vars
const float16_tests = [
    {
        name: '0',
        value: 0,
        exposant: 0,
        mantisse: 0,
        bytes: new Uint8Array([0x00, 0x00]),
    },
    {
        name: 'smallest positive subnormal number',
        value: 0.000000059604645, // 1.40129846432e-45
        exposant: 0,
        mantisse: 1,
        bytes: new Uint8Array([0x00, 0x01]),
    },
    {
        name: 'largest positive subnormal number',
        value: 0.000060975552,
        exposant: 0,
        mantisse: 1023,
        bytes: new Uint8Array([0x3f, 0xff]),
    },
    {
        name: 'smallest positive normal number',
        value: 0.00006103515625,
        exposant: 1,
        mantisse: 0,
        bytes: new Uint8Array([0x40, 0x00]),
    },
    {
        name: 'nearest value to 1/3',
        // value: 0.333251953125, // 0.33325195
        value: 0.33325195,
        exposant: 13,
        mantisse: 341,
        bytes: new Uint8Array([0x35, 0x55]),
    },
    {
        name: 'largest positive normal number',
        value: 0.99951172,
        exposant: 14,
        mantisse: 1023,
        bytes: new Uint8Array([0x3b, 0xff]),
    },
    {
        name: 'one',
        value: 1,
        exposant: 15,
        mantisse: 0,
        bytes: new Uint8Array([0x3c, 0x00]),
    },
    {
        name: 'smallest number larger than one',
        value: 1.00097656,
        exposant: 15,
        mantisse: 1,
        bytes: new Uint8Array([0x3c, 0x01]),
    },
    {
        name: 'largest normal number',
        value: 65504,
        exposant: 30,
        mantisse: 1023,
        bytes: new Uint8Array([0x7b, 0xff]),
    },
    {
        name: 'infinity',
        value: Infinity,
        exposant: 31,
        mantisse: 0,
        bytes: new Uint8Array([0x7c, 0x00]),
    },
    {
        name: '-0',
        value: -0,
        exposant: 0,
        mantisse: 0,
        bytes: new Uint8Array([0x80, 0x00]),
    },
    {
        name: '-2',
        value: -2,
        exposant: 16,
        mantisse: 0,
        bytes: new Uint8Array([0xC0, 0x00]),
    },

    {
        name: '-infinity',
        value: -Infinity,
        exposant: 31,
        mantisse: 0,
        bytes: new Uint8Array([0xFC, 0x00]),
    },
];


/**
 * IEEE 754 binary16 (half-precision) floating-point format
 */
// Deno.test("test float12 BE", () => {
//     for (const v of float16_tests) {
//     }
// });
