import { VipsImageType } from "./enums.ts";
import { VipsInterpretation } from "./enums.ts";
import { VipsCoding } from "./enums.ts";
import { VipsBandFormat } from "./enums.ts";
import { buildPaser } from "./struct.ts";

const FIELDS: string =
    'x{80}' + // parent_instance 1
    'i' + // Xsize 2
    'i' + // Ysize 3
    'i' + // Bands 4
    'bbb{10}' + // enums: Bands VipsBandFormat VipsCoding VipsInterpretation 5 6 7
    'dd' + // Xres, Yres double 8 9
    'ii' + // Xoffset Yoffset 10 11
    'i' + // Length 12
    'h' + // short Compression; 13
    'h' + // short Level; 14
    'i' + // int Bbits; 15
    'p' + // VipsProgress *time; 16
    'p' + // char *Hist 17
    'p' + // char *filename 18
    'p' + // VipsPel *data 19
    'i' + // kill 20
    'ff' + // Xres_float, Yres_float 21 22
    'p' + // mode
    'b' + // dtype enum
    'i' + // fd int
    'p' + // baseaddr ptr
    'i' + // length
    'I' + // magic guint32
    'p' + // VipsStartFn
    'p' + // generate_fn
    'p' + // stop_fn
    'p' + // client2
    'p' + // sslock
    'p' + // regions
    'b' + // dhint enum
    'b' + // GHashTable
    'b' + // GSList
    'b' + // sizeof_header
    'b' + // windows
    'b' + // GSList * upstream;
    'b' + // GSList * downstream;
    'i' + // int serial;
    'p' + // GSList * history_list;
    'p' + // VipsImage * progress_signal;
    'p' + // gint64 file_length;
    '?' + // gboolean hint_set;
    '?' + // gboolean delete_on_close;
    'p' // char * delete_on_close_filename;

const { offsets: OFFSET, size: VipsImage_SIZE } = buildPaser(FIELDS, true)

export class VipsImage {
    private buffer: ArrayBuffer;
    private view: DataView;

    constructor(pointer?: Deno.PointerValue) {
        if (pointer) {
            this.buffer = Deno.UnsafePointerView.getArrayBuffer(pointer, VipsImage_SIZE);
            this.view = new DataView(this.buffer);
            // const b2 = new Uint8Array(this.buffer);
            // console.log(b2.subarray(OFFSET[1].offset, OFFSET[2].offset)); // Xsize OK
            // console.log(b2.subarray(OFFSET[2].offset, OFFSET[3].offset)); // Ysize OK
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
    get parent_instance(): Deno.PointerValue { return OFFSET[0].get(this.view, this.buffer) }
    set parent_instance(v: Deno.PointerValue) { OFFSET[0].set(this.view, v) }

    /*< private >*/

    /* We have to keep these names for compatibility with the old API.
     * Don't use them though, use vips_image_get_width() and friends.
     */
    /* image width, in pixels 4 Byte */
    get Xsize(): number { return OFFSET[1].get(this.view, this.buffer) }
    set Xsize(v: number) { OFFSET[1].set(this.view, v) }

    /* image height, in pixels 4 Byte */
    get Ysize(): number { return OFFSET[2].get(this.view, this.buffer) }
    set Ysize(v: number) { OFFSET[2].set(this.view, v) }

    /* number of image bands 4 Byte */
    get Bands(): number { return OFFSET[3].get(this.view, this.buffer) }
    set Bands(v: number) { OFFSET[3].set(this.view, v) }

    /* pixel format 4 Byte */
    get BandFmt(): VipsBandFormat { return OFFSET[4].get(this.view, this.buffer) }
    set BandFmt(v: VipsBandFormat) { OFFSET[4].set(this.view, v) }

    /* pixel coding 4 Byte */
    get Coding(): VipsCoding { return OFFSET[5].get(this.view, this.buffer) }
    set Coding(v: VipsCoding) {OFFSET[5].set(this.view, v) }

    /* pixel interpretation 4 Byte */
    get Type(): VipsInterpretation { return OFFSET[6].get(this.view, this.buffer) }
    set Type(v: VipsInterpretation) { OFFSET[6].set(this.view, v)}

    /* horizontal pixels per millimetre 8 Byte */
    get Xres(): number { return OFFSET[7].get(this.view, this.buffer) }
    set Xres(v: number) { OFFSET[7].set(this.view, v) }

    /* vertical pixels per millimetre 8 Byte */
    get Yres(): number { return OFFSET[8].get(this.view, this.buffer) }
    set Yres(v: number) { OFFSET[8].set(this.view, v) }

    /* image origin hint 4 Byte */
    get Xoffset(): number { return OFFSET[9].get(this.view, this.buffer) }
    set Xoffset(v: number) { OFFSET[9].set(this.view, v) }

    /* image origin hint 4 Byte */
    get Yoffset(): number { return OFFSET[10].get(this.view, this.buffer) }
    set Yoffset(v: number) {OFFSET[10].set(this.view, v) }

    /* No longer used, the names are here for compat with very, very old 
     * code. 4 Byte
     */
    get Length(): number {return OFFSET[11].get(this.view, this.buffer) }
    set Length(v: number) { OFFSET[11].set(this.view, v) }
    /**
     * short Compression;
     * 2 Byte
     */
    get Compression(): number { return OFFSET[12].get(this.view, this.buffer) }
    set Compression(v: number) {OFFSET[12].set(this.view, v) }

    /**
     * short Level;
     * 2 Byte
     */
    get Level(): number {return OFFSET[13].get(this.view, this.buffer) }
    set Level(v: number) { OFFSET[13].set(this.view, v) }


    /**
     * int Bbits;
     * was number of bits in this format
     * 4 Byte
     */
    get Bbits(): number { return OFFSET[14].get(this.view, this.buffer) }
    set Bbits(v: number) { OFFSET[14].set(this.view, v) }


    /* Old code expects to see this member, newer code has a param on
     * eval().
     * VipsProgress *time;
     * 8 bytes is a pointer
     */
    get time(): Deno.PointerValue { return OFFSET[15].get(this.view, this.buffer) }
    set time(v: Deno.PointerValue) { OFFSET[15].set(this.view, v) }


    /* Derived fields that some code can fiddle with. New code should use
     * vips_image_get_history() and friends.
     */

    /*
     * don't use, see vips_image_get_history()
     * char *Hist
     * 8 bytes is a pointer
     */
    get Hist(): Deno.PointerValue { return OFFSET[16].get(this.view, this.buffer) }
    set Hist(v: Deno.PointerValue) { OFFSET[16].set(this.view, v) }

    /*
     * pointer to copy of filename
     * char *filename
     * 8 bytes is a pointer
     */
    get filename(): Deno.PointerValue { return OFFSET[17].get(this.view, this.buffer) }
    set filename(v: Deno.PointerValue) { OFFSET[17].set(this.view, v) }


    /*
     * start of image data for WIO
     * VipsPel *data
     * 8 bytes is a pointer
     */
    get data(): Deno.PointerValue { return OFFSET[18].get(this.view, this.buffer) }
    set data(v: Deno.PointerValue) { OFFSET[18].set(this.view, v) }

    /* set to non-zero to block eval 4 Byte */
    get kill(): number { return OFFSET[19].get(this.view, this.buffer) }
    set kill(v: number) { OFFSET[19].set(this.view, v) }


    /* Everything below this private and only used internally by
     * VipsImage.
     */

    /* During vips image read and write we need temporary float-sized
     * fields in the struct for staging xres/yres. Don't use these any
     * other time.
     */

    get Xres_float(): number { return OFFSET[20].get(this.view, this.buffer) }
    set Xres_float(v: number) {OFFSET[20].set(this.view, v) }

    /** Float 4 Byte */
    get Yres_float(): number { return OFFSET[21].get(this.view, this.buffer) }
    set Yres_float(v: number) { OFFSET[21].set(this.view, v) }

    /*
     * mode string passed to _new()
     * char *mode
     * 8 bytes is a pointer
     */
    get mode(): Deno.PointerValue { return OFFSET[22].get(this.view, this.buffer) }
    set mode(v: Deno.PointerValue) {OFFSET[22].set(this.view, v) }

    /* descriptor type 4 Byte */
    get dtype(): VipsImageType { return OFFSET[23].get(this.view, this.buffer) }
    set dtype(v: VipsImageType) { OFFSET[23].set(this.view, v) }

    /* file descriptor 4 Byte */
    get fd(): VipsImageType { return OFFSET[24].get(this.view, this.buffer) }
    set fd(v: VipsImageType) { OFFSET[24].set(this.view, v) }

    /*
     * pointer to the start of an mmap file
     * void * baseaddr
     * 8 bytes is a pointer
     */
    get baseaddr(): Deno.PointerValue { return OFFSET[25].get(this.view, this.buffer) }
    set baseaddr(v: Deno.PointerValue) { OFFSET[25].set(this.view, v) }


    /* file descriptor 4 Byte */
    get length(): number { return OFFSET[26].get(this.view, this.buffer) }
    set length(v: number) { OFFSET[26].set(this.view, v) }

    /* size of mmap area 4 Byte */
    get magic(): number { return OFFSET[27].get(this.view, this.buffer) }
    /* magic from header, endian-ness of image 4 Byte */
    set magic(v: number) { OFFSET[27].set(this.view, v) }

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
