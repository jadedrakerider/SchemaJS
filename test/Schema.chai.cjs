const { Schema,
        ArrayType,
        BooleanType,
        IntegerType,
        NulledType,
        NumberType,
        ObjectType,
        StringType } = require('../Schema.cjs')
const { expect, 
        assert } = require('chai')
const Ajv = require('ajv');

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
    'id': new NumberType(),
    'state': new StringType(),
    'zip': new StringType(),
    'group': new ObjectType(),
    'country': new StringType(),
    'group': new ObjectType(),
    'city': new StringType(),
    'timezone': new StringType(),
    'marketing_name': new StringType(),
    'street_address_1': new StringType(),
    'street_address_2': new StringType(),
    'unit_code': new StringType(),
    'hub': new ObjectType(),
    'hub_id': new NumberType(),
    'group_id': new NumberType(),
    'parking_enabled': new BooleanType(),
    'temperature_scale': new StringType(),
    'has_hub': new BooleanType(),
    'broadcast_messages_enabled': new BooleanType(),
    'service_requests_enabled': new BooleanType(),
    'ring_enabled': new BooleanType(),
    'security_system_enabled': new BooleanType(),
    'livly_enabled': new BooleanType(),
    'portal_only': new BooleanType(),
    'urgent_request_custom_copy': new StringType(),
    'urgent_request': new BooleanType()
}

const ajv = new Ajv()
const vocabulary = [
    'index',
    'codex',
]
ajv.addVocabulary(vocabulary)
let counter = 1;

describe('Schema cjs', () => {
    describe('SchemaType', () => {
        it(`Test ${counter}: SchemaType constructor`, () => {
            const schema = new Schema()
            expect(new StringType().keyValueOf()).to.eql({STRING: {'type':'string'}})
            expect(Schema.array.keyValueOf()).to.not.eql({STRING: {'type':'string'}})
        })
        counter++;

        it(`Test ${counter}: SchemaType.toString()`, () => {
            expect(new StringType().toString()).to.eql('{"type":"string"}')
        })
        counter++;
    })

    describe('Schema Constructor', () => {
        it(`Test ${counter}: toString`, () => {
            const schema = new Schema()
            schema.add('token', new StringType())
            schema.add('Jenny', new NumberType())
        })
        counter++;

        it(`Test ${counter}: Recognizes Types`, () => {
            const schema = new Schema();
            schema.add('arr', Schema.array);
            schema.add('bool', new BooleanType());
            schema.add('number', new NumberType());
            schema.add('nulled', Schema.nulled);
            schema.add('str', new StringType());
            schema.add('subobject', new ObjectType());

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
