import { CXChildVisitResult, CXCursorKind } from "./clang/include/typeDefinitions.ts";
import { CXCursor } from "./clang/mod.ts";
import {
  commentToJSDcoString,
  toAnyType,
} from "./build_utils.ts";
import { ContextGl } from "./Context.ts";

/** call on CXCursorKind.CXCursor_TypedefDecl */
export function onTypedefDecl(ctxt: ContextGl, cx: CXCursor) {
  const typedefName = cx.getDisplayName();

  if (ctxt.TYPE_MEMORY.has(typedefName))
    return;

  const originalTypeDeclaration = cx
    .getTypedefDeclarationOfUnderlyingType()!;
  let structDeclAnyType = toAnyType(
    ctxt.TYPE_MEMORY,
    originalTypeDeclaration,
  );

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
              throw new Error(
                "Parameter count mismatch between type and declaration",
              );
            }
            parameter.name = child.getSpelling() || parameter.name;
          }
          return CXChildVisitResult.CXChildVisit_Continue;
        });
        structDeclAnyType = {
          ...structDeclAnyType.pointee,
          name: typedefName,
          reprName: `${typedefName}T`,
          comment: commentToJSDcoString(
            cx.getParsedComment(),
            cx.getRawCommentText(),
          ),
        };

      } else {
        structDeclAnyType = {
          ...structDeclAnyType,
          name: typedefName,
          comment: commentToJSDcoString(
            cx.getParsedComment(),
            cx.getRawCommentText(),
          ),
        };
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
              throw new Error(
                "Parameter count mismatch between type and declaration",
              );
            }
            parameter.name = child.getSpelling() || parameter.name;
          }
          return CXChildVisitResult.CXChildVisit_Continue;
        });
        structDeclAnyType = {
          ...structDeclAnyType,
          name: typedefName,
          reprName: `${typedefName}T`,
          comment: commentToJSDcoString(
            cx.getParsedComment(),
            cx.getRawCommentText(),
          ),
        };

        break;
      }
    case "plain":
      structDeclAnyType = {
        ...structDeclAnyType,
        name: typedefName,
        comment: commentToJSDcoString(
          cx.getParsedComment(),
          cx.getRawCommentText(),
        ),
      };
      break;
    case "struct":
      structDeclAnyType = {
        ...structDeclAnyType,
        name: typedefName,
        reprName: `${typedefName}T`,
        comment: commentToJSDcoString(
          cx.getParsedComment(),
          cx.getRawCommentText(),
        ),
      };
      break;
    case "enum":
      structDeclAnyType = {
        ...structDeclAnyType,
        name: typedefName,
        reprName: `${typedefName}T`,
        comment: commentToJSDcoString(
          cx.getParsedComment(),
          cx.getRawCommentText(),
        ),
      };
      break;
    case "ref":
      structDeclAnyType = {
        ...structDeclAnyType,
        comment: commentToJSDcoString(
          cx.getParsedComment(),
          cx.getRawCommentText(),
        ),
      };
      break;
    default:
      throw new Error("unreachable");
  }
  if (structDeclAnyType.kind === "struct") {
    for (const field of structDeclAnyType.fields) {
      if (
        field.type.kind === "pointer" &&
        field.type.pointee.kind === "ref"
      ) {
        ctxt.POINTED_FROM_STRUCT.add(field.type.pointee.name);
      }
    }
  }
  ctxt.TYPE_MEMORY.set(typedefName, structDeclAnyType);
}