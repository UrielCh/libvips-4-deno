import { VipsImageType } from "./enums.ts";
import { VipsInterpretation } from "./enums.ts";
import { VipsCoding } from "./enums.ts";
import { VipsBandFormat } from "./enums.ts";
import { Struct } from "./struct.ts";

// glib 
// const tSize = Deno.build.os === "windows" ? 'Q' : 'I';
const tSize = 'Q';

const model_VipsObject: string =
 // GObject parent_instance;
"P" + // GTypeInstance  g_type_instance; GTypeClass *g_class;// 0
"I" + //guint          ref_count;  /* (atomic) */   // 1
"P" + //GData         *qdata;                       // 2
// end of GObject
"i" + // gboolean constructed;                      // 3
"i" + // gboolean static_object;                    // 4
"P" + // VipsArgumentTable *argument_table;         // 5
"p" + // char *nickname;                            // 6
"p" + // char *description;                         // 7
"i" + // gboolean preclose; == int                  // 8
"i" + // gboolean close; == int                     // 9
"ix" + // gboolean postclose; == int                 // 10
tSize + // size_t local_memory;                       // 11
"xxxxxxx"


const { offsets: gOffsets, size: gSize } = new Struct(model_VipsObject)
// const { offsets: gOffsets2, size: gSize2 } = new Struct2(model_VipsObject)
// console.log({gOffsets, gOffsets2})
const model: string =
    'b79x' + // VipsObject parent_instance
    'iii' + // Xsize Ysize Bands 2 3 4
    'iii' + // enums: Bands VipsBandFormat VipsCoding VipsInterpretation 5 6 7
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

const { offsets, size } = new Struct(model)

export class VipsImage {
    private buffer: ArrayBuffer;
    private view: DataView;

    constructor(pointer?: Deno.PointerValue) {
        if (pointer) {
            this.buffer = Deno.UnsafePointerView.getArrayBuffer(pointer, size);
            this.view = new DataView(this.buffer);
            const b2 = new Uint8Array(this.buffer);
            // console.log(b2.subarray(OFFSET[1].offset, OFFSET[2].offset)); // Xsize OK
            // console.log(b2.subarray(0, 8).join(', ')); // Ysize OK
            // console.log(b2.subarray(8, 16).join(', ')); // Ysize OK
            // console.log(b2.subarray(16, 24).join(', ')); // Ysize OK
            // console.log(b2.subarray(24, 32).join(', ')); // Ysize OK
            // console.log(b2.subarray(32, 40).join(', ')); // Ysize OK
            // console.log(b2.subarray(40, 48).join(', ')); // Ysize OK
            // console.log(b2.subarray(48, 56).join(', ')); // Ysize OK
            // console.log(b2.subarray(56, 64).join(', ')); // Ysize OK
            // console.log(b2.subarray(64, 72).join(', ')); // Ysize OK
            // console.log(b2.subarray(72, 80).join(', ')); // Ysize OK
            // console.log(`gType: ${this.gType}`); // Ysize OK
            // console.log(`gRefCount: ${this.gRefCount}`); // Ysize OK
            // console.log(`gData: ${this.gData}`); // Ysize OK
            // console.log(`gType: ${this.gType}`); // Ysize OK
            // console.log(`gConstructed: ${this.gConstructed}`); // Ysize OK
            // console.log(`gStaticObj: ${this.gStaticObj}`); // Ysize OK
            // console.log(`gArgumentTable: ${this.gArgumentTable}`); // Ysize OK
            // console.log(`gNickname: ${this.gNickname}`); // Ysize OK
            // console.log(`gDescription: ${this.gDescription}`); // Ysize OK
            // console.log(`gPreclose: ${this.gPreclose}`); // Ysize OK
            // console.log(`gClose: ${this.gClose}`); // Ysize OK
            // console.log(`gLocal_memory: ${this.gLocal_memory}`); // Ysize OK
        } else {
            this.buffer = new ArrayBuffer(size) // TMP aprox value
            this.view = new DataView(this.buffer)
        }
    }

    asRef(): Deno.PointerValue {
        return Deno.UnsafePointer.of(this.buffer)
    }

    // "P" + // GTypeInstance  g_type_instance; GTypeClass *g_class;// 0
    get gType(): Deno.PointerValue { return gOffsets[0].get(this.view) }
    set gType(v: Deno.PointerValue) { gOffsets[0].set(this.view, v) }

    //guint          ref_count;  /* (atomic) */   // 1
    get gRefCount(): number { return gOffsets[1].get(this.view) }
    set gRefCount(v: number) { gOffsets[1].set(this.view, v) }

    // "P" + //GData         *qdata;                       // 2
    get gData(): Deno.PointerValue { return gOffsets[2].get(this.view) }
    set gData(v: Deno.PointerValue) { gOffsets[2].set(this.view, v) }

    //guint          ref_count;  /* (atomic) */   // 1
    get gConstructed(): number { return gOffsets[3].get(this.view) }
    set gConstructed(v: number) { gOffsets[3].set(this.view, v) }

    //"i" + // gboolean static_object;                    // 4
    get gStaticObj(): number { return gOffsets[4].get(this.view) }
    set gStaticObj(v: number) { gOffsets[4].set(this.view, v) }
    
    // "P" + // VipsArgumentTable *argument_table;         // 5
    get gArgumentTable(): Deno.PointerValue { return gOffsets[5].get(this.view) }
    set gArgumentTable(v: Deno.PointerValue) { gOffsets[5].set(this.view, v) }
    // "p" + // char *nickname;                            // 6
    get gNickname(): Deno.PointerValue { return gOffsets[6].get(this.view) }
    set gNickname(v: Deno.PointerValue) { gOffsets[6].set(this.view, v) }
    // "p" + // char *description;                         // 7
    get gDescription(): Deno.PointerValue { return gOffsets[7].get(this.view) }
    set gDescription(v: Deno.PointerValue) { gOffsets[7].set(this.view, v) }

    //"i" + // gboolean preclose; == int                  // 8
    get gPreclose(): number { return gOffsets[8].get(this.view) }
    set gPreclose(v: number) { gOffsets[8].set(this.view, v) }


    // "i" + // gboolean close; == int                     // 9
    get gClose(): number { return gOffsets[9].get(this.view) }
    set gClose(v: number) { gOffsets[9].set(this.view, v) }

    // "i" + // gboolean postclose; == int                 // 10
    get gPostclose(): number { return gOffsets[10].get(this.view) }
    set gPostclose(v: number) { gOffsets[10].set(this.view, v) }

    // tSize // size_t local_memory;                       // 11
    get gLocal_memory(): bigint { return gOffsets[11].get(this.view) }
    set gLocal_memory(v: bigint) { gOffsets[11].set(this.view, v) }    


    // 8 bytes
    // VipsObject parent_instance;
    // is a pointer
    // get parent_instance(): Deno.PointerValue { return offsets[0].get(this.view) }
    // set parent_instance(v: Deno.PointerValue) { offsets[0].set(this.view, v) }

    /*< private >*/

    /* We have to keep these names for compatibility with the old API.
     * Don't use them though, use vips_image_get_width() and friends.
     */
    /* image width, in pixels 4 Byte */
    get Xsize(): number { return offsets[1].get(this.view) }
    set Xsize(v: number) { offsets[1].set(this.view, v) }

    /* image height, in pixels 4 Byte */
    get Ysize(): number { return offsets[2].get(this.view) }
    set Ysize(v: number) { offsets[2].set(this.view, v) }

    /* number of image bands 4 Byte */
    get Bands(): number { return offsets[3].get(this.view) }
    set Bands(v: number) { offsets[3].set(this.view, v) }

    /* pixel format 4 Byte */
    get BandFmt(): VipsBandFormat { return offsets[4].get(this.view) }
    set BandFmt(v: VipsBandFormat) { offsets[4].set(this.view, v) }

    /* pixel coding 4 Byte */
    get Coding(): VipsCoding { return offsets[5].get(this.view) }
    set Coding(v: VipsCoding) {offsets[5].set(this.view, v) }

    /* pixel interpretation 4 Byte */
    get Type(): VipsInterpretation { return offsets[6].get(this.view) }
    set Type(v: VipsInterpretation) { offsets[6].set(this.view, v)}

    /* horizontal pixels per millimetre 8 Byte */
    get Xres(): number { return offsets[7].get(this.view) }
    set Xres(v: number) { offsets[7].set(this.view, v) }

    /* vertical pixels per millimetre 8 Byte */
    get Yres(): number { return offsets[8].get(this.view) }
    set Yres(v: number) { offsets[8].set(this.view, v) }

    /* image origin hint 4 Byte */
    get Xoffset(): number { return offsets[9].get(this.view) }
    set Xoffset(v: number) { offsets[9].set(this.view, v) }

    /* image origin hint 4 Byte */
    get Yoffset(): number { return offsets[10].get(this.view) }
    set Yoffset(v: number) {offsets[10].set(this.view, v) }

    /* No longer used, the names are here for compat with very, very old 
     * code. 4 Byte
     */
    get Length(): number {return offsets[11].get(this.view) }
    set Length(v: number) { offsets[11].set(this.view, v) }
    /**
     * short Compression;
     * 2 Byte
     */
    get Compression(): number { return offsets[12].get(this.view) }
    set Compression(v: number) {offsets[12].set(this.view, v) }

    /**
     * short Level;
     * 2 Byte
     */
    get Level(): number {return offsets[13].get(this.view) }
    set Level(v: number) { offsets[13].set(this.view, v) }


    /**
     * int Bbits;
     * was number of bits in this format
     * 4 Byte
     */
    get Bbits(): number { return offsets[14].get(this.view) }
    set Bbits(v: number) { offsets[14].set(this.view, v) }


    /* Old code expects to see this member, newer code has a param on
     * eval().
     * VipsProgress *time;
     * 8 bytes is a pointer
     */
    get time(): Deno.PointerValue { return offsets[15].get(this.view) }
    set time(v: Deno.PointerValue) { offsets[15].set(this.view, v) }


    /* Derived fields that some code can fiddle with. New code should use
     * vips_image_get_history() and friends.
     */

    /*
     * don't use, see vips_image_get_history()
     * char *Hist
     * 8 bytes is a pointer
     */
    get Hist(): Deno.PointerValue { return offsets[16].get(this.view) }
    set Hist(v: Deno.PointerValue) { offsets[16].set(this.view, v) }

    /*
     * pointer to copy of filename
     * char *filename
     * 8 bytes is a pointer
     */
    get filename(): Deno.PointerValue { return offsets[17].get(this.view) }
    set filename(v: Deno.PointerValue) { offsets[17].set(this.view, v) }


    /*
     * start of image data for WIO
     * VipsPel *data
     * 8 bytes is a pointer
     */
    get data(): Deno.PointerValue { return offsets[18].get(this.view) }
    set data(v: Deno.PointerValue) { offsets[18].set(this.view, v) }

    /* set to non-zero to block eval 4 Byte */
    get kill(): number { return offsets[19].get(this.view) }
    set kill(v: number) { offsets[19].set(this.view, v) }


    /* Everything below this private and only used internally by
     * VipsImage.
     */

    /* During vips image read and write we need temporary float-sized
     * fields in the struct for staging xres/yres. Don't use these any
     * other time.
     */

    get Xres_float(): number { return offsets[20].get(this.view) }
    set Xres_float(v: number) {offsets[20].set(this.view, v) }

    /** Float 4 Byte */
    get Yres_float(): number { return offsets[21].get(this.view) }
    set Yres_float(v: number) { offsets[21].set(this.view, v) }

    /*
     * mode string passed to _new()
     * char *mode
     * 8 bytes is a pointer
     */
    get mode(): Deno.PointerValue { return offsets[22].get(this.view) }
    set mode(v: Deno.PointerValue) {offsets[22].set(this.view, v) }

    /* descriptor type 4 Byte */
    get dtype(): VipsImageType { return offsets[23].get(this.view) }
    set dtype(v: VipsImageType) { offsets[23].set(this.view, v) }

    /* file descriptor 4 Byte */
    get fd(): VipsImageType { return offsets[24].get(this.view) }
    set fd(v: VipsImageType) { offsets[24].set(this.view, v) }

    /*
     * pointer to the start of an mmap file
     * void * baseaddr
     * 8 bytes is a pointer
     */
    get baseaddr(): Deno.PointerValue { return offsets[25].get(this.view) }
    set baseaddr(v: Deno.PointerValue) { offsets[25].set(this.view, v) }


    /* file descriptor 4 Byte */
    get length(): number { return offsets[26].get(this.view) }
    set length(v: number) { offsets[26].set(this.view, v) }

    /* size of mmap area 4 Byte */
    get magic(): number { return offsets[27].get(this.view) }
    /* magic from header, endian-ness of image 4 Byte */
    set magic(v: number) { offsets[27].set(this.view, v) }

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
