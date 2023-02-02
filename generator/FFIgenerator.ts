import {
  dirname,
  join,
} from "https://deno.land/std@0.170.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.175.0/fs/mod.ts";

import {
  CXChildVisitResult,
  CXCursorKind,
} from "./clang/include/typeDefinitions.ts";
import * as libclang from "./clang/mod.ts";
import { CXCursor } from "./clang/mod.ts";
import {
  AnyType,
  anyTypeToString,
  CommonType,
  EnumType,
  FunctionType,
  PointerType,
  ReferenceType,
  structFieldToDeinlineString,
  StructType,
} from "./build_utils.ts";
import { ContextFile, ContextGlobal } from "./Context.ts";
import { onEnumDecl } from "./onEnumDecl.ts";
import { onFunctionDecl } from "./onFunctionDecl.ts";
import { onTypedefDecl } from "./onTypedefDecl.ts";
// import * as utils from "./utils.ts";

import { walk } from "https://deno.land/std@0.171.0/fs/walk.ts";

function cmt(elm: CommonType, offset = '  '): string {
  let { comment } = elm;
  if (!comment) return '';
  // comment = comment.replace('\n*\n*\n*', '*\n*')
  // comment = comment.replaceAll(/\n \*\n \*\s*\n \*/g, '\n *')
  comment = comment.split('\n').map(a => `${offset}${a.trimEnd()}`).join('\n')
  return `${comment}\n`;
}

export class FFIgenerator {
  private headerRoot: string;
  private files?: string[];
  private libFile: string;
  private destination: string;
  private includePaths: string[];
  private index: libclang.CXIndex;

  /**
   * Generator entry point
   * @param configurations.headerRoot The root directory of the header files
   * @param configurations.libFile The library file to check for exported symbols
   * @param configurations.destination The destination directory for the generated files
   * @param configurations.includePaths Additional include paths will be passed as -I to the C compiler
   */
  constructor(configurations: { headers: string, files?: string[], libFile: string, destination: string, includePaths?: string[] }) {
    this.destination = configurations.destination;
    this.libFile = configurations.libFile;
    this.files = configurations.files;
    this.headerRoot = configurations.headers;
    this.includePaths = configurations.includePaths || [];
    for (const inc of this.includePaths) {
      Deno.statSync(inc).isDirectory || (() => { throw new Error(`Include path ${inc} is not a directory`); })
    }
    this.index = new libclang.CXIndex(false, true);
  }

  generateEnum(ctxtGl: ContextGlobal): { code: string[] } {
    const results: string[] = [];
    /** enums */
    const enumsType = [...ctxtGl.TYPE_MEMORY.values()].filter(a => a.kind === "enum") as EnumType[];
    if (enumsType.length) {
      results.push(`/******** Start enums ********/`)
      for (const anyType of enumsType) {
        results.push(`${cmt(anyType, '')}export const enum ${anyType.name} {`);

        for (const value of anyType.values) {
          results.push(`${cmt(value)}  ${value.name}${value.value === null ? "" : ` = ${value.value}`},`)
        }
        results.push(`}`)
        const { code } = anyTypeToString(anyType.type);
        results.push(`${cmt(anyType, '')}export const ${anyType.reprName} = ${code};\n`); // fin push
      } // fin loop enum
      results.push(`/******** End enums ********/`)
    }
    return { code: results };
  }

  generatePrts(ctxtGl: ContextGlobal): { code: string[] } {
    const results: string[] = [];
    /**
     * ptr
     */
    const ptrType = [...ctxtGl.TYPE_MEMORY.values()].filter(a => a.kind === "pointer") as PointerType[];
    if (ptrType.length) {
      results.push(`/******** Start pointer ********/`)
      for (const anyType of ptrType) {
        if (anyType.name.includes(" ") || anyType.name.includes("*")) {
          throw new Error("Unexpected unnamed Pointer type:" + JSON.stringify(anyType));
        }
        const type = anyType.useBuffer ? "buf" : "ptr";
        const { code } = anyTypeToString(anyType.pointee);
        results.push(`${cmt(anyType, '')}export const ${anyType.name}T = ${type}(${code});`);
      }
      results.push(`/******** End pointer ********/`)
    }
    return { code: results };
  }

  generateStruct(ctxtGl: ContextGlobal, selection: Set<string>): { code: string[] } {
    const results: string[] = [];
    /**
     * struct
     */
    const stuctType = [...ctxtGl.TYPE_MEMORY.values()].filter(a => a.kind === "struct") as StructType[];
    if (stuctType.length) {
      const missingStruct = new Set<string>(stuctType.map(s => s.reprName));
      results.push(`/******** Start Struct ********/`)
      let added = 1;
      while (added > 0)
        loop: for (const anyType of stuctType) {
          added = 0;
          if (!missingStruct.has(anyType.reprName))
            continue;
          if (!selection.has(anyType.reprName)) {
            continue;
          }
          // check missing type usage;
          let uncomplet = false;
          for (const field of anyType.fields) {
            const { structField, dependencies } = structFieldToDeinlineString(anyType, field);
            if (missingStruct.has(structField)) {
              selection.add(structField)
              uncomplet = true;
            }
            for (const dep of dependencies) {
              if (missingStruct.has(dep)) {
                selection.add(dep)
                uncomplet = true;
              }
            }
          }
          if (uncomplet)
            continue loop;

          const next: string[] = [];
          added++;
          next.push(`${cmt(anyType, '')}export const ${anyType.reprName} = {`);
          next.push(`  /** Struct size: ${anyType.size} */`);
          next.push(`  struct: [`);
          for (const field of anyType.fields) {
            const { structField, extraCode, dependencies: structDependencies } = structFieldToDeinlineString(anyType, field);
            for (const type of structDependencies) {
              selection.add(type);
            }
            if (extraCode)
              results.push(extraCode)
            next.push(`${cmt(field, '    ')}    ${structField}, // ${field.name}, offset ${field.offset}, size ${field.size}`);
          }
          next.push(`  ],`);
          next.push(`} as const;\n`);
          results.push(next.join('\n'));
          missingStruct.delete(anyType.reprName);
        }
      results.push(`/******** End Struct ********/`)
    }
    return { code: results };
  }

  generateRefs(ctxtGl: ContextGlobal): { code: string[] } {
    const results: string[] = [];
    /**
     * ref
     */
    const RefType = new Map<string, ReferenceType>();
    for (const [name, anyType] of ctxtGl.TYPE_MEMORY) {
      if (anyType.kind === "ref") {
        RefType.set(name, anyType)
      }
    }
    if (RefType.size) {
      results.push(`/******** Start ref ********/`)
      for (const [name, anyType] of RefType) {
        const expName = name.endsWith("_t") ? name : `${name}T`;
        const curName = anyType.name.endsWith("_t") ? anyType.name : anyType.reprName;
        results.push(`${cmt(anyType)}export const ${expName} = ${curName};`);
      }
      results.push(`/******** end ref ********/`)
    }
    return { code: results };
  }


  generateFunctions(ctxtGl: ContextGlobal): { code: string[] } {
    const results: string[] = [];
    /**
     * function
     */
    const fncType = [...ctxtGl.TYPE_MEMORY.values()].filter(a => a.kind === "function") as FunctionType[];
    if (fncType.length) {
      results.push(`/******** Start Functions ********/`)
      for (const anyType of fncType) {
        results.push(`${cmt(anyType, '')}export const ${anyType.name}CallbackDefinition = {\n  parameters: [`);
        for (const param of anyType.parameters) {
          const { code } = anyTypeToString(param.type);
          results.push(`${cmt(param, '    ')}    ${code}, // ${param.name}`);
        }

        results.push('  ],\n');
        const { code } = anyTypeToString(anyType.result);
        results.push(`  result: ${code},`);
        results.push(`} as const;`);
        results.push(`${cmt(anyType, '')}export const ${anyType.reprName} = "function" as const;\n`);
      }
      results.push(`/******** End Functions ********/`)
    }
    return { code: results };
  }

  /**
   * functions files
   */
  emplaceRefs(imports: Set<string>, type: AnyType) {
    if (type.kind === "ref" || type.kind === "enum") {
      imports.add(type.name.endsWith("_t") ? type.name : type.reprName);
    } else if (type.kind === "plain") {
      if (type.type === "void") {
        return;
      }
      imports.add(type.name);
    } else if (type.kind === "struct") {
      imports.add(type.reprName);
    } else if (type.kind === "function") {
      imports.add("func");
      type.parameters.forEach((param) => {
        this.emplaceRefs(imports, param.type);
      });
      this.emplaceRefs(imports, type.result);
    } else if (type.kind === "pointer") {
      if (type.useBuffer) {
        imports.add("buf");
      } else {
        imports.add("ptr");
      }
      this.emplaceRefs(imports, type.pointee);
    }
  }

  async generate() {
    await ensureDir(this.destination);
    const includePaths = (this.includePaths || []).map(a => `-I${a}`);

    const HEADER_FILES: string[] = []
    if (this.files) {
      for (const header of this.files) {
        HEADER_FILES.push(header.replace(/^\//, ''));
      }
    } else {
      for await (const header of walk(this.headerRoot, { exts: ["h", "hpp"] })) {
        const path = header.path.replace(this.headerRoot, "")
        HEADER_FILES.push(path.replace(/^\//, ''));
      }
    }
    // console.log(HEADER_FILES);
    // HEADER_FILES = ['vips.h']; // , ...HEADER_FILES.filter(a => a!= 'vips.h')];
    // console.log(HEADER_FILES);
    // return;

    const headerRoot = this.headerRoot;
    const visiteHeaderFile = (ctxtGl: ContextGlobal, fileName: string) => {
      const ctxt = new ContextFile(ctxtGl, fileName);
      const fullPathName = join(headerRoot, fileName);
      const tu = this.index.parseTranslationUnit(
        fullPathName,
        includePaths,
        [],
      );

      const cursorChildVisitor = (cx: CXCursor) => {
        if (!cx.getLocation().isFromMainFile()) {
          return CXChildVisitResult.CXChildVisit_Continue;
        }
        switch (cx.kind) {
          case CXCursorKind.CXCursor_EnumDecl: {
            onEnumDecl(ctxt, cx);
            break;
          }
          case CXCursorKind.CXCursor_TypedefDecl: {
            onTypedefDecl(ctxt, cx);
            break;
          }
          case CXCursorKind.CXCursor_FunctionDecl: {
            onFunctionDecl(ctxt, cx);
            break;
          }
        }
        return CXChildVisitResult.CXChildVisit_Continue;
      };

      tu.getCursor().visitChildren(cursorChildVisitor);
    }

    const ctxtGl = new ContextGlobal();
    HEADER_FILES.forEach((fileName) => visiteHeaderFile(ctxtGl, fileName));

    const markReturnedByPointer = (typeName: string, type: AnyType) => {
      if (
        type.kind === "pointer" && type.pointee.kind === "ref" &&
        type.pointee.name === typeName
      ) {
        type.useBuffer = false;
      }
    };

    for (const returnedByPointer of ctxtGl.RETURNED_AS_POINTER) {
      for (const type of ctxtGl.TYPE_MEMORY.values()) {
        markReturnedByPointer(returnedByPointer, type);
      }
      for (const funcs of ctxtGl.FUNCTIONS_MAP.values()) {
        for (const func of funcs) {
          for (const param of func.parameters) {
            markReturnedByPointer(returnedByPointer, param.type);
          }
          markReturnedByPointer(returnedByPointer, func.result);
        }
      }
    }

    for (
      const [name, passedAsPointerNotReturned] of ctxtGl.PASSED_AS_POINTER_AND_NOT_RETURNED
    ) {
      if (passedAsPointerNotReturned === false || !ctxtGl.POINTED_FROM_STRUCT.has(name)) {
        continue;
      }
      for (const type of ctxtGl.TYPE_MEMORY.values()) {
        markReturnedByPointer(name, type);
      }
      for (const funcs of ctxtGl.FUNCTIONS_MAP.values()) {
        for (const func of funcs) {
          for (const param of func.parameters) {
            markReturnedByPointer(name, param.type);
          }
          markReturnedByPointer(name, func.result);
        }
      }
    }

    // Hard-coded exceptions
    try {
      // const INDEX_FUCNTIONS = ctxtGl.FUNCTIONS_MAP.get("Index.h")!;
      // clang_annotateTokens takes a user-defined C array of tokens, not a token pointer like tokens are usually passed around as.
      const clang_annotateTokens = ctxtGl.getExistingFunction("clang-c/Index.h", "clang_annotateTokens");
      const clang_annotateTokens_arg1 = clang_annotateTokens.parameters[1];
      if (clang_annotateTokens_arg1.type.kind !== "pointer") {
        throw new Error("unreachable");
      }
      clang_annotateTokens_arg1.type.useBuffer = true;
      // clang_disposeOverriddenCursors takes a C array of cursors as pointer received through an out-buffer from clang_getOverriddenCursors.
      const clang_disposeOverriddenCursors = ctxtGl.getExistingFunction("clang-c/Index.h", "clang_disposeOverriddenCursors");
      const clang_disposeOverriddenCursors_arg0 = clang_disposeOverriddenCursors.parameters[0];
      if (clang_disposeOverriddenCursors_arg0.type.kind !== "pointer") {
        throw new Error("unreachable");
      }
      clang_disposeOverriddenCursors_arg0.type.useBuffer = false;
    } catch (_e) {
      // ignore
    }

    const results: string[] = [
      'export const ptr = (_type: unknown) => "pointer" as const;',
      'export const buf = (_type: unknown) => "buffer" as const;',
      'export const func = (_func: unknown) => "function" as const;',
    ];

    for (const [name, anyType] of ctxtGl.TYPE_MEMORY) {
      if (anyType.kind === "plain") {
        if (anyType.name === "void") {
          // Cannot declare "void" type
          continue;
        }
        results.push(`${cmt(anyType, '')}export const ${name} = "${anyType.type}" as const;`)
        results.push('');
      }
    }

    const { dependencies, fileNames } = await this.genFunctionFiles(ctxtGl);

    const { code: enumCode } = this.generateEnum(ctxtGl);
    const { code: ptrCode } = this.generatePrts(ctxtGl);
    const { code: structCode } = this.generateStruct(ctxtGl, dependencies);
    const { code: RefCode } = this.generateRefs(ctxtGl);
    const { code: funcCode } = this.generateFunctions(ctxtGl);

    results.push(...enumCode);
    results.push(...ptrCode);
    results.push(...structCode);
    results.push(...RefCode);
    results.push(...funcCode);
    results.push('');
    /**
     * Write to file with all types
     */
    Deno.writeTextFileSync(join(this.destination, "typeDefinitions.ts"), results.join("\n"));
    // utils.formatSync(join(destination, "typeDefinitions.ts"));  
    this.genFFiFile(ctxtGl, fileNames);
  }

  genFFiFile(ctxtGl: ContextGlobal, fileNames: string[]): void {
    const results: string[] = [];
    const IMPORTS: string[] = ['const IMPORTS = {'];
    for (const [fileName] of ctxtGl.FUNCTIONS_MAP) {
      if (!fileNames.includes(fileName))
        continue;

      const sanitized = fileName.replaceAll(/[\/.-]/g, '_').replace(/.[hp]+$/, '')
      results.push(`import * as ${sanitized} from "./${fileName}.ts";`)
      IMPORTS.push(`  ...${sanitized},`);
    }
    IMPORTS.push(`} as const;`);
    results.push("");
    results.push(...IMPORTS);
    results.push("");
    results.push("export type libShape = ReturnType<typeof Deno.dlopen<typeof IMPORTS>>;");
    results.push("");
    results.push("export function getLib(path: string): libShape {");
    results.push("  return Deno.dlopen(path, IMPORTS);");
    results.push("}");
    Deno.writeTextFileSync(join(this.destination, "ffi.ts"), results.join("\n"));
  }

  /**
   * generate one ts file per header file having at least one exported function
   * @param ctxtGl 
   * @returns 
   */
  async genFunctionFiles(ctxtGl: ContextGlobal): Promise<{ dependencies: Set<string>, fileNames: string[] }> {    /** filter non exported function */
    const allDependencies = new Set<string>();
    const fileNames: string[] = [];
    for (const [fileName, apiFunctions] of ctxtGl.FUNCTIONS_MAP) {
      const imports = new Set<string>();

      const functionResults: string[] = [];
      for (const apiFunction of apiFunctions) {
        const { name, parameters, result } = apiFunction;
        let isAvailable = true;
        try {
          Deno.dlopen(
            this.libFile,
            { [name]: { type: "pointer" } },
          );
        } catch (err) {
          if (err.message.includes("No such file or directory")) {
            throw Error(`can log load lib ${this.libFile} No such file or directory`)
          }
          console.log(err.message)
          // Failed to register symbol clang_CXXMethod_isMoveAssignmentOperator: Could not obtain symbol from the library: /usr/lib/llvm-14/lib/libclang-14.so.1: undefined symbol: clang_CXXMethod_isMoveAssignmentOperator
          isAvailable = false;
        }
        if (!isAvailable)
          continue;
        this.emplaceRefs(imports, result);
        parameters.forEach((param) => this.emplaceRefs(imports, param.type));
        //const comment = 
        functionResults.push(`${cmt(apiFunction, '')}${isAvailable ? "export " : "// deno-lint-ignore no-unused-vars\n"}const ${name} = {`);
        if (parameters.length) {
          functionResults.push(`  parameters: [`);
          for (const param of parameters) {
            const { code, dependencies: paramDependencies } = anyTypeToString(param.type);
            paramDependencies.forEach((dep) => allDependencies.add(dep));
            const comment = param.name || param.comment ? ` // ${[param.name, param.comment].filter(Boolean).join(", ")}` : "";
            functionResults.push(`    ${code},${comment}`);
          }
          functionResults.push(`  ],`)
        } else {
          functionResults.push(`  parameters: [],`);
        }
        const { code, dependencies: retDependencies } = anyTypeToString(result);
        retDependencies.forEach((dep) => allDependencies.add(dep));
        functionResults.push(`  result: ${code},`);
        functionResults.push(`} as const;`);
        functionResults.push('');
      }
      // generate imports
      if (imports.size) {
        let relatif = '.'
        if (fileName.includes('/')) {
          relatif = '..'
        }
        let toImport = 'import {\n';
        const imps = [...imports].sort((a, b) => a.localeCompare(b));
        for (const importName of imps) {
          toImport += `  ${importName},\n`;
        }
        toImport += `} from "${relatif}/typeDefinitions.ts";\n`;
        functionResults.unshift(toImport);
      }
      // if there is any function write a file
      if (functionResults.length) {
        const dst = join(this.destination, `${fileName}.ts`);
        await ensureDir(dirname(dst));
        Deno.writeTextFileSync(dst, functionResults.join("\n"));
        fileNames.push(fileName);
        // utils.formatSync(dst);
      }
    }
    return { dependencies: allDependencies, fileNames }
  }

}