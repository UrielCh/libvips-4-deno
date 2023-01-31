import { CXCursor } from "../mod.ts";
import {
    commentToJSDcoString,
    FunctionParameter,
    toAnyType,
} from "./build_utils.ts";
import { ContextFile } from "./Context.ts";

export function onFunctionDecl(ctxt: ContextFile, cx: CXCursor) {
    const parameters: FunctionParameter[] = [];
    const resultAnyType = toAnyType(ctxt.TYPE_MEMORY, cx.getResultType()!);
    const length = cx.getNumberOfArguments();
    for (let i = 0; i < length; i++) {
        const argument = cx.getArgument(i)!;
        const argumentAnyType = toAnyType(ctxt.TYPE_MEMORY, argument.getType()!);
        parameters.push({
            comment: commentToJSDcoString(
                argument.getParsedComment(),
                argument.getRawCommentText(),
            ),
            name: argument.getDisplayName(),
            type: argumentAnyType,
        });
        if (
            argumentAnyType.kind === "pointer" &&
            argumentAnyType.pointee.kind === "ref"
        ) {
            const referred = ctxt.TYPE_MEMORY.get(argumentAnyType.pointee.name);
            const data = ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.get(
                argumentAnyType.pointee.name,
            );
            if (
                referred &&
                (referred.kind === "struct" || referred.kind === "pointer") &&
                data === undefined
            ) {
                ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(
                    argumentAnyType.pointee.name,
                    true,
                );
            }
        } else if (
            argumentAnyType.kind === "pointer" &&
            argumentAnyType.pointee.kind === "struct"
        ) {
            const data = ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.get(
                argumentAnyType.pointee.name,
            );
            if (data === undefined) {
                ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(
                    argumentAnyType.pointee.name,
                    true,
                );
            }
        }
        argumentAnyType.comment = commentToJSDcoString(
            argument.getParsedComment(),
            argument.getRawCommentText(),
        ) ||
            argumentAnyType.comment;
    }
    const comment = commentToJSDcoString(
        cx.getParsedComment(),
        cx.getRawCommentText(),
    );
    const name = cx.getMangling();
    ctxt.functions.push({
        comment,
        kind: "function",
        name,
        parameters,
        reprName: `${name}T`,
        result: resultAnyType,
    });
    if (resultAnyType.kind === "pointer") {
        const pointee = resultAnyType.pointee;
        if (pointee.kind === "ref" || pointee.kind === "struct") {
            ctxt.RETURNED_AS_POINTER.add(pointee.name);
            ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(pointee.name, false);
            resultAnyType.useBuffer = false;
        }
    } else if (resultAnyType.kind === "struct") {
        ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(resultAnyType.name, false);
    } else if (resultAnyType.kind === "ref") {
        const referred = ctxt.TYPE_MEMORY.get(resultAnyType.name);
        if (referred?.kind === "struct") {
            ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(resultAnyType.name, false);
        }
    }
}