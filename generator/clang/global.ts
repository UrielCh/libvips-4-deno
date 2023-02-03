import { CXSourceRange } from "./CXSourceRange.ts";
import { CXTranslationUnit } from "./CXTranslationUnit.ts";
import { CXVisitorResult } from "./include/typeDefinitions.ts";
import { CXCursor } from "./CXCursor.ts";

export const GLOBAL = {
    CURRENT_TU: null as null | CXTranslationUnit,
    CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK: (() => {
        // Take advantage of Deno internally handling throwing callback functions by explicitly returning
        // 0, which happens to be the `CXVisitorResult.CXVisit_Break` value.
        throw new Error("Invalid CXCursorAndRangeVisitor callback");
    }) as (cursor: CXCursor, range: null | CXSourceRange) => CXVisitorResult,
};
