/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 * @description
 *      SchemaJS is a class for API Schema testing.
 *      I got tired of re-writing these over and over,
 *      so now you don't have to. IN ES6!!!
 */

'use strict';
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

class SchemaType extends ExtEnum {
    constructor(){
        super(types);
    }

    toString(){ 
        return `${JSON.stringify(this.valueOf())}`
    }
}

export class ArrayType extends SchemaType {
    constructor(){
        super()
        this.select('ARRAY')
    }
}

export class BooleanType extends SchemaType {
    constructor(){
        super()
        this.select('BOOLEAN')
    }
}

export class IntegerType extends SchemaType {
    constructor(){
        super()
        this.select('INTEGER')
    }
}

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

export class ObjectType extends SchemaType {
    constructor(){
        super()
        this.select('OBJECT')
    }
}

export class StringType extends SchemaType {
    constructor(){
        super()
        this.select('STRING')
    }
}

export class Schema {    

    static array = new ArrayType()
    static boolean = new BooleanType()
    static integer = new IntegerType()
    static number = new NumberType()
    static nulled = new NulledType()
    static object = new ObjectType()
    static string = new StringType()

    constructor() {
        this.type = "object";
        this.required = [];
        this.properties = {};
    }

    add(str, typeEnum){
        this.required.push(str);
        this.properties[str] = typeEnum;
    }

    addProfile(profile){
        Object.keys(profile).forEach((field)=>{
            this.add(field, profile[field])
        })
    }

    toString( pretty=false ){
        let result = '';
        const schema = 'Schema {';
        const required = '"required": [';
        const closeBracket = '],';
        const properties = `"properties": {`;
        const closeBrace = '}';
        const ntab = '\n    ';
        const tab = '    ';

        pretty ? result += schema + ntab
               : result += schema;

        pretty ? result += `"type": "${this.type}", ` + ntab
               : result += `"type": "${this.type}", `;

        pretty ? result += ntab + required
               : result += required;

        if(pretty){
            result += ntab
            this.required.forEach(element => {
                result += tab + `"${element}",` + ntab;
            })
        } else {
            this.required.forEach(element => {
                result += `"${element}",`;
            })
        }

        pretty ? result += closeBracket + ntab
               : result += closeBracket;


        pretty ? result += properties + ntab
               : result += properties;

        if(pretty){
            for( const [key, value] of Object.entries(this.properties)){
                result += ntab + `"${key}": "${value}",` + ntab;
            }
        } else {
            for( const [key, value] of Object.entries(this.properties)){
                result += `"${key}": "${value}",`;
            }
        }

        pretty ? result += closeBrace + ntab
               : result += closeBrace;
        
        result += closeBrace;

        result = cleanup(result);

        return result;
    }
 
}

function cleanup(result){
    result = result.replaceAll(',]', ']')
    result = result.replaceAll(',}', '}')
    return result;
}

/**
 * @todo finish writing string-parsing algorithm for prettifying toString
 * @param {string} result
 * @returns {string} 
 */
function prettify(result){
    result = result.replaceAll(',', ',\n')
    result = result.replaceAll('{', '{\n    ')
    result = result.replaceAll('}', '    }\n')
    result = result.replaceAll('[', '[\n    ')
    result = result.replaceAll(']', '    ]\n')
    return result
}


