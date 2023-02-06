import { CONSTRUCTOR } from "./common.ts";
import { CXSourceRange } from "./CXSourceRange.ts";
import { GLOBAL } from "./global.ts";
import { CXCursor } from "./CXCursor.ts";
import { CXCursorAndRangeVisitorCallbackDefinition } from "./include/typeDefinitions.ts";

export const CX_CURSOR_AND_RANGE_VISITOR_CALLBACK = new Deno.UnsafeCallback(
  CXCursorAndRangeVisitorCallbackDefinition,
  (_context: Deno.PointerValue, cursor, range) => {
    return GLOBAL.CURRENT_CURSOR_AND_RANGE_VISITOR_CALLBACK(
      CXCursor[CONSTRUCTOR](GLOBAL.CURRENT_TU, cursor)!,
      CXSourceRange[CONSTRUCTOR](GLOBAL.CURRENT_TU, range),
    );
  },
);
