const test = require('ava');
const Promise = require('bluebird');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const sinon = require('sinon');

const CategoryRepo = require('../../../../src/repositories/category');
const RawRepo = require('../../../../src/repositories/raw_query');
const CategoryLogRepo = require('../../../../src/repositories/category_log');
const Method = require('../../../../src/methods/categories/update');
const CreateCategoryMethod = require('../../../../src/methods/categories/create');
const WebhookRepository = require('../../../../src/repositories/webhook');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductGroupRepo = require('../../../../src/repositories/product_group');
const validContext = require('../../../mocks/context.json');

const validPayload = {
    path: {
        id: '1'
    },
    body: {
        name: 'Unicorn'
    }
};

const validPayloadRetrigger = {
    path: {
        id: '1'
    },
    body: {
        productGroups: [{
            id: 1
        }],
        dataWebhook: {
            name: 'Unicorn'
        }
    }
};

const validPayloadUnspsc = {
    path: {
        id: '1'
    },
    body: {
        unspsc: '10120000'
    }
};

const validPayloadSecond = {
    path: {
        id: '1'
    },
    body: {
        name: 'Unicorn',
        unspsc: '11001200'
    }
};

const invalidPayload = {
    path: {
        ids: '1'
    },
    body: {
        names: 'Unicorn'
    }
};

const resFindProduct = [
    {
        id: 1
    }
];

const resGetCategoryC3 = [1, 2];

const invalidContext = {};

test.serial('Successfull update a category, C0 breadcrumb', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
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
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C0',
            name: 'Child',
            parent_id: 9
        });
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull update a category name and unspsc, C0 breadcrumb', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
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
    t.context.sandbox.mock(CreateCategoryMethod).expects('validateUnspsc').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C0',
            unspsc: '11000000',
            name: 'Child',
            parent_id: 9
        });
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC0Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    yield Method.putCategory(validPayloadSecond, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull update a category, C2 breadcrumb', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
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
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C2',
            name: 'Child Child',
            parent_id: 9
        })
        .onCall(1)
        .resolves({
            id: 9,
            level: 'C1',
            name: 'Child',
            parent_id: 8
        })
        .onCall(2)
        .resolves({
            id: 8,
            level: 'C0',
            name: 'Parent',
            parent_id: null
        })
        .onCall(3)
        .resolves({
            id: 10,
            level: 'C2',
            name: 'Child Child',
            parent_id: 9
        });
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull update a category, C2 with unspsc', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
            id: 10,
            level: 'C2',
            unspsc: '10120000',
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
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C2',
            name: 'Child Child',
            unspsc: '10120000',
            parent_id: 9
        })
        .onCall(1)
        .resolves({
            id: 9,
            level: 'C1',
            name: 'Child',
            parent_id: 8
        })
        .onCall(2)
        .resolves({
            id: 8,
            level: 'C0',
            name: 'Parent',
            parent_id: null
        })
        .onCall(3)
        .resolves({
            id: 10,
            level: 'C2',
            name: 'Child Child',
            parent_id: 9
        });
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(CreateCategoryMethod).expects('validateUnspsc').resolves(true);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    yield Method.putCategory(validPayloadUnspsc, validContext)
        .then((result) => {
            t.pass(result);
        })
        .catch((err) => {
            console.log(err);
            t.fail();
        });
}));

test.serial('Successfull update a category, C1 with unspsc', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
            id: 10,
            level: 'C2',
            unspsc: '10120000',
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
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C1',
            name: 'Child Child',
            unspsc: '10120000',
            parent_id: 9
        })
        .onCall(1)
        .resolves({
            id: 9,
            level: 'C1',
            name: 'Child',
            parent_id: 8
        })
        .onCall(2)
        .resolves({
            id: 8,
            level: 'C0',
            name: 'Parent',
            parent_id: null
        })
        .onCall(3)
        .resolves({
            id: 10,
            level: 'C2',
            name: 'Child Child',
            parent_id: 9
        });
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(CreateCategoryMethod).expects('validateUnspsc').resolves(true);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    yield Method.putCategory(validPayloadUnspsc, validContext)
        .then((result) => {
            t.pass(result);
        })
        .catch((err) => {
            console.log(err);
            t.fail();
        });
}));

test.serial('Failed update a category, unscps Not Valid', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
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
    t.context.sandbox.mock(CreateCategoryMethod).expects('validateUnspsc').resolves(false);
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C0',
            unspsc: '11000000',
            name: 'Child',
            parent_id: 9
        });
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);

    yield Method.putCategory(validPayloadSecond, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed update a category, Badrequest invalid payload', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    yield Method.putCategory(invalidPayload, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed update a category, Unauthorized', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    yield Method.putCategory(validPayload, invalidContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed update a category, Category Not Found', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed update a category, Category is already registered with sku', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(false);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([{
        id: 1
    }]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);
    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Failed update a category, Category Name Exists', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);
    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('retrigger success', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(ProductVariantRepository).expects('findByIdProductGroup').atLeast(1).resolves([{ id: 1 }]);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    yield Method.retriggerProductGroups(validPayloadRetrigger, validContext)
        .then((success) => {
            t.pass(success);
        })
        .catch((err) => {
            t.fail(err);
        });
}));

test.serial('Successfull update a category C3', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepo, 'findOne')
        .onCall(0).resolves(false)
        .onCall(1)
        .resolves({
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
    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C3',
            name: 'Child Child',
            parent_id: 9
        })
        .onCall(1)
        .resolves({
            id: 9,
            level: 'C2',
            name: 'Child',
            parent_id: 8
        })
        .onCall(2)
        .resolves({
            id: 8,
            level: 'C3',
            name: 'Parent',
            parent_id: null
        })
        .onCall(3)
        .resolves({
            id: 10,
            level: 'C3',
            name: 'Child Child',
            parent_id: 9
        });
    t.context.sandbox.stub(CategoryRepo, 'getCategoryC3').resolves([1]);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllPGFromC3').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC1Unspsc').resolves(true);
    t.context.sandbox.mock(RawRepo).expects('updateCategoryC2Unspsc').resolves(true);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.pass(result);
        })
        .catch((err) => {
            console.log(err);
            t.fail();
        });
}));

test.serial('Failed update a category, Category is already registered with sku', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findById').atLeast(2).resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('update').resolves(true);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertOne').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves(true);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductGroupRepo).expects('findAllSkuByCategory').resolves({
        length: 10
    });
    t.context.sandbox.mock(CategoryRepo).expects('getCategoryC3').resolves(resGetCategoryC3);
    yield Method.putCategory(validPayload, validContext)
        .then((result) => {
            t.fail(result);
        })
        .catch((err) => {
            t.pass();
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
