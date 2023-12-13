import { Schema, 
         SchemaType,
         array,
         boolean,
         integer,
         number,
         nulled,
         object,
         string } from '../Schema.mjs'
import { expect } from 'chai'
import tv4 from 'tv4';

let counter = 'A';
const o = {
    arr: ['str1', 'str2'],
    bool: true,
    numbe: 1.0, // Error introduced here to test the validator
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
    describe('SchemaTypes', () => {

    })

    describe('Schema Constructor', () => {
        it(`Test ${counter}: Types`, () => {
            const schema = new Schema();
            schema.add('jill', string);
            schema.add('arr', array);
            schema.add('bool', boolean);
            schema.add('number', number);
            schema.add('nulled', nulled);
            schema.add('str', string);
            schema.add('subobject', object);
            console.log('schema:', schema);
            const result = tv4.validate(o, schema)
            expect(result).to.be.true;
            


            

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
