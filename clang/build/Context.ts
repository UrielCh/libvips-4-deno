import {
    AnyType,
    FunctionType,
} from "./build_utils.ts";

export class ContextFile {
    public functions: FunctionType[] = [];
    constructor(public readonly gl: ContextGlobal, public readonly fileName: string) {
        gl.FUNCTIONS_MAP.set(fileName, this.functions);
    }

    get TYPE_MEMORY(): Map<string, AnyType> {
        return this.gl.TYPE_MEMORY;
    }
    get RETURNED_AS_POINTER(): Set<string> {
        return this.gl.RETURNED_AS_POINTER;
    }
    get PASSED_AS_POINTER_AND_NOT_RETURNED(): Map<string, boolean> {
        return this.gl.PASSED_AS_POINTER_AND_NOT_RETURNED;
    }
    get POINTED_FROM_STRUCT(): Set<string> {
        return this.gl.POINTED_FROM_STRUCT;
    }
    get FUNCTIONS_MAP():  Map<string, FunctionType[]> {
        return this.gl.FUNCTIONS_MAP;
    }
}

export class ContextGlobal {
    public TYPE_MEMORY = new Map<string, AnyType>();
    public RETURNED_AS_POINTER = new Set<string>();
    public PASSED_AS_POINTER_AND_NOT_RETURNED = new Map<string, boolean>();
    public POINTED_FROM_STRUCT = new Set<string>();
    public FUNCTIONS_MAP = new Map<string, FunctionType[]>();
}