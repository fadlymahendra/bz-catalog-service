'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupRepository = require('../../repositories/product_group');
const StockingUomRepository = require('../../repositories/stocking_uom');
const UomRepository = require('../../repositories/uom');
const BrandRepository = require('../../repositories/brand');
const CustomeRepository = require('../../repositories/raw_query');
const CategoryRepository = require('../../repositories/category');
const SyncServiceRepository = require('../../repositories/sync_service');
const Authorization = require('../../utils/authorization');
const Helper = require('../../utils/helper');
const Transformer = require('../../transformers/sku-managements/detail_ecart');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

const getVendorInformation = async function (vendor) {
    const ids = vendor.map(row => row.vendor_id);
    return SyncServiceRepository.findVendorName(ids.join(','));
};

const getAdditionalData = async function (result) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    // const categoryObject = await CustomeRepository.findAllCategoryId(productGroup.category_id);
    // const category = categoryObject[0];
    [
        result.payload,
        result.vendors,
        // result.brand,
        result.uom,
        result.stocking_uom
        // result.c0,
        // result.c1,
        // result.c2,
        // result.c3
    ] = await Promise.join(
        productGroup,
        ProductVendorRepository.findByVariant(result.id),
        // BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id)
        // CategoryRepository.findOne({ id: category.c0 }),
        // CategoryRepository.findOne({ id: category.c1 }),
        // CategoryRepository.findOne({ id: category.c2 }),
        // CategoryRepository.findOne({ id: category.c3 })
    );
    return result;
};

exports.getSkuManagementBySku = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        sku: input.id
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Sku tidak ditemukan');
    }

    let response = {};
    response = await getAdditionalData(Helper.parseDataObject(result));
    response.vendor_information = await getVendorInformation(response.vendors);

    return Transformer.item(response);
};

module.exports = exports;
