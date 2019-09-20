'use strict';

const Promise = require('bizzy-common');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const _ = require('lodash');
const RawQueryRepository = require('../../../../src/repositories/raw_query');
const SyncServiceRepository = require('../../../../src/repositories/sync_service');
const ReindexLogRepository = require('../../../../src/repositories/reindex_log');
const Methods = require('../../../../src/methods/algolia/reindex');
const context = require('../../../mocks/context.json');
const publisher = require('../../../../src/utils/publisher');

let datas = {
    body: {
        type: 'product_group',
        id: '9831',
        data:
        {
            product_group_id: '9831', id: '04ffb434-5466-43fe-b3f7-8733439be6ee', variants: []
        }
    }
};

const expected = {
    message: 'SUCCESS_UPSERT_ALGOLIA'
};

sinon.sandbox.create().stub(process, 'env').value({
    ALGOLIA_APP_ID: 'IU85FU0XXT',
    ALGOLIA_API_KEY: '0879688dadcea91b3448f52fa1c9d888',
    ALGOLIA_INDICES: 'dev_catalog'
});


test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        },
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success with another data', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        },
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: null,
            warehouse_information: null,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success: Organization not found', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        },
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').rejects();
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success: warehouse data empty', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        },
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 1439,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success: type product_group & NO_VARIANT', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_group',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: 'NO_VARIANT',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success: NO_VARIANT false', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_group',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: false,
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success with reject warehouse', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').rejects();
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});


test.serial('Should be return success with is active 0', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 57,
            sku: 'AQE209D0AU',
            long_name: 'Apple iPhone 7 - Hijau - 5TB',
            product_group_id: 2,
            product_group_name: 'Apple iPhone 7',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":14,"phone_storage":25}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1526980234.jpg',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 86,
            vendor_id: 4,
            warehouse_id: 4,
            stock_available: 10,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '20000000.00',
            tier_cogs_price_2: null,
            tier_cogs_price_3: null,
            customer_id: 1,
            is_indent: 0,
            is_active: 0,
            created_at: '2018-05-22T09:10:45.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').rejects();
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success with no product', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: []
    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);

    try {
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success with ID array', function* (t) {
    t.context.sandbox.stub(RawQueryRepository, 'getProductReindex').resolves([
        {
            type: 'product_variant',
            product_variant_id: 62,
            sku: '4IVY6FGL08',
            long_name: 'Iphone GEN 90 - Black - 16GB',
            product_group_id: 22,
            product_group_name: 'Iphone GEN 90',
            brand_id: 81,
            brand_name: 'Apple',
            variant_value: '{"phone_color":2,"phone_storage":17}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1527775959.png',
            additional_image: '[]',
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_level: 'C0',
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_level: 'C1',
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_level: 'C2',
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_level: 'C3',
            product_vendor_id: 93,
            vendor_id: 336,
            warehouse_id: 143,
            stock_available: 944,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 20,
            tier_min_qty_3: 40,
            tier_cogs_price_1: '13000000.00',
            tier_cogs_price_2: '12500000.00',
            tier_cogs_price_3: '11000000.00',
            customer_id: 1,
            is_indent: 0,
            is_active: 1,
            created_at: '2018-05-31T14:12:49.000Z'
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getVariantAttributenReindex').resolves([
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 1,
            value: 'Silver',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 2,
            value: 'Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 11,
            value: 'Pink',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 12,
            value: 'Kuning',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 14,
            value: 'Hijau',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 16,
            value: 'Biru',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 18,
            value: 'Green',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 19,
            value: 'Red',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 21,
            value: 'Midnight Black',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 24,
            value: 'Jingga',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 1,
            code: 'phone_color',
            label: 'Warna',
            attribute_value_id: 28,
            value: 'Gold',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 3,
            value: '32GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 4,
            value: '64GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 13,
            value: '128GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 17,
            value: '16GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 20,
            value: '256GB',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 22,
            value: '512GB ',
            type: 'dropdown',
            is_variant: 1
        },
        {
            attribute_code_id: 2,
            code: 'phone_storage',
            label: 'Kapasitas',
            attribute_value_id: 25,
            value: '5TB',
            type: 'dropdown',
            is_variant: 1
        }
    ]);
    t.context.sandbox.stub(RawQueryRepository, 'getSpecificationAttributenReindex').resolves([
        {
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            value: 'iOS',
            is_variant: 0
        },
        {
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: '6 inch',
            code: 'phone_display',
            label: 'Layar',
            type: 'textinput',
            value: null,
            is_variant: 0
        }
    ]);
    t.context.sandbox.stub(SyncServiceRepository, 'findWarehouseByIds').resolves({
        data: [
            {
                id: 143,
                organization_address_id: 497,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                warehouse_hub_shipper: [
                    {
                        id: 1,
                        warehouse_hub_id: 1,
                        shipping_id: '20',
                        name: 'acommerce',
                        code: '20',
                        description: 'aCommerce'
                    },
                    {
                        id: 2,
                        warehouse_hub_id: 1,
                        shipping_id: '30',
                        name: 'tbi',
                        code: '30',
                        description: 'TBI (PT Trans Binatama Indonesia)'
                    }
                ],
                warehouse_address: {
                    id: 497,
                    organization_id: 336,
                    name: 'PT. starbuckscoffee (Persero) Tbk',
                    internal_code: null,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    geograph_id: 14982,
                    phone: '626352526172',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                },
                vendor: {
                    id: 336,
                    prefix: 'PT',
                    name: 'starbuckscoffee',
                    suffix: '(Persero) Tbk',
                    status_pkp: 1,
                    place: 'wow',
                    street: 'jl. timor no.60a',
                    trademark: 'starbucks',
                    created_at: '2018-05-31T13:07:54.000Z',
                    logo: null,
                    geograph: {
                        id: 14982,
                        province: 'Jakarta',
                        city: 'Jakarta Pusat',
                        district: 'Menteng',
                        village: 'Gondangdia',
                        zipcode: '10350',
                        geotag: '1006114992',
                        jnecitycode: 'CGK10305'
                    }
                }
            }
        ]

    });
    t.context.sandbox.stub(ReindexLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(publisher, 'reIndexAlgolia').resolves();
    t.context.sandbox.stub(SyncServiceRepository, 'getOrganizationsByIds').resolves({
        data: [
            {
                id: 336,
                uuid: '12345-67890-98765-54321'
            }
        ]
    });

    try {
        datas = {
            body: {
                type: 'product_group',
                id: ['9831'],
                data:
                {
                    product_group_id: '9831', id: '04ffb434-5466-43fe-b3f7-8733439be6ee', variants: []
                }
            }
        };
        const result = yield Methods.reindex(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const data = {
            body: {
                data: 123
            }
        };
        yield Methods.reindex(data, context);
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
