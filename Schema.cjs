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
 
class Enum {
    constructor(keyArray){
        /**
         * @var keyArray
         *      an array of strings of possible values. By default, 
         *      the initial value is decalred the value of the Enum.
         *      Enum converts strings to upper case.
         * 
         * @var index
         *      Key:boolean pairs that keep track of available and 
         *      the value of the Enum
         * 
         * @method toString takes @var pretty 
         * is a boolean that determines if the
         *          resulting string should be human-readable.
         * 
         */
        // 
        this.index = {}; 

        if(Array.isArray(keyArray)){
            keyArray.forEach(key => {
                this.addKey(key);
            })
            this.select(keyArray[0]);
        } else {
            throw new InvalidArrayError(keyArray);
        }
    }

    addKey(key){
        const ENUM = this.index;
        if(typeof key === 'string'){
            key = copyString(key);
            key = ensureUppercase(key);
        }
        ENUM[key] = false;
    }

    addKeys(keyArray){
        keyArray.forEach( key => {
            this.addKey(key);
        })
    }

    select(key){
        key = ensureUppercase(key);

        const ENUM = this.index;

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false;
        });

        ENUM[key] = true;
    }

    valueOf(){
        const ENUM = this.index;
        
        return Object.keys(ENUM).find(key => ENUM[key]);
    }

    toString(pretty=false){
        const ENUM = this.index;
        const keyValuePairs = Object.keys(ENUM).map(key => `{${key}: ${ENUM[key]}}` );

        if(pretty){
            return `Enum {\n    ${keyValuePairs.join(',\n    ')}\n}`;
        } else {
            return `Enum {${keyValuePairs.join(',')}}`;
        }
    }
}

class ExtEnum extends Enum {
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
     *      InvalidArrayError check;
     */
    constructor(objArray) { // obj = { key: value }

        if(Array.isArray(objArray)){
            const data = splitObjectKeysValues(objArray);
            super(data.keys);
            this.codex = {};
            this.addValues(objArray);
        } else {
            throw new InvalidArrayError();
        }

    }

    addValue(keyValuePair){
        let key = Object.keys(keyValuePair)[0];
        let value = Object.values(keyValuePair)[0]; // [key] string of color name
        key = ensureUppercase(key);
        this.codex[key] = value;
    }

    addValues(keyValuePairArray){
        keyValuePairArray.forEach(pair => {
            this.addValue(pair);
        })
    }

    valueOf(){
        const index = this.index;
        const keys = Object.keys(index)
        const codex = this.codex;

        for( let i = 0 ; i < keys.length ; i++){
            const cipher = keys[i]
            if(index[cipher]){
                return codex[cipher]
            }
        }
        
    }

    keyValueOf(){
        const index = this.index;
        const keys = Object.keys(index)
        const codex = this.codex;
        let pair = {}

        for( let i = 0 ; i < keys.length ; i++ ){
            const cipher = keys[i]

            if(index[cipher]){
                pair[cipher] = codex[cipher];
                return pair ;
            }
        }
    }

    toString(){ 
        return `ExtEnum ${JSON.stringify(this.valueOf())}`
    }
}

// Enum Utility Functions
function ensureUppercase(key){
    if (typeof key === "string") {
        return key.toUpperCase();
    } else {
        return key;
    }
}

function splitObjectKeysValues(objArray){
    const data = {
        keys : [],
        values : []
    };

    objArray.forEach(obj => {
        const key = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        data.keys.push(key)
        data.values.push(value)
    });

    return data;
}

/**
 * @function
 * @summary
 *      This is used to create a copy of the string to prevent the key from 
 *      being modified prematurely and avoid using the string object wrapper.
 * @param str is a string to copy. 
 * @returns a duplicate of the string.
 */
function copyString(str){
    return str.substring(0); // 
}

import { ExtEnum } from './ENUMJS/ENUM.mjs'

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
export class ArrayType extends SchemaType {
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
export class BooleanType extends SchemaType {
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
export class IntegerType extends SchemaType {
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
export class NumberType extends SchemaType {
    constructor(){
        super()
        this.select('NUMBER')
    }
}

export class NulledType extends SchemaType {
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
export class ObjectType extends SchemaType {
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
export class StringType extends SchemaType {
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
export class Schema {    

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
