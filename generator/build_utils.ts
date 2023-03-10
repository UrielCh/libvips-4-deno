import { CXSourceLocation } from "./clang/CXSourceLocation.ts";
import {
  CXChildVisitResult,
  CXCommentInlineCommandRenderKind,
  CXCommentKind,
  CXCommentParamPassDirection,
  CXCursorKind,
  CXTypeKind,
  CXTypeLayoutError,
  CXVisitorResult,
} from "./clang/include/typeDefinitions.ts";
import { CXComment, CXCursor, type CXType } from "./clang/mod.ts";
import { Context } from "./Context.ts";

export type ALL_KIND = "enum" | "plain" | "struct" | "function" | "pointer" | "ref";

export interface CommonType {
  /**
   * key name in the context
   */
  keyName?: string;
  kind?: ALL_KIND;
  name: string;
  comment: null | string;
}

export interface PlainType extends CommonType {
  kind: "plain";
  type:
  | "void"
  | "bool"
  | "u8"
  | "i8"
  | "u16"
  | "i16"
  | "u32"
  | "i32"
  | "u64"
  | "i64"
  | "f32"
  | "f64"
  | "usize"
  | "isize"
  // Only null pointer appears here
  | "pointer"
  | "buffer";
}

export interface EnumValue extends CommonType {
  value: null | string | number;
}

export interface EnumType extends CommonType {
  kind: "enum";
  reprName: `${string}T`;
  type: AnyType;
  values: EnumValue[];
}

export interface ReferenceType extends CommonType {
  kind: "ref";
  reprName: `${string}T`;
}

export interface FunctionParameter extends CommonType {
  type: AnyType;
}

export interface FunctionType extends CommonType {
  kind: "function";
  reprName: `${string}T`;
  parameters: FunctionParameter[];
  result: AnyType;
  loc?: CXSourceLocation;
}

export interface StructField extends CommonType {
  type: AnyType;
  size: number;
  offset: number;
}

export interface StructType extends CommonType {
  kind: "struct";
  reprName: `${string}T`;
  fields: StructField[];
  size: number;
}

export interface PointerType extends CommonType {
  kind: "pointer";
  pointee: AnyType;
  useBuffer: boolean;
}

export type AnyType =
  | PlainType
  | EnumType
  | FunctionType
  | StructType
  | PointerType
  | ReferenceType;

export const structFieldToDeinlineString = (
  struct: StructType,
  field: StructField,
): { structField: string, extraCode?: string, dependencies: string[], provide?: string } => {
  const dependencies: string[] = [];
  if (field.type.kind !== "pointer" || field.type.pointee.kind !== "function") {
    const { code: structField, dependencies: subDependencies } = anyTypeToString(field.type);
    dependencies.push(...subDependencies);
    return { structField, dependencies }
  }

  const functionsCount =
    struct.fields.filter((structField) =>
      structField.type.kind === "pointer" &&
      structField.type.pointee.kind === "function"
    ).length;

  const fieldNamePart = functionsCount > 1
    ? `${field.name.replaceAll(/^(\w)|_(\w)/g, (_, m) => m.toUpperCase())}`
    : "";

  // De-inline functions in structs
  const functionName = `${struct.name}${fieldNamePart}CallbackDefinition`;
  const { code: pointeeCode, dependencies: pointeeDependencies } = anyTypeToString(field.type.pointee);
  dependencies.push(...pointeeDependencies);
  const extraCode = `export const ${functionName} = ${pointeeCode} as const; /* extra */`;

  const { code: funcCode, dependencies: funcDependencies } = anyTypeToString({
    kind: "ref",
    comment: null,
    name: functionName,
    // @ts-expect-error Callback definition names do not end with T.
    reprName: functionName,
  });

  dependencies.push(...funcDependencies);
  const structField = `func(${funcCode})`;
  return { structField, extraCode, dependencies, provide: functionName }
};

export const anyTypeToString = (type: AnyType): { code: string, dependencies: string[] } => {
  const dependencies: string[] = [];

  switch (type.kind) {
    case "plain":
      if (type.type === "void") {
        return { code: '"void"', dependencies };
      }
      dependencies.push(type.type);
      return { code: type.name, dependencies };
    case "function": {
      const block: string[] = [];
      block.push('{');
      block.push(`  /** ${type.name} */`);
      block.push('  parameters: [');
      for (const param of type.parameters) {
        const comment = param.comment ? `, ${param.comment}` : "";
        const { code, dependencies: paramDependencies } = anyTypeToString(param.type);
        dependencies.push(...paramDependencies);
        block.push(`    ${code}, // ${param.name}${comment}`);
      }
      block.push('  ],');
      const { code, dependencies: resultDependencies } = anyTypeToString(type.result);
      dependencies.push(...resultDependencies);
      block.push(`  result: ${code},`);
      block.push('}');
      return { code: block.join("\n"), dependencies };
    }
    case "struct":
    case "ref":
    case "enum":
      if (type.kind === "ref" && type.name.endsWith("_t")) {
        dependencies.push(type.name);
        return { code: type.name, dependencies };
      }
      dependencies.push(type.reprName);
      return { code: type.reprName, dependencies };
    case "pointer": {
      let func: "buf" | "func" | "ptr" = "ptr";
      if (type.pointee.kind === "function") {
        func = "func";
      } else if (type.useBuffer) {
        func = "buf";
      }
      const { code, dependencies: pointeeDependencies } = anyTypeToString(type.pointee);
      dependencies.push(...pointeeDependencies);
      return { code: `${func}(${code})`, dependencies };
    }
    default:
      throw new Error(`Invalid AnyType`);
  }
};

const toEnumType = (
  ctxt: Context,
  name: string,
  typeDeclaration: CXCursor,
) => {
  const enumType = typeDeclaration.getEnumDeclarationIntegerType();
  const values: EnumValue[] = [];
  if (!enumType) throw Error('internal error "enumType" is null');
  const isUnsignedInt = enumType.kind === CXTypeKind.CXType_Bool ||
    enumType.kind === CXTypeKind.CXType_Char_U ||
    enumType.kind === CXTypeKind.CXType_UChar ||
    enumType.kind === CXTypeKind.CXType_UShort ||
    enumType.kind === CXTypeKind.CXType_UInt ||
    enumType.kind === CXTypeKind.CXType_ULong ||
    enumType.kind === CXTypeKind.CXType_ULongLong;
  const result: EnumType = {
    kind: "enum",
    name,
    reprName: `${name}T`,
    type: toAnyType(ctxt, enumType),
    values,
    comment: cxCommentToJSDcoString(typeDeclaration),
  };
  let previousRawComment = "";
  typeDeclaration.visitChildren((child, parent) => {
    if (child.kind === CXCursorKind.CXCursor_EnumConstantDecl) {
      const rawComment = child.getRawCommentText();
      let comment: string | null;
      if (rawComment === previousRawComment) {
        // "Inherited" comment, do not duplicate it
        comment = null;
      } else {
        previousRawComment = rawComment;
        comment = commentToJSDcoString(
          child.getParsedComment(),
          rawComment,
        );
      }
      values.push({
        comment,
        name: child.getSpelling(),
        value: null,
      });
      return CXChildVisitResult.CXChildVisit_Recurse;
    } else if (child.kind === CXCursorKind.CXCursor_IntegerLiteral) {
      const last = values.at(-1)!;
      last.value = Number(
        isUnsignedInt
          ? parent.getEnumConstantDeclarationUnsignedValue()
          : parent.getEnumConstantDeclarationValue(),
      );
    } else if (child.kind === CXCursorKind.CXCursor_DeclRefExpr) {
      const last = values.at(-1)!;
      last.value = child.getSpelling();
    } else {
      const last = values.at(-1)!;
      const policy = parent.getPrintingPolicy();
      policy.includeNewlines = false;
      const prettyPrintedParent = parent.getPrettyPrinted(policy);
      policy.dispose();
      const assignmentPrefix = `${last.name} = `;
      if (!prettyPrintedParent.startsWith(assignmentPrefix)) {
        last.value = Number(
          isUnsignedInt
            ? parent.getEnumConstantDeclarationUnsignedValue()
            : parent.getEnumConstantDeclarationValue(),
        );
      } else {
        last.value = prettyPrintedParent.substring(assignmentPrefix.length);
      }
    }
    return CXChildVisitResult.CXChildVisit_Continue;
  });
  let maxHexadecimalLength = 0;
  if (
    values.length > 3 &&
    values.every((value) => {
      const isHexadecimalReady = typeof value.value === "number" &&
        (value.value === 0 ||
          Number.isInteger(Math.log(value.value) / Math.log(2)));
      if (isHexadecimalReady) {
        maxHexadecimalLength = value.value!.toString(16).length;
      }
      return isHexadecimalReady;
    })
  ) {
    // Enum of powers of two, use hexadecimal formatting
    for (const value of values) {
      value.value = `0x${value.value!.toString(16).padStart(maxHexadecimalLength, "0")}`;
    }
  }
  return result;
};

export const toAnyType = (ctxt: Context, type: CXType, cx?: CXCursor): AnyType => {
  const typekind = type.kind;
  switch (typekind) {
    case CXTypeKind.CXType_Elaborated: {
      const typeDeclaration = type.getTypeDeclaration();
      if (!typeDeclaration) throw Error('internal error "typeDeclaration" is null');
      if (typeDeclaration.kind === CXCursorKind.CXCursor_EnumDecl) {
        const name = type.getSpelling().substring(5); // drop `enum ` prefix
        let enumType = ctxt.getTypeByName(name);
        if (enumType) {
          return enumType;
        }
        enumType = toEnumType(ctxt, name, typeDeclaration);
        const prevType = ctxt.getTypeByName(name);
        if (prevType)
          return prevType;
        return ctxt.addType(name, enumType);
      } else if (typeDeclaration.kind === CXCursorKind.CXCursor_StructDecl) {
        const structDeclaration = type.getTypeDeclaration();
        const name = type.getSpelling().substring("struct ".length);
        const fields: StructField[] = [];
        const size = type.getSizeOf();
        if (size === CXTypeLayoutError.CXTypeLayoutError_Invalid) {
          throw new Error("Invalid type: " + name);
        } else if (size === CXTypeLayoutError.CXTypeLayoutError_Incomplete) {
          const voidType: PlainType = {
            comment: "/** opaque */",
            kind: "plain",
            name,
            type: "void",
          };
          return voidType;
        }
        if (!structDeclaration) throw Error('internal error "structDeclaration" is null');
        const structType: StructType = {
          fields,
          kind: "struct",
          name,
          size,
          reprName: `${name}T`,
          comment: cxCommentToJSDcoString(structDeclaration),
        };
        type.visitFields((fieldCursor) => {
          if (fieldCursor.kind !== CXCursorKind.CXCursor_FieldDecl) {
            throw new Error(
              "Unexpected field type: " + fieldCursor.getKindSpelling(),
            );
          }
          const fieldType = fieldCursor.getType();
          if (!fieldType) throw Error('internal error "fieldType" is null');
          if (fieldType.kind === CXTypeKind.CXType_ConstantArray) {
            const length = fieldType.getArraySize();
            const elementType = fieldType.getArrayElementType();
            if (!elementType) throw Error('internal error "elementType" is null');
            const baseName = fieldCursor.getDisplayName();
            const baseOffset = fieldCursor.getOffsetOfField() / 8;
            const elementSize = elementType.getSizeOf();
            const comment = cxCommentToJSDcoString(fieldCursor);
            for (let i = 0; i < length; i++) {
              fields.push({
                name: `${baseName}[${i}]`,
                type: toAnyType(ctxt, elementType),
                offset: baseOffset + i * elementSize,
                size: elementSize,
                comment: i === 0 ? comment : null,
              });
            }
            return CXVisitorResult.CXVisit_Continue;
          }
          const field: StructField = {
            name: fieldCursor.getDisplayName(),
            type: toAnyType(ctxt, fieldType),
            offset: fieldCursor.getOffsetOfField() / 8,
            size: fieldType.getSizeOf(),
            comment: cxCommentToJSDcoString(fieldCursor),
          };
          if (field.type.kind === "pointer") {
            // Never use `buf()` in struct fields as it doesn't really make much sense to do so.
            field.type.useBuffer = false;
          }
          fields.push(field);
          return CXVisitorResult.CXVisit_Continue;
        });

        return ctxt.addType(name, structType);
      } else {
        throw new Error("Unknown elaborated type");
      }
    }

    case CXTypeKind.CXType_FunctionProto: {
      const typeDeclaration = type.getTypeDeclaration();
      if (!typeDeclaration) throw Error('internal error "typeDeclaration" is null');
      const resultType = type.getResultType();
      if (!resultType) throw Error('internal error "resultType" is null');
      const result: FunctionType = {
        comment: cxCommentToJSDcoString(typeDeclaration),
        kind: "function",
        name: type.getSpelling(),
        parameters: [],
        reprName: `${type.getSpelling()}T`,
        result: toAnyType(ctxt, resultType),
        loc: cx?.getLocation()
      };
      const length = type.getNumberOfArgumentTypes();
      for (let i = 0; i < length; i++) {
        const argument = type.getArgumentType(i);
        if (!argument) throw Error('internal error "argument" is null');
        result.parameters.push({
          comment: null,
          name: argument.getSpelling(),
          type: toAnyType(ctxt, argument),
        });
      }
      return result;
    }
    // For now support IncompleteArray as pointer
    // TODO improve this
    case CXTypeKind.CXType_IncompleteArray: {
      const array = type.getArrayElementType();
      if (!array) throw Error('internal error "pointee" is null')

      if (array.kind === CXTypeKind.CXType_Char_S) {
        // `const char *` or `char *`
        const cstringResult: ReferenceType = {
          comment: null,
          kind: "ref",
          name: "cstringT",
          reprName: "cstringT",
        };
        ctxt.getTypeByName("cstringT")
        return cstringResult;
      }
      
      if (array.kind === CXTypeKind.CXType_Pointer && array.getPointeeType()!.kind === CXTypeKind.CXType_Char_S) {
        // `const char **` or `char **`
        const cstringArrayResult: ReferenceType = {
          comment: null,
          kind: "ref",
          name: "cstringArrayT",
          reprName: "cstringArrayT",
        };
        ctxt.getTypeByName("cstringArrayT");
        return cstringArrayResult;
      }

      const pointeeAnyType = toAnyType(ctxt, array);

      const ptrResult: PointerType = {
        kind: "pointer",
        name: type.getSpelling(),
        pointee: pointeeAnyType,
        comment: null,
        useBuffer: pointeeAnyType.kind === "struct" || 
          pointeeAnyType.kind === "plain" && pointeeAnyType.type !== "void" ||
          pointeeAnyType.kind === "pointer" || pointeeAnyType.kind === "ref" ||
          pointeeAnyType.kind === "enum",
      };
      return ptrResult;
    }


    case CXTypeKind.CXType_Pointer: {
      const pointee = type.getPointeeType();
      if (!pointee) throw Error('internal error "pointee" is null')

      if (pointee.kind === CXTypeKind.CXType_Char_S) {
        // `const char *` or `char *`
        const cstringResult: ReferenceType = {
          comment: null,
          kind: "ref",
          name: "cstringT",
          reprName: "cstringT",
        };
        ctxt.getTypeByName("cstringT")
        return cstringResult;
      } 
      if (pointee.kind === CXTypeKind.CXType_Pointer && pointee.getPointeeType()!.kind === CXTypeKind.CXType_Char_S) {
        // `const char **` or `char **`
        const cstringArrayResult: ReferenceType = {
          comment: null,
          kind: "ref",
          name: "cstringArrayT",
          reprName: "cstringArrayT",
        };
        ctxt.getTypeByName("cstringArrayT");
        return cstringArrayResult;
      }

      const pointeeAnyType = toAnyType(ctxt, pointee);

      const ptrResult: PointerType = {
        kind: "pointer",
        name: type.getSpelling(),
        pointee: pointeeAnyType,
        comment: null,
        useBuffer: pointeeAnyType.kind === "struct" || 
          pointeeAnyType.kind === "plain" && pointeeAnyType.type !== "void" ||
          pointeeAnyType.kind === "pointer" || pointeeAnyType.kind === "ref" ||
          pointeeAnyType.kind === "enum",
      };
      return ptrResult;
    }

    case CXTypeKind.CXType_Typedef: {
      const typeDefName = type.getTypedefName();
      const refResult: ReferenceType = {
        kind: "ref",
        name: typeDefName,
        reprName: `${typeDefName}T`,
        comment: null,
      };
      const typeDef = ctxt.getTypeByName(typeDefName);
      if (!typeDef) {
        // Check for potentially needed system header definitions.
        const typedecl = type.getTypeDeclaration();
        if (!typedecl) throw Error(`internal error "typedecl" is null for ${typeDefName}`)
        const location = typedecl.getLocation();
        if (location.isInSystemHeader()) {
          const sourceType = typedecl.getTypedefDeclarationOfUnderlyingType();
          if (!sourceType) throw Error('internal error "sourceType" is null')
          const sourceAnyType = toAnyType(ctxt, sourceType);
          if (!ctxt.getTypeByName(typeDefName))
            ctxt.addType(typeDefName, sourceAnyType);
        }
      }
      return refResult;
    }

    case CXTypeKind.CXType_Enum: {
      let name = type.getSpelling();
      if (name.startsWith("enum ")) {
        name = name.substring("enum ".length);
      }
      let enumResult = ctxt.getTypeByName(name)
      if (enumResult) {
        return enumResult;
      }
      const typeDeclaration = type.getTypeDeclaration();
      if (!typeDeclaration) throw Error('internal error "typeDeclaration" is null');
      enumResult = toEnumType(ctxt, name, typeDeclaration);
      return ctxt.addType(name, enumResult);
    }

    case CXTypeKind.CXType_Void:
    case CXTypeKind.CXType_Bool:
    case CXTypeKind.CXType_Char_U:
    case CXTypeKind.CXType_UChar:
    case CXTypeKind.CXType_UShort:
    case CXTypeKind.CXType_UInt:
    case CXTypeKind.CXType_ULong:
    case CXTypeKind.CXType_ULongLong:
    case CXTypeKind.CXType_Char_S:
    case CXTypeKind.CXType_SChar:
    case CXTypeKind.CXType_Short:
    case CXTypeKind.CXType_Int:
    case CXTypeKind.CXType_Long:
    case CXTypeKind.CXType_LongLong:
    case CXTypeKind.CXType_Float:
    case CXTypeKind.CXType_Double:
    case CXTypeKind.CXType_NullPtr:
      {
        const spellingName = toPlainTypeName(type.getSpelling());
        // const canonycalName = toPlainTypeName(type.getCanonicalType().getSpelling());

        const existing = ctxt.getTypeByName(spellingName);
        if (existing) {
          return existing;
        }
        const plainResult: PlainType = {
          kind: "plain",
          name: spellingName,
          type: getPlainTypeInfo(typekind, type),
          comment: null,
        };
        return ctxt.addType(spellingName, plainResult);
      }
    default: {
      if (cx) {
        const loc = cx.getLocation();
        const fileLoc = loc.getFileLocation();
        if (fileLoc.file) {
          throw new Error(
            `Unsupported type kind: ${typekind}, spelling '${type.getSpelling()}', '${type.getKindSpelling()}' in file ${fileLoc.file.getName()} L:${fileLoc.line} C:${fileLoc.column}`,
          );
        }
      }
      throw new Error(
        `Unsupported type kind: ${typekind}, spelling '${type.getSpelling()}', '${type.getKindSpelling()}'`,
      );
    }
  }
};

const toPlainTypeName = (spelling: string): string => {
  if (!spelling.includes(" ")) {
    return spelling;
  }
  if (spelling.startsWith("const ")) {
    spelling = spelling.substring("const ".length);
  }
  return spelling.replaceAll(
    /\s+(\w)/g,
    (_m, nextChar: string) => nextChar.toUpperCase(),
  );
};

const getPlainTypeInfo = (
  typekind: CXTypeKind,
  type: CXType,
): PlainType["type"] => {
  if (typekind === CXTypeKind.CXType_Void) {
    return "void";
  } else if (typekind === CXTypeKind.CXType_Bool) {
    return "bool";
  } else if (typekind === CXTypeKind.CXType_Float) {
    if (type.getSizeOf() !== 4) {
      throw new Error(
        `Unexpected Float size: Expected 32, got ${type.getSizeOf() * 8}`,
      );
    }
    return "f32";
  } else if (typekind === CXTypeKind.CXType_Double) {
    if (type.getSizeOf() !== 8) {
      throw new Error(
        `Unexpected Double size: Expected 64, got ${type.getSizeOf() * 8}`,
      );
    }
    return "f64";
  } else if (typekind === CXTypeKind.CXType_NullPtr) {
    return "pointer";
  } else if (
    typekind === CXTypeKind.CXType_Char_U ||
    typekind === CXTypeKind.CXType_UChar ||
    typekind === CXTypeKind.CXType_UShort ||
    typekind === CXTypeKind.CXType_UInt ||
    typekind === CXTypeKind.CXType_ULong ||
    typekind === CXTypeKind.CXType_ULongLong
  ) {
    // Unsigned number, get size.
    const size = type.getSizeOf();
    if (size === 1) {
      return "u8";
    } else if (size === 2) {
      return "u16";
    } else if (size === 4) {
      return "u32";
    } else if (size === 8) {
      return "u64";
    } else {
      throw new Error(`Unexpected ${type.getKindSpelling()} size: Got ${size}`);
    }
  } else if (
    typekind === CXTypeKind.CXType_Char_S ||
    typekind === CXTypeKind.CXType_SChar ||
    typekind === CXTypeKind.CXType_Short ||
    typekind === CXTypeKind.CXType_Int ||
    typekind === CXTypeKind.CXType_Long ||
    typekind === CXTypeKind.CXType_LongLong
  ) {
    // Signed number, get size.
    const size = type.getSizeOf();
    if (size === 1) {
      return "i8";
    } else if (size === 2) {
      return "i16";
    } else if (size === 4) {
      return "i32";
    } else if (size === 8) {
      return "i64";
    } else {
      throw new Error(`Unexpected ${type.getKindSpelling()} size: Got ${size}`);
    }
  } else {
    throw new Error(`Unexpected type kind: ${type.getKindSpelling()}`);
  }
};

const paragraphToJSDoc = (
  paragraph: CXComment,
  fullCommentText: string,
): string => {
  const lines: string[] = [];

  paragraph.visitChildren((child) => {
    if (lines.at(-1) === "\n") {
      lines.pop();
      lines.push("\n *");
    }
    if (child.kind === CXCommentKind.CXComment_Paragraph) {
      throw new Error("Did not expect recursive paragraphs");
    } else if (child.kind === CXCommentKind.CXComment_Text) {
      const text = child.getText();
      if (text.length === 1 && text !== " ") {
        // Escaped item
        lines.push(`\\${text}`);
      } else {
        lines.push(child.getText());
      }
    } else if (child.kind === CXCommentKind.CXComment_InlineCommand) {
      const command = child.getCommandName();
      const style = child.getRenderKind();
      const argCount = child.getNumberOfArguments();
      let part = lines.pop();
      if (
        command !== "c" && command !== "p" && command !== "e" &&
        command !== "em"
      ) {
        if (fullCommentText.includes(`\\${command}`)) {
          part = `${part || " * "}\\${command}`;
        } else {
          part = `${part || " * "}@${command}`;
        }
      } else if (!part) {
        part = " *";
      }
      for (let i = 0; i < argCount; i++) {
        const argText = child.getArgumentText(i);
        switch (style) {
          case CXCommentInlineCommandRenderKind
            .CXCommentInlineCommandRenderKind_Normal:
            part = `${part}${argText}`;
            break;
          case CXCommentInlineCommandRenderKind
            .CXCommentInlineCommandRenderKind_Bold:
            part = `${part}**${argText}**`;
            break;
          case CXCommentInlineCommandRenderKind
            .CXCommentInlineCommandRenderKind_Monospaced:
            part = `${part}\`${argText}\``;
            break;
          case CXCommentInlineCommandRenderKind
            .CXCommentInlineCommandRenderKind_Emphasized:
            part = `${part}*${argText}*`;
            break;
          default:
            continue;
        }
        if (argText.endsWith(")") && !part.endsWith(")")) {
          part = `${part.substring(0, part.length - 2)}${part.at(-1)})`;
        }
      }
      lines.push(part);
    }
    if (child.hasTrailingNewline()) {
      lines.push("\n");
    }

    return CXChildVisitResult.CXChildVisit_Continue;
  });

  return ` *${lines.join("")}`;
};

const verbatimBlockCommandToJSDoc = (
  blockCommand: CXComment,
  _fullCommentText: string,
): string => {
  // Default to C++ as the comment language: It could be anything really but C++ works for both C and C++ that we're mostly interested in.
  const lines: string[] = [];
  const command = blockCommand.getCommandName();
  if (command === "code") {
    lines.push(" * ```cpp");
  } else if (command === "verbatim") {
    lines.push(" * ```");
  } else {
    throw new Error("Unknown verbatim block command: " + command);
  }
  blockCommand.visitChildren((comment) => {
    if (comment.kind !== CXCommentKind.CXComment_VerbatimBlockLine) {
      throw new Error(
        "Unexpected line in VerbatimBlockCommand: " + comment.getKindSpelling(),
      );
    }
    const commentText = comment.getText();
    if (
      command === "code" && commentText.length > 100 &&
      commentText.includes("\\endcode")
    ) {
      // Over-reaching verbatim block. Skip.
      return CXChildVisitResult.CXChildVisit_Continue;
    }
    lines.push(` *${commentText}`);
    return CXChildVisitResult.CXChildVisit_Continue;
  });
  lines.push(" * ```");
  return lines.join("\n");
};

const blockCommandToJSDoc = (
  blockCommand: CXComment,
  fullCommentText: string,
): string => {
  let command = blockCommand.getCommandName();
  if (command === "return") {
    // Fix failures
    command = "returns";
  }
  const lines: string[] = [` * @${command}`];
  blockCommand.visitChildren((comment) => {
    if (comment.kind === CXCommentKind.CXComment_Paragraph) {
      const previous = lines.pop();
      lines.push(
        `${previous}${paragraphToJSDoc(comment, fullCommentText).substring(2)}`,
      );
    } else {
      throw new Error(
        "Unexpected line in BlockCommand: " + comment.getKindSpelling(),
      );
    }
    return CXChildVisitResult.CXChildVisit_Continue;
  });
  return lines.join("\n");
};

const paramCommandToJSDoc = (
  paramCommand: CXComment,
  fullCommentText: string,
): string => {
  const lines: string[] = [];
  const command = paramCommand.getCommandName();
  const params: string[] = [`@${command}`];
  const paramsCount = paramCommand.getNumberOfArguments();
  for (let i = 0; i < paramsCount; i++) {
    params.push(paramCommand.getArgumentText(i));
  }
  if (paramCommand.isDirectionExplicit()) {
    const direction = paramCommand.getDirection();
    if (
      direction === CXCommentParamPassDirection.CXCommentParamPassDirection_In
    ) {
      params.push("[in]");
    } else if (
      direction === CXCommentParamPassDirection.CXCommentParamPassDirection_Out
    ) {
      params.push("[out]");
    } else if (
      direction ===
      CXCommentParamPassDirection.CXCommentParamPassDirection_InOut
    ) {
      params.push("[in,out]");
    } else {
      throw new Error("Unknown param comment direction value");
    }
  }
  lines.push(` * ${params.join(" ")}`);
  paramCommand.visitChildren((comment) => {
    if (comment.kind === CXCommentKind.CXComment_Paragraph) {
      const previous = lines.pop();
      lines.push(
        `${previous}${paragraphToJSDoc(comment, fullCommentText).substring(2)}`,
      );
    } else {
      throw new Error(
        "Unexpected line in ParamCommand: " + comment.getKindSpelling(),
      );
    }
    return CXChildVisitResult.CXChildVisit_Continue;
  });
  return lines.join("\n");
};

const commentToJSDcoString = (
  comment: CXComment,
  fullCommentText: string,
): null | string => {
  if (comment.kind === CXCommentKind.CXComment_Null) {
    return null;
  }
  const lines: string[] = ["/**"];
  comment.visitChildren((child) => {
    if (child.kind === CXCommentKind.CXComment_Text) {
      lines.push(` * ${child.getText()}`);
    } else if (child.kind === CXCommentKind.CXComment_Paragraph) {
      const paragraphContent = paragraphToJSDoc(child, fullCommentText);
      if (paragraphContent === " *" || paragraphContent === " * ") {
        return CXChildVisitResult.CXChildVisit_Continue;
      }
      lines.push(paragraphContent.replaceAll(/([ ]+)/g, " "), " *");
    } else if (child.kind === CXCommentKind.CXComment_InlineCommand) {
      throw new Error("Did not expect main level inline command");
    } else if (child.kind === CXCommentKind.CXComment_VerbatimLine) {
      const commandName = child.getCommandName();
      if (commandName === "defgroup") {
        return CXChildVisitResult.CXChildVisit_Continue;
      } else {
        // Probably mistaken inline verbatim line.
        const previous = lines.pop();
        lines.push(`${previous}\\\\${commandName} ${child.getText()}`);
      }
    } else if (child.kind === CXCommentKind.CXComment_VerbatimBlockCommand) {
      lines.push(verbatimBlockCommandToJSDoc(child, fullCommentText));
    } else if (child.kind === CXCommentKind.CXComment_BlockCommand) {
      lines.push(blockCommandToJSDoc(child, fullCommentText), " *");
    } else if (child.kind === CXCommentKind.CXComment_ParamCommand) {
      lines.push(paramCommandToJSDoc(child, fullCommentText));
    }
    return CXChildVisitResult.CXChildVisit_Continue;
  });
  if (lines.at(-1) === " *" || lines.at(-1) === " * ") {
    lines.pop();
  }
  lines.push(" */");
  return lines.join("\n");
};

export const cxCommentToJSDcoString = (cx: CXCursor) => {
  return commentToJSDcoString(
    cx.getParsedComment(),
    cx.getRawCommentText(),
  );
};
