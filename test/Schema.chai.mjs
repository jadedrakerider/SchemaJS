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
    describe('SchemaType', () => {
        it(`Test ${counter}: SchemaType constructor`, () => {    
            expect(string.keyValueOf()).to.eql({STRING: {'type':'string'}})
            expect(array.keyValueOf()).to.not.eql({STRING: {'type':'string'}})
        })

        it(`Test ${counter}: SchemaType.toString()`, () => {
            expect(string.toString()).to.eql('{"type":"string"}')
            counter++;
            })
    })

    describe('Schema Constructor', () => {
        it(`Test ${counter}: toString`, () => {
            const schema = new Schema();
            schema.add('token', string)
            schema.add('Jenny', number)
            console.log(schema.toString(),'\n','\n')
            console.log('Pretty', schema.toString(true))            
            counter++;
        })

        it(`Test ${counter}: Recognizes Types`, () => {
            const schema = new Schema();
            // schema.add('jill', string);
            schema.add('arr', array);
            schema.add('bool', boolean);
            schema.add('number', number);
            schema.add('nulled', nulled);
            schema.add('str', string);
            schema.add('subobject', object);
            const result = tv4.validate(o, schema)
            expect(result).to.be.true;
                        
            counter++;
        });
    });
});






/*
describe('SUMMARY', () => {
    it('Summary', () => {
        it(`Test ${counter}: SUMMARY`, () => {

        counter++;
        })
    })
})

*/
