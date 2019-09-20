'use strict';

const Promise = require('bluebird');
const { BizzyService } = require('bizzy-common');
const _ = require('lodash');

const Helper = require('../utils/helper');

/**
 * exports.publishAlgolia = async (data, context) => {};
 */

exports.publishItemERP = async (data, context) => {
    let event = 'move_item';
    const bulkVariant = await Promise.map(data.variants, variant => BizzyService.callSync('bizzy-searchengine', 'getProductDetailByVariantForERP', {
        data: {
            path: {
                id: variant.sku
            }
        }
    }), {
        concurrency: 5
    });

    if (data.mode === 'create') {
        event = 'create_item';
    } else if (data.mode === 'update') {
        event = 'update_item';
    }

    const variantChunk = _.chunk(bulkVariant, 5);

    const publish = await Promise.map(variantChunk, variants => Helper.publishEvent(event, { variants }, context), {
        concurrency: 5
    });

    return publish.length;
};

exports.publishUpsertItemERP = async (data, context) => {
    const [
        insertVariants,
        updateVariants
    ] = await Promise.join(
        Promise.map(data.inserted_variants, variant => BizzyService.callSync('bizzy-searchengine', 'getProductDetailByVariantForERP', {
            data: {
                path: {
                    id: variant.sku
                }
            }
        }), {
            concurrency: 5
        }),
        Promise.map(data.updated_variants, variant => BizzyService.callSync('bizzy-searchengine', 'getProductDetailByVariantForERP', {
            data: {
                path: {
                    id: variant.sku
                }
            }
        }), {
            concurrency: 5
        })
    );

    const publish = await Helper.publishEvent('upsert_item', {
        inserted_variants: insertVariants,
        updated_variants: updateVariants
    }, context);

    return publish;
};

exports.publishUpdateProduct = async (data, context) => {
    const publish = await Helper.publishEvent('product_vendor_update', data, context);
    return publish;
};


module.exports = exports;
