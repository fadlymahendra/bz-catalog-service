'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/product-groups/history');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getProductGroupHistory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let { path: input } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    const wheres = {
        product_group_id: parseInt(input.id),
        'user.type': 'employee'
    };
    const result = await ProductLogRepository.findAll(wheres, 0, 10000);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.list)
    };
};

module.exports = exports;
