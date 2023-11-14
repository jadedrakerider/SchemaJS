/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

export default class Schema {

    static types = [
        { ARRAY: {'type': 'array'} },
        { BOOLEAN: {'type': 'boolean'} },
        { INTEGER: {'type': 'integer'}},
        { NUMBER: {'type': 'number'} },
        { NULL: {'type': 'null'}},
        { OBJECT: {'type': 'object'} },
        { STRING: {'type': 'string'} }
    ];
    static array = new Enum(types).select('ARRAY');
    static boolean = new Enum(types).select('BOOLEAN');
    static integer = new Enum(types).select('INTEGER');
    static number = new Enum(types).select('NUMBER');
    static null = new Enum(types).select('NULL');
    static object = new Enum(types).select('OBJECT');
    static string = new Enum(types).select('STRING');

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
