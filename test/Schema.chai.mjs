import { 
    SchemaType,
    Schema,
    ArraySchema
 } from '../Schema.mjs'
import {
    valueMatch,
    SchemaTypeProperty,
    SchemaTypeValue,
} from '../chaiFunctions/chaiFunctions.mjs'



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
}

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

describe('Schema mjs', () => {
    describe(`SchemaType is {type: 'object'} by default.`, () => {
        const schemaType = new SchemaType().v()

        SchemaTypeValue(schemaType, {type:'object'})
        SchemaTypeValue(Schema.object, {type:'object'})
    })

    describe(`Schema constructor`, () => {
        const schema = new Schema()
        const keys = Object.keys(schema)
        const properties = ['type','required','properties']

        for( let i = 0 ; i < keys.length ; i++){
            valueMatch(keys[i],properties[i])
        }
    })

    describe(`Schema type properties are correct`, () => {
        const arraySchema = ArraySchema
        const generic = new Schema()

        SchemaTypeProperty(arraySchema, Schema.array.type)
        SchemaTypeProperty(arraySchema, Schema.number.type, false)
        SchemaTypeProperty(generic, Schema.object.type)
        SchemaTypeProperty(arraySchema, Schema.boolean.type, false)
    })

})



/*
describe('SUMMARY', () => {
    describe('SUMMARY', () => {
        it(`Test ${counter}: SUMMARY`, () => {

        counter++
        })
    })
})

*/
