class SchemaType {
    static ARRAY = {
        type: "array",
        typeOf: () => { SchemaType.typeOf()},
        valueOf: () => { return SchemaType.valueOf(SchemaType.ARRAY) }
    }
    static BIGINT = {
        type: "bigint",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.BIGINT) }
    }
    static BOOLEAN = {
        type: "boolean",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.BOOLEAN) }
    }
    static NUMBER = {
        type: "number",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.NUMBER) }
    }
    static INTEGER = {
        type: "integer",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.INTEGER) }
    }
    static DECIMAL = {
        type: "decimal",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.DECIMAL) }
    }
    static OBJECT = {
        type: "object",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.OBJECT) }
    }
    static STRING = {
        type: "string",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.STRING) }
    }
    static SYMBOL = {
        type: "symbol",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.SYMBOL) }
    }
    static NULL = {
        type: "null",
        typeOf: () => { SchemaType.typeOf() },
        valueOf: () => { return SchemaType.valueOf(SchemaType.NULL) }
    }

    static matches(obj){
        const entry = Object.entries(obj)[0]

        if( entry.length === 2 &&
            entry[0] === 'type' && (
            entry[1] === 'array' ||
            entry[1] === 'bigint' ||
            entry[1] === 'boolean' ||
            entry[1] === 'number' ||
            entry[1] === 'integer' ||
            entry[1] === 'decimal' ||
            entry[1] === 'object' ||
            entry[1] === 'string' ||
            entry[1] === 'symbol' ||
            entry[1] === 'null')
        ){
            return true
        } else {
            return false
        }
    }

    static typeOf(){
        return 'SchemaType'
    }

    static valueOf(schematype){
        return `${SchemaType.typeOf()} { type: "${schematype.type}" }` 
    }
}

export { SchemaType }