'use strict';

const { BizzyError } = require('bizzy-common');
const Promise = require('bluebird');
const skuMappingRepo = require('../repositories/product_sku_mapping_repo');
const OrganizationSubRepo = require('../repositories/organization_sub_repo');
const _ = require('lodash');
const ZLib = require('zlib');

// -- triggered by create/replace catalog management event
exports.syncCreateProductMapping = async (data, context) => {
    try {
        const uncompressedString = ZLib.gunzipSync(Buffer.from(data.catalog_management, 'base64'));
        const {
            organization_id: organizationId,
            id,
            items,
            user
        } = JSON.parse(uncompressedString);

        await Promise.map(items, sku => skuMappingRepo.syncProductSkuMapping(sku, id, organizationId, user), { concurrency: 100 });
        return {
            message: 'Success'
        };
    } catch (err) {
        throw BizzyError.InternalServerError(err.message);
    }
};

// -- triggered by remove sku from catalog or replace catalog management event
exports.syncDeleteProductMapping = async (data, context) => {
    try {
        const {
            organization_id: organizationId,
            id,
            items
        } = _.chain(data).get('catalog_management').value();

        await skuMappingRepo.deleteManyProductMapping(items, id, organizationId);
        return {
            message: 'Success'
        };
    } catch (err) {
        throw BizzyError.InternalServerError(err.message);
    }
};

// -- triggered by add customers who can see my products from the edit product detail
exports.syncOrganizationSub = async (data, context) => {
    try {
        if (data.data) {
            await OrganizationSubRepo.addOrganizationSub(data.data);
            return { message: 'Success' };
        }
        return { message: 'No data sent' };
    } catch (err) {
        throw BizzyError.InternalServerError(err.message);
    }
};

// -- triggered by PO successfully created to delete private SKU
exports.syncDeletePrivateSku = async (data, context) => {
    return BizzyService.callAsync('bizzy-catalogbackoffice', 'deletePrivateSku', {
        context,
        data
    });
};
