'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Auth = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVendorRepository = require('../../repositories/product_vendor');
const SyncRepository = require('../../repositories/sync_service');
const Transformer = require('../../transformers/product-detail/variant');

const schema = Joi.object().keys({
    sku: Joi.string().required(),
    variant_id: Joi.number().required(),
    product_group_id: Joi.number().required(),
    to: Joi.number().required()
});

const getVendorInformation = async function (vendor) {
    let result;
    try {
        const ids = vendor.map(row => row.warehouse_id);
        result = await SyncRepository.findWarehouseWithoutShippingByIds(ids.join(','));
    } catch (err) {
        const errObj = JSON.parse(err.message);
        if (errObj.code === 'NotFound') {
            result = null;
        } else {
            throw err;
        }
    }

    return result;
};

const getOrganizations = async function (ids) {
    let result;
    try {
        result = await SyncRepository.getOrganizationsByIds(ids);
    } catch (err) {
        const errObj = JSON.parse(err.message);
        if (errObj.code === 'NotFound') {
            result = null;
        } else {
            throw err;
        }
    }

    return result;
};

const getPriceContract = async function (productGroup, sku, vendors, context) {
    let result;
    try {
        const payload = [];
        vendors.forEach((row) => {
            const items = {
                vendor_id: row.vendor_id.toString(),
                sku_number: sku,
                category_id: productGroup.category_id.toString(),
                brand_id: productGroup.brand_id.toString()
            };

            payload.push(items);
        });
        result = await SyncRepository.getPriceContract(payload, context);
    } catch (err) {
        const errObj = JSON.parse(err.message);
        if (errObj.code === 'NotFound') {
            result = null;
        } else {
            throw err;
        }
    }

    return result;
};

const getShippingPrice = function (from, to, price) {
    const franco = price.shipping.find(p => p.from === from && p.to === to);
    delete price.shipping;
    delete price.is_contract;
    delete price.is_franco;
    delete price.type;
    if (franco) {
        price.from_franco = true;
        price.tier_data = franco.tier_data;
        return price;
    }
    price.from_franco = false;
    return price;
};

const error = function (message) {
    return { data: [], message };
};

const getRatingByVendorIds = async function (vendorUuids) {
    let result;
    try {
        result = await SyncRepository.getRatingByVendorIds(vendorUuids);
    } catch (err) {
        result = null;
    }

    if (result !== null && result.data !== undefined) {
        return result.data;
    }
    return null;
};

exports.getVendorPrice = async function (data, context) {
    try {
        Auth.validate(context);
    } catch (err) {
        throw BizzyError.NotAuthorized(err.message);
    }

    let { body: input } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    const response = {};
    const vendors = await ProductVendorRepository.findByVariant(input.variant_id);
    if (!vendors) {
        throw BizzyError.NotFound('Daftar vendor tidak ditemukan');
    }

    response.productGroup = await ProductGroupRepository.findById(input.product_group_id);
    const vendorIds = vendors.map(row => row.vendor_id);
    const [organizations, vendorInformations, prices] = await Promise.all([
        getOrganizations(vendorIds.join(',')),
        getVendorInformation(vendors),
        getPriceContract(response.productGroup, input.sku, vendors, context)
    ]);

    if (organizations === null) {
        return error('Organizations not found.');
    }

    if (vendorInformations === null) {
        return error('Cannot find warehouses.');
    }

    if (prices === null) {
        return error('Cannot find contracts.');
    }

    vendors.forEach((item) => {
        item.uuid = organizations.data.find(v => v.id === item.vendor_id).uuid;
    });
    const vendorUuids = vendors.map(row => row.uuid).join();
    const ratingVendors = await getRatingByVendorIds(vendorUuids);

    response.ratingVendors = ratingVendors;
    response.vendors = vendors;
    response.vendor_information = vendorInformations;
    response.prices = prices.map((price) => {
        const warehouse = vendorInformations.data.find(w => w.vendor.id === Number(price.vendor_id));
        const result = getShippingPrice(warehouse.warehouse_address.geograph.id, input.to, Object.assign({}, price));
        return result;
    });

    const result = Transformer.vendorPrice(response, context.user.customer.channel_type);
    return result;
};

module.exports = exports;
