'use strict';

const test = require('ava');
const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const sinon = require('sinon');

const CategoryRepo = require('../../../../src/repositories/category');
const ProductGroupRepo = require('../../../../src/repositories/product_group');
const CategoryLogRepo = require('../../../../src/repositories/category_log');
const Method = require('../../../../src/methods/categories/change_status');

const validPayload = {
    path: {
        id: '768'
    },
    body: {
        is_active: 1
    }
};

const validPayloadSecond = {
    path: {
        id: '768'
    },
    body: {
        is_active: 0
    }
};

const validPayloadCase2 = {
    path: {
        id: 'ss768'
    },
    body: {
        is_active: 0
    }
};

const invalidPayload = {
    path: {
        ids: '768'
    },
    body: {
        is_active: 0
    }
};
const invalidPayloadCase2 = {
    path: {
        id: '768a'
    },
    body: {
        is_active: 1
    }
};

const resFindById = {
    id: 10,
    level: 'C0',
    name: 'Child',
    childs: [
        {
            id: 1,
            name: 'Cooking'
        }
    ]
};

const validContext = require('../../../mocks/context.json');

const invalidContext = {};

test.serial('Successfull change status to active a category ', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    const findById = t.context.sandbox.stub(CategoryRepo, 'findById');
    findById.onCall(0).resolves(resFindById);
    findById.onCall(1).resolves({
        parent_id: null
    });
    t.context.sandbox.mock(CategoryRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(ProductGroupRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    const findAll = t.context.sandbox.stub(CategoryRepo, 'findAll');
    findAll.onCall(0).resolves([
        {
            id: 2
        },
        {
            id: 3
        }
    ]);
    findAll.onCall(1).resolves([]);

    yield Method.putCategoryStatus(validPayload, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull change status to inactive a category', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    const findById = t.context.sandbox.stub(CategoryRepo, 'findById');
    findById.onCall(0).resolves(resFindById);
    findById.onCall(1).resolves({
        parent_id: null
    });
    t.context.sandbox.mock(CategoryRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(ProductGroupRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    const findAll = t.context.sandbox.stub(CategoryRepo, 'findAll');
    findAll.onCall(0).resolves([
        {
            id: 2,
            level: 'C3'
        },
        {
            id: 3,
            level: 'C3'
        }
    ]);
    findAll.onCall(1).resolves([]);

    yield Method.putCategoryStatus(validPayloadSecond, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull change status with no child', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    const findById = t.context.sandbox.stub(CategoryRepo, 'findById');
    findById.onCall(0).resolves(resFindById);
    findById.onCall(1).resolves({
        parent_id: null
    });
    t.context.sandbox.mock(CategoryRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(ProductGroupRepo).expects('updateMany').resolves(true).atLeast(2);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);


    const findAll = t.context.sandbox.stub(CategoryRepo, 'findAll');
    findAll.onCall(0).resolves({});

    yield Method.putCategoryStatus(validPayloadSecond, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));


test.serial('Failed change status a category', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    const findById = t.context.sandbox.stub(CategoryRepo, 'findById');
    findById.onCall(0).resolves(resFindById);
    findById.onCall(1).resolves({
        parent_id: null
    });
    t.context.sandbox.mock(CategoryRepo).expects('updateMany').rejects();
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    // t.context.sandbox.mock(updateMethod).expects('updateCategoryCascade').resolves(true);

    yield Method.putCategoryStatus(validPayloadSecond, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed change status a category, Not Authorized', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves({
        id: 10,
        level: 'C0',
        name: 'Child',
        childs: [
            {
                id: 1,
                name: 'Cooking'
            }
        ]
    });
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(validPayload, invalidContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.serial('Failed change status a category, invalid Payload', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves({
        id: 10,
        level: 'C0',
        name: 'Child',
        childs: [
            {
                id: 1,
                name: 'Cooking'
            }
        ]
    });
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(invalidPayload, invalidContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.serial('Failed change status a category, Category Not Found', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(validPayload, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));


test.serial('Failed change status a category, Invalid Id', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(validPayloadCase2, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));


test.serial('Failed change status a category, Throw error database and rollback', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(resFindById);
    t.context.sandbox.mock(CategoryRepo).expects('update').rejects();
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(validPayload, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.serial('Failed change status a category, Category Not Found', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('update').rejects();
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(invalidPayload, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.serial('Failed change status a category, Throw error Badrequest payload', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('update').rejects();
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(invalidPayload, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.serial('Failed change status a category, Invalid Id (String)', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'findById').resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);

    yield Method.putCategoryStatus(invalidPayloadCase2, validContext)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass(err);
        });
}));

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
