'use strict';


const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Algoliasearch = require('algoliasearch');
const ProductVariantRepository = require('../../repositories/product_variant');
const publisher = require('../../utils/publisher');

const schema = Joi.object().keys({
    type: Joi.string().valid('product_group', 'product_variant'),
    id: Joi.required(),
    data: Joi.allow()
});

const algoliaConnect = function () {
    return Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
};

exports.deleteIndex = async function (data, context) {
    let {
        body: input
    } = data;

    const algolia = algoliaConnect();
    const index = algolia.initIndex(process.env.ALGOLIA_INDICES);

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    if (input.type === 'product_group') {
        const productVariants = await ProductVariantRepository.findAll({ product_group_id: parseInt(input.id) }, 0, 10000);
        if (productVariants.length < 1) {
            throw BizzyError.BadRequest('Data product not found!');
        }
        // const ids = productVariants.map(row => `SKU-${row.id}`);
        // index.deleteObjects(ids);
        const algoliaIds = [];
        const ids = [];

        const { length: varianLength } = productVariants;

        for (let i = 0; i < varianLength; i += 1) {
            algoliaIds.push(`SKU-${productVariants[i].id}`);
            ids.push(productVariants[i].id);
        }

        index.deleteObjects(algoliaIds);
        await publisher.delIndexAlgolia(ids);

        // tambahkan loggin reindex
    } else {
        let productVariant = {};
        if (Helper.isNumber(input.id)) {
            productVariant = await ProductVariantRepository.findById(input.id);
        } else {
            productVariant = await ProductVariantRepository.findBySku(input.id);
        }
        if (!productVariant) {
            throw BizzyError.BadRequest('Data product not found!');
        }
        index.deleteObject(`SKU-${productVariant.id}`);
        await publisher.delIndexAlgolia([productVariant.id]);
        // tambahkan loggin reindex
    }
};

module.exports = exports;
