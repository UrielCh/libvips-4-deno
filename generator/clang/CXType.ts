import { CONSTRUCTOR } from "./common.ts";
import { CXCursor } from "./CXCursor.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { libclang } from "./ffi.ts";
import { GLOBAL } from "./global.ts";
import { CXCallingConv, CXCursor_ExceptionSpecificationKind, CXFieldVisitorCallbackDefinition, CXRefQualifierKind, CXTypeKind, CXTypeLayoutError, CXTypeNullabilityKind, CXVisitorResult } from "./include/typeDefinitions.ts";
import { cstr, cxstringToString, NULL } from "./utils.ts";

const INVALID_FIELD_VISITOR_CALLBACK = (): CXVisitorResult =>
  CXVisitorResult.CXVisit_Break;
let CURRENT_FIELD_VISITOR_CALLBACK: (cursor: CXCursor) => CXVisitorResult =
  INVALID_FIELD_VISITOR_CALLBACK;
const CX_FIELD_VISITOR_CALLBACK = new Deno.UnsafeCallback(
  CXFieldVisitorCallbackDefinition,
  (cursor, _userData): CXVisitorResult => {
    return CURRENT_FIELD_VISITOR_CALLBACK(
      CXCursor[CONSTRUCTOR](GLOBAL.CURRENT_TU!, cursor)!,
    );
  },
);


/**
 * The type of an element in the abstract syntax tree.
 *
 * @hideconstructor
 */
export class CXType {
    static #constructable = false;
    #buffer: Uint8Array;
    #kind?: CXTypeKind;
    tu: CXTranslationUnit;
  
    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(tu: CXTranslationUnit, buffer: Uint8Array) {
      if (CXType.#constructable !== true) {
        throw new Error("CXType is not constructable");
      }
      this.#buffer = buffer;
      this.tu = tu;
    }
  
    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
      tu: CXTranslationUnit,
      buffer: Uint8Array,
    ): CXType | null {
      CXType.#constructable = true;
      const result = new CXType(tu, buffer);
      CXType.#constructable = false;
      return result.kind === CXTypeKind.CXType_Invalid ? null : result;
    }
  
    /**
     * Get the type kind of this type.
     */
    get kind(): CXTypeKind {
      if (this.#kind === undefined) {
        this.#kind = new DataView(this.#buffer.buffer).getUint32(0, true);
      }
  
      return this.#kind;
    }
  
    /**
     * Determine whether two {@link CXType}s represent the same type.
     */
    equals(other: CXType): boolean {
      return libclang.symbols.clang_equalTypes(this.#buffer, other.#buffer) !== 0;
    }
  
    /**
     * Pretty-print the underlying type using the rules of the
     * language of the translation unit from which it came.
     *
     * If this type is invalid, an empty string is returned.
     */
    getSpelling(): string {
      return cxstringToString(
        libclang.symbols.clang_getTypeSpelling(this.#buffer),
      );
    }
  
    /**
     * Return the canonical type for this {@link CXType}.
     *
     * Clang's type system explicitly models typedefs and all the ways
     * a specific type can be represented. The canonical type is the underlying
     * type with all the "sugar" removed. For example, if 'T' is a typedef
     * for 'int', the canonical type for 'T' would be 'int'.
     */
    getCanonicalType(): CXType {
      // Canonical type probably maybe always exists?
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getCanonicalType(this.#buffer),
      )!;
    }
  
    /**
     * Determine whether this {@link CXType} has the "const" qualifier set,
     * without looking through typedefs that may have added "const" at a
     * different level.
     */
    isConstQualifiedType(): boolean {
      return libclang.symbols.clang_isConstQualifiedType(this.#buffer) > 0;
    }
  
    /**
     * Determine whether this {@link CXType} has the "volatile" qualifier set,
     * without looking through typedefs that may have added "volatile" at
     * a different level.
     */
    isVolatileQualifiedType(): boolean {
      return libclang.symbols.clang_isVolatileQualifiedType(this.#buffer) > 0;
    }
  
    /**
     * Determine whether this {@link CXType} has the "restrict" qualifier set,
     * without looking through typedefs that may have added "restrict" at a
     * different level.
     */
    isRestrictQualifiedType(): boolean {
      return libclang.symbols.clang_isRestrictQualifiedType(this.#buffer) > 0;
    }
  
    /**
     * Returns the address space of this type.
     */
    getAddressSpace(): number {
      return libclang.symbols.clang_getAddressSpace(this.#buffer);
    }
  
    /**
     * Returns the typedef name of this type.
     */
    getTypedefName(): string {
      return cxstringToString(
        libclang.symbols.clang_getTypedefName(this.#buffer),
      );
    }
  
    /**
     * For pointer types, returns the type of the pointee.
     */
    getPointeeType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getPointeeType(this.#buffer),
      );
    }
  
    /**
     * Return the cursor for the declaration of this type.
     */
    getTypeDeclaration(): CXCursor | null {
      return CXCursor[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getTypeDeclaration(this.#buffer),
      );
    }
  
    /**
     * Returns the Objective-C type encoding for this CXType.
     */
    getObjCEncoding(): string {
      return cxstringToString(
        libclang.symbols.clang_Type_getObjCEncoding(this.#buffer),
      );
    }
  
    /**
     * Retrieve the spelling of this type's {@link CXTypeKind}.
     */
    getKindSpelling(): string {
      return cxstringToString(
        libclang.symbols.clang_getTypeKindSpelling(this.kind),
      );
    }
  
    /**
     * Retrieve the calling convention associated with a function type.
     *
     * If this type is not a function type, {@link CXCallingConv.CXCallingConv_Invalid} is returned.
     */
    getFunctionTypeCallingConvention(): CXCallingConv {
      return libclang.symbols.clang_getFunctionTypeCallingConv(this.#buffer);
    }
  
    /**
     * Retrieve the return type associated with a function type.
     *
     * If this type is not a function type, `null` is returned.
     */
    getResultType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getResultType(this.#buffer),
      );
    }
  
    /**
     * Retrieve the exception specification type associated with a function type.
     * This is a value of type {@link CXCursor_ExceptionSpecificationKind}.
     *
     * If this type is not a function type, an error code of -1 is returned.
     */
    getExceptionSpecificationType(): CXCursor_ExceptionSpecificationKind | -1 {
      return libclang.symbols.clang_getExceptionSpecificationType(this.#buffer);
    }
  
    /**
     * Retrieve the number of non-variadic parameters associated with a
     * function type.
     *
     * If this type is not a function type, -1 is returned.
     */
    getNumberOfArgumentTypes(): number {
      return libclang.symbols.clang_getNumArgTypes(this.#buffer);
    }
  
    /**
     * Retrieve the type of a parameter of a function type.
     *
     * If this type is not a function type or the function does not have enough
     * parameters, `null` is returned.
     */
    getArgumentType(index: number): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getArgType(this.#buffer, index),
      );
    }
  
    /**
     * Retrieves the base type of the ObjCObjectType.
     *
     * If the type is not an ObjC object, `null` is returned.
     */
    getObjCObjectBaseType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getObjCObjectBaseType(this.#buffer),
      );
    }
  
    /**
     * Retrieve the number of protocol references associated with an ObjC object/id.
     *
     * If the type is not an ObjC object, 0 is returned.
     */
    getNumberOfObjCProtocolReferences(): number {
      return libclang.symbols.clang_Type_getNumObjCProtocolRefs(this.#buffer);
    }
  
    /**
     * Retrieve the decl for a protocol reference for an ObjC object/id.
     *
     * If the type is not an ObjC object or there are not enough protocol
     * references, an invalid cursor is returned.
     */
    getObjCProtocolDecl(index: number): CXCursor | null {
      return CXCursor[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getObjCProtocolDecl(this.#buffer, index),
      );
    }
  
    /**
     * Retrieve the number of type arguments associated with an ObjC object.
     *
     * If the type is not an ObjC object, 0 is returned.
     */
    getNumberOfObjCTypeArguments(): number {
      return libclang.symbols.clang_Type_getNumObjCTypeArgs(this.#buffer);
    }
  
    /**
     * Retrieve a type argument associated with an ObjC object.
     *
     * If the type is not an ObjC or the index is not valid,
     * an invalid type is returned.
     */
    getObjCTypeArgument(index: number): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getObjCTypeArg(this.#buffer, index),
      );
    }
  
    /**
     * Returns `true` if this CXType is a variadic function type, and `false` otherwise.
     */
    isFunctionTypeVariadic(): boolean {
      return libclang.symbols.clang_isFunctionTypeVariadic(this.#buffer) > 0;
    }
  
    /**
     * Return `true` if this CXType is a POD (plain old data) type, and `false`
     * otherwise.
     */
    isPODType(): boolean {
      return libclang.symbols.clang_isPODType(this.#buffer) > 0;
    }
  
    /**
     * Return the element type of an array, complex, or vector type.
     *
     * If this type is not an array, complex, or vector type,
     * `null` is returned.
     */
    getElementType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getElementType(this.#buffer),
      );
    }
  
    /**
     * Return the number of elements of an array or vector type.
     *
     * If this type is not an array or vector type,
     * -1 is returned.
     */
    getNumberOfElements(): number {
      return Number(libclang.symbols.clang_getNumElements(this.#buffer));
    }
  
    /**
     * Return the element type of an array type.
     *
     * If this type is not an array type, `null` is returned.
     */
    getArrayElementType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_getArrayElementType(this.#buffer),
      );
    }
  
    /**
     * Return the array size of a constant array.
     *
     * If this type is not an array type, -1 is returned.
     */
    getArraySize(): number {
      return Number(libclang.symbols.clang_getArraySize(this.#buffer));
    }
  
    /**
     * Retrieve the type named by the qualified-id.
     *
     * If this type is not an elaborated type, `null` is returned.
     */
    getNamedType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getNamedType(this.#buffer),
      );
    }
  
    /**
     * Determine if a typedef is 'transparent' tag.
     *
     * A typedef is considered 'transparent' if it shares a name and spelling
     * location with its underlying tag type, as is the case with the `NS_ENUM` macro.
     *
     * @returns `true` if transparent and `false` otherwise.
     */
    isTransparentTagTypedef(): boolean {
      return libclang.symbols.clang_Type_isTransparentTagTypedef(this.#buffer) >
        0;
    }
  
    /**
     * Retrieve the nullability kind of a pointer type.
     */
    getNullability(): CXTypeNullabilityKind {
      return libclang.symbols.clang_Type_getNullability(this.#buffer);
    }
  
    /**
     * Return the alignment of a type in bytes as per C++[expr.alignof]
     * standard.
     *
     * If the type declaration is invalid, {@link CXTypeLayoutError.CXTypeLayoutError_Invalid} is returned.
     * If the type declaration is an incomplete type, {@link CXTypeLayoutError.CXTypeLayoutError_Incomplete}
     * is returned.
     * If the type declaration is a dependent type, {@link CXTypeLayoutError.CXTypeLayoutError_Dependent} is
     * returned.
     * If the type declaration is not a constant size type,
     * {@link CXTypeLayoutError.CXTypeLayoutError_NotConstantSize} is returned.
     */
    getAlignOf(): number | CXTypeLayoutError {
      return Number(libclang.symbols.clang_Type_getAlignOf(this.#buffer));
    }
  
    /**
     * Return the class type of a member pointer type.
     *
     * If this type is not a member-pointer type, `null` is returned.
     */
    getClassType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getClassType(this.#buffer),
      );
    }
  
    /**
     * Return the size of a type in bytes as per C++[expr.sizeof] standard.
     *
     * If the type declaration is invalid, {@link CXTypeLayoutError.CXTypeLayoutError_Invalid} is returned.
     * If the type declaration is an incomplete type, {@link CXTypeLayoutError.CXTypeLayoutError_Incomplete}
     * is returned.
     * If the type declaration is a dependent type, {@link CXTypeLayoutError.CXTypeLayoutError_Dependent} is
     * returned.
     */
    getSizeOf(): number | CXTypeLayoutError {
      return Number(libclang.symbols.clang_Type_getSizeOf(this.#buffer));
    }
  
    /**
     * Return the offset of a field named S in a record of type T in bits
     * as it would be returned by __offsetof__ as per C++11[18.2p4]
     *
     * If the cursor is not a record field declaration, {@link CXTypeLayoutError.CXTypeLayoutError_Invalid}
     * is returned.
     * If the field's type declaration is an incomplete type,
     * {@link CXTypeLayoutError.CXTypeLayoutError_Incomplete} is returned.
     * If the field's type declaration is a dependent type,
     * {@link CXTypeLayoutError.CXTypeLayoutError_Dependent} is returned.
     * If the field's name S is not found,
     * {@link CXTypeLayoutError.CXTypeLayoutError_InvalidFieldName} is returned.
     */
    getOffsetOf(fieldName: string): number | CXTypeLayoutError {
      return Number(
        libclang.symbols.clang_Type_getOffsetOf(this.#buffer, cstr(fieldName)),
      );
    }
  
    /**
     * Return the type that was modified by this attributed type.
     *
     * If the type is not an attributed type, `null` is returned.
     */
    getModifiedType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getModifiedType(this.#buffer),
      );
    }
  
    /**
     * Gets the type contained by this atomic type.
     *
     * If this type is not an atomic type, `null` is returned.
     */
    getValueType(): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getValueType(this.#buffer),
      );
    }
  
    /**
     * Returns the number of template arguments for a template
     * specialization, or -1 if this type is not a template specialization.
     */
    getNumberOfTemplateArguments(): number {
      return libclang.symbols.clang_Type_getNumTemplateArguments(this.#buffer);
    }
  
    /**
     * Returns the type template argument of a template class specialization
     * at given index.
     *
     * This function only returns template type arguments and does not handle
     * template template arguments or variadic packs.
     */
    getTemplateArgumentAsType(index: number): CXType | null {
      return CXType[CONSTRUCTOR](
        this.tu,
        libclang.symbols.clang_Type_getTemplateArgumentAsType(
          this.#buffer,
          index,
        ),
      );
    }
  
    /**
     * Retrieve the ref-qualifier kind of a function or method.
     *
     * The ref-qualifier is returned for C++ functions or methods. For other types
     * or non-C++ declarations, CXRefQualifier_None is returned.
     */
    getCXXRefQualifier(): CXRefQualifierKind {
      return libclang.symbols.clang_Type_getCXXRefQualifier(this.#buffer);
    }
    visitFields(callback: (cursor: CXCursor) => CXVisitorResult): boolean {
      const savedTu = GLOBAL.CURRENT_TU;
      const savedCallback = CURRENT_FIELD_VISITOR_CALLBACK;
      GLOBAL.CURRENT_TU = this.tu;
      CURRENT_FIELD_VISITOR_CALLBACK = callback;
      try {
        const result = libclang.symbols.clang_Type_visitFields(
          this.#buffer,
          CX_FIELD_VISITOR_CALLBACK.pointer,
          NULL,
        );
        return result > 0;
      } finally {
        GLOBAL.CURRENT_TU = savedTu;
        CURRENT_FIELD_VISITOR_CALLBACK = savedCallback;
      }
    }
  }
  