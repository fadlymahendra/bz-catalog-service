'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Method = require('../../../../src/methods/products/list');

const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const CatalogRepository = require('../../../../src/repositories/category');

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
        yield Method.getProductEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should catch the invalid params', function* (t) {
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'kelinci',
                c0: '8',
                brand: '',
                sort: ''
            }
        };
        yield Method.getProductEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return product list vendor Ecart', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorEcart').resolves({
        count: 1,
        rows: [{
            id: 20,
            product_variant_id: 8,
            vendor_id: 3,
            warehouse_id: 11,
            location_label: 'Jakarta',
            stock_available: 111,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 111,
            tier_min_qty_2: 222,
            tier_min_qty_3: 333,
            tier_cogs_price_1: '444.00',
            tier_cogs_price_2: '555.00',
            tier_cogs_price_3: '666.00',
            warranty_option: 'official_warranty',
            warranty_period: 'year',
            warranty_limit: 111,
            warranty_coverage: 'xBox only',
            indent_period: 'year',
            indent_limit: 688,
            reference_link: '["http://google.com","http://facebook.com"]',
            sku_vendor: 'XXXXX',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-17T03:20:40.000Z',
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: '{"phone_color":2,"phone_storage":11}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    Category: {
                        id: 561,
                        name: 'Mobile phones',
                        level: 'C3',
                        parent_id: 219,
                        Category: {
                            id: 219,
                            name: 'Personal communication devices',
                            level: 'C2',
                            parent_id: 52,
                            Category: {
                                id: 52,
                                name: 'Communications Devices & Accessories',
                                level: 'C1',
                                parent_id: 8,
                                Category: {
                                    id: 8,
                                    name: 'IT and Mobile Devices',
                                    level: 'C0'
                                }
                            }
                        }
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(CatalogRepository, 'getFullCategory').resolves({
        count: [{ count: 3 }, { count: 1 }],
        rows: [{
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: '{"phone_color":2,"phone_storage":11}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    Category: {
                        id: 561,
                        name: 'Mobile phones',
                        level: 'C3',
                        parent_id: 219,
                        Category: {
                            id: 219,
                            name: 'Personal communication devices',
                            level: 'C2',
                            parent_id: 52,
                            Category: {
                                id: 52,
                                name: 'Communications Devices & Accessories',
                                level: 'C1',
                                parent_id: 8,
                                Category: {
                                    id: 8,
                                    name: 'IT and Mobile Devices',
                                    level: 'C0'
                                }
                            }
                        }
                    }
                }
            }
        }]
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone'
            }
        };

        const result = yield Method.getProductEcart(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    categories: undefined,
                    category_id: 561,
                    created_at: '2018-01-16T02:59:03.000Z',
                    currency: 'IDR',
                    description: undefined,
                    dimentions: {
                        package_height: undefined,
                        package_length: undefined,
                        package_weight: undefined,
                        package_width: undefined,
                        quantity_stocking_uom: undefined
                    },
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111
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


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
