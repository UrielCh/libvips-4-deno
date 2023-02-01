import { CXCursor } from "../mod.ts";
import {
    toAnyType,
} from "./build_utils.ts";
import { ContextFile } from "./Context.ts";

/** call on CXCursorKind.CXCursor_EnumDecl */
export function onEnumDecl(ctxt: ContextFile, cx: CXCursor) {
    let name = cx.getDisplayName();
    if (!name) {
      // Typedef enums have no name and are handled by the typdef case.
      return;
    }
    if (name.startsWith("enum ")) {
      name = name.substring("enum ".length);
    }
    if (!ctxt.TYPE_MEMORY.has(name)) {
      const type = toAnyType(ctxt.TYPE_MEMORY, cx.getType()!);
      ctxt.TYPE_MEMORY.set(name, type);
    }
}