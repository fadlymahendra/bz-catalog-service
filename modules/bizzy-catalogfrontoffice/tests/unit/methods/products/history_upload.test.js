'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const ProductUploadRepo = require('../../../../src/repositories/product_upload_log');
const Methods = require('../../../../src/methods/products/history');

const validPayload = {
    path: {
        id: 3
    },
    query: {
        page: 1,
        limit: 20
    }
};

const validPayloadCase2 = {
    path: {
        id: 3
    },
    query: {
        page: 1,
        limit: 20,
        start_date: '2018-01-01',
        end_date: '2018-01-02',
        search: 'Arnold'
    }
};


const validPayloadCase3 = {
    path: {
        id: 3
    },
    query: {
        page: 1,
        limit: 20,
        start_date: '2018-01-01',
        end_date: '2018-01-01',
        search: 'Arnold'
    }
};

const invalidPayload = {
    path: {
        id: 3
    },
    query: {
        pages: 1,
        limit: 20
    }
};

const validContext = require('../../../mocks/context.json');

const resLog = [
    {
        _id: '550099',
        title: 'Bulk Tambah Produk',
        user: {
            id: 1,
            name: 'Arnold',
            email: 'arnold@mame.com',
            type: 'customer'
        },
        payload: {
            url: 'http://url.fileuploaded.com'
        },
        created_at: '2018-01-06T11:08:05.000Z',
        updated_at: '2018-01-06T11:08:05.000Z'
    },
    {
        _id: '550099',
        title: 'Bulk Tambah Produk',
        user: {
            id: 2,
            name: 'Arnold',
            email: 'arnold@mame.com',
            type: 'customer'
        },
        payload: {
            url: 'http://url.fileuploaded.com'
        },
        created_at: '2018-01-06T11:08:05.000Z',
        updated_at: '2018-01-06T11:08:05.000Z'
    }
];

test.serial('Successfull Get History Bulk Upload', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUploadHistory(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get History Bulk Upload with Start date', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUploadHistory(validPayloadCase3, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get History Bulk Upload with params', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUploadHistory(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Failed Get History Bulk Upload, Not Authorized', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUploadHistory(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get History Bulk Upload, Payload Not Valid', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUploadHistory(invalidPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Successfull Get History Bulk Update', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUpdateHistory(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get History Bulk Update with Start date', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUpdateHistory(validPayloadCase3, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get History Bulk Update with params', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUpdateHistory(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Failed Get History Bulk Update, Not Authorized', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUpdateHistory(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get History Bulk Update, Payload Not Valid', function* (t) {
    t.context.sandbox.stub(ProductUploadRepo, 'findAll').resolves(resLog);
    t.context.sandbox.stub(ProductUploadRepo, 'findAllWithoutPage').resolves(resLog);

    try {
        yield Methods.getProductUpdateHistory(invalidPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
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
