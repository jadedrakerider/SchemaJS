/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 * @description
 *      SchemaJS is a class for API Schema testing.
 *      I got tired of re-writing these over and over,
 *      so now you don't have to. IN ES6!!!
 */
import { SchemaType } from "./SchemaType.mjs"








class Schema {
    /**
     * @class
     * @summary
     *      Schema is an object which outlines the data expected to find in
     *      an object.
     */

    static name = "standard Schema" // for outputting in typeof in place of '[Object Object]'

    constructor(obj = null) {
        /**
         * @property {string} type
         *      a string which names the expected type of data. Objects
         *      are always objects, and that is why this is hard coded
         *      here.
         * @property {array} required
         *      an array of strings with the keys found in the object
         *      we will find in the schema.
         * @property {object} propertiees
         *      an object which holds the SchemaTypes of the SchemaType
         *      class. This is where the expectations of required are
         *      defined.
         */
        this.type = "object"
        this.required = []
        this.properties = {}
        this.additionalProperties = true

        this.addProfile(obj)
    }

    add(str, type) {
        /**
         * @method add
         * @param {string} str
         * @param {SchemaType} type
         * @summary
         *      Adds the name of a field and its type to the schema.
         */
        this.required.push(str)
        this.properties[str] = { type: type.type }
    }

    addProfile(profile = null) {
        /**
         * @method addProfile
         * @param { Object<SchemaType> } profile
         * @summary
         *      Takes a collection of SchemaTypes collected into an
         *      object and assigns them where they need to be.
         */
        if (profile === null) {
            return
        }

        for (const [key, value] of Object.entries(profile)) {
            this.add(key, value.valueOf())
        }

        // Object.keys(profile).forEach((key) => {
        //     this.add(key, profile[key])
        // })
    }

    toString(pretty = false) {
        /**
         * @method toString
         * @param {boolean} pretty
         * @returns {string}
         *      Returns a string in either a human-readable format (if pretty == true)
         */
        let outputString = ""
        const schema = "Schema {"
        const required = `'required': [`
        const closeBracket = "],"
        const properties = `'properties': {`
        const closeBrace = "}"
        const ntab = "\n    "
        const tab = "    "

        pretty ? (outputString += schema + ntab) : (outputString += schema)

        pretty
            ? (outputString += `'type': '${this.type}', ` + ntab)
            : (outputString += `'type': '${this.type}', `)

        pretty ? (outputString += ntab + required) : (outputString += required)

        if (pretty) {
            outputString += ntab
            this.required.forEach((element) => {
                outputString += tab + `'${element}',` + ntab
            })
        } else {
            this.required.forEach((element) => {
                outputString += `'${element}',`
            })
        }

        pretty
            ? (outputString += closeBracket + ntab)
            : (outputString += closeBracket)

        pretty
            ? (outputString += properties + ntab)
            : (outputString += properties)

        if (pretty) {
            for (const [key, value] of Object.entries(this.properties)) {
                outputString += ntab + `'${key}': '${value}',` + ntab
            }
        } else {
            for (const [key, value] of Object.entries(this.properties)) {
                outputString += `'${key}': '${value}',`
            }
        }

        pretty
            ? (outputString += closeBrace + ntab)
            : (outputString += closeBrace)

        outputString += closeBrace

        outputString = cleanup(outputString)

        return outputString
    }

    t() {
        return this.typeOf()
    }

    typeOf() {
        return this.type
    }

    v() {
        return this.valueOf()
    }

    valueOf() {
        return {
            required: this.required,
            type: this.type,
            properties: this.properties,
            additionalProperties: this.additionalProperties,
        }
    }

    keywords() {
        let result = new Set([]) //'name']) // name is throwing off ajv
        let properties = ["name"]
        properties.forEach((field) => {
            result.add(field)
        })
        Object.keys(this.properties).forEach((field) => {
            result.add(field)
        })

        return result
    }

    static schemify(obj){
        obj = Schema.parse(obj)
        return obj
    }

    static parse(obj){
    /**
     * @todo write tests
     * @param {object} obj
     *      an object of key-value pairs
     * @method parse
     *      parses obj and
     * @returns {Schema}
     *      of the first layer of the object
     */
        let type
        const profile = {}

        for (const [key, value] of Object.entries(obj)) {
            profile[key] = Schema.schemaTypeOf(value)
        }

        const schema = new Schema(profile)

        return schema
    }

    static schemaTypeOf(value) {
    /**
     * @todo write tests
     * @param {*} value
     *      an object of key-value pairs
     * @method schemaTypeOf
     *      takes a value of any type and determines which SchemaType it
     *          corresponds to, then
     * @returns {SchemaType}
     *      of value
     */
        if (typeof value === "array") {
            return array
        } else if (typeof value === "boolean") {
            return boolean
        } else if (typeof value === "number") {
            return number
        } else if (typeof value === "null") {
            return nulled
        } else if (typeof value === "object") {
            return object
        } else if (typeof value === "string") {
            return string
        } else if (typeof value === "undefined") {
            throw new InvalidInputError("Parameter is undefined")
        } else {
            throw new InvalidInputError("Parameter is an unrecognized type")
        }
    }
}

class ArraySchema extends Schema {
    constructor(){
        super(obj)
        this.type = 'array'
        this.name = 'ArraySchema'
    }
}

class InvalidInputError extends TypeError {
    constructor(message) {
        super(message)
    }
}


function cleanup(outputString) {
    /**
     * @function cleanup
     * @summary
     *      cleanup takes a stringed object and takes out extra commas from objects and arrays.
     * @param outputString
     * @returns a string.
     */
    outputString = outputString.replaceAll(",]", "]")
    outputString = outputString.replaceAll(",}", "}")
    return outputString
}

function prettify(outputString) {
    /**
     * @todo write string-parsing algorithm for prettifying toString
     * @param {string} outputstring
     * @returns {string}
     */
    outputString = outputString.replaceAll(",", ",\n")
    outputString = outputString.replaceAll("{", "{\n    ")
    outputString = outputString.replaceAll("}", "    }\n")
    outputString = outputString.replaceAll("[", "[\n    ")
    outputString = outputString.replaceAll("]", "    ]\n")
    return outputString
}

export {
    SchemaType,
    Schema,
    ArraySchema,
    InvalidInputError
}
