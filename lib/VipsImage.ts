import { VipsImageType } from "./enums.ts";
import { VipsInterpretation } from "./enums.ts";
import { VipsCoding } from "./enums.ts";
import { VipsBandFormat } from "./enums.ts";
import { packModel, setupStruct, VFFIBase } from "./VFFIBase.ts";

// glib 
// const tSize = Deno.build.os === "windows" ? 'Q' : 'I';
// const tSize = 'Q';

// const model_VipsObject: string =
//  // GObject parent_instance;
// "P" + // GTypeInstance  g_type_instance; GTypeClass *g_class;// 0
// "I" + //guint          ref_count;  /* (atomic) */   // 1
// "P" + //GData         *qdata;                       // 2
// // end of GObject
// "i" + // gboolean constructed;                      // 3
// "i" + // gboolean static_object;                    // 4
// "P" + // VipsArgumentTable *argument_table;         // 5
// "p" + // char *nickname;                            // 6
// "p" + // char *description;                         // 7
// "i" + // gboolean preclose; == int                  // 8
// "i" + // gboolean close; == int                     // 9
// "ix" + // gboolean postclose; == int                 // 10
// tSize + // size_t local_memory;                       // 11
// "xxxxxxx"

export class VipsImage extends VFFIBase {
    constructor() {
        super();
    }
    @packModel("b79x")
    public gObjectdummy!: number;
    // "P" + // GTypeInstance  g_type_instance; GTypeClass *g_class;// 0
    //public gType!: Deno.PointerValue
    //guint          ref_count;  /* (atomic) */   // 1
    //public gRefCount!: number;
    // "P" + //GData         *qdata;                       // 2
    //public gData!: Deno.PointerValue;
    //guint          ref_count;  /* (atomic) */   // 1
    //public gConstructed!: number;
    //"i" + // gboolean static_object;                    // 4
    //public gStaticObj!: number;
    // "P" + // VipsArgumentTable *argument_table;         // 5
    //public gArgumentTable!: Deno.PointerValue;
    // "p" + // char *nickname;                            // 6
    //public gNickname!: Deno.PointerValue;
    // "p" + // char *description;                         // 7
    //public gDescription!: Deno.PointerValue;
    //"i" + // gboolean preclose; == int                  // 8
    //public gPreclose!: number;
    // "i" + // gboolean close; == int                     // 9
    //public gClose!: number;
    // "i" + // gboolean postclose; == int                 // 10
    //public gPostclose!: number;
    // tSize // size_t local_memory;                       // 11
    //public gLocal_memory!: bigint;
    // 8 bytes
    // VipsObject parent_instance;
    // is a pointer
    // get parent_instance!: Deno.PointerValue { return offsets[0].get(this.view) }
    // set parent_instance(v: Deno.PointerValue) { offsets[0].set(this.view, v) }
    /*< private >*/
    /* We have to keep these names for compatibility with the old API.
     * Don't use them though, use vips_image_get_width() and friends.
     */
    /* image widith, in pixels 4 Byte */
    @packModel("i")
    public Xsize!: number;

    /* image height, in pixels 4 Byte */
    @packModel("i")
    public Ysize!: number;

    /* number of image bands 4 Byte */
    @packModel("i")
    public Bands!: number;

    /* pixel format 4 Byte */
    @packModel("i")
    public BandFmt!: VipsBandFormat;

    /* pixel coding 4 Byte */
    @packModel("i")
    public Coding!: VipsCoding;

    /* pixel interpretation 4 Byte */
    @packModel("i")
    public Type!: VipsInterpretation;

    /* horizontal pixels per millimetre 8 Byte */
    @packModel("d")
    public Xres!: number;

    /* vertical pixels per millimetre 8 Byte */
    @packModel("d")
    public Yres!: number;

    /* image origin hint 4 Byte */
    @packModel("i")
    public Xoffset!: number;

    /* image origin hint 4 Byte */
    @packModel("i")
    public Yoffset!: number;

    /* No longer used, the names are here for compat with very, very old 
     * code. 4 Byte
     */
    @packModel("i")
    public Length!: number;
    /**
     * short Compression;
     * 2 Byte
     */
    @packModel("h")
    public Compression!: number;

    /**
     * short Level;
     * 2 Byte
     */
    @packModel("h")
    public Level!: number;

    /**
     * int Bbits;
     * was number of bits in this format
     * 4 Byte
     */
    @packModel("i")
    public Bbits!: number;


    /* Old code expects to see this member, newer code has a param on
     * eval().
     * VipsProgress *time;
     * 8 bytes is a pointer
     */
    @packModel("p")
    public time!: Deno.PointerValue;


    /* Derived fields that some code can fiddle with. New code should use
     * vips_image_get_history() and friends.
     */

    /*
     * don't use, see vips_image_get_history()
     * char *Hist
     * 8 bytes is a pointer
     */
    @packModel("p")
    public Hist!: Deno.PointerValue;

    /*
     * pointer to copy of filename
     * char *filename
     * 8 bytes is a pointer
     */
    @packModel("p")
    public filename!: Deno.PointerValue;

    /*
     * start of image data for WIO
     * VipsPel *data
     * 8 bytes is a pointer
     */
    @packModel("p")
    public data!: Deno.PointerValue;

    /* set to non-zero to block eval 4 Byte */
    @packModel("i")
    public kill!: number;


    /* Everything below this private and only used internally by
     * VipsImage.
     */

    /* During vips image read and write we need temporary float-sized
     * fields in the struct for staging xres/yres. Don't use these any
     * other time.
     */

    @packModel("f")
    public Xres_float!: number;

    /** Float 4 Byte */
    @packModel("f")
    public Yres_float!: number;

    /*
     * mode string passed to _new()
     * char *mode
     * 8 bytes is a pointer
     */
    @packModel("p")
    public mode!: Deno.PointerValue;

    /* descriptor type 4 Byte */
    @packModel("b")
    public dtype!: VipsImageType;

    /* file descriptor 4 Byte */
    @packModel("i")
    public fd!: VipsImageType;

    /*
     * pointer to the start of an mmap file
     * void * baseaddr
     * 8 bytes is a pointer
     */
    @packModel("p")
    public baseaddr!: Deno.PointerValue;

    /* file descriptor 4 Byte */
    @packModel("i")
    public length!: number;

    /* size of mmap area 4 Byte */
    /* magic from header, endian-ness of image 4 Byte */
    @packModel("I")
    public magic!: number;

    /* Partial image stuff. All these fields are initialised 
     * to NULL and ignored unless set by vips_image_generate() etc.
     * VipsStartFn start_fn;
     * 8 bytes is a pointer
     */

    //     #viewstart_fn = new DataView(this.buffer, 138);
    //     get start_fn!: Deno.PointerValue { return Deno.UnsafeFnPointer.of(this.#viewstart_fn); }
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