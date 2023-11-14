/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

const ExtEnum = require('./ENUMJS/ExtEnum.cjs')

module.exports = class Schema {

    static types = [
        { ARRAY: {'type': 'array'} },
        { BOOLEAN: {'type': 'boolean'} },
        { INTEGER: {'type': 'integer'}},
        { NUMBER: {'type': 'number'} },
        { NULL: {'type': 'null'}},
        { OBJECT: {'type': 'object'} },
        { STRING: {'type': 'string'} }
    ];
    static array = new ExtEnum(types).select('ARRAY');
    static boolean = new ExtEnum(types).select('BOOLEAN');
    static integer = new ExtEnum(types).select('INTEGER');
    static number = new ExtEnum(types).select('NUMBER');
    static null = new ExtEnum(types).select('NULL');
    static object = new ExtEnum(types).select('OBJECT');
    static string = new ExtEnum(types).select('STRING');

    constructor() {
        this.type = this.object;
        this.require = [];
        this.properties = {};
    }

    add(str, typeObj){
        this.require.push(str);
        this.properites[str] = typeObj;
    }
 
}
