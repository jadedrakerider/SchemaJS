/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 * @description
 *      SchemaJS is a class for API Schema testing.
 *      I got tired of re-writing these over and over,
 *      so now you don't have to. IN ES6!!!
 */

'use strict'
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

export class SchemaType extends ExtEnum {
    constructor(){
        super(types);
    }

    toString(){ 
        return `${JSON.stringify(this.valueOf())}`
    }
}

export const array = new SchemaType()
array.select('ARRAY');
export const boolean = new SchemaType()
boolean.select('BOOLEAN');
export const integer = new SchemaType()
integer.select('INTEGER');
export const number = new SchemaType()
number.select('NUMBER');
export const nulled = new SchemaType()
nulled.select('NULL');
export const object = new SchemaType()
object.select('OBJECT');
export const string = new SchemaType()
string.select('STRING'); 

export class Schema {    

    constructor() {
        this.type = "object";
        this.require = [];
        this.properties = {};
    }

    add(str, typeEnum){
        this.require.push(str);
        this.properties[str] = typeEnum;
    }

    toString( pretty=false ){
        let result = 'Schema {';
        if(pretty){ result += '\n    '}

        result += `"type": "${this.type}", `
        if(pretty){ result += '\n    '}

        result += 'require: ['
        if(pretty){ result += '\n    '}
        this.require.forEach(element => {
            if(pretty){ result += '    '}
            result += `"${element}",`
            if(pretty){ result += '\n    '}
        })
        result += '],'
        if(pretty){ result += '\n    '}

        result += `properties: `
        if(pretty){ result += '\n    '}

        for( const [key, value] of Object.entries(this.properties)){
            if(pretty){ result += '    '}
            result += `${key}: ${value},`
            if(pretty){ result += '\n    '}
        }

        result += '}';
        if(pretty){ result += '\n'}
        
        result += '}'

        result = cleanup(result);
        // if(pretty){ result = prettify(result)}

        return result;
    }
 
}

function cleanup(result){
    result = result.replaceAll(',]', ']')
    result = result.replaceAll(',}', '}')
    return result;
}

/**
 * @todo write string-parsing algorithm for prettifying toString
 * @param {string} result
 * @returns {string} 
 */
function prettify(result){
    result = result.replaceAll(',', ',\n')
    result = result.replaceAll('{', '{\n    ')
    result = result.replaceAll('}', '{\n    }')
    result = result.replaceAll('[', '[\n    ')
    result = result.replaceAll('],', '\n    }')
    return result
}


