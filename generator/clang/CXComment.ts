import { CONSTRUCTOR } from "./common.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { libclang } from "./ffi.ts";
import { CXChildVisitResult, CXCommentInlineCommandRenderKind, CXCommentKind, CXCommentParamPassDirection } from "./include/typeDefinitions.ts";
import { cxstringToString } from "./utils.ts";

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
