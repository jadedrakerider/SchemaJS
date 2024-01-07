import { Schema } from '../Schema.mjs'
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
        subnum: -3.14,
        nulled: null,
        str: 'another'
    }
};

const unit = {
    'id': Schema.number,
    'state': Schema.string,
    'zip': Schema.string,
    'group': Schema.object,
    'country': Schema.string,
    'group': Schema.object,
    'city': Schema.string,
    'timezone': Schema.string,
    'marketing_name': Schema.string,
    'street_address_1': Schema.string,
    'street_address_2': Schema.string,
    'unit_code': Schema.string,
    'hub': Schema.object,
    'hub_id': Schema.number,
    'group_id': Schema.number,
    'parking_enabled': Schema.boolean,
    'temperature_scale': Schema.string,
    'has_hub': Schema.boolean,
    'broadcast_messages_enabled': Schema.boolean,
    'service_requests_enabled': Schema.boolean,
    'ring_enabled': Schema.boolean,
    'security_system_enabled': Schema.boolean,
    'livly_enabled': Schema.boolean,
    'portal_only': Schema.boolean,
    'urgent_request_custom_copy': Schema.string,
    'urgent_request': Schema.boolean
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
            const schema = new Schema()
            expect(Schema.string.valueOf()).to.eql({STRING: {'type':'string'}})
            expect(Schema.array.valueOf()).to.not.eql({STRING: {'type':'string'}})
        })
        counter++;

        it(`Test ${counter}: SchemaType.toString()`, () => {
            expect(Schema.string.toString()).to.eql('{"type":"string"}')
            expect(Schema.string.toString()).to.not.eql('{"type":"array"}')
        })
        counter++;
    })

    describe('Schema Constructor', () => {
        const tokenz = new Schema()
        tokenz.add('token', Schema.string)
        tokenz.add('Jenny', Schema.number)

        schemaFail('Schema is failable', tokenz, {'damage': 1})

        const oSchema = new Schema()
        oSchema.add('arr', Schema.array)
        oSchema.add('bool', Schema.boolean)
        oSchema.add('number', Schema.number)
        oSchema.add('nulled', Schema.nulled)
        oSchema.add('str', Schema.string)
        oSchema.add('subobject', Schema.object)
        schemaTest('JS type recognition', oSchema, o)

        const unitSchema = new Schema()
        unitSchema.addProfile(unit)    
        schemaTest('Schema.addProfile()', unitSchema, unit)
    });
});

function schemaTest(description, schema, profile ){
    it(`Test ${counter}: ${description} is valid`, () => {
        const validate = ajv.compile(schema)
        const result = validate(profile)

        expect(result).to.be.true;
    })
    counter++;
}

function schemaFail(description, schema, profile ){
    it(`Test ${counter}: ${description} is valid`, () => {
        const validate = ajv.compile(schema)
        const result = validate(profile)

        expect(result).to.be.false;
    })
    counter++;
}



/*
describe('SUMMARY', () => {
    describe('SUMMARY', () => {
        it(`Test ${counter}: SUMMARY`, () => {

        counter++;
        })
    })
})

*/
