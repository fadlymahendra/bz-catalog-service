'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupRepository = require('../../repositories/product_group');
const Transformer = require('../../transformers/sku-managements/detail_price_engine');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    sku: Joi.string().required(),
    vendor: Joi.string().required()
});

const getAdditionalData = async function (result, vendorId) {
    const wheres = {
        product_variant_id: result.id,
        vendor_id: vendorId,
        is_active: 1
    };

    [
        result.vendor_information,
        result.product_group
    ] = await Promise.join(
        ProductVendorRepository.findOne(wheres),
        ProductGroupRepository.findByIdWithC3({
            id: result.product_group_id
        })
    );

    return result;
};

exports.getBulkSkuDetailsBySkus = async function (data, context) {
    return Promise.map(data, singleData => exports.getSkuDetailBySku(singleData, context));
};

exports.getSkuDetailBySku = async function (data, context) {
    let {
        query: input
    } = data;
    input.sku = data.path.sku;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.sku;

    const wheres = {
        sku: data.path.sku
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Produk varian tidak ditemukan.');
    }

    let response = {};
    response = await getAdditionalData(Helper.parseDataObject(result), input.vendor);

    return {
        data: Transformer.item(response)
    };
};

const getAdditionalDataPdp = async function (result, vendorId) {
    const wheres = {
        product_variant_id: result.id,
        // vendor_id: vendorId,
        is_active: 1
    };

    [
        result.vendor_information,
        result.product_group
    ] = await Promise.join(
        ProductVendorRepository.findAll(wheres),
        ProductGroupRepository.findByIdWithC3({
            id: result.product_group_id
        })
    );

    return result;
};

exports.getSkuDetailBySkuPdp = async function (data, context) {
    // console.time('getSkuDetailBySku');
    let {
        query: input
    } = data;
    input.sku = data.path.sku;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.sku;

    const wheres = {
        sku: data.path.sku,
        is_active: 1
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Produk varian tidak ditemukan.');
    }

    const vendors = [];
    const response = await getAdditionalDataPdp(Helper.parseDataObject(result), input.vendor);

    response.vendor_information.forEach((item) => {
        const vendor = Transformer.itemBulk(response, item);
        vendors.push(vendor);
    });
    // console.timeEnd('getSkuDetailBySku');

    return vendors;
};

const getAdditionalDataEcart = async function (result, vendorId) {
    const wheres = {
        product_variant_id: result.id,
        vendor_id: vendorId
    };

    [
        result.vendor_information,
        result.product_group
    ] = await Promise.join(
        ProductVendorRepository.findOne(wheres),
        ProductGroupRepository.findByIdWithC3({
            id: result.product_group_id
        })
    );

    return result;
};

exports.getSkuDetailBySkuEcart = async function (data, context) {
    let {
        query: input
    } = data;
    input.sku = data.path.sku;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.sku;

    const wheres = {
        sku: data.path.sku
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Produk varian tidak ditemukan.');
    }

    let response = {};
    response = await getAdditionalDataEcart(Helper.parseDataObject(result), input.vendor);

    return {
        data: Transformer.item(response)
    };
};

module.exports = exports;
