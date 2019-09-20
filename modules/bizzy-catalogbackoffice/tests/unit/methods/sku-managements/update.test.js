'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');

const RepoGeneral = require('../../../../src/repositories/general');
const Repo = require('../../../../src/repositories/product_variant');
const ProductGroupRepo = require('../../../../src/repositories/product_group');
const Method = require('../../../../src/methods/sku-managements/update');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return an updated Sku', Promise.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();
    
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: {
            id: 3,
            ProductGroupAttributes: []
        }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg']
            }
        };
        const result = yield Method.putSkuManagement(data, context);
        const expected = {
            data: {
                id: 3,
                sku: '567',
                product_group_id: 3,
                long_name: 'Epson Tinta Refill Botol',
                vendors: [
                    {
                        vendor_id: 1
                    }
                ],
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg'],
                variants: [
                    {
                        label: 'Color',
                        value: 'Magenta'
                    }
                ],
                is_discontinue: 1,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));

test.serial('Should be return an updated Sku with the is_primary = 1', Promise.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();
    
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        is_primary: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        is_primary: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: {
            id: 3,
            ProductGroupAttributes: []
        }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg']
            }
        };
        const result = yield Method.putSkuManagement(data, context);
        const expected = {
            data: {
                id: 3,
                sku: '567',
                product_group_id: 3,
                long_name: 'Epson Tinta Refill Botol',
                vendors: [
                    {
                        vendor_id: 1
                    }
                ],
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg'],
                variants: [
                    {
                        label: 'Color',
                        value: 'Magenta'
                    }
                ],
                is_discontinue: 1,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));

test.serial('Should be return an updated Sku, Rollback', Promise.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();
    
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        is_primary: 1
    });

    t.context.sandbox.stub(Repo, 'update').rejects();
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        is_primary: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: {
            id: 3,
            ProductGroupAttributes: []
        }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg']
            }
        };
        const result = yield Method.putSkuManagement(data, context);
        const expected = {
            data: {
                id: 3,
                sku: '567',
                product_group_id: 3,
                long_name: 'Epson Tinta Refill Botol',
                vendors: [
                    {
                        vendor_id: 1
                    }
                ],
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg'],
                variants: [
                    {
                        label: 'Color',
                        value: 'Magenta'
                    }
                ],
                is_discontinue: 1,
                is_active: 1
            }
        };
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.pass();
    }
}));

test.serial('Should be return an updated Sku NO_VARIANT', Promise.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();
    
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: 'NO_VARIANT',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: 'NO_VARIANT',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: {
            id: 3,
            ProductGroupAttributes: []
        }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                primary_image: 'image4.jpg',
                additional_image: []
            }
        };
        const result = yield Method.putSkuManagement(data, context);
        const expected = {
            data: {
                id: 3,
                sku: '567',
                product_group_id: 3,
                long_name: 'Epson Tinta Refill Botol',
                vendors: [
                    {
                        vendor_id: 1
                    }
                ],
                primary_image: 'image4.jpg',
                additional_image: ['image3.jpg'],
                variants: [],
                is_discontinue: 1,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));


test.serial('Should be return Sku Not Found', Promise.coroutine(function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();
    
    t.context.sandbox.stub(Repo, 'findOne').resolves(false);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                primary_image: 'image4.jpg',
                additional_image: [
                    'image3.jpg',
                    'image1.jpg'
                ]
            }
        };
        yield Method.putSkuManagement(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Sku Not found');
    }
}));

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            body: {
                name: 'Dozen',
                additional_image: ['image3.jpg', 'image1.jpg']
            }
        };
        yield Method.putSkuManagement(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '1'
            }
        };
        yield Method.putSkuManagement(data, context);
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
