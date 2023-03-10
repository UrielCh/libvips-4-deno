import { VipsImageType } from "./enums.ts";
import { VipsInterpretation } from "./enums.ts";
import { VipsCoding } from "./enums.ts";
import { VipsBandFormat } from "./enums.ts";
import { packModel } from "./FFIMapper/mod.ts";

/**
 * GObject:
 *
 * The base object type.
 * 
 * All the fields in the `GObject` structure are private to the implementation
 * and should never be accessed directly.
 *
 * Since GLib 2.72, all #GObjects are guaranteed to be aligned to at least the
 * alignment of the largest basic GLib type (typically this is #guint64 or
 * #gdouble). If you need larger alignment for an element in a #GObject, you
 * should allocate it on the heap (aligned), or arrange for your #GObject to be
 * appropriately padded. This guarantee applies to the #GObject (or derived)
 * struct, the #GObjectClass (or derived) struct, and any private data allocated
 * by G_ADD_PRIVATE().
 * 
 * @souce https://gitlab.gnome.org/GNOME/glib/-/blob/main/gobject/gobject.h#L267
 */
export class GObject {
    @packModel("P")
    // GTypeInstance  g_type_instance; GTypeClass *g_class
    public gType!: Deno.PointerValue;
    // ref_count;  /* (atomic) */
    @packModel("I")
    public gRefCount!: number;

    @packModel("I") // unknown data
    public _gProtected1!: number;
    @packModel("P")
    //GData         *qdata;
    public gData!: Deno.PointerValue;
}

/**
 * gboolean are gint in C so 4 byte
 */
export type gboolean = number;
export type charStar = Deno.PointerValue;
/**
 * @source https://github.com/libvips/libvips/blob/master/libvips/include/vips/object.h#L426
 */
export class VipsObject extends GObject {
    /* Set after ->build() has run succesfully: construct is fully done
     * and checked.
     */
    @packModel("i")
    public constructed!: gboolean;

    /* Set for static objects which are allocated at startup and never
     * freed. These objects are ommitted from leak reports.
     */
    @packModel("i")
    public static_object!: gboolean;

    /* Table of argument instances for this class and any derived classes.
     * is a GHashTable in C
     */
    @packModel("P")
    argument_table!: Deno.PointerValue;

    /* Class properties (see below), duplicated in the instance so we can
     * get at them easily via the property system.
     */
    @packModel("p")
    nickname!: charStar;
    @packModel("p")
    description!: charStar;

    /* The pre/post/close callbacks are all fire-once. 
     */
    @packModel("i")
    public preclose!: gboolean;
    @packModel("i")
    public close!: gboolean;
    @packModel("i4x") // pad to 8 byte
    public postclose!: gboolean;

    // @packModel("i") // unknown type
    // public _internal1!: gboolean;
    /* Total memory allocated relative to this object, handy for
     * profiling.
     */
    @packModel("n")
    local_memory!: number;
}

/**
 * @source https://github.com/libvips/libvips/blob/master/libvips/include/vips/image.h#L181
 */
export class VipsImage extends VipsObject {
    /* We have to keep these names for compatibility with the old API.
     * Don't use them though, use vips_image_get_width() and friends.
     */
    /* image widith, in pixels */
    @packModel("i")
    public Xsize!: number;

    /* image height, in pixels */
    @packModel("i")
    public Ysize!: number;

    /* number of image bands */
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
    @packModel("I")
    public length!: number;

    /* size of mmap area 4 Byte */
    /* magic from header, endian-ness of image 4 Byte */
    @packModel("500xI")
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