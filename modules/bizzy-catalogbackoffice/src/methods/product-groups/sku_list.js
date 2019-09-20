'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/product-groups/sku_list');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getProductGroupSku = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let { path: input } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const paramProductGroupId = parseInt(input.id);
    const wheres = { product_group_id: paramProductGroupId };

    const [
        result1,
        result2
    ] = await Promise.join(
        ProductGroupRepository.findById(paramProductGroupId),
        ProductVariantRepository.findAndCountAll(wheres, 0, 99999999)
    );

    const rows = Helper.parseDataObject(result2.rows);
    return {
        data: {
            product_group_id: result1.id,
            product_name: result1.name,
            skus: rows.map(Transformer.list)
        }
    };
};

module.exports = exports;
