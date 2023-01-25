import { assertEquals, assertThrows } from "https://deno.land/std@0.173.0/testing/asserts.ts"
import { pack } from '../lib/struct.ts';

Deno.test("Python Examples pack(\">h\", 99999)", () => {
    assertThrows(() => {
        pack(">h", 99999)
    }, "pack('>h', 99999) should throw")
});


Deno.test("Python Examples Demonstrate the difference between 's' and 'c' format characters:", () => {
    const buf = pack("=ccc", '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0))
    const exp = new Uint8Array(3)
    exp[0] = 1;
    exp[1] = 2;
    exp[2] = 3;
    assertEquals(buf, exp.buffer)
    // pack("@3s", b'123') // todo
});

// TODO
// Unpacked fields can be named by assigning them to variables or by wrapping the result in a named tuple:record = b'raymond   \x32\x12\x08\x01\x08'
// name, serialnum, school, gradelevel = unpack('<10sHHb', record)
// 
// from collections import namedtuple
// Student = namedtuple('Student', 'name serialnum school gradelevel')
// Student._make(unpack('<10sHHb', record))
// Student(name=b'raymond   ', serialnum=4658, school=264, gradelevel=8)