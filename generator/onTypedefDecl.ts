import { CXChildVisitResult, CXCursorKind } from "./clang/include/typeDefinitions.ts";
import { CXCursor } from "./clang/mod.ts";
import {
  cxCommentToJSDcoString,
  toAnyType,
} from "./build_utils.ts";
import { Context } from "./Context.ts";

/** call on CXCursorKind.CXCursor_TypedefDecl */
export function onTypedefDecl(ctxt: Context, cx: CXCursor) {
  const typedefName = cx.getDisplayName();

  if (ctxt.getTypeByName(typedefName))
    return;

  const originalTypeDeclaration = cx
    .getTypedefDeclarationOfUnderlyingType()!;
  let structDeclAnyType = toAnyType(ctxt, originalTypeDeclaration);

  switch (structDeclAnyType.kind) {
    case "pointer": {
      if (structDeclAnyType.pointee.kind === "function") {
        // Inject parameter names from cursor
        const parameters = structDeclAnyType.pointee.parameters;
        let i = 0;
        cx.visitChildren((child) => {
          if (child.kind === CXCursorKind.CXCursor_ParmDecl) {
            const parameter = parameters[i++];
            if (!parameter) {
              throw new Error("Parameter count mismatch between type and declaration");
            }
            parameter.name = child.getSpelling() || parameter.name;
          }
          return CXChildVisitResult.CXChildVisit_Continue;
        });
        structDeclAnyType = { ...structDeclAnyType.pointee, name: typedefName, reprName: `${typedefName}T`};
      } else {
        structDeclAnyType = { ...structDeclAnyType, name: typedefName};
      }
      break;
    }
    case "function":
      {
        // Inject parameter names from cursor
        const parameters = structDeclAnyType.parameters;
        let i = 0;
        cx.visitChildren((child) => {
          if (child.kind === CXCursorKind.CXCursor_ParmDecl) {
            const parameter = parameters[i++];
            if (!parameter) {
              throw new Error("Parameter count mismatch between type and declaration");
            }
            parameter.name = child.getSpelling() || parameter.name;
          }
          return CXChildVisitResult.CXChildVisit_Continue;
        });
        structDeclAnyType = { ...structDeclAnyType, name: typedefName, reprName: `${typedefName}T` };
        break;
      }
    case "plain":
      structDeclAnyType = { ...structDeclAnyType, name: typedefName };
      break;
    case "struct":
      structDeclAnyType = { ...structDeclAnyType, name: typedefName, reprName: `${typedefName}T` };
      break;
    case "enum":
      structDeclAnyType = { ...structDeclAnyType, name: typedefName, reprName: `${typedefName}T` };
      break;
    case "ref":
      structDeclAnyType = { ...structDeclAnyType };
      break;
    default:
      throw new Error("unreachable");
  }
  structDeclAnyType.comment = cxCommentToJSDcoString(cx);
  if (structDeclAnyType.kind === "struct") {
    for (const { type } of structDeclAnyType.fields) {
      if ( type.kind === "pointer" && type.pointee.kind === "ref") {
        ctxt.POINTED_FROM_STRUCT.add(type.pointee.name);
      }
    }
  }
  ctxt.addType(typedefName, structDeclAnyType);
}
