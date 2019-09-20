'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductVendorRepository = require('../../repositories/product_vendor');
const PremoderationRepository = require('../../repositories/premoderation');
const Transformer = require('../../transformers/summary/product_count');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getSummaryProductCount = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let { path: input } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        vendor_id: parseInt(input.id),
        is_active: 1
    };

    const [countProductVendor, countPremod] = await Promise.all([
        ProductVendorRepository.getCountProductVendor(wheres),
        PremoderationRepository.countAllPremoderationStatus({
            vendor_id: parseInt(input.id)
        })
    ]);

    const result = {
        count_vendor: countProductVendor,
        count_premoderation: countPremod
    };

    return Transformer.item(result);
};

module.exports = exports;
