'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const RawQueryRepository = require('../../../../src/repositories/raw_query');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const Methods = require('../../../../src/methods/product-groups/list');

test.serial('Should be return Product Group List with match id for total_sku', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(RawQueryRepository, 'findAndCountAllProductGroup').resolves({
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 5,
                stocking_uom_id: 12,
                quantity_stocking_uom: 3,
                manufacturing_number: 'MPN4060882',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '15.00',
                package_width: '5.00',
                package_height: '2.00',
                package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                barcode: '0075678164125',
                description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.\nPerforma: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.\nKompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 2,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2018-06-06T03:25:50.000Z'
            }
        ],
        ids: '3',
        count: [
            {
                visibility: 0,
                total: 9
            },
            {
                visibility: 1,
                total: 56
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'countTotalSku').resolves([
        {
            product_group_id: 3,
            total_sku: 3
        }
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'countAll').resolves([
        {
            _id: 3,
            total: 1
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                visibility: '',
                page: 1,
                limit: 1,
                sort: 'created_at_asc'
            }
        };

        const result = yield Methods.getProductGroup(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Epson Tinta Refill Botol',
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
                    total_sku: 3,
                    total_history: 1,
                    status: 1,
                    visibility: 1,
                    created_by: 2,
                    created_at: '2017-12-19T08:43:09.000Z',
                    updated_at: '2018-06-06T03:25:50.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 1,
                total_data: 65,
                total_page: 65,
                total_active_data: 56,
                total_inactive_data: 9
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Product Group List with not match id for total_sku', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(RawQueryRepository, 'findAndCountAllProductGroup').resolves({
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 5,
                stocking_uom_id: 12,
                quantity_stocking_uom: 3,
                manufacturing_number: 'MPN4060882',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '15.00',
                package_width: '5.00',
                package_height: '2.00',
                package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                barcode: '0075678164125',
                description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.\nPerforma: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.\nKompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 2,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2018-06-06T03:25:50.000Z'
            }
        ],
        ids: '3',
        count: [
            {
                visibility: 0,
                total: 9
            },
            {
                visibility: 1,
                total: 56
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'countTotalSku').resolves([
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'countAll').resolves([
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                visibility: '',
                page: 1,
                limit: 1,
                sort: 'created_at_asc'
            }
        };

        const result = yield Methods.getProductGroup(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Epson Tinta Refill Botol',
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
                    total_sku: 0,
                    total_history: 0,
                    status: 1,
                    visibility: 1,
                    created_by: 2,
                    created_at: '2017-12-19T08:43:09.000Z',
                    updated_at: '2018-06-06T03:25:50.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 1,
                total_data: 65,
                total_page: 65,
                total_active_data: 56,
                total_inactive_data: 9
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Empty Data: Should be return Product Group List Empty', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(RawQueryRepository, 'findAndCountAllProductGroup').resolves({
        rows: [
        ],
        ids: '',
        count: [
            {
                visibility: 0,
                total: 0
            },
            {
                visibility: 1,
                total: 0
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'countTotalSku').resolves([
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'countAll').resolves([
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'azz',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                visibility: '1',
                page: 1,
                limit: 10,
                sort: 'created_at_asc'
            }
        };

        const result = yield Methods.getProductGroup(data, context);
        const expected = {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total_data: 0,
                total_page: 0,
                total_active_data: 0,
                total_inactive_data: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Invalid input data: Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                visibility: '',
                page: -1,
                limit: 10,
                sort: 'created_at_asc'
            }
        };
        yield Methods.getProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {};
        context.user = '';
        const data = {
            query: {
                search: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                visibility: '',
                page: 1,
                limit: 10,
                sort: 'created_at_asc'
            }
        };
        yield Methods.getProductGroup(data, context);
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
