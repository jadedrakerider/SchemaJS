import { 
    SchemaType,
    Schema,
    ArraySchema
 } from '../Schema.mjs'
// chaiFunctions.mjs are my personal tests for use with all chai projects
 import {
    getCounter,
    count,
    valueMatch,
    have,
    is
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

            const vocabulary = new Set(['foo', 'bar'])

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
            /**
             * Put inside an anonymous function so that the scope is limited.
             */
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

            const vocabulary = new Set(['user_id', 'access_token'])

            console.log('schema:', schema)

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

    it(`${getCounter()} Schema is failable by AJV`, () => {
        const ajv = new Ajv()
        // const keywords = ['user_id', 'access_token']
        // keywords.forEach(keyword => {
        //     ajv.addKeyword(keyword);
        // });
        

        const session = { // Data, the subject
            user_id: 0,
            access_token: "adfa"
        }

        const scheme = {
            user_id: Schema.number, 
            access_token: Schema.string
        }

        const vocabulry = new Set(['user_id','access_token'])

        let schema = new Schema(scheme) // Schema, the target
        schema = schema.valueOf()

        const validate = ajv.compile(schema)

        const valid = ajv.validate(session)

        expect(valid).to.be.true



    })
    count()

    // it(`${getCounter()} Schema pattern works`, () => {
    //     const schemaPattern = () => {
    //         const schema = {
    //             type: 'object',
    //             properties: {
    //                 user_id: {type: 'number'},
    //                 access_token: {type: 'string'}
    //             },
    //             required: ['user_id', 'access_token'],
    //         }

    //         const validate = ajv.compile(schema)
    //         let valid

    //         const response = {
    //             user_id: 1,
    //             access_token: 'asdf'
    //         }

    //         valid = validate(response)
    //         if (!valid) console.log(validate.errors)

    //         expect(valid).to.be.true
    //     }
    //     schemaPattern()
    // })
    // count()
    
    // it(`${getCounter()} Schema class works with AJV`, () => {
    //     /**
    //      * @todo
    //      *      figure out why AJV is not looking for a field I added to required
    //      */
    //     const schemaClassWorksWithAjv = () => {
            
    //         const ajv = new Ajv()

    //         const sessionResponse = {
    //             access_token: 'aaa',
    //             user_id: 0
    //         }

    //         const sessionProfile = {
    //             access_token: Schema.string,
    //             user_id: Schema.number
    //         }

    //         const sessionSchema = new Schema(sessionProfile)

    //         sessionSchema.vocabulary().forEach(word => {
    //             vocabulary.add(word)
    //         })

    //         ajv.addVocabulary(vocabulary)

    //         validate = ajv.compile(sessionSchema.v())
    //         valid = ajv.validate(sessionResponse)
    //         if (!valid) console.log(validate.errors)

    //         expect(valid).to.be.true
    //     }
    //     schemaClassWorksWithAjv()
    // })
    // count()

    

})

function compileVocabulary(schema){
    const schemaVocab = new Set(schema.vocabulary())

    schemaVocab.forEach(term => {
        vocabulary.push(term)
    })
}

function SchemaTypeValue(SchemaType, obj, bool=true){
    let result = {
        key: Object.keys(obj)[0],
        value: Object.values(obj)[0]
    }

    it(`${getCounter()} Schematype ${is(bool)} {${result.key}: '${result.value}'}`, () => {
        bool
            ? expect(SchemaType).to.eql(obj)
            : expect(SchemaType).to.not.eql(obj)
    })
    count()
}

function SchemaTypeProperty(schema, type, bool=true){
    it(`${getCounter()} ${schema.name}Schema ${have(bool)} type: '${type}'`, () => {
        bool
            ? expect(schema.type).to.eql(type)
            : expect(schema.type).to.not.eql(type)
    })
    count()
}

/*
describe('SUMMARY', () => {
    describe('SUMMARY', () => {
        it(`Test ${getCounter()}: SUMMARY`, () => {

        count()
        })
    })
})

*/