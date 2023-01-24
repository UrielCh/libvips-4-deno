import { join } from "https://deno.land/std@0.173.0/path/mod.ts";
import { dirname, toFileUrl, fromFileUrl } from "https://deno.land/std@0.173.0/path/win32.ts";


const __filename = dirname(fromFileUrl(import.meta.url));
// const libPath = new URL(`../vips-dev-8.14/bin/${libFileName}`, import.meta.url);

export function locateLib(name: string): URL {
    let libSuffix = "";
    switch (Deno.build.os) {
       case "windows": libSuffix = "dll"; break;
       case "darwin": libSuffix = "dylib"; break;
       default: libSuffix = "so"; break;
    }
 
    const dirs: string[] = [];
    dirs.push('C:\\ProgramData\\chocolatey\\lib\\deno\\')
    //Deno.env.get("LD_LIBRARY_PATH")?.split(":") ?? []
    dirs.push('/usr/lib/x86_64-linux-gnu/');
    dirs.push(join(__filename, '..', 'vips-dev-8.14', 'bin'));
    const fn = `${name}.${libSuffix}`
 
    for (const dir of dirs) {
       const path = join(dir, fn);
       try {
          // console.log('testing ', path)
          Deno.statSync(path);
       } catch (e) {
          continue
       }
       return toFileUrl(path)
    }
    throw new Error(`Could not locate ${name} library`)
 }
 