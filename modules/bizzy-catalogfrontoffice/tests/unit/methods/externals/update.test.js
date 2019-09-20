'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');

const Method = require('../../../../src/methods/externals/update');
const ProductVendorRepo = require('../../../../src/repositories/product_vendor');
const ProductVariantRepo = require('../../../../src/repositories/product_variant');

const payloadPubUpdate = {
    id: 20,
    vendor_id: 2,
    stock_available: 10,
    stock_used: 0,
    stock_reserved: 0,
    currency: 'IDR',
    tier_min_qty_1: 1,
    tier_min_qty_2: 2,
    tier_min_qty_3: 3,
    tier_cogs_price_1: '50.00',
    tier_cogs_price_2: '49.00',
    tier_cogs_price_3: '9.00',
    indent_period: null,
    indent_limit: null,
    sku_vendor: 'XXXXX',
    is_indent: 1,
    is_active: 0,
    created_at: Date('2018-04-04T12:56:29.000Z'),
    updated_at: Date('2018-04-04T12:56:29.000Z'),
    ProductVariant: {
        id: 8,
        sku: 'DC8JLF43ND',
        long_name: 'RedMi A1 - Black - 32GB',
        variant_value: '{"phone_color":2,"phone_storage":3}',
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        updated_at: Date('2018-04-04T12:55:26.000Z'),
        created_at: Date('2018-04-04T12:55:26.000Z'),
        ProductGroup: {
            id: 2,
            name: 'Apple iPhone 7',
            variant_count: 0,
            variant_matrix: [],
            status: 1,
            visibility: 1,
            created_at: Date('2018-04-04T12:51:53.000Z'),
            updated_at: Date('2018-04-04T12:51:53.000Z'),
            Category: {
                id: 7019,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: 0.03,
                unspsc: 43211508,
                sequence: 1,
                parent_id: 793,
                is_active: 1,
                is_deleted: 0,
                created_at: Date('2018-03-29T14:19:48.000Z'),
                updated_at: Date('2018-03-29T14:19:48.000Z')
            }
        }
    }
};

const payloadPubUpdateCase2 = {
    id: 20,
    vendor_id: 170,
    stock_available: 10,
    stock_used: 0,
    stock_reserved: 0,
    currency: 'IDR',
    tier_min_qty_1: 1,
    tier_min_qty_2: null,
    tier_min_qty_3: null,
    tier_cogs_price_1: '50.00',
    tier_cogs_price_2: null,
    tier_cogs_price_3: null,
    indent_period: 1,
    indent_limit: 1,
    sku_vendor: null,
    is_indent: 1,
    is_active: 0,
    created_at: Date('2018-04-04T12:56:29.000Z'),
    updated_at: Date('2018-04-04T12:56:29.000Z'),
    ProductVariant: {
        id: 8,
        sku: 'DC8JLF43ND',
        long_name: 'RedMi A1 - Black - 32GB',
        variant_value: '{"phone_color":2,"phone_storage":3}',
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        updated_at: Date('2018-04-04T12:55:26.000Z'),
        created_at: Date('2018-04-04T12:55:26.000Z'),
        ProductGroup: {
            id: 2,
            name: 'Apple iPhone 7',
            variant_count: 0,
            variant_matrix: [],
            status: 1,
            visibility: 1,
            created_at: Date('2018-04-04T12:51:53.000Z'),
            updated_at: Date('2018-04-04T12:51:53.000Z'),
            Category: {
                id: 7019,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: 0.03,
                unspsc: 43211508,
                sequence: 1,
                parent_id: 793,
                is_active: 1,
                is_deleted: 0,
                created_at: Date('2018-03-29T14:19:48.000Z'),
                updated_at: Date('2018-03-29T14:19:48.000Z')
            }
        }
    }
};

const context = {
    user: {
        client_id: 'VGMAIL001',
        email: 'vendor@gmail.com',
        iat: 1536742094,
        organization_id: 170
    }
};

sinon.sandbox.create().stub(process, 'env').value({
    BCI_ID: 170
});

test.serial('Full reject error, Missing parameter id', function* (t) {
    try {
        const data = {
            path: {},
            body: {
                products: [{ id: 1 }]
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Full reject error, Missing parameter products', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: []
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Full reject error, Not Authorized User', function* (t) {
    try {
        const data = {
            path: { id: 2 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 10,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden);
    }
});

test.serial('Full reject error, Missing parameter on Wholesales', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 10,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Full reject error, Missing one attribute (stock) on products', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 1,
                                min: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'MISSING_PARAMETER');
    }
});

test.serial('Full reject error, Strict on product stock', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: 1,
                        stock: '5000',
                        wholesales: [
                            {
                                tier: 1,
                                min: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'INVALID_REQUEST_FORMAT');
    }
});

test.serial('Full reject error, Strict on product status', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: '1',
                        stock: 1000,
                        wholesales: [
                            {
                                tier: 1,
                                min: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'INVALID_REQUEST_FORMAT');
    }
});

test.serial('Full reject error, Strict integer not received float on product_status/ stock/ tier/ min/ unit_price ', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: 1,
                        stock: 1000.01,
                        wholesales: [
                            {
                                tier: 1,
                                min: 1,
                                unit_price: 3140000
                            },
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            },
                            {
                                tier: 3,
                                min: 100,
                                unit_price: 2700000
                            }
                        ]
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'INVALID_REQUEST_FORMAT');
    }
});

test.serial('Full reject error, Invalid payload', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: { id: 1 }
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Full reject error, Exceeds limit', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: []
            }
        };

        for (let i = 1; i < 1500; i += 1) {
            data.body.products.push({ id: i });
        }

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.UnprocessableEntity, err.message);
    }
});

test.serial('Update catalog success even stock is null', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: null,
                        product_status: 1,
                        price_product: 120002,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 3010000
                            }
                        ]
                    }
                ]
            }
        };


        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 15,
            tier_min_qty_3: 100,
            tier_cogs_price_1: '3140000.00',
            tier_cogs_price_2: '3010000.00',
            tier_cogs_price_3: '2700000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        yield Method.apiUpdateCatalog(data, context);
        t.pass();
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Update catalog success even there are unknown attribute on payload', function* (t) {
    try {
        const data = {
            path: { id: 150 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 0,
                        product_status: 1,
                        price_product: 120002,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 150 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 150 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 150,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdateCase2);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 14,
            tier_min_qty_3: 100,
            tier_cogs_price_1: '3140000.00',
            tier_cogs_price_2: '3010000.00',
            tier_cogs_price_3: '2700000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        const localContext = {
            user: {
                client_id: 'VGMAIL001',
                email: 'vendor@gmail.com',
                iat: 1536742094,
                organization_id: 150
            }
        };

        yield Method.apiUpdateCatalog(data, localContext);
        t.pass();
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Update catalog success even stock is 0, normal flow', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 0,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 10,
                                unit_price: 5000
                            }
                        ]
                    }
                ]
            }
        };
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 5,
            tier_min_qty_3: null,
            tier_cogs_price_1: '200000.00',
            tier_cogs_price_2: '100000.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        yield Method.apiUpdateCatalog(data, context);
        t.pass();
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial Reject : SKU_NOT_FOUND', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 0,
                        product_status: 1,
                        price_product: 120002,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };


        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves();
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 14,
            tier_min_qty_3: 100,
            tier_cogs_price_1: '3140000.00',
            tier_cogs_price_2: '3010000.00',
            tier_cogs_price_3: '2700000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'SKU_NOT_FOUND';
        t.is(result.products[0].message, expected);
    } catch (err) {
        console.log(err);
        t.fail(err.message);
    }
});

test.serial('Full reject error, Invalid format with wrong wholesales type', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: {},
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: 'not array'
                    }
                ]
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Full reject error, Missing stock and wholesales', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: 1
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'MISSING_PARAMETER');
    }
});

test.serial('Full reject error, Missing wholesales', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 100
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'MISSING_PARAMETER');
    }
});

test.serial('Full reject error, Missing parameter', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        stock: 777,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };
        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'MISSING_PARAMETER');
    }
});

test.serial('Partial reject error, Invalid stock', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: -777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 1,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_STOCK';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Full reject error, Invalid format with wrong min type data', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 'a',
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        yield Method.apiUpdateCatalog(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'INVALID_REQUEST_FORMAT');
    }
});

test.serial('Partial reject error, Invalid tier with negative value', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: -2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_TIER';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid min quantity with same value on different tier', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 2000
                            },
                            {
                                tier: 3,
                                min: 15,
                                unit_price: 8000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_MIN_QTY';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid tier Case 1 (Previous Tier not Exist on DB)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: 'WZNOB5UZZO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: '24838D4F97',
                        product_status: 1,
                        stock: 777,
                        wholesales: [
                            {
                                tier: 2,
                                min: 5,
                                unit_price: 2010000
                            },
                            {
                                tier: 3,
                                min: 10,
                                unit_price: 2000000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: null,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '0.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_TIER';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid tier Case 2 (Previous Tier not Exist on DB)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: 'WZNOB5UZZO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: '24838D4F97',
                        product_status: 1,
                        stock: 777,
                        wholesales: [
                            {
                                tier: 3,
                                min: 10,
                                unit_price: 3010000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '10000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = {
            vendor_id: 170,
            products: [
                {
                    product_sku: 'WZNOB5UZZO',
                    vendor_sku: 'XA44SFKFKV',
                    manufacturing_no: '24838D4F97',
                    product_status: 1,
                    stock: 777,
                    wholesales: [
                        {
                            tier: 1,
                            min: 10,
                            unit_price: 10000
                        },
                        {
                            tier: 3,
                            min: 10,
                            unit_price: 3010000
                        }
                    ],
                    status: 'NOT_OK',
                    message: 'INVALID_TIER'
                }
            ]
        };
        t.deepEqual(result.products[0].wholesales, expected.products[0].wholesales);
        t.is(result.products[0].message, expected.products[0].message);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid price if next price >= previous price', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: 'WZNOB5UZZO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: '24838D4F97',
                        product_status: 1,
                        stock: 777,
                        wholesales: [
                            {
                                tier: 2,
                                min: 5,
                                unit_price: 2010000
                            },
                            {
                                tier: 3,
                                min: 10,
                                unit_price: 3000000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: null,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '0.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_PRICE';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid min quantity with negative value', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: -15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_MIN_QTY';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid tier with negative value. (item.status != undefined)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        product_status: 1,
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: -777,
                        wholesales: [
                            {
                                tier: -2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_STOCK';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid min quantity with same value on different tier', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: -10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_PRICE';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, product_sku,vendor_sku, manufactur_no is null or empty', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: null,
                        vendor_sku: '',
                        manufacturing_no: '',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'EMPTY_SKU';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Empty product data if stock, product_status is null and wholesales is empty array ', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: 'E16JTQF7YX',
                        vendor_sku: 'SKUOPENAPI1',
                        manufacturing_no: 'MPN7PK1781',
                        stock: null,
                        product_status: null,
                        wholesales: []
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'EMPTY_PRODUCT_DATA';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, Invalid unit price value. (item.status = undefined)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        product_status: 1,
                        stock: 777,
                        wholesales: [
                            {
                                tier: 2,
                                min: -15,
                                unit_price: -10000
                            }
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves({
            id: 1,
            getProductVendors: Promise.coroutine(function* () {
                return [{ id: 1 }];
            })
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 1 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'INVALID_MIN_QTY';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error, SKU NOT FOUND', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '',
                        vendor_sku: '123',
                        manufacturing_no: '',
                        stock: 777,
                        product_status: 1,
                        wholesales: [
                        ]
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([]);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves();

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'SKU_NOT_FOUND';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error. (item.status = TEST)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '',
                        vendor_sku: '',
                        manufacturing_no: '',
                        product_status: null,
                        stock: -777,
                        wholesales: [
                            {
                                tier: 3,
                                min: -100,
                                unit_price: 7500
                            }
                        ],
                        status: 'TEST',
                        message: 'TEST'
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdateCase2);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'TEST';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Partial reject error. (item.status = UNDEFINED)', function* (t) {
    try {
        const data = {
            path: { id: 170 },
            body: {
                products: [
                    {
                        product_sku: '',
                        vendor_sku: '',
                        manufacturing_no: '',
                        product_status: null,
                        stock: null,
                        wholesales: [
                        ],
                        status: 'UNDEFINED',
                        message: 'UNDEFINED'
                    }
                ]
            }
        };

        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 170 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: 15,
            tier_min_qty_3: 20,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '20000.00',
            tier_cogs_price_3: '3000000.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdateCase2);
        t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        const result = yield Method.apiUpdateCatalog(data, context);
        const expected = 'UNDEFINED';
        t.is(result.products[0].message, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return Bad Request when request to catalog-pubsub: publishUpdateProduct', function* (t) {
    try {
        const data = {
            path: { id: 150 },
            body: {
                products: [
                    {
                        product_sku: '93VN03AVNO',
                        vendor_sku: 'XA44SFKFKV',
                        manufacturing_no: 'D9DG82WS7K',
                        stock: 0,
                        product_status: 1,
                        wholesales: [
                            {
                                tier: 2,
                                min: 15,
                                unit_price: 10000
                            }
                        ]
                    }
                ]
            }
        };


        t.context.sandbox.stub(ProductVendorRepo, 'findAllByParam').resolves([{ id: 2 }]);
        t.context.sandbox.stub(ProductVariantRepo, 'findOneProductVariant').resolves([{ id: 2, vendor_id: 150 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findAllByManufactureNo').resolves([{ id: 2, vendor_id: 150 }]);
        t.context.sandbox.stub(ProductVendorRepo, 'findById').resolves({
            id: 2,
            product_variant_id: 1,
            vendor_id: 170,
            warehouse_id: 97,
            location_label: 'Jakarta',
            stock_available: 10000,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 10,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '15000.00',
            tier_cogs_price_2: '0.00',
            tier_cogs_price_3: '0.00',
            warranty_option: 'distributor',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: '24838D4F97',
            is_indent: 0,
            is_active: 1,
            created_by: 97,
            is_contract: 1,
            customer_id: 0
        });
        t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetailById').resolves(payloadPubUpdateCase2);
        t.context.sandbox.stub(BizzyService, 'callAsync').rejects();
        t.context.sandbox.stub(ProductVendorRepo, 'updateById').resolves({
            id: 20,
            product_variant_id: 9,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 8000,
            stock_used: 496,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 14,
            tier_min_qty_3: 100,
            tier_cogs_price_1: '3140000.00',
            tier_cogs_price_2: '3010000.00',
            tier_cogs_price_3: '2700000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'XA44SFKFKV',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            customer_id: null,
            created_at: '2018-02-23T11:32:27.000Z',
            updated_at: '2018-11-25T13:52:02.000Z',
            ProductVariant: {
                id: 9,
                product_group_id: 6,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB',
                variant_value: {
                    phone_color: 2,
                    phone_storage: 3
                },
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385260.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/02/product_1519385264.jpg'
                ],
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_by: null,
                created_at: '2018-02-23T11:28:27.000Z',
                updated_at: '2018-02-23T11:28:27.000Z'
            }
        });

        const localContext = {
            user: {
                client_id: 'VGMAIL001',
                email: 'vendor@gmail.com',
                iat: 1536742094,
                organization_id: 150
            }
        };

        yield Method.apiUpdateCatalog(data, localContext);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
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
