'use strict';

const { BizzyService } = require('bizzy-common');

// type param = product_group | product_variant
// id = id product group | id product variant | sku
exports.trigger = async function (name, context, { type = '', id = '', data = {} }) {
    return BizzyService.callWebhook(name, context, {
        body: {
            type,
            id,
            data
        }
    });
};

exports.findPrimaryWarehouse = async function (context) {
    return BizzyService.callSync('bizzy-entity', 'vendorWarehousePrimary', {
        context,
        data: {}
    });
};

module.exports = exports;
