import { CONSTRUCTOR, POINTER } from "./common.ts";
import { CXCompletionString } from "./CXCompletionString.ts";
import { CXEvalResult } from "./CXEvalResult.ts";
import { CXFile } from "./CXFile.ts";
import { CXModule } from "./CXModule.ts";
import { CXSourceLocation } from "./CXSourceLocation.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { libclang } from "./ffi.ts";
import { GLOBAL } from "./global.ts";
import { CXAvailabilityKind, CXChildVisitResult, CXCursorKind, CXCursorVisitorCallbackDefinition, CXCursor_ExceptionSpecificationKind, CXLanguageKind, CXLinkageKind, CXNameRefFlags, CXResult, CXTemplateArgumentKind, CXTLSKind, CXTypeLayoutError, CXVisibilityKind, CXVisitorResult, CX_CXXAccessSpecifier, CX_StorageClass } from "./include/typeDefinitions.ts";
import { AvailabilityEntry, SemVerString } from "./interface.ts";
import { CX_CURSOR_AND_RANGE_VISITOR_CALLBACK } from "./rest.ts";
import { CXComment } from "./CXComment.ts";
import { CXType } from './CXType.ts';
import { cxstringSetToStringArray, cxstringToString, NULL, NULLBUF } from "./utils.ts";
import { CXPrintingPolicy } from "./CXPrintingPolicy.ts";

const OUT = new Uint8Array(16);
const OUT_64 = new BigUint64Array(OUT.buffer);

const OVERRIDDEN_CURSORS_FINALIZATION_REGISTRY = new FinalizationRegistry<
  {
    pointer: Deno.PointerValue;
    count: number;
  }
>(
  (key): void => {
    key.count--;
    if (key.count === 0) {
      libclang.symbols.clang_disposeOverriddenCursors(key.pointer);
    }
  },
);

let CURRENT_CURSOR_VISITOR_CALLBACK: (
    cursor: CXCursor,
    parent: CXCursor,
  ) => CXChildVisitResult = () => {
    // Take advantage of Deno internally handling throwing callback functions by explicitly returning
    // 0, which happens to be the `CXChildVisitResult.CXChildVisit_Break` value.
    throw new Error("Invalid CXCursorVisitor callback");
  };
  const CX_CURSOR_VISITOR_CALLBACK = new Deno.UnsafeCallback(
    CXCursorVisitorCallbackDefinition,
    (cursor, parent, _client_data) => {
      return CURRENT_CURSOR_VISITOR_CALLBACK(
        CXCursor[CONSTRUCTOR](GLOBAL.CURRENT_TU, cursor)!,
        CXCursor[CONSTRUCTOR](GLOBAL.CURRENT_TU, parent)!,
      );
    },
  );

/**
 * A cursor representing some element in the abstract syntax tree for
 * a translation unit.
 *
 * The cursor abstraction unifies the different kinds of entities in a
 * program--declaration, statements, expressions, references to declarations,
 * etc.--under a single "cursor" abstraction with a common set of operations.
 * Common operation for a cursor include: getting the physical location in
 * a source file where the cursor points, getting the name associated with a
 * cursor, and retrieving cursors for any child nodes of a particular cursor.
 *
 * Cursors can be produced using the {@link CXTranslationUnit.getCursor()} API.
 * When called with no parameters it produces a {@link CXCursor}
 * for the translation unit, from which one can use {@link visitChildren()}
 * to explore the rest of the translation unit.
 * When called with a physical source location it produces a {@link CXCursor}
 * to the entity that resides at that location, allowing one to map from the
 * source code into the AST.
 */
export class CXCursor {
    static #constructable = false;
    tu: null | CXTranslationUnit;
    #buffer: Uint8Array;
    #kind?: CXCursorKind;
    #hash?: number;

    /**
     * @private Private API, cannot be used from outside.
     */
    constructor(tu: null | CXTranslationUnit, buffer: Uint8Array) {
        if (CXCursor.#constructable !== true) {
            throw new Error("CXCursor is not constructable");
        }
        this.tu = tu;
        this.#buffer = buffer;
    }

    /**
     * @private Private API, cannot be used from outside.
     */
    static [CONSTRUCTOR](
        tu: null | CXTranslationUnit,
        buffer: Uint8Array,
    ): null | CXCursor {
        if (libclang.symbols.clang_Cursor_isNull(buffer)) {
            return null;
        }
        CXCursor.#constructable = true;
        const result = new CXCursor(tu, buffer);
        CXCursor.#constructable = false;
        return result;
    }

    /**
     * Retrieve the NULL cursor, which represents no entity.
     */
    static getNullCursor(): CXCursor {
        CXCursor.#constructable = true;
        const result = new CXCursor(null, libclang.symbols.clang_getNullCursor());
        CXCursor.#constructable = false;
        return result;
    }

    /**
     * The kind of this cursor.
     */
    get kind(): CXCursorKind {
        return this.#kind ??
            (this.#kind = libclang.symbols.clang_getCursorKind(this.#buffer));
    }

    /**
     * Determine whether this cursor represents a simple
     * reference.
     *
     * Note that other kinds of cursors (such as expressions) can also refer to
     * other cursors. Use {@link getReferenced()} to determine whether a
     * particular cursor refers to another entity.
     */
    isReference(): boolean {
        return libclang.symbols.clang_isReference(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents an expression.
     */
    isExpression(): boolean {
        return libclang.symbols.clang_isExpression(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents a statement.
     */
    isStatement(): boolean {
        return libclang.symbols.clang_isStatement(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents an attribute.
     */
    isAttribute(): boolean {
        return libclang.symbols.clang_isAttribute(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents an invalid
     * cursor.
     */
    isInvalid(): boolean {
        return libclang.symbols.clang_isInvalid(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents a translation
     * unit.
     */
    isTranslationUnit(): boolean {
        return libclang.symbols.clang_isTranslationUnit(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents a preprocessing
     * element, such as a preprocessor directive or macro instantiation.
     */
    isPreprocessing(): boolean {
        return libclang.symbols.clang_isPreprocessing(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents a currently
     * unexposed piece of the AST (e.g., {@link CXCursorKind.CXCursor_UnexposedStmt}).
     */
    isUnexposed(): boolean {
        return libclang.symbols.clang_isUnexposed(this.kind) > 0;
    }

    /**
     * Determine whether this cursor represents a declaration.
     */
    isDeclaration(): boolean {
        return libclang.symbols.clang_isDeclaration(this.kind) > 0;
    }

    /**
     * Determine whether the declaration pointed to by this cursor
     * is also a definition of that entity.
     */
    isDefinition(): boolean {
        return libclang.symbols.clang_isCursorDefinition(this.#buffer) !== 0;
    }

    /**
     * Returns `true` if this cursor is a variadic function or method.
     */
    isVariadic(): boolean {
        return libclang.symbols.clang_Cursor_isVariadic(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ constructor is a converting constructor.
     */
    isConvertingConstructor(): boolean {
        return libclang.symbols.clang_CXXConstructor_isConvertingConstructor(
            this.#buffer,
        ) !== 0;
    }

    /**
     * Determine if a C++ constructor is a copy constructor.
     */
    isCopyConstructor(): boolean {
        return libclang.symbols.clang_CXXConstructor_isCopyConstructor(
            this.#buffer,
        ) !== 0;
    }

    /**
     * Determine if a C++ constructor is the default constructor.
     */
    isDefaultConstructor(): boolean {
        return libclang.symbols.clang_CXXConstructor_isDefaultConstructor(
            this.#buffer,
        ) !== 0;
    }

    /**
     * Determine if a C++ constructor is a move constructor.
     */
    isMoveConstructor(): boolean {
        return libclang.symbols.clang_CXXConstructor_isMoveConstructor(
            this.#buffer,
        ) !== 0;
    }

    /**
     * Determine if a C++ field is declared 'mutable'.
     */
    isMutable(): boolean {
        return libclang.symbols.clang_CXXField_isMutable(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ member function or member function template is
     * declared 'const'.
     */
    isConst(): boolean {
        return libclang.symbols.clang_CXXMethod_isConst(this.#buffer) !== 0;
    }

    /**
     * # NOT SUPPORTED BY TARGETED LIBCLANG
     *
     * Determine if a C++ member function is a copy-assignment operator,
     * returning `true` if such is the case and `false` otherwise.
     *
     * > A copy-assignment operator `X::operator=` is a non-static,
     * > non-template member function of _class_ `X` with exactly one
     * > parameter of type `X`, `X&`, `const X&`, `volatile X&` or `const
     * > volatile X&`.
     *
     * That is, for example, the `operator=` in:
     *
     * ```cpp
     * class Foo {
     * bool operator=(const volatile Foo\&);
     * };
     * ```
     *
     * Is a copy-assignment operator, while the `operator=` in:
     *
     * ```cpp
     * class Bar {
     * bool operator=(const int\&);
     * };
     * ```
     *
     * Is not.
     */
    isCopyAssignmentOperator(): never {
        throw new Error("Not implemented");
        // return libclang.symbols.clang_CXXMethod_isCopyAssignmentOperator(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ method is declared '= default'.
     */
    isDefaulted(): boolean {
        return libclang.symbols.clang_CXXMethod_isDefaulted(this.#buffer) !== 0;
    }

    /**
     * # NOT SUPPORTED BY TARGETED LIBCLANG
     *
     * Determine if a C++ method is declared '= delete'.
     */
    isDeleted(): never {
        throw new Error("Not implemented");
        //return libclang.symbols.clang_CXXMethod_isDeleted(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ member function or member function template is
     * pure virtual.
     */
    isPureVirtual(): boolean {
        return libclang.symbols.clang_CXXMethod_isPureVirtual(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ member function or member function template is
     * declared 'static'.
     */
    isStatic(): boolean {
        return libclang.symbols.clang_CXXMethod_isStatic(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ member function or member function template is
     * explicitly declared 'virtual' or if it overrides a virtual method from
     * one of the base classes.
     */
    isVirtual(): boolean {
        return libclang.symbols.clang_CXXMethod_isVirtual(this.#buffer) !== 0;
    }

    /**
     * Determine if a C++ record is abstract, i.e. whether a class or struct
     * has a pure virtual member function.
     */
    isAbstract(): boolean {
        return libclang.symbols.clang_CXXRecord_isAbstract(this.#buffer) !== 0;
    }

    /**
     * Determine if an enum declaration refers to a scoped enum.
     */
    isScopedEnum(): boolean {
        return libclang.symbols.clang_EnumDecl_isScoped(this.#buffer) !== 0;
    }

    /**
     * Determine whether this {@link CXCursor} that is a macro, is
     * function like.
     */
    isMacroFunctionLike(): boolean {
        return libclang.symbols.clang_Cursor_isMacroFunctionLike(this.#buffer) > 0;
    }

    /**
     * Determine whether this {@link CXCursor} that is a macro, is a
     * builtin one.
     */
    isMacroBuiltin(): boolean {
        return libclang.symbols.clang_Cursor_isMacroBuiltin(this.#buffer) > 0;
    }

    /**
     * Determine whether this {@link CXCursor} that is a function declaration, is an
     * inline declaration.
     */
    isFunctionInlined(): boolean {
        return libclang.symbols.clang_Cursor_isFunctionInlined(this.#buffer) > 0;
    }

    /**
     * Determine whether this cursor represents an anonymous
     * tag or namespace
     */
    isAnonymous(): boolean {
        return libclang.symbols.clang_Cursor_isAnonymous(this.#buffer) > 0;
    }

    /**
     * Determine whether this cursor represents an anonymous record
     * declaration.
     */
    isAnonymousRecordDecl(): boolean {
        return libclang.symbols.clang_Cursor_isAnonymousRecordDecl(this.#buffer) >
            0;
    }

    /**
     * Determine whether this cursor represents an inline namespace
     * declaration.
     */
    isInlineNamespace(): boolean {
        return libclang.symbols.clang_Cursor_isInlineNamespace(this.#buffer) > 0;
    }

    /**
     * Returns `true` if this cursor specifies a Record member that is a
     * bitfield.
     */
    isBitField(): boolean {
        return libclang.symbols.clang_Cursor_isBitField(this.#buffer) > 0;
    }

    /**
     * Returns `true` if the base class specified by this cursor with kind
     * {@link CXCursorKind.CXCursor_CXXBaseSpecifier} is virtual.
     */
    isVirtualBase(): boolean {
        return libclang.symbols.clang_isVirtualBase(this.#buffer) > 0;
    }

    /**
     * Determine whether this declaration cursor is invalid.
     *
     * A declaration is invalid if it could not be parsed successfully.
     *
     * @returns Rreturns `true` if this cursor represents a declaration and it is
     * invalid.
     */
    isInvalidDeclaration(): boolean {
        return libclang.symbols.clang_isInvalidDeclaration(this.#buffer) > 0;
    }

    /**
     * Determine whether two cursors are equivalent.
     */
    equals(other: CXCursor): boolean {
        return libclang.symbols.clang_equalCursors(this.#buffer, other.#buffer) !==
            0;
    }

    /**
     * If cursor refers to a variable declaration and it has initializer returns
     * cursor referring to the initializer otherwise return `null`.
     */
    getVariableDeclarationInitializer(): null | CXCursor {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_Cursor_getVarDeclInitializer(this.#buffer),
        );
    }

    /**
     * Determine whether this cursor has any attributes.
     */
    hasAttributes(): boolean {
        return libclang.symbols.clang_Cursor_hasAttrs(this.#buffer) > 0;
    }

    /**
     * If cursor refers to a variable declaration that has external storage
     * returns `true`. If cursor refers to a variable declaration that doesn't have
     * external storage returns `false`. Otherwise an error is thrown.
     */
    hasVariableDeclarationWithExternalStorage(): boolean {
        const result = libclang.symbols.clang_Cursor_hasVarDeclExternalStorage(
            this.#buffer,
        );
        if (result === 1) {
            return true;
        } else if (result === 0) {
            return false;
        }
        throw new Error("Cursor does not point to a variable declaration");
    }

    /**
     * Determine the availability of the entity that this cursor refers to,
     * taking the current target platform into account.
     * @returns The availability of the cursor.
     */
    getAvailability(): CXAvailabilityKind {
        return libclang.symbols.clang_getCursorAvailability(this.#buffer);
    }

    /**
     * Determine the "language" of the entity referred to by this cursor.
     */
    getLanguage(): CXLanguageKind {
        return libclang.symbols.clang_getCursorLanguage(this.#buffer);
    }

    /**
     * Determine the lexical parent of this cursor.
     *
     * The lexical parent of a cursor is the cursor in which the given
     * `cursor` was actually written. For many declarations, the lexical
     * and semantic parents are equivalent (the semantic parent is returned by
     * {@link getSemanticParent()}. They diverge when declarations or
     * definitions are provided out-of-line. For example:
     *
     * ```cpp
     * class C {
     *  void f();
     * };
     * void C::f() { }
     * ```
     * In the out-of-line definition of `C::f,` the semantic parent is
     * the class `C,` of which this function is a member. The lexical parent is
     * the place where the declaration actually occurs in the source code; in this
     * case, the definition occurs in the translation unit. In general, the
     * lexical parent for a given entity can change without affecting the semantics
     * of the program, and the lexical parent of different declarations of the
     * same entity may be different. Changing the semantic parent of a declaration,
     * on the other hand, can have a major impact on semantics, and redeclarations
     * of a particular entity should all have the same semantic context.
     *
     * In the example above, both declarations of `C::f` have `C` as their
     * semantic context, while the lexical context of the first `C::f` is `C` and
     * the lexical context of the second `C::f` is the translation unit.
     *
     * For declarations written in the global scope, the lexical parent is
     * the translation unit.
     */
    getLexicalParent(): CXCursor {
        // A lexical parent always exists.
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorLexicalParent(this.#buffer),
        )!;
    }

    /**
     * Determine the linkage of the entity referred to by this cursor.
     */
    getLinkage(): CXLinkageKind {
        return libclang.symbols.clang_getCursorLinkage(this.#buffer);
    }

    /**
     * Determine the availability of the entity that this cursor refers to
     * on any platforms for which availability information is known.
     */
    getPlatformAvailability(): {
        /**
         * Indicates whether the entity is deprecated on all platforms.
         */
        alwaysDeprecated: boolean;
        /**
         * Indicate whether the entity is unavailable on all platforms.
         */
        alwaysUnavailable: boolean;
        /**
         * An array of {@link AvailabilityEntry} instances
         */
        availability: AvailabilityEntry[];
        /**
         * The message text provided along with the unconditional deprecation of this entity.
         */
        deprecatedMessage: string;
        /**
         * The message text provided along with the unconditional unavailability of this entity.
         */
        unavailableMessage: string;
    } {
        // First get the number of platforms availability information is available for.
        // At the same time get the other information.
        const deprecatedMessageOut = new Uint8Array(32);
        const unavailableMessageOut = deprecatedMessageOut.subarray(16);
        const numberOfPlatforms = libclang.symbols
            .clang_getCursorPlatformAvailability(
                this.#buffer,
                OUT,
                deprecatedMessageOut,
                OUT.subarray(4),
                unavailableMessageOut,
                NULLBUF,
                0,
            );
        const deprecatedMessage = cxstringToString(deprecatedMessageOut);
        const unavailableMessage = cxstringToString(unavailableMessageOut);
        const out32 = new Uint32Array(OUT.buffer, 0, 2);
        const alwaysDeprecated = out32[0] > 0;
        const alwaysUnavailable = out32[1] > 0;

        const availability: AvailabilityEntry[] = [];
        const result = {
            alwaysDeprecated,
            alwaysUnavailable,
            availability,
            deprecatedMessage,
            unavailableMessage,
        };

        if (numberOfPlatforms === 0) {
            return result;
        }

        // Construct a buffer large enough to accept all the availability data.
        let availabilityBuffer = new Uint8Array(72 * numberOfPlatforms);
        // Call the API again to populate the availability data.
        libclang.symbols.clang_getCursorPlatformAvailability(
            this.#buffer,
            NULLBUF,
            NULLBUF,
            NULLBUF,
            NULLBUF,
            availabilityBuffer,
            numberOfPlatforms,
        );
        // Iterate over the platforms and construct availability objects for each.
        for (let i = 0; i < numberOfPlatforms; i++) {
            if (i) {
                // Move the iteration to the next availability struct.
                availabilityBuffer = availabilityBuffer.subarray(72);
            }
            const platform = cxstringToString(
                availabilityBuffer.subarray(0, 16),
                false,
            );
            const message = cxstringToString(
                availabilityBuffer.subarray(72 - 16),
                false,
            );
            const view = new DataView(
                availabilityBuffer.buffer,
                16,
                72 - 16,
            );
            const introduced: SemVerString = `${view.getInt32(0, true)}.${view.getInt32(4)
                }.${view.getInt32(8)}`;
            const deprecated: SemVerString = `${view.getInt32(12, true)}.${view.getInt32(16)
                }.${view.getInt32(20)}`;
            const obsoleted: SemVerString = `${view.getInt32(24, true)}.${view.getInt32(28)
                }.${view.getInt32(32)}`;
            const unavailable = view.getInt32(36, true) !== 0;
            availability.push({
                deprecated,
                introduced,
                message,
                obsoleted,
                platform,
                unavailable,
            });
            // Dispose of the struct before moving onto the next one.
            libclang.symbols.clang_disposeCXPlatformAvailability(availabilityBuffer);
        }

        return result;
    }

    /**
     * Determine the semantic parent of this cursor.
     *
     * The semantic parent of a cursor is the cursor that semantically contains
     * the given `cursor`. For many declarations, the lexical and semantic parents
     * are equivalent (the lexical parent is returned by
     * {@link getLexicalParent()}`. They diverge when declarations or
     * definitions are provided out-of-line. For example:
     *
     * ```cpp
     * class C {
     *  void f();
     * };
     * void C::f() { }
     * ```
     * In the out-of-line definition of `C::f,` the semantic parent is
     * the class `C,` of which this function is a member. The lexical parent is
     * the place where the declaration actually occurs in the source code; in this
     * case, the definition occurs in the translation unit. In general, the
     * lexical parent for a given entity can change without affecting the semantics
     * of the program, and the lexical parent of different declarations of the
     * same entity may be different. Changing the semantic parent of a declaration,
     * on the other hand, can have a major impact on semantics, and redeclarations
     * of a particular entity should all have the same semantic context.
     *
     * In the example above, both declarations of `C::f` have `C` as their
     * semantic context, while the lexical context of the first `C::f` is `C` and
     * the lexical context of the second `C::f` is the translation unit.
     *
     * For global declarations, the semantic parent is the translation unit.
     */
    getSemanticParent(): CXCursor {
        // Semantic parent always exists.
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorSemanticParent(this.#buffer),
        )!;
    }

    /**
     * Determine the "thread-local storage (TLS) kind" of the declaration
     * referred to by this cursor.
     */
    getTLSKind(): CXTLSKind {
        return libclang.symbols.clang_getCursorTLSKind(this.#buffer);
    }

    /**
     * Describe the visibility of the entity referred to by this cursor.
     *
     * This returns the default visibility if not explicitly specified by
     * a visibility attribute. The default visibility may be changed by
     * commandline arguments.
     *
     * @returns The visibility of the cursor.
     */
    getVisibility(): CXVisibilityKind {
        return libclang.symbols.clang_getCursorVisibility(this.#buffer);
    }

    /**
     * Retrieve the file that is included by the given inclusion directive
     * cursor.
     */
    getIncludedFile(): CXFile {
        if (this.tu === null) {
            throw new Error("Cannot get included file of null cursor");
        }
        const result = libclang.symbols.clang_getIncludedFile(this.#buffer);
        if (result === NULL) {
            throw new Error("Got null included file");
        }
        return CXFile[CONSTRUCTOR](
            this.tu,
            result,
        );
    }

    /**
     * Determine the set of methods that are overridden by this method cursor.
     *
     * In both Objective-C and C++, a method (aka virtual member function,
     * in C++) can override a virtual method in a base class. For
     * Objective-C, a method is said to override any method in the class's
     * base class, its protocols, or its categories' protocols, that has the same
     * selector and is of the same kind (class or instance).
     * If no such method exists, the search continues to the class's superclass,
     * its protocols, and its categories, and so on. A method from an Objective-C
     * implementation is considered to override the same methods as its
     * corresponding method in the interface.
     *
     * For C++, a virtual member function overrides any virtual member
     * function with the same signature that occurs in its base
     * classes. With multiple inheritance, a virtual member function can
     * override several virtual member functions coming from different
     * base classes.
     *
     * In all cases, this function determines the immediate overridden
     * method, rather than all of the overridden methods. For example, if
     * a method is originally declared in a class A, then overridden in B
     * (which in inherits from A) and also in C (which inherited from B),
     * then the only overridden method returned from this function when
     * invoked on C's method will be B's method. The client may then
     * invoke this function again, given the previously-found overridden
     * methods, to map out the complete method-override set.
     *
     * @returns An array of {@link CXCursor}s, representing the set of
     * overridden methods.
     */
    getOverriddenCursors(): CXCursor[] {
        const OUT_2 = OUT.subarray(8, 12);
        const out32 = new Uint32Array(OUT_2.buffer, 8, 1);
        libclang.symbols.clang_getOverriddenCursors(this.#buffer, OUT, OUT_2);
        const length = out32[0];
        const cursors: CXCursor[] = [];
        const overriddenCursorsPointer = Number(OUT_64[0]);
        if (length === 0 || overriddenCursorsPointer === NULL) {
            return cursors;
        }
        const key = {
            pointer: overriddenCursorsPointer,
            count: length,
        };
        for (let i = 0; i < length; i++) {
            const buffer = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(
                overriddenCursorsPointer,
                8 * 4,
                i * 8 * 4,
            ));
            // Cursor structs given to us by libclang are non-null.
            const cursor = CXCursor[CONSTRUCTOR](this.tu, buffer)!;
            OVERRIDDEN_CURSORS_FINALIZATION_REGISTRY.register(cursor, key);
            cursors.push(cursor);
        }
        return cursors;
    }

    /**
     * Returns `true` if this cursor is a NULL cursor.
     *
     * This should not be needed usually, as NULL cursors should
     * be returned as `null` instead.
     */
    isNull(): boolean {
        return libclang.symbols.clang_Cursor_isNull(this.#buffer) !== 0;
    }

    /**
     * Compute a hash value for this cursor.
     */
    hash(): number {
        return this.#hash ??
            (this.#hash = libclang.symbols.clang_hashCursor(this.#buffer));
    }

    /**
     * If this cursor represents a documentable entity (e.g.,
     * declaration), returns the associated
     * \\paragraph ; otherwise returns the
     * first paragraph.
     */
    getBriefCommentText(): string {
        const cxstring = libclang.symbols.clang_Cursor_getBriefCommentText(
            this.#buffer,
        );
        return cxstringToString(cxstring);
    }

    /**
     * If this cursor represents a declaration, returns the associated
     * comment's source range. The range may include multiple consecutive comments
     * with whitespace in between.
     */
    getCommentRange(): CXSourceRange | null {
        return CXSourceRange[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_Cursor_getCommentRange(this.#buffer),
        );
    }

    /**
     * If this cursor represents an Objective-C method or parameter
     * declaration, returns the associated Objective-C qualifiers for the return
     * type or the parameter respectively. The bits are formed from
     * {@link CXObjCDeclQualifierKind}.
     */
    getObjCDeclQualifiers(): number {
        return libclang.symbols.clang_Cursor_getObjCDeclQualifiers(this.#buffer);
    }

    /**
     * If this cursor represents a property declaration, returns the
     * associated property attributes. The bits are formed from
     * {@link CXObjCPropertyAttrKind}.
     */
    getObjCPropertyAttributes(): number {
        return libclang.symbols.clang_Cursor_getObjCPropertyAttributes(
            this.#buffer,
            0,
        );
    }

    /**
     * If this cursor represents a property declaration, returns the
     * name of the method that implements the setter, if any.
     */
    getObjCPropertySetterName(): string {
        return cxstringToString(
            libclang.symbols.clang_Cursor_getObjCPropertySetterName(this.#buffer),
        );
    }

    /**
     * If this cursor represents a property declaration, returns the
     * name of the method that implements the getter.
     */
    getObjCPropertyGetterName(): string {
        return cxstringToString(
            libclang.symbols.clang_Cursor_getObjCPropertyGetterName(this.#buffer),
        );
    }

    /**
     * If this cursor points to a selector identifier in an Objective-C
     * method or message expression, this returns the selector index.
     *
     * After getting a cursor with {@link CXTranslationUnit.getCursor},
     * this can be called to determine if the location points to a selector identifier.
     *
     * @returns The selector index if the cursor is an Objective-C method or message
     * expression and the cursor is pointing to a selector identifier, or -1
     * otherwise.
     */
    getObjCSelectorIndex(): number {
        return libclang.symbols.clang_Cursor_getObjCSelectorIndex(this.#buffer);
    }

    /**
     * Get an array of strings representing the mangled symbols of the ObjC
     * class interface or implementation at this cursor.
     */
    getObjCManglings(): string[] {
        return cxstringSetToStringArray(
            libclang.symbols.clang_Cursor_getObjCManglings(this.#buffer),
        );
    }

    /**
     * If this cursor represents an Objective-C method or property
     * declaration, returns `true` if the declaration was affected by "\@optional".
     * Returns `false` if the cursor is not such a declaration or it is "\@required".
     */
    isObjCOptional(): boolean {
        return libclang.symbols.clang_Cursor_isObjCOptional(this.#buffer) !== 0;
    }

    /**
     * If this cursor represents a declaration, returns the associated
     * comment text, including comment markers.
     */
    getRawCommentText(): string {
        return cxstringToString(
            libclang.symbols.clang_Cursor_getRawCommentText(this.#buffer),
        );
    }

    /**
     * If this cursor points to an Objective-C message or property
     * reference, or C++ method call, returns the CXType of the receiver.
     */
    getReceiverType(): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_Cursor_getReceiverType(this.#buffer),
        );
    }

    /**
     * If this cursor points to a C++ method call or an Objective-C
     * message, returns `true` if the method/message is "dynamic", meaning:
     *
     * For a C++ method: the call is virtual.
     * For an Objective-C message: the receiver is an object instance, not 'super'
     * or a specific class.
     *
     * If the method/message is "static" or the cursor does not point to a
     * method/message, it will return `false`.
     */
    isDynamicCall(): boolean {
        return libclang.symbols.clang_Cursor_isDynamicCall(this.#buffer) !== 0;
    }

    /**
     * Returns `true` if this cursor points to a symbol marked with
     * `external_source_symbol` attribute.
     *
     * Use {@link getExternalSymbolAttributes()} to get details of
     * the attribute.
     */
    isExternalSymbol(): boolean {
        return libclang.symbols.clang_Cursor_isExternalSymbol(
            this.#buffer,
            NULLBUF,
            NULLBUF,
            NULLBUF,
        ) !== 0;
    }

    /**
     * If this cursor points to a symbol marked with `external_source_symbol`
     * attribute, returns an object containing `language`, `definedIn` and
     * `generated_declaration` details of the attribute.
     */
    getExternalSymbolAttributes(): null | {
        /**
         * The `language` string from the attribute.
         */
        language: null | string;
        /**
         * The `definedIn` string from the attribute.
         */
        definedIn: null | string;
        /**
         * The `true` if `generated_declaration` is set in the attribute.
         */
        isGenerated: boolean;
    } {
        const languageOut = new Uint8Array(16 * 2 + 4);
        const definedInOut = languageOut.subarray(16, 16 * 2);
        const isGeneratedOut = languageOut.subarray(16 * 2);
        const isExternalSymbol = libclang.symbols.clang_Cursor_isExternalSymbol(
            this.#buffer,
            languageOut,
            definedInOut,
            isGeneratedOut,
        ) !== 0;
        if (!isExternalSymbol) {
            // If the symbol is not external, the out buffers will be left untouched.
            // Thus, there's no need to call dispose functions.
            return null;
        }
        const language = cxstringToString(languageOut) || null;
        const definedIn = cxstringToString(definedInOut) || null;
        const isGenerated = isGeneratedOut[0] !== 0 || isGeneratedOut[1] !== 0 ||
            isGeneratedOut[2] !== 0 || isGeneratedOut[3] !== 0;
        return {
            language,
            definedIn,
            isGenerated,
        };
    }

    /**
     * Retrieve the canonical cursor corresponding to this cursor.
     *
     * In the C family of languages, many kinds of entities can be declared several
     * times within a single translation unit. For example, a structure type can
     * be forward-declared (possibly multiple times) and later defined:
     *
     * ```cpp
     * struct X;
     * struct X;
     * struct X {
     *   int member;
     * };
     * ```
     * The declarations and the definition of `X` are represented by three
     * different cursors, all of which are declarations of the same underlying
     * entity. One of these cursor is considered the "canonical" cursor, which
     * is effectively the representative for the underlying entity. One can
     * determine if two cursors are declarations of the same underlying entity by
     * comparing their canonical cursors.
     *
     * @returns The canonical cursor for the entity referred to by this cursor.
     */
    getCanonicalCursor(): CXCursor {
        // A canonical cursor always exists.
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCanonicalCursor(this.#buffer),
        )!;
    }

    /**
     * If this cursor is either a reference to or a declaration
     * of some entity, retrieve a cursor that describes the definition of
     * that entity.
     *
     * Some entities can be declared multiple times within a translation
     * unit, but only one of those declarations can also be a
     * definition. For example, given:
     *
     * ```cpp
     *  int f(int, int);
     *  int g(int x, int y) { return f(x, y); }
     *  int f(int a, int b) { return a + b; }
     *  int f(int, int);
     * ```
     * there are three declarations of the function "f", but only the
     * second one is a definition. The {@link getDefinition()}
     * function will take any cursor pointing to a declaration of "f"
     * (the first or fourth lines of the example) or a cursor referenced
     * that uses "f" (the call to "f' inside "g") and will return a
     * declaration cursor pointing to the definition (the second "f"
     * declaration).
     *
     * If this is a cursor for which there is no corresponding definition,
     * e.g., because there is no definition of that entity within this
     * translation unit, returns `null`.
     */
    getDefinition(): null | CXCursor {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorDefinition(this.#buffer),
        );
    }

    /**
     * Retrieve the display name for the entity referenced by this cursor.
     *
     * The display name contains extra information that helps identify the cursor,
     * such as the parameters of a function or template or the arguments of a
     * class template specialization.
     */
    getDisplayName(): string {
        return cxstringToString(
            libclang.symbols.clang_getCursorDisplayName(this.#buffer),
        );
    }

    /**
     * Pretty print declarations.
     *
     * @param [printingPolicy] The policy to control the entities being printed.
     * @returns The pretty printed declaration or the empty string for
     * other cursors.
     */
    getPrettyPrinted(printingPolicy?: CXPrintingPolicy): string {
        return cxstringToString(
            libclang.symbols.clang_getCursorPrettyPrinted(
                this.#buffer,
                printingPolicy ? printingPolicy[POINTER] : NULL,
            ),
        );
    }

    /**
     * Retrieve the default policy for this cursor.
     */
    getPrintingPolicy(): CXPrintingPolicy {
        return CXPrintingPolicy[CONSTRUCTOR](
            libclang.symbols.clang_getCursorPrintingPolicy(this.#buffer),
        );
    }

    /**
     * If this cursor is a reference, retrieves a cursor representing the
     * entity that it references.
     *
     * Reference cursors refer to other entities in the AST. For example, an
     * Objective-C superclass reference cursor refers to an Objective-C class.
     * This function produces the cursor for the Objective-C class from the
     * cursor for the superclass reference. If this cursor is a declaration or
     * definition, it returns that declaration or definition unchanged.
     * Otherwise, returns `null`.
     */
    getReferenced(): null | CXCursor {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorReferenced(this.#buffer),
        );
    }

    /**
     * Retrieve a name for the entity referenced by this cursor.
     */
    getSpelling(): string {
        return cxstringToString(
            libclang.symbols.clang_getCursorSpelling(this.#buffer),
        );
    }

    /**
     * Gets a human readable string of this cursor's kind.
     *
     * Use this for debugging only.
     */
    getKindSpelling(): string {
        return cxstringToString(
            libclang.symbols.clang_getCursorKindSpelling(
                libclang.symbols.clang_getCursorKind(this.#buffer),
            ),
        );
    }

    /**
     * Retrieve a Unified Symbol Resolution (USR) for the entity referenced
     * by this cursor.
     *
     * A Unified Symbol Resolution (USR) is a string that identifies a particular
     * entity (function, class, variable, etc.) within a program. USRs can be
     * compared across translation units to determine, e.g., when references in
     * one translation refer to an entity defined in another translation unit.
     */
    getUSR(): string {
        return cxstringToString(libclang.symbols.clang_getCursorUSR(this.#buffer));
    }

    /**
     * Visit the children of this cursor.
     *
     * This function visits all the direct children of the given cursor,
     * invoking the given {@link callback} function with the cursors of each
     * visited child. The traversal may be recursive, if the visitor returns
     * {@link CXChildVisitResult.CXChildVisit_Recurse}. The traversal may
     * also be ended prematurely, if the visitor returns
     * {@link CXChildVisitResult.CXChildVisit_Break}.
     *
     * All kinds of cursors can be visited, including invalid cursors (which, by
     * definition, have no children).
     *
     * @param callback The visitor function that will be invoked for each
     * child of this cursor.
     * @returns Returns `true` if the traversal was terminated
     * prematurely by the visitor returning
     * {@link CXChildVisitResult.CXChildVisit_Break}.
     */
    visitChildren(
        callback: (cursor: CXCursor, parent: CXCursor) => CXChildVisitResult,
    ): boolean {
        const savedTu = GLOBAL.CURRENT_TU;
        const savedCallback = CURRENT_CURSOR_VISITOR_CALLBACK;
        GLOBAL.CURRENT_TU = this.tu;
        CURRENT_CURSOR_VISITOR_CALLBACK = callback;
        try {
            const result = libclang.symbols.clang_visitChildren(
                this.#buffer,
                CX_CURSOR_VISITOR_CALLBACK.pointer,
                NULL,
            ) > 0;
            return result;
        } finally {
            GLOBAL.CURRENT_TU = savedTu;
            CURRENT_CURSOR_VISITOR_CALLBACK = savedCallback;
        }
    }

    /**
     * Retrieve the string representing the mangled name of this cursor.
     */
    getMangling(): string {
        return cxstringToString(
            libclang.symbols.clang_Cursor_getMangling(this.#buffer),
        );
    }

    /**
     * Retrieve an array of strings representing the mangled symbols of the C++
     * constructor or destructor at this cursor.
     */
    getCXXManglings(): string[] {
        return cxstringSetToStringArray(
            libclang.symbols.clang_Cursor_getCXXManglings(this.#buffer),
        );
    }

    /**
     * If this cursor represents a documentable entity (e.g.,
     * declaration), returns the associated parsed comment as a
     * {@link CXCommentKind.CXComment_FullComment} kind {@link CXComment} AST node.
     */
    getParsedComment(): CXComment {
        return CXComment[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_Cursor_getParsedComment(this.#buffer),
        );
    }

    /**
     * If this cursor that references something else, returns the source range
     * covering that reference.
     *
     * A cursor references something else if it is a member reference,
     * a declaration reference, or an operator call cursor.
     *
     * @param options An array of {@link CXNameRefFlags} flags.
     *
     * @param pieceIndex For contiguous names or when passing the flag
     * {@link CXNameRefFlags.CXNameRange_WantSinglePiece}, only one piece with index 0 is
     * available. When the {@link CXNameRefFlags.CXNameRange_WantSinglePiece} flag is not
     * passed for non-contiguous names this index can be used to retrieve the individual
     * pieces of the name. See also {@link CXNameRefFlags.CXNameRange_WantSinglePiece}.
     * @returns The piece of the name pointed to by this cursor. If there is no
     * name, or if the PieceIndex is out-of-range, returns `null`.
     */
    getReferenceNameRange(
        options: CXNameRefFlags[] = [],
        pieceIndex = 0,
    ): CXSourceRange | null {
        let opts = 0;
        for (const option of options) {
            opts |= option;
        }
        return CXSourceRange[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorReferenceNameRange(
                this.#buffer,
                opts,
                pieceIndex,
            ),
        );
    }

    /**
     * If this cursor may represent a specialization or instantiation
     * of a template, retrieves the cursor that represents the template that it
     * specializes or from which it was instantiated.
     *
     * This routine determines the template involved both for explicit
     * specializations of templates and for implicit instantiations of the template,
     * both of which are referred to as "specializations". For a class template
     * specialization (e.g., `std::vector<bool>`), this routine will return
     * either the primary template (`std::vector`) or, if the specialization was
     * instantiated from a class template partial specialization, the class template
     * partial specialization. For a class template partial specialization and a
     * function template specialization (including instantiations), this
     * this routine will return the specialized template.
     *
     * For members of a class template (e.g., member functions, member classes, or
     * static data members), returns the specialized or instantiated member.
     * Although not strictly "templates" in the C++ language, members of class
     * templates have the same notions of specializations and instantiations that
     * templates do, so this routine treats them similarly.
     *
     * @returns If this cursor is a specialization or instantiation of a
     * template or a member thereof, returns the template or member that it
     * specializes or from which it was instantiated. Otherwise, returns `null`.
     */
    getSpecializedTemplate(): CXCursor | null {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getSpecializedCursorTemplate(this.#buffer),
        );
    }

    /**
     * If this cursor represents a template, determines the cursor kind of
     * the specializations would be generated by instantiating the template.
     *
     * This routine can be used to determine what flavor of function template,
     * class template, or class template partial specialization is stored in the
     * cursor. For example, it can describe whether a class template cursor is
     * declared with "struct", "class" or "union".
     *
     * @returns The cursor kind of the specializations that would be generated
     * by instantiating the template at this cursor. If this cursor is not a
     * template, returns {@link CXCursorKind.CXCursor_NoDeclFound}.
     */
    getTemplateKind(): CXCursorKind {
        return libclang.symbols.clang_getTemplateCursorKind(this.#buffer);
    }

    /**
     * If this is a {@link CXCursorKind.CXCursor_ModuleImportDecl} cursor,
     * returns the associated module. Otherwise an error is thrown.
     */
    getModule(): CXModule {
        if (this.tu === null) {
            throw new Error("Cannot get CXModule of null cursor");
        }
        const result = libclang.symbols.clang_Cursor_getModule(this.#buffer);
        if (result === null) {
            throw new Error("Unexpected null CXModule");
        }
        return CXModule[CONSTRUCTOR](
            this.tu,
            result,
        );
    }

    /**
     * Retrieve the physical location of the source constructor referenced
     * by this cursor.
     *
     * The location of a declaration is typically the location of the name of that
     * declaration, where the name of that declaration would occur if it is
     * unnamed, or some keyword that introduces that particular declaration.
     * The location of a reference is where that reference occurs within the
     * source code.
     */
    getLocation(): CXSourceLocation {
        return CXSourceLocation[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorLocation(this.#buffer),
        );
    }

    /**
     * Retrieve the physical extent of the source construct referenced by
     * this cursor.
     *
     * The extent of a cursor starts with the file/line/column pointing at the
     * first character within the source construct that the cursor refers to and
     * ends with the last character within that source construct. For a
     * declaration, the extent covers the declaration itself. For a reference,
     * the extent covers the location of the reference (e.g., where the referenced
     * entity was actually used).
     */
    getExtent(): CXSourceRange {
        // The extent always exists for non-null cursors.
        return CXSourceRange[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getCursorExtent(this.#buffer),
        )!;
    }

    /**
     * Retrieve the type of this cursor, or `null` if no type is available.
     */
    getType(): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_getCursorType(this.#buffer),
        );
    }

    /**
     * Retrieves the underlying type of a typedef declaration.
     *
     * If the cursor does not reference a typedef declaration, returns `null`.
     */
    getTypedefDeclarationOfUnderlyingType(): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_getTypedefDeclUnderlyingType(this.#buffer),
        );
    }

    /**
     * Retrieve the integer type of an enum declaration.
     *
     * If the cursor does not reference an enum declaration, returns `null`.
     */
    getEnumDeclarationIntegerType(): CXType | null {
        if (this.kind !== CXCursorKind.CXCursor_EnumDecl) {
            throw new Error("Not an EnumDecl");
        }
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_getEnumDeclIntegerType(this.#buffer),
        );
    }

    /**
     * Retrieve the integer value of an enum constant declaration as number, or bigint
     * if the value is not safely representable as a JavaScript number.
     *
     * If this cursor does not reference an enum constant declaration, an error is thrown.
     */
    getEnumConstantDeclarationValue(): Deno.PointerValue {
        if (this.kind !== CXCursorKind.CXCursor_EnumConstantDecl) {
            throw new Error("Not an EnumConstantDecl");
        }
        return libclang.symbols.clang_getEnumConstantDeclValue(this.#buffer);
    }

    /**
     * Retrieve the unsigned integer value of an enum constant declaration as number, or bigint
     * if the value is not safely representable as a JavaScript number.
     *
     * If this cursor does not reference an enum constant declaration, an error is thrown.
     */
    getEnumConstantDeclarationUnsignedValue(): Deno.PointerValue {
        if (this.kind !== CXCursorKind.CXCursor_EnumConstantDecl) {
            throw new Error("Not an EnumConstantDecl");
        }
        return libclang.symbols.clang_getEnumConstantDeclUnsignedValue(
            this.#buffer,
        );
    }

    /**
     * Retrieve the bit width of a bit field declaration as an integer.
     *
     * If this cursor is not a bit field declaration, -1 is returned.
     */
    getFieldDeclarationBitWidth(): number {
        return libclang.symbols.clang_getFieldDeclBitWidth(this.#buffer);
    }

    /**
     * Retrieve the number of non-variadic arguments associated with this
     * cursor.
     *
     * The number of arguments can be determined for calls as well as for
     * declarations of functions or methods. For other cursors -1 is returned.
     */
    getNumberOfArguments(): number {
        return libclang.symbols.clang_Cursor_getNumArguments(this.#buffer);
    }

    /**
     * Retrieve the argument cursor of a function or method.
     *
     * The argument cursor can be determined for calls as well as for declarations
     * of functions or methods. For other cursors and for invalid indices, `null`
     * is returned.
     */
    getArgument(index: number): CXCursor | null {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_Cursor_getArgument(this.#buffer, index),
        );
    }

    /**
     * Returns the number of template args of a function, struct, or class decl
     * representing a template specialization.
     *
     * If this cursor cannot be converted into a template function
     * declaration, -1 is returned.
     *
     * For example, for the following declaration and specialization:
     * ```cpp
     * template <typename T, int kInt, bool kBool>
     * void foo() { ... }
     *
     * template \<\>
     * void foo<float, -7, true>();
     * ```
     *
     * The value 3 would be returned from this call.
     */
    getNumberOfTemplateArguments(): number {
        return libclang.symbols.clang_Cursor_getNumTemplateArguments(this.#buffer);
    }

    /**
     * Retrieve the kind of the I'th template argument of this cursor.
     *
     * If this cursor does not represent a FunctionDecl, StructDecl, or
     * ClassTemplatePartialSpecialization, an invalid template argument kind is
     * returned.
     *
     * For example, for the following declaration and specialization:
     * ```cpp
     * template <typename T, int kInt, bool kBool>
     * void foo() { ... }
     *
     * template \<\>
     * void foo<float, -7, true>();
     * ```
     *
     * For I = 0, 1, and 2, Type, Integral, and Integral will be returned,
     * respectively.
     */
    getTemplateArgumentKind(index: number): CXTemplateArgumentKind {
        return libclang.symbols.clang_Cursor_getTemplateArgumentKind(
            this.#buffer,
            index,
        );
    }

    /**
     * Retrieve a {@link CXType} representing the type of a TemplateArgument of a
     * function decl representing a template specialization.
     *
     * If this cursor does not represent a FunctionDecl, StructDecl,
     * ClassDecl or ClassTemplatePartialSpecialization whose I'th template argument
     * has a kind of CXTemplateArgKind_Integral, `null` is returned.
     *
     * For example, for the following declaration and specialization:
     * ```cpp
     * template <typename T, int kInt, bool kBool>
     * void foo() { ... }
     *
     * template <>
     * void foo<float, -7, true>();
     * ```
     *
     * If called with I = 0, "float", will be returned.
     * Invalid types will be returned for I == 1 or 2.
     */
    getTemplateArgumentType(index: number): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_Cursor_getTemplateArgumentType(
                this.#buffer,
                index,
            ),
        );
    }

    /**
     * Retrieve the value of an Integral TemplateArgument (of a function
     * decl representing a template specialization) as a number or bigint if
     * the value cannot be safely represented as a JavaScript number.
     *
     * It is undefined to call this function on a {@link CXCursor} that does not represent a
     * FunctionDecl, StructDecl, ClassDecl or ClassTemplatePartialSpecialization
     * whose I'th template argument is not an integral value.
     *
     * For example, for the following declaration and specialization:
     * ```cpp
     * template <typename T, int kInt, bool kBool>
     * void foo() { ... }
     *
     * template \<\>
     * void foo<float, -7, true>();
     * ```
     *
     * If called with I = 1 or 2, -7 or true will be returned, respectively.
     * For I == 0, this function's behavior is undefined.
     */
    getTemplateArgumentValue(index: number): Deno.PointerValue {
        return libclang.symbols.clang_Cursor_getTemplateArgumentValue(
            this.#buffer,
            index,
        );
    }

    /**
     * Retrieve the value of an Integral TemplateArgument (of a function
     * decl representing a template specialization) as an unsigned number or bigint
     * if the value cannot be safely represented as a JavaScript number.
     *
     * It is undefined to call this function on a {@link CXCursor} that does not represent a
     * FunctionDecl, StructDecl, ClassDecl or ClassTemplatePartialSpecialization or
     * whose I'th template argument is not an integral value.
     *
     * For example, for the following declaration and specialization:
     * ```cpp
     * template <typename T, int kInt, bool kBool>
     * void foo() { ... }
     *
     * template \<\>
     * void foo<float, 2147483649, true>();
     * ```
     *
     * If called with I = 1 or 2, 2147483649 or 1 will be returned, respectively.
     * For I == 0, this function's behavior is undefined.
     */
    getTemplateArgumentUnsignedValue(index: number): Deno.PointerValue {
        return libclang.symbols.clang_Cursor_getTemplateArgumentUnsignedValue(
            this.#buffer,
            index,
        );
    }

    /**
     * Returns the Objective-C type encoding for the specified declaration.
     */
    getDeclarationObjCTypeEncoding(): string {
        return cxstringToString(
            libclang.symbols.clang_getDeclObjCTypeEncoding(this.#buffer),
        );
    }

    /**
     * Retrieve the return type associated with this cursor.
     *
     * This only returns a valid type if the cursor refers to a function or method.
     */
    getResultType(): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_getCursorResultType(this.#buffer),
        );
    }

    /**
     * Retrieve the exception specification type associated with this cursor.
     *
     * This only returns a valid result if the cursor refers to a function or
     * method.
     */
    getExceptionSpecificationType(): CXCursor_ExceptionSpecificationKind | -1 {
        return libclang.symbols.clang_getCursorExceptionSpecificationType(
            this.#buffer,
        );
    }

    /**
     * Return the offset of the field represented by this cursor.
     *
     * If the cursor is not a field declaration, -1 is returned.
     * If the cursor semantic parent is not a record field declaration,
     * {@link CXTypeLayoutError.CXTypeLayoutError_Invalid} is returned.
     * If the field's type declaration is an incomplete type,
     * {@link CXTypeLayoutError.CXTypeLayoutError_Incomplete} is returned.
     * If the field's type declaration is a dependent type,
     * {@link CXTypeLayoutError.CXTypeLayoutError_Dependent} is returned.
     * If the field's name S is not found,
     * {@link CXTypeLayoutError.CXTypeLayoutError_InvalidFieldName} is returned.
     */
    getOffsetOfField(): CXTypeLayoutError | number {
        return Number(libclang.symbols.clang_Cursor_getOffsetOfField(this.#buffer));
    }

    /**
     * Returns the access control level for the referenced object.
     *
     * If this cursor refers to a C++ declaration, its access control level within
     * its parent scope is returned. Otherwise, if the cursor refers to a base
     * specifier or access specifier, the specifier itself is returned.
     */
    getCXXAccessSpecifier(): CX_CXXAccessSpecifier {
        return libclang.symbols.clang_getCXXAccessSpecifier(this.#buffer);
    }

    /**
     * Returns the storage class for a function or variable declaration.
     *
     * If this cursor is not a function or variable declaration,
     * {@link CX_StorageClass.CX_SC_Invalid} is returned else the storage class.
     */
    getStorageClass(): CX_StorageClass {
        return libclang.symbols.clang_Cursor_getStorageClass(this.#buffer);
    }

    /**
     * Determine the number of overloaded declarations referenced by a
     * {@link CXCursorKind.CXCursor_OverloadedDeclRef} cursor.
     *
     * @returns The number of overloaded declarations referenced by this
     * cursor. If it is not a {@link CXCursorKind.CXCursor_OverloadedDeclRef} cursor,
     * returns 0.
     */
    getNumberOfOverloadedDeclarations(): number {
        return libclang.symbols.clang_getNumOverloadedDecls(this.#buffer);
    }

    /**
     * Retrieve a cursor for one of the overloaded declarations referenced
     * by a {@link CXCursorKind.CXCursor_OverloadedDeclRef} cursor.
     *
     * @param index The zero-based index into the set of overloaded declarations in
     * this cursor.
     * @returns A cursor representing the declaration referenced by this given
     * cursor at the specified {@link index}. If the cursor does not have an
     * associated set of overloaded declarations, or if the index is out of bounds,
     * returns `null`.
     */
    getOverloadedDeclaration(index: number): CXCursor | null {
        return CXCursor[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_getOverloadedDecl(this.#buffer, index),
        );
    }

    /**
     * For cursors representing an `iboutletcollection` attribute,
     * this function returns the collection element type.
     */
    getIBOutletCollectionType(): CXType | null {
        return CXType[CONSTRUCTOR](
            this.tu!,
            libclang.symbols.clang_getIBOutletCollectionType(this.#buffer),
        );
    }

    /**
     * If cursor refers to a variable declaration that has global storage returns `1`.
     * If cursor refers to a variable declaration that doesn't have global storage
     * returns `0`. Otherwise returns `-1`.
     */
    hasVariableDeclarationWithGlobalStorage(): -1 | 0 | 1 {
        return libclang.symbols.clang_Cursor_hasVarDeclGlobalStorage(
            this.#buffer,
        ) as -1 | 0 | 1;
    }

    /**
     * Retrieve a range for a piece that forms the cursor's spelling name.
     * Most of the times there is only one range for the complete spelling but for
     * Objective-C methods and Objective-C message expressions, there are multiple
     * pieces for each selector identifier.
     *
     * @param pieceIndex The index of the spelling name piece. If this is greater
     * than the actual number of pieces, it will return `null`.
     */
    getSpellingNameRange(pieceIndex: number): CXSourceRange | null {
        return CXSourceRange[CONSTRUCTOR](
            this.tu,
            libclang.symbols.clang_Cursor_getSpellingNameRange(
                this.#buffer,
                pieceIndex,
                0,
            ),
        );
    }

    /**
     * For debugging purposes only.
     */
    getDefinitionSpellingAndExtent(): [
        string,
        string,
        number,
        number,
        number,
        number,
    ] {
        const arg1 = OUT;
        const arg2 = OUT.subarray(8);
        const arg3 = OUT.subarray(12);
        const arg4 = OUT.subarray(16);
        const arg5 = OUT.subarray(20);
        const arg6 = OUT.subarray(24);
        libclang.symbols.clang_getDefinitionSpellingAndExtent(
            this.#buffer,
            arg1,
            arg2,
            arg3,
            arg4,
            arg5,
            arg6,
        );
        const out32 = new Uint32Array(OUT, 16, 4);
        return [
            Deno.UnsafePointerView.getCString(OUT_64[0]),
            Deno.UnsafePointerView.getCString(OUT_64[1]),
            ...out32 as unknown as [number, number, number, number],
        ];
    }

    /**
     * Retrieve a completion string for an arbitrary declaration or macro
     * definition cursor.
     *
     * @returns A non-context-sensitive completion string for declaration and macro
     * definition cursors, or `null` for other kinds of cursors.
     */
    getCompletionString(): null | CXCompletionString {
        const result = libclang.symbols.clang_getCursorCompletionString(
            this.#buffer,
        );
        if (result === NULL) {
            return null;
        }
        return CXCompletionString[CONSTRUCTOR](
            result,
        );
    }

    /**
     * If this cursor is a statement declaration this method tries to evaluate the
     * statement and if its variable, tries to evaluate its initializer,
     * into its corresponding type.
     * If it's an expression, tries to evaluate the expression.
     */
    Evaluate(): CXEvalResult {
        return CXEvalResult[CONSTRUCTOR](
            libclang.symbols.clang_Cursor_Evaluate(this.#buffer),
        );
    }

    /**
     * Find references of a declaration in a specific file.
     *
     * This cursor should be pointing to a declaration or a reference of one.
     *
     * @param file File to search for references in.
     * @param callback Callback that will receive pairs of {@link CXCursor}/{@link CXSourceRange} for
     * each reference found.
     * The {@link CXSourceRange} will point inside the file; if the reference is inside
     * a macro (and not a macro argument) the `range` will be `null`.
     * @returns One of the {@link CXResult} enumerators.
     */
    findReferencesInFile(
        file: CXFile,
        callback: (
            cursor: CXCursor,
            range: null | CXSourceRange,
        ) => CXVisitorResult,
    ): CXResult {
        const savedTu = GLOBAL.CURRENT_TU;
        const savedCallback = GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK;
        GLOBAL.CURRENT_TU = this.tu;
        GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK = callback;
        OUT_64[1] = BigInt(CX_CURSOR_AND_RANGE_VISITOR_CALLBACK.pointer);
        try {
            const result = libclang.symbols.clang_findReferencesInFile(
                this.#buffer,
                file[POINTER],
                OUT.subarray(0, 16),
            );
            return result;
        } finally {
            GLOBAL.CURRENT_TU = savedTu;
            GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK = savedCallback;
        }
    }
}
