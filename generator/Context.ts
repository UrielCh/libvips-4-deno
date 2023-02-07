import {
ALL_KIND,
    AnyType,
    EnumType,
    FunctionType,
PlainType,
PointerType,
ReferenceType,
StructType,
} from "./build_utils.ts";

export interface ContextGl {
    get TYPE_MEMORY(): Map<string, AnyType>;
    get RETURNED_AS_POINTER(): Set<string>;
    get PASSED_AS_POINTER_AND_NOT_RETURNED(): Map<string, boolean>;
    get POINTED_FROM_STRUCT(): Set<string>;
    get FUNCTIONS_MAP(): Map<string, FunctionType[]>;
}

export interface Context extends ContextGl {
    get functions(): FunctionType[];   
}

/**
 * create a file context and register it in the global ctxt
 */
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
    get FUNCTIONS_MAP(): Map<string, FunctionType[]> {
        return this.gl.FUNCTIONS_MAP;
    }
}

export class ContextGlobal {
    /**
     * Map<structName, AnyType>
     * 
     */
    public TYPE_MEMORY = new Map<string, AnyType>();

    getMemoryTypes(type: "enum"): EnumType[];
    getMemoryTypes(type: "plain"): PlainType[];
    getMemoryTypes(type: "struct"): StructType[];
    getMemoryTypes(type: "function"): FunctionType[];
    getMemoryTypes(type: "pointer"): PointerType[];
    getMemoryTypes(type: "ref"): ReferenceType[];
    public getMemoryTypes(type: ALL_KIND): AnyType[] {
        return [...this.TYPE_MEMORY.values()].filter(a => a.kind === type);
    }
    // return [this.TYPE_MEMORY.values()].filter(a => a.kind === "enum") as EnumType[];

    /**
     * Set<structName>
     * 
     */
    public RETURNED_AS_POINTER = new Set<string>();
    /**
     *
     */
    public PASSED_AS_POINTER_AND_NOT_RETURNED = new Map<string, boolean>();
    /**
     *
     */
    public POINTED_FROM_STRUCT = new Set<string>();
    /**
     * Map<fileName, FunctionType[]>
     */
    public FUNCTIONS_MAP = new Map<string, FunctionType[]>();

    /**
     * get a function from a file or throw an error
     * 
     * @param filename 
     * @param functionName 
     * @returns 
     */
    getExistingFunction(filename: string, functionName: string): FunctionType {
        const INDEX_FUCNTIONS = this.FUNCTIONS_MAP.get(filename);
        if (!INDEX_FUCNTIONS) {
            throw new Error(`File ${filename} not found within ${[...this.FUNCTIONS_MAP.keys()]}`);
        }
        const fnc = INDEX_FUCNTIONS.find((func) => func.name === functionName);
        if (!fnc) {
            throw new Error(`Function ${functionName} not found in ${filename}`);
        }
        return fnc;
    }
}