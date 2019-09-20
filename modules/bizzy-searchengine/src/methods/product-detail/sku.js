'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupRepository = require('../../repositories/product_group');
const CustomeRepository = require('../../repositories/raw_query');
const UomRepository = require('../../repositories/uom');
const BrandRepository = require('../../repositories/brand');
const StockingUomRepository = require('../../repositories/stocking_uom');
const CategoryRepository = require('../../repositories/category');
const ProductGroupAttributeRepository = require('../../repositories/product_group_attribute');
const GeneralRepository = require('../../repositories/general');
const Transformer = require('../../transformers/product-detail/sku');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    sku: Joi.string().required()
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

const getAdditionalData = async function (result) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    const categoryObject = await CustomeRepository.findAllCategoryId(productGroup.category_id);
    const category = categoryObject[0];
    [
        result.payload,
        result.vendors,
        result.brand,
        result.uom,
        result.stocking_uom,
        result.c0,
        result.c1,
        result.c2,
        result.c3,
        result.product_specifications
    ] = await Promise.join(
        productGroup,
        ProductVendorRepository.findByVariant(result.id),
        BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id),
        CategoryRepository.findOne({ id: parseInt(category.c0) }),
        CategoryRepository.findOne({ id: parseInt(category.c1) }),
        CategoryRepository.findOne({ id: parseInt(category.c2) }),
        CategoryRepository.findOne({ id: parseInt(category.c3) }),
        ProductGroupAttributeRepository.findAll({ product_group_id: parseInt(result.product_group_id), is_variant: 0 })
    );
    return result;
};

exports.getProductDetailBySku = async function (data, context) {
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        is_active: 1,
        sku: input.sku
    };
    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Product SKU tidak ditemukan');
    }

    let response = {};
    response = await getAdditionalData(Helper.parseDataObject(result));
    response.variant_attribute = await getVariantAttribute(result);

    return {
        data: Transformer.item(response)
    };
};

module.exports = exports;
