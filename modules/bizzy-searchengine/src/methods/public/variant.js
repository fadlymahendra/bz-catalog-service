'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const BrandRepository = require('../../repositories/brand');
const CategoryRepository = require('../../repositories/category');
const GeneralRepository = require('../../repositories/general');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupAttributeCategory = require('../../repositories/product_group_attribute');
const StockingUomRepository = require('../../repositories/stocking_uom');
const UomRepository = require('../../repositories/uom');
const Helper = require('../../utils/helper');
const Transformer = require('../../transformers/product-detail/variant');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

const getVariantAttribute = async function (variant) {
    let variants = [];
    if (variant.variant_value !== 'NO_VARIANT') {
        const variantValue = JSON.parse(variant.variant_value);

        const variantnya = await GeneralRepository.findAttributeByVariantValue(variantValue);
        variants = variantnya;
    }

    return variants;
};

const getAdditionalDataPdp = async function (result) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    const newCategoryObject = await CategoryRepository.getHierarchicalCategory(productGroup.category_id);
    // console.time('getVendors');
    // const vendors = await ProductVendorRepository.findByVariant(result.id);
    // console.timeEnd('getVendors');
    result.payload = productGroup;
    result.category = newCategoryObject;
    [
        result.brand,
        result.uom,
        result.stocking_uom,
        result.product_specifications
    ] = await Promise.join(
        BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id),
        ProductGroupAttributeCategory.findAll({ product_group_id: parseInt(result.product_group_id), is_variant: 0 })
    );
    return result;
};

exports.getPublicSku = async function (data, context) {
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    let response = {};

    const wheres = {
        is_active: 1,
        sku: input.id
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) throw BizzyError.NotFound('Product SKU tidak ditemukan');
    const vendors = await ProductVendorRepository.findAndCountAll({ product_variant_id: result.id, is_active: 1 });
    if (vendors.count === 0) throw BizzyError.NotFound('Tidak ada vendor untuk product ini');
    response = await getAdditionalDataPdp(Helper.parseDataObject(result));
    response.variant_attribute = await getVariantAttribute(result);
    response.total_offer = vendors.count;
    return Transformer.itemPublic(response);
};

module.exports = exports;
