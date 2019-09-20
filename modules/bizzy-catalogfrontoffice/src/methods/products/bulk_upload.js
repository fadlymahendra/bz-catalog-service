/* eslint-disable no-console */

'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const BrandRepository = require('../../repositories/brand');
const UomRepository = require('../../repositories/uom');
const StockingUomRepository = require('../../repositories/stocking_uom');
const PremoderationRepository = require('../../repositories/premoderation');
const ProductUploadLogRepository = require('../../repositories/product_upload_log');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ExcelAdapter = require('../../adapter/bulk_upload');
const WebhookRepository = require('../../repositories/webhook');
const Helper = require('../../utils/helper');
const Joi = require('joi');
const _ = require('lodash');
const S3Bucket = require('../../utils/s3_bucket');
const Stream = require('stream');
const Transformer = require('../../transformers/products/download_template');
const uuid = require('uuid');


const searchKey = function (array, key) {
    if (_.indexOf(array, key) === -1) return false;
    return true;
};


const findIdByValue = function (list, name) {
    const el = _.find(list, ['name', name]);
    return el.id;
};


const getWarrantyOption = function (value) {
    const warrantyOption = {
        'Tidak bergaransi': 'no_warranty',
        Resmi: 'official_warranty',
        Distributor: 'distributor',
        International: 'international',
        Toko: 'warranty_shop'
    };

    return warrantyOption[value];
};

const getPeriod = function (value) {
    const period = {
        Minggu: 'week',
        Bulan: 'month',
        Tahun: 'year',
        Selamanya: 'forever'
    };

    return period[value] || null;
};

const getStatus = el => (String(el).toLowerCase() === 'ya' ? 1 : 0);

// if condition is true, push error
const check = function (row, error, condition, key, message) {
    if (condition && !_.has(row[key], 'msg') && key) {
        row[key] = { val: row[key], msg: message };
        error.push(message);
    }
};

const validateSkuVendor = function (sku, keys) {
    const skuKeys = keys.map(el => (el.sku_vendor));
    const index = skuKeys.indexOf(sku.sku_vendor);
    if (index === -1) {
        return true;
    }
    if (keys[index].sku_bizzy === sku.sku_bizzy) {
        return true;
    }
    return false;
};
exports.validateSkuVendorBulkUpload = validateSkuVendor;

const productValidation = function (row, keys) {
    const error = [];
    const warrantyOptionId = [
        'Tidak bergaransi',
        'Resmi',
        'Distributor',
        'Toko',
        'International'
    ];
    const periodId = ['Hari', 'Minggu', 'Bulan', 'Tahun', 'Selamanya'];

    const ERR_UOM_NOT_VALID = 'Uom kosong atau tidak terdaftar';
    const ERR_STOCKING_UOM_NOT_VALID = 'Stocking Uom kosong atau tidak terdaftar';
    const ERR_BRAND_NOT_VALID = 'Merek kosong atau tidak terdaftar';
    const ERR_TIER_QTY_1_EMPTY = 'Nilai Tier 1 kosong';
    const ERR_TIER_QTY_2_EMPTY = 'Nilai Tier 2 kosong';
    const ERR_TIER_QTY_3_EMPTY = 'Nilai Tier 3 kosong';
    const ERR_TIER_QTY_2_SMALLER = 'Nilai Tier 2 lebih kecil dari Tier 1';
    const ERR_TIER_QTY_3_SMALLER = 'Nilai Tier 3 lebih kecil dari Tier 1 atau Tier 2';
    const ERR_TIER_COGS_1_EMPTY = 'Harga Tier 1 kosong';
    const ERR_TIER_COGS_2_EMPTY = 'Harga Tier 2 kosong';
    const ERR_TIER_COGS_3_EMPTY = 'Harga Tier 3 kosong';
    const ERR_TIER_COGS_2_BIGGER = 'Harga Tier 2 lebih besar dari Tier 1';
    const ERR_TIER_COGS_3_BIGGER = 'Harga Tier 3 lebih besar dari Tier 1 atau Tier 2';
    const ERR_TIER_NOT_VALID = 'Nilai dan Harga Tier tidak valid';
    const ERR_PRODUCT_NAME = 'Nama produk kosong';
    const ERR_UNSPSC_NOT_VALID = 'Unspsc Kategori tidak valid';
    const ERR_DESCRIPTION_EMPTY = 'Deskripsi kosong';
    const ERR_DESCRIPTION_NOT_VALID = 'Deskripsi minimal 30 karakter';
    const ERR_PACKAGE_WEIGHT_EMPTY = 'Berat Produk kosong';
    const ERR_BRAND_EMPTY = 'Merek kosong';
    const ERR_PACKAGE_LENGTH_EMPTY = 'Lebar Produk kosong';
    const ERR_PACKAGE_HEIGHT_EMPTY = 'Tinggi Produk kosong';
    const ERR_PACKAGE_WIDTH_EMPTY = 'Panjang Produk kosong';
    const ERR_WARRANTY_TYPE_EMPTY = 'Tipe Garansi kosong';
    const ERR_WARRANTY_TYPE_NOT_VALID = 'Tipe Garansi tidak valid';
    const ERR_WARRANTY_PERIOD_EMPTY = 'Periode Garansi kosong';
    const ERR_WARRANTY_PERIOD_NOT_VALID = 'Periode Garansi tidak valid';
    const ERR_WARRANTY_LIMIT_EMPTY = 'Lama Garansi kosong';
    const ERR_SKU_VENDOR_NOT_VALID = 'Sku Vendor tidak valid';
    const ERR_SKU_VENDOR_EMPTY = 'Sku Vendor kosong';
    const ERR_SKU_VENDOR_DUPLICATE = 'Duplikasi Sku Vendor';
    // const ERR_IS_INDENT_EMPTY = 'Produk Inden kosong';
    const ERR_INDENT_PERIOD_EMPTY = 'Periode Inden kosong';
    const ERR_INDENT_LIMIT_EMPTY = 'Waktu Proses Inden kosong';
    const ERR_PACKAGE_CONTENT_EMPTY = 'Isi dalam kemasan kosong';
    const ERR_QUANTITY_STOCK_UOM_MUST_INTEGER = 'Nilai Jumlah Stok per UOM harus berupa angka dan lebih dari 0';
    const ERR_PACKAGE_WEIGHT_MUST_INTEGER = 'Berat Produk harus berupa angka dan lebih dari 0';
    const ERR_PACKAGE_LENGTH_MUST_INTEGER = 'Lebar Produk harus berupa angka dan lebih dari 0';
    const ERR_PACKAGE_HEIGHT_MUST_INTEGER = 'Tinggi Produk harus berupa angka dan lebih dari 0';
    const ERR_PACKAGE_WIDTH_MUST_INTEGER = 'Panjang Produk harus berupa angka dan lebih dari 0';
    const ERR_STOCK_MUST_INTEGER = 'Stock harus berupa angka';
    const ERR_WARRANTY_LIMIT_MUST_INTEGER = 'Lama Garansi harus berupa angka dan lebih dari 0';
    const ERR_INDENT_LIMIT_MUST_INTEGER = 'Waktu Proses harus berupa angka dan lebih dari 0';
    const ERR_TIER_QTY_1_EMPTY_MUST_INTEGER = 'Nilai Tier 1 harus berupa angka dan lebih dari 0';
    const ERR_TIER_QTY_2_EMPTY_MUST_INTEGER = 'Nilai Tier 2 harus berupa angka dan lebih dari 0';
    const ERR_TIER_QTY_3_EMPTY_MUST_INTEGER = 'Nilai Tier 3 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_1_EMPTY_MUST_INTEGER = 'Harga Tier 1 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_2_EMPTY_MUST_INTEGER = 'Harga Tier 2 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_3_EMPTY_MUST_INTEGER = 'Harga Tier 3 harus berupa angka dan lebih dari 0';

    const ERR_DECIMAL = 'Apakah produk dijual dalam pecaham/desimal, Mohon isi Ya/Tidak.';
    const ERR_INDENT_PERIOD = 'Apakah produk dalam periode inden, Mohon isi Hari/Minggu.';
    const ERR_INDENT_LIMIT_EMPTY2 = 'Apakah produk dalam periode inden, Mohon isi waktu proses inden.';
    const ERR_INDENT_LIMIT_NUMBER = 'Waktu Proses harus berupa bilangan bulat.';
    const ERR_INDENT_LIMIT_MIN_DAY = 'Waktu Proses minimum 7 hari';
    const ERR_INDENT_LIMIT_MAX_DAY = 'Waktu Proses maksimum 365 hari';
    const ERR_INDENT_LIMIT_MIN_WEEK = 'Waktu Proses minimum 1 minggu';
    const ERR_INDENT_LIMIT_MAX_WEEK = 'Waktu Proses maksimum 52 minggu';
    const ERR_DOWN_PAYMENT_TYPE = 'Apakah produk memiliki tipe down payment, Mohon isi Persen/Nominal.';
    const ERR_DOWN_PAYMENT_VALUE_EMPTY = 'Apakah produk memiliki tipe down payment, Mohon isi jumlah DP.';
    const ERR_DOWN_PAYMENT_VALUE_NUMBER = 'Jumlah DP harus berupa bilangan bulat.';
    const ERR_DOWN_PAYMENT_VALUE_MIN_PERCENT = 'Jumlah DP minimum 1%.';
    const ERR_DOWN_PAYMENT_VALUE_MAX_PERCENT = 'Jumlah DP maksimum 99%.';
    const ERR_DOWN_PAYMENT_VALUE_MIN_NOMINAL = 'Jumlah DP minimum Rp. 1.';
    const ERR_DOWN_PAYMENT_VALUE_OVER_1 = 'Jumlah DP tidak boleh sama atau melebihi Harga Jual Grosir 1';
    const ERR_DOWN_PAYMENT_VALUE_OVER_2 = 'Jumlah DP tidak boleh sama atau melebihi Harga Jual Grosir 2';
    const ERR_DOWN_PAYMENT_VALUE_OVER_3 = 'Jumlah DP tidak boleh sama atau melebihi Harga Jual Grosir 3';

    let indentPeriod = row.indent_period;
    indentPeriod = (indentPeriod) ? indentPeriod.toLowerCase() : indentPeriod;
    const indentLimit = row.indent_limit;
    let isDecimal = row.is_decimal;
    isDecimal = (isDecimal) ? isDecimal.toLowerCase() : isDecimal;
    let downPaymentType = row.down_payment_type;
    if (downPaymentType) {
        downPaymentType = downPaymentType.toLowerCase();
        downPaymentType = downPaymentType.split(' ')[0];
    }

    const downPaymentValue = parseInt(row.down_payment_value);

    check(row, error, ['ya', 'tidak'].indexOf(isDecimal) < 0, 'decimal', ERR_DECIMAL);

    check(row, error, (!indentLimit && indentPeriod), 'indent limit', ERR_INDENT_LIMIT_EMPTY2);
    if (!Number.isInteger(indentLimit) && indentPeriod) {
        check(row, error, true, 'indent limit', ERR_INDENT_LIMIT_NUMBER);
    }
    if (indentPeriod) {
        check(row, error, ['hari', 'minggu'].indexOf(indentPeriod) < 0, 'indent period', ERR_INDENT_PERIOD);
        if (indentPeriod === 'hari') {
            check(row, error, indentLimit < 7, 'indent limit', ERR_INDENT_LIMIT_MIN_DAY);
            check(row, error, indentLimit > 365, 'indent limit', ERR_INDENT_LIMIT_MAX_DAY);
        } else if (indentPeriod === 'minggu') {
            check(row, error, indentLimit < 1, 'indent limit', ERR_INDENT_LIMIT_MIN_WEEK);
            check(row, error, indentLimit > 52, 'indent limit', ERR_INDENT_LIMIT_MAX_WEEK);
        }
    }

    check(row, error, (!downPaymentValue && downPaymentType), 'down payment type', ERR_DOWN_PAYMENT_VALUE_EMPTY);
    if (!Number.isInteger(downPaymentValue) && downPaymentType) {
        check(row, error, true, 'down payment value', ERR_DOWN_PAYMENT_VALUE_NUMBER);
    }
    if (downPaymentType) {
        check(row, error, ['persen', 'nominal'].indexOf(downPaymentType) < 0, 'indent period', ERR_DOWN_PAYMENT_TYPE);
        if (downPaymentType === 'persen') {
            check(row, error, downPaymentValue < 1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MIN_PERCENT);
            check(row, error, downPaymentValue > 99, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MAX_PERCENT);
        } else if (downPaymentType === 'nominal') {
            check(row, error, downPaymentValue < 1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MIN_NOMINAL);

            if (!row.tier_cogs_price_1 && !row.tier_cogs_price_2 && !row.tier_cogs_price_3) {
                check(row, error, downPaymentValue >= row.tier_cogs_price_3, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_3);
            } else if (!row.tier_cogs_price_1 && !row.tier_cogs_price_2) {
                check(row, error, downPaymentValue >= row.tier_cogs_price_2, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_2);
            } else if (!row.tier_cogs_price_1) {
                check(row, error, downPaymentValue >= row.tier_cogs_price_1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_1);
            }
        }
    }


    // Required field
    check(row, error, !row.product_name, 'product_name', ERR_PRODUCT_NAME);
    check(row, error, !row.description, 'description', ERR_DESCRIPTION_EMPTY);
    check(row, error, !row.package_weight, 'package_weight', ERR_PACKAGE_WEIGHT_EMPTY);
    check(row, error, !row.package_height, 'package_height', ERR_PACKAGE_HEIGHT_EMPTY);
    check(row, error, !row.package_length, 'package_length', ERR_PACKAGE_LENGTH_EMPTY);
    check(row, error, !row.package_width, 'package_width', ERR_PACKAGE_WIDTH_EMPTY);
    check(row, error, !row.package_content, 'package_content', ERR_PACKAGE_CONTENT_EMPTY);
    check(row, error, String(row.description).length < 30, 'description', ERR_DESCRIPTION_NOT_VALID);

    // Sku Vendor Validation
    check(row, error, row.sku_vendor === null, 'sku_vendor', ERR_SKU_VENDOR_EMPTY);
    check(row, error, String(row.sku_vendor).trim().length > 20, 'sku_vendor', ERR_SKU_VENDOR_NOT_VALID);
    check(row, error, !Helper.isAlphaNumeric(String(row.sku_vendor).trim()), 'sku_vendor', ERR_SKU_VENDOR_NOT_VALID);
    check(row, error, !validateSkuVendor({ sku_bizzy: row.sku_bizzy, sku_vendor: String(row.sku_vendor).trim().toUpperCase() }, keys.registered_sku), 'sku_vendor', ERR_SKU_VENDOR_DUPLICATE);
    check(row, error, searchKey(keys.sku_vendor_ondoc, String(row.sku_vendor).trim().toUpperCase()), 'sku_vendor', ERR_SKU_VENDOR_DUPLICATE);

    // Unspsc Validation
    check(row, error, row.unspsc !== null && !searchKey(keys.unspsc, String(row.unspsc)), 'unspsc', ERR_UNSPSC_NOT_VALID);

    // Uom Validation
    check(row, error, !searchKey(keys.uom_name, row.uom), 'uom', ERR_UOM_NOT_VALID);

    // Stocking Uom Validation
    if (row.stocking_uom) row.stocking_uom = row.stocking_uom.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
    check(row, error, !searchKey(keys.stocking_uom_name, row.stocking_uom), 'stocking_uom', ERR_STOCKING_UOM_NOT_VALID);

    // Must be Integer Validation
    check(row, error, (typeof row.quantity_stocking_uom === 'string' || row.quantity_stocking_uom <= 0 || !Number.isInteger(row.quantity_stocking_uom)), 'quantity_stocking_uom', ERR_QUANTITY_STOCK_UOM_MUST_INTEGER);
    check(row, error, (typeof row.package_weight === 'string' || row.package_weight <= 0), 'package_weight', ERR_PACKAGE_WEIGHT_MUST_INTEGER);
    check(row, error, (typeof row.package_height === 'string' || row.package_height <= 0), 'package_height', ERR_PACKAGE_HEIGHT_MUST_INTEGER);
    check(row, error, (typeof row.package_length === 'string' || row.package_length <= 0), 'package_length', ERR_PACKAGE_LENGTH_MUST_INTEGER);
    check(row, error, (typeof row.package_width === 'string' || row.package_width <= 0), 'package_width', ERR_PACKAGE_WIDTH_MUST_INTEGER);
    check(row, error, row.stock !== null && (typeof row.stock === 'string' || row.stock < 0 || !Number.isInteger(row.stock)), 'stock', ERR_STOCK_MUST_INTEGER);
    check(row, error, (row.tier_min_qty_1 && (typeof row.tier_min_qty_1 === 'string' || row.tier_min_qty_1 <= 0 || !Number.isInteger(row.tier_min_qty_1))), 'tier_min_qty_1', ERR_TIER_QTY_1_EMPTY_MUST_INTEGER);
    check(row, error, (row.tier_min_qty_2 && (typeof row.tier_min_qty_2 === 'string' || row.tier_min_qty_2 <= 0 || !Number.isInteger(row.tier_min_qty_2))), 'tier_min_qty_2', ERR_TIER_QTY_2_EMPTY_MUST_INTEGER);
    check(row, error, (row.tier_min_qty_3 && (typeof row.tier_min_qty_3 === 'string' || row.tier_min_qty_3 <= 0 || !Number.isInteger(row.tier_min_qty_3))), 'tier_min_qty_3', ERR_TIER_QTY_3_EMPTY_MUST_INTEGER);
    check(row, error, (row.tier_cogs_price_1 && (typeof row.tier_cogs_price_1 === 'string' || row.tier_cogs_price_1 <= 0)), 'tier_cogs_price_1', ERR_TIER_COGS_1_EMPTY_MUST_INTEGER);
    check(row, error, (row.tier_cogs_price_2 && (typeof row.tier_cogs_price_2 === 'string' || row.tier_cogs_price_2 <= 0)), 'tier_cogs_price_2', ERR_TIER_COGS_2_EMPTY_MUST_INTEGER);
    check(row, error, (row.tier_cogs_price_3 && (typeof row.tier_cogs_price_3 === 'string' || row.tier_cogs_price_3 <= 0)), 'tier_cogs_price_3', ERR_TIER_COGS_3_EMPTY_MUST_INTEGER);

    // Brand Validation
    if (row.brand !== '' && row.brand !== null) {
        if (row.brand.match(/\bBR-/)) {
            // free text brand
            const brandId = Number(row.brand.replace('BR-', ''));
            check(row, error, Number.isNaN(brandId) || !searchKey(keys.brand_id, brandId), 'brand', ERR_BRAND_NOT_VALID);
        }
    }

    check(row, error, !row.brand, 'brand', ERR_BRAND_EMPTY);
    // undefined to null
    row.tier_min_qty_1 = row.tier_min_qty_1 === undefined ? null : row.tier_min_qty_1;
    row.tier_min_qty_2 = row.tier_min_qty_2 === undefined ? null : row.tier_min_qty_2;
    row.tier_min_qty_3 = row.tier_min_qty_3 === undefined ? null : row.tier_min_qty_3;
    row.tier_cogs_price_1 = row.tier_cogs_price_1 === undefined ? null : row.tier_cogs_price_1;
    row.tier_cogs_price_2 = row.tier_cogs_price_2 === undefined ? null : row.tier_cogs_price_2;
    row.tier_cogs_price_3 = row.tier_cogs_price_3 === undefined ? null : row.tier_cogs_price_3;

    check(row, error, !row.tier_min_qty_1, 'tier_min_qty_1', ERR_TIER_QTY_1_EMPTY);
    check(row, error, !row.tier_cogs_price_1, 'tier_cogs_price_1', ERR_TIER_COGS_1_EMPTY);
    // check(row, error, row.stock === null, 'stock', ERR_STOCK_EMPTY);
    check(row, error, !row.warranty_type, 'warranty_type', ERR_WARRANTY_TYPE_EMPTY);
    check(row, error, row.warranty_type !== 'Tidak bergaransi' && !row.warranty_period, 'warranty_period', ERR_WARRANTY_PERIOD_EMPTY);
    check(row, error, row.warranty_type !== 'Tidak bergaransi' && row.warranty_period !== 'Selamanya' && !row.warranty_limit, 'warranty_limit', ERR_WARRANTY_LIMIT_EMPTY);
    // check(row, error, row.warranty_type !== 'Tidak bergaransi' && !row.warranty_coverage, 'warranty_coverage', ERR_WARRANTY_COVERAGE_EMPTY);
    check(row, error, row.warranty_type !== 'Tidak bergaransi' && row.warranty_period !== 'Selamanya' && (typeof row.warranty_limit === 'string' || row.warranty_limit <= 0 || !Number.isInteger(row.warranty_limit)), 'warranty_limit', ERR_WARRANTY_LIMIT_MUST_INTEGER);

    check(row, error, _.indexOf(warrantyOptionId, row.warranty_type) === -1, 'warranty_type', ERR_WARRANTY_TYPE_NOT_VALID);
    check(row, error, row.warranty_type !== 'Tidak bergaransi' && _.indexOf(periodId, row.warranty_period) === -1, 'warranty_period', ERR_WARRANTY_PERIOD_NOT_VALID);

    // check(row, error, !row.is_indent, 'is_indent', ERR_IS_INDENT_EMPTY);
    check(row, error, row.is_indent === 'Ya' && !row.indent_period, 'indent_period', ERR_INDENT_PERIOD_EMPTY);
    check(row, error, row.is_indent === 'Ya' && !row.indent_limit, 'indent_limit', ERR_INDENT_LIMIT_EMPTY);
    check(row, error, row.is_indent === 'Ya' && (typeof row.indent_limit === 'string' || row.indent_limit <= 0 || !Number.isInteger(row.indent_limit)), 'indent_limit', ERR_INDENT_LIMIT_MUST_INTEGER);

    // Tier Validation
    const isTierValid = Helper.tierValidation({
        tier_min_qty_1: parseInt(row.tier_min_qty_1) || null,
        tier_min_qty_2: parseInt(row.tier_min_qty_2) || null,
        tier_min_qty_3: parseInt(row.tier_min_qty_3) || null,
        tier_cogs_price_1: parseInt(row.tier_cogs_price_1) || null,
        tier_cogs_price_2: parseInt(row.tier_cogs_price_2) || null,
        tier_cogs_price_3: parseInt(row.tier_cogs_price_3) || null
    }, false);

    if (!isTierValid) {
        error.push(ERR_TIER_NOT_VALID);
    }

    check(row, error, row.tier_cogs_price_2 === null && row.tier_min_qty_2 !== null, 'tier_min_qty_2', ERR_TIER_COGS_2_EMPTY);
    check(row, error, row.tier_cogs_price_2 !== null && row.tier_min_qty_2 === null, 'tier_cogs_price_2', ERR_TIER_QTY_2_EMPTY);
    check(row, error, row.tier_cogs_price_3 === null && row.tier_min_qty_3 !== null, 'tier_min_qty_3', ERR_TIER_COGS_3_EMPTY);
    check(row, error, row.tier_cogs_price_3 !== null && row.tier_min_qty_3 === null, 'tier_cogs_price_3', ERR_TIER_QTY_3_EMPTY);


    // Checking tier 2 and 3
    check(row, error, row.tier_min_qty_2 !== null && row.tier_min_qty_1 > row.tier_min_qty_2, 'tier_min_qty_2', ERR_TIER_QTY_2_SMALLER);
    check(row, error, row.tier_min_qty_3 !== null && row.tier_min_qty_1 > row.tier_min_qty_3, 'tier_min_qty_3', ERR_TIER_QTY_3_SMALLER);
    check(row, error, row.tier_min_qty_3 !== null && row.tier_min_qty_2 > row.tier_min_qty_3, 'tier_min_qty_3', ERR_TIER_QTY_3_SMALLER);
    // check(row, error, row.tier_min_qty_1 === null && row.tier_min_qty_2, 'tier_min_qty_2', ERR_TIER_QTY_1_EMPTY);
    // check(row, error, row.tier_min_qty_1 === null && row.tier_min_qty_3, 'tier_min_qty_3', ERR_TIER_QTY_1_EMPTY);
    check(row, error, row.tier_min_qty_2 === null && row.tier_min_qty_3, 'tier_min_qty_3', ERR_TIER_QTY_2_EMPTY);

    check(row, error, row.tier_cogs_price_1 < row.tier_cogs_price_2, 'tier_cogs_price_2', ERR_TIER_COGS_2_BIGGER);
    check(row, error, row.tier_cogs_price_1 < row.tier_cogs_price_3, 'tier_cogs_price_3', ERR_TIER_COGS_3_BIGGER);
    check(row, error, row.tier_cogs_price_2 < row.tier_cogs_price_3, 'tier_cogs_price_3', ERR_TIER_COGS_3_BIGGER);
    // check(row, error, row.tier_cogs_price_1 === null && row.tier_cogs_price_2, 'tier_cogs_price_2', ERR_TIER_COGS_1_EMPTY);
    // check(row, error, row.tier_cogs_price_1 === null && row.tier_cogs_price_3, 'tier_cogs_price_3', ERR_TIER_COGS_1_EMPTY);
    check(row, error, row.tier_cogs_price_2 === null && row.tier_cogs_price_3, 'tier_cogs_price_3', ERR_TIER_COGS_2_EMPTY);

    return {
        error,
        status: error.length === 0,
        row
    };
};

const getBreakdownCategory = function (categories) {
    return {
        c0: categories ? categories.category0_id : 0,
        c1: categories ? categories.category1_id : 0,
        c2: categories ? categories.category2_id : 0,
        c3: categories ? categories.category3_id : 0
    };
};

const generateRandomIndex = function () {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const transformProduct = function (row, list, categories, context, warehouse) {
    const contextOrgId = context.user.customer.organization_id;
    const contextId = context.user.customer.person_id;
    const contextEmail = context.user.username;
    const contextName = `${context.user.first_name} ${context.user.last_name}`;
    let brand;
    let brandId;
    let brandImage = '';
    if (row.brand.match(/\bBR-/)) {
        brandId = Number(row.brand.slice(3));
        const brandIndex = _.sortedIndexOf(list.brand_id, Number(brandId));
        brand = list.brand[brandIndex];
        brandImage = brand.image_url === null ? '' : brand.image_url;
    } else {
        brandId = 0;
    }
    const uom = findIdByValue(list.uom, row.uom);
    const stockingUom = findIdByValue(list.stocking_uom, row.stocking_uom);

    const productCategory = getBreakdownCategory(categories);

    // const id = Number(new Date().getTime() + Math.random()).toFixed(0);
    return {
        id: uuid.v4(),
        type: 'new',
        error: row.error,
        payload: {
            name: row.product_name,
            brand_id: brandId,
            brand_name: brandId === 0 ? row.brand : brand.name,
            category_id: categories ? categories.c3_id : 0,
            category: productCategory,
            brand_image: brandId === 0 ? 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg' : brandImage,
            uom_id: uom,
            stocking_uom_id: stockingUom,
            quantity_stocking_uom: parseInt(row.quantity_stocking_uom, 10),
            manufacturing_number: row.manufacturing_number ? String(row.manufacturing_number) : '',
            brand_status: brandId === 0 ? 'new' : 'clear',
            specification_status: 'completed',
            package_weight: String(row.package_weight),
            package_length: String(row.package_length),
            package_height: String(row.package_height),
            package_width: String(row.package_width),
            package_content: row.package_content,
            barcode: row.barcode_number ? String(row.barcode_number) : '',
            description: row.description,
            variant_count: 0,
            variant_matrix: [],
            specifications: [],
            products: [
                {
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    index: generateRandomIndex(),
                    sku_vendor: String(row.sku_vendor).toUpperCase(),
                    tier_min_qty_1: String(row.tier_min_qty_1),
                    tier_min_qty_2: row.tier_min_qty_2 ? String(row.tier_min_qty_2) : '',
                    tier_min_qty_3: row.tier_min_qty_3 ? String(row.tier_min_qty_3) : '',
                    tier_cogs_price_1: String(Math.floor(row.tier_cogs_price_1)),
                    tier_cogs_price_2: row.tier_cogs_price_2 ? String(Math.floor(row.tier_cogs_price_2)) : '',
                    tier_cogs_price_3: row.tier_cogs_price_3 ? String(Math.floor(row.tier_cogs_price_3)) : '',
                    stock: row.stock || 0,
                    warehouse_id: warehouse.id,
                    location_label: warehouse.name,
                    reference_link: [],
                    warranty_option: getWarrantyOption(row.warranty_type),
                    warranty_period: getPeriod(row.warranty_period) || '',
                    warranty_coverage: row.warranty_coverage || '',
                    warranty_limit: row.warranty_limit || '',
                    is_indent: getStatus(row.is_indent),
                    indent_period: row.indent_period || '',
                    indent_limit: row.indent_limit || '',
                    down_payment_type: row.down_payment_type,
                    down_payment_value: row.down_payment_value,
                    is_decimal: row.is_decimal,
                    variant_status: 'complete',
                    primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                    additional_image: []
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: contextOrgId,
        user: {
            id: contextId,
            name: contextName,
            email: contextEmail,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
};

const saveToMongo = function (payload) {
    return PremoderationRepository.insertMany(payload);
};

const schema = Joi.object().keys({
    data: Joi.string().required()
});

const uploadDocument = async function (base64data, fileName) {
    const uploadedFile = await S3Bucket.uploads3({
        fileName,
        base64data
    });

    return uploadedFile;
    // note: not using fs anymore
    // await fs.writeFile(`./temp/${fileName}`, base64data, 'base64', (err) => {
    //     if (err) {
    //         console.log("err", err);
    //         throw BizzyError.BadRequest('Upload failed, your file may be corrupt or not valid with bizzy template');
    //     }
    // });
};

const generateStream = async function (base64data) {
    const documentStream = new Stream.Readable();
    const file = Buffer.from(base64data, 'base64');
    documentStream.push(file); // file is ArrayBuffer variable
    documentStream.push(null);

    return documentStream;
};

exports.uploadSku = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const {
        body: input
    } = data;

    try {
        await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const base64data = input.data;
    const d = new Date();
    const prefix = d.getTime();
    const vendorId = context.user.customer.organization_id;
    const fileName = `BULKUPLOAD_VENDOR_${vendorId}_${prefix}.xlsx`;
    let documentStream = {};
    let s3File = {};

    let listBrand;
    let listUom;
    let listStockingUom;
    let listCategory;
    let listProductVendor;
    let primaryWarehouse = null;

    let productList = [];
    const acceptedRecord = [];
    const rejectedRecord = [];
    let records = [];

    [s3File, listBrand, listUom, listStockingUom, listCategory, listProductVendor] = await Promise.join(
        uploadDocument(base64data, fileName),
        BrandRepository.findAll(),
        UomRepository.findAll(),
        StockingUomRepository.findAll(),
        CategoryRepository.getFullCategory(),
        (async () => {
            try {
                documentStream = await generateStream(base64data);
                records = await ExcelAdapter.readDocumentForBulkUpload(documentStream);
                const listSkuVendorInDocument = records.filter(el => String(el.sku_vendor) !== null).map(el => String(el.sku_vendor));

                return ProductVendorRepository.findSkuAllWithVariant({
                    vendor_id: vendorId,
                    sku_vendor: listSkuVendorInDocument
                });
            } catch (err) {
                throw BizzyError.BadRequest(err.message);
            }
        })(),
        (async () => {
            try {
                const getWarehouse = await WebhookRepository.findPrimaryWarehouse(context);
                primaryWarehouse = {
                    id: getWarehouse.data.id,
                    name: getWarehouse.data.warehouse_address.name
                };
            } catch (err) {
                throw BizzyError.BadRequest(`Gagal Mengambil Warehouse, ${err}`);
            }
        })()
    );

    listBrand = Helper.parseDataObject(listBrand);
    const listBrandId = listBrand.map(el => Number(el.id));

    listUom = Helper.parseDataObject(listUom);
    const listUomName = listUom.map(el => el.name);

    listProductVendor = Helper.parseDataObject(listProductVendor);
    const listSkuVendor = listProductVendor.filter(el => el.sku_vendor !== null).map(el => String(el.sku_vendor).trim().toUpperCase());

    listStockingUom = Helper.parseDataObject(listStockingUom);
    const listStockingUomName = listStockingUom.map(el => el.name.replace(new RegExp(String.fromCharCode(160), 'g'), ' '));

    listCategory = Helper.parseDataObject(listCategory);
    const listUnspsc = listCategory.map(el => String(el.unspsc));
    const categoriesFull = listCategory.map((element) => {
        element.category0_id = element.c0_id;
        element.category1_id = element.c1_id;
        element.category2_id = element.c2_id;
        element.category3_id = element.c3_id;
        return element;
    });

    const skuVendor = listProductVendor.filter(el => el.sku_vendor !== null).map(el => ({
        sku_vendor: String(el.sku_vendor).trim().toUpperCase(),
        sku_bizzy: el.ProductVariant.sku
    }));

    const validationKey = {
        brand: listBrand,
        brand_id: listBrandId,
        uom: listUom,
        uom_name: listUomName,
        stocking_uom: listStockingUom,
        stocking_uom_name: listStockingUomName,
        category: categoriesFull,
        unspsc: listUnspsc,
        sku_vendor: listSkuVendor,
        sku_vendor_ondoc: [],
        registered_sku: skuVendor
    };

    const skuvendor = [];
    records.forEach((val) => {
        const sku = String(val.sku_vendor).trim().toUpperCase();
        skuvendor.push(sku);
        const analyze = productValidation(val, validationKey);
        validationKey.sku_vendor_ondoc.push(sku);
        val.error = analyze.error;
        if (!analyze.status) {
            rejectedRecord.push(val);
        }
        acceptedRecord.push(val);
    });

    const tableHeaders = Helper.getHeadersExcel();

    if (rejectedRecord.length > 0) {
        // Reject Add Product
        return {
            headers: tableHeaders,
            success: false,
            data: acceptedRecord,
            total_process: rejectedRecord.length,
            message: `${rejectedRecord.length} Sku tidak valid`
        };
    }

    try {
        productList = acceptedRecord.map((item) => {
            const unspscIndex = _.sortedIndexOf(listUnspsc, String(item.unspsc));

            const categoryc3 = unspscIndex === -1 ? null : validationKey.category[unspscIndex];
            let categories = null;
            if (categoryc3) {
                categories = listCategory[unspscIndex];
            }
            return transformProduct(item, validationKey, categories, context, primaryWarehouse);
        });

        // Insert to Premoderation
        await saveToMongo(productList);

        const action = 'BULK_ADDPRODUCT';
        const payload = Transformer.generetaLog(action, {
            url: s3File.Location,
            file_name: fileName
        }, context);
        await ProductUploadLogRepository.insertOne(payload);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    return {
        success: true,
        total_process: productList.length,
        message: `${productList.length} Sku berhasil ditambahkan ke premoderation`
    };
};

module.exports = exports;
