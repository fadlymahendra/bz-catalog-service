'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const RepoPremoderation = require('../../../../src/repositories/premoderation');
const RepoBrand = require('../../../../src/repositories/brand');
const Method = require('../../../../src/methods/premoderations/brand_create');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should create new brand and update premoderation', function* (t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(true);
    t.context.sandbox.stub(RepoBrand, 'findOrCreate').resolves([
        {
            id: 1,
            name: 'Ferrari'
        },
        true
    ]);

    t.context.sandbox.stub(RepoPremoderation, 'updateBrand').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510'
            },
            body: {
                brand_id: 0,
                name: 'Ferrari',
                image_url: ''
            }
        };

        const result = yield Method.postPremoderationBrand(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'Ferrari'
            },
            message: 'Merek Berhasil Disimpan'
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should create new brand and update premoderation, Already Exist Brand', function* (t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(true);
    t.context.sandbox.stub(RepoBrand, 'findOrCreate').resolves([
        {
            id: 1,
            name: 'Ferrari'
        },
        false
    ]);

    t.context.sandbox.stub(RepoPremoderation, 'updateBrand').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510'
            },
            body: {
                brand_id: 0,
                name: 'Ferrari',
                image_url: ''
            }
        };

        yield Method.postPremoderationBrand(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should update premoderation with existing brand', function* (t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(true);
    t.context.sandbox.stub(RepoBrand, 'findOrCreate').resolves([
        {
            id: 22,
            name: 'Ferrari'
        },
        false
    ]);

    t.context.sandbox.stub(RepoPremoderation, 'updateBrand').resolves(true);

    t.context.sandbox.stub(RepoBrand, 'findById').resolves({
        id: 22,
        name: 'Ferrari'
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510'
            },
            body: {
                brand_id: 22,
                name: 'Ferrari',
                image_url: ''
            }
        };

        const result = yield Method.postPremoderationBrand(data, context);
        const expected = {
            data: {
                id: 22,
                name: 'Ferrari'
            },
            message: 'Merek Berhasil Disimpan'
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should update premoderation with nont existing brand', function* (t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(true);
    t.context.sandbox.stub(RepoBrand, 'findOrCreate').resolves([
        {
            id: 22,
            name: 'Ferrari'
        },
        false
    ]);

    t.context.sandbox.stub(RepoPremoderation, 'updateBrand').resolves(true);

    t.context.sandbox.stub(RepoBrand, 'findById').resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510'
            },
            body: {
                brand_id: 22,
                name: 'Ferrari',
                image_url: ''
            }
        };

        yield Method.postPremoderationBrand(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('Should return Not Found Premoderation not Found', function* (t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(false);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510090'
            },
            body: {
                brand_id: 0,
                name: 'Ferrari',
                image_url: ''
            }
        };

        yield Method.postPremoderationBrand(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Premoderation tidak ditemukan');
    }
});

test.serial('Should return BadRequest payload not valid', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1515058915510'
            },
            body: {
                name: 'Ferrari',
                image_url: ''
            }
        };

        yield Method.postPremoderationBrand(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '101'
            },
            body: {
            }
        };
        yield Method.postPremoderationBrand(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
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
