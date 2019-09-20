'use strict';


const Helper = require('../../utils/helper');

const BULK_ADDPRODUCT = 'BULK_ADDPRODUCT';
const BULK_EDITPRODUCT = 'BULK_EDITPRODUCT';

const generateVariantValue = (data) => {
    // if (data === 'NO_VARIANT') {
    //     return 'NO_VARIANT';
    // }
    return data === 'NO_VARIANT' ? 'NO_VARIANT' : JSON.parse(data);
};

const getConfigValue = function (type, value) {
    const period = {
        week: 'Minggu',
        month: 'Bulan',
        year: 'Tahun',
        forever: 'Selamanya'
    };

    let configValue = null;
    const warrantyOption = {
        no_warranty: 'Tidak bergaransi',
        official_warranty: 'Resmi',
        distributor: 'Distributor',
        international: 'International',
        warranty_shop: 'Toko'
    };
    switch (type) {
    case 'WARRANTY_OPTION':
        configValue = warrantyOption[value] || null;
        break;
    case 'PERIOD':
    default:
        configValue = period[value] || null;
        break;
    }

    return configValue;
};

exports.collection_report = function (res, attribute) {
    const collection = res.map((data, index) => {
        const variants = generateVariantValue(data.ProductVariant.variant_value);

        const variantValue = ['', ''];
        if (variants !== 'NO_VARIANT') {
            const props = Object.keys(variants);
            for (let i = 0; i < props.length; i++) {
                const el = props[i];
                const elValue = variants[el];

                const code = attribute.code[el];
                const value = attribute.value[elValue];
                variantValue[i] = `${code} : ${value}`;
            }
        }

        const result = {
            no: index + 1,
            sku_bizzy: data.ProductVariant.sku,
            long_name: data.ProductVariant.long_name,            
            brand: data.ProductVariant.ProductGroup.Brand.name,
            variant_1: variantValue[0],
            variant_2: variantValue[1],
            sku_vendor: data.sku_vendor,
            tier_min_qty_1: data.tier_min_qty_1,
            tier_min_qty_2: data.tier_min_qty_2,
            tier_min_qty_3: data.tier_min_qty_3,
            tier_cogs_price_1: data.tier_cogs_price_1,
            tier_cogs_price_2: data.tier_cogs_price_2,
            tier_cogs_price_3: data.tier_cogs_price_3,
            // tier_min_qty_for_bizzy: '',
            // min_price_for_bizzy: '',
            stock_available: data.stock_available,
            warranty_option: getConfigValue('WARRANTY_OPTION', data.warranty_option),
            warranty_period: getConfigValue('PERIOD', data.warranty_period),
            warranty_limit: data.warranty_limit,
            warranty_coverage: data.warranty_coverage,
            is_indent: data.is_indent ? 'Ya' : 'Tidak',
            indent_period: getConfigValue('PERIOD', data.indent_period),
            indent_limit: data.indent_limit,
            status_sku: data.is_active ? 'Ya' : 'Tidak'
        };
        return result;
    });

    return collection;
};

exports.parseAttributeValue = function (res) {
    const attribute = Helper.parseDataObject(res);
    const parsed = {};
    attribute.forEach((el) => {
        const id = el.id;
        const value = el.value;
        parsed[id] = value;
    });

    return parsed;
};

exports.parseAttributeCode = function (res) {
    const attribute = Helper.parseDataObject(res);
    const parsed = {};
    attribute.forEach((el) => {
        const code = el.code;
        const label = el.label;
        parsed[code] = label;
    });

    return parsed;
};

exports.generetaLog = function (action, payload, context) {
    let title;

    switch (action) {
    case BULK_EDITPRODUCT:
        title = 'Bulk Edit Produk';
        break;
    case BULK_ADDPRODUCT:
    default:
        title = 'Bulk Tambah Produk';
        break;
    }

    const lastName = context.user.last_name || '';
    const userName = `${context.user.first_name} ${lastName}`;

    const log = {
        title,
        organization_id: context.user.customer.organization_id,
        payload,
        user: {
            id: context.user.customer.person_id,
            name: userName,
            email: context.user.username,
            type: 'customer'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
    return log;
};

module.exports = exports;
