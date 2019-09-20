'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Excel = require('exceljs');
const Authorization = require('../../utils/authorization');
const ProductVendorAdapter = require('../../utils/adapter/product_vendor');
const WebhookRepository = require('../../repositories/webhook');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductUploadLogRepository = require('../../repositories/product_upload_log');
const Helper = require('../../utils/helper');
const Joi = require('joi');
const S3Bucket = require('../../utils/s3_bucket');
const Stream = require('stream');
const _ = require('lodash');
const Transformer = require('../../transformers/products/download_template');
// const ZLib = Promise.promisifyAll(require('zlib'));

// const compressObjectToString = function compressObjectToString(input) {
//     return ZLib.gzipSync(JSON.stringify(input)).toString('base64');
// };

const convertRowObject = function (row, channelType) {
    const key = [
        '',
        'no',
        'sku_bizzy',
        'product_name',
        'brand',
        'variant1',
        'variant2',
        'sku_vendor',
        'tier_min_qty_1',
        'tier_min_qty_2',
        'tier_min_qty_3',
        'tier_cogs_price_1',
        'tier_cogs_price_2',
        'tier_cogs_price_3',
        // 'tier_min_qty_for_bizzy', (uncomment this line to enable contract)
        // 'tier_price_for_bizzy', (uncomment this line to enable contract)
        'stock',
        'is_decimal',
        'warranty_type',
        'warranty_period',
        'warranty_limit',
        'warranty_coverage',
        'indent_period',
        'indent_limit',
        'down_payment_type',
        'down_payment_value',
        'is_active'
    ];

    // (uncomment this line to enable contract)
    // if (channelType === 'MP') {
    //     key.splice(key.indexOf('tier_min_qty_for_bizzy'), 1);
    //     key.splice(key.indexOf('tier_price_for_bizzy'), 1);
    // }

    const keyIntValue = [
        'tier_min_qty_1',
        'tier_min_qty_2',
        'tier_min_qty_3',
        'tier_cogs_price_1',
        'tier_cogs_price_2',
        'tier_cogs_price_3',
        'stock'
    ];

    const objectResult = {};
    for (let i = 1; i < row.length; i++) {
        let el = row[i];
        if (_.indexOf(keyIntValue, key[i]) !== -1 && el !== null) {
            el = Number(el) || el;
            objectResult[key[i]] = el;
        } else {
            objectResult[key[i]] = el || null;
        }
    }
    return objectResult;
};

const uploadDocument = async function (base64data, fileName) {
    const uploadedFile = await S3Bucket.uploads3({
        fileName,
        base64data
    });

    return uploadedFile;
};

const getProductBySku = function (skus, sku) {
    let getSku = null;
    skus.forEach((el) => {
        if (el.sku === sku) getSku = el;
    });
    return getSku;
};

const getWarrantyOption = function (value) {
    const warrantyOption = {
        'Tidak bergaransi': 'no_warranty',
        Resmi: 'official_warranty',
        Distributor: 'distributor',
        International: 'international',
        Toko: 'warranty_shop'
    };

    return warrantyOption[value] || null;
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

const searchKey = function (arr, key) {
    if (arr.indexOf(key) === -1) {
        return false;
    }
    return true;
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
exports.validateSkuVendorBulkUpdate = validateSkuVendor;

// if condition is true, push error
const check = function (row, error, condition, key, message) {
    if (condition && !_.has(row[key], 'msg') && key) {
        row[key] = { val: row[key], msg: message };
        error.push(message);
    }
};

const productValidation = async function (rows, listSkuVendor, warehouse, channelType, keys) {
    const error = [];
    let productKey = null;

    const warrantyOptionId = [
        'Tidak bergaransi',
        'Resmi',
        'Distributor',
        'Toko',
        'International'
    ];

    const periodId = ['Hari', 'Minggu', 'Bulan', 'Tahun', 'Selamanya'];
    // const ERR_SKU_BIZZY_NOT_VALID = 'Sku ID tidak dapat dirubah';
    // const ERR_SKU_NAME_NOT_VALID = 'Nama Produk tidak dapat dirubah';
    // const ERR_VARIANT_NOT_VALID = 'Nilai Varian Produk tidak dapat dirubah';
    // const ERR_BRAND_NOT_VALID = 'Merek tidak dapat dirubah';
    const ERR_PRODUCT_NOT_VALID = 'Produk tidak terdaftar pada katalog bizzy';
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
    // const ERR_STOCK_EMPTY = 'Nilai Stok kosong';
    const ERR_WARRANTY_TYPE_EMPTY = 'Tipe Garansi kosong';
    const ERR_WARRANTY_TYPE_NOT_VALID = 'Tipe Garansi tidak valid';
    const ERR_WARRANTY_PERIOD_EMPTY = 'Periode Garansi kosong';
    const ERR_WARRANTY_PERIOD_NOT_VALID = 'Periode Garansi tidak valid';
    const ERR_WARRANTY_LIMIT_EMPTY = 'Lama Garansi kosong';
    const ERR_INDENT_PERIOD_EMPTY = 'Periode Inden kosong';
    const ERR_INDENT_PERIOD_NOT_VALID = 'Periode Inden tidak valid';
    const ERR_INDENT_LIMIT_EMPTY = 'Waktu Proses Inden kosong';
    const ERR_SKU_VENDOR_EMPTY = 'Sku Vendor kosong';
    const ERR_SKU_VENDOR_NOT_VALID = 'Sku Vendor tidak valid';
    const ERR_SKU_VENDOR_DUPLICATE = 'Duplikasi Sku Vendor';
    const ERR_STOCK_MUST_INTEGER = 'Stock harus berupa angka';
    const ERR_TIER_QTY_1_EMPTY_MUST_INTEGER = 'Nilai Tier 1 harus berupa angka dan lebih dari 0';
    const ERR_TIER_QTY_2_EMPTY_MUST_INTEGER = 'Nilai Tier 2 harus berupa angka dan lebih dari 0';
    const ERR_TIER_QTY_3_EMPTY_MUST_INTEGER = 'Nilai Tier 3 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_1_EMPTY_MUST_INTEGER = 'Harga Tier 1 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_2_EMPTY_MUST_INTEGER = 'Harga Tier 2 harus berupa angka dan lebih dari 0';
    const ERR_TIER_COGS_3_EMPTY_MUST_INTEGER = 'Harga Tier 3 harus berupa angka dan lebih dari 0';
    const ERR_STATUS_SKU_NOT_VALID = 'Status Sku tidak valid, harus berupa Ya atau Tidak';
    // const ERR_IS_INDENT_NOT_VALID = 'Status Inden tidak valid, harus berupa Ya atau Tidak';
    const ERR_WARRANTY_LIMIT_EMPTY_MUST_INTEGER = 'Lama Garansi harus berupa angka dan lebih dari 0';
    const ERR_INDENT_LIMIT_EMPTY_MUST_INTEGER = 'Periode Inden harus berupa angka dan lebih dari 0';

    // // for MP and MIX user
    // const ERR_BIZZY_PRICE_HIGHER_THAN_TIER1_PRICE = 'Harga Bizzy lebih besar dari harga Tier 1';
    // const ERR_BIZZY_PRICE_EMPTY_MUST_INTEGER = 'Harga Bizzy harus berupa angka dan lebih dari 0';
    // const ERR_BIZZY_QTY_EMPTY_MUST_INTEGER = 'Nilai Tier Bizzy harus berupa angka dan lebih dari 0';
    // const ERR_BIZZY_PRICE_EMPTY = 'Harga Bizzy kosong';
    // const ERR_BIZZY_QTY_EMPTY = 'Nilai Tier Bizzy kosong';

    // const ERR_WARRANTY_COVERAGE_EMPTY = 'Cakupan Garansi kosong';


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

    let indentPeriod = rows.indent_period;
    indentPeriod = (indentPeriod) ? indentPeriod.toLowerCase() : indentPeriod;
    const indentLimit = rows.indent_limit;
    let isDecimal = rows.is_decimal;
    isDecimal = (isDecimal) ? isDecimal.toLowerCase() : isDecimal;
    let downPaymentType = rows.down_payment_type;
    if (downPaymentType) {
        downPaymentType = downPaymentType.toLowerCase();
        downPaymentType = downPaymentType.split(' ')[0];
    }
    const downPaymentValue = parseInt(rows.down_payment_value);

    check(rows, error, ['ya', 'tidak'].indexOf(isDecimal) < 0, 'decimal', ERR_DECIMAL);

    check(rows, error, ['hari', 'minggu'].indexOf(indentPeriod) < 0, 'indent period', ERR_INDENT_PERIOD);
    check(rows, error, (!indentLimit && indentPeriod !== ''), 'vendor', ERR_INDENT_LIMIT_EMPTY2);
    if (!Number.isInteger(indentLimit)) {
        check(rows, error, true, 'indent limit', ERR_INDENT_LIMIT_NUMBER);
    } else if (indentPeriod === 'hari') {
        check(rows, error, indentLimit < 7, 'indent limit', ERR_INDENT_LIMIT_MIN_DAY);
        check(rows, error, indentLimit > 365, 'indent limit', ERR_INDENT_LIMIT_MAX_DAY);
    } else if (indentPeriod === 'minggu') {
        check(rows, error, indentLimit < 1, 'indent limit', ERR_INDENT_LIMIT_MIN_WEEK);
        check(rows, error, indentLimit > 52, 'indent limit', ERR_INDENT_LIMIT_MAX_WEEK);
    }

    check(rows, error, ['persen', 'nominal'].indexOf(downPaymentType) < 0, 'indent period', ERR_DOWN_PAYMENT_TYPE);
    check(rows, error, (!downPaymentValue && downPaymentType !== ''), 'down payment type', ERR_DOWN_PAYMENT_VALUE_EMPTY);
    if (!Number.isInteger(downPaymentValue)) {
        check(rows, error, true, 'down payment value', ERR_DOWN_PAYMENT_VALUE_NUMBER);
    } else if (downPaymentType === 'persen') {
        check(rows, error, downPaymentValue < 1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MIN_PERCENT);
        check(rows, error, downPaymentValue > 99, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MAX_PERCENT);
    } else if (downPaymentType === 'nominal') {
        check(rows, error, downPaymentValue < 1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_MIN_NOMINAL);

        if (!rows.tier_cogs_price_1 && !rows.tier_cogs_price_2 && !rows.tier_cogs_price_3) {
            check(rows, error, downPaymentValue >= rows.tier_cogs_price_3, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_3);
        } else if (!rows.tier_cogs_price_1 && !rows.tier_cogs_price_2) {
            check(rows, error, downPaymentValue >= rows.tier_cogs_price_2, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_2);
        } else if (!rows.tier_cogs_price_1) {
            check(rows, error, downPaymentValue >= rows.tier_cogs_price_1, 'down payment value', ERR_DOWN_PAYMENT_VALUE_OVER_1);
        }
    }


    // How to compare existing value to new one
    const getProduct = getProductBySku(listSkuVendor, rows.sku_bizzy);

    // If SKU not found in product variant
    if (getProduct) {
        productKey = {
            product_variant_id: getProduct.id,
            sku_bizzy: getProduct.sku,
            warehouse_id: warehouse.id // default
        };
    } else {
        rows.sku_bizzy = { val: rows.sku_bizzy, msg: ERR_PRODUCT_NOT_VALID };
        error.push(ERR_PRODUCT_NOT_VALID);
    }

    check(rows, error, rows.stock !== null && (typeof rows.stock === 'string' || rows.stock < 0 || !Number.isInteger(rows.stock)), 'stock', ERR_STOCK_MUST_INTEGER);
    check(rows, error, (rows.tier_min_qty_1 && (typeof rows.tier_min_qty_1 === 'string' || rows.tier_min_qty_1 <= 0 || !Number.isInteger(rows.tier_min_qty_1))), 'tier_min_qty_1', ERR_TIER_QTY_1_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.tier_min_qty_2 && (typeof rows.tier_min_qty_2 === 'string' || rows.tier_min_qty_2 <= 0 || !Number.isInteger(rows.tier_min_qty_2))), 'tier_min_qty_2', ERR_TIER_QTY_2_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.tier_min_qty_3 && (typeof rows.tier_min_qty_3 === 'string' || rows.tier_min_qty_3 <= 0 || !Number.isInteger(rows.tier_min_qty_3))), 'tier_min_qty_3', ERR_TIER_QTY_3_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.tier_cogs_price_1 && (typeof rows.tier_cogs_price_1 === 'string' || rows.tier_cogs_price_1 <= 0)), 'tier_cogs_price_1', ERR_TIER_COGS_1_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.tier_cogs_price_2 && (typeof rows.tier_cogs_price_2 === 'string' || rows.tier_cogs_price_2 <= 0)), 'tier_cogs_price_2', ERR_TIER_COGS_2_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.tier_cogs_price_3 && (typeof rows.tier_cogs_price_3 === 'string' || rows.tier_cogs_price_3 <= 0)), 'tier_cogs_price_3', ERR_TIER_COGS_3_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.warranty_limit && rows.warranty_type !== 'Tidak bergaransi' && rows.warranty_type !== 'Selamanya' && (typeof rows.warranty_limit === 'string' || rows.warranty_limit <= 0 || !Number.isInteger(rows.warranty_limit))), 'warranty_limit', ERR_WARRANTY_LIMIT_EMPTY_MUST_INTEGER);
    check(rows, error, (rows.indent_limit && rows.is_indent === 'Ya' && (typeof rows.indent_limit === 'string' || rows.indent_limit <= 0 || !Number.isInteger(rows.indent_limit))), 'indent_limit', ERR_INDENT_LIMIT_EMPTY_MUST_INTEGER);

    check(rows, error, rows.tier_min_qty_2 !== null && (rows.tier_min_qty_1 > rows.tier_min_qty_2), 'tier_min_qty_2', ERR_TIER_QTY_2_SMALLER);
    check(rows, error, rows.tier_min_qty_3 !== null && (rows.tier_min_qty_1 > rows.tier_min_qty_3), 'tier_min_qty_3', ERR_TIER_QTY_3_SMALLER);
    check(rows, error, rows.tier_min_qty_3 !== null && (rows.tier_min_qty_2 > rows.tier_min_qty_3), 'tier_min_qty_3', ERR_TIER_QTY_3_SMALLER);

    check(rows, error, rows.sku_vendor == null, 'sku_vendor', ERR_SKU_VENDOR_EMPTY);
    check(rows, error, String(rows.sku_vendor).length > 20, 'sku_vendor', ERR_SKU_VENDOR_NOT_VALID);
    check(rows, error, !Helper.isAlphaNumeric(String(rows.sku_vendor).trim()), 'sku_vendor', ERR_SKU_VENDOR_NOT_VALID);
    check(rows, error, !validateSkuVendor({ sku_bizzy: rows.sku_bizzy, sku_vendor: String(rows.sku_vendor).trim().toUpperCase() }, keys.registered_sku), 'sku_vendor', ERR_SKU_VENDOR_DUPLICATE);
    check(rows, error, searchKey(keys.sku_vendor_ondoc, String(rows.sku_vendor).trim().toUpperCase()), 'sku_vendor', ERR_SKU_VENDOR_DUPLICATE);

    check(rows, error, rows.tier_min_qty_1 == null, 'tier_min_qty_1', ERR_TIER_QTY_1_EMPTY);
    check(rows, error, rows.tier_cogs_price_2 && rows.tier_min_qty_2 === null, 'tier_min_qty_2', ERR_TIER_QTY_2_EMPTY);
    check(rows, error, rows.tier_cogs_price_3 && rows.tier_min_qty_3 === null, 'tier_min_qty_3', ERR_TIER_QTY_3_EMPTY);

    check(rows, error, rows.tier_cogs_price_1 && (rows.tier_cogs_price_1 < rows.tier_cogs_price_2), 'tier_cogs_price_2', ERR_TIER_COGS_2_BIGGER);
    check(rows, error, rows.tier_cogs_price_1 && rows.tier_cogs_price_3 && (rows.tier_cogs_price_1 < rows.tier_cogs_price_3), 'tier_cogs_price_3', ERR_TIER_COGS_3_BIGGER);
    check(rows, error, rows.tier_cogs_price_2 && rows.tier_cogs_price_3 && (rows.tier_cogs_price_2 < rows.tier_cogs_price_3), 'tier_cogs_price_3', ERR_TIER_COGS_3_BIGGER);

    check(rows, error, rows.tier_cogs_price_1 == null, 'tier_cogs_price_1', ERR_TIER_COGS_1_EMPTY);
    check(rows, error, rows.tier_min_qty_2 && rows.tier_cogs_price_2 === null, 'tier_cogs_price_2', ERR_TIER_COGS_2_EMPTY);
    check(rows, error, rows.tier_min_qty_3 && rows.tier_cogs_price_3 === null, 'tier_cogs_price_3', ERR_TIER_COGS_3_EMPTY);

    // if (!rows.product_name) error.push(ERR_SKU_NAME_NOT_VALID);
    // if (!rows.sku_bizzy) error.push(ERR_SKU_BIZZY_NOT_VALID);
    // if (!rows.variant1 || !rows.variant2) error.push(ERR_VARIANT_NOT_VALID);
    // check(rows, error, rows.stock === null, 'stock', ERR_STOCK_EMPTY);
    check(rows, error, !rows.warranty_type, 'warranty_type', ERR_WARRANTY_TYPE_EMPTY);
    check(rows, error, rows.warranty_type !== 'Tidak bergaransi' && rows.warranty_period !== 'Selamanya' && !rows.warranty_period, 'warranty_period', ERR_WARRANTY_PERIOD_EMPTY);
    check(rows, error, rows.warranty_type !== 'Tidak bergaransi' && rows.warranty_period !== 'Selamanya' && !rows.warranty_limit, 'warranty_limit', ERR_WARRANTY_LIMIT_EMPTY);
    // if (!rows.warranty_coverage) error.push(ERR_WARRANTY_COVERAGE_EMPTY);
    // if (!rows.brand) error.push(ERR_BRAND_NOT_VALID);

    check(rows, error, rows.is_indent === 'Ya' && !rows.indent_period, 'indent_period', ERR_INDENT_PERIOD_EMPTY);
    check(rows, error, rows.is_indent === 'Ya' && !rows.indent_limit, 'indent_limit', ERR_INDENT_LIMIT_EMPTY);

    check(rows, error, _.indexOf(warrantyOptionId, rows.warranty_type) === -1, 'warranty_type', ERR_WARRANTY_TYPE_NOT_VALID);
    check(rows, error, rows.warranty_type !== 'Tidak bergaransi' && _.indexOf(periodId, rows.warranty_period) === -1, 'warranty_period', ERR_WARRANTY_PERIOD_NOT_VALID);
    check(rows, error, rows.is_indent === 'Ya' && _.indexOf(periodId, rows.indent_period) === -1, 'indent_period', ERR_INDENT_PERIOD_NOT_VALID);
    // check(rows, error, (rows.is_indent !== 'Ya' && rows.is_indent !== 'Tidak'), 'is_indent', ERR_IS_INDENT_NOT_VALID);
    check(rows, error, rows.is_active === '', 'is_active', ERR_STATUS_SKU_NOT_VALID);


    // (uncomment this line to enable contract)
    // if (channelType !== 'MP') {
    //     check(rows, error, rows.tier_price_for_bizzy === null, 'tier_price_for_bizzy', ERR_BIZZY_PRICE_EMPTY);
    //     check(rows, error, rows.tier_min_qty_for_bizzy === null, 'tier_min_qty_for_bizzy', ERR_BIZZY_QTY_EMPTY);
    //     check(rows, error, rows.tier_cogs_price_1 < rows.tier_price_for_bizzy, 'tier_price_for_bizzy', ERR_BIZZY_PRICE_HIGHER_THAN_TIER1_PRICE);
    //     check(rows, error, (rows.tier_min_qty_for_bizzy && (typeof rows.tier_min_qty_for_bizzy === 'string' || rows.tier_min_qty_for_bizzy <= 0 || !Number.isInteger(rows.tier_min_qty_for_bizzy))), 'tier_min_qty_for_bizzy', ERR_BIZZY_QTY_EMPTY_MUST_INTEGER);
    //     check(rows, error, (rows.tier_price_for_bizzy && (typeof rows.tier_price_for_bizzy === 'string' || rows.tier_price_for_bizzy <= 0)), 'tier_price_for_bizzy', ERR_BIZZY_PRICE_EMPTY_MUST_INTEGER);
    // }

    const tierProduct = {
        tier_min_qty_1: parseInt(rows.tier_min_qty_1) || null,
        tier_min_qty_2: parseInt(rows.tier_min_qty_2) || null,
        tier_min_qty_3: parseInt(rows.tier_min_qty_3) || null,
        tier_cogs_price_1: parseInt(rows.tier_cogs_price_1) || null,
        tier_cogs_price_2: parseInt(rows.tier_cogs_price_2) || null,
        tier_cogs_price_3: parseInt(rows.tier_cogs_price_3) || null
    };
    const isTierValid = Helper.tierValidation(tierProduct, false);
    if (!isTierValid) {
        error.push(ERR_TIER_NOT_VALID);
    }

    return {
        error,
        product_key: productKey,
        status: error.length === 0,
        rows
    };
};

const generateStream = async function (base64data) {
    const documentStream = new Stream.Readable();
    const file = Buffer.from(base64data, 'base64');
    documentStream.push(file); // file is ArrayBuffer variable
    documentStream.push(null);

    return documentStream;
};

const getUpdatedField = function (data) {
    const getStatus = el => (String(el).toLowerCase() === 'ya' ? 1 : 0);

    const dataToUpdate = {
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2 || null,
        tier_min_qty_3: data.tier_min_qty_3 || null,
        tier_cogs_price_1: Math.floor(data.tier_cogs_price_1),
        tier_cogs_price_2: Math.floor(data.tier_cogs_price_2) || null,
        tier_cogs_price_3: Math.floor(data.tier_cogs_price_3) || null,
        stock_available: parseInt(data.stock),
        warranty_option: getWarrantyOption(data.warranty_type) || null,
        warranty_period: getPeriod(data.warranty_period) || null,
        warranty_limit: parseInt(data.warranty_limit) || null,
        warranty_coverage: data.warranty_coverage || null,
        is_indent: getStatus(data.is_indent),
        indent_period: getPeriod(data.indent_period) || null,
        indent_limit: data.indent_limit,
        down_payment_type: data.down_payment_type,
        down_payment_value: data.down_payment_value,
        is_decimal: data.is_decimal,
        sku_vendor: String(data.sku_vendor).trim().toUpperCase(),
        is_active: getStatus(data.is_active)
    };
    return dataToUpdate;
};
exports.getUpdatedField = getUpdatedField;

exports.updateBulkSku = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const schema = Joi.object().keys({
        data: Joi.string().required()
    });

    const {
        body: requestBody
    } = data;

    try {
        await Joi.validate(requestBody, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const base64data = requestBody.data;
    const d = new Date();
    const prefix = d.getTime();
    const vendorId = context.user.customer.organization_id;
    const fileName = `BULKUPDATE_VENDOR_${vendorId}_${prefix}.xlsx`;
    const documentStream = await generateStream(base64data);
    const s3File = await uploadDocument(base64data, fileName);

    const getListSkuVendor = await ProductVendorAdapter.findAllProductVendorWithDetail({
        vendor_id: vendorId
    });

    const productVendor = await ProductVendorRepository.findAllWithVariant({
        vendor_id: vendorId
    });

    const skuVendor = productVendor.filter(el => el.sku_vendor !== null).map(el => ({
        sku_vendor: String(el.sku_vendor).trim().toUpperCase(),
        sku_bizzy: el.ProductVariant.sku
    }));
    // const getListSkuVendor = await ProductVendorRepository.findAll({
    //     vendor_id: vendorId,
    //     is_active: 1
    // });

    const listSkuVendor = Helper.parseDataObject(getListSkuVendor);
    const workbook = new Excel.Workbook();
    let worksheet = null;

    const acceptedRecord = [];
    const rejectedRecord = [];
    let primaryWarehouse = null;

    try {
        const getWarehouse = await WebhookRepository.findPrimaryWarehouse(context);
        primaryWarehouse = {
            id: getWarehouse.data.id,
            name: getWarehouse.data.warehouse_address.name
        };
    } catch (err) {
        throw BizzyError.BadRequest(`Gagal Mengambil Warehouse, ${err}`);
    }

    // const contractPrices = []; (uncomment this line to enable contract)
    const channelType = context.user.customer.channel_type;

    const validationKey = {
        registered_sku: skuVendor,
        sku_vendor_ondoc: []
    };

    // return true;
    const skuvendor = [];

    await workbook.xlsx.read(documentStream)
        .then(async (res) => {
            worksheet = workbook.getWorksheet(1);
            const cellHeaders = worksheet.getRow(1).values;
            
            if (cellHeaders[1] !== 'Daftar Produk Dijual' || worksheet.name !== 'Product') {
                throw BizzyError.UnprocessableEntity('Your template is not valid.');
            }

            let startRow = 3;
            for (let i = 0; i < 99999999; i++) {
                const rowValues = worksheet.getRow(startRow).values;
                const val = convertRowObject(rowValues, channelType);
                const sku = String(val.sku_vendor).trim().toUpperCase();
                if (val.product_name === undefined) break;
                skuvendor.push(sku);
                // eslint-disable-next-line no-await-in-loop
                const analyze = await productValidation(val, listSkuVendor, primaryWarehouse, channelType, validationKey);
                validationKey.sku_vendor_ondoc.push(sku);
                val.error = analyze.error;
                val.product_key = analyze.product_key;
                if (!analyze.status) rejectedRecord.push(val);
                acceptedRecord.push(val);
                startRow += 1;
            }
        }).catch((err) => {
            throw BizzyError.BadRequest('Upload failed, your file may be corrupt or not valid with bizzy template');
        });

    if (skuvendor.length > 2000) {
        throw BizzyError.BadRequest(`Maaf, jumlah produk yang anda mencoba ubah (${skuvendor.length} produk) ‌melebihi batas 2000 jumlah produk`);
    }

    // const listSku = skuvendor.map(el => String(el).trim().toUpperCase());
    // const isSkuValid = Helper.checkDuplicateArray(listSku);
    // if (!isSkuValid.isValid) throw BizzyError.BadRequest(`Sku Vendor ${isSkuValid.value} Duplikat`);

    const tableHeaders = Helper.getHeadersExcelEdit(channelType);

    if (rejectedRecord.length > 0) {
        // Reject Update Product
        return {
            headers: tableHeaders,
            success: false,
            data: acceptedRecord,
            total_process: rejectedRecord.length,
            message: `${rejectedRecord.length} Sku tidak valid`
        };
    }

    try {
        await DBContext.startTransaction();
        const models = await DBContext.getInstance();
        const transaction = models.db_transaction;
        await Promise.map(acceptedRecord, async (item, index) => {
            const dataToUpdate = getUpdatedField(item);

            // get product vendor id
            const pvendor = await ProductVendorRepository.findOneDetail({
                vendor_id: vendorId,
                product_variant_id: item.product_key.product_variant_id,
                warehouse_id: item.product_key.warehouse_id
            });

            if (!pvendor) {
                throw Error('Produk tidak ditemukan');
            }
            acceptedRecord[index].pvendor = pvendor;
            acceptedRecord[index].datatoupdate = dataToUpdate;

            await ProductVendorRepository.updateSku({
                id: pvendor.id
            }, dataToUpdate, models, transaction);
        }, { concurrency: 500 });
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err.message);
    }

    // Commit State Changed
    await DBContext.commit();

    await Promise.map(acceptedRecord, async (item) => {
        await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_variant',
                    id: item.product_key.product_variant_id,
                    data: {
                        stock_available: item.datatoupdate.stock_available,
                        product_vendor_id: item.pvendor.id
                    }
                }
            }
        });
    }, { concurrency: 500 });

    const action = 'BULK_EDITPRODUCT';
    const payload = Transformer.generetaLog(action, {
        url: s3File.Location,
        file_name: fileName
    }, context);

    await ProductUploadLogRepository.insertOne(payload);

    // let response = {}; (uncomment this line to enable contract)

    // (uncomment this line to enable contract)
    // if (context.user.customer.channel_type !== 'MP') {
    //     try {
    //         const ctx = { user: { scope: 'employee' } };
    //         const compressed = compressObjectToString(contractPrices);
    //         response = await updateQrMultiplePriceRuleItem(vendorId, compressed, ctx);
    //     } catch (err) {
    //         throw BizzyError.BadRequest(`Gagal Mengambil Sku Vendor, ${err}`);
    //     }
    // }

    return {
        success: true,
        // contracts: response, (uncomment this line to enable contract)
        total_process: acceptedRecord.length,
        message: `${acceptedRecord.length} SKU telah dirubah`
    };
};

module.exports = exports;
