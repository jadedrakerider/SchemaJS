/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * 
 * @description
 *      Enum is an Enum implementation for Javascript with an 
 *      optional Extended Enum (ExtEnum) subclass.
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


const array = new SchemaType()
array.select('ARRAY');
const boolean = new SchemaType()
boolean.select('BOOLEAN');
const integer = new SchemaType()
integer.select('INTEGER');
const number = new SchemaType()
number.select('NUMBER');
const nulled = new SchemaType()
nulled.select('NULL');
const object = new SchemaType()
object.select('OBJECT');
const string = new SchemaType()
string.select('STRING'); 

class Schema {

    constructor() {
        this.type = "object";
        this.required = [];
        this.properties = {};
    }

    add(str, typeEnum){
        this.required.push(str);
        this.properties[str] = typeEnum;
    }

    toString( pretty=false ){
        let result = 'Schema {';
        if(pretty){ result += '\n    '}

        result += `"type": "${this.type}", `
        if(pretty){ result += '\n    '}

        result += 'required: ['
        if(pretty){ result += '\n    '}
        this.required.forEach(element => {
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

        return result;
    }
}

function cleanup(result){
    result = result.replaceAll(',]', ']')
    result = result.replaceAll(',}', '}')
    return result;
}

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

function copyString(str){
    return str.substring(0); // This is used to create a copy of the string to prevent the key from being modified prematurely and avoid using the string object wrapper.
}

module.exports = Schema;