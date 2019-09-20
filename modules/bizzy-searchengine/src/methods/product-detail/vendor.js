'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVendorRepository = require('../../repositories/product_vendor');
const SyncRepository = require('../../repositories/sync_service');
const Transformer = require('../../transformers/product-detail/variant');

const schema = Joi.object().keys({
    sku: Joi.string().required(),
    variant_id: Joi.number().required(),
    product_group_id: Joi.number().required()
});

const getVendorInformation = async function (vendor) {
    const ids = vendor.map(row => row.warehouse_id);
    const result = await SyncRepository.findWarehouseWithoutShippingByIds(ids.join(','));
    return result;
};

exports.getVendorDetail = async function (data, context) {
    let { body: input } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    const response = {};

    const wheres = {};
    wheres.sku = input.sku;
    wheres.variant_id = input.variant_id;
    wheres.product_group_id = input.product_group_id;
    const vendors = await ProductVendorRepository.findByVariant(input.variant_id);
    if (!vendors) {
        throw BizzyError.NotFound('Daftar vendor tidak ditemukan');
    }

    response.vendors = vendors;
    response.productGroup = await ProductGroupRepository.findById(input.product_group_id);
    response.vendor_information = await getVendorInformation(response.vendors);
    const result = Transformer.vendorDetail(response, context.user.customer.channel_type);

    return result;
};

module.exports = exports;
