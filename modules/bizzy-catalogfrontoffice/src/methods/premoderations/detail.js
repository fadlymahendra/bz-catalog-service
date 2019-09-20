'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVariantRepository = require('../../repositories/product_variant');
const UomRepository = require('../../repositories/uom');
const StockingUomRepository = require('../../repositories/stocking_uom');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/premoderations/detail');
const ProductGroupTransformer = require('../../transformers/product-groups/detail');

const schema = Joi.object().keys({
    id: Joi.number().positive().required(),
    pid: Joi.string().required(),
    include: Joi.string().allow('')
});

exports.getPremoderationById = async function getPremoderationById(data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const { path: input1 } = data;
    const { query: input2 } = data;
    let input = input1;
    input.include = input2.include;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        id: String(input.pid),
        vendor_id: parseInt(input.id)
    };
    const result1 = await PremoderationRepository.findOne(wheres);
    if (!result1) {
        throw BizzyError.NotFound('Premoderation data is not found');
    }

    let uomId;
    let stockingUomId;
    // let brandId;
    let categoryId;
    if (result1.type === 'existing') {
        const result2 = await ProductGroupRepository.findById(result1.product_group_id);
        if (!result2) {
            throw BizzyError.NotFound('Product group data is not found');
        }
        uomId = result2.uom_id;
        stockingUomId = result2.stocking_uom_id;
        // brandId = result2.brand_id;
        categoryId = result2.category_id;

        result1.payload.barcode = result2.barcode;
        result1.payload.manufacturing_number = result2.manufacturing_number;
        result1.payload.quantity_stocking_uom = result2.quantity_stocking_uom;
        result1.payload.category_id = result2.category_id;
        result1.payload.package_weight = result2.package_weight;
        result1.payload.package_length = result2.package_length;
        result1.payload.package_width = result2.package_width;
        result1.payload.package_height = result2.package_height;
        result1.payload.package_content = result2.package_content;
        result1.payload.description = result2.description;
    }
    if (result1.type === 'new') {
        uomId = result1.payload.uom_id;
        stockingUomId = result1.payload.stocking_uom_id;
        // brandId = result1.payload.brand_id;
        categoryId = result1.payload.category_id;
    }

    const [
        getUom,
        getStockingUom,
        // getBrand,
        getCategories,
        getRejectReasons
    ] = await Promise.join(
        UomRepository.findById(uomId),
        StockingUomRepository.findById(stockingUomId),
        // BrandRepository.findById(brandId),
        CategoryRepository.getCategoryBreakdown(categoryId),
        PremoderationLogRepository.findById(input.pid)
    );

    let rejectReasons = {};
    if (input.include === 'reject_reasons') {
        if (getRejectReasons.length !== 0) {
            rejectReasons = getRejectReasons[0].reject_reasons;
        }
    }

    const result = result1;
    const complementary = {
        uom: getUom,
        stocking_uom: getStockingUom,
        // brand: getBrand,
        categories: getCategories,
        reject_reasons: rejectReasons
    };

    if (result1.type === 'existing') {
        let variantImages = await ProductVariantRepository.findAll({
            product_group_id: result.product_group_id
        });

        variantImages = Helper.parseDataObject(variantImages);
        variantImages = ProductGroupTransformer.generateVariantImages(variantImages);
        result.variant_images = variantImages;
    }

    return {
        data: Transformer.item(result, complementary)
    };
};

module.exports = exports;
