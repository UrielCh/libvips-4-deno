import { CXCursor } from "./clang/mod.ts";
import {
    toAnyType,
} from "./build_utils.ts";
import { ContextGl } from "./Context.ts";

/** call on CXCursorKind.CXCursor_EnumDecl */
export function onEnumDecl(ctxt: ContextGl, cx: CXCursor) {
    let name = cx.getDisplayName();
    if (!name) {
      // Typedef enums have no name and are handled by the typdef case.
      return;
    }
    if (name.startsWith("enum ")) {
      name = name.substring("enum ".length);
    }
    if (!ctxt.TYPE_MEMORY.has(name)) {
      const type = toAnyType(ctxt, cx.getType()!);
      ctxt.TYPE_MEMORY.set(name, type);
    }
}