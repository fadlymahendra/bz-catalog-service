'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/public/category');

const context = require('../../../mocks/context.json');

const resfindOneWithParent = {
    getValues: () => (
        {
            id: 22,
            parent_id: 1,
            level: 'C1',
            name: 's',
            unspsc: 111,
            childs: [
                {
                    id: 1,
                    name: 'z',
                    level: 'C0',
                    unspsc: 111
                }
            ]
        }
    )
};

const resfindOneWithParentC0 = {
    getValues: () => (
        {
            id: 22,
            parent_id: null,
            level: 'C0',
            name: 's',
            unspsc: 111,
            childs: []
        }
    )
};

const resfindAll = [
    {
        id: 23,
        name: 'b',
        level: 'C2',
        unspsc: 111
    }
];

test.serial('Should return category detail with parent and sibling', function* (t) {
    // t.context.sandbox.stub(CategoryRepository, 'findOneWithParent').resolves(resfindOneWithParent);
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves(resfindAll);
    const findParent = t.context.sandbox.stub(CategoryRepository, 'findOne');
    findParent.onCall(0).resolves(resfindOneWithParent);
    findParent.onCall(1).resolves({
        id: 23,
        name: 'b',
        level: 'C0',
        parent_id: null,
        unspsc: 111
    });
    const payload = {
        path: {
            id: '1'
        }
    };

    try {
        yield Methods.getCategoryDetail(payload, context);
        t.pass();
    } catch (err) {
        t.fail('Should return category detail with parent and sibling');
    }
});

test.serial('Should return category detail with parent and sibling C0', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resfindOneWithParentC0);
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves(resfindAll);

    const payload = {
        path: {
            id: '1'
        }
    };

    try {
        yield Methods.getCategoryDetail(payload, context);
        t.pass();
    } catch (err) {
        t.fail(`Should return category detail with parent and sibling C0 \n${  err.stack}`);
    }
});

test.serial('Should return category detail Not Found', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    const payload = {
        path: {
            id: '1'
        }
    };

    try {
        yield Methods.getCategoryDetail(payload, context);
        t.fail('Should return category detail Not Found');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound);
        t.pass();
    }
});

test.serial('Should return category detail BadRequest, invalid payload', function* (t) {
    const payload = {
        path: {
            ids: '1'
        }
    };

    try {
        yield Methods.getCategoryDetail(payload, context);
        t.fail('Should return category detail BadRequest, invalid payload');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
        t.pass();
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
