'use strict';

const Promise = require('bluebird');
const Helper = require('../../utils/helper');
const BrandRespository = require('../../repositories/brand');
const ProductVariant = require('../../repositories/product_variant');
const Transformer = require('../../transformers/brands/list');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1),
    is_active: Joi.number().valid(1, 0).default(1)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getBrand = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let wheres = {
        is_active: input.is_active
    };

    if (input.search) {
        wheres = {
            [Op.or]: [
                {
                    id: input.search
                },
                {
                    name: {
                        [Op.like]: `${input.search}%`
                    }
                }
            ]
        };
    }

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    let grabAll = await BrandRespository.findAll(wheres, parseInt(offset), parseInt(limit));

    grabAll = Helper.parseDataObject(grabAll);

    const totalData = await BrandRespository.findAll(wheres);

    await Promise.map(grabAll, async (item, index) => {
        const container = await ProductVariant.grabSkuByBrand(item.id);
        grabAll[index].total_sku = container.length;
    });

    return {
        data: grabAll.map(Transformer.transformBrand),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalData.length,
            total_page: Math.ceil(totalData.length / input.limit)
        }
    };
};

module.exports = exports;
