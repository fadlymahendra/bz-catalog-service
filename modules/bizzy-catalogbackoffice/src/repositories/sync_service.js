'use strict';

const { BizzyService } = require('bizzy-common');

exports.findVendorName = async function (ids) {
    return BizzyService.callSync('bizzy-entity', 'vendorFindAll', {
        context: {},
        data: {
            query: {
                ids
            }
        }
    });
};

exports.countPOBySku = async function (sku) {
    return BizzyService.callSync('bizzy-purchaseorder', 'purchaseOrderCountBySku', {
        context: {},
        data: {
            path: {
                id: sku
            }
        }
    });
};

exports.priceEngineCart = async function (payload, context) {
    return BizzyService.callSync('bizzy-contract', 'priceEngineECart', {
        context,
        data: {
            body: payload
        }
    });
};

exports.getListVendor = async function (context) {
    return BizzyService.callSync('bizzy-entity', 'vendorFindList', {
        context,
        data: {}
    });
};

exports.getVendorWarehousePrimary = async function (context) {
    return BizzyService.callSync('bizzy-entity', 'vendorWarehousePrimary', {
        context,
        data: {}
    });
};

module.exports = exports;
