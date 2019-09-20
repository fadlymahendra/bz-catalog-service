'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const Transformer = require('../../../../src/transformers/algolia/reindex');


test.serial('collection: Should be return object', (t) => {
    const now = new Date(2018, 12, 30, 8, 0, 0, 0);
    const clock = sinon.useFakeTimers(now.getTime());

    const products = [{
        additional_image: '',
        product_group_id: '',
        product_group_name: '',
        product_variant_id: '',
        type: '',
        sku: '',
        brand_id: '',
        brand_name: '',
        long_name: '',
        category0_name: '',
        category1_name: '',
        category2_name: '',
        category3_name: '',
        category0_id: '',
        category1_id: '',
        category2_id: '',
        category3_id: '',
        category0_level: '',
        category1_level: '',
        category2_level: '',
        category3_level: '',
        specifications: '',
        matrix_attributes: '',
        primary_image: '',
        warehouse_information: {
            vendor: {
                prefix: '',
                name: '',
                suffix: ''
            }
        },
        variant_value: 'NO_VARIANT',
        warehouse_id: '',
        uuid: '',
        vendor_id: 1
    }];
    const attributes = {
        variants: [],
        specifications: [{
            label: '',
            type: '',
            text_input: '',
            value: ''
        }]
    };
    const others = {
        warehouses: {
            data: [{
                id: 1
            }]
        },
        organizations: {
            data: [{
                id: 1,
                uuid: 'ABCDEF'
            }]
        }
    };
    const transformer = new Transformer.collection(products, attributes, others);
    const expected = [{
        additional_image: [],
        brand: {
            id: '',
            name: '',
            url_key: ''
        },
        categories: {
            lvl0: '',
            lvl1: ' > ',
            lvl2: ' >  > ',
            lvl3: ' >  >  > '
        },
        created_at: undefined,
        hierarchical_categories: {
            c0: {
                id: '',
                name: '',
                url_key: '_.'
            },
            c1: {
                id: '',
                name: '',
                url_key: '_.'
            },
            c2: {
                id: '',
                name: '',
                url_key: '_.'
            },
            c3: {
                id: '',
                name: '',
                url_key: '_.'
            }
        },
        matrix_attributes: {
            '': ''
        },
        name: '',
        objectID: 'SKU-',
        primary_image: '',
        product_group: {
            id: '',
            name: '',
            url_key: ''
        },
        product_variant: {
            id: '',
            long_name: '',
            sku: '',
            url_key: ''
        },
        product_vendors: [
            {
                created_at: undefined,
                currency: undefined,
                customer_id: 0,
                id: undefined,
                is_active: undefined,
                is_indent: NaN,
                indent_limit: NaN,
                indent_period: undefined,
                is_decimal: NaN,
                down_payment_type: NaN,
                down_payment_value: NaN,
                stock_available: NaN,
                tier_cogs_price_1: NaN,
                tier_cogs_price_2: NaN,
                tier_cogs_price_3: NaN,
                tier_min_qty_1: NaN,
                tier_min_qty_2: NaN,
                tier_min_qty_3: NaN,
                timestamp: NaN,
                uuid: 'ABCDEF',
                vendor_id: 1,
                vendor_logo: '',
                vendor_name: 'undefined',
                warehouse_geograph: {
                    city: 'undefined',
                    district: 'undefined',
                    geotag: 'undefined',
                    province: 'undefined',
                    village: 'undefined',
                    zipcode: 'undefined'
                },
                warehouse_id: ''
            }
        ],
        reindex_at: new Date(),
        sku: '',
        specifications: [
            {
                code: undefined,
                label: '',
                value: ''
            }
        ],
        start_from: NaN,
        stock_available: NaN,
        timestamp: NaN,
        total_offer: 1,
        type: '',
        url_key: ''
    }];

    t.deepEqual(transformer, expected);
});


test.serial('mongoInsert: Should be return object', (t) => {
    const messageError = '';
    const sku = '';
    const uniqueId = '';
    const input = '';

    const transformer = new Transformer.mongoInsert(messageError, sku, uniqueId, input);
    const expected = {
        id: uniqueId,
        product_sku: sku,
        message: messageError,
        data_input: input,
        created_at: new Date(),
        updated_at: new Date()
    };

    t.deepEqual(transformer, expected);
});
