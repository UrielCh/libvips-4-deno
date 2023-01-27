// enums from image.h
export enum VipsDemandStyle {
	VIPS_DEMAND_STYLE_ERROR = -1,	
	VIPS_DEMAND_STYLE_SMALLTILE,	
	VIPS_DEMAND_STYLE_FATSTRIP,
	VIPS_DEMAND_STYLE_THINSTRIP,
	VIPS_DEMAND_STYLE_ANY			
}

/* Types of image descriptor we may have. The type field is advisory only: it
 * does not imply that any fields in IMAGE have valid data.
 */
export enum VipsImageType {
	VIPS_IMAGE_ERROR = -1,	
	VIPS_IMAGE_NONE,		/* no type set */
	VIPS_IMAGE_SETBUF,		/* malloced memory array */
	VIPS_IMAGE_SETBUF_FOREIGN,	/* memory array, don't free on close */
	VIPS_IMAGE_OPENIN,		/* input from fd with a window */
	VIPS_IMAGE_MMAPIN,		/* memory mapped input file */
	VIPS_IMAGE_MMAPINRW,		/* memory mapped read/write file */
	VIPS_IMAGE_OPENOUT,		/* output to fd */
	VIPS_IMAGE_PARTIAL		/* partial image */
}

export enum VipsInterpretation {
	VIPS_INTERPRETATION_ERROR = -1,
	VIPS_INTERPRETATION_MULTIBAND = 0,
	VIPS_INTERPRETATION_B_W = 1,
	VIPS_INTERPRETATION_HISTOGRAM = 10,
	VIPS_INTERPRETATION_XYZ = 12,
	VIPS_INTERPRETATION_LAB = 13,
	VIPS_INTERPRETATION_CMYK = 15,
	VIPS_INTERPRETATION_LABQ = 16,
	VIPS_INTERPRETATION_RGB = 17,
	VIPS_INTERPRETATION_CMC = 18,
	VIPS_INTERPRETATION_LCH = 19,
	VIPS_INTERPRETATION_LABS = 21,
	VIPS_INTERPRETATION_sRGB = 22,
	VIPS_INTERPRETATION_YXY = 23,
	VIPS_INTERPRETATION_FOURIER = 24,
	VIPS_INTERPRETATION_RGB16 = 25,
	VIPS_INTERPRETATION_GREY16 = 26,
	VIPS_INTERPRETATION_MATRIX = 27,
	VIPS_INTERPRETATION_scRGB = 28,
	VIPS_INTERPRETATION_HSV = 29,
	VIPS_INTERPRETATION_LAST = 30
}

export enum VipsBandFormat {
	VIPS_FORMAT_NOTSET = -1,
	VIPS_FORMAT_UCHAR = 0,
	VIPS_FORMAT_CHAR = 1,
	VIPS_FORMAT_USHORT = 2,
	VIPS_FORMAT_SHORT = 3,
	VIPS_FORMAT_UINT = 4,
	VIPS_FORMAT_INT = 5,
	VIPS_FORMAT_FLOAT = 6,
	VIPS_FORMAT_COMPLEX = 7,
	VIPS_FORMAT_DOUBLE = 8,
	VIPS_FORMAT_DPCOMPLEX = 9,
	VIPS_FORMAT_LAST = 10
}

export enum VipsCoding {
	VIPS_CODING_ERROR = -1,
	VIPS_CODING_NONE = 0,
	VIPS_CODING_LABQ = 2,
	VIPS_CODING_RAD = 6,
	VIPS_CODING_LAST = 7
}

export enum VipsAccess {
	VIPS_ACCESS_RANDOM = 0,
	VIPS_ACCESS_SEQUENTIAL,
	VIPS_ACCESS_SEQUENTIAL_UNBUFFERED,
	VIPS_ACCESS_LAST
}