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
import Ajv from "ajv";

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

const unit = {
    'id': number,
    'state': string,
    'zip': string,
    'group': object,
    'country': string,
    'group': object,
    'city': string,
    'timezone': string,
    'marketing_name': string,
    'street_address_1': string,
    'street_address_2': string,
    'unit_code': string,
    'hub': object,
    'hub_id': number,
    'group_id': number,
    'parking_enabled': boolean,
    'temperature_scale': string,
    'has_hub': boolean,
    'broadcast_messages_enabled': boolean,
    'service_requests_enabled': boolean,
    'ring_enabled': boolean,
    'security_system_enabled': boolean,
    'livly_enabled': boolean,
    'portal_only': boolean,
    'urgent_request_custom_copy': string,
    'urgent_request': boolean
}

const ajv = new Ajv()
const vocabulary = [
    'index',
    'codex',
]
ajv.addVocabulary(vocabulary)
let counter = 1;

describe('Schema mjs', () => {
    describe('SchemaType', () => {
        it(`Test ${counter}: SchemaType constructor`, () => {    
            expect(string.keyValueOf()).to.eql({STRING: {'type':'string'}})
            expect(array.keyValueOf()).to.not.eql({STRING: {'type':'string'}})
            counter++;
        })

        it(`Test ${counter}: SchemaType.toString()`, () => {
            expect(string.toString()).to.eql('{"type":"string"}')
            counter++;
        })
    })

    describe('Schema Constructor', () => {
        it(`Test ${counter}: toString`, () => {
            const schema = new Schema()
            schema.add('token', string)
            schema.add('Jenny', number)        
            counter++;
        })

        it(`Test ${counter}: Recognizes Types`, () => {
            const schema = new Schema();
            schema.add('arr', array);
            schema.add('bool', boolean);
            schema.add('number', number);
            schema.add('nulled', nulled);
            schema.add('str', string);
            schema.add('subobject', object);

            const validate = ajv.compile(schema);
            const result = validate(o);

            expect(result).to.be.true;
            counter++;                        
        })

        it(`Test ${counter}: Schema.addProfile(profile)`, () => {
            const unitSchema = new Schema()
            unitSchema.addProfile(unit)

            const validate = ajv.compile(unitSchema)
            const result = validate(unit);

            expect(result).to.be.true;
            counter++;
        })
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
