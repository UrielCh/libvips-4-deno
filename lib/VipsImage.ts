import { VipsImageType } from "./enums.ts";
import { VipsInterpretation } from "./enums.ts";
import { VipsCoding } from "./enums.ts";
import { VipsBandFormat } from "./enums.ts";

const FIELDS = [
    6, // parent_instance
    4, // Xsize
    4, // Ysize
    4, // Bands
    4, // VipsBandFormat
    4, // VipsCoding
    4, // VipsInterpretation
    8, // Xres double
    8, // Yres double
    4, // Xoffset
    4, // Yoffset
    4, // Length
    2, // short Compression;
    2, // short Level;
    4, // int Bbits;
    8, // VipsProgress *time;
    8, // char *Hist
    8, // char *filename
    8, // VipsPel *data
    4, // kill
    4, // Xres_float
    4, // Yres_float
    8, // mode
    4, // dtype
    4, // fd
    8, // baseaddr
    4, // length
    4, // magic
    8, // VipsStartFn
    8, // generate_fn
    8, // stop_fn
    8, // client2
    8, // sslock
    8, // regions
    4, // dhint
    8, // GHashTable
    8, // GSList
    8, // sizeof_header
    8, // windows
    8, // GSList * upstream;
    8, // GSList * downstream;
    4, // int serial;
    8, // GSList * history_list;
    8, // VipsImage * progress_signal;
    8, // gint64 file_length;
    1, // gboolean hint_set;
    1, // gboolean delete_on_close;
    8, // char * delete_on_close_filename;
]

const OFFSET: number[] = [];
let VipsImage_SIZE = 0;
for (const v of FIELDS) {
    OFFSET.push(VipsImage_SIZE);
    VipsImage_SIZE += v;
}

export class VipsImage {
    private buffer: ArrayBuffer;
    private view: DataView;

    constructor(pointer?: Deno.PointerValue) {
        if (pointer) {
            this.buffer = Deno.UnsafePointerView.getArrayBuffer(pointer, VipsImage_SIZE);
            // console.log(this.buffer.byteLength);
            // console.log(this.buffer.slice(0, 100));
            // console.log(Object.keys(this.buffer));
            this.view = new DataView(this.buffer);   
            const b2 = new Uint8Array(this.buffer);
            console.log(b2.subarray(OFFSET[1], OFFSET[2])); // Xsize
            console.log(b2.subarray(OFFSET[2], OFFSET[3])); // Ysize
            // console.log(b2.subarray(OFFSET[3], OFFSET[4])); // Ysize
            // console.log(b2.subarray(8,12));
            // console.log(this.view.getInt32(6)); // ok
            // console.log(this.view.getInt32(10)); // ok
            // console.log(b2.subarray(8,12));
            // console.log(b2.subarray(12,16));

        } else {
            this.buffer = new ArrayBuffer(VipsImage_SIZE) // TMP aprox value
            this.view = new DataView(this.buffer)
        }
    }
    /**
     * get a view to the buffer at offset use for pointer
     * @param offset 
     * @returns an offseted DataView
     */
    #v(offset: number): DataView {
        return new DataView(this.buffer, offset);
    }
    // 8 bytes
    // VipsObject parent_instance;
    // is a pointer
    get parent_instance(): Deno.PointerValue { return Deno.UnsafePointer.of(this.view) }
    set parent_instance(v: Deno.PointerValue) { this.view.setBigUint64(OFFSET[0], v as bigint) }

    /*< private >*/

    /* We have to keep these names for compatibility with the old API.
     * Don't use them though, use vips_image_get_width() and friends.
     */
    /* image width, in pixels 4 Byte */
    get Xsize(): number { return this.view.getInt32(OFFSET[1]) }
    set Xsize(v: number) { this.view.setInt32(OFFSET[1], v) }

    /* image height, in pixels 4 Byte */
    get Ysize(): number { return this.view.getInt32(OFFSET[2]); }
    set Ysize(v: number) { this.view.setInt32(OFFSET[2], v) }

    /* number of image bands 4 Byte */
    get Bands(): number { return this.view.getInt32(OFFSET[3]) }
    set Bands(v: number) { this.view.setInt32(OFFSET[3], v) }

    /* pixel format 4 Byte */
    get BandFmt(): VipsBandFormat { return this.view.getInt32(OFFSET[4]) }
    set BandFmt(v: VipsBandFormat) { this.view.setInt32(OFFSET[4], v) }

    /* pixel coding 4 Byte */
    get Coding(): VipsCoding { return this.view.getInt32(OFFSET[5]) }
    set Coding(v: VipsCoding) { this.view.setInt32(OFFSET[5], v) }

    /* pixel interpretation 4 Byte */
    get Type(): VipsInterpretation { return this.view.getInt32(OFFSET[6]) }
    set Type(v: VipsInterpretation) { this.view.setInt32(OFFSET[6], v) }

    /* horizontal pixels per millimetre 8 Byte */
    get Xres(): number { return this.view.getFloat64(OFFSET[7]) }
    set Xres(v: number) { this.view.setFloat64(OFFSET[7], v) }

    /* vertical pixels per millimetre 8 Byte */
    get Yres(): number { return this.view.getFloat64(OFFSET[8]) }
    set Yres(v: number) { this.view.setFloat64(OFFSET[8], v) }

    /* image origin hint 4 Byte */
    get Xoffset(): number { return this.view.getInt32(OFFSET[9]) }
    set Xoffset(v: number) { this.view.setInt32(OFFSET[9], v) }

    /* image origin hint 4 Byte */
    get Yoffset(): number { return this.view.getInt32(OFFSET[10]) }
    set Yoffset(v: number) { this.view.setInt32(OFFSET[10], v) }

    /* No longer used, the names are here for compat with very, very old 
     * code. 4 Byte
     */
    get Length(): number { return this.view.getInt32(OFFSET[11]) }
    set Length(v: number) { this.view.setInt32(OFFSET[11], v) }
    /**
     * short Compression;
     * 2 Byte
     */
    get Compression(): number { return this.view.getInt16(OFFSET[12]) }
    set Compression(v: number) { this.view.setInt16(OFFSET[12], v) }

    /**
     * short Level;
     * 2 Byte
     */
    get Level(): number { return this.view.getInt16(OFFSET[13]); }
    set Level(v: number) { this.view.setInt16(OFFSET[13], v); }


    /**
     * int Bbits;
     * was number of bits in this format
     * 4 Byte
     */
    get Bbits(): number { return this.view.getInt32(OFFSET[14]) }
    set Bbits(v: number) { this.view.setInt32(OFFSET[14], v) }


    /* Old code expects to see this member, newer code has a param on
     * eval().
     * VipsProgress *time;
     * 8 bytes is a pointer
     */
    get time(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[15])) }
    set time(v: Deno.PointerValue) {this.view.setBigUint64(OFFSET[15], v as bigint) }


    /* Derived fields that some code can fiddle with. New code should use
     * vips_image_get_history() and friends.
     */

    /*
     * don't use, see vips_image_get_history()
     * char *Hist
     * 8 bytes is a pointer
     */
    get Hist(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[16])) }
    set Hist(v: Deno.PointerValue) { this.view.setBigUint64(OFFSET[16], v as bigint) }

    /*
     * pointer to copy of filename
     * char *filename
     * 8 bytes is a pointer
     */
    get filename(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[17])) }
    set filename(v: Deno.PointerValue) { this.view.setBigUint64(OFFSET[17], v as bigint) }


    /*
     * start of image data for WIO
     * VipsPel *data
     * 8 bytes is a pointer
     */
    get data(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[18])) }
    set data(v: Deno.PointerValue) {this.view.setBigUint64(OFFSET[18], v as bigint) }

    /* set to non-zero to block eval 4 Byte */
    get kill(): number { return this.view.getInt16(OFFSET[19]) }
    set kill(v: number) { this.view.setInt16(OFFSET[19], v) }


    /* Everything below this private and only used internally by
     * VipsImage.
     */

    /* During vips image read and write we need temporary float-sized
     * fields in the struct for staging xres/yres. Don't use these any
     * other time.
     */

    get Xres_float(): number { return this.view.getFloat64(OFFSET[20]) }
    set Xres_float(v: number) { this.view.setFloat64(OFFSET[20], v) }

    /** Float 4 Byte */
    get Yres_float(): number { return this.view.getFloat64(OFFSET[20]); }
    set Yres_float(v: number) { this.view.setFloat64(OFFSET[20], v) }

    /*
     * mode string passed to _new()
     * char *mode
     * 8 bytes is a pointer
     */
    get mode(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[21])) }
    set mode(v: Deno.PointerValue) { this.view.setBigUint64(OFFSET[21], v as bigint) }

    /* descriptor type 4 Byte */
    get dtype(): VipsImageType { return this.view.getInt32(OFFSET[22]); }
    set dtype(v: VipsImageType) { this.view.setInt32(OFFSET[22], v) }

    /* file descriptor 4 Byte */
    get fd(): VipsImageType { return this.view.getInt32(OFFSET[23]); }
    set fd(v: VipsImageType) { this.view.setInt32(OFFSET[23], v) }

    /*
     * pointer to the start of an mmap file
     * void * baseaddr
     * 8 bytes is a pointer
     */
    get baseaddr(): Deno.PointerValue { return Deno.UnsafePointer.of(this.#v(OFFSET[24])); }
    set baseaddr(v: Deno.PointerValue) {this.view.setBigUint64(OFFSET[24], v as bigint) }


    /* file descriptor 4 Byte */
    get length(): number { return this.view.getInt32(OFFSET[25]) }
    set length(v: number) { this.view.setInt32(OFFSET[25], v) }

    /* size of mmap area 4 Byte */
    get magic(): number { return this.view.getUint32(OFFSET[26]) }
    /* magic from header, endian-ness of image 4 Byte */
    set magic(v: number) { this.view.setUint32(OFFSET[26], v) }


	/* Partial image stuff. All these fields are initialised 
	 * to NULL and ignored unless set by vips_image_generate() etc.
     * VipsStartFn start_fn;
     * 8 bytes is a pointer
	 */

//     #viewstart_fn = new DataView(this.buffer, 138);
//     get start_fn(): Deno.PointerValue { return Deno.UnsafeFnPointer.of(this.#viewstart_fn); }
//     set start_fn(v: Deno.PointerValue) { this.#viewstart_fn.setBigUint64(8, v as bigint); }
    
// 	VipsGenerateFn generate_fn;
// 	VipsStopFn stop_fn;
//     void * client1;		/* user arguments */
// void * client2;
// GMutex * sslock;		/* start-stop lock */
// GSList * regions; 	/* list of regions current for this image */
// 	VipsDemandStyle dhint;	/* demand style hint */
// 
// /* Extra user-defined fields ... see vips_image_get() etc. */
// GHashTable * meta;	/* GhashTable of GValue */
// GSList * meta_traverse;	/* traverse order for Meta */
// 
// 	/* Part of mmap() read ... the sizeof() the header we skip from the
// 	 * file start. Usually VIPS_SIZEOF_HEADER, but can be something else
// 	 * for binary file read.
// 	 *
// 	 * guint64 so that we can guarantee to work even on systems with
// 	 * strange ideas about large files.
// 	 */
// 	gint64 sizeof_header;
// 
// /* If this is a large disc image, don't map the whole thing, instead
//  * have a set of windows shared between the regions active on the
//  * image. List of VipsWindow.
//  */
// GSList * windows;
// 
// /* Upstream/downstream relationships, built from args to 
//  * vips_demand_hint().
//  *
//  * We use these to invalidate downstream pixel buffers.
//  * Use 'serial' to spot circular dependencies.
//  *
//  * See also hint_set below.
//  */
// GSList * upstream;
// GSList * downstream;
// 	int serial;
// 
// /* Keep a list of recounted GValue strings so we can share hist
//  * efficiently.
//  */
// GSList * history_list;
// 
// /* The VipsImage (if any) we should signal eval progress on.
//  */
// VipsImage * progress_signal;
// 
// 	/* Record the file length here. We use this to stop ourselves mapping
// 	 * things beyond the end of the file in the case that the file has
// 	 * been truncated.
// 	 *
// 	 * gint64 so that we can guarantee to work even on systems with
// 	 * strange ideas about large files.
// 	 */
// 	gint64 file_length;
// 
// 	/* Set this when vips_demand_hint_array() is called, and check in any
// 	 * operation that will demand pixels from the image.
// 	 *
// 	 * We use vips_demand_hint_array() to build the tree of
// 	 * upstream/downstream relationships, so it's a mandatory thing.
// 	 */
// 	gboolean hint_set;
// 
// 	/* Delete-on-close is hard to do with signals and callbacks since we
// 	 * really need to do this in finalize after the fd has been closed,
// 	 * but you can't emit signals then.
// 	 *
// 	 * Also keep a private copy of the filename string to be deleted,
// 	 * since image->filename will be freed in _dispose().
// 	 */
// 	gboolean delete_on_close;
//    char * delete_on_close_filename;
}
