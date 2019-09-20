'use strict';

const { DBContext } = require('bizzy-common');
const Promise = require('bluebird');
const ProductVariantRepo = require('../../repositories/product_variant');
const ProductVendorRepo = require('../../repositories/product_vendor');

exports.findProductVendorWithDetail = async function (condition, offset, limit) {
    const models = await DBContext.getInstance();

    const where = {
        is_active: 1
    };
    const productVendorKey = {};

    if (condition.vendor_id) Object.assign(productVendorKey, { vendor_id: condition.vendor_id });

    const include = [
        {
            model: models.ProductVendor,
            where: productVendorKey
        }
    ];
    const order = ['created_at', 'DESC'];
    return ProductVariantRepo.findAll(where, offset, limit, order, include);
};

exports.findAllProductVendorWithDetail = async function (condition, offset, limit) {
    const models = await DBContext.getInstance();

    const where = {
    };
    const productVendorKey = {};

    if (condition.vendor_id) Object.assign(productVendorKey, { vendor_id: condition.vendor_id });

    const include = [
        {
            model: models.ProductVendor,
            where: productVendorKey
        }
    ];
    const order = ['created_at', 'DESC'];
    return ProductVariantRepo.findAll(where, offset, limit, order, include);
};

exports.findOneProductVendorWithDetail = async function (condition) {
    const models = await DBContext.getInstance();
    const wheres = {
        is_active: 1
    };

    const productVariantKey = {
        is_active: 1
    };
    if (condition.vendor_id) {
        Object.assign(wheres, { vendor_id: condition.vendor_id });
    } 
    if (condition.sku) {
        Object.assign(productVariantKey, { sku: condition.sku });
    }

    const include = [
        {
            model: models.ProductVariant,
            where: productVariantKey
        }
    ];
    return ProductVendorRepo.findOneDetail(wheres, include);
};

module.exports = exports;
