import { Schema } from '../Schema.mjs'
import { Assertion, expect } from 'chai'
import tv4 from 'tv4';

let counter = 1;
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
            console.log('schema:', schema, '\n',
                        'object:', Schema.object, '\n',
                        'array:', Schema.array);
            schema.add('arr', Schema.array);
            schema.add('bool', Schema.boolean);
            schema.add('integer', Schema.integer);
            schema.add('number', Schema.number);
            schema.add('nulled', Schema.nulled);
            schema.add('str', Schema.string);
            schema.add('subobject', Schema.array)
            
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
