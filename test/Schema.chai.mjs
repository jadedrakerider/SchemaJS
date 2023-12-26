import { Schema,
         ArrayType,
         BooleanType,
         IntegerType,
         NulledType,
         NumberType,
         ObjectType,
         StringType } from '../Schema.mjs'
import { expect, assert } from 'chai'
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
            expect(Schema.string.keyValueOf()).to.eql({STRING: {'type':'string'}})
            expect(Schema.array.keyValueOf()).to.not.eql({STRING: {'type':'string'}})
        })
        counter++;

        it(`Test ${counter}: SchemaType.toString()`, () => {
            expect(Schema.string.toString()).to.eql('{"type":"string"}')
        })
        counter++;
    })

    describe('Schema Constructor', () => {
        it(`Test ${counter}: toString`, () => {
            const schema = new Schema()
            schema.add('token', Schema.string)
            schema.add('Jenny', Schema.number)
        })
        counter++;

        it(`Test ${counter}: Recognizes Types`, () => {
            const schema = new Schema();
            schema.add('arr', Schema.array);
            schema.add('bool', Schema.boolean);
            schema.add('number', Schema.number);
            schema.add('nulled', Schema.nulled);
            schema.add('str', Schema.string);
            schema.add('subobject', Schema.object);

            const validate = ajv.compile(schema);
            const result = validate(o);

            expect(result).to.be.true;
        })
        counter++;

        it(`Test ${counter}: Schema.addProfile(profile)`, () => {
            const unitSchema = new Schema()
            unitSchema.addProfile(unit)

            const validate = ajv.compile(unitSchema)
            const result = validate(unit);

            expect(result).to.be.true;
        })
        counter++;
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
