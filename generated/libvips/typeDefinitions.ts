export const ptr = (_type: unknown) => "pointer" as const;
export const buf = (_type: unknown) => "buffer" as const;
export const func = (_func: unknown) => "function" as const;
export const __off_t = "i64" as const;

export const char = "i8" as const;

/**
   * `char **`, C string array
   */
export const cstringArrayT = "buffer" as const;

/**
   * `const char *`, C string
   */
export const cstringT = "buffer" as const;

export const double = "f64" as const;

export const float = "f32" as const;

export const gint = "i32" as const;

export const gint64 = "i64" as const;

export const gsize = "u64" as const;

export const int = "i32" as const;

export const long = "i64" as const;

export const size_t = "u64" as const;

export const unsignedChar = "u8" as const;

export const unsignedInt = "u32" as const;

export const unsignedLong = "u64" as const;

export const VipsArgumentTable = "i32" as const;

export const VipsImage = "void" as const;

/**
 * VipsPel:
 *
 * A picture element. Cast this to whatever the associated VipsBandFormat says
 * to get the value.
 */
export const VipsPel = "u8" as const;

export const VipsRegion = "void" as const;

/******** Start enums ********/
export const enum _RegionType {
  VIPS_REGION_NONE,
  VIPS_REGION_BUFFER,
  VIPS_REGION_OTHER_REGION,
  VIPS_REGION_OTHER_IMAGE,
  VIPS_REGION_WINDOW,
}
export const _RegionTypeT = unsignedInt;

export const enum im_arch_type {
  IM_ARCH_NATIVE,
  IM_ARCH_BYTE_SWAPPED,
  IM_ARCH_LSB_FIRST,
  IM_ARCH_MSB_FIRST,
}
export const im_arch_typeT = unsignedInt;

export const enum im_fn_flags {
  IM_FN_NONE = 0x0,
  IM_FN_PIO = 0x1,
  IM_FN_TRANSFORM = 0x2,
  IM_FN_PTOP = 0x4,
  IM_FN_NOCACHE = 0x8,
}
export const im_fn_flagsT = unsignedInt;

export const enum im_type_flags {
  IM_TYPE_NONE = 0x0,
  IM_TYPE_OUTPUT = 0x1,
  IM_TYPE_ARG = 0x2,
  IM_TYPE_RW = 0x4,
}
export const im_type_flagsT = unsignedInt;

export const enum ImMaskType {
  IM_MASK_IDEAL_HIGHPASS = 0,
  IM_MASK_IDEAL_LOWPASS = 1,
  IM_MASK_BUTTERWORTH_HIGHPASS = 2,
  IM_MASK_BUTTERWORTH_LOWPASS = 3,
  IM_MASK_GAUSS_HIGHPASS = 4,
  IM_MASK_GAUSS_LOWPASS = 5,
  IM_MASK_IDEAL_RINGPASS = 6,
  IM_MASK_IDEAL_RINGREJECT = 7,
  IM_MASK_BUTTERWORTH_RINGPASS = 8,
  IM_MASK_BUTTERWORTH_RINGREJECT = 9,
  IM_MASK_GAUSS_RINGPASS = 10,
  IM_MASK_GAUSS_RINGREJECT = 11,
  IM_MASK_IDEAL_BANDPASS = 12,
  IM_MASK_IDEAL_BANDREJECT = 13,
  IM_MASK_BUTTERWORTH_BANDPASS = 14,
  IM_MASK_BUTTERWORTH_BANDREJECT = 15,
  IM_MASK_GAUSS_BANDPASS = 16,
  IM_MASK_GAUSS_BANDREJECT = 17,
  IM_MASK_FRACTAL_FLT = 18,
}
export const ImMaskTypeT = unsignedInt;

export const enum RegionType {
  VIPS_REGION_NONE,
  VIPS_REGION_BUFFER,
  VIPS_REGION_OTHER_REGION,
  VIPS_REGION_OTHER_IMAGE,
  VIPS_REGION_WINDOW,
}
export const RegionTypeT = unsignedInt;

export const enum VipsAccess {
  VIPS_ACCESS_RANDOM,
  VIPS_ACCESS_SEQUENTIAL,
  VIPS_ACCESS_SEQUENTIAL_UNBUFFERED,
  VIPS_ACCESS_LAST,
}
export const VipsAccessT = unsignedInt;

export const enum VipsAlign {
  VIPS_ALIGN_LOW,
  VIPS_ALIGN_CENTRE,
  VIPS_ALIGN_HIGH,
  VIPS_ALIGN_LAST,
}
export const VipsAlignT = unsignedInt;

export const enum VipsAngle {
  VIPS_ANGLE_D0,
  VIPS_ANGLE_D90,
  VIPS_ANGLE_D180,
  VIPS_ANGLE_D270,
  VIPS_ANGLE_LAST,
}
export const VipsAngleT = unsignedInt;

export const enum VipsAngle45 {
  VIPS_ANGLE45_D0,
  VIPS_ANGLE45_D45,
  VIPS_ANGLE45_D90,
  VIPS_ANGLE45_D135,
  VIPS_ANGLE45_D180,
  VIPS_ANGLE45_D225,
  VIPS_ANGLE45_D270,
  VIPS_ANGLE45_D315,
  VIPS_ANGLE45_LAST,
}
export const VipsAngle45T = unsignedInt;

export const enum VipsArgumentFlags {
  VIPS_ARGUMENT_NONE = 0x00,
  VIPS_ARGUMENT_REQUIRED = 0x01,
  VIPS_ARGUMENT_CONSTRUCT = 0x02,
  VIPS_ARGUMENT_SET_ONCE = 0x04,
  VIPS_ARGUMENT_SET_ALWAYS = 0x08,
  VIPS_ARGUMENT_INPUT = 0x10,
  VIPS_ARGUMENT_OUTPUT = 0x20,
  VIPS_ARGUMENT_DEPRECATED = 0x40,
  VIPS_ARGUMENT_MODIFY = 0x80,
}
export const VipsArgumentFlagsT = unsignedInt;

export const enum VipsBandFormat {
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
  VIPS_FORMAT_LAST = 10,
}
export const VipsBandFormatT = int;

export const enum VipsBBits {
  IM_BBITS_BYTE = 0x08,
  IM_BBITS_SHORT = 0x10,
  IM_BBITS_INT = 0x20,
  IM_BBITS_FLOAT = 0x20,
  IM_BBITS_COMPLEX = 0x40,
  IM_BBITS_DOUBLE = 0x40,
  IM_BBITS_DPCOMPLEX = 0x80,
}
export const VipsBBitsT = unsignedInt;

export const enum VipsBlendMode {
  VIPS_BLEND_MODE_CLEAR,
  VIPS_BLEND_MODE_SOURCE,
  VIPS_BLEND_MODE_OVER,
  VIPS_BLEND_MODE_IN,
  VIPS_BLEND_MODE_OUT,
  VIPS_BLEND_MODE_ATOP,
  VIPS_BLEND_MODE_DEST,
  VIPS_BLEND_MODE_DEST_OVER,
  VIPS_BLEND_MODE_DEST_IN,
  VIPS_BLEND_MODE_DEST_OUT,
  VIPS_BLEND_MODE_DEST_ATOP,
  VIPS_BLEND_MODE_XOR,
  VIPS_BLEND_MODE_ADD,
  VIPS_BLEND_MODE_SATURATE,
  VIPS_BLEND_MODE_MULTIPLY,
  VIPS_BLEND_MODE_SCREEN,
  VIPS_BLEND_MODE_OVERLAY,
  VIPS_BLEND_MODE_DARKEN,
  VIPS_BLEND_MODE_LIGHTEN,
  VIPS_BLEND_MODE_COLOUR_DODGE,
  VIPS_BLEND_MODE_COLOUR_BURN,
  VIPS_BLEND_MODE_HARD_LIGHT,
  VIPS_BLEND_MODE_SOFT_LIGHT,
  VIPS_BLEND_MODE_DIFFERENCE,
  VIPS_BLEND_MODE_EXCLUSION,
  VIPS_BLEND_MODE_LAST,
}
export const VipsBlendModeT = unsignedInt;

export const enum VipsCoding {
  VIPS_CODING_ERROR = -1,
  VIPS_CODING_NONE = 0,
  VIPS_CODING_LABQ = 2,
  VIPS_CODING_RAD = 6,
  VIPS_CODING_LAST = 7,
}
export const VipsCodingT = int;

export const enum VipsCombine {
  VIPS_COMBINE_MAX,
  VIPS_COMBINE_SUM,
  VIPS_COMBINE_MIN,
  VIPS_COMBINE_LAST,
}
export const VipsCombineT = unsignedInt;

export const enum VipsCombineMode {
  VIPS_COMBINE_MODE_SET,
  VIPS_COMBINE_MODE_ADD,
  VIPS_COMBINE_MODE_LAST,
}
export const VipsCombineModeT = unsignedInt;

export const enum VipsCompassDirection {
  VIPS_COMPASS_DIRECTION_CENTRE,
  VIPS_COMPASS_DIRECTION_NORTH,
  VIPS_COMPASS_DIRECTION_EAST,
  VIPS_COMPASS_DIRECTION_SOUTH,
  VIPS_COMPASS_DIRECTION_WEST,
  VIPS_COMPASS_DIRECTION_NORTH_EAST,
  VIPS_COMPASS_DIRECTION_SOUTH_EAST,
  VIPS_COMPASS_DIRECTION_SOUTH_WEST,
  VIPS_COMPASS_DIRECTION_NORTH_WEST,
  VIPS_COMPASS_DIRECTION_LAST,
}
export const VipsCompassDirectionT = unsignedInt;

export const enum VipsDemandStyle {
  VIPS_DEMAND_STYLE_ERROR = -1,
  VIPS_DEMAND_STYLE_SMALLTILE,
  VIPS_DEMAND_STYLE_FATSTRIP,
  VIPS_DEMAND_STYLE_THINSTRIP,
  VIPS_DEMAND_STYLE_ANY,
}
export const VipsDemandStyleT = int;

export const enum VipsDirection {
  VIPS_DIRECTION_HORIZONTAL,
  VIPS_DIRECTION_VERTICAL,
  VIPS_DIRECTION_LAST,
}
export const VipsDirectionT = unsignedInt;

export const enum VipsExtend {
  VIPS_EXTEND_BLACK,
  VIPS_EXTEND_COPY,
  VIPS_EXTEND_REPEAT,
  VIPS_EXTEND_MIRROR,
  VIPS_EXTEND_WHITE,
  VIPS_EXTEND_BACKGROUND,
  VIPS_EXTEND_LAST,
}
export const VipsExtendT = unsignedInt;

/**
 *
 * VipsFailOn:
 * @VIPS_FAIL_ON_NONE: never stop
 * @VIPS_FAIL_ON_TRUNCATED: stop on image truncated, nothing else
 * @VIPS_FAIL_ON_ERROR: stop on serious error or truncation
 * @VIPS_FAIL_ON_WARNING: stop on anything, even warnings
 *
 * How sensitive loaders are to errors, from never stop (very insensitive), to
 * stop on the smallest warning (very sensitive).
 *
 * Each one implies the ones before it, so #VIPS_FAIL_ON_ERROR implies
 * #VIPS_FAIL_ON_TRUNCATED.
 */
export const enum VipsFailOn {
  VIPS_FAIL_ON_NONE,
  VIPS_FAIL_ON_TRUNCATED,
  VIPS_FAIL_ON_ERROR,
  VIPS_FAIL_ON_WARNING,
  VIPS_FAIL_ON_LAST,
}
/**
 *
 * VipsFailOn:
 * @VIPS_FAIL_ON_NONE: never stop
 * @VIPS_FAIL_ON_TRUNCATED: stop on image truncated, nothing else
 * @VIPS_FAIL_ON_ERROR: stop on serious error or truncation
 * @VIPS_FAIL_ON_WARNING: stop on anything, even warnings
 *
 * How sensitive loaders are to errors, from never stop (very insensitive), to
 * stop on the smallest warning (very sensitive).
 *
 * Each one implies the ones before it, so #VIPS_FAIL_ON_ERROR implies
 * #VIPS_FAIL_ON_TRUNCATED.
 */
export const VipsFailOnT = unsignedInt;

/**
 * VipsForeignDzContainer:
 * @VIPS_FOREIGN_DZ_CONTAINER_FS: write tiles to the filesystem
 * @VIPS_FOREIGN_DZ_CONTAINER_ZIP: write tiles to a zip file
 * @VIPS_FOREIGN_DZ_CONTAINER_SZI: write to a szi file
 *
 * How many pyramid layers to create.
 */
export const enum VipsForeignDzContainer {
  VIPS_FOREIGN_DZ_CONTAINER_FS,
  VIPS_FOREIGN_DZ_CONTAINER_ZIP,
  VIPS_FOREIGN_DZ_CONTAINER_SZI,
  VIPS_FOREIGN_DZ_CONTAINER_LAST,
}
/**
 * VipsForeignDzContainer:
 * @VIPS_FOREIGN_DZ_CONTAINER_FS: write tiles to the filesystem
 * @VIPS_FOREIGN_DZ_CONTAINER_ZIP: write tiles to a zip file
 * @VIPS_FOREIGN_DZ_CONTAINER_SZI: write to a szi file
 *
 * How many pyramid layers to create.
 */
export const VipsForeignDzContainerT = unsignedInt;

/**
 * VipsForeignDzDepth:
 * @VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL: create layers down to 1x1 pixel
 * @VIPS_FOREIGN_DZ_DEPTH_ONETILE: create layers down to 1x1 tile
 * @VIPS_FOREIGN_DZ_DEPTH_ONE: only create a single layer
 *
 * How many pyramid layers to create.
 */
export const enum VipsForeignDzDepth {
  VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL,
  VIPS_FOREIGN_DZ_DEPTH_ONETILE,
  VIPS_FOREIGN_DZ_DEPTH_ONE,
  VIPS_FOREIGN_DZ_DEPTH_LAST,
}
/**
 * VipsForeignDzDepth:
 * @VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL: create layers down to 1x1 pixel
 * @VIPS_FOREIGN_DZ_DEPTH_ONETILE: create layers down to 1x1 tile
 * @VIPS_FOREIGN_DZ_DEPTH_ONE: only create a single layer
 *
 * How many pyramid layers to create.
 */
export const VipsForeignDzDepthT = unsignedInt;

/**
 * VipsForeignDzLayout:
 * @VIPS_FOREIGN_DZ_LAYOUT_DZ: use DeepZoom directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_ZOOMIFY: use Zoomify directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_GOOGLE: use Google maps directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_IIIF: use IIIF v2 directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_IIIF3: use IIIF v3 directory layout
 *
 * What directory layout and metadata standard to use.
 */
export const enum VipsForeignDzLayout {
  VIPS_FOREIGN_DZ_LAYOUT_DZ,
  VIPS_FOREIGN_DZ_LAYOUT_ZOOMIFY,
  VIPS_FOREIGN_DZ_LAYOUT_GOOGLE,
  VIPS_FOREIGN_DZ_LAYOUT_IIIF,
  VIPS_FOREIGN_DZ_LAYOUT_IIIF3,
  VIPS_FOREIGN_DZ_LAYOUT_LAST,
}
/**
 * VipsForeignDzLayout:
 * @VIPS_FOREIGN_DZ_LAYOUT_DZ: use DeepZoom directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_ZOOMIFY: use Zoomify directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_GOOGLE: use Google maps directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_IIIF: use IIIF v2 directory layout
 * @VIPS_FOREIGN_DZ_LAYOUT_IIIF3: use IIIF v3 directory layout
 *
 * What directory layout and metadata standard to use.
 */
export const VipsForeignDzLayoutT = unsignedInt;

export const enum VipsForeignFlags {
  VIPS_FOREIGN_NONE = 0,
  VIPS_FOREIGN_PARTIAL = 1,
  VIPS_FOREIGN_BIGENDIAN = 2,
  VIPS_FOREIGN_SEQUENTIAL = 4,
  VIPS_FOREIGN_ALL = 7,
}
export const VipsForeignFlagsT = unsignedInt;

/**
 * VipsForeignHeifCompression:
 * @VIPS_FOREIGN_HEIF_COMPRESSION_HEVC: x265
 * @VIPS_FOREIGN_HEIF_COMPRESSION_AVC: x264
 * @VIPS_FOREIGN_HEIF_COMPRESSION_JPEG: jpeg
 * @VIPS_FOREIGN_HEIF_COMPRESSION_AV1: aom
 *
 * The compression format to use inside a HEIF container.
 *
 * This is assumed to use the same numbering as %heif_compression_format.
 */
export const enum VipsForeignHeifCompression {
  VIPS_FOREIGN_HEIF_COMPRESSION_HEVC = 1,
  VIPS_FOREIGN_HEIF_COMPRESSION_AVC = 2,
  VIPS_FOREIGN_HEIF_COMPRESSION_JPEG = 3,
  VIPS_FOREIGN_HEIF_COMPRESSION_AV1 = 4,
  VIPS_FOREIGN_HEIF_COMPRESSION_LAST,
}
/**
 * VipsForeignHeifCompression:
 * @VIPS_FOREIGN_HEIF_COMPRESSION_HEVC: x265
 * @VIPS_FOREIGN_HEIF_COMPRESSION_AVC: x264
 * @VIPS_FOREIGN_HEIF_COMPRESSION_JPEG: jpeg
 * @VIPS_FOREIGN_HEIF_COMPRESSION_AV1: aom
 *
 * The compression format to use inside a HEIF container.
 *
 * This is assumed to use the same numbering as %heif_compression_format.
 */
export const VipsForeignHeifCompressionT = unsignedInt;

/**
 * VipsForeignJpegSubsample:
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_AUTO: default preset
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_ON: always perform subsampling
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_OFF: never perform subsampling
 *
 * Set jpeg subsampling mode.
 *
 * DEPRECATED: use #VipsForeignSubsample
 */
export const enum VipsForeignJpegSubsample {
  VIPS_FOREIGN_JPEG_SUBSAMPLE_AUTO,
  VIPS_FOREIGN_JPEG_SUBSAMPLE_ON,
  VIPS_FOREIGN_JPEG_SUBSAMPLE_OFF,
  VIPS_FOREIGN_JPEG_SUBSAMPLE_LAST,
}
/**
 * VipsForeignJpegSubsample:
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_AUTO: default preset
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_ON: always perform subsampling
 * @VIPS_FOREIGN_JPEG_SUBSAMPLE_OFF: never perform subsampling
 *
 * Set jpeg subsampling mode.
 *
 * DEPRECATED: use #VipsForeignSubsample
 */
export const VipsForeignJpegSubsampleT = unsignedInt;

/**
 * VipsForeignPngFilter:
 * @VIPS_FOREIGN_PNG_FILTER_NONE: no filtering
 * @VIPS_FOREIGN_PNG_FILTER_SUB: difference to the left
 * @VIPS_FOREIGN_PNG_FILTER_UP: difference up
 * @VIPS_FOREIGN_PNG_FILTER_AVG: average of left and up
 * @VIPS_FOREIGN_PNG_FILTER_PAETH: pick best neighbor predictor automatically
 * @VIPS_FOREIGN_PNG_FILTER_ALL: adaptive
 *
 * http://www.w3.org/TR/PNG-Filters.html
 * The values mirror those of png.h in libpng.
 */
export const enum VipsForeignPngFilter {
  VIPS_FOREIGN_PNG_FILTER_NONE = 8,
  VIPS_FOREIGN_PNG_FILTER_SUB = 16,
  VIPS_FOREIGN_PNG_FILTER_UP = 32,
  VIPS_FOREIGN_PNG_FILTER_AVG = 64,
  VIPS_FOREIGN_PNG_FILTER_PAETH = 128,
  VIPS_FOREIGN_PNG_FILTER_ALL = 248,
}
/**
 * VipsForeignPngFilter:
 * @VIPS_FOREIGN_PNG_FILTER_NONE: no filtering
 * @VIPS_FOREIGN_PNG_FILTER_SUB: difference to the left
 * @VIPS_FOREIGN_PNG_FILTER_UP: difference up
 * @VIPS_FOREIGN_PNG_FILTER_AVG: average of left and up
 * @VIPS_FOREIGN_PNG_FILTER_PAETH: pick best neighbor predictor automatically
 * @VIPS_FOREIGN_PNG_FILTER_ALL: adaptive
 *
 * http://www.w3.org/TR/PNG-Filters.html
 * The values mirror those of png.h in libpng.
 */
export const VipsForeignPngFilterT = unsignedInt;

/**
 * VipsForeignPpmFormat:
 * @VIPS_FOREIGN_PPM_FORMAT_PBM: portable bitmap
 * @VIPS_FOREIGN_PPM_FORMAT_PGM: portable greymap
 * @VIPS_FOREIGN_PPM_FORMAT_PPM: portable pixmap
 * @VIPS_FOREIGN_PPM_FORMAT_PFM: portable float map
 *
 * The netpbm file format to save as.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PBM images are single bit.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PGM images are 8, 16, or 32-bits, one band.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PPM images are 8, 16, or 32-bits, three bands.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PFM images are 32-bit float pixels.
 */
export const enum VipsForeignPpmFormat {
  VIPS_FOREIGN_PPM_FORMAT_PBM,
  VIPS_FOREIGN_PPM_FORMAT_PGM,
  VIPS_FOREIGN_PPM_FORMAT_PPM,
  VIPS_FOREIGN_PPM_FORMAT_PFM,
  VIPS_FOREIGN_PPM_FORMAT_LAST,
}
/**
 * VipsForeignPpmFormat:
 * @VIPS_FOREIGN_PPM_FORMAT_PBM: portable bitmap
 * @VIPS_FOREIGN_PPM_FORMAT_PGM: portable greymap
 * @VIPS_FOREIGN_PPM_FORMAT_PPM: portable pixmap
 * @VIPS_FOREIGN_PPM_FORMAT_PFM: portable float map
 *
 * The netpbm file format to save as.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PBM images are single bit.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PGM images are 8, 16, or 32-bits, one band.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PPM images are 8, 16, or 32-bits, three bands.
 *
 * #VIPS_FOREIGN_PPM_FORMAT_PFM images are 32-bit float pixels.
 */
export const VipsForeignPpmFormatT = unsignedInt;

/**
 * VipsForeignSubsample:
 * @VIPS_FOREIGN_SUBSAMPLE_AUTO: prevent subsampling when quality >= 90
 * @VIPS_FOREIGN_SUBSAMPLE_ON: always perform subsampling
 * @VIPS_FOREIGN_SUBSAMPLE_OFF: never perform subsampling
 *
 * Set subsampling mode.
 */
export const enum VipsForeignSubsample {
  VIPS_FOREIGN_SUBSAMPLE_AUTO,
  VIPS_FOREIGN_SUBSAMPLE_ON,
  VIPS_FOREIGN_SUBSAMPLE_OFF,
  VIPS_FOREIGN_SUBSAMPLE_LAST,
}
/**
 * VipsForeignSubsample:
 * @VIPS_FOREIGN_SUBSAMPLE_AUTO: prevent subsampling when quality >= 90
 * @VIPS_FOREIGN_SUBSAMPLE_ON: always perform subsampling
 * @VIPS_FOREIGN_SUBSAMPLE_OFF: never perform subsampling
 *
 * Set subsampling mode.
 */
export const VipsForeignSubsampleT = unsignedInt;

/**
 * VipsForeignTiffCompression:
 * @VIPS_FOREIGN_TIFF_COMPRESSION_NONE: no compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_JPEG: jpeg compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_DEFLATE: deflate (zip) compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_PACKBITS: packbits compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_CCITTFAX4: fax4 compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_LZW: LZW compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_WEBP: WEBP compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_ZSTD: ZSTD compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_JP2K: JP2K compression
 *
 * The compression types supported by the tiff writer.
 *
 * Use @Q to set the jpeg compression level, default 75.
 *
 * Use @predictor to set the lzw or deflate prediction, default horizontal.
 *
 * Use @lossless to set WEBP lossless compression.
 *
 * Use @level to set webp and zstd compression level.
 */
export const enum VipsForeignTiffCompression {
  VIPS_FOREIGN_TIFF_COMPRESSION_NONE,
  VIPS_FOREIGN_TIFF_COMPRESSION_JPEG,
  VIPS_FOREIGN_TIFF_COMPRESSION_DEFLATE,
  VIPS_FOREIGN_TIFF_COMPRESSION_PACKBITS,
  VIPS_FOREIGN_TIFF_COMPRESSION_CCITTFAX4,
  VIPS_FOREIGN_TIFF_COMPRESSION_LZW,
  VIPS_FOREIGN_TIFF_COMPRESSION_WEBP,
  VIPS_FOREIGN_TIFF_COMPRESSION_ZSTD,
  VIPS_FOREIGN_TIFF_COMPRESSION_JP2K,
  VIPS_FOREIGN_TIFF_COMPRESSION_LAST,
}
/**
 * VipsForeignTiffCompression:
 * @VIPS_FOREIGN_TIFF_COMPRESSION_NONE: no compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_JPEG: jpeg compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_DEFLATE: deflate (zip) compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_PACKBITS: packbits compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_CCITTFAX4: fax4 compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_LZW: LZW compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_WEBP: WEBP compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_ZSTD: ZSTD compression
 * @VIPS_FOREIGN_TIFF_COMPRESSION_JP2K: JP2K compression
 *
 * The compression types supported by the tiff writer.
 *
 * Use @Q to set the jpeg compression level, default 75.
 *
 * Use @predictor to set the lzw or deflate prediction, default horizontal.
 *
 * Use @lossless to set WEBP lossless compression.
 *
 * Use @level to set webp and zstd compression level.
 */
export const VipsForeignTiffCompressionT = unsignedInt;

/**
 * VipsForeignTiffPredictor:
 * @VIPS_FOREIGN_TIFF_PREDICTOR_NONE: no prediction
 * @VIPS_FOREIGN_TIFF_PREDICTOR_HORIZONTAL: horizontal differencing
 * @VIPS_FOREIGN_TIFF_PREDICTOR_FLOAT: float predictor
 *
 * The predictor can help deflate and lzw compression. The values are fixed by
 * the tiff library.
 */
export const enum VipsForeignTiffPredictor {
  VIPS_FOREIGN_TIFF_PREDICTOR_NONE = 1,
  VIPS_FOREIGN_TIFF_PREDICTOR_HORIZONTAL = 2,
  VIPS_FOREIGN_TIFF_PREDICTOR_FLOAT = 3,
  VIPS_FOREIGN_TIFF_PREDICTOR_LAST,
}
/**
 * VipsForeignTiffPredictor:
 * @VIPS_FOREIGN_TIFF_PREDICTOR_NONE: no prediction
 * @VIPS_FOREIGN_TIFF_PREDICTOR_HORIZONTAL: horizontal differencing
 * @VIPS_FOREIGN_TIFF_PREDICTOR_FLOAT: float predictor
 *
 * The predictor can help deflate and lzw compression. The values are fixed by
 * the tiff library.
 */
export const VipsForeignTiffPredictorT = unsignedInt;

/**
 * VipsForeignTiffResunit:
 * @VIPS_FOREIGN_TIFF_RESUNIT_CM: use centimeters
 * @VIPS_FOREIGN_TIFF_RESUNIT_INCH: use inches
 *
 * Use inches or centimeters as the resolution unit for a tiff file.
 */
export const enum VipsForeignTiffResunit {
  VIPS_FOREIGN_TIFF_RESUNIT_CM,
  VIPS_FOREIGN_TIFF_RESUNIT_INCH,
  VIPS_FOREIGN_TIFF_RESUNIT_LAST,
}
/**
 * VipsForeignTiffResunit:
 * @VIPS_FOREIGN_TIFF_RESUNIT_CM: use centimeters
 * @VIPS_FOREIGN_TIFF_RESUNIT_INCH: use inches
 *
 * Use inches or centimeters as the resolution unit for a tiff file.
 */
export const VipsForeignTiffResunitT = unsignedInt;

/**
 * VipsForeignWebpPreset:
 * @VIPS_FOREIGN_WEBP_PRESET_DEFAULT: default preset
 * @VIPS_FOREIGN_WEBP_PRESET_PICTURE: digital picture, like portrait, inner shot
 * @VIPS_FOREIGN_WEBP_PRESET_PHOTO: outdoor photograph, with natural lighting
 * @VIPS_FOREIGN_WEBP_PRESET_DRAWING: hand or line drawing, with high-contrast details
 * @VIPS_FOREIGN_WEBP_PRESET_ICON: small-sized colorful images
 * @VIPS_FOREIGN_WEBP_PRESET_TEXT: text-like
 *
 * Tune lossy encoder settings for different image types.
 */
export const enum VipsForeignWebpPreset {
  VIPS_FOREIGN_WEBP_PRESET_DEFAULT,
  VIPS_FOREIGN_WEBP_PRESET_PICTURE,
  VIPS_FOREIGN_WEBP_PRESET_PHOTO,
  VIPS_FOREIGN_WEBP_PRESET_DRAWING,
  VIPS_FOREIGN_WEBP_PRESET_ICON,
  VIPS_FOREIGN_WEBP_PRESET_TEXT,
  VIPS_FOREIGN_WEBP_PRESET_LAST,
}
/**
 * VipsForeignWebpPreset:
 * @VIPS_FOREIGN_WEBP_PRESET_DEFAULT: default preset
 * @VIPS_FOREIGN_WEBP_PRESET_PICTURE: digital picture, like portrait, inner shot
 * @VIPS_FOREIGN_WEBP_PRESET_PHOTO: outdoor photograph, with natural lighting
 * @VIPS_FOREIGN_WEBP_PRESET_DRAWING: hand or line drawing, with high-contrast details
 * @VIPS_FOREIGN_WEBP_PRESET_ICON: small-sized colorful images
 * @VIPS_FOREIGN_WEBP_PRESET_TEXT: text-like
 *
 * Tune lossy encoder settings for different image types.
 */
export const VipsForeignWebpPresetT = unsignedInt;

export const enum VipsFormatFlags {
  VIPS_FORMAT_NONE = 0,
  VIPS_FORMAT_PARTIAL = 1,
  VIPS_FORMAT_BIGENDIAN = 2,
}
export const VipsFormatFlagsT = unsignedInt;

export const enum VipsImageType {
  VIPS_IMAGE_ERROR = -1,
  VIPS_IMAGE_NONE,
  VIPS_IMAGE_SETBUF,
  VIPS_IMAGE_SETBUF_FOREIGN,
  VIPS_IMAGE_OPENIN,
  VIPS_IMAGE_MMAPIN,
  VIPS_IMAGE_MMAPINRW,
  VIPS_IMAGE_OPENOUT,
  VIPS_IMAGE_PARTIAL,
}
export const VipsImageTypeT = int;

export const enum VipsIntent {
  VIPS_INTENT_PERCEPTUAL = 0,
  VIPS_INTENT_RELATIVE,
  VIPS_INTENT_SATURATION,
  VIPS_INTENT_ABSOLUTE,
  VIPS_INTENT_LAST,
}
export const VipsIntentT = unsignedInt;

export const enum VipsInteresting {
  VIPS_INTERESTING_NONE,
  VIPS_INTERESTING_CENTRE,
  VIPS_INTERESTING_ENTROPY,
  VIPS_INTERESTING_ATTENTION,
  VIPS_INTERESTING_LOW,
  VIPS_INTERESTING_HIGH,
  VIPS_INTERESTING_ALL,
  VIPS_INTERESTING_LAST,
}
export const VipsInterestingT = unsignedInt;

export const enum VipsInterpretation {
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
  VIPS_INTERPRETATION_LAST = 30,
}
export const VipsInterpretationT = int;

export const enum VipsKernel {
  VIPS_KERNEL_NEAREST,
  VIPS_KERNEL_LINEAR,
  VIPS_KERNEL_CUBIC,
  VIPS_KERNEL_MITCHELL,
  VIPS_KERNEL_LANCZOS2,
  VIPS_KERNEL_LANCZOS3,
  VIPS_KERNEL_LAST,
}
export const VipsKernelT = unsignedInt;

/**
 *
 * VipsOperationBoolean:
 * @VIPS_OPERATION_BOOLEAN_AND: \&
 * @VIPS_OPERATION_BOOLEAN_OR: |
 * @VIPS_OPERATION_BOOLEAN_EOR: ^
 * @VIPS_OPERATION_BOOLEAN_LSHIFT: >>
 * @VIPS_OPERATION_BOOLEAN_RSHIFT: \<\<
 *
 * See also: vips_boolean().
 */
export const enum VipsOperationBoolean {
  VIPS_OPERATION_BOOLEAN_AND,
  VIPS_OPERATION_BOOLEAN_OR,
  VIPS_OPERATION_BOOLEAN_EOR,
  VIPS_OPERATION_BOOLEAN_LSHIFT,
  VIPS_OPERATION_BOOLEAN_RSHIFT,
  VIPS_OPERATION_BOOLEAN_LAST,
}
/**
 *
 * VipsOperationBoolean:
 * @VIPS_OPERATION_BOOLEAN_AND: \&
 * @VIPS_OPERATION_BOOLEAN_OR: |
 * @VIPS_OPERATION_BOOLEAN_EOR: ^
 * @VIPS_OPERATION_BOOLEAN_LSHIFT: >>
 * @VIPS_OPERATION_BOOLEAN_RSHIFT: \<\<
 *
 * See also: vips_boolean().
 */
export const VipsOperationBooleanT = unsignedInt;

/**
 *
 * VipsOperationComplex:
 * @VIPS_OPERATION_COMPLEX_POLAR: convert to polar coordinates
 * @VIPS_OPERATION_COMPLEX_RECT: convert to rectangular coordinates
 * @VIPS_OPERATION_COMPLEX_CONJ: complex conjugate
 *
 * See also: vips_complex().
 */
export const enum VipsOperationComplex {
  VIPS_OPERATION_COMPLEX_POLAR,
  VIPS_OPERATION_COMPLEX_RECT,
  VIPS_OPERATION_COMPLEX_CONJ,
  VIPS_OPERATION_COMPLEX_LAST,
}
/**
 *
 * VipsOperationComplex:
 * @VIPS_OPERATION_COMPLEX_POLAR: convert to polar coordinates
 * @VIPS_OPERATION_COMPLEX_RECT: convert to rectangular coordinates
 * @VIPS_OPERATION_COMPLEX_CONJ: complex conjugate
 *
 * See also: vips_complex().
 */
export const VipsOperationComplexT = unsignedInt;

/**
 *
 * VipsOperationComplex2:
 * @VIPS_OPERATION_COMPLEX2_CROSS_PHASE: convert to polar coordinates
 *
 * See also: vips_complex2().
 */
export const enum VipsOperationComplex2 {
  VIPS_OPERATION_COMPLEX2_CROSS_PHASE,
  VIPS_OPERATION_COMPLEX2_LAST,
}
/**
 *
 * VipsOperationComplex2:
 * @VIPS_OPERATION_COMPLEX2_CROSS_PHASE: convert to polar coordinates
 *
 * See also: vips_complex2().
 */
export const VipsOperationComplex2T = unsignedInt;

/**
 *
 * VipsOperationComplexget:
 * @VIPS_OPERATION_COMPLEXGET_REAL: get real component
 * @VIPS_OPERATION_COMPLEXGET_IMAG: get imaginary component
 *
 * See also: vips_complexget().
 */
export const enum VipsOperationComplexget {
  VIPS_OPERATION_COMPLEXGET_REAL,
  VIPS_OPERATION_COMPLEXGET_IMAG,
  VIPS_OPERATION_COMPLEXGET_LAST,
}
/**
 *
 * VipsOperationComplexget:
 * @VIPS_OPERATION_COMPLEXGET_REAL: get real component
 * @VIPS_OPERATION_COMPLEXGET_IMAG: get imaginary component
 *
 * See also: vips_complexget().
 */
export const VipsOperationComplexgetT = unsignedInt;

export const enum VipsOperationFlags {
  VIPS_OPERATION_NONE = 0x0,
  VIPS_OPERATION_SEQUENTIAL = 0x1,
  VIPS_OPERATION_SEQUENTIAL_UNBUFFERED = 0x2,
  VIPS_OPERATION_NOCACHE = 0x4,
  VIPS_OPERATION_DEPRECATED = 0x8,
}
export const VipsOperationFlagsT = unsignedInt;

/**
 *
 * VipsOperationMath:
 * @VIPS_OPERATION_MATH_SIN: sin(), angles in degrees
 * @VIPS_OPERATION_MATH_COS: cos(), angles in degrees
 * @VIPS_OPERATION_MATH_TAN: tan(), angles in degrees
 * @VIPS_OPERATION_MATH_ASIN: asin(), angles in degrees
 * @VIPS_OPERATION_MATH_ACOS: acos(), angles in degrees
 * @VIPS_OPERATION_MATH_ATAN: atan(), angles in degrees
 * @VIPS_OPERATION_MATH_LOG: log base e
 * @VIPS_OPERATION_MATH_LOG10: log base 10
 * @VIPS_OPERATION_MATH_EXP: e to the something
 * @VIPS_OPERATION_MATH_EXP10: 10 to the something
 * @VIPS_OPERATION_MATH_SINH: sinh(), angles in radians
 * @VIPS_OPERATION_MATH_COSH: cosh(), angles in radians
 * @VIPS_OPERATION_MATH_TANH: tanh(), angles in radians
 * @VIPS_OPERATION_MATH_ASINH: asinh(), angles in radians
 * @VIPS_OPERATION_MATH_ACOSH: acosh(), angles in radians
 * @VIPS_OPERATION_MATH_ATANH: atanh(), angles in radians
 *
 * See also: vips_math().
 */
export const enum VipsOperationMath {
  VIPS_OPERATION_MATH_SIN,
  VIPS_OPERATION_MATH_COS,
  VIPS_OPERATION_MATH_TAN,
  VIPS_OPERATION_MATH_ASIN,
  VIPS_OPERATION_MATH_ACOS,
  VIPS_OPERATION_MATH_ATAN,
  VIPS_OPERATION_MATH_LOG,
  VIPS_OPERATION_MATH_LOG10,
  VIPS_OPERATION_MATH_EXP,
  VIPS_OPERATION_MATH_EXP10,
  VIPS_OPERATION_MATH_SINH,
  VIPS_OPERATION_MATH_COSH,
  VIPS_OPERATION_MATH_TANH,
  VIPS_OPERATION_MATH_ASINH,
  VIPS_OPERATION_MATH_ACOSH,
  VIPS_OPERATION_MATH_ATANH,
  VIPS_OPERATION_MATH_LAST,
}
/**
 *
 * VipsOperationMath:
 * @VIPS_OPERATION_MATH_SIN: sin(), angles in degrees
 * @VIPS_OPERATION_MATH_COS: cos(), angles in degrees
 * @VIPS_OPERATION_MATH_TAN: tan(), angles in degrees
 * @VIPS_OPERATION_MATH_ASIN: asin(), angles in degrees
 * @VIPS_OPERATION_MATH_ACOS: acos(), angles in degrees
 * @VIPS_OPERATION_MATH_ATAN: atan(), angles in degrees
 * @VIPS_OPERATION_MATH_LOG: log base e
 * @VIPS_OPERATION_MATH_LOG10: log base 10
 * @VIPS_OPERATION_MATH_EXP: e to the something
 * @VIPS_OPERATION_MATH_EXP10: 10 to the something
 * @VIPS_OPERATION_MATH_SINH: sinh(), angles in radians
 * @VIPS_OPERATION_MATH_COSH: cosh(), angles in radians
 * @VIPS_OPERATION_MATH_TANH: tanh(), angles in radians
 * @VIPS_OPERATION_MATH_ASINH: asinh(), angles in radians
 * @VIPS_OPERATION_MATH_ACOSH: acosh(), angles in radians
 * @VIPS_OPERATION_MATH_ATANH: atanh(), angles in radians
 *
 * See also: vips_math().
 */
export const VipsOperationMathT = unsignedInt;

/**
 *
 * VipsOperationMath2:
 * @VIPS_OPERATION_MATH2_POW: pow( left, right )
 * @VIPS_OPERATION_MATH2_WOP: pow( right, left )
 * @VIPS_OPERATION_MATH2_ATAN2: atan2( left, right )
 *
 * See also: vips_math().
 */
export const enum VipsOperationMath2 {
  VIPS_OPERATION_MATH2_POW,
  VIPS_OPERATION_MATH2_WOP,
  VIPS_OPERATION_MATH2_ATAN2,
  VIPS_OPERATION_MATH2_LAST,
}
/**
 *
 * VipsOperationMath2:
 * @VIPS_OPERATION_MATH2_POW: pow( left, right )
 * @VIPS_OPERATION_MATH2_WOP: pow( right, left )
 * @VIPS_OPERATION_MATH2_ATAN2: atan2( left, right )
 *
 * See also: vips_math().
 */
export const VipsOperationMath2T = unsignedInt;

export const enum VipsOperationMorphology {
  VIPS_OPERATION_MORPHOLOGY_ERODE,
  VIPS_OPERATION_MORPHOLOGY_DILATE,
  VIPS_OPERATION_MORPHOLOGY_LAST,
}
export const VipsOperationMorphologyT = unsignedInt;

/**
 *
 * VipsOperationRelational:
 * @VIPS_OPERATION_RELATIONAL_EQUAL: ==
 * @VIPS_OPERATION_RELATIONAL_NOTEQ: !=
 * @VIPS_OPERATION_RELATIONAL_LESS: \<
 * @VIPS_OPERATION_RELATIONAL_LESSEQ: \<\=
 * @VIPS_OPERATION_RELATIONAL_MORE: >
 * @VIPS_OPERATION_RELATIONAL_MOREEQ: >=
 *
 * See also: vips_relational().
 */
export const enum VipsOperationRelational {
  VIPS_OPERATION_RELATIONAL_EQUAL,
  VIPS_OPERATION_RELATIONAL_NOTEQ,
  VIPS_OPERATION_RELATIONAL_LESS,
  VIPS_OPERATION_RELATIONAL_LESSEQ,
  VIPS_OPERATION_RELATIONAL_MORE,
  VIPS_OPERATION_RELATIONAL_MOREEQ,
  VIPS_OPERATION_RELATIONAL_LAST,
}
/**
 *
 * VipsOperationRelational:
 * @VIPS_OPERATION_RELATIONAL_EQUAL: ==
 * @VIPS_OPERATION_RELATIONAL_NOTEQ: !=
 * @VIPS_OPERATION_RELATIONAL_LESS: \<
 * @VIPS_OPERATION_RELATIONAL_LESSEQ: \<\=
 * @VIPS_OPERATION_RELATIONAL_MORE: >
 * @VIPS_OPERATION_RELATIONAL_MOREEQ: >=
 *
 * See also: vips_relational().
 */
export const VipsOperationRelationalT = unsignedInt;

/**
 *
 * VipsOperationRound:
 * @VIPS_OPERATION_ROUND_RINT: round to nearest
 * @VIPS_OPERATION_ROUND_FLOOR: largest integral value not greater than
 * @VIPS_OPERATION_ROUND_CEIL: the smallest integral value not less than
 *
 * See also: vips_round().
 */
export const enum VipsOperationRound {
  VIPS_OPERATION_ROUND_RINT,
  VIPS_OPERATION_ROUND_CEIL,
  VIPS_OPERATION_ROUND_FLOOR,
  VIPS_OPERATION_ROUND_LAST,
}
/**
 *
 * VipsOperationRound:
 * @VIPS_OPERATION_ROUND_RINT: round to nearest
 * @VIPS_OPERATION_ROUND_FLOOR: largest integral value not greater than
 * @VIPS_OPERATION_ROUND_CEIL: the smallest integral value not less than
 *
 * See also: vips_round().
 */
export const VipsOperationRoundT = unsignedInt;

export const enum VipsPCS {
  VIPS_PCS_LAB,
  VIPS_PCS_XYZ,
  VIPS_PCS_LAST,
}
export const VipsPCST = unsignedInt;

export const enum VipsPrecision {
  VIPS_PRECISION_INTEGER,
  VIPS_PRECISION_FLOAT,
  VIPS_PRECISION_APPROXIMATE,
  VIPS_PRECISION_LAST,
}
export const VipsPrecisionT = unsignedInt;

/**
 * VipsRegionShrink:
 * @VIPS_REGION_SHRINK_MEAN: use the average
 * @VIPS_REGION_SHRINK_MEDIAN: use the median
 * @VIPS_REGION_SHRINK_MODE: use the mode
 * @VIPS_REGION_SHRINK_MAX: use the maximum
 * @VIPS_REGION_SHRINK_MIN: use the minimum
 * @VIPS_REGION_SHRINK_NEAREST: use the top-left pixel
 *
 * How to calculate the output pixels when shrinking a 2x2 region.
 */
export const enum VipsRegionShrink {
  VIPS_REGION_SHRINK_MEAN,
  VIPS_REGION_SHRINK_MEDIAN,
  VIPS_REGION_SHRINK_MODE,
  VIPS_REGION_SHRINK_MAX,
  VIPS_REGION_SHRINK_MIN,
  VIPS_REGION_SHRINK_NEAREST,
  VIPS_REGION_SHRINK_LAST,
}
/**
 * VipsRegionShrink:
 * @VIPS_REGION_SHRINK_MEAN: use the average
 * @VIPS_REGION_SHRINK_MEDIAN: use the median
 * @VIPS_REGION_SHRINK_MODE: use the mode
 * @VIPS_REGION_SHRINK_MAX: use the maximum
 * @VIPS_REGION_SHRINK_MIN: use the minimum
 * @VIPS_REGION_SHRINK_NEAREST: use the top-left pixel
 *
 * How to calculate the output pixels when shrinking a 2x2 region.
 */
export const VipsRegionShrinkT = unsignedInt;

/**
 *
 * VipsSaveable:
 * @VIPS_SAVEABLE_MONO: 1 band (eg. CSV)
 * @VIPS_SAVEABLE_RGB: 1 or 3 bands (eg. PPM)
 * @VIPS_SAVEABLE_RGBA: 1, 2, 3 or 4 bands (eg. PNG)
 * @VIPS_SAVEABLE_RGBA_ONLY: 3 or 4 bands (eg. WEBP)
 * @VIPS_SAVEABLE_RGB_CMYK: 1, 3 or 4 bands (eg. JPEG)
 * @VIPS_SAVEABLE_ANY: any number of bands (eg. TIFF)
 *
 * See also: #VipsForeignSave.
 */
export const enum VipsSaveable {
  VIPS_SAVEABLE_MONO,
  VIPS_SAVEABLE_RGB,
  VIPS_SAVEABLE_RGBA,
  VIPS_SAVEABLE_RGBA_ONLY,
  VIPS_SAVEABLE_RGB_CMYK,
  VIPS_SAVEABLE_ANY,
  VIPS_SAVEABLE_LAST,
}
/**
 *
 * VipsSaveable:
 * @VIPS_SAVEABLE_MONO: 1 band (eg. CSV)
 * @VIPS_SAVEABLE_RGB: 1 or 3 bands (eg. PPM)
 * @VIPS_SAVEABLE_RGBA: 1, 2, 3 or 4 bands (eg. PNG)
 * @VIPS_SAVEABLE_RGBA_ONLY: 3 or 4 bands (eg. WEBP)
 * @VIPS_SAVEABLE_RGB_CMYK: 1, 3 or 4 bands (eg. JPEG)
 * @VIPS_SAVEABLE_ANY: any number of bands (eg. TIFF)
 *
 * See also: #VipsForeignSave.
 */
export const VipsSaveableT = unsignedInt;

export const enum VipsSize {
  VIPS_SIZE_BOTH,
  VIPS_SIZE_UP,
  VIPS_SIZE_DOWN,
  VIPS_SIZE_FORCE,
  VIPS_SIZE_LAST,
}
export const VipsSizeT = unsignedInt;

/**
 * Whether or not VObject should take over the reference that you pass in. See
 * VObject().
 */
export const enum VSteal {
  NOSTEAL = 0,
  STEAL = 1,
}
/**
 * Whether or not VObject should take over the reference that you pass in. See
 * VObject().
 */
export const VStealT = unsignedInt;

/******** End enums ********/
/******** Start pointer ********/
export const im_objectT = ptr("void");
/******** End pointer ********/
/******** Start Struct ********/
export const DOUBLEMASKT = {
  /** Struct size: 40 */
  struct: [
    int, // xsize, offset 0, size 4
    int, // ysize, offset 4, size 4
    double, // scale, offset 8, size 8
    double, // offset, offset 16, size 8
    ptr(double), // coeff, offset 24, size 8
    cstringT, // filename, offset 32, size 8
  ],
} as const;

export const IMAGE_BOXT = {
  /** Struct size: 20 */
  struct: [
    int, // xstart, offset 0, size 4
    int, // ystart, offset 4, size 4
    int, // xsize, offset 8, size 4
    int, // ysize, offset 12, size 4
    int, // chsel, offset 16, size 4
  ],
} as const;

export const INTMASKT = {
  /** Struct size: 32 */
  struct: [
    int, // xsize, offset 0, size 4
    int, // ysize, offset 4, size 4
    int, // scale, offset 8, size 4
    int, // offset, offset 12, size 4
    ptr(int), // coeff, offset 16, size 8
    cstringT, // filename, offset 24, size 8
  ],
} as const;

export const VipsAreaT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsArgumentClassT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsArgumentInstanceT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsArrayDoubleT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsArrayIntT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsBlobT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsBufT = {
  /** Struct size: 32 */
  struct: [
    cstringT, // base, offset 0, size 8
    int, // mx, offset 8, size 4
    int, // i, offset 12, size 4
    gbooleanT, // full, offset 16, size 4
    int, // lasti, offset 20, size 4
    gbooleanT, // dynamic, offset 24, size 4
  ],
} as const;

export const VipsBufferT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsConnectionT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsDbufT = {
  /** Struct size: 32 */
  struct: [
    ptr(unsignedChar), // data, offset 0, size 8
    size_t, // allocated_size, offset 8, size 8
    size_t, // data_size, offset 16, size 8
    size_t, // write_point, offset 24, size 8
  ],
} as const;

export const VipsFormatClassT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsInterpolateT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsObjectT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsObjectClassT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsOperationT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsOperationClassT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsRefStringT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsSbufT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsSourceT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsSourceCustomT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsSourceGInputStreamT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsTargetT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsTargetCustomT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsThingT = {
  /** Struct size: 4 */
  struct: [
    int, // i, offset 0, size 4
  ],
} as const;

export const VipsTransformationT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsVectorT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const VipsWindowT = {
  /** Struct size: 1 */
  struct: [
  ],
} as const;

export const im_type_descT = {
  /** Struct size: 32 */
  struct: [
    im_arg_typeT, // type, offset 0, size 8
    int, // size, offset 8, size 4
    im_type_flagsT, // flags, offset 12, size 4
    im_init_obj_fnT, // init, offset 16, size 8
    im_dest_obj_fnT, // dest, offset 24, size 8
  ],
} as const;

export const VipsExecutorT = {
  /** Struct size: 8 */
  struct: [
    ptr(VipsVectorT), // vector, offset 0, size 8
  ],
} as const;

export const im_arg_descT = {
  /** Struct size: 24 */
  struct: [
    cstringT, // name, offset 0, size 8
    ptr(im_type_descT), // desc, offset 8, size 8
    im_print_obj_fnT, // print, offset 16, size 8
  ],
} as const;

export const im_functionT = {
  /** Struct size: 48 */
  struct: [
    cstringT, // name, offset 0, size 8
    cstringT, // desc, offset 8, size 8
    im_fn_flagsT, // flags, offset 16, size 4
    im_dispatch_fnT, // disp, offset 24, size 8
    int, // argc, offset 32, size 4
    ptr(im_arg_descT), // argv, offset 40, size 8
  ],
} as const;

export const im_packageT = {
  /** Struct size: 24 */
  struct: [
    cstringT, // name, offset 0, size 8
    int, // nfuncs, offset 8, size 4
    ptr(buf(im_functionT)), // table, offset 16, size 8
  ],
} as const;

/******** End Struct ********/
/******** Start ref ********/
export const gbooleanT = gintT;
export const off_t = __off_t;
export const im_arg_typeT = cstringT;
export const GTypeT = gsizeT;
export const __gnuc_va_listT = __builtin_va_listT;
export const va_listT = __gnuc_va_listT;
/******** end ref ********/
/******** Start Functions ********/
export const im_construct_fnCallbackDefinition = {
  parameters: [
    ptr("void"), // void *
    ptr("void"), // void *
    ptr("void"), // void *
  ],

  result: ptr("void"),
} as const;
export const im_construct_fnT = "function" as const;

export const im_dest_obj_fnCallbackDefinition = {
  parameters: [
    im_objectT, // obj
  ],

  result: int,
} as const;
export const im_dest_obj_fnT = "function" as const;

export const im_dispatch_fnCallbackDefinition = {
  parameters: [
    buf(im_objectT), // argv
  ],

  result: int,
} as const;
export const im_dispatch_fnT = "function" as const;

export const im_generate_fnCallbackDefinition = {
  parameters: [
    buf(int), // out
    ptr("void"), // seq
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: int,
} as const;
export const im_generate_fnT = "function" as const;

export const im_init_obj_fnCallbackDefinition = {
  parameters: [
    buf(im_objectT), // obj
    cstringT, // str
  ],

  result: int,
} as const;
export const im_init_obj_fnT = "function" as const;

export const im_print_obj_fnCallbackDefinition = {
  parameters: [
    im_objectT, // obj
  ],

  result: int,
} as const;
export const im_print_obj_fnT = "function" as const;

export const im_wrapmany_fnCallbackDefinition = {
  parameters: [
    buf(ptr("void")), // in
    ptr("void"), // out
    int, // width
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: "void",
} as const;
export const im_wrapmany_fnT = "function" as const;

export const im_wrapone_fnCallbackDefinition = {
  parameters: [
    ptr("void"), // in
    ptr("void"), // out
    int, // width
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: "void",
} as const;
export const im_wrapone_fnT = "function" as const;

export const im_wraptwo_fnCallbackDefinition = {
  parameters: [
    ptr("void"), // in1
    ptr("void"), // in2
    ptr("void"), // out
    int, // width
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: "void",
} as const;
export const im_wraptwo_fnT = "function" as const;

export const VipsArgumentClassMapFnCallbackDefinition = {
  parameters: [
    buf(VipsObjectClassT), // object_class
    buf(int), // pspec
    buf(VipsArgumentClassT), // argument_class
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsArgumentClassMapFnT = "function" as const;

export const VipsArgumentMapFnCallbackDefinition = {
  parameters: [
    buf(VipsObjectT), // object
    buf(int), // pspec
    buf(VipsArgumentClassT), // argument_class
    buf(VipsArgumentInstanceT), // argument_instance
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsArgumentMapFnT = "function" as const;

export const VipsCallbackFnCallbackDefinition = {
  parameters: [
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: int,
} as const;
export const VipsCallbackFnT = "function" as const;

export const VipsClassMapFnCallbackDefinition = {
  parameters: [
    buf(VipsObjectClassT), // cls
    ptr("void"), // a
  ],

  result: ptr("void"),
} as const;
export const VipsClassMapFnT = "function" as const;

export const VipsGenerateFnCallbackDefinition = {
  parameters: [
    buf(int), // out
    ptr("void"), // seq
    ptr("void"), // a
    ptr("void"), // b
    buf(int), // stop
  ],

  result: int,
} as const;
export const VipsGenerateFnT = "function" as const;

export const VipsImageMapFnCallbackDefinition = {
  parameters: [
    buf(int), // image
    cstringT, // name
    buf(int), // value
    ptr("void"), // a
  ],

  result: ptr("void"),
} as const;
export const VipsImageMapFnT = "function" as const;

export const VipsInterpolateMethodCallbackDefinition = {
  parameters: [
    buf(VipsInterpolateT), // interpolate
    ptr("void"), // out
    buf(int), // in
    double, // x
    double, // y
  ],

  result: "void",
} as const;
export const VipsInterpolateMethodT = "function" as const;

export const VipsObjectSetArgumentsCallbackDefinition = {
  parameters: [
    buf(VipsObjectT), // object
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsObjectSetArgumentsT = "function" as const;

export const VipsPlotFnCallbackDefinition = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
  ],

  result: int,
} as const;
export const VipsPlotFnT = "function" as const;

export const VipsRegionFillFnCallbackDefinition = {
  parameters: [
    ptr("void"), // struct _VipsRegion *
    ptr("void"), // void *
  ],

  result: int,
} as const;
export const VipsRegionFillFnT = "function" as const;

export const VipsRegionWriteCallbackDefinition = {
  parameters: [
    buf(int), // region
    buf(int), // area
    ptr("void"), // a
  ],

  result: int,
} as const;
export const VipsRegionWriteT = "function" as const;

export const VipsSinkNotifyCallbackDefinition = {
  parameters: [
    buf(int), // im
    buf(int), // rect
    ptr("void"), // a
  ],

  result: "void",
} as const;
export const VipsSinkNotifyT = "function" as const;

export const VipsSListFold2FnCallbackDefinition = {
  parameters: [
    ptr("void"), // item
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
  ],

  result: ptr("void"),
} as const;
export const VipsSListFold2FnT = "function" as const;

export const VipsSListMap2FnCallbackDefinition = {
  parameters: [
    ptr("void"), // item
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsSListMap2FnT = "function" as const;

export const VipsSListMap4FnCallbackDefinition = {
  parameters: [
    ptr("void"), // item
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
    ptr("void"), // d
  ],

  result: ptr("void"),
} as const;
export const VipsSListMap4FnT = "function" as const;

export const VipsStartFnCallbackDefinition = {
  parameters: [
    buf(int), // out
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsStartFnT = "function" as const;

export const VipsStopFnCallbackDefinition = {
  parameters: [
    ptr("void"), // seq
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: int,
} as const;
export const VipsStopFnT = "function" as const;

export const VipsThreadpoolAllocateFnCallbackDefinition = {
  parameters: [
    buf(VipsThreadStateT), // state
    ptr("void"), // a
    buf(gbooleanT), // stop
  ],

  result: int,
} as const;
export const VipsThreadpoolAllocateFnT = "function" as const;

export const VipsThreadpoolProgressFnCallbackDefinition = {
  parameters: [
    ptr("void"), // a
  ],

  result: int,
} as const;
export const VipsThreadpoolProgressFnT = "function" as const;

export const VipsThreadpoolWorkFnCallbackDefinition = {
  parameters: [
    buf(VipsThreadStateT), // state
    ptr("void"), // a
  ],

  result: int,
} as const;
export const VipsThreadpoolWorkFnT = "function" as const;

export const VipsThreadStartFnCallbackDefinition = {
  parameters: [
    buf(VipsImageT), // im
    ptr("void"), // a
  ],

  result: buf(VipsThreadStateT),
} as const;
export const VipsThreadStartFnT = "function" as const;

export const VipsTypeMap2FnCallbackDefinition = {
  parameters: [
    int, // type
    ptr("void"), // a
    ptr("void"), // b
  ],

  result: ptr("void"),
} as const;
export const VipsTypeMap2FnT = "function" as const;

export const VipsTypeMapFnCallbackDefinition = {
  parameters: [
    int, // type
    ptr("void"), // a
  ],

  result: ptr("void"),
} as const;
export const VipsTypeMapFnT = "function" as const;

/******** End Functions ********/
