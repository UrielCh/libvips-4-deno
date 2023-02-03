import * as fncClang_c_Documentation from "./clang-c/Documentation.h.ts";
import * as fncClang_c_Rewrite from "./clang-c/Rewrite.h.ts";
import * as fncClang_c_Index from "./clang-c/Index.h.ts";
import * as fncClang_c_CXSourceLocation from "./clang-c/CXSourceLocation.h.ts";
import * as fncClang_c_BuildSystem from "./clang-c/BuildSystem.h.ts";
import * as fncClang_c_FatalErrorHandler from "./clang-c/FatalErrorHandler.h.ts";
import * as fncClang_c_CXFile from "./clang-c/CXFile.h.ts";
import * as fncClang_c_CXCompilationDatabase from "./clang-c/CXCompilationDatabase.h.ts";
import * as fncClang_c_CXString from "./clang-c/CXString.h.ts";
import * as fncClang_c_CXDiagnostic from "./clang-c/CXDiagnostic.h.ts";

const IMPORTS = {
  ...fncClang_c_Documentation,
  ...fncClang_c_Rewrite,
  ...fncClang_c_Index,
  ...fncClang_c_CXSourceLocation,
  ...fncClang_c_BuildSystem,
  ...fncClang_c_FatalErrorHandler,
  ...fncClang_c_CXFile,
  ...fncClang_c_CXCompilationDatabase,
  ...fncClang_c_CXString,
  ...fncClang_c_CXDiagnostic,
} as const;

export type libShape = ReturnType<typeof Deno.dlopen<typeof IMPORTS>>;

export function getLib(path: string): libShape {
  return Deno.dlopen(path, IMPORTS);
}