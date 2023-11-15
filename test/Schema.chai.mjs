import { Schema, array, boolean, integer, number, nulled, object, string } from '../Schema.mjs'
import { Assertion, expect } from 'chai'

let counter = 1;

describe('Schema', () => {
    it('Schema Constructor', () => {
        it(`Test ${counter}: Types`, () => {
            const o = {
                arr: ['str1', 'str2'],
                bool: true,
                integer: 5,
                number: 1.0,
                nulled: null,
                str: 'string',
            }

            const schema = new Schema();
            schema.add('arr', array);
            schema.add('bool', boolean);
            schema.add('integer', integer);
            schema.add('number', number);
            schema.add('nulled', nulled);
            schema.add('str', string)
            

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
