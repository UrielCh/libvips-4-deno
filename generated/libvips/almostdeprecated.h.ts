import {
  buf,
  cstringT,
  double,
  func,
  im_arch_typeT,
  IMAGE_BOXT,
  int,
  ptr,
} from "./typeDefinitions.ts";

export const im_extract = {
  parameters: [
    buf(int),
    buf(int),
    buf(IMAGE_BOXT),
  ],
  result: int,
} as const;

export const im_measure = {
  parameters: [
    buf(int), // im
    buf(IMAGE_BOXT), // box
    int, // h
    int, // v
    buf(int), // sel
    int, // nsel
    cstringT, // name
  ],
  result: buf(int),
} as const;

export const im_isuint = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_isint = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_isfloat = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_isscalar = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_iscomplex = {
  parameters: [
    buf(int), // im
  ],
  result: int,
} as const;

export const im_c2ps = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_isnative = {
  parameters: [
    im_arch_typeT, // arch
  ],
  result: int,
} as const;

export const im_copy_from = {
  parameters: [
    buf(int), // in
    buf(int), // out
    im_arch_typeT, // architecture
  ],
  result: int,
} as const;

export const im_errormsg = {
  parameters: [
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const im_verrormsg = {
  parameters: [
    cstringT, // fmt
    int, // ap
  ],
  result: "void",
} as const;

export const im_errormsg_system = {
  parameters: [
    int, // err
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const im_diagnostics = {
  parameters: [
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const im_warning = {
  parameters: [
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const im_iterate = {
  parameters: [
    buf(int), // im
    int, // start
    int, // generate
    int, // stop
    ptr("void"), // a
    ptr("void"), // b
  ],
  result: int,
} as const;

export const im_render_priority = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // width
    int, // height
    int, // max
    int, // priority
    func({
  /** void (int *, int *, void *) */
  parameters: [
    buf(int), // int *
    buf(int), // int *
    ptr("void"), // void *
  ],
  result: "void",
}), // notify
    ptr("void"), // client
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

export const im_cmulnorm = {
  parameters: [
    buf(int), // in1
    buf(int), // in2
    buf(int), // out
  ],
  result: int,
} as const;

export const im_fav4 = {
  parameters: [
    buf(buf(int)),
    buf(int),
  ],
  result: int,
} as const;

export const im_gadd = {
  parameters: [
    double,
    buf(int),
    double,
    buf(int),
    double,
    buf(int),
  ],
  result: int,
} as const;

export const im_litecor = {
  parameters: [
    buf(int),
    buf(int),
    buf(int),
    int,
    double,
  ],
  result: int,
} as const;

export const im_render_fade = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // width
    int, // height
    int, // max
    int, // fps
    int, // steps
    int, // priority
    func({
  /** void (int *, int *, void *) */
  parameters: [
    buf(int), // int *
    buf(int), // int *
    ptr("void"), // void *
  ],
  result: "void",
}), // notify
    ptr("void"), // client
  ],
  result: int,
} as const;

export const im_render = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // width
    int, // height
    int, // max
    func({
  /** void (int *, int *, void *) */
  parameters: [
    buf(int), // int *
    buf(int), // int *
    ptr("void"), // void *
  ],
  result: "void",
}), // notify
    ptr("void"), // client
  ],
  result: int,
} as const;

export const im_cooc_matrix = {
  parameters: [
    buf(int), // im
    buf(int), // m
    int, // xp
    int, // yp
    int, // xs
    int, // ys
    int, // dx
    int, // dy
    int, // flag
  ],
  result: int,
} as const;

export const im_cooc_asm = {
  parameters: [
    buf(int), // m
    buf(double), // asmoment
  ],
  result: int,
} as const;

export const im_cooc_contrast = {
  parameters: [
    buf(int), // m
    buf(double), // contrast
  ],
  result: int,
} as const;

export const im_cooc_correlation = {
  parameters: [
    buf(int), // m
    buf(double), // correlation
  ],
  result: int,
} as const;

export const im_cooc_entropy = {
  parameters: [
    buf(int), // m
    buf(double), // entropy
  ],
  result: int,
} as const;

export const im_glds_matrix = {
  parameters: [
    buf(int), // im
    buf(int), // m
    int, // xpos
    int, // ypos
    int, // xsize
    int, // ysize
    int, // dx
    int, // dy
  ],
  result: int,
} as const;

export const im_glds_asm = {
  parameters: [
    buf(int), // m
    buf(double), // asmoment
  ],
  result: int,
} as const;

export const im_glds_contrast = {
  parameters: [
    buf(int), // m
    buf(double), // contrast
  ],
  result: int,
} as const;

export const im_glds_entropy = {
  parameters: [
    buf(int), // m
    buf(double), // entropy
  ],
  result: int,
} as const;

export const im_glds_mean = {
  parameters: [
    buf(int), // m
    buf(double), // mean
  ],
  result: int,
} as const;

export const im_dif_std = {
  parameters: [
    buf(int), // im
    int, // xpos
    int, // ypos
    int, // xsize
    int, // ysize
    int, // dx
    int, // dy
    buf(double), // pmean
    buf(double), // pstd
  ],
  result: int,
} as const;

export const im_simcontr = {
  parameters: [
    buf(int), // out
    int, // xsize
    int, // ysize
  ],
  result: int,
} as const;

export const im_spatres = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // step
  ],
  result: int,
} as const;

export const im_stretch3 = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // dx
    double, // dy
  ],
  result: int,
} as const;

export const im_remainderconst_vec = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // n
    buf(double), // c
  ],
  result: int,
} as const;

export const im_andconst = {
  parameters: [
    buf(int),
    buf(int),
    double,
  ],
  result: int,
} as const;

export const im_and_vec = {
  parameters: [
    buf(int),
    buf(int),
    int,
    buf(double),
  ],
  result: int,
} as const;

export const im_orconst = {
  parameters: [
    buf(int),
    buf(int),
    double,
  ],
  result: int,
} as const;

export const im_or_vec = {
  parameters: [
    buf(int),
    buf(int),
    int,
    buf(double),
  ],
  result: int,
} as const;

export const im_eorconst = {
  parameters: [
    buf(int),
    buf(int),
    double,
  ],
  result: int,
} as const;

export const im_eor_vec = {
  parameters: [
    buf(int),
    buf(int),
    int,
    buf(double),
  ],
  result: int,
} as const;

export const im_affine = {
  parameters: [
    buf(int), // in
    buf(int), // out
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

export const im_similarity = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // a
    double, // b
    double, // dx
    double, // dy
  ],
  result: int,
} as const;

export const im_similarity_area = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double, // a
    double, // b
    double, // dx
    double, // dy
    int, // ox
    int, // oy
    int, // ow
    int, // oh
  ],
  result: int,
} as const;

export const im_icc_export = {
  parameters: [
    buf(int), // in
    buf(int), // out
    cstringT, // output_profile_filename
    int, // intent
  ],
  result: int,
} as const;

export const im_clip2dcm = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2cm = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2us = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2ui = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2s = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2i = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2d = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2f = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_clip2c = {
  parameters: [
    buf(int), // in
    buf(int), // out
  ],
  result: int,
} as const;

export const im_slice = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double,
    double,
  ],
  result: int,
} as const;

export const im_thresh = {
  parameters: [
    buf(int), // in
    buf(int), // out
    double,
  ],
  result: int,
} as const;

export const im_print = {
  parameters: [
    cstringT, // message
  ],
  result: int,
} as const;

export const im_convsub = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
    int, // xskip
    int, // yskip
  ],
  result: int,
} as const;

export const im_bernd = {
  parameters: [
    cstringT, // tiffname
    int, // x
    int, // y
    int, // w
    int, // h
  ],
  result: int,
} as const;

export const im_resize_linear = {
  parameters: [
    buf(int),
    buf(int),
    int,
    int,
  ],
  result: int,
} as const;

export const im_convf = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsepf = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_conv_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convf_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsep_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_convsepf_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // mask
  ],
  result: int,
} as const;

export const im_fastcor_raw = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_spcor_raw = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
  ],
  result: int,
} as const;

export const im_gradcor_raw = {
  parameters: [
    buf(int), // in
    buf(int), // ref
    buf(int), // out
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

// Symbol im_stdif_raw not exported by lib libvips.so
// Symbol im_lhisteq_raw not exported by lib libvips.so
export const im_erode_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // m
  ],
  result: int,
} as const;

export const im_dilate_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    buf(int), // m
  ],
  result: int,
} as const;

export const im_rank_raw = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // xsize
    int, // ysize
    int, // order
  ],
  result: int,
} as const;

export const im_circle = {
  parameters: [
    buf(int), // im
    int, // cx
    int, // cy
    int, // radius
    int, // intensity
  ],
  result: int,
} as const;

export const im_line = {
  parameters: [
    buf(int),
    int,
    int,
    int,
    int,
    int,
  ],
  result: int,
} as const;

export const im_segment = {
  parameters: [
    buf(int), // test
    buf(int), // mask
    buf(int), // segments
  ],
  result: int,
} as const;

export const im_paintrect = {
  parameters: [
    buf(int), // im
    buf(int), // r
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_insertplace = {
  parameters: [
    buf(int), // main
    buf(int), // sub
    int, // x
    int, // y
  ],
  result: int,
} as const;

export const im_flood_copy = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // x
    int, // y
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_flood_blob_copy = {
  parameters: [
    buf(int), // in
    buf(int), // out
    int, // x
    int, // y
    buf(int), // ink
  ],
  result: int,
} as const;

export const im_flood_other_copy = {
  parameters: [
    buf(int), // test
    buf(int), // mark
    buf(int), // out
    int, // x
    int, // y
    int, // serial
  ],
  result: int,
} as const;

export const im_flood = {
  parameters: [
    buf(int), // im
    int, // x
    int, // y
    buf(int), // ink
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_flood_blob = {
  parameters: [
    buf(int), // im
    int, // x
    int, // y
    buf(int), // ink
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_flood_other = {
  parameters: [
    buf(int), // test
    buf(int), // mark
    int, // x
    int, // y
    int, // serial
    buf(int), // dout
  ],
  result: int,
} as const;

export const im_fastline = {
  parameters: [
    buf(int), // im
    int, // x1
    int, // y1
    int, // x2
    int, // y2
    buf(int), // pel
  ],
  result: int,
} as const;

export const im_fastlineuser = {
  parameters: [
    buf(int), // im
    int, // x1
    int, // y1
    int, // x2
    int, // y2
    int, // fn
    ptr("void"), // client1
    ptr("void"), // client2
    ptr("void"), // client3
  ],
  result: int,
} as const;

export const im_plotmask = {
  parameters: [
    buf(int), // im
    int, // ix
    int, // iy
    buf(int), // ink
    buf(int), // mask
    buf(int), // r
  ],
  result: int,
} as const;

export const im_readpoint = {
  parameters: [
    buf(int), // im
    int, // x
    int, // y
    buf(int), // pel
  ],
  result: int,
} as const;

export const im_plotpoint = {
  parameters: [
    buf(int), // im
    int, // x
    int, // y
    buf(int), // pel
  ],
  result: int,
} as const;

export const im_smudge = {
  parameters: [
    buf(int), // image
    int, // ix
    int, // iy
    buf(int), // r
  ],
  result: int,
} as const;

export const im_smear = {
  parameters: [
    buf(int), // im
    int, // ix
    int, // iy
    buf(int), // r
  ],
  result: int,
} as const;

export const vips_warn = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_vwarn = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
    int, // ap
  ],
  result: "void",
} as const;

export const vips_info_set = {
  parameters: [
    int, // info
  ],
  result: "void",
} as const;

export const vips_info = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
  ],
  result: "void",
} as const;

export const vips_vinfo = {
  parameters: [
    cstringT, // domain
    cstringT, // fmt
    int, // ap
  ],
  result: "void",
} as const;

export const vips_autorot_get_angle = {
  parameters: [
    buf(int), // image
  ],
  result: int,
} as const;

export const vips_free = {
  parameters: [
    ptr("void"), // buf
  ],
  result: int,
} as const;
