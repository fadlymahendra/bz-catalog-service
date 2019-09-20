'use strict';

const Promise = require('bluebird');
const ProductSkuRepository = require('../../src/repositories/product_sku');
const ProductVariantRepository = require('../../src/repositories/product_variant');
const Helper = require('../utils/helper');

exports.syncSkuToMongo = async function (data, context) {
    let productVariant = await ProductVariantRepository.findAll();
    productVariant = Helper.parseDataObject(productVariant);
    const listSku = [];
    productVariant.forEach((element) => {
        listSku.push({
            sku: element.sku
        });
    });

    await ProductSkuRepository.deleteAll();
    await ProductSkuRepository.insertMany(listSku);

    return {
        message: 'Sku Inserted to Mongo',
        total: listSku.length
    };
};

module.exports = exports;