/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * 
 * @description
 *      Enum is an Enum implementation for Javascript with an 
 *      optional Extended Enum (ExtEnum) subclass.
 */
 


class Enum {
    constructor(keyArray){
        this.index = {}

        if(Array.isArray(keyArray)){
            keyArray.forEach(key => {
                this.addKey(key)
            })
            this.select(keyArray[0])
        } else {
            throw new InvalidArrayError(keyArray)
        }
    }

    addKey(key){
        const ENUM = this.index
        if(typeof key === 'string'){
            key = copyString(key)
            key = ensureUppercase(key)
        }
        ENUM[key] = false
    }

    addKeys(keyArray){
        keyArray.forEach( key => {
            this.addKey(key)
        })
    }

    select(key){
        key = ensureUppercase(key)

        const ENUM = this.index

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false
        })

        ENUM[key] = true
    }

    duplicate(){
        const result = {}

        const ENUM = this.index

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false
        })

        ENUM[key] = true
    }

    valueOf(){
        const ENUM = this.index
        
        return Object.keys(ENUM).find(key => ENUM[key])
    }

    v(){
        return this.valueOf()
    }

    toString(pretty=false){
        const ENUM = this.index
        const keyValuePairs = Object.keys(ENUM).map(key => `{${key}: ${ENUM[key]}}` )

        if(pretty){
            return `Enum {\n    ${keyValuePairs.join(',\n    ')}\n}`
        } else {
            return `Enum {${keyValuePairs.join(',')}}`
        }
    }

    s(pretty=false){
        return this.toString(pretty)
    }
}

class ExtEnum extends Enum {
    constructor(objArray) { // obj = { key: value }
        /**
         * @param {objArray} is an array of key:value objects.
         *      The keys are passed to the base Enum constructor 
         *      for the Index while the objArray is set to 
         * @var codex is a glossary 
         *      which holds the value of each Enumerated 
         *      Type associated with their keys.
         *      Codex has to be declared under super keyword
         *      because the super keyword has to be called in
         *      the same block. In order to perform the 
         *      InvalidArrayError check
         */
        if(Array.isArray(objArray)){
            const data = splitObjectKeysValues(objArray)
            super(data.keys)
            this.codex = {}
            this.addValues(objArray)
        } else {
            throw new InvalidArrayError()
        }

    }

    addValue(keyValuePair){
        let key = Object.keys(keyValuePair)[0]
        let value = Object.values(keyValuePair)[0]
        key = ensureUppercase(key)
        this.codex[key] = value
    }

    addValues(keyValuePairArray){
        keyValuePairArray.forEach(pair => {
            this.addValue(pair)
        })
    }

    getCipher(){
        const index = Object.keys(this.index)
        let cipher
        index.forEach(i => {
            if(this.index[i]){
                cipher = i
            }
        })

        return cipher
    }

    v(verbose=false){
        return this.valueOf(verbose)
    }

    valueOf(verbose=false){
    /**
     * Colors is an Extended Enum with key-value pairs
     *      booleans hold the key that has the value as the true value
     *      codex needs the key:value
     */
    if(verbose){
            const keyValue = {}
            for( const [key, value] of Object.entries(this.codex)){
                if(this.index[key]){
                    keyValue[key] = value
                }
            }
            return keyValue
        } else {
            const value = this.codex[this.getCipher()]
            return value
        }
    }

    toString(verbose=false){ 
        return `ExtEnum ${JSON.stringify(this.valueOf(verbose))}`
    }
}

class InvalidArrayError {
    constructor(invalidArray){
        throw new TypeError(
            `Enum declaration expected an array of keys, instead received: ${typeof invalidArray}`
        )
    }
}

function ensureUppercase(key){
    if (typeof key === "string") {
        return key.toUpperCase()
    } else {
        return key
    }
}

function splitObjectKeysValues(objArray){
    const data = {
        keys : [],
        values : []
    }

    objArray.forEach(obj => {
        const key = Object.keys(obj)[0]
        const value = Object.values(obj)[0]
        data.keys.push(key)
        data.values.push(value)
    })

    return data
}

function copyString(str){
    /**
     * @function
     * @summary
     *      This is used to create a copy of the string to prevent the key from 
     *      being modified prematurely and avoid using the string object wrapper.
     * @param str is a string to copy. 
     * @returns a duplicate of the string.
     */
    return str.substring(0)
}
/*** End EnumJS ***/

const types = [
    { OBJECT: {'type': 'object'} },
    { ARRAY: {'type': 'array'} },
    { BOOLEAN: {'type': 'boolean'} },
    { INTEGER: {'type': 'integer'} },
    { NUMBER: {'type': 'number'} },
    { NULL: {'type': 'null'} },
    { STRING: {'type': 'string'} }
]

class SchemaType extends ExtEnum {
/**
 * @class
 * @summary A Schematype is an Extended Enum corresponding 
 *      to a data type found in a schema. 
 */

    constructor(){
        super(types)
    }

    toString(){ 
        return `${JSON.stringify(this.valueOf(true))}`
    }
}

class ArrayType extends SchemaType {
/**
 * @class
 */

    constructor(){
        super()
        this.select('ARRAY')
    }
}

class BooleanType extends SchemaType {
/**
* @class
*/
    constructor(){
        super()
        this.select('BOOLEAN')
    }
}

class IntegerType extends SchemaType {
/**
 * @class
 */
    constructor(){
        super()
        this.select('INTEGER')
    }
}

class NumberType extends SchemaType {
/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to a number.
 */
    constructor(){
        super()
        this.select('NUMBER')
    }
}

class NulledType extends SchemaType {
    constructor(){
        super()
        this.select('NULL')
    }
}

class ObjectType extends SchemaType {
    /**
    * @class
    * @summary
    *      ArrayType is a pre-baked type of element found in a schema
    *      corresponding to an Object.
    */
    constructor(){
        super()
        this.select('OBJECT')
    }
}

class StringType extends SchemaType { 
/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to a string.
 */

    constructor(){
        super()
        this.select('STRING')
    }
}



const array = new ArrayType()
const boolean = new BooleanType()
const integer = new IntegerType()
const number = new NumberType()
const nulled = new NulledType()
const object = new ObjectType()
const string = new StringType()

class Schema {
    /**
     * @class
     * @summary
     *      Schema is an object which outlines the data expected to find in
     *      an object.
     */

    static array = array.v()
    static boolean = boolean.v()
    static integer = integer.v()
    static number = number.v()
    static nulled = nulled.v()
    static object = object.v()
    static string = string.v()

    constructor(obj=null) {
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
        this.type = 'object'
        // this.name = 'standard Schema' // for outputting in typeof in place of 'Object'
        this.required = []
        this.properties = {}
        this.additionalProperties = true;

        this.addProfile(obj)
    }

    add(str, type){
    /**
     * @method add
     * @param {string} str 
     * @param {SchemaType} type
     * @summary
     *      Adds the name of a field and its type to the schema.
     */
    this.required.push(str)
        this.properties[str] = type
    }

    addProfile(profile=null){
    /**
     * @method addProfile
     * @param { Object<SchemaType> } profile 
     * @summary
     *      Takes a collection of SchemaTypes collected into an
     *      object and assigns them where they need to be.
     */
    if(profile === null){
        return
    }

    Object.keys(profile).forEach((key) => {
            this.add(key, profile[key])
        })
    }

    toString(pretty=false){
    /**
     * @method toString
     * @param {boolean} pretty 
     * @returns {string}
     *      Returns a string in either a human-readable format (if pretty == true)
     */
    let outputString = ''
        const schema = 'Schema {'
        const required = `'required': [`
        const closeBracket = '],'
        const properties = `'properties': {`
        const closeBrace = '}'
        const ntab = '\n    '
        const tab = '    '

        pretty ? outputString += schema + ntab
               : outputString += schema

        pretty ? outputString += `'type': '${this.type}', ` + ntab
               : outputString += `'type': '${this.type}', `

        pretty ? outputString += ntab + required
               : outputString += required

        if(pretty){
            outputString += ntab
            this.required.forEach(element => {
                outputString += tab + `'${element}',` + ntab
            })
        } else {
            this.required.forEach(element => {
                outputString += `'${element}',`
            })
        }

        pretty ? outputString += closeBracket + ntab
               : outputString += closeBracket


        pretty ? outputString += properties + ntab
               : outputString += properties

        if(pretty){
            for( const [key, value] of Object.entries(this.properties)){
                outputString += ntab + `'${key}': '${value}',` + ntab
            }
        } else {
            for( const [key, value] of Object.entries(this.properties)){
                outputString += `'${key}': '${value}',`
            }
        }

        pretty ? outputString += closeBrace + ntab
               : outputString += closeBrace
        
        outputString += closeBrace

        outputString = cleanup(outputString)

        return outputString
    }

    t(){
        return this.typeOf()
    }

    typeOf(){
        return this.type
    }

    v(){
        return this.valueOf()
    }

    valueOf(){
        return {
            required: this.required,
            type: this.type,
            properties: this.properties,
            additionalProperties: this.additionalProperties
        }
    }

    keywords(){
        let result = new Set([]) //'name']) // name is throwing off ajv

        this.required.forEach(field => {
            result.add(field)
        })

        return result
    }
}

const ArraySchema = new Schema()
ArraySchema.type = 'array'

function cleanup(outputString){
/**
 * @function cleanup
 * @summary
 *      cleanup takes a stringed object and takes out extra commas from objects and arrays.
 * @param outputString 
 * @returns a string.
 */
    outputString = outputString.replaceAll(',]', ']')
    outputString = outputString.replaceAll(',}', '}')
    return outputString
}

/*** End SchemaJS ***/