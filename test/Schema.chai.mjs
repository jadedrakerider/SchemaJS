import { 
    SchemaType,
    Schema,
    ArraySchema
 } from '../Schema.mjs'
// chaiFunctions.mjs are my personal tests for use with all chai projects
 import {
    threwError,
    did,
    does,
    have,
    is,
    matches,
    getCounter,
    count,
    valueMatch,
    objectsMatch,
    throwsError,
    nullCheck,
    compileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty,
    schemaCorresponds
} from './ChaiFunctions/chaiFunctions.mjs'
import { expect } from 'chai'
import Ajv from 'ajv'

describe('AJV setup', () => {
    it(`${getCounter()} AJV boilerplate`, () => {
        const boilerplate = () => {
            /**
             * Put inside an anonymous function so that the scope is limited.
             */
            const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

            const schema = {
                type: 'object',
                properties: {
                    foo: {type: 'integer'},
                    bar: {type: 'string'}
                },
                required: ['foo'],
                additionalProperties: false
            }

            const validate = ajv.compile(schema)

            const data = {
                foo: 1,
                bar: 'abc'
            }

            const valid = validate(data)
            expect(valid).to.be.true
            if (!valid) {console.log(validate.errors)}
        }
        boilerplate()
    })
    count()

    it(`${getCounter()} AJV is failable`, () => {
        const failable = () => {
            /**
             * Put inside an anonymous function so that the scope is limited.
             */
            const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

            const schema = {
                type: 'object',
                properties: {
                    foo: {type: 'integer'},
                    bar: {type: 'string'}
                },
                required: ['foo', 'turbo'],
                additionalProperties: false
            }

            const validate = ajv.compile(schema)

            const data = {
                foo: 1,
                bar: 'abc'
            }

            const valid = validate(data)
            expect(valid).to.be.false
        }

        failable()

        
    })
    count()

    it(`${getCounter()} AJV boilerplate with session data`, () => {
        const boilerplate = () => {
            const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

            const schema = {
                type: 'object',
                properties: {
                    user_id: {type: 'number'},
                    access_token: {type: 'string'}
                },
                required: ['user_id', 'access_token'],
                additionalProperties: false
            }

            const validate = ajv.compile(schema)

            const data = {
                user_id: 1,
                access_token: 'abc'
            }

            const valid = validate(data)
            expect(valid).to.be.true
            if (!valid) {console.log(validate.errors)}
        }
        boilerplate()
    })
    count()

    it(`${getCounter()} session data and boilerplate, and with Schema class`, () => {
        const ajv = new Ajv()
        const keywords = ['user_id', 'access_token']
        keywords.forEach(keyword => {
            ajv.addKeyword(keyword);
        });
        

        const subject = { // Data, the subject
            user_id: 0,
            access_token: "adfa"
        }

        const scheme = {
            user_id: Schema.number, 
            access_token: Schema.string
        }

        let target = new Schema(scheme) // Schema, the target

        const validate = ajv.compile(target.v())

        const valid = ajv.validate(subject)

        expect(valid).to.be.true
    })
    count()

    it(`${getCounter()} addKeywords function works`, () => {
        const ajv = new Ajv()        

        const subject = { // Data, the subject
            taci: 0,
            turn: "adfa"
        }

        const scheme = {
            taci: Schema.number, 
            turn: Schema.string
        }

        const target = new Schema(scheme) // Schema, the target

        compileKeywords(ajv, target)
        
        const valid = ajv.validate(subject)

        expect(valid).to.be.true
    })
    count()

})

describe('ChaiFunctions', () => {
    describe('schemaCorresponds', () => {
        const subject = {foo:'fighters', songs:['Best', 'Of', 'You']}
        const target = new Schema({foo: Schema.string, songs: Schema.array})

        schemaCorresponds(subject, target)
    })
})

describe('Schema mjs', () => {
    describe(`SchemaType is {type: 'object'} by default.`, () => {
        const schemaType = new SchemaType().v()

        SchemaTypeValue(schemaType, {type:'object'})
        SchemaTypeValue(Schema.object, {type:'object'})
    })

    describe(`Schema constructor`, () => {
        const schema = new Schema()
        const keys = Object.keys(schema)
        const properties = ['type','required','properties','additionalProperties']

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
        SchemaTypeProperty(generic, Schema.boolean.type, false)
    })
})

/*
describe('SUMMARY', () => {
    describe('SUMMARY', () => {
        it(`Test ${getCounter()}: SUMMARY`, () => {

        count()
        })
    })
})

*/