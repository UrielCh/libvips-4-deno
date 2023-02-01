import * as clang_c_Documentation from "./clang-c/Documentation.h.ts";
import * as clang_c_Rewrite from "./clang-c/Rewrite.h.ts";
import * as clang_c_Index from "./clang-c/Index.h.ts";
import * as clang_c_CXSourceLocation from "./clang-c/CXSourceLocation.h.ts";
import * as clang_c_BuildSystem from "./clang-c/BuildSystem.h.ts";
import * as clang_c_FatalErrorHandler from "./clang-c/FatalErrorHandler.h.ts";
import * as clang_c_CXFile from "./clang-c/CXFile.h.ts";
import * as clang_c_CXCompilationDatabase from "./clang-c/CXCompilationDatabase.h.ts";
import * as clang_c_CXString from "./clang-c/CXString.h.ts";
import * as clang_c_CXDiagnostic from "./clang-c/CXDiagnostic.h.ts";

const IMPORTS = {
  ...clang_c_Documentation,
  ...clang_c_Rewrite,
  ...clang_c_Index,
  ...clang_c_CXSourceLocation,
  ...clang_c_BuildSystem,
  ...clang_c_FatalErrorHandler,
  ...clang_c_CXFile,
  ...clang_c_CXCompilationDatabase,
  ...clang_c_CXString,
  ...clang_c_CXDiagnostic,
} as const;

export type libShape = ReturnType<typeof Deno.dlopen<typeof IMPORTS>>;

export function getLib(path: string): libShape {
  return Deno.dlopen(path, IMPORTS);
}