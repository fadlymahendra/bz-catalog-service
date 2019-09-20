'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const ProductRequestRepository = require('../../../../src/repositories/product_group');
const Methods = require('../../../../src/methods/premoderations/pg_search');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

const dataSource = function () {
    return {
        count: 3,
        rows: [{
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
            updated_at: null
        },
        {
            id: 2,
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            manufacturing_number_type: null,
            package_weight: 800,
            package_length: '100.00',
            package_width: '200.00',
            package_height: '300.00',
            package_content: 'lorem ipsum content',
            barcode: null,
            description: 'lorem ipsum description',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            variant_count: 2,
            variant_matrix: '["phone_color","phone_storage"]',
            status: 1,
            visibility: 1,
            created_by: 1,
            created_at: '2017-12-19T14:59:19.000Z',
            updated_at: '2017-12-19T14:59:22.000Z'
        },
        {
            id: 3,
            name: 'Epson Tinta Refill Botol',
            category_id: 507,
            brand_id: 466,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            manufacturing_number_type: null,
            package_weight: 400,
            package_length: '100.00',
            package_width: '200.00',
            package_height: '40.00',
            package_content: 'loremp ipsum content',
            barcode: null,
            description: 'lorem ipsum description',
            primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
            variant_count: 1,
            variant_matrix: '["ink_color"]',
            status: 1,
            visibility: 1,
            created_by: 1,
            created_at: '2017-12-19T08:43:09.000Z',
            updated_at: '2017-12-19T08:43:09.000Z'
        }
        ]
    };
};


test.serial('Should be return Product Group Object', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductRequestRepository, 'findAndCountAllProductGroup').resolves(dataSource());
    try {
        const context = require('../../../mocks/context.json');
        const data = { query: { search: '', page: 1, limit: 100 } };
        const expected = {
            data: [{
                id: 1,
                name: 'Tissue Toilet Paseo'
            },
            {
                id: 2,
                name: 'Apple iPhone 7'
            },
            {
                id: 3,
                name: 'Epson Tinta Refill Botol'
            }
            ],
            meta: {
                page: 1,
                limit: 100,
                total_data: 3,
                total_page: 1
            }
        };
        const result = yield Methods.getPremoderationProductGroup(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return Product Group Object with Param search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductRequestRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [{
            id: 2,
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            manufacturing_number_type: null,
            package_weight: 800,
            package_length: '100.00',
            package_width: '200.00',
            package_height: '300.00',
            package_content: 'lorem ipsum content',
            barcode: null,
            description: 'lorem ipsum description',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            variant_count: 2,
            variant_matrix: '["phone_color","phone_storage"]',
            status: 1,
            visibility: 1,
            created_by: 1,
            created_at: '2017-12-19T14:59:19.000Z',
            updated_at: '2017-12-19T14:59:22.000Z'
        }]
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = { query: { search: 'Apple', page: 1, limit: 100 } };
        const expected = {
            data: [{
                id: 2,
                name: 'Apple iPhone 7'
            }],
            meta: {
                page: 1,
                limit: 100,
                total_data: 1,
                total_page: 1
            }
        };
        const result = yield Methods.getPremoderationProductGroup(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should Not return Bad Request ', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductRequestRepository, 'findAndCountAllProductGroup').resolves(dataSource());
    try {
        const context = require('../../../mocks/context.json');
        const data = { query: { search: '', page: 'setring', limit: 'setring auh ah elap' } };
        const result = yield Methods.getPremoderationProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {
            user: ''
        };
        const data = { query: { search: 'Apple', page: 1, limit: 100 } };
        yield Methods.getPremoderationProductGroup(data, context);
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
