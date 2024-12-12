import { 
    SchemaType,
    Schema,
    ArraySchema,
    InvalidInputError
} from '../Schema.mjs'
import {
 // cupper/Chai.mjs are my personal tests for use with all chai projects
    expectValuesToMatch,
    expectObjectsAreEqual,
    throwsError,
    nullCheck,
    getCounter
} from '../module/cuppr/Chai.mjs'
import {
    compileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty,
    schemaCorresponds
} from '../module/cuppr/extensions/SchemaJS.ext.mjs'
import { expect } from 'chai'
import Ajv from 'ajv'

describe('Schema mjs', () => {
    describe('SchemaType values are correct', () => {
        expectValuesToMatch(Schema.array.v().type, 'array')
        expectValuesToMatch(Schema.boolean.v().type, 'boolean')
        expectValuesToMatch(Schema.integer.v().type, 'integer')
        expectValuesToMatch(Schema.object.v().type, 'object')
        expectValuesToMatch(Schema.nulled.v().type, 'null')
        expectValuesToMatch(Schema.string.v().type, 'string')
        expectValuesToMatch(Schema.number.v().type, 'number')
    })

    describe(`SchemaType is {type: 'object'} by default.`, () => {
        const schemaType = new SchemaType()
        const schemaT = schemaType.v()

        SchemaTypeValue(schemaT, {type:'object'})
        SchemaTypeValue(Schema.object.v(), {type:'object'})
    })

    describe('Schema constructor', () => {
        const schema = new Schema()
        const keys = Object.keys(schema)
        const properties = ['type','required','properties','additionalProperties']

        for(let i = 0 ; i < keys.length; i++){
            expectValuesToMatch(keys[i],properties[i])
        }

        expectValuesToMatch(Schema.name, 'standard Schema')
    })

    describe('Schema type properties are correct', () => {
        const arraySchema = ArraySchema
        const genericSchema = new Schema()
        const array = Schema.array.valueOf()
        const object = Schema.object.valueOf()
        const boolean = Schema.boolean.valueOf()

        console.log('Schema.array.toString()', Schema.array.toString())
        SchemaTypeProperty(arraySchema, 'ArraySchema', array)
        SchemaTypeProperty(arraySchema, 'ArraySchema', object, false)
        SchemaTypeProperty(genericSchema, 'Schema', object)
        SchemaTypeProperty(genericSchema, 'Schema', boolean, false)
    })

    describe('Schema parsing with schemify() and parse()', () => {
        const bowie = {
            title: 'Ziggy Stardust',
            year: 1972,
            awesome: true
        }

        const subject = Schema.parse(bowie)

        const target = new Schema({
            title: Schema.string,
            year: Schema.number,
            awesome: Schema.boolean
        })

        expectObjectsAreEqual(subject, 'Bowie - Ziggy Stardust and the Spiders from Mars', target, 'Ziggy Schema')  
        
        console.log('parsed subject:', subject, '\ntarget:', target)
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

        it(getCounter() + 'AJV boilerplate is failable', () => {
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
                expect(valid).to.be.false
            }
            boilerplate()
        })
        
    })

    describe('AJV evaluates Schema class successfully',() => {
        it(getCounter() + `session data and boilerplate, and with Schema class`, () => {
            const ajv = new Ajv()
            const keywords = ['user_id', 'access_token', 'name']
            keywords.forEach(keyword => {
                ajv.addKeyword(keyword)
            })

            const subject = { // Data, the subject
                user_id: 0,
                access_token: "adfa"
            }

            const scheme = {
                user_id: Schema.number,
                access_token: Schema.string
            }

            let target = new Schema(scheme) // Schema, the target

            const validate = ajv.compile(target)

            const valid = ajv.validate(subject)

            expect(valid).to.be.true
        })
        

        it(getCounter() + `addKeywords function works`, () => {
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
        

    })

    describe('ChaiFunctions', () => {
        describe('schemaCorresponds', () => {
            const subject = {foo:'fighters', songs:['Best', 'Of', 'You']}
            const target = new Schema({foo: Schema.string, songs: Schema.array})

            schemaCorresponds(subject, 'Foo Fighters', target)
        })
    })

    describe('Schema mjs', () => {
        describe(`SchemaType is {type: 'object'} by default.`, () => {
            const schemaType = new SchemaType().v()

            SchemaTypeValue(schemaType, {type:'object'})
            SchemaTypeValue(Schema.object.v(), {type:'object'})
        })

        describe(`Schema constructor`, () => {
            const schema = new Schema()
            const keys = Object.keys(schema)
            const properties = ['type','required','properties','additionalProperties']

            for(let i = 0; i < keys.length; i++){
                expectValuesToMatch(keys[i],properties[i])
            }

            expectValuesToMatch(Schema.name, 'standard Schema')
        })

        describe(`Schema type properties are correct`, () => {
            const arraySchema = ArraySchema
            const generic = new Schema()

            SchemaTypeProperty(arraySchema, 'ArraySchema', Schema.array.valueOf())
            SchemaTypeProperty(arraySchema, 'ArraySchema', Schema.number.valueOf(), false)
            SchemaTypeProperty(generic, 'Schema', Schema.object.valueOf())
            SchemaTypeProperty(generic, 'Schema', Schema.boolean.valueOf(), false)
        })
    })
})
/*
describe('SUMMARY', () => {
    describe('SUMMARY', () => {
        it(`Test ${getCounter()}: SUMMARY`, () => {

        
        })
    })
})

*/