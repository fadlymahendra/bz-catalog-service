'use strict';

const { BizzyService } = require('bizzy-common');

exports.findVendorByIds = async function (ids) {
    return BizzyService.callSync('bizzy-entity', 'vendorFindAll', {
        context: {},
        data: {
            query: {
                ids
            }
        }
    });
};

exports.findWarehouseByIds = async function (ids) {
    return BizzyService.callSync('bizzy-entity', 'vendorWarehouseFindAll', {
        context: {},
        data: {
            query: {
                ids
            }
        }
    });
};

exports.findWarehouseWithoutShippingByIds = async function (ids) {
    return BizzyService.callSync('bizzy-entity', 'vendorWarehouseAll', {
        context: {},
        data: {
            query: {
                ids
            }
        }
    });
};

exports.getOrganizationsByIds = async function (ids) {
    return BizzyService.callSync('bizzy-entity', 'getOrganizationsByIds', {
        context: {},
        data: {
            ids
        }
    });
};

exports.priceEngineCart = async function (payload, context) {
    return BizzyService.callSync('bizzy-contract', 'priceEngineCart', {
        context,
        data: {
            body: payload
        }
    });
};

exports.getPriceContract = async function (payload, context) {
    return BizzyService.callSync('bizzy-contract', 'priceEngineCartPdp', {
        context,
        data: {
            body: payload
        }
    });
};

exports.getContract = async function (payload, context) {
    return BizzyService.callSync('bizzy-contract', 'getAgreementCustomerVendorId', {
        context,
        data: { path: payload }
    });
};

exports.getSku = async function (sku) {
    return BizzyService.callSync('bizzy-searchengine', 'getProductDetailByVariantPdp', {
        context: {},
        data: {
            path: {
                id: sku
            }
        }
    });
};

exports.getVendors = async function (requestBody, context) {
    return BizzyService.callSync('bizzy-searchengine', 'getVendorDetail', {
        context,
        data: {
            body: requestBody
        }
    });
};

exports.getPrincing = async function (requestBody, context) {
    return BizzyService.callSync('bizzy-contract', 'priceEngineCartPdp', {
        context,
        data: {
            body: requestBody
        }
    });
};

exports.getSnapshotPdp = async function (payload, context) {
    return BizzyService.callSync('bizzy-purchasereq', 'prGetSnapshotByQuotationItemId', {
        context,
        data: payload
    });
};

exports.getRatingByVendorIds = async function (payload, context) {
    return BizzyService.callSync('bizzy-purchaserating', 'getRatingByVendorIds', {
        context,
        data: {
            path: {
                ids: payload
            }
        }
    });
};

module.exports = exports;
