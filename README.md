# libvips-4-deno

ffi is currently par of unstable Deno feature, this project should help maturing this API

use libvips from deno using ffi

## sub-project

once completed each part of this project going to be convert to it's own project.

- [pystruct](https://deno.land/x/pystruct@0.0.3) accessing data from a C Object with this isomorphic implementation of Python struct.
- not splitted yet: FFIMapper an easy way to map C stuct to Deno Class.

## todo

### write an lib symbole exporter

- using nm on mac to read .dylib files
```bash
nm -gU /usr/lib/swift/libswiftRemoteMirror.dylib
```

- using `readelf` or 'nm' on linux
```bash
nm -D --demangle  /usr/lib/nginx/modules/ngx_stream_geoip_module.so

apt install binutils-multiarch
readelf --wide  --dyn-syms  /usr/lib/nginx/modules/ngx_stream_geoip_module.so
```

## References:

- [libvips introduction for C](https://github.com/libvips/libvips/blob/master/doc/How-it-works.md)
- [github ffi issue](https://github.com/denoland/deno/issues/17466)
- [best ffi documentation](https://denonomicon.deno.dev/)
- [an ffi mapping for libClang](https://github.com/aapoalas/libclang_deno)
- [the deno ffi tutorial from @aapoalas](https://github.com/aapoalas/deno-ffi-tutorial)
