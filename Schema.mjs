/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * GitHub: https://github.com/GeorgeSchafer/SchemaJS
 */

export default class Schema {

    static types = [
        { OBJECT: {'type': 'object'} },
        { ARRAY: {'type': 'array'} },
        { NUMBER: {'type': 'number'} },
        { STRING: {'type': 'string'} },
        { BOOLEAN: { 'type': 'boolean'} }
    ];
    static object = new Enum(types).select('OBJECT');
    static array = new Enum(types).select('ARRAY');
    static number = new Enum(types).select('NUMBER')
    static string = new Enum(types).select('STRING')
    static boolean = new Enum(types).select('BOOLEAN')

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
