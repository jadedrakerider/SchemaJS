/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

'use strict'
import { default as Enum,
         ExtEnum} from './ENUMJS/Enum.mjs'

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

    // toString(bool){
    //     return `SchemaType { ${this.toString(bool)} }`;
    // }
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

    /**
     * @todo
     *      Figure out why I am getting a type error and this.type wants to be a function.
     * 
     * 
     * toString(pretty=false){
     *     let result = '{';
     *     if(pretty){
     *         result += '\n';
     *         result +=
     *             `    type = ${this.type},\n`
     *             `    require = ${this.require},\n`
     *             `    properties = {\n`;
        
        
     *         const map = new Map();
     *         const keys = this.properties.entries().forEach((key,value) => {
     *             result += `        '${key}': '${value}'\n`
     *         });
     *         result += `    }\n`;
     *         result += `}`;
     *     } else {
     *         result += `{type = ${this.type}}, require = [${this.require}], properties = { `

     *         const map = new Map();
     *         const keys = this.properties.entries.forEach((key,value) => { 
     *             result += `${key}: ${value}, `;
     *         });

     *         result = result.substring(0,-2);

     *         result += '}';
     *     }

     *     return result;
     * }
    */
 
}
