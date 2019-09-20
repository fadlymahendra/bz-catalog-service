'use strict';

const Promise = require('bluebird');
const { BizzyError, DBContext } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Repo = require('../../../../src/repositories/product_group');
const RepoCategory = require('../../../../src/repositories/category');
const Method = require('../../../../src/methods/product-groups/list');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return the object of Product Group', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findAndCountAllWithJoin').resolves({
        rows: [
            {
                id: 1,
                name: 'Tissue Toilet Paseo',
                category_id: 444,
                brand_id: 1194,
                uom_id: 3,
                stocking_uom_id: 7,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN5061025',
                manufacturing_number_type: null,
                package_weight: 100,
                package_length: '20.00',
                package_width: '30.00',
                package_height: '20.00',
                package_content: 'Toilet paper and toilet paper holder.',
                barcode: '9780201379624',
                description: 'Bila kita selesai makan makanan yang berminyak dan sedang tidak berada di rumah, maka yang paling di cari adalah lembaran tisu yang dapat anda gunakan untuk membersihkan sisa kotoran pada tangan. Tisu juga dapat berperan untuk mengeringkan tangan atau banyak lagi manfaat dari tisu yang sejarang ini telah banyak di gunakan. salah satu produk tisu yang banyak di cari adalah tisu Paseo.',
                primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
                variant_count: 0,
                variant_matrix: '[]',
                status: 1,
                visibility: 1,
                created_by: 2,
                created_at: '2017-12-19T00:00:00.000Z',
                updated_at: '2017-12-19T00:00:00.000Z',
                Uom: {
                    id: 3,
                    name: 'Pack',
                    created_at: '2017-12-05T16:59:10.000Z',
                    updated_at: '2017-12-05T16:59:10.000Z'
                },
                StockingUom: {
                    id: 7,
                    name: 'Pack 50',
                    created_at: '2017-12-05T16:55:00.000Z',
                    updated_at: '2017-12-05T16:55:00.000Z'
                }
            }
        ],
        count: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 't',
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getProductGroup(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Tissue Toilet Paseo',
                    primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
                    manufacturing_number: 'MPN5061025',
                    uom: {
                        id: 3,
                        name: 'Pack'
                    },
                    stocking_uom: {
                        id: 7,
                        name: 'Pack 50'
                    },
                    quantity_stocking_uom: 1
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return the object of Product Group search by Category with non Category found', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(RepoCategory, 'getConcatIdCategory3').resolves([
        { ids: 'X' }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c0: 't',
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return the object of Product Group search by Category', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findAndCountAllWithJoin').resolves({
        rows: [
            {
                id: 1,
                name: 'Tissue Toilet Paseo',
                category_id: 444,
                brand_id: 1194,
                uom_id: 3,
                stocking_uom_id: 7,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN5061025',
                manufacturing_number_type: null,
                package_weight: 100,
                package_length: '20.00',
                package_width: '30.00',
                package_height: '20.00',
                package_content: 'Toilet paper and toilet paper holder.',
                barcode: '9780201379624',
                description: 'Bila kita selesai makan makanan yang berminyak dan sedang tidak berada di rumah, maka yang paling di cari adalah lembaran tisu yang dapat anda gunakan untuk membersihkan sisa kotoran pada tangan. Tisu juga dapat berperan untuk mengeringkan tangan atau banyak lagi manfaat dari tisu yang sejarang ini telah banyak di gunakan. salah satu produk tisu yang banyak di cari adalah tisu Paseo.',
                primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
                variant_count: 0,
                variant_matrix: '[]',
                status: 1,
                visibility: 1,
                created_by: 2,
                created_at: '2017-12-19T00:00:00.000Z',
                updated_at: '2017-12-19T00:00:00.000Z',
                Uom: {
                    id: 3,
                    name: 'Pack',
                    created_at: '2017-12-05T16:59:10.000Z',
                    updated_at: '2017-12-05T16:59:10.000Z'
                },
                StockingUom: {
                    id: 7,
                    name: 'Pack 50',
                    created_at: '2017-12-05T16:55:00.000Z',
                    updated_at: '2017-12-05T16:55:00.000Z'
                }
            }
        ],
        count: 1
    });

    t.context.sandbox.stub(RepoCategory, 'getConcatIdCategory3').resolves([
        { ids: '4' }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c0: 't',
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getProductGroup(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Tissue Toilet Paseo',
                    primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
                    manufacturing_number: 'MPN5061025',
                    uom: {
                        id: 3,
                        name: 'Pack'
                    },
                    stocking_uom: {
                        id: 7,
                        name: 'Pack 50'
                    },
                    quantity_stocking_uom: 1
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: '',
                page: 1,
                limit: 20
            }
        };
        const result = yield Method.getProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should catch the unvalid params', function* (t) {
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
                page: -1,
                limit: 20
            }
        };
        const result = yield Method.getProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
