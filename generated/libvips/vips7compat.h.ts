import {
  buf,
  cstringArrayT,
  cstringT,
  double,
  float,
  im_construct_fnT,
  im_generate_fnT,
  im_wrapmany_fnT,
  im_wrapone_fnT,
  im_wraptwo_fnT,
  ImMaskTypeT,
  int,
  ptr,
  VipsPlotFnT,
} from "./typeDefinitions.ts";

// Symbol im__analyze_register not exported by lib libvips.so
// Symbol im__balance not exported by lib libvips.so
export const im__bandalike = {
  parameters: [
    cstringT, // domain
    buf(int), // in1
    buf(int), // in2
    buf(int), // out1
    buf(int), // out2
  ],
  result: int,
} as const;

export const im__bandalike_vec = {
  parameters: [
    cstringT, // domain
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const im__bandup = {
  parameters: [
    cstringT, // domain
    buf(int), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

// Symbol im__colour_difference not exported by lib libvips.so
export const im__colour_unary = {
  parameters: [
    cstringT, // domain
    buf(int), // in
    buf(int), // out
    int, // interpretation
    im_wrapone_fnT, // buffer_fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

// Symbol im__csv_register not exported by lib libvips.so
// Symbol im__exr_register not exported by lib libvips.so
// Symbol im__find_best_contrast not exported by lib libvips.so
export const im__format_init = {
  parameters: [],
  result: "void",
} as const;

export const im__formatalike = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out1
    buf(int), // out2
  ],
  result: int,
} as const;

export const im__formatalike_vec = {
  parameters: [
    buf(buf(int)), // in
    buf(buf(int)), // out
    int, // n
  ],
  result: int,
} as const;

export const im__insert_base = {
  parameters: [
    cstringT, // domain
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: buf(buf(int)),
} as const;

// Symbol im__jpeg_register not exported by lib libvips.so
// Symbol im__magick_register not exported by lib libvips.so
// Symbol im__png_register not exported by lib libvips.so
// Symbol im__ppm_register not exported by lib libvips.so
// Symbol im__tiff_register not exported by lib libvips.so
export const im__vector_to_ink = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    int, // n
    buf(double), // vec
  ],
  result: buf(int),
} as const;

// Symbol im__wrapscan not exported by lib libvips.so
export const im_abs = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_aconv = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // n_layers
    int, // cluster
  ],
  result: int,
} as const;

export const im_aconvsep = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // n_layers
  ],
  result: int,
} as const;

export const im_acostra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_add = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_add_callback = {
  parameters: [
    buf(int), // im
    cstringT, // callback
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_add_callback1 = {
  parameters: [
    buf(int), // im
    cstringT, // callback
    int, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_addgnoise = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // sigma
  ],
  result: int,
} as const;

export const im_affinei = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // interpolate
    double, // a
    double, // b
    double, // c
    double, // d
    double, // dx
    double, // dy
    int, // ox
    int, // oy
    int, // ow
    int, // oh
  ],
  result: int,
} as const;

export const im_affinei_all = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // interpolate
    double, // a
    double, // b
    double, // c
    double, // d
    double, // dx
    double, // dy
  ],
  result: int,
} as const;

export const im_align_bands = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_andimage = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_andimage_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_andimageconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_argb2rgba = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_asintra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_atantra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_avg = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const im_BandFmt2char = {
  parameters: [
    int, // fmt
  ],
  result: cstringT,
} as const;

export const im_bandjoin = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_bandmean = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_benchmark2 = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const im_benchmarkn = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

export const im_black = {
  parameters: [
    buf(int), // out
    int, // x
    int, // y
    int, // bands
  ],
  result: int,
} as const;

export const im_blend = {
  parameters: [
    buf(int), // c
    buf(int), // a
    buf(int), // b
    buf(int), // out
  ],
  result: int,
} as const;

export const im_buildlut = {
  parameters: [
    buf(int), // input
    buf(int), // output
  ],
  result: int,
} as const;

export const im_c2amph = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_c2imag = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_c2real = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_c2rect = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_cache = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // width
    int, // height
    int, // max
  ],
  result: int,
} as const;

export const im_ceil = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_char2BandFmt = {
  parameters: [
    cstringT, // str
  ],
  result: int,
} as const;

export const im_char2Coding = {
  parameters: [
    cstringT, // str
  ],
  result: int,
} as const;

export const im_char2dhint = {
  parameters: [
    cstringT, // str
  ],
  result: int,
} as const;

export const im_char2dtype = {
  parameters: [
    cstringT, // str
  ],
  result: int,
} as const;

export const im_char2Type = {
  parameters: [
    cstringT, // str
  ],
  result: int,
} as const;

export const im_clip2fmt = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // fmt
  ],
  result: int,
} as const;

export const im_close = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_cntlines = {
  parameters: [
    buf(int), // im
    buf(double), // nolines
    int, // flag
  ],
  result: int,
} as const;

export const im_Coding2char = {
  parameters: [
    int, // coding
  ],
  result: cstringT,
} as const;

export const im_compass = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_Compression2char = {
  parameters: [
    int, // n
  ],
  result: cstringT,
} as const;

export const im_contrast_surface = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // half_win_size
    int, // spacing
  ],
  result: int,
} as const;

export const im_contrast_surface_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // half_win_size
    int, // spacing
  ],
  result: int,
} as const;

export const im_conv = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_conv_f = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_conv_f_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsep = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsep_f = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsep_f_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_copy = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_copy_dmask_matrix = {
  parameters: [
    buf(int), // mask
    buf(buf(double)), // matrix
  ],
  result: "void",
} as const;

export const im_copy_file = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_copy_matrix_dmask = {
  parameters: [
    buf(buf(double)), // matrix
    buf(int), // mask
  ],
  result: "void",
} as const;

export const im_copy_morph = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // bands
    int, // format
    int, // coding
  ],
  result: int,
} as const;

export const im_copy_native = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // is_msb_first
  ],
  result: int,
} as const;

export const im_copy_set = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // interpretation
    float, // xres
    float, // yres
    int, // xoffset
    int, // yoffset
  ],
  result: int,
} as const;

export const im_copy_set_meta = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // field
    buf(int), // value
  ],
  result: int,
} as const;

export const im_copy_swap = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_correl = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
    int, // hwindowsize
    int, // hsearchsize
    buf(double), // correlation
    buf(int), // x
    buf(int), // y
  ],
  result: int,
} as const;

export const im_costra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_cp_desc = {
  parameters: [
    buf(int), // out
    buf(int), // in
  ],
  result: int,
} as const;

export const im_cp_descv = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_create_fmask = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
    ImMaskTypeT, // flag
  ],
  result: int,
} as const;

export const im_cross_phase = {
  parameters: [
    buf(int), // a
    buf(int), // b
    buf(int), // out
  ],
  result: int,
} as const;

export const im_dE_fromdisp = {
  parameters: [
    buf(int),
    buf(int),
    buf(int),
    ptr("void"),
  ],
  result: int,
} as const;

export const im_dE_fromLab = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_dE_fromXYZ = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_dE00_fromLab = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_dECMC_fromdisp = {
  parameters: [
    buf(int),
    buf(int),
    buf(int),
    ptr("void"),
  ],
  result: int,
} as const;

export const im_dECMC_fromLab = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_demand_hint = {
  parameters: [
    buf(int), // im
    int, // hint
  ],
  result: int,
} as const;

export const im_deviate = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const im_dhint2char = {
  parameters: [
    int, // style
  ],
  result: cstringT,
} as const;

export const im_dilate = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_disp_ps = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_disp2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
    ptr("void"), // disp
  ],
  result: int,
} as const;

export const im_divide = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_dmat_alloc = {
  parameters: [
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: buf(buf(double)),
} as const;

export const im_draw_circle = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    int, // radius
    int, // fill
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_draw_flood = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    buf(int), // ink
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_draw_flood_blob = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    buf(int), // ink
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_draw_flood_other = {
  parameters: [
    buf(int), // image
    buf(int), // test
    int, // x
    int, // y
    int, // serial
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_draw_image = {
  parameters: [
    buf(int), // image
    buf(int), // sub
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const im_draw_line = {
  parameters: [
    buf(int), // image
    int, // x1
    int, // y1
    int, // x2
    int, // y2
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_draw_line_user = {
  parameters: [
    buf(int), // image
    int, // x1
    int, // y1
    int, // x2
    int, // y2
    VipsPlotFnT, // plot
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
  ],
  result: int,
} as const;

export const im_draw_mask = {
  parameters: [
    buf(int), // image
    buf(int), // mask_im
    int, // x
    int, // y
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_draw_point = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_draw_rect = {
  parameters: [
    buf(int), // image
    int, // left
    int, // top
    int, // width
    int, // height
    int, // fill
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_draw_smudge = {
  parameters: [
    buf(int), // image
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const im_dtype2char = {
  parameters: [
    int, // n
  ],
  result: cstringT,
} as const;

export const im_dvector = {
  parameters: [
    int, // nl
    int, // nh
  ],
  result: buf(double),
} as const;

export const im_embed = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // type
    int, // x
    int, // y
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const im_eorimage = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_eorimage_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_eorimageconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_equal = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_equal_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_equalconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_erode = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_exp10tra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_expntra = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // e
  ],
  result: int,
} as const;

export const im_expntra_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // e
  ],
  result: int,
} as const;

export const im_exptra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_extract_area = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // left
    int, // top
    int, // width
    int, // height
  ],
  result: int,
} as const;

export const im_extract_areabands = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // left
    int, // top
    int, // width
    int, // height
    int, // band
    int, // nbands
  ],
  result: int,
} as const;

export const im_extract_band = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // band
  ],
  result: int,
} as const;

export const im_extract_bands = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // band
    int, // nbands
  ],
  result: int,
} as const;

export const im_eye = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
    double, // factor
  ],
  result: int,
} as const;

export const im_falsecolour = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_fastcor = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_feye = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
    double, // factor
  ],
  result: int,
} as const;

export const im_fgrey = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
  ],
  result: int,
} as const;

export const im_filename_split = {
  parameters: [
    cstringT, // path
    cstringT, // name
    cstringT, // mode
  ],
  result: "void",
} as const;

export const im_filename_suffix = {
  parameters: [
    cstringT, // path
    cstringT, // suffix
  ],
  result: "void",
} as const;

export const im_filename_suffix_match = {
  parameters: [
    cstringT, // path
    cstringArrayT, // suffixes
  ],
  result: int,
} as const;

export const im_fliphor = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_flipver = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_float2rad = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_floor = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_flt_image_freq = {
  parameters: [
    buf(int), // in
    buf(int), // out
    ImMaskTypeT, // flag
  ],
  result: int,
} as const;

export const im_fmat_alloc = {
  parameters: [
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: buf(buf(float)),
} as const;

export const im_fractsurf = {
  parameters: [
    buf(int), // out
    int, // size
    double, // frd
  ],
  result: int,
} as const;

export const im_free_dmat = {
  parameters: [
    buf(buf(double)), // m
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: "void",
} as const;

export const im_free_dvector = {
  parameters: [
    buf(double), // v
    int, // nl
    int, // nh
  ],
  result: "void",
} as const;

export const im_free_fmat = {
  parameters: [
    buf(buf(float)), // m
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: "void",
} as const;

export const im_free_fvector = {
  parameters: [
    buf(float), // v
    int, // nl
    int, // nh
  ],
  result: "void",
} as const;

export const im_free_imat = {
  parameters: [
    buf(buf(int)), // m
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: "void",
} as const;

export const im_free_ivector = {
  parameters: [
    buf(int), // v
    int, // nl
    int, // nh
  ],
  result: "void",
} as const;

export const im_freqflt = {
  parameters: [
    buf(int), // in
    buf(int), // mask
    buf(int), // out
  ],
  result: int,
} as const;

export const im_fvector = {
  parameters: [
    int, // nl
    int, // nh
  ],
  result: buf(float),
} as const;

export const im_fwfft = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_fzone = {
  parameters: [
    buf(int), // out
    int, // size
  ],
  result: int,
} as const;

export const im_gammacorrect = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // exponent
  ],
  result: int,
} as const;

export const im_gaussnoise = {
  parameters: [
    buf(int), // out
    int, // x
    int, // y
    double, // mean
    double, // sigma
  ],
  result: int,
} as const;

export const im_gbandjoin = {
  parameters: [
    buf(buf(int)), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

export const im_generate = {
  parameters: [
    buf(int), // im
    int, // start
    im_generate_fnT, // generate
    int, // stop
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_getnextoption = {
  parameters: [
    cstringArrayT, // in
  ],
  result: cstringT,
} as const;

export const im_getsuboption = {
  parameters: [
    cstringT, // buf
  ],
  result: cstringT,
} as const;

export const im_global_balance = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // gamma
  ],
  result: int,
} as const;

export const im_global_balancef = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // gamma
  ],
  result: int,
} as const;

export const im_grad_x = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_grad_y = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_gradcor = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_gradient = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_grey = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
  ],
  result: int,
} as const;

export const im_greyc_mask = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // iterations
    float, // amplitude
    float, // sharpness
    float, // anisotropy
    float, // alpha
    float, // sigma
    float, // dl
    float, // da
    float, // gauss_prec
    int, // interpolation
    int, // fast_approx
  ],
  result: int,
} as const;

export const im_grid = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // tile_height
    int, // across
    int, // down
  ],
  result: int,
} as const;

export const im_heq = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // bandno
  ],
  result: int,
} as const;

export const im_hist = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // bandno
  ],
  result: int,
} as const;

export const im_hist_indexed = {
  parameters: [
    buf(int), // index
    buf(int), // value
    buf(int), // out
  ],
  result: int,
} as const;

export const im_histcum = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_histeq = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_histgr = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // bandno
  ],
  result: int,
} as const;

export const im_histnD = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // bins
  ],
  result: int,
} as const;

export const im_histnorm = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_histplot = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_histspec = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_hsp = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_icc_ac2rc = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // profile_filename
  ],
  result: int,
} as const;

export const im_icc_export_depth = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // depth
    cstringT, // output_profile_filename
    int, // intent
  ],
  result: int,
} as const;

export const im_icc_import = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // input_profile_filename
    int, // intent
  ],
  result: int,
} as const;

export const im_icc_import_embedded = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // intent
  ],
  result: int,
} as const;

export const im_icc_transform = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // input_profile_filename
    cstringT, // output_profile_filename
    int, // intent
  ],
  result: int,
} as const;

export const im_identity = {
  parameters: [
    buf(int), // lut
    int, // bands
  ],
  result: int,
} as const;

export const im_identity_ushort = {
  parameters: [
    buf(int), // lut
    int, // bands
    int, // sz
  ],
  result: int,
} as const;

export const im_ifthenelse = {
  parameters: [
    buf(int), // c
    buf(int), // a
    buf(int), // b
    buf(int), // out
  ],
  result: int,
} as const;

export const im_imask2vips = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_imat_alloc = {
  parameters: [
    int, // nrl
    int, // nrh
    int, // ncl
    int, // nch
  ],
  result: buf(buf(int)),
} as const;

export const im_init = {
  parameters: [
    cstringT, // filename
  ],
  result: buf(int),
} as const;

export const im_init_world = {
  parameters: [
    cstringT, // argv0
  ],
  result: int,
} as const;

export const im_insert = {
  parameters: [
    buf(int), // main
    buf(int), // sub
    buf(int), // out
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const im_insert_noexpand = {
  parameters: [
    buf(int), // main
    buf(int), // sub
    buf(int), // out
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const im_insertset = {
  parameters: [
    buf(int), // main
    buf(int), // sub
    buf(int), // out
    int, // n
    buf(int), // x
    buf(int), // y
  ],
  result: int,
} as const;

export const im_invert = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_invertlut = {
  parameters: [
    buf(int), // input
    buf(int), // output
    int, // lut_size
  ],
  result: int,
} as const;

export const im_invfft = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_invfftr = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_invmat = {
  parameters: [
    buf(buf(double)),
    int,
  ],
  result: int,
} as const;

export const im_ismonotonic = {
  parameters: [
    buf(int), // lut
    buf(int), // out
  ],
  result: int,
} as const;

export const im_ivector = {
  parameters: [
    int, // nl
    int, // nh
  ],
  result: buf(int),
} as const;

export const im_lab_morph = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    double, // L_offset
    double, // L_scale
    double, // a_scale
    double, // b_scale
  ],
  result: int,
} as const;

export const im_Lab2disp = {
  parameters: [
    buf(int), // in
    buf(int), // out
    ptr("void"), // disp
  ],
  result: int,
} as const;

export const im_Lab2LabQ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Lab2LabS = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Lab2LCh = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Lab2UCS = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Lab2XYZ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Lab2XYZ_temp = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // X0
    double, // Y0
    double, // Z0
  ],
  result: int,
} as const;

export const im_label_regions = {
  parameters: [
    buf(int), // test
    buf(int), // mask
    buf(int), // segments
  ],
  result: int,
} as const;

export const im_LabQ2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LabQ2LabS = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LabQ2sRGB = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LabQ2XYZ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LabS2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LabS2LabQ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LCh2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_LCh2UCS = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_less = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_less_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_lessconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_lesseq = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_lesseq_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_lesseqconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_lhisteq = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // xwin
    int, // ywin
  ],
  result: int,
} as const;

export const im_lindetect = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_lineset = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    buf(int), // ink
    int, // n
    buf(int), // x1v
    buf(int), // y1v
    buf(int), // x2v
    buf(int), // y2v
  ],
  result: int,
} as const;

export const im_linreg = {
  parameters: [
    buf(buf(int)), // ins
    buf(int), // out
    buf(double), // xs
  ],
  result: int,
} as const;

export const im_lintra = {
  parameters: [
    double, // a
    buf(int), // in
    double, // b
    buf(int), // out
  ],
  result: int,
} as const;

export const im_lintra_vec = {
  parameters: [
    int, // n
    buf(double), // a
    buf(int), // in
    buf(double), // b
    buf(int), // out
  ],
  result: int,
} as const;

export const im_local = {
  parameters: [
    buf(int), // im
    im_construct_fnT, // cons
    int, // dest
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
  ],
  result: ptr("void"),
} as const;

export const im_local_array = {
  parameters: [
    buf(int), // im
    buf(ptr("void")), // out
    int, // n
    im_construct_fnT, // cons
    int, // dest
    ptr("void"), // a
    ptr("void"), // b
    ptr("void"), // c
  ],
  result: int,
} as const;

export const im_log10tra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_logtra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_lrjoin = {
  parameters: [
    buf(int), // left
    buf(int), // right
    buf(int), // out
  ],
  result: int,
} as const;

export const im_lrmerge = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // dx
    int, // dy
    int, // mwidth
  ],
  result: int,
} as const;

export const im_lrmerge1 = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
    int, // mwidth
  ],
  result: int,
} as const;

export const im_lrmosaic = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // bandno
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
    int, // hwindowsize
    int, // hsearchsize
    int, // balancetype
    int, // mwidth
  ],
  result: int,
} as const;

export const im_lrmosaic1 = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // bandno
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
    int, // hwindowsize
    int, // hsearchsize
    int, // balancetype
    int, // mwidth
  ],
  result: int,
} as const;

export const im_make_xy = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
  ],
  result: int,
} as const;

export const im_maplut = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // lut
  ],
  result: int,
} as const;

export const im_mask2vips = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_match_linear = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
  ],
  result: int,
} as const;

export const im_match_linear_search = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
    int, // hwindowsize
    int, // hsearchsize
  ],
  result: int,
} as const;

export const im_max = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const im_maxpos = {
  parameters: [
    buf(int), // in
    buf(int), // xpos
    buf(int), // ypos
    buf(double), // out
  ],
  result: int,
} as const;

export const im_maxpos_avg = {
  parameters: [
    buf(int), // im
    buf(double), // xpos
    buf(double), // ypos
    buf(double), // out
  ],
  result: int,
} as const;

export const im_maxpos_subpel = {
  parameters: [
    buf(int), // in
    buf(double), // x
    buf(double), // y
  ],
  result: int,
} as const;

export const im_maxpos_vec = {
  parameters: [
    buf(int), // im
    buf(int), // xpos
    buf(int), // ypos
    buf(double), // maxima
    int, // n
  ],
  result: int,
} as const;

export const im_maxvalue = {
  parameters: [
    buf(buf(int)), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

export const im_measure_area = {
  parameters: [
    buf(int), // im
    int, // left
    int, // top
    int, // width
    int, // height
    int, // h
    int, // v
    buf(int), // sel
    int, // nsel
    cstringT, // name
  ],
  result: buf(int),
} as const;

export const im_min = {
  parameters: [
    buf(int), // in
    buf(double), // out
  ],
  result: int,
} as const;

export const im_minpos = {
  parameters: [
    buf(int), // in
    buf(int), // xpos
    buf(int), // ypos
    buf(double), // out
  ],
  result: int,
} as const;

export const im_minpos_vec = {
  parameters: [
    buf(int), // im
    buf(int), // xpos
    buf(int), // ypos
    buf(double), // minima
    int, // n
  ],
  result: int,
} as const;

export const im_more = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_more_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_moreconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_moreeq = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_moreeq_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_moreeqconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_mpercent = {
  parameters: [
    buf(int), // in
    double, // percent
    buf(int), // out
  ],
  result: int,
} as const;

export const im_mpercent_hist = {
  parameters: [
    buf(int), // hist
    double, // percent
    buf(int), // out
  ],
  result: int,
} as const;

export const im_msb = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_msb_band = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // band
  ],
  result: int,
} as const;

export const im_multiply = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_notequal = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_notequal_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_notequalconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

// Symbol im_offsets45 not exported by lib libvips.so
export const im_open = {
  parameters: [
    cstringT, // filename
    cstringT, // mode
  ],
  result: buf(int),
} as const;

export const im_open_local = {
  parameters: [
    buf(int), // parent
    cstringT, // filename
    cstringT, // mode
  ],
  result: buf(int),
} as const;

export const im_open_local_array = {
  parameters: [
    buf(int), // parent
    buf(buf(int)), // images
    int, // n
    cstringT, // filename
    cstringT, // mode
  ],
  result: int,
} as const;

export const im_orimage = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_orimage_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_orimageconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_phasecor_fft = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_point = {
  parameters: [
    buf(int), // im
    buf(int), // interpolate
    double, // x
    double, // y
    int, // band
    buf(double), // out
  ],
  result: int,
} as const;

export const im_point_bilinear = {
  parameters: [
    buf(int), // im
    double, // x
    double, // y
    int, // band
    buf(double), // out
  ],
  result: int,
} as const;

export const im_powtra = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // e
  ],
  result: int,
} as const;

export const im_powtra_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // e
  ],
  result: int,
} as const;

export const im_profile = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // dir
  ],
  result: int,
} as const;

export const im_project = {
  parameters: [
    buf(int), // in
    buf(int), // hout
    buf(int), // vout
  ],
  result: int,
} as const;

export const im_quadratic = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // coeff
  ],
  result: int,
} as const;

export const im_rad2float = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rank = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // width
    int, // height
    int, // index
  ],
  result: int,
} as const;

export const im_rank_image = {
  parameters: [
    buf(buf(int)), // in
    buf(int), // out
    int, // n
    int, // index
  ],
  result: int,
} as const;

export const im_read_point = {
  parameters: [
    buf(int), // image
    int, // x
    int, // y
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_recomb = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // recomb
  ],
  result: int,
} as const;

export const im_ref_string_get_length = {
  parameters: [
    buf(int), // value
  ],
  result: int,
} as const;

export const im_remainder = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_remainder_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_remainderconst = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // c
  ],
  result: int,
} as const;

export const im_remosaic = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // old_str
    cstringT, // new_str
  ],
  result: int,
} as const;

export const im_replicate = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // across
    int, // down
  ],
  result: int,
} as const;

export const im_ri2c = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rightshift_size = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // xshift
    int, // yshift
    int, // band_fmt
  ],
  result: int,
} as const;

export const im_rint = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rot180 = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rot270 = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rot90 = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_rotquad = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_scale = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_scaleps = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_sharpen = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // mask_size
    double, // x1
    double, // y2
    double, // y3
    double, // m1
    double, // m2
  ],
  result: int,
} as const;

export const im_shiftleft = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

export const im_shiftleft_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_shiftright = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
  ],
  result: int,
} as const;

export const im_shiftright_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_shrink = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // xshrink
    double, // yshrink
  ],
  result: int,
} as const;

export const im_sign = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_sines = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
    double, // horfreq
    double, // verfreq
  ],
  result: int,
} as const;

export const im_sintra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_skip_dir = {
  parameters: [
    cstringT, // filename
  ],
  result: cstringT,
} as const;

export const im_spcor = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_sRGB2XYZ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_stats = {
  parameters: [
    buf(int), // in
  ],
  result: buf(int),
} as const;

export const im_stdif = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // a
    double, // m0
    double, // b
    double, // s0
    int, // xwin
    int, // ywin
  ],
  result: int,
} as const;

export const im_subsample = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // xshrink
    int, // yshrink
  ],
  result: int,
} as const;

export const im_subtract = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_system = {
  parameters: [
    buf(int), // im
    cstringT, // cmd
    cstringArrayT, // out
  ],
  result: int,
} as const;

export const im_system_image = {
  parameters: [
    buf(int), // im
    cstringT, // in_format
    cstringT, // out_format
    cstringT, // cmd_format
    cstringArrayT, // log
  ],
  result: buf(int),
} as const;

export const im_tantra = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_tbjoin = {
  parameters: [
    buf(int), // top
    buf(int), // bottom
    buf(int), // out
  ],
  result: int,
} as const;

export const im_tbmerge = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // dx
    int, // dy
    int, // mwidth
  ],
  result: int,
} as const;

export const im_tbmerge1 = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
    int, // mwidth
  ],
  result: int,
} as const;

export const im_tbmosaic = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // bandno
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
    int, // hwindowsize
    int, // hsearchsize
    int, // balancetype
    int, // mwidth
  ],
  result: int,
} as const;

export const im_tbmosaic1 = {
  parameters: [
    buf(int), // ref
    buf(int), // sec
    buf(int), // out
    int, // bandno
    int, // xr1
    int, // yr1
    int, // xs1
    int, // ys1
    int, // xr2
    int, // yr2
    int, // xs2
    int, // ys2
    int, // hwindowsize
    int, // hsearchsize
    int, // balancetype
    int, // mwidth
  ],
  result: int,
} as const;

export const im_text = {
  parameters: [
    buf(int), // out
    cstringT, // text
    cstringT, // font
    int, // width
    int, // alignment
    int, // dpi
  ],
  result: int,
} as const;

export const im_tile_cache_random = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // tile_width
    int, // tile_height
    int, // max_tiles
  ],
  result: int,
} as const;

export const im_tone_analyse = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // Ps
    double, // Pm
    double, // Ph
    double, // S
    double, // M
    double, // H
  ],
  result: int,
} as const;

export const im_tone_build = {
  parameters: [
    buf(int), // out
    double, // Lb
    double, // Lw
    double, // Ps
    double, // Pm
    double, // Ph
    double, // S
    double, // M
    double, // H
  ],
  result: int,
} as const;

export const im_tone_build_range = {
  parameters: [
    buf(int), // out
    int, // in_max
    int, // out_max
    double, // Lb
    double, // Lw
    double, // Ps
    double, // Pm
    double, // Ph
    double, // S
    double, // M
    double, // H
  ],
  result: int,
} as const;

export const im_tone_map = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // lut
  ],
  result: int,
} as const;

export const im_Type2char = {
  parameters: [
    int, // type
  ],
  result: cstringT,
} as const;

export const im_UCS2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_UCS2LCh = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_UCS2XYZ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_vips2imask = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: buf(int),
} as const;

export const im_vips2mask = {
  parameters: [
    buf(int), // in
    cstringT, // filename
  ],
  result: buf(int),
} as const;

export const im_wrap = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const im_wrapmany = {
  parameters: [
    buf(buf(int)), // in
    buf(int), // out
    im_wrapmany_fnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_wrapone = {
  parameters: [
    buf(int), // in
    buf(int), // out
    im_wrapone_fnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_wraptwo = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
    im_wraptwo_fnT, // fn
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_XYZ2Lab = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_XYZ2Lab_temp = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // X0
    double, // Y0
    double, // Z0
  ],
  result: int,
} as const;

export const im_XYZ2sRGB = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_XYZ2UCS = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_XYZ2Yxy = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_Yxy2XYZ = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_zerox = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // sign
  ],
  result: int,
} as const;

export const im_zone = {
  parameters: [
    buf(int), // out
    int, // size
  ],
  result: int,
} as const;

export const im_zoom = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // xfac
    int, // yfac
  ],
  result: int,
} as const;

// Symbol imb_Lab2LabS not exported by lib libvips.so
// Symbol imb_LabS2Lab not exported by lib libvips.so
// Symbol imb_LCh2Lab not exported by lib libvips.so
// Symbol imb_XYZ2Lab not exported by lib libvips.so
export const vips__deprecated_open_read = {
  parameters: [
    cstringT, // filename
    int, // sequential
  ],
  result: buf(int),
} as const;

export const vips__deprecated_open_write = {
  parameters: [
    cstringT, // filename
  ],
  result: buf(int),
} as const;

export const vips__find_lroverlap = {
  parameters: [
    buf(int), // ref_in
    buf(int), // sec_in
    buf(int), // out
    int, // bandno_in
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
    int, // halfcorrelation
    int, // halfarea
    buf(int), // dx0
    buf(int), // dy0
    buf(double), // scale1
    buf(double), // angle1
    buf(double), // dx1
    buf(double), // dy1
  ],
  result: int,
} as const;

export const vips__find_tboverlap = {
  parameters: [
    buf(int), // ref_in
    buf(int), // sec_in
    buf(int), // out
    int, // bandno_in
    int, // xref
    int, // yref
    int, // xsec
    int, // ysec
    int, // halfcorrelation
    int, // halfarea
    buf(int), // dx0
    buf(int), // dy0
    buf(double), // scale1
    buf(double), // angle1
    buf(double), // dx1
    buf(double), // dy1
  ],
  result: int,
} as const;

export const vips__ink_to_vector = {
  parameters: [
    cstringT, // domain
    buf(int), // im
    buf(int), // ink
    buf(int), // n
  ],
  result: buf(double),
} as const;

export const vips_check_dmask = {
  parameters: [
    cstringT, // domain
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_check_dmask_1d = {
  parameters: [
    cstringT, // domain
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_check_imask = {
  parameters: [
    cstringT, // domain
    buf(int), // mask
  ],
  result: int,
} as const;

export const vips_get_option_group = {
  parameters: [],
  result: buf(int),
} as const;

export const vips_image_new_mode = {
  parameters: [
    cstringT, // filename
    cstringT, // mode
  ],
  result: buf(int),
} as const;

export const vips_popenf = {
  parameters: [
    cstringT, // fmt
    cstringT, // mode
  ],
  result: buf(int),
} as const;

export const vips_window_ref = {
  parameters: [
    buf(int), // im
    int, // top
    int, // height
  ],
  result: buf(int),
} as const;
