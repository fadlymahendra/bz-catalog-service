'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const UomRespository = require('../../../../src/repositories/uom');
const Methods = require('../../../../src/methods/uoms/list');

const restUom = [
    {
        id: 3,
        name: 'Pack'
    },
    {
        id: 6,
        name: 'Each'
    }
];

test.serial('Should be return list UOM With param search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(UomRespository).expects('findAll').resolves(restUom);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.getUom(data, context);

        const expected = {
            data:
            [
                {
                    id: 3,
                    name: 'Pack'
                },
                {
                    id: 6,
                    name: 'Each'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Should be return list UOM With param search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(UomRespository).expects('findAll').resolves(restUom);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getUom(data, context);

        const expected = {
            data:
            [
                {
                    id: 3,
                    name: 'Pack'
                },
                {
                    id: 6,
                    name: 'Each'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Should return error as payload is invalid', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(UomRespository).expects('findAll').resolves(restUom);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 10
            }
        };
        yield Methods.getUom(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
