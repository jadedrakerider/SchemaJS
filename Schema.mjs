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

export const array = new ExtEnum(types).select('ARRAY');
export const boolean = new ExtEnum(types).select('BOOLEAN');
export const integer = new ExtEnum(types).select('INTEGER');
export const number = new ExtEnum(types).select('NUMBER');
export const nulled = new ExtEnum(types).select('NULL');
export const object = new ExtEnum(types).select('OBJECT');
export const string = new ExtEnum(types).select('STRING');

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
 
}
