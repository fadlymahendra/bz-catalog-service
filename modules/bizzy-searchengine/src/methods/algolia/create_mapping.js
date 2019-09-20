'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductSkuRepository = require('../../repositories/product_sku_mapping');
const GroupIdRepository = require('../../repositories/product_sku_group');
const ProductVariant = require('../../repositories/product_variant');
const Transformer = require('../../transformers/algolia/create_mapping');
const Algoliasearch = require('algoliasearch');
const _ = require('lodash');
const Helper = require('../../utils/helper');
const ProductGroup = require('../../repositories/product_group');

const schema = Joi.object().keys({
    type: Joi.string().valid('product_group', 'product_variant'),
    id: Joi.required(),
    data: Joi.allow()
});

const algoliaConnect = function () {
    return Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
};

const algoliaMap = async function (data) {
    const algolia = algoliaConnect();
    const index = algolia.initIndex(process.env.ALGOLIA_INDICES_FILTER);

    const finalData = [];

    await Promise.map(data, async (item) => {
        const conditions = {
            product_sku: item
        };

        const grabGroup = await GroupIdRepository.findAll(conditions);

        const grabMap = await ProductSkuRepository.findAllMapping(conditions);

        let grabUomBizzy = await ProductGroup.grabUomBizzy({
            sku: item
        });
        grabUomBizzy = Helper.parseDataObject(grabUomBizzy);

        const uom = grabUomBizzy[0];

        const TransformedData = Transformer.TransformPOC(grabGroup, grabMap, conditions.product_sku, uom);

        finalData.push(TransformedData);
    });

    index.addObjects(finalData);

    return {
        message: 'SUCCESS_UPSERT_ALGOLIA'
    };
};

const grabSku = async function (data) {
    const skuList = [];

    await Promise.map(data, async (item) => {
        const conditions = {
            product_group_id: item
        };

        const skuData = await ProductVariant.findSku(conditions.product_group_id);

        skuList.push(skuData);
    });

    const flattenList = _.flatten(skuList);

    const finalList = [];

    for (let j = 0; j < flattenList.length; j++) {
        finalList.push(flattenList[j].sku);
    }

    return finalList;
};

exports.createMapping = async function (data, context) {
    const { body: input } = data;

    try {
        await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let arrayId = [];
    if (typeof input.id === 'string') {
        arrayId.push(input.id);
    } else {
        arrayId = input.id;
    }

    let inputArray = arrayId;
    if (input.type === 'product_group') {
        inputArray = await grabSku(arrayId);
    }

    const param = {
        product_sku: 1
    };

    const listSku = await ProductSkuRepository.findAllForValidation({}, param);

    const listOfAllSku = [];

    for (let i = 0; i < listSku.length; i++) {
        listOfAllSku.push(listSku[i].product_sku);
    }

    let unknownSku = [];

    unknownSku = inputArray.filter(item => !listOfAllSku.includes(item));

    inputArray = inputArray.filter(item => !unknownSku.includes(item));

    const result = await algoliaMap(inputArray);
    return result;
};

module.exports = exports;
