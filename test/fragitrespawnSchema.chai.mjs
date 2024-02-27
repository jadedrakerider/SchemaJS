// import { 
//     SchemaType,
//     Schema,
//     ArraySchema
//  } from '../Schema.mjs'
// // chaiFunctions.mjs are my personal tests for use with all chai projects
//  import {
//     getCounter,
//     count,
//     valueMatch,
//     have,
//     is
// } from './ChaiFunctions/chaiFunctions.mjs'
// import { expect } from 'chai'
// import Ajv from "ajv"

// let ajv = new Ajv()
// let vocabulary = new Set([])
// let validate
// let valid

// const o = {
//     arr: ['str1', 'str2'],
//     bool: true,
//     number: 1.0,
//     nulled: null,
//     str: 'string',
//     subobject: {
//         subarr: [],
//         subbool: false,
//         subint: -2,
//         subnum: -3.14,
//         nulled: null,
//         str: 'another'
//     }
// }

// const unit = {
//     'id': Schema.number,
//     'state': Schema.string,
//     'zip': Schema.string,
//     'group': Schema.object,
//     'country': Schema.string,
//     'group': Schema.object,
//     'city': Schema.string,
//     'timezone': Schema.string,
//     'marketing_name': Schema.string,
//     'street_address_1': Schema.string,
//     'street_address_2': Schema.string,
//     'unit_code': Schema.string,
//     'hub': Schema.object,
//     'hub_id': Schema.number,
//     'group_id': Schema.number,
//     'parking_enabled': Schema.boolean,
//     'temperature_scale': Schema.string,
//     'has_hub': Schema.boolean,
//     'broadcast_messages_enabled': Schema.boolean,
//     'service_requests_enabled': Schema.boolean,
//     'ring_enabled': Schema.boolean,
//     'security_system_enabled': Schema.boolean,
//     'livly_enabled': Schema.boolean,
//     'portal_only': Schema.boolean,
//     'urgent_request_custom_copy': Schema.string,
//     'urgent_request': Schema.boolean
// }

// describe('AJV setup', () => {


//     describe(`AJV is setup correctly`, () => {


//         
// })

// // describe('Schema mjs', () => {
// //     describe(`SchemaType is {type: 'object'} by default.`, () => {
// //         const schemaType = new SchemaType().v()

// //         SchemaTypeValue(schemaType, {type:'object'})
// //         SchemaTypeValue(Schema.object, {type:'object'})
// //     })

// //     describe(`Schema constructor`, () => {
// //         const schema = new Schema()
// //         const keys = Object.keys(schema)
// //         const properties = ['type', 'name','required','properties']

// //         for( let i = 0 ; i < keys.length ; i++){
// //             valueMatch(keys[i],properties[i])
// //         }
// //     })

// //     describe(`Schema type properties are correct`, () => {
// //         const arraySchema = ArraySchema
// //         const generic = new Schema()

// //         SchemaTypeProperty(arraySchema, Schema.array.type)
// //         SchemaTypeProperty(arraySchema, Schema.number.type, false)
// //         SchemaTypeProperty(generic, Schema.object.type)
// //         SchemaTypeProperty(generic, Schema.boolean.type, false)
// //     })

// // })

// // function compileVocabulary(schema){
// //     const schemaVocab = new Set(schema.vocabulary())

// //     schemaVocab.forEach(term => {
// //         vocabulary.push(term)
// //     })
// // }

// function SchemaTypeValue(SchemaType, obj, bool=true){
//     let result = {
//         key: Object.keys(obj)[0],
//         value: Object.values(obj)[0]
//     }

//     it(`${getCounter()} Schematype ${is(bool)} {${result.key}: '${result.value}'}`, () => {
//         bool
//             ? expect(SchemaType).to.eql(obj)
//             : expect(SchemaType).to.not.eql(obj)
//     })
//     count()
// }

// function SchemaTypeProperty(schema, type, bool=true){
//     it(`${getCounter()} ${schema.name}Schema ${have(bool)} type: '${type}'`, () => {
//         bool
//             ? expect(schema.type).to.eql(type)
//             : expect(schema.type).to.not.eql(type)
//     })
//     count()
// }

// /*
// describe('SUMMARY', () => {
//     describe('SUMMARY', () => {
//         it(`Test ${getCounter()}: SUMMARY`, () => {

//         count()
//         })
//     })
// })

// */
