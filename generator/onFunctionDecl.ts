import { CXCursor } from "./clang/mod.ts";
import {
    cxCommentToJSDcoString,
    FunctionParameter,
    toAnyType,
} from "./build_utils.ts";
import { Context } from "./Context.ts";

export function onFunctionDecl(ctxt: Context, cx: CXCursor, fileName: string) {
    const functionName = cx.getMangling();
    // console.log('function name: ', functionName)
    const parameters: FunctionParameter[] = [];
    const resultType = cx.getResultType()!;
    const resultAnyType = toAnyType(ctxt, resultType);
    const length = cx.getNumberOfArguments();
    for (let i = 0; i < length; i++) {
        const argument = cx.getArgument(i)!;
        const argumentType = argument.getType()!;
        const argumentAnyType = toAnyType(ctxt, argumentType);
        const comment = cxCommentToJSDcoString(argument);
        parameters.push({
            comment,
            name: argument.getDisplayName(),
            type: argumentAnyType,
        });
        if (
            argumentAnyType.kind === "pointer" &&
            argumentAnyType.pointee.kind === "ref"
        ) {
            const referred = ctxt.getTypeByName(argumentAnyType.pointee.name);
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
        argumentAnyType.comment = cxCommentToJSDcoString(argument) ||
            argumentAnyType.comment;
    }
    const comment = cxCommentToJSDcoString(cx);
    ctxt.addFunction(fileName, {
        comment,
        kind: "function",
        name: functionName,
        parameters,
        reprName: `${functionName}T`,
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
        const referred = ctxt.getTypeByName(resultAnyType.name);
        if (referred?.kind === "struct") {
            ctxt.PASSED_AS_POINTER_AND_NOT_RETURNED.set(resultAnyType.name, false);
        }
    }
}