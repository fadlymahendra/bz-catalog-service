'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const Transformer = require('../../../../src/transformers/product-detail/variant');

test.serial('itemERP: type-1', (t) => {
    const data = {
        id: '',
        vendors: [{
            id: '',
            vendor_id: '',
            warehouse_id: '',
            stock_available: '',
            currency: '',
            tier_min_qty_1: '',
            tier_min_qty_2: '',
            tier_min_qty_3: '',
            tier_cogs_price_1: '',
            tier_cogs_price_2: '',
            tier_cogs_price_3: ''
        }],
        vendor_information: {
            data: [{
                id: '',
                vendor: {
                    prefix: '',
                    name: '',
                    suffix: '',
                    id: '',
                    logo: '',
                    trademark: '',
                    status_pkp: ''
                },
                warehouse_address: {
                    name: ''
                },
                warehouse_hub_id: '',
                warehouse_hub: [],
                warehouse_hub_shipper: []
            }]
        },
        sku: '',
        long_name: '',
        brand: {
            id: '',
            name: ''
        },
        uom: {
            id: '',
            name: ''
        },
        stocking_uom: {
            id: '',
            name: ''
        },
        payload: {
            quantity_stocking_uom: '',
            barcode: '',
            manufacturing_number: '',
            package_weight: 0,
            package_length: 0,
            package_width: 0,
            package_height: 0,
            package_content: '',
            id: '',
            name: '',
            variant_count: '',
            variant_matrix: []
        },
        variant_value: '',
        variant_attribute: [],
        category: [{
            c0_id: '',
            c0_name: '',
            unspsc: ''
        }],
        additional_image: '',
        product_specifications: [],
        c0: {
            id: '',
            name: '',
            level: '',
            unspsc: ''
        },
        c1: {
            id: '',
            name: '',
            level: '',
            unspsc: ''
        },
        c2: {
            id: '',
            name: '',
            level: '',
            unspsc: ''
        },
        c3: {
            id: '',
            name: '',
            level: '',
            unspsc: ''
        }
    };

    const expected = {
        data: {
            type: 'product_variant',
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            package_content: '',
            primary_image: undefined,
            brand: {
                id: data.brand.id,
                name: data.brand.name,
                url_key: data.brand.name
            },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            categories: {
                c0: {
                    id: data.c0.id,
                    name: data.c0.name,
                    url_key: `${data.c0.name}_${data.c0.level}.${data.c0.id}`,
                    unspsc: data.c0.unspsc
                },
                c1: {
                    id: data.c1.id,
                    name: data.c1.name,
                    url_key: `${data.c0.name}_${data.c0.level}.${data.c0.id}`,
                    unspsc: data.c1.unspsc
                },
                c2: {
                    id: data.c2.id,
                    name: data.c2.name,
                    url_key: `${data.c0.name}_${data.c0.level}.${data.c0.id}`,
                    unspsc: data.c2.unspsc
                },
                c3: {
                    id: data.c3.id,
                    name: data.c3.name,
                    url_key: `${data.c0.name}_${data.c0.level}.${data.c0.id}`,
                    unspsc: data.c3.unspsc
                }
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            additional_image: [],
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            specifications: (data.product_specifications.length === 0) ? [] : '',
            variants: (data.variant_attribute.length === 0) ? [] : '',
            variant_count: data.payload.variant_count,
            variant_matrix: (data.payload.variant_matrix.length === 0) ? [] : '',
            variant_value: {},
            product_vendors: [
                {
                    currency: '',
                    id: '',
                    stock_available: '',
                    tier_cogs_price_1: NaN,
                    tier_cogs_price_2: NaN,
                    tier_cogs_price_3: NaN,
                    tier_min_qty_1: '',
                    tier_min_qty_2: '',
                    tier_min_qty_3: '',
                    vendor_id: '',
                    vendor_joined_at: '',
                    vendor_logo: '',
                    vendor_name: '  ',
                    vendor_pkp: 0,
                    vendor_trademark: '',
                    warehouse_geograph: {
                        city: '',
                        district: '',
                        geotag: '',
                        id: '',
                        jnecitycode: '',
                        province: '',
                        village: '',
                        zipcode: ''
                    },
                    warehouse_hub: [],
                    warehouse_hub_id: '',
                    warehouse_hub_shipper: [],
                    warehouse_id: '',
                    warehouse_name: ''
                }
            ]
            // is_mapping: (data.product_mapping.length === 0) ? 0 : 1
        }
    };

    const transformer = new Transformer.itemERP(data);

    t.deepEqual(transformer, expected);
});

