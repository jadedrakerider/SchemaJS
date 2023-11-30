import { Schema, SchemaType } from '../Schema.mjs'
import { Assertion, expect } from 'chai'
import tv4 from 'tv4';

let counter = 1;
const array = new SchemaType().select('ARRAY');
const boolean = new SchemaType().select('BOOLEAN');
const integer = new SchemaType().select('INTEGER');
const number = new SchemaType().select('NUMBER');
const nulled = new SchemaType().select('NULL');
const object = new SchemaType().select('OBJECT');
const string = new SchemaType().select('STRING'); 
const o = {
    arr: ['str1', 'str2'],
    bool: true,
    integer: 5,
    number: 1.0,
    nulled: null,
    str: 'string',
    subobject: {
        subarr: [],
        subbool: false,
        subint: -2,
        sibnum: -3.14,
        nulled: null,
        str: 'another'
    }
};

describe('Schema mjs', () => {
    describe('Schema Constructor', () => {
        it(`Test ${counter}: Types`, () => {
            const schema = new Schema();
            schema.add('arr', array);
            schema.add('bool', boolean);
            schema.add('integer', integer);
            schema.add('number', number);
            schema.add('nulled', nulled);
            schema.add('str', string);
            schema.add('subobject', object);
            console.log('schema:', schema.toString(true));
            
            expect(tv4.validate(o, schema)).to.be.true;
            


            

        });
    });
});






/*
describe('', () => {
    it('', () => {
        it(``, () => {

        })
    })
})

*/
