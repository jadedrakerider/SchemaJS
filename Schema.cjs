/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * 
 * @description
 *      Enum is an Enum implementation for Javascript with an 
 *      optional Extended Enum (ExtEnum) subclass.
 * @abstract
 *      The Postman implementation has all of its libraries 
 *      compiled into one file to make it easier to implement
 *      and copy-paste into Postman as needed.
 */
'use strict'
const { ExtEnum } = require('./ENUMJS/ENUM.cjs')




const types = [
    { ARRAY: {'type': 'array'} },
    { BOOLEAN: {'type': 'boolean'} },
    { INTEGER: {'type': 'integer'} },
    { NUMBER: {'type': 'number'} },
    { NULL: {'type': 'null'} },
    { OBJECT: {'type': 'object'} },
    { STRING: {'type': 'string'} }
];

/**
 * @class
 * @summary A Schematype is an Extended Enum corresponding to a data type found in a schema. 
 */
class SchemaType extends ExtEnum {
    constructor(){
        super(types);
    }

    toString(){ 
        return `${JSON.stringify(this.valueOf())}`
    }
}

/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to an array.
 */
class ArrayType extends SchemaType {
    constructor(){
        super()
        this.select('ARRAY')
    }
}

/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to a integer.
 */
class BooleanType extends SchemaType {
    constructor(){
        super()
        this.select('BOOLEAN')
    }
}

/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to an array.
 */
class IntegerType extends SchemaType {
    constructor(){
        super()
        this.select('INTEGER')
    }
}

/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to a number.
 */
class NumberType extends SchemaType {
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

/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to an Object.
 */
class ObjectType extends SchemaType {
    constructor(){
        super()
        this.select('OBJECT')
    }
}
/**
 * @class
 * @summary
 *      ArrayType is a pre-baked type of element found in a schema
 *      corresponding to a string.
 */
class StringType extends SchemaType {
    constructor(){
        super()
        this.select('STRING')
    }
}

/**
 * @class
 * @summary
 *      Schema is an object which outlines the data expected to find in
 *      an object.
 */
class Schema {    

    static array = new ArrayType()
    static boolean = new BooleanType()
    static integer = new IntegerType()
    static number = new NumberType()
    static nulled = new NulledType()
    static object = new ObjectType()
    static string = new StringType()

    constructor() {
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
        this.type = "object";
        this.required = [];
        this.properties = {};
    }

    /**
     * @method add
     * @param {string} str 
     * @param {SchemaType} type
     * @summary
     *      Adds the name of a field and its type to the schema.
     */
    add(str, type){
        this.required.push(str);
        this.properties[str] = type;
    }

    /**
     * @method addProfile
     * @param {Object<SchemaType>} profile 
     * @summary
     *      Takes a collection of SchemaTypes collected into an
     *      object and assigns them where they need to be.
     */
    addProfile(profile){
        Object.keys(profile).forEach((field)=>{
            this.add(field, profile[field])
        })
    }

    /**
     * @method toString
     * @param {boolean} pretty 
     * @returns {string}
     *      Returns a string in either a human-readable format (if pretty == true)
     */
    toString( pretty=false ){
        let outputString = '';
        const schema = 'Schema {';
        const required = '"required": [';
        const closeBracket = '],';
        const properties = `"properties": {`;
        const closeBrace = '}';
        const ntab = '\n    ';
        const tab = '    ';

        pretty ? outputString += schema + ntab
               : outputString += schema;

        pretty ? outputString += `"type": "${this.type}", ` + ntab
               : outputString += `"type": "${this.type}", `;

        pretty ? outputString += ntab + required
               : outputString += required;

        if(pretty){
            outputString += ntab
            this.required.forEach(element => {
                outputString += tab + `"${element}",` + ntab;
            })
        } else {
            this.required.forEach(element => {
                outputString += `"${element}",`;
            })
        }

        pretty ? outputString += closeBracket + ntab
               : outputString += closeBracket;


        pretty ? outputString += properties + ntab
               : outputString += properties;

        if(pretty){
            for( const [key, value] of Object.entries(this.properties)){
                outputString += ntab + `"${key}": "${value}",` + ntab;
            }
        } else {
            for( const [key, value] of Object.entries(this.properties)){
                outputString += `"${key}": "${value}",`;
            }
        }

        pretty ? outputString += closeBrace + ntab
               : outputString += closeBrace;
        
        outputString += closeBrace;

        outputString = cleanup(outputString);

        return outputString;
    }
 
}

/**
 * @function cleanup
 * @summary
 *      cleanup takes a stringed object and takes out extra commas from objects and arrays.
 * @param outputString 
 * @returns a string.
 */
function cleanup(outputString){
    outputString = outputString.replaceAll(',]', ']')
    outputString = outputString.replaceAll(',}', '}')
    return outputString;
}

/**
 * @todo write string-parsing algorithm for prettifying toString
 * @param {string} outputstring
 * @returns {string} 
 */
function prettify(outputString){
    outputString = outputString.replaceAll(',', ',\n')
    outputString = outputString.replaceAll('{', '{\n    ')
    outputString = outputString.replaceAll('}', '    }\n')
    outputString = outputString.replaceAll('[', '[\n    ')
    outputString = outputString.replaceAll(']', '    ]\n')
    return outputString
}

// end SchemaJS
