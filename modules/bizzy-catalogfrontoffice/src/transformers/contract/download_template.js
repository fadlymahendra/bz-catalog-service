'use strict';

const _ = require('lodash');
const uuid = require('uuid');

exports.transformPayload = function transformPayload(payload) {
    let responsePayload = payload;

    // Transform shipping into camel case
    let shippingOrigins = _.get(responsePayload, 'shipping_origins', {});
    shippingOrigins = _.mapKeys(shippingOrigins, (v, k) => _.camelCase(k));

    // Transform shipping into camel case
    let shippingDestination = _.get(responsePayload, 'shipping_destinations', {});
    shippingDestination = _.mapKeys(shippingDestination, (v, k) => _.camelCase(k));

    // Set response with shipping
    responsePayload = _.set(responsePayload, 'shipping_origins', shippingOrigins);
    responsePayload = _.set(responsePayload, 'shipping_destinations', shippingDestination);

    // Transform other into camel
    return _.mapKeys(responsePayload, (v, k) => _.camelCase(k));
};

exports.transformTemplatePayload = function transformTemplatePayload(product, shippingPaymentTypeId, shippingDestination, startDate, endDate) {
    const templatePayload = [];

    const convertedStartDate = `${new Date(startDate).getDate()}-${new Date(startDate).getMonth() + 1}-${new Date(startDate).getFullYear()}`;
    const convertedEndDate = `${new Date(endDate).getDate()}-${new Date(endDate).getMonth() + 1}-${new Date(endDate).getFullYear()}`;

    const { shippingHubs, shippingGeographs } = shippingDestination;

    for (let i = 0; i < product.length; i++) {
        // Sku info
        const skuName = _.get(product[i], 'ProductVariant.long_name', 'Nama sku tidak ditemukan');
        const skuNumber = _.get(product[i], 'ProductVariant.sku', 'Nomor sku tidak ditemukan');

        // Tier price info
        const tierPrice1 = _.get(product[i], 'tier_cogs_price_1', false) ? parseInt(_.get(product[i], 'tier_cogs_price_1')) : 1;
        const tierPrice2 = _.get(product[i], 'tier_cogs_price_2', false) ? parseInt(_.get(product[i], 'tier_cogs_price_2')) : null;
        const tierPrice3 = _.get(product[i], 'tier_cogs_price_3', false) ? parseInt(_.get(product[i], 'tier_cogs_price_3')) : null;

        // Tier quantity info
        const tierQty1 = _.get(product[i], 'tier_min_qty_1', false) ? parseInt(_.get(product[i], 'tier_min_qty_1')) : null;
        const tierQty2 = _.get(product[i], 'tier_min_qty_2', false) ? parseInt(_.get(product[i], 'tier_min_qty_2')) : null;
        const tierQty3 = _.get(product[i], 'tier_min_qty_3', false) ? parseInt(_.get(product[i], 'tier_min_qty_3')) : null;

        if (shippingPaymentTypeId === 1) {
            // FRANCO
            // Combine with hub
            for (let a = 0; a < shippingHubs.length; a++) {
                // Generate hub name
                const destination = `${shippingHubs[a].name}-HUB-${shippingHubs[a].hub}`;

                // Set payload
                const payload = {
                    skuName,
                    skuNumber,
                    tierQty1,
                    tierPrice1,
                    tierQty2,
                    tierPrice2,
                    tierQty3,
                    tierPrice3,
                    destination,
                    convertedStartDate,
                    convertedEndDate
                };

                // Push data into payload template
                templatePayload.push(payload);
            }

            // Combine with geograph
            for (let b = 0; b < shippingGeographs.length; b++) {
                // Generate geograph name
                const destination = `${shippingGeographs[b].name}-GEO-${shippingGeographs[b].geograph}`;

                // Set payload
                const payload = {
                    skuName,
                    skuNumber,
                    tierQty1,
                    tierPrice1,
                    tierQty2,
                    tierPrice2,
                    tierQty3,
                    tierPrice3,
                    destination,
                    convertedStartDate,
                    convertedEndDate
                };

                // Push data into payload template
                templatePayload.push(payload);
            }
        } else {
            // LOCO
            // Set payload
            const payload = {
                skuName,
                skuNumber,
                tierQty1,
                tierPrice1,
                tierQty2,
                tierPrice2,
                tierQty3,
                tierPrice3,
                convertedStartDate,
                convertedEndDate
            };

            // Push data into payload template
            templatePayload.push(payload);
        }
    }

    return templatePayload;
};

exports.generateFileName = function () {
    const id = uuid.v4();
    return `template-contract-${id}.xlsx`;
};

exports.response = function response(message, responseData) {
    return {
        message,
        data: responseData
    };
};

module.exports = exports;
