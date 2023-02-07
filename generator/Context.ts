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

export interface Context {
    getTypeByName(name: string): AnyType | undefined;
    addType<T extends AnyType>(name: string, type: T): T;
    get RETURNED_AS_POINTER(): Set<string>;
    get PASSED_AS_POINTER_AND_NOT_RETURNED(): Map<string, boolean>;
    get POINTED_FROM_STRUCT(): Set<string>;
    getFunctions(filename: string): FunctionType[];
    addFunction(filename: string, fnc: FunctionType): void;
}

export class ContextGlobal implements Context {
    /**
     * Map<structName, AnyType>
     */
    private TYPE_MEMORY = new Map<string, AnyType>();

    getMemoryTypes(type: "enum"): Array<EnumType& {keyName: string}>;
    getMemoryTypes(type: "plain"): Array<PlainType& {keyName: string}>;
    getMemoryTypes(type: "struct"): Array<StructType& {keyName: string}>;
    getMemoryTypes(type: "function"): Array<FunctionType& {keyName: string}>;
    getMemoryTypes(type: "pointer"): Array<PointerType& {keyName: string}>;
    getMemoryTypes(type: "ref"): Array<ReferenceType& {keyName: string}>;
    getMemoryTypes(): Array<AnyType & {keyName: string}>;

    public getMemoryTypes(type?: ALL_KIND): Array<AnyType & {keyName: string}> {
        const values = [...this.TYPE_MEMORY.values()] as Array<AnyType & {keyName: string}>;
        values.sort((a,b) => a.keyName.localeCompare(b.keyName));
        if (!type)
            return values;
        return values.filter(a => a.kind === type);
    }

    addType<T extends AnyType>(name: string, type: T): T {
        // if (this.TYPE_MEMORY.has(name)) {
        //     throw new Error(`Type ${name} already exists`);
        // }
        if (type.keyName) {
            // clone it
            type = {...type, keyName: name};
            //throw new Error(`can not add type twice ${name} already exists`);
        }
        type.keyName = name;
        this.TYPE_MEMORY.set(name, type);
        return type;
    }
    
    public getTypeByName(name: string): AnyType | undefined {
        switch (name) {
            // hardcoded common predefined types
            case "cstringT": {
                let cstringT = this.TYPE_MEMORY.get(name);
                if (!cstringT) {
                    cstringT = {
                        kind: "plain",
                        comment: `/**\n   * \`const char *\`, C string\n   */`,
                        name: "cstringT",
                        type: "buffer",
                    };
                    this.addType(name, cstringT);
                }
                return cstringT;
            }
            case "cstringArrayT": {
                let cstringArrayT = this.TYPE_MEMORY.get(name);
                if (!cstringArrayT) {
                    cstringArrayT = {
                        kind: "plain",
                        comment: `/**\n   * \`char **\`, C string array\n   */`,
                        name: "cstringArrayT",
                        type: "buffer",
                      };
                    this.addType(name, cstringArrayT);
                }
                return cstringArrayT;
            }
            default:
                return this.TYPE_MEMORY.get(name);
        }
    }

    /**
     * Set<structName>
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
    private FUNCTIONS_MAP = new Map<string, FunctionType[]>();
    
    getFunctions(filename: string): FunctionType[] {
        let ret = this.FUNCTIONS_MAP.get(filename);
        if (!ret) {
            ret = [];
            this.FUNCTIONS_MAP.set(filename, ret);
        }
        return ret;
    }

    public addFunction(filename: string, fnc: FunctionType): void {
        const functions = this.getFunctions(filename);
        const colision = functions.find(f => f.name === fnc.name)
        if (colision) {
            console.error(`addFunction cause colision on fnc ${fnc.name}`);
        } else {
            functions.push(fnc);
        }
    }

    listSources(): string[] {
        return [...this.FUNCTIONS_MAP.keys()].sort();
    }

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