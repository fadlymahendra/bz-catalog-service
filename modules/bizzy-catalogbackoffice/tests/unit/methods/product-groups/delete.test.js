'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/product-groups/delete');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return empty', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'Tissue Toilet Paseo',
        category_id: 444,
        brand_id: 1194,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 100,
        package_length: '20.00',
        package_width: '30.00',
        package_height: '20.00',
        package_content: 'Lorem ipsum',
        barcode: 'YYYYY',
        description: 'loremp ipsum dolorosum',
        primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
        variant_count: 0,
        variant_matrix: '[]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T00:00:00.000Z',
        updated_at: '2018-01-02T11:12:01.000Z',
        Brand: {
            id: 1194,
            name: 'Paseo',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: []
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findByIdProductGroup').resolves([]);
    t.context.sandbox.stub(ProductGroupRepository, 'delete').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Methods.deleteProductGroup(data, context);
        const expected = '';
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Product can not be deleted: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'Tissue Toilet Paseo',
        category_id: 444,
        brand_id: 1194,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 100,
        package_length: '20.00',
        package_width: '30.00',
        package_height: '20.00',
        package_content: 'Lorem ipsum',
        barcode: 'YYYYY',
        description: 'loremp ipsum dolorosum',
        primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
        variant_count: 0,
        variant_matrix: '[]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T00:00:00.000Z',
        updated_at: '2018-01-02T11:12:01.000Z',
        Brand: {
            id: 1194,
            name: 'Paseo',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: []
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findByIdProductGroup').resolves([{
        id: 4,
        product_group_id: 2,
        sku: '347',
        long_name: 'Sample Product Group Name',
        variant_value: '{"phone_color":null,"phone_storage":null}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg","image2.jpg","image1.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2017-12-29T12:51:31.000Z'
    }]);
    t.context.sandbox.stub(ProductGroupRepository, 'delete').resolves([1]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        yield Methods.deleteProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Product not Exist: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves(null);
    t.context.sandbox.stub(ProductVariantRepository, 'findByIdProductGroup').resolves([{
        id: 4,
        product_group_id: 2,
        sku: '347',
        long_name: 'Sample Product Group Name',
        variant_value: '{"phone_color":null,"phone_storage":null}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg","image2.jpg","image1.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2017-12-29T12:51:31.000Z'
    }]);

    t.context.sandbox.stub(ProductGroupRepository, 'delete').resolves([1]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        yield Methods.deleteProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product not found');
    }
});

test.serial('Invalid input data: Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };
        yield Methods.deleteProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Problem Database Occur: Should be return InternalServerError', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'Tissue Toilet Paseo',
        category_id: 444,
        brand_id: 1194,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 100,
        package_length: '20.00',
        package_width: '30.00',
        package_height: '20.00',
        package_content: 'Lorem ipsum',
        barcode: 'YYYYY',
        description: 'loremp ipsum dolorosum',
        primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
        variant_count: 0,
        variant_matrix: '[]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T00:00:00.000Z',
        updated_at: '2018-01-02T11:12:01.000Z',
        Brand: {
            id: 1194,
            name: 'Paseo',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: []
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findByIdProductGroup').resolves([]);
    t.context.sandbox.stub(ProductGroupRepository, 'delete').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };
        yield Methods.deleteProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.UnprocessableEntity, 'Problem Database Occur');
    }
});

test.serial('Invalid context: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: ''
            }
        };
        yield Methods.deleteProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
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
