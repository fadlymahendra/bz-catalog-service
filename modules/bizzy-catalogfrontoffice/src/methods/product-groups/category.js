'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRespository = require('../../repositories/category');
const ProductGroupRespository = require('../../repositories/product_group');
const Transformer = require('../../transformers/product-groups/category');

const schema = Joi.object().keys({
    search: Joi.string().allow('')
});

exports.getProductGroupCategory = async function getProductGroupCategory(data, context) {
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

    const wheres = {};
    wheres.level = { [Op.eq]: 'C0' };
    const result = await CategoryRespository.findAll(wheres, 0, 1000000);
    const rows = Helper.parseDataObject(result);

    const aggregate = await ProductGroupRespository.aggregateByCategory0(input.search);
    const rows2 = Helper.parseDataObject(aggregate);

    return {
        data: Transformer.collection(rows, rows2)
    };
};

module.exports = exports;
