/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

import ExtEnum from './ENUMJS/ExtEnum.mjs'



export class Schema {
    static types = [
        { ARRAY: {'type': 'array'} },
        { BOOLEAN: {'type': 'boolean'} },
        { INTEGER: {'type': 'integer'} },
        { NUMBER: {'type': 'number'} },
        { NULL: {'type': 'null'} },
        { OBJECT: {'type': 'object'} },
        { STRING: {'type': 'string'} }
    ];
    
    static array = new ExtEnum(Schema.types).select('ARRAY');
    static boolean = new ExtEnum(Schema.types).select('BOOLEAN');
    static integer = new ExtEnum(Schema.types).select('INTEGER');
    static number = new ExtEnum(Schema.types).select('NUMBER');
    static nulled = new ExtEnum(Schema.types).select('NULL');
    static object = new ExtEnum(Schema.types).select('OBJECT');
    static string = new ExtEnum(Schema.types).select('STRING');

    constructor() {
        this.type = Schema.object;
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
