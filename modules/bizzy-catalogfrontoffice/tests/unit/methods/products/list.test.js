/* eslint-disable linebreak-style */

'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');

const Method = require('../../../../src/methods/products/list');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

const resCountAll = [
    {
        total: 0,
        is_active: 0,
        total_stock_empty: 1
    },
    {
        total: 1,
        is_active: 1,
        total_stock_empty: 1
    }
];

const resProductVendorWithoutCategoryAndBrand = {
    count: 1,
    rows: [
        {
            id: 408,
            product_variant_id: 339,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Gudang Merdeka',
            stock_available: '30.00',
            stock_used: '0.00',
            stock_reserved: '0.00',
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '26700.00',
            tier_cogs_price_2: null,
            tier_cogs_price_3: null,
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: 'GL6253',
            is_indent: 1,
            is_active: 1,
            is_decimal: 1,
            down_payment_type: 1,
            down_payment_value: 1000000,
            created_by: 3,
            is_private_sku: 0,
            is_contract: 0,
            customer_id: null,
            created_at: '2019-01-22T07:46:36.000Z',
            updated_at: '2019-01-22T07:46:36.000Z',
            ProductVariant: {
                id: 339,
                long_name: 'GL 6253 PAGAR TAMAN ASTER ( SET OF 3 PCS )',
                sku: 'LVB5JUEUJL',
                product_group_id: 286,
                variant_value: 'NO_VARIANT',
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                ProductGroup: {
                    id: 286,
                    name: 'GL 6253 PAGAR TAMAN ASTER ( SET OF 3 PCS )',
                    category_id: 754,
                    brand_id: 599,
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }
    ]
};

test.serial('Should be return product list vendor #1', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves(resProductVendorWithoutCategoryAndBrand);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
        count: [{ count: 3 }, { count: 1 }],
        rows: [{
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'LVB5JUEUJL',
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 408,
                    long_name: 'GL 6253 PAGAR TAMAN ASTER ( SET OF 3 PCS )',
                    product_group_id: 286,
                    product_group_name: 'GL 6253 PAGAR TAMAN ASTER ( SET OF 3 PCS )',
                    variant_value: 'NO_VARIANT',
                    primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                    currency: 'IDR',
                    tier_cogs_price_1: '26700.00',
                    tier_cogs_price_2: null,
                    tier_cogs_price_3: null,
                    tier_min_qty_1: 1,
                    tier_min_qty_2: null,
                    tier_min_qty_3: null,
                    is_active: 1,
                    sku: 'LVB5JUEUJL',
                    sku_vendor: 'GL6253',
                    stock_available: '30.00',
                    is_private_sku: 0,
                    private_customers: 0,
                    is_indent: 1,
                    is_decimal: 1,
                    down_payment_type: 1,
                    down_payment_value: 1000000,
                    uom_name: 'Unit',
                    created_at: '2019-01-22T07:46:36.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor NOVARIANT', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: 'NO_VARIANT',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
        count: [{ count: 3 }, { count: 1 }],
        rows: [{
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: 'NO_VARIANT',
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
        count: [{ count: 3 }, { count: 1 }],
        rows: [{
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: 'NO_VARIANT',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: 'NO_VARIANT',
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #2', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #3', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #4', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #5', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #6', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 1,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor #7', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 0,
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
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    },
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit',
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 0,
                    private_customers: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
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
                search: 'iphone',
                c0: '8',
                brand: 1,
                is_active: 0,
                stock: 1,
                sort: 'tier_cogs_price_1_asc',
                limit: -1
            }
        };
        const result = yield Method.getProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
        const result = yield Method.getProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

// List Vendor
const resProduct = {
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
};

test.serial('Should be return product list vendor (get product by vendor id)', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(resProduct);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            }
        };

        const result = yield Method.getProductByVendorId(data, context);
        t.pass();
    } catch (err) {
        t.fail(err);
        console.log(err.message);
    }
});


test.serial('Should be Not Authorized product list vendor (get product by vendor id)', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(resProduct);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            }
        };

        const result = yield Method.getProductByVendorId(data, {});
        t.fail();
    } catch (err) {
        t.pass(err);
    }
});

test.serial('Should be return product stock success', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const getStock = t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail');
    getStock.onCall(0).resolves({
        id: 1,
        stock_available: 8
    });
    getStock.onCall(1).resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                product: [
                    {
                        sku: 'X152KT2GKF',
                        vendor_id: 3
                    },
                    {
                        sku: 'X152KT2GKF',
                        vendor_id: 4
                    }
                ]
            }
        };

        const result = yield Method.getProductStock(data, context);
        t.pass();
    } catch (err) {
        t.fail(err);
        console.log(err.message);
    }
});

test.serial('Should be return product stock, Payload Not Valid', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves({
        id: 1,
        stock_available: 8
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                product: [
                    {
                        skus: 'X152KT2GKF',
                        vendor_id: 3
                    }
                ]
            }
        };

        const result = yield Method.getProductStock(data, context);
        console.log('Should return error');
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Should be return BadRequest list vendor (get product by vendor id)', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(resProduct);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                iss: 1
            }
        };

        const result = yield Method.getProductByVendorId(data, context);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Should be return product list vendor private sku and auto live', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: false,
            customer_id: 2,
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: true,
                    private_customers: 1,
                    is_decimal: undefined,
                    is_indent: 1,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return product list vendor private sku', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithoutCategoryAndBrand').resolves({
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
            is_private_sku: 1,
            PrivateSkus: [{ id: 1 }, { id: 2 }, { id: 3 }],
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
                    },
                    uom_id: 1,
                    Uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorCategory').resolves({
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

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorBrand').resolves({
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
                    Brand: { id: 81, name: 'Apple' }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVendorRepository, 'getCountProductVendor').resolves({
        count: 1, rows: []
    });

    t.context.sandbox.stub(ProductVendorRepository, 'countAll').resolves(resCountAll);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                search: 'iphone',
                c0: 8,
                brand: 1,
                is_active: 0,
                stock: 0,
                sort: 'tier_cogs_price_1_asc'
            }
        };

        const result = yield Method.getProduct(data, context);
        const expected = {
            data: [
                {
                    id: 20,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    product_group_id: 2,
                    product_group_name: 'Apple iPhone 7',
                    variant_value: {
                        phone_color: 2,
                        phone_storage: 11
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: 'XXXXX',
                    stock_available: 111,
                    created_at: '2018-01-16T02:59:03.000Z',
                    is_private_sku: 1,
                    private_customers: 3,
                    is_decimal: undefined,
                    is_indent: 1,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    uom_name: 'Unit'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_active: 1,
                total_inactive: 0,
                total_empty_stock: 1,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
