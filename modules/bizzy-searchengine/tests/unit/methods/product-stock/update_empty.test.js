const test = require('ava');
const Bluebird = require('bluebird');
const { BizzyService, BizzyError, DBContext } = require('bizzy-common');
const sinon = require('sinon');
const Method = require('../../../../src/methods/product-stock/update');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductLogRepository = require('../../../../src/repositories/product_log');

const validPayload = {
    body: {
        payload: [
            {
                sku: 'WBQH1BWFAN',
                vendor_id: 4,
                warehouse_id: 4
            }
        ]
    }
};

const validPayloadSkuNumber = {
    body: {
        payload: [
            {
                sku: '1',
                vendor_id: 4,
                warehouse_id: 4
            }
        ]
    }
};

const invalidPayload = {
    body: {
        payloads: [
            {
                skus: 'WBQH1BWFAN',
                vendor_id: 4,
                warehouse_id: 4
            }
        ]
    }
};

const validContext = {
    user: {
        username: 'customer@purchase.com',
        first_name: 'Customer',
        last_name: 'Purchase',
        scope: 'organization',
        customer: {
            organization_name: 'PT Customer Purchase Tbk',
            organization_id: 5,
            person_id: 8,
            superadmin: 8,
            roles: [
                {
                    role_id: 1,
                    name: 'Super Admin'
                },
                {
                    role_id: 10,
                    name: 'Requestor'
                }
            ],
            is_vendor: 0,
            channel_type: 'MP',
            has_agreement: 0
        },
        addons: [],
        groups: [
            {
                id: 2,
                default: true,
                name: 'Kantor Pusat',
                requestor: true
            }
        ],
        iat: 1521618702,
        exp: 1521625902
    }
};

const resProductVariantFindOne = {
    id: 1
};

const resProductVendorFindOne = {
    product_variant_id: 1,
    ProductVariant: {
        id: 1,
        product_group_id: 3
    }
};

const resProductVendorFindOneZero = {
    product_variant_id: 1,
    stock_available: 0,
    ProductVariant: {
        id: 1,
        product_group_id: 3
    }
};

test.serial('success update product to empty', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductVariantRepository).expects('findOne').resolves(resProductVariantFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findWithVariant').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findOne').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('update').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.mock(ProductLogRepository).expects('insertOne').resolves(true);

    yield Method.putProductStockEmpty(validPayload, validContext)
        .then((res) => {
            t.pass();
        })
        .catch((err) => {
            console.log(err);
            t.fail('shouldnt throw error');
        });
}));

test.serial('success update product to empty', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductVariantRepository).expects('findOne').resolves(resProductVariantFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findWithVariant').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findOne').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('update').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.mock(ProductLogRepository).expects('insertOne').resolves(true);

    yield Method.putProductStockEmpty(validPayloadSkuNumber, validContext)
        .then((res) => {
            t.pass();
        })
        .catch((err) => {
            console.log('[err]', err);
            t.fail('shouldnt throw error');
        });
}));

test.serial('failed, product not found', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductVariantRepository).expects('findOne').resolves(false);
    t.context.sandbox.mock(ProductVendorRepository).expects('findOne').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findWithVariant').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('update').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    yield Method.putProductStockEmpty(validPayload, validContext)
        .then((res) => {
            t.fail('should throw error');
        })
        .catch((err) => {
            t.pass();
        });
}));


test.serial('failed, product vendor not found', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductVariantRepository).expects('findOne').resolves(resProductVariantFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findOne').resolves(false);
    t.context.sandbox.mock(ProductVendorRepository).expects('findWithVariant').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('update').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    yield Method.putProductStockEmpty(validPayload, validContext)
        .then((res) => {
            t.fail('should throw error');
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('failed, invalid payload', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    // t.context.sandbox.mock(Repo).expects('').resolves(res);

    yield Method.putProductStockEmpty(invalidPayload, validContext)
        .then((res) => {
            t.fail('should throw error');
        })
        .catch((err) => {
            t.pass();
        });
}));


test.serial('failed update product to empty, already empty', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(ProductVariantRepository).expects('findOne').resolves(resProductVariantFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findWithVariant').resolves(resProductVendorFindOne);
    t.context.sandbox.mock(ProductVendorRepository).expects('findOne').resolves(resProductVendorFindOneZero);
    t.context.sandbox.mock(ProductVendorRepository).expects('update').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.mock(ProductLogRepository).expects('insertOne').resolves(true);

    yield Method.putProductStockEmpty(validPayloadSkuNumber, validContext)
        .then((res) => {
            t.fail('should throw error');
        })
        .catch((err) => {
            t.pass();
        });
}));

test.serial('Forbiden Access', Bluebird.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    // t.context.sandbox.mock(Repo).expects('').resolves(res);

    yield Method.putProductStockEmpty(validPayload, {})
        .then((res) => {
            t.fail('should throw error');
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
