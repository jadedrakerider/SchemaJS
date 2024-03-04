import { 
    SchemaType,
    Schema,
    ArraySchema
 } from '../Schema.mjs'
// chaiFunctions.mjs are my personal tests for use with all chai projects
 import {
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
    nullCheck
} from './ChaiFunctions/Chai.mjs'
import { expect } from 'chai'
import Ajv from 'ajv'


function compileKeywords(ajv, schema){
    const schemaKeywords = new Set(schema.keywords())

    schemaKeywords.forEach(term => {
        ajv.addKeyword(term)
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
    it(getCounter() + schema.name + is(bool) + `type: '${type}'`, () => {
        bool
            ? expect(schema.type).to.eql(type)
            : expect(schema.type).to.not.eql(type)
    })
    count()
}

function schemaCorresponds(subject, target, bool=true){
    const description = getCounter() + `schema subject and target correspond`

    it(description, () => {
        const ajv = new Ajv()

        compileKeywords(subject)

        const validate = ajv.compile(target)

        const valid = ajv.validate(subject)

        bool
            ? expect(valid).to.be.true
            : expect(valid).to.be.false
    })
    count()
}

export {
    compileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty,
    schemaCorresponds
}