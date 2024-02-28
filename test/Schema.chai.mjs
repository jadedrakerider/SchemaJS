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
    throwsError,
    nullCheck
} from './ChaiFunctions/chaiFunctions.mjs'
import {
    compileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty
} from './SchemaTests.mjs'
import { expect } from 'chai'
import Ajv from 'ajv'

describe('Schema mjs', () => {
    describe('SchemaType values are correct', () => {
        valueMatch(Schema.array.v(), {type: 'array'})
        valueMatch(Schema.boolean.v(), {type: 'boolean'})
        valueMatch(Schema.integer.v(), {type: 'integer'})
        valueMatch(Schema.object.v(), {type: 'object'})
        valueMatch(Schema.nulled.v(), {type: 'null'})
        valueMatch(Schema.string.v(), {type: 'string'})
        valueMatch(Schema.number.v(), {type: 'number'})
    })

    describe(`SchemaType is {type: 'object'} by default.`, () => {
        const schemaType = new SchemaType().v()

        SchemaTypeValue(schemaType, {type:'object'})
        SchemaTypeValue(Schema.object.v(), {type:'object'})
    })

    describe('Schema constructor', () => {
        const schema = new Schema()
        const keys = Object.keys(schema)
        const properties = ['type','name','required','properties','additionalProperties']

        for( let i = 0 ; i < keys.length ; i++){
            valueMatch(keys[i],properties[i])
        }
    })

    describe('Schema type properties are correct', () => {
        const arraySchema = ArraySchema
        const generic = new Schema()
        const array = Schema.array.v().type
        const object = Schema.object.v().type
        const boolean = Schema.boolean.v().type

        SchemaTypeProperty(arraySchema, array)
        SchemaTypeProperty(arraySchema, object, false)
        SchemaTypeProperty(generic, object)
        SchemaTypeProperty(generic, boolean, false)
    })
})

describe('AJV Verification', () => {
    describe('AJV Setup',() => {
        it(getCounter() + 'AJV boilerplate', () => {
            const boilerplate = () => {
                /**
                 * Put inside an anonymous function so that the scope is limited.
                 */
                const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

                // console.log('Schema.string =', Schema.string.v())

                const schema = {
                    type: 'object',
                    properties: {
                        foo: {type: 'integer'},
                        bar: {type: 'string'}
                    },
                    required: ['foo'],
                    additionalProperties: false
                }

                const vocabulary = new Set(['foo', 'bar'])

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
        it(getCounter() + 'AJV boilerplate is failable', () => {
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
                    bar: ['abc', 'def'] //'abc'
                }

                const valid = validate(data)
                expect(valid).to.be.false
                // if (!valid) {console.log(validate.errors)}
            }
            boilerplate()
        })
        count()

        it(getCounter() + `AJV with SchemaTypes`, () => {
            const failable = () => {
                const ajv = new Ajv()

                const schema = {
                    type: 'object',
                    properties: {
                        foo: {type: 'integer'},
                        bar: Schema.string.v()
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

        it(getCounter() + `AJV is failable with SchemaTypes`, () => {
            const failable = () => {
                const ajv = new Ajv()

                const schema = {
                    type: 'object',
                    properties: {
                        foo: {type: 'integer'},
                        bar: Schema.array.v()
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

        it(getCounter() + `AJV boilerplate with session data`, () => {
            const boilerplate = () => {
                const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

                const schema = {
                    type: 'object',
                    properties: {
                        user_id: Schema.number.v(),
                        access_token: Schema.string.v()
                    },
                    required: ['user_id', 'access_token'],
                    additionalProperties: false
                }

                // console.log('schema.properties.user_id', schema.properties.user_id)

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

        it(getCounter() + `AJV boilerplate with session data is failable`, () => {
            const boilerplate = () => {
                const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

                const schema = {
                    type: 'object',
                    properties: {
                        user_id: {type: 'array'},
                        access_token: {type: 'array'}
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
    })

    describe('AJV evaluates Schema class successfully',() => {
        it(getCounter() + `session data and boilerplate, and with Schema class`, () => {
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
                user_id: Schema.number.v(),
                access_token: Schema.string.v()
            }

            let target = new Schema(scheme) // Schema, the target

            const validate = ajv.compile(target.v())

            const valid = ajv.validate(subject)

            expect(valid).to.be.true
        })
        count()

        it(getCounter() + `addKeywords function works`, () => {
            const ajv = new Ajv()        

            const subject = { // Data, the subject
                taci: 0,
                turn: "adfa"
            }

            const scheme = {
                taci: Schema.number.v(), 
                turn: Schema.string.v()
            }

            const target = new Schema(scheme) // Schema, the target

            compileKeywords(ajv, target)
            
            const valid = ajv.validate(subject)

            expect(valid).to.be.true
        })
        count()

        it(getCounter() + 'Schema evaluation is failable', () => {
            const ajv = new Ajv()
            const subject = {
                jack: 'be quick',
                jill: [1]
            }
            const target = new Schema({jack: Schema.string.v(), jill: Schema.string.v()})
            let valid

            compileKeywords(ajv, target)

            valid = ajv.validate(subject)

            // console.log('ajv', ajv)

            expect(valid).to.be.false
        })
        count()
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