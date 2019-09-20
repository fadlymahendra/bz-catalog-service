'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const PremoderationRespository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const ProductGroupRepository = require('../../repositories/product_group');
const CategoryRepository = require('../../repositories/category');
const CustomeRepository = require('../../repositories/raw_query');
const BrandRepository = require('../../repositories/brand');
const StockingUomRepository = require('../../repositories/stocking_uom');
const UomRepository = require('../../repositories/uom');
const Transformer = require('../../transformers/premoderations/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

const PREMODERATION_REVISION_INPROGRESS = 'revision_inprogress';
const PREMODERATION_REJECTED = 'rejected';
const PREMODERATION_DONE = 'done';

const newAttributeCollection = async function (detail, result) {
    [
        result.c0,
        result.c1,
        result.c2,
        result.c3,
        result.brand,
        result.stocking_uom,
        result.uom
    ] = await Promise.join(
        CategoryRepository.findOne({ id: detail.category.c0 }),
        CategoryRepository.findOne({ id: detail.category.c1 }),
        CategoryRepository.findOne({ id: detail.category.c2 }),
        CategoryRepository.findOne({ id: detail.category.c3 }),
        BrandRepository.findById(detail.brand_id),
        StockingUomRepository.findOne({ id: detail.stocking_uom_id }),
        UomRepository.findOne({ id: detail.uom_id })
    );
    result.payload.variant_matrix = JSON.stringify(result.payload.variant_matrix);
    return result;
};

const existingAttributeCollection = async function (detail, result) {
    const pg = await ProductGroupRepository.findById(result.product_group_id);
    const categoryObject = await CustomeRepository.findAllCategoryId(pg.category_id);
    const category = categoryObject[0];
    [
        result.payload.name,
        result.payload.category_id,
        result.payload.category,
        result.payload.brand_id,
        result.payload.uom_id,
        result.payload.stocking_uom_id,
        result.payload.quantity_stocking_uom,
        result.payload.manufacturing_number,
        result.payload.package_weight,
        result.payload.package_length,
        result.payload.package_height,
        result.payload.package_width,
        result.payload.package_content,
        result.payload.barcode,
        result.payload.description,
        result.payload.variant_count,
        result.payload.variant_matrix,
        result.c0,
        result.c1,
        result.c2,
        result.c3,
        result.brand,
        result.stocking_uom,
        result.uom
    ] = await Promise.join(
        pg.name,
        pg.category_id,
        pg.category,
        pg.brand_id,
        pg.uom_id,
        pg.stocking_uom_id,
        pg.quantity_stocking_uom,
        pg.manufacturing_number,
        pg.package_weight,
        pg.package_length,
        pg.package_height,
        pg.package_width,
        pg.package_content,
        pg.barcode,
        pg.description,
        pg.variant_count,
        pg.variant_matrix,
        CategoryRepository.findOne({ id: category.c0 }),
        CategoryRepository.findOne({ id: category.c1 }),
        CategoryRepository.findOne({ id: category.c2 }),
        CategoryRepository.findOne({ id: category.c3 }),
        BrandRepository.findById(pg.brand_id),
        StockingUomRepository.findOne({ id: pg.stocking_uom_id }),
        UomRepository.findOne({ id: pg.uom_id })
    );
    return result;
};

exports.getPremoderationById = async function (data, context) {
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

    const result = await PremoderationRespository.findById(input.id);
    if (!result) {
        throw BizzyError.NotFound('Premoderation Not Found');
    }

    const { payload: detail } = result;
    let response = {};
    if (result.type === 'new') {
        response = await newAttributeCollection(detail, result);
    } else {
        response = await existingAttributeCollection(detail, result);
    }

    const wheres = {
        premoderation_id: input.id,
        current_status: {
            $in: [
                PREMODERATION_DONE,
                PREMODERATION_REJECTED,
                PREMODERATION_REVISION_INPROGRESS
            ]
        }
    };
    const totalHistory = await PremoderationLogRepository.count(wheres);
    response.total_history = totalHistory;

    return Transformer.item(response);
};

module.exports = exports;
