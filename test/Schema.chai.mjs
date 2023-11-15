import Schema from '../Schema.mjs'
import { Assertion, expect } from 'chai'

let counter = 1;

describe('Schema', () => {
    it('Schema Constructor', () => {
        it(`Test ${counter}: Types`, () => {
            expect.Schema.object.to.eql('object');

        })
    })
})






/*
describe('', () => {
    it('', () => {
        it(``, () => {

        })
    })
})

*/
