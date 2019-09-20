'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductGroupRepository = require('../../repositories/product_group');
const Authorization = require('../../utils/authorization');
const Transformer = require('../../transformers/product-groups/sku_search');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    search: Joi.string().allow(''),
    sort: Joi.string().default('name_asc'),
    limit: Joi.number().positive().default(20)
});

exports.getProductGroupSkuSearch = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    input['id'] = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let pgWheres = {
        id: input.id,
        is_bulk: 0
    };

    const ProductGroup = await ProductGroupRepository.findOne(pgWheres);
    if (!ProductGroup) {
        throw BizzyError.NotFound('Product Group Not Found');
    }

    let wheres = {};
    const limit = input.limit;
    let sort = [];
    if (input.sort === 'name_desc') {
        sort = ['long_name', 'desc'];
    } else {
        sort = ['long_name', 'asc'];
    }

    if (input.search) {
        wheres = {
            [Op.or]: [
                {
                    long_name: { [Op.like]: `%${input.search}%` }
                },
                {
                    sku: { [Op.like]: `%${input.search}%` }
                }
            ]
        };
    }

    wheres.product_group_id = { [Op.ne]: data.path.id };
    wheres.category_id = ProductGroup.category_id;
    wheres.is_bulk = ProductGroup.is_bulk;
    const result = await ProductVariantRepository.findAllVariant(wheres, sort, limit);

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
