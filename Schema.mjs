/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

import ExtEnum from './ENUMJS/ExtEnum.mjs'

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
}

const array = new SchemaType().select('ARRAY');
const boolean = new SchemaType().select('BOOLEAN');
const integer = new SchemaType().select('INTEGER');
const number = new SchemaType().select('NUMBER');
const nulled = new SchemaType().select('NULL');
const object = new SchemaType().select('OBJECT');
const string = new SchemaType().select('STRING'); 


export class Schema {

    constructor() {
        this.type = object;
        this.require = [];
        this.properties = {};
    }

    add(str, typeEnum){
        this.require.push(str);
        this.properties[str] = typeEnum;
    }

    toString(pretty=false){
        let result = '{';
        if(pretty){
            result += '\n';
            result +=
                `    type = ${this.type},\n`
                `    require = ${this.require},\n`
                `    properties = {\n`;
        
        
            const map = new Map();
            const keys = this.properties.entries().forEach((key,value) => {
                result += `        '${key}': '${value}'\n`
            });
            result += `    }\n`;
            result += `}`;
        } else {
            result += `{type = ${this.type}}, require = [${this.require}], properties = { `

            const map = new Map();
            const keys = this.properties.entries.forEach((key,value) => { 
                result += `${key}: ${value}, `;
            });

            result = result.substring(0,-2);

            result += '}';
        }

        return result;
    }
 
}
