import { join } from "https://deno.land/std@0.170.0/path/mod.ts";
// can be use to improve error handling but requires extra --allow-read permission
// import { existsSync } from "https://deno.land/std@0.170.0/fs/mod.ts";

import * as BuildSystem from "./include/clang-c/BuildSystem.h.ts";
import * as CXCompilationDatabase from "./include/clang-c/CXCompilationDatabase.h.ts";
import * as CXDiagnostic from "./include/clang-c/CXDiagnostic.h.ts";
import * as CXFile from "./include/clang-c/CXFile.h.ts";
import * as CXSourceLocation from "./include/clang-c/CXSourceLocation.h.ts";
import * as CXString from "./include/clang-c/CXString.h.ts";
import * as Documentation from "./include/clang-c/Documentation.h.ts";
import * as FatalErrorHandler from "./include/clang-c/FatalErrorHandler.h.ts";
import * as Index from "./include/clang-c/Index.h.ts";
import * as Rewrite from "./include/clang-c/Rewrite.h.ts";

/**
 * Windows dll have a few missing symbols
 * windows dll come from `choco install --version 14.0.6 llvm`
 * md5 59beb52cef40898b0f24cdffc6cf2984
 * `dumpbin /exports libclang.dll`
 */
const WINDOWS_MISSING_SET = [
  "clang_install_aborting_llvm_fatal_error_handler",
  "clang_uninstall_llvm_fatal_error_handler",
] as const;

type WindowsMissingSet = typeof WINDOWS_MISSING_SET[number];

const IMPORTS = {
  ...BuildSystem,
  ...CXCompilationDatabase,
  ...CXDiagnostic,
  ...CXFile,
  ...CXSourceLocation,
  ...CXString,
  ...Documentation,
  ...FatalErrorHandler,
  ...Index,
  ...Rewrite,
} as const;

export type clangExportUnix = typeof IMPORTS;
export type clangExportCommon = Omit<clangExportUnix, WindowsMissingSet>;

export type clangLib = ReturnType<typeof Deno.dlopen<clangExportUnix | clangExportCommon>>;

function getClangLib(): clangLib {
  let isvalid = (_fn: string) => true;
  const candidate: string[] = [];
  const commonsPaths: string[] = [];
  let IMPORTS_OS: clangExportUnix | clangExportCommon = IMPORTS;
  if (Deno.build.os === "windows") {
    isvalid = (fn: string) => fn.endsWith(".dll");
    candidate.push("libclang.dll")
    commonsPaths.push('C:\\Program Files\\LLVM\\bin\\');
    IMPORTS_OS = Object.fromEntries(Object.entries(IMPORTS).filter(([key]) => !WINDOWS_MISSING_SET.includes(key as WindowsMissingSet))) as clangExportCommon;
  } else if (Deno.build.os === "darwin") {
    isvalid = (fn: string) => fn.endsWith(".dylib");
    candidate.push("libclang.dylib")
    commonsPaths.push('/opt/homebrew/opt/llvm@14/lib/');
    commonsPaths.push('/usr/local/opt/llvm@14/lib/');
  } else {
    isvalid = (fn: string) => fn.includes(".so");
    candidate.push("libclang-14.so.1", "libclang.so")
    candidate.push("libclang.so.14.0.6", "libclang.so.14");
    commonsPaths.push('/usr/lib/llvm-14/lib/');
  }
  const libclangPaths = (Deno.env.get("LIBCLANG_PATH") || ';').split(';').filter(a => a);
  const LastErrors: Error[] = [];

  if (!libclangPaths.length) {
    libclangPaths.push(...commonsPaths);
  }
  for (let i = 0; i < libclangPaths.length; i++) {
    const libclangPath = libclangPaths[i];
    if (!isvalid(libclangPath)) {
      candidate.forEach(file => libclangPaths.push(join(libclangPath, file)))
    } else {
      try {
        return Deno.dlopen(libclangPath, IMPORTS_OS);
      } catch (e) {
        LastErrors.push(e)
      }
    }
  }
  throw LastErrors[LastErrors.length - 1]
}

const libclang = getClangLib()

export { libclang };
