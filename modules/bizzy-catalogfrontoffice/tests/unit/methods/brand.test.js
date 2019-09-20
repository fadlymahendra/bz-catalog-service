'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');
const BrandRepository = require('../../../src/repositories/brand');
const Methods = require('../../../src/methods/brand');

test.serial('Should be return brand list', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1,
                name: '2 Tang'
            }
        ],
        count: 1
    });

    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                search: 'a',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getBrand(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: '2 Tang'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return brand list without search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1,
                name: '2 Tang'
            }
        ],
        count: 1
    });

    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getBrand(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: '2 Tang'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return all', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 2,
                name: '2Macan',
                image_url: null,
                is_active: 1,
                description: null,
                created_at: '2017-11-28T14:54:10.000Z',
                updated_at: '2017-11-28T14:54:10.000Z'
            },
            {
                id: 3,
                name: '3A Scale',
                image_url: null,
                is_active: 1,
                description: null,
                created_at: '2017-11-28T14:54:10.000Z',
                updated_at: '2017-11-28T14:54:10.000Z'
            }
        ],
        count: 2
    });

    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };

        const result = yield Methods.getAllBrand(data, context);
        const expected = {
            data: [
                {
                    id: 'BR-2',
                    name: '2Macan'
                },
                {
                    id: 'BR-3',
                    name: '3A Scale'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 2,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return 1 brand only', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 2,
                name: '2Macan',
                image_url: null,
                is_active: 1,
                description: null,
                created_at: '2017-11-28T14:54:10.000Z',
                updated_at: '2017-11-28T14:54:10.000Z'
            }
        ],
        count: 1
    });

    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                search: '2Macan'
            }
        };

        const result = yield Methods.getAllBrand(data, context);
        const expected = {
            data: [
                {
                    id: 'BR-2',
                    name: '2Macan'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request all brand', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                search: 1
            }
        };

        yield Methods.getAllBrand(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../mocks/context.json');
        const data = {
            query: {
                search: 'a',
                page: '',
                limit: 20
            }
        };

        yield Methods.getBrand(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
