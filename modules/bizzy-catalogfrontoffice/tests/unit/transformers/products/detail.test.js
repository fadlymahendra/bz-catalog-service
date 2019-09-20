'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Transformer = require('../../../../src/transformers/products/detail');

test.serial('test item: (data == \'NO_VARIANT\') ', (t) => {
    const data = {
        id: '',
        ProductVariant: {
            id: '',
            long_name: '',
            variant_value: 'NO_VARIANT',
            primary_image: '',
            sku: ''
        },
        variants: '',
        currency: '',
        tier_min_qty_1: '',
        tier_min_qty_2: '',
        tier_min_qty_3: '',
        tier_cogs_price_1: '',
        tier_cogs_price_2: '',
        tier_cogs_price_3: '',
        is_active: '',
        sku_vendor: '',
        stock_available: '',
        warranty_option: '',
        warranty_period: '',
        warranty_limit: '',
        warranty_coverage: '',
        reference_link: '',
        is_indent: '',
        indent_limit: '',
        indent_period: '',
        created_at: '',
        is_bulk: '',
        is_private_sku: false,
        private_customers: ''
    };

    const expected = {
        id: data.id,
        product_variant_id: data.ProductVariant.id,
        long_name: data.ProductVariant.long_name,
        variants: data.variants,
        variant_value: 'NO_VARIANT',
        primary_image: data.ProductVariant.primary_image,
        currency: data.currency,
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2,
        tier_min_qty_3: data.tier_min_qty_3,
        tier_cogs_price_1: data.tier_cogs_price_1,
        tier_cogs_price_2: data.tier_cogs_price_2,
        tier_cogs_price_3: data.tier_cogs_price_3,
        is_active: data.is_active,
        sku: data.ProductVariant.sku,
        sku_vendor: data.sku_vendor,
        stock_available: data.stock_available,
        warranty_option: data.warranty_option,
        warranty_period: data.warranty_period,
        warranty_limit: data.warranty_limit,
        warranty_coverage: data.warranty_coverage,
        reference_link: [],
        is_indent: data.is_indent,
        indent_limit: data.indent_limit,
        indent_period: data.indent_period,
        is_decimal: undefined,
        down_payment_type: undefined,
        down_payment_value: undefined,
        created_at: data.created_at,
        is_bulk: 0,
        is_private_sku: false,
        private_customers: []
    };

    const transformer = new Transformer.item(data);
    t.deepEqual(transformer, expected);
});

test.serial('test item: (data.reference_link == "" || data.reference_link == null) is false ', (t) => {
    const data = {
        id: '',
        ProductVariant: {
            id: '',
            long_name: '',
            variant_value: 'NO_VARIANT',
            primary_image: '',
            sku: ''
        },
        variants: '',
        currency: '',
        tier_min_qty_1: '',
        tier_min_qty_2: '',
        tier_min_qty_3: '',
        tier_cogs_price_1: '',
        tier_cogs_price_2: '',
        tier_cogs_price_3: '',
        is_active: '',
        sku_vendor: '',
        stock_available: '',
        warranty_option: '',
        warranty_period: '',
        warranty_limit: '',
        warranty_coverage: '',
        reference_link: '[]',
        is_indent: '',
        indent_limit: '',
        indent_period: '',
        created_at: '',
        is_bulk: '',
        is_private_sku: '',
        private_customers: ''
    };

    const expected = {
        id: data.id,
        product_variant_id: data.ProductVariant.id,
        long_name: data.ProductVariant.long_name,
        variants: data.variants,
        variant_value: 'NO_VARIANT',
        primary_image: data.ProductVariant.primary_image,
        currency: data.currency,
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2,
        tier_min_qty_3: data.tier_min_qty_3,
        tier_cogs_price_1: data.tier_cogs_price_1,
        tier_cogs_price_2: data.tier_cogs_price_2,
        tier_cogs_price_3: data.tier_cogs_price_3,
        is_active: data.is_active,
        sku: data.ProductVariant.sku,
        sku_vendor: data.sku_vendor,
        stock_available: data.stock_available,
        warranty_option: data.warranty_option,
        warranty_period: data.warranty_period,
        warranty_limit: data.warranty_limit,
        warranty_coverage: data.warranty_coverage,
        reference_link: [],
        is_indent: data.is_indent,
        indent_limit: data.indent_limit,
        indent_period: data.indent_period,
        is_decimal: undefined,
        down_payment_type: undefined,
        down_payment_value: undefined,
        created_at: data.created_at,
        is_bulk: 0,
        is_private_sku: false,
        private_customers: []
    };

    const transformer = new Transformer.item(data);
    t.deepEqual(transformer, expected);
});


test.serial('test organizationList', (t) => {
    const data = {
        id: '',
        phone: '',
        pic_name: '',
        pic_mobile: '',
        pic_email: '',
        prefix: '',
        suffix: '',
        name: '',
        place: '',
        street: ''
    };

    const expected = {
        address: ' ',
        email: '',
        id: '',
        mobile_phone: '',
        name: '.  ',
        phone: '',
        pic: ''
    };

    const transformer = new Transformer.organizationList(data);
    t.deepEqual(transformer, expected);
});

