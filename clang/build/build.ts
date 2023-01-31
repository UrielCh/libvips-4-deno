import {
  dirname,
  fromFileUrl,
  join,

} from "https://deno.land/std@0.170.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.175.0/fs/mod.ts";

import {
  CXChildVisitResult,
  CXCursorKind,
} from "../include/typeDefinitions.ts";
import * as libclang from "../mod.ts";
import { CXCursor } from "../mod.ts";
import {
  AnyType,
  anyTypeToString,
  EnumType,
  structFieldToDeinlineString,
} from "./build_utils.ts";
import { ContextFile, ContextGlobal } from "./Context.ts";
import { onEnumDecl } from "./onEnumDecl.ts";
import { onFunctionDecl } from "./onFunctionDecl.ts";
import { onTypedefDecl } from "./onTypedefDecl.ts";
import * as utils from "./utils.ts";

import { walk } from "https://deno.land/std@0.171.0/fs/walk.ts";

{
  const includeDirectory = '/home/uriel/libclang_deno/build/include/'
  // join(dirname(fromFileUrl(import.meta.url)), "include");
  const includePaths = [
    "/usr/lib/clang/14.0.0/include/",
    `${includeDirectory}`,
  ];
  generateLibMapping({ headerRoot: includeDirectory, libFile: "/lib64/libclang.so.14.0.6", destination: './gen', includePaths });
}

async function generateLibMapping(configurations: { headerRoot: string, libFile: string, destination: string, includePaths?: string[] }) {
  const index = new libclang.CXIndex(false, true);
  const { destination } = configurations;
  await ensureDir(destination);

  const includePaths = (configurations.includePaths || []).map(a => `-I${a}`);

  const HEADER_FILES: string[] = []
  for await (const header of walk(configurations.headerRoot, { exts: ["h", "hpp"] })) {
    const path = header.path.replace(configurations.headerRoot, "")
    HEADER_FILES.push(path)
  }

  function visiteHeaderFile(ctxtGl: ContextGlobal, fileName: string) {
    const ctxt = new ContextFile(ctxtGl, fileName);
    const fullPathName = join(configurations.headerRoot, fileName);
    const tu = index.parseTranslationUnit(
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
          onEnumDecl(ctxt, cx)
          break;
        }
        case CXCursorKind.CXCursor_TypedefDecl: {
          onTypedefDecl(ctxt, cx)
          break
        }
        case CXCursorKind.CXCursor_FunctionDecl: {
          onFunctionDecl(ctxt, cx)
          break
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
  {
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
  }

  const results: string[] = [
    `export const ptr = (_type: unknown) => "pointer" as const;
export const buf = (_type: unknown) => "buffer" as const;
export const func = (_func: unknown) => "function" as const;
`,
  ];

  for (const [name, anyType] of ctxtGl.TYPE_MEMORY) {
    if (anyType.kind === "plain") {
      if (anyType.name === "void") {
        // Cannot declare "void" type
        continue;
      }
      results.push(
        `${anyType.comment ? `${anyType.comment}\n` : ""
        }export const ${name} = "${anyType.type}" as const;
`,
      );
    }
  }

  /** enums */

  const enumsType = [...ctxtGl.TYPE_MEMORY.values()].filter(a => a.kind === "enum") as EnumType[];
  if (enumsType.length) {
    results.push(`/******** Start enums ********/`)

    for (const anyType of enumsType) {
      const comment = anyType.comment ? `${anyType.comment}\n` : "";
      results.push(`${comment}export const enum ${anyType.name} {\n`);

      for (const value of anyType.values) {
        const comment = value.comment ? `${value.comment}\n` : "";
        results.push(`${comment}${value.name}${value.value === null ? "" : ` = ${value.value}`},`)
      }
      results.push(`}`)
      results.push(`${comment}export const ${anyType.reprName} = ${anyTypeToString(anyType.type)};\n`); // fin push
    } // fin loop enum
    results.push(`/******** End enums ********/`)
  }





  /**
   * rest
   */
  for (const [name, anyType] of ctxtGl.TYPE_MEMORY) {
    if (anyType.kind === "enum" || anyType.kind === "plain") {
      // Handled above
      continue;
    } else if (anyType.kind === "function") {
      results.push(
        `${anyType.comment ? `${anyType.comment}\n` : ""
        }export const ${anyType.name}CallbackDefinition = {
  parameters: [
${anyType.parameters.map((param) =>
          `${param.comment ? `    ${param.comment}\n    ` : "    "} ${anyTypeToString(param.type)
          }, // ${param.name} `
        ).join("\n")
        }
  ],
  result: ${anyTypeToString(anyType.result)},
} as const;
${anyType.comment
          ? `${anyType.comment}\n`
          : ""
        }export const ${anyType.reprName} = "function" as const;
`,
      );
    } else if (anyType.kind === "struct") {
      results.push(
        `${anyType.comment ? `${anyType.comment}\n` : ""
        }export const ${anyType.reprName} = {
  /** Struct size: ${anyType.size} */
  struct: [
${anyType.fields.map((field) => {
          return `${field.comment ? `    ${field.comment}\n    ` : "    "} ${structFieldToDeinlineString(results, anyType, field)
            }, // ${field.name}, offset ${field.offset}, size ${field.size}`;
        }).join("\n")
        }
  ],
} as const;
  `,
      );
    } else if (anyType.kind === "pointer") {
      if (anyType.name.includes(" ") || anyType.name.includes("*")) {
        throw new Error(
          "Unexpected unnamed Pointer type:" + JSON.stringify(anyType),
        );
      }
      results.push(
        `${anyType.comment ? `${anyType.comment}\n` : ""
        }export const ${anyType.name}T = ${anyType.useBuffer ? "buf" : "ptr"}(${anyTypeToString(anyType.pointee)
        });
`,
      );
    } else if (anyType.kind === "ref") {
      results.push(
        `${anyType.comment ? `${anyType.comment}\n` : ""}export const ${name.endsWith("_t") ? name : `${name}T`
        } = ${anyType.name.endsWith("_t") ? anyType.name : anyType.reprName};
`,
      );
    }
  }

  /**
   * Write to file with all types
   */

  Deno.writeTextFileSync(join(destination, "typeDefinitions.ts"), results.join("\n"));
  utils.formatSync(join(destination, "typeDefinitions.ts"));

  /**
   * functions files
   */
  const emplaceRefs = (imports: Set<string>, type: AnyType) => {
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
        emplaceRefs(imports, param.type);
      });
      emplaceRefs(imports, type.result);
    } else if (type.kind === "pointer") {
      if (type.useBuffer) {
        imports.add("buf");
      } else {
        imports.add("ptr");
      }
      emplaceRefs(imports, type.pointee);
    }
  };

  /** filter non exported function */
  for (const [fileName, apiFunctions] of ctxtGl.FUNCTIONS_MAP) {
    const imports = new Set<string>();

    const functionResults: string[] = [];
    for (const { comment, name, parameters, result } of apiFunctions) {
      let isAvailable = true;
      try {
        Deno.dlopen(
          configurations.libFile,
          { [name]: { type: "pointer" } },
        );
      } catch (_err) {
        isAvailable = false;
      }
      emplaceRefs(imports, result);
      parameters.forEach((param) => emplaceRefs(imports, param.type));
      functionResults.push(
        `${comment ? `${comment}\n` : ""}${isAvailable ? "export " : "// deno-lint-ignore no-unused-vars\n"
        }const ${name} = {
  parameters: [
    ${parameters.map((param) =>
          `${anyTypeToString(param.type)}, ${param.name || param.comment
            ? `// ${[param.name, param.comment].filter(Boolean).join(", ")}`
            : ""
          }`
        ).join("\n")
        }
  ],
  result: ${anyTypeToString(result)},
} as const;
`,
      );
    }
    // generate imports
    if (imports.size) {
      let relatif = '.'
      if (fileName.includes('/')) {
        relatif = '..'
      }
      functionResults.unshift(`import {
${[...imports].sort((a, b) => a.localeCompare(b)).map((importName) =>
        `  ${importName},`
      ).join("\n")
        }
} from "${relatif}/typeDefinitions.ts";
`);
    }
    // if there is any function write a file
    if (functionResults.length) {
      const dst = join(destination, `${fileName}.ts`);
      await ensureDir(dirname(dst));
      Deno.writeTextFileSync(dst, functionResults.join("\n"));
      utils.formatSync(dst);
    }
  }
}