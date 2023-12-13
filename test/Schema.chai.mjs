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
            schema.add('id', 'meh');
            schema.add('arr', array);
            schema.add('bool', boolean);
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
