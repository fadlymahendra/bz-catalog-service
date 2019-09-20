'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductVendorRepository = require('../../repositories/product_vendor');
const Transformer = require('../../transformers/summary/product_stock');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    limit: Joi.number().allow(''),
    sort: Joi.string().valid('stock_desc', 'stock_asc').allow('').default('stock_desc')
});

exports.getSummaryProductStock = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.id;

    const wheres = {
        vendor_id: data.path.id,
        is_active: 1
    };

    const limit = (input.limit === '') ? 5 : input.limit;
    const offset = 0;
    let sort = ['stock_available', 'desc'];

    if (input.sort === 'stock_asc') {
        sort = ['stock_available', 'asc'];
    }

    const result = await ProductVendorRepository.findVariantWithStock(wheres, sort, offset, limit);

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
