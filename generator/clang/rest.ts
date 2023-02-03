import { libclang } from "./ffi.ts";
import { CONSTRUCTOR, POINTER } from "./common.ts";
import {
  CX_CXXAccessSpecifier,
  CX_StorageClass,
  CXAvailabilityKind,
  CXCallingConv,
  CXChildVisitResult,
  CXCodeComplete_Flags,
  CXCommentInlineCommandRenderKind,
  CXCommentKind,
  CXCommentParamPassDirection,
  CXCompletionChunkKind,
  CXCompletionContext,
  CXCursor_ExceptionSpecificationKind,
  CXCursorAndRangeVisitorCallbackDefinition,
  CXCursorKind,
  CXDiagnosticDisplayOptions,
  CXDiagnosticSeverity,
  CXErrorCode,
  CXEvalResultKind,
  CXFieldVisitorCallbackDefinition,
  CXGlobalOptFlags,
  CXLanguageKind,
  CXLinkageKind,
  CXLoadDiag_Error,
  CXNameRefFlags,
  CXObjCDeclQualifierKind,
  CXObjCPropertyAttrKind,
  CXPrintingPolicyProperty,
  CXRefQualifierKind,
  CXReparse_Flags,
  CXResult,
  CXSaveError,
  CXTemplateArgumentKind,
  CXTLSKind,
  CXTokenKind,
  CXTranslationUnit_Flags,
  CXTypeKind,
  CXTypeLayoutError,
  CXTypeNullabilityKind,
  CXVisibilityKind,
  CXVisitorResult,
} from "./include/typeDefinitions.ts";
import {
  cstr,
  cxstringToString,
  NULL,
} from "./utils.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
export * from "./BuildSystem.ts";
export * from "./CXCompilationDatabase.ts";
export {
  CX_CXXAccessSpecifier,
  CX_StorageClass,
  CXAvailabilityKind,
  CXCallingConv,
  CXChildVisitResult,
  CXCodeComplete_Flags,
  CXCommentInlineCommandRenderKind,
  CXCommentKind,
  CXCommentParamPassDirection,
  CXCompletionChunkKind,
  CXCompletionContext,
  CXCursor_ExceptionSpecificationKind,
  CXCursorKind,
  CXDiagnosticDisplayOptions,
  CXDiagnosticSeverity,
  CXErrorCode,
  CXEvalResultKind,
  CXGlobalOptFlags,
  CXLanguageKind,
  CXLinkageKind,
  CXLoadDiag_Error,
  CXNameRefFlags,
  CXObjCDeclQualifierKind,
  CXObjCPropertyAttrKind,
  CXPrintingPolicyProperty,
  CXRefQualifierKind,
  CXReparse_Flags,
  CXResult,
  CXSaveError,
  CXTemplateArgumentKind,
  CXTLSKind,
  CXTokenKind,
  CXTranslationUnit_Flags,
  CXTypeKind,
  CXTypeLayoutError,
  CXTypeNullabilityKind,
  CXVisibilityKind,
  CXVisitorResult,
};

import { GLOBAL } from "./global.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { CXCursor } from "./CXCursor.ts";

export const CX_CURSOR_AND_RANGE_VISITOR_CALLBACK = new Deno.UnsafeCallback(
  CXCursorAndRangeVisitorCallbackDefinition,
  (_context: Deno.PointerValue, cursor, range) => {
    return GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK(
      CXCursor[CONSTRUCTOR](GLOBAL.CURRENT_TU, cursor)!,
      CXSourceRange[CONSTRUCTOR](GLOBAL.CURRENT_TU, range),
    );
  },
);

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

// type CXTranslationUnitCursor<T> = T extends CXSourceLocation ? CXCursor | null
//   : CXCursor;


/**
 * A parsed comment.
 *
 * @hideconstructor
 */
export class CXComment {
  static #constructable = false;
  tu: null | CXTranslationUnit;
  #buffer: Uint8Array;
  #kind?: number;
  #childCount?: number;
  #argCount?: number;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(tu: null | CXTranslationUnit, buffer: Uint8Array) {
    if (CXComment.#constructable !== true) {
      throw new Error("CXComment is not constructable");
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
  ): CXComment {
    CXComment.#constructable = true;
    const result = new CXComment(tu, buffer);
    CXComment.#constructable = false;
    return result;
  }

  /**
   * @returns The type of the AST node.
   */
  get kind(): CXCommentKind {
    return this.#kind ??
      (this.#kind = libclang.symbols.clang_Comment_getKind(this.#buffer));
  }

  #isInlineContent(): boolean {
    const kind = this.kind;
    return kind === CXCommentKind.CXComment_Text ||
      kind === CXCommentKind.CXComment_InlineCommand ||
      kind == CXCommentKind.CXComment_HTMLStartTag ||
      kind === CXCommentKind.CXComment_HTMLEndTag;
  }

  /**
   * Get a human readable string of this {@link CXComment}'s kind.
   *
   * Use this for debugging only.
   */
  getKindSpelling(): string {
    switch (this.kind) {
      case CXCommentKind.CXComment_Null:
        return "CXComment_Null";
      case CXCommentKind.CXComment_Text:
        return "CXComment_Text";
      case CXCommentKind.CXComment_InlineCommand:
        return "CXComment_InlineCommand";
      case CXCommentKind.CXComment_HTMLStartTag:
        return "CXComment_HTMLStartTag";
      case CXCommentKind.CXComment_HTMLEndTag:
        return "CXComment_HTMLEndTag";
      case CXCommentKind.CXComment_Paragraph:
        return "CXComment_Paragraph";
      case CXCommentKind.CXComment_BlockCommand:
        return "CXComment_BlockCommand";
      case CXCommentKind.CXComment_ParamCommand:
        return "CXComment_ParamCommand";
      case CXCommentKind.CXComment_TParamCommand:
        return "CXComment_TParamCommand";
      case CXCommentKind.CXComment_VerbatimBlockCommand:
        return "CXComment_VerbatimBlockCommand";
      case CXCommentKind.CXComment_VerbatimBlockLine:
        return "CXComment_VerbatimBlockLine";
      case CXCommentKind.CXComment_VerbatimLine:
        return "CXComment_VerbatimLine";
      case CXCommentKind.CXComment_FullComment:
        return "CXComment_FullComment";
    }
    throw new Error("Invalid CXComment, unknown kind");
  }

  /**
   * @returns Number of children of the AST node.
   */
  getNumberOfChildren(): number {
    return this.#childCount ??
      (this.#childCount = libclang.symbols.clang_Comment_getNumChildren(
        this.#buffer,
      ));
  }

  /**
   * @param index Child index (zero-based).
   * @returns The specified child of the AST node. Throws error on out-of-bounds access.
   */
  getChild(index: number): CXComment {
    const length = this.getNumberOfChildren();
    if (index < 0 || length <= index) {
      throw new Error(
        "Invalid argument, index must be unsigned integer within bounds",
      );
    }
    return CXComment[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_Comment_getChild(this.#buffer, index),
    );
  }

  /**
   * A {@link CXCommentKind.CXComment_Paragraph} node is considered whitespace if it contains
   * only {@link CXCommentKind.CXComment_Text} nodes that are empty or whitespace.
   *
   * Other AST nodes (except {@link CXCommentKind.CXComment_Paragraph} and {@link CXCommentKind.CXComment_Text}) are
   * never considered whitespace.
   *
   * @returns `true` if this {@link CXComment} is whitespace.
   */
  isWhitespace(): boolean {
    return libclang.symbols.clang_Comment_isWhitespace(this.#buffer) !== 0;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_Text},
   * {@link CXCommentKind.CXComment_InlineCommand},
   * {@link CXCommentKind.CXComment_HTMLStartTag}, and
   * {@link CXCommentKind.CXComment_HTMLEndTag} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns `true` if this {@link CXComment} is inline content and has a newline
   * immediately following it in the comment text.  Newlines between paragraphs
   * do not count. Throws error if this is not inline content.
   */
  hasTrailingNewline(): boolean {
    if (!this.#isInlineContent()) {
      throw new Error("Not InlineContentComment");
    }
    return libclang.symbols.clang_InlineContentComment_hasTrailingNewline(
      this.#buffer,
    ) !== 0;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_Text},
   * {@link CXCommentKind.CXComment_VerbatimBlockLine}, and
   * {@link CXCommentKind.CXComment_VerbatimLine} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Text contained in the AST node.
   */
  getText(): string {
    const kind = this.kind;
    if (kind === CXCommentKind.CXComment_Text) {
      return cxstringToString(
        libclang.symbols.clang_TextComment_getText(this.#buffer),
      );
    } else if (kind === CXCommentKind.CXComment_VerbatimBlockLine) {
      return cxstringToString(
        libclang.symbols.clang_VerbatimBlockLineComment_getText(this.#buffer),
      );
    } else if (kind === CXCommentKind.CXComment_VerbatimLine) {
      return cxstringToString(
        libclang.symbols.clang_VerbatimLineComment_getText(this.#buffer),
      );
    } else {
      throw new Error("Not Text, VerbatimBlockLine, or VerbatimLine Comment");
    }
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_InlineCommand} and
   * {@link CXCommentKind.CXComment_BlockCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Name of the inline or block command.
   */
  getCommandName(): string {
    const kind = this.kind;
    if (kind === CXCommentKind.CXComment_InlineCommand) {
      return cxstringToString(
        libclang.symbols.clang_InlineCommandComment_getCommandName(
          this.#buffer,
        ),
      );
    } else if (
      kind === CXCommentKind.CXComment_BlockCommand ||
      kind === CXCommentKind.CXComment_ParamCommand ||
      kind === CXCommentKind.CXComment_TParamCommand ||
      kind === CXCommentKind.CXComment_VerbatimBlockCommand ||
      kind === CXCommentKind.CXComment_VerbatimLine
    ) {
      return cxstringToString(
        libclang.symbols.clang_BlockCommandComment_getCommandName(this.#buffer),
      );
    } else {
      console.log(
        this.getKindSpelling(),
        cxstringToString(
          libclang.symbols.clang_InlineCommandComment_getCommandName(
            this.#buffer,
          ),
        ),
        cxstringToString(
          libclang.symbols.clang_BlockCommandComment_getCommandName(
            this.#buffer,
          ),
        ),
      );
      throw new Error(
        "Not InlineCommand, BlockCommand, ParamCommand, TParamCommand, or VerbatimBlockCommand",
      );
    }
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_InlineCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns The most appropriate rendering mode, chosen on command
   * semantics in Doxygen.
   */
  getRenderKind(): CXCommentInlineCommandRenderKind {
    if (this.kind !== CXCommentKind.CXComment_InlineCommand) {
      throw new Error("Not InlineCommand");
    }
    return libclang.symbols.clang_InlineCommandComment_getRenderKind(
      this.#buffer,
    );
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_InlineCommand} and
   * {@link CXCommentKind.CXComment_BlockCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Number of command (for block commands, word-like) arguments.
   */
  getNumberOfArguments(): number {
    const kind = this.kind;
    if (kind === CXCommentKind.CXComment_InlineCommand) {
      return this.#argCount ??
        (this.#argCount = libclang.symbols
          .clang_InlineCommandComment_getNumArgs(
            this.#buffer,
          ));
    } else if (
      kind === CXCommentKind.CXComment_BlockCommand ||
      kind === CXCommentKind.CXComment_ParamCommand ||
      kind === CXCommentKind.CXComment_TParamCommand ||
      kind === CXCommentKind.CXComment_VerbatimBlockCommand ||
      kind === CXCommentKind.CXComment_VerbatimLine
    ) {
      return this.#argCount ??
        (this.#argCount = libclang.symbols.clang_BlockCommandComment_getNumArgs(
          this.#buffer,
        ));
    } else {
      throw new Error(
        "Not InlineCommand, BlockCommand, ParamCommand, TParamCommand, or VerbatimBlockCommand",
      );
    }
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_InlineCommand} and
   * {@link CXCommentKind.CXComment_BlockCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @param index Argument index (zero-based).
   * @returns Text of the specified (for block commands, word-like) argument.
   */
  getArgumentText(index: number): string {
    const kind = this.kind;
    const length = this.getNumberOfArguments();
    if (index < 0 || length <= index) {
      throw new Error(
        "Invalid argument, index must be unsigned integer within bounds",
      );
    } else if (kind === CXCommentKind.CXComment_InlineCommand) {
      return cxstringToString(
        libclang.symbols.clang_InlineCommandComment_getArgText(
          this.#buffer,
          index,
        ),
      );
    } else if (
      kind === CXCommentKind.CXComment_BlockCommand ||
      kind === CXCommentKind.CXComment_ParamCommand ||
      kind === CXCommentKind.CXComment_TParamCommand ||
      kind === CXCommentKind.CXComment_VerbatimBlockCommand ||
      kind === CXCommentKind.CXComment_VerbatimLine
    ) {
      return cxstringToString(
        libclang.symbols.clang_BlockCommandComment_getArgText(
          this.#buffer,
          index,
        ),
      );
    } else {
      throw new Error(
        "Not InlineCommand, BlockCommand, ParamCommand, TParamCommand, or VerbatimBlockCommand",
      );
    }
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_HTMLStartTag}, and
   * {@link CXCommentKind.CXComment_HTMLEndTag} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns HTML tag name.
   */
  getTagName(): string {
    const kind = this.kind;
    if (
      kind !== CXCommentKind.CXComment_HTMLEndTag &&
      kind !== CXCommentKind.CXComment_HTMLStartTag
    ) {
      throw new Error("Not HTMLStartTag or HTMLEndTag");
    }
    return cxstringToString(
      libclang.symbols.clang_HTMLTagComment_getTagName(this.#buffer),
    );
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_HTMLStartTag} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns `true` if tag is self-closing (for example, `<br />`).
   */
  isSelfClosing(): boolean {
    return libclang.symbols.clang_HTMLStartTagComment_isSelfClosing(
      this.#buffer,
    ) !== 0;
  }

  /**
   * Get the attributes of a {@link CXCommentKind.CXComment_HTMLStartTag} type AST node.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns An object containing key-value pairs of attributes.
   */
  getAttributes(): Record<string, string> {
    if (this.kind !== CXCommentKind.CXComment_HTMLStartTag) {
      throw new Error("Not HTMLStartTag");
    }
    const attributes: Record<string, string> = {};
    const count = libclang.symbols.clang_HTMLStartTag_getNumAttrs(this.#buffer);
    for (let i = 0; i < count; i++) {
      attributes[
        cxstringToString(
          libclang.symbols.clang_HTMLStartTag_getAttrName(this.#buffer, i),
        )
      ] = cxstringToString(
        libclang.symbols.clang_HTMLStartTag_getAttrValue(this.#buffer, i),
      );
    }
    return attributes;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_BlockCommand}, and
   * {@link CXCommentKind.CXComment_VerbatimBlockCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Paragraph argument of the block command.
   */
  getParagraph(): CXComment {
    const kind = this.kind;
    if (
      kind !== CXCommentKind.CXComment_BlockCommand &&
      kind !== CXCommentKind.CXComment_VerbatimBlockCommand
    ) {
      throw new Error("Not BlockCommand or VerbatimBlockCommand");
    }
    return CXComment[CONSTRUCTOR](
      this.tu,
      libclang.symbols.clang_BlockCommandComment_getParagraph(this.#buffer),
    );
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_ParamCommand}, and
   * {@link CXCommentKind.CXComment_TParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Parameter or template parameter name.
   */
  getParameterName(): string {
    const kind = this.kind;
    if (kind === CXCommentKind.CXComment_ParamCommand) {
      return cxstringToString(
        libclang.symbols.clang_ParamCommandComment_getParamName(this.#buffer),
      );
    } else if (kind === CXCommentKind.CXComment_TParamCommand) {
      return cxstringToString(
        libclang.symbols.clang_TParamCommandComment_getParamName(this.#buffer),
      );
    } else {
      throw new Error("Not ParamCommand or TParamCommand");
    }
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_ParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns `true` if the parameter that this AST node represents was found
   * in the function prototype and {@link getParameterIndex} function will return a meaningful value.
   */
  isParameterIndexValid(): boolean {
    if (this.kind !== CXCommentKind.CXComment_ParamCommand) {
      throw new Error("Not ParamCommand");
    }
    return libclang.symbols.clang_ParamCommandComment_isParamIndexValid(
      this.#buffer,
    ) !== 0;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_ParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Zero-based parameter index in function prototype.
   */
  getParameterIndex(): number {
    if (this.kind !== CXCommentKind.CXComment_ParamCommand) {
      throw new Error("Not ParamCommand");
    }
    return libclang.symbols.clang_ParamCommandComment_getParamIndex(
      this.#buffer,
    );
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_ParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns `true` if parameter passing direction was specified explicitly in
   * the comment.
   */
  isDirectionExplicit(): boolean {
    if (this.kind !== CXCommentKind.CXComment_ParamCommand) {
      throw new Error("Not ParamCommand");
    }
    return libclang.symbols.clang_ParamCommandComment_isDirectionExplicit(
      this.#buffer,
    ) !== 0;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_ParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Parameter passing direction.
   */
  getDirection(): CXCommentParamPassDirection {
    if (this.kind !== CXCommentKind.CXComment_ParamCommand) {
      throw new Error("Not ParamCommand");
    }
    return libclang.symbols.clang_ParamCommandComment_getDirection(
      this.#buffer,
    );
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_TParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns `true` if the parameter that this AST node represents was found
   * in the template parameter list and {@link getDepth} and {@link getIndex}
   * functions will return a meaningful value.
   */
  isParameterPositionValid(): boolean {
    if (this.kind !== CXCommentKind.CXComment_TParamCommand) {
      throw new Error("Not TParamCommand");
    }
    return libclang.symbols.clang_TParamCommandComment_isParamPositionValid(
      this.#buffer,
    ) !== 0;
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_TParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Zero-based nesting depth of this parameter in the template parameter
   * list.
   *
   * For example,
   *
   * ```
   *     template<typename C, template<typename T> class TT>
   *     void test(TT<int> aaa);
   * ```
   * for C and TT nesting depth is 0,
   * for T nesting depth is 1.
   */
  getDepth(): number {
    if (this.kind !== CXCommentKind.CXComment_TParamCommand) {
      throw new Error("Not TParamCommand");
    }
    return libclang.symbols.clang_TParamCommandComment_getDepth(this.#buffer);
  }

  /**
   * Callable on {@link CXCommentKind.CXComment_TParamCommand} type AST nodes.
   *
   * An error is thrown on invalid invocation.
   *
   * @returns Zero-based parameter index in the template parameter list at a
   * given nesting depth.
   *
   * For example,
   *
   * ```
   *     template<typename C, template<typename T> class TT>
   *     void test(TT<int> aaa);
   * ```
   * for C and TT nesting depth is 0, so we can ask for index at depth 0:
   * at depth 0 C's index is 0, TT's index is 1.
   *
   * For T nesting depth is 1, so we can ask for index at depth 0 and 1:
   * at depth 0 T's index is 1 (same as TT's),
   * at depth 1 T's index is 0.
   */
  getIndex(index: number): number {
    if (this.kind !== CXCommentKind.CXComment_TParamCommand) {
      throw new Error("Not TParamCommand");
    } else if (index < 0) {
      throw new Error("Invalid argument, index must be unsigned integer");
    }
    return libclang.symbols.clang_TParamCommandComment_getIndex(
      this.#buffer,
      index,
    );
  }

  /**
   * Convert an HTML tag AST node to string.
   *
   * Callable on {@link CXCommentKind.CXComment_HTMLStartTag}, and
   * {@link CXCommentKind.CXComment_HTMLEndTag} type AST nodes.
   *
   * @returns String containing an HTML tag.
   */
  getAsString(): string {
    const kind = this.kind;
    if (
      kind !== CXCommentKind.CXComment_HTMLEndTag &&
      kind !== CXCommentKind.CXComment_HTMLStartTag
    ) {
      throw new Error("Not HTMLTag");
    }
    return cxstringToString(
      libclang.symbols.clang_HTMLTagComment_getAsString(this.#buffer),
    );
  }

  /**
   * Convert this full parsed comment to an HTML fragment.
   *
   * Callable only on {@link CXCommentKind.CXComment_FullComment} type AST nodes.
   *
   * Specific details of HTML layout are subject to change. Don't try to parse
   * this HTML back into an AST, use other APIs instead.
   *
   * Currently the following CSS classes are used:
   *
   * @li "para-brief" for
   * \\paragraph  and equivalent commands;
   * @li "para-returns" for \\returns paragraph and equivalent commands;
   *
   * @li "word-returns" for the "Returns" word in \\returns paragraph.
   *
   * Function argument documentation is rendered as a list with arguments
   * sorted in function prototype order. CSS classes used:
   *
   * @li "param-name-index-NUMBER" for parameter name ();
   *
   * @li "param-descr-index-NUMBER" for parameter description ();
   *
   * @li "param-name-index-invalid" and "param-descr-index-invalid" are used if
   * parameter index is invalid.
   *
   * Template parameter documentation is rendered as a list with
   * parameters sorted in template parameter list order. CSS classes used:
   *
   * @li "tparam-name-index-NUMBER" for parameter name ();
   *
   * @li "tparam-descr-index-NUMBER" for parameter description ();
   *
   * @li "tparam-name-index-other" and "tparam-descr-index-other" are used for
   * names inside template template parameters;
   *
   * @li "tparam-name-index-invalid" and "tparam-descr-index-invalid" are used if
   * parameter position is invalid.
   *
   * @returns String containing an HTML fragment.
   */
  getAsHTML(): string {
    if (this.kind !== CXCommentKind.CXComment_FullComment) {
      throw new Error("Not FullComment");
    }
    return cxstringToString(
      libclang.symbols.clang_FullComment_getAsHTML(this.#buffer),
    );
  }

  /**
   * Convert this full parsed comment to an XML document.
   *
   * Callable only on {@link CXCommentKind.CXComment_FullComment} type AST nodes.
   *
   * A Relax NG schema for the XML can be found in comment-xml-schema.rng file
   * inside clang source tree.
   *
   * @returns String containing an XML document.
   */
  getAsXML(): string {
    if (this.kind !== CXCommentKind.CXComment_FullComment) {
      throw new Error("Not FullComment");
    }
    return cxstringToString(
      libclang.symbols.clang_FullComment_getAsXML(this.#buffer),
    );
  }

  #innerVisitChildren(
    callback: (
      comment: CXComment,
      parent: CXComment,
      index: number,
      children: CXComment[],
    ) => CXChildVisitResult,
  ): CXChildVisitResult {
    const length = this.getNumberOfChildren();
    const children = Array.from({ length }, (_, i) => this.getChild(i));
    for (let i = 0; i < length; i++) {
      const child = children[i];
      const result = callback(child, this, i, children);
      switch (result) {
        case CXChildVisitResult.CXChildVisit_Break:
          return CXChildVisitResult.CXChildVisit_Break;
        case CXChildVisitResult.CXChildVisit_Continue:
          continue;
        case CXChildVisitResult.CXChildVisit_Recurse: {
          const recurseResult = child.#innerVisitChildren(callback);
          if (recurseResult === CXChildVisitResult.CXChildVisit_Break) {
            return CXChildVisitResult.CXChildVisit_Break;
          }
        }
      }
    }
    return CXChildVisitResult.CXChildVisit_Continue;
  }

  /**
   * Convenience JS API provided for visiting the children of an AST node.
   *
   * The visiting can be recursive, if the {@link callback} returns
   * {@link CXChildVisitResult.CXChildVisit_Recurse}.
   *
   * @returns `true` if the visiting was interrupted by {@link callback} returning
   * {@link CXChildVisitResult.CXChildVisit_Break}.
   */
  visitChildren(
    callback: (
      comment: CXComment,
      parent: CXComment,
      index: number,
      children: CXComment[],
    ) => CXChildVisitResult,
  ): boolean {
    return this.#innerVisitChildren(callback) ===
      CXChildVisitResult.CXChildVisit_Break;
  }
}

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

const PRINTING_POLICY_FINALIZATION_REGISTRY = new FinalizationRegistry<
  Deno.PointerValue
>((pointer) => libclang.symbols.clang_PrintingPolicy_dispose(pointer));

/**
 * Opaque pointer representing a policy that controls pretty printing
 * for {@link CXCursor.getPrettyPrinted}.
 *
 * Created using {@link CXCursor.getPrintingPolicy}.
 *
 * See also {@link CXPrintingPolicyProperty}.
 *
 * @hideconstructor
 */
export class CXPrintingPolicy {
  static #constructable = false;
  #pointer: Deno.PointerValue;
  #disposed = false;

  /**
   * @private Private API, cannot be used from outside.
   */
  constructor(pointer: Deno.PointerValue) {
    if (CXPrintingPolicy.#constructable !== true) {
      throw new Error("CXPrintingPolicy is not constructable");
    }
    PRINTING_POLICY_FINALIZATION_REGISTRY.register(this, pointer, this);
    this.#pointer = pointer;
  }

  /**
   * @private Private API, cannot be used from outside.
   */
  static [CONSTRUCTOR](pointer: Deno.PointerValue): CXPrintingPolicy {
    CXPrintingPolicy.#constructable = true;
    const result = new CXPrintingPolicy(pointer);
    CXPrintingPolicy.#constructable = false;
    return result;
  }

  get [POINTER](): Deno.PointerValue {
    return this.#pointer;
  }

  get indentation(): number {
    if (this.#disposed) {
      throw new Error("Cannot get indentation of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Indentation,
    );
  }
  set indentation(value: number) {
    if (this.#disposed) {
      throw new Error("Cannot set indentation of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Indentation,
      value,
    );
  }
  get suppressSpecifiers(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressSpecifiers of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressSpecifiers,
    ) !== 0;
  }
  set suppressSpecifiers(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressSpecifiers of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressSpecifiers,
      value ? 1 : 0,
    );
  }
  get suppressTagKeyword(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressTagKeyword of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressTagKeyword,
    ) !== 0;
  }
  set suppressTagKeyword(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressTagKeyword of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressTagKeyword,
      value ? 1 : 0,
    );
  }
  get includeTagDefinition(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get includeTagDefinition of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_IncludeTagDefinition,
    ) !== 0;
  }
  set includeTagDefinition(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set includeTagDefinition of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_IncludeTagDefinition,
      value ? 1 : 0,
    );
  }
  get suppressScope(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get suppressScope of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressScope,
    ) !== 0;
  }
  set suppressScope(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set suppressScope of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressScope,
      value ? 1 : 0,
    );
  }
  get suppressUnwrittenScope(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressUnwrittenScope of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressUnwrittenScope,
    ) !== 0;
  }
  set suppressUnwrittenScope(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressUnwrittenScope of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressUnwrittenScope,
      value ? 1 : 0,
    );
  }
  get suppressInitializers(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressInitializers of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressInitializers,
    ) !== 0;
  }
  set suppressInitializers(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressInitializers of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressInitializers,
      value ? 1 : 0,
    );
  }
  get constantArraySizeAsWritten(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get constantArraySizeAsWritten of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_ConstantArraySizeAsWritten,
    ) !== 0;
  }
  set constantArraySizeAsWritten(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set constantArraySizeAsWritten of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_ConstantArraySizeAsWritten,
      value ? 1 : 0,
    );
  }
  get anonymousTagLocations(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get anonymousTagLocations of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_AnonymousTagLocations,
    ) !== 0;
  }
  set anonymousTagLocations(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set anonymousTagLocations of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_AnonymousTagLocations,
      value ? 1 : 0,
    );
  }
  get suppressStrongLifetime(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressStrongLifetime of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressStrongLifetime,
    ) !== 0;
  }
  set suppressStrongLifetime(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressStrongLifetime of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressStrongLifetime,
      value ? 1 : 0,
    );
  }
  get suppressLifetimeQualifiers(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressLifetimeQualifiers of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressLifetimeQualifiers,
    ) !== 0;
  }
  set suppressLifetimeQualifiers(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressLifetimeQualifiers of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressLifetimeQualifiers,
      value ? 1 : 0,
    );
  }
  get suppressTemplateArgsInCXXConstructors(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressTemplateArgsInCXXConstructors of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty
        .CXPrintingPolicy_SuppressTemplateArgsInCXXConstructors,
    ) !== 0;
  }
  set suppressTemplateArgsInCXXConstructors(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressTemplateArgsInCXXConstructors of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty
        .CXPrintingPolicy_SuppressTemplateArgsInCXXConstructors,
      value ? 1 : 0,
    );
  }
  get bool(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get bool of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Bool,
    ) !== 0;
  }
  set bool(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set bool of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Bool,
      value ? 1 : 0,
    );
  }
  get restrict(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get restrict of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Restrict,
    ) !== 0;
  }
  set restrict(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set restrict of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Restrict,
      value ? 1 : 0,
    );
  }
  get alignof(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get alignof of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Alignof,
    ) !== 0;
  }
  set alignof(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set alignof of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Alignof,
      value ? 1 : 0,
    );
  }
  get underscoreAlignof(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get underscoreAlignof of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_UnderscoreAlignof,
    ) !== 0;
  }
  set underscoreAlignof(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set underscoreAlignof of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_UnderscoreAlignof,
      value ? 1 : 0,
    );
  }
  get useVoidForZeroParams(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get useVoidForZeroParams of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_UseVoidForZeroParams,
    ) !== 0;
  }
  set useVoidForZeroParams(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set useVoidForZeroParams of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_UseVoidForZeroParams,
      value ? 1 : 0,
    );
  }
  get terseOutput(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get terseOutput of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_TerseOutput,
    ) !== 0;
  }
  set terseOutput(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set terseOutput of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_TerseOutput,
      value ? 1 : 0,
    );
  }
  get polishForDeclaration(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get polishForDeclaration of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_PolishForDeclaration,
    ) !== 0;
  }
  set polishForDeclaration(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set polishForDeclaration of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_PolishForDeclaration,
      value ? 1 : 0,
    );
  }
  get half(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get half of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Half,
    ) !== 0;
  }
  set half(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set half of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_Half,
      value ? 1 : 0,
    );
  }
  get mSWChar(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get mSWChar of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_MSWChar,
    ) !== 0;
  }
  set mSWChar(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set mSWChar of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_MSWChar,
      value ? 1 : 0,
    );
  }
  get includeNewlines(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get includeNewlines of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_IncludeNewlines,
    ) !== 0;
  }
  set includeNewlines(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set includeNewlines of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_IncludeNewlines,
      value ? 1 : 0,
    );
  }
  get mSVCFormatting(): boolean {
    if (this.#disposed) {
      throw new Error("Cannot get mSVCFormatting of disposed CXPrintingPolicy");
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_MSVCFormatting,
    ) !== 0;
  }
  set mSVCFormatting(value: boolean) {
    if (this.#disposed) {
      throw new Error("Cannot set mSVCFormatting of disposed CXPrintingPolicy");
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_MSVCFormatting,
      value ? 1 : 0,
    );
  }
  get constantsAsWritten(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get constantsAsWritten of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_ConstantsAsWritten,
    ) !== 0;
  }
  set constantsAsWritten(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set constantsAsWritten of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_ConstantsAsWritten,
      value ? 1 : 0,
    );
  }
  get suppressImplicitBase(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get suppressImplicitBase of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressImplicitBase,
    ) !== 0;
  }
  set suppressImplicitBase(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set suppressImplicitBase of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_SuppressImplicitBase,
      value ? 1 : 0,
    );
  }
  get fullyQualifiedName(): boolean {
    if (this.#disposed) {
      throw new Error(
        "Cannot get fullyQualifiedName of disposed CXPrintingPolicy",
      );
    }
    return libclang.symbols.clang_PrintingPolicy_getProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_FullyQualifiedName,
    ) !== 0;
  }
  set fullyQualifiedName(value: boolean) {
    if (this.#disposed) {
      throw new Error(
        "Cannot set fullyQualifiedName of disposed CXPrintingPolicy",
      );
    }
    libclang.symbols.clang_PrintingPolicy_setProperty(
      this.#pointer,
      CXPrintingPolicyProperty.CXPrintingPolicy_FullyQualifiedName,
      value ? 1 : 0,
    );
  }

  /**
   * Release a printing policy.
   *
   * It is not strictly necessary to call this method, the memory
   * will be released as part of JavaScript garbage collection.
   */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    libclang.symbols.clang_PrintingPolicy_dispose(this.#pointer);
    PRINTING_POLICY_FINALIZATION_REGISTRY.unregister(this);
  }
}
