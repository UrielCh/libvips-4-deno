import { CXCursor } from "./clang/mod.ts";
import {
    toAnyType,
} from "./build_utils.ts";
import { Context } from "./Context.ts";

/** call on CXCursorKind.CXCursor_EnumDecl */
export function onEnumDecl(ctxt: Context, cx: CXCursor) {
    let name = cx.getDisplayName();
    if (!name) {
      // Typedef enums have no name and are handled by the typdef case.
      return;
    }
    if (name.startsWith("enum ")) {
      name = name.substring("enum ".length);
    }
    if (!ctxt.getTypeByName(name)) {
      const type = toAnyType(ctxt, cx.getType()!);
      ctxt.addType(name, type);
    }
}