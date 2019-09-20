'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const { BizzyError } = require('bizzy-common');
const ProductSnapshotRepo = require('../../repositories/product_snapshot');
const ProductVariantRepo = require('../../repositories/product_variant');
const ProductMappingRepo = require('../../repositories/product_sku_mapping');
const SyncRepo = require('../../repositories/sync_service');
const Authorization = require('../../utils/authorization');
const Transformer = require('../../transformers/product-detail/snapshot');

const schemaPost = Joi.object().keys({
    quotation_item_id: Joi.string().required(),
    hub_id: Joi.number().required(),
    warehouse_id: Joi.number().required(),
    shipping_cost_estimation: Joi.string().required(),
    shipping_address_id: Joi.number().required(),
    added_price: Joi.string().required(),
    discount: Joi.string().required(),
    deducted_price: Joi.string().required(),
    total_price: Joi.string().required(),
    products: Joi.array().min(1).required()
});

const schemaGet = Joi.object().keys({
    quotation_item: Joi.number().required(),
    sku: Joi.string().required(),
    token: Joi.string().allow('')
});

const getMappingProduct = async function (sku, orgId) {
    const wheres = {
        product_sku: sku
    };

    wheres['payload.organization_id'] = orgId;
    wheres.$or = [
        {
            'payload.material_code': {
                $ne: ''
            }
        },
        {
            'payload.material_group': {
                $ne: ''
            }
        }
    ];

    const getMapping = await ProductMappingRepo.findMappingSku(wheres);
    return getMapping;
};

exports.postSnapshotProduct = async function (data, context) {
    let { body: requestBody } = data;

    try {
        requestBody = await Joi.validate(requestBody, schemaPost);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const snapshotProduct = [];
    await Promise.map(requestBody.products, async (item) => {
        const productVariant = await ProductVariantRepo.findOne({
            sku: item.sku
        });
        const productSku = await SyncRepo.getSku(item.sku);
        const productVendors = await SyncRepo.getVendors({
            sku: item.sku,
            variant_id: productVariant.id,
            product_group_id: productVariant.product_group_id
        }, context);

        const vendorIds = productVendors.data.map(el => ({
            vendor_id: String(el.vendor_id),
            sku_number: String(item.sku),
            category_id: '0',
            brand_id: '0'
        }));

        const productPricing = await SyncRepo.getPrincing(vendorIds, context);
        let productMapping = await getMappingProduct(item.sku, context.user.customer.organization_id);

        if (productMapping !== null && productMapping.length > 0) {
            productMapping = {
                mapping: productMapping[0].payload.mapped,
                material_code: productMapping[0].payload.material_code,
                material_group: productMapping[0].payload.material_group
            };
        }

        const channelType = context.user.customer.channel_type;
        const {
            quotation_item_id: quotationItemId,
            hub_id: hubId,
            warehouse_id: warehouseId,
            shipping_cost_estimation: shippingCostEstimation,
            shipping_address_id: shippingAddressId,
            added_price: addedPrice,
            discount,
            deducted_price: deductedPrice,
            total_price: totalPrice
        } = requestBody;

        const payload = {
            company_seller_id: item.company_seller_id,
            quotation_item_id: quotationItemId,
            hub_id: hubId,
            warehouse_id: warehouseId,
            shipping_cost_estimation: shippingCostEstimation,
            shipping_address_id: shippingAddressId,
            added_price: addedPrice,
            discount,
            deducted_price: deductedPrice,
            qty: item.qty,
            channel_type: channelType,
            is_punchout: context.user.punchout.is_punchout || 0,
            check_mapping: productMapping || null,
            total_price: totalPrice,
            sku: productSku.data,
            vendors: productVendors.data,
            pricing: productPricing,
            created_at: new Date()
        };

        snapshotProduct.push(payload);
    }, { concurrency: 4 });

    await ProductSnapshotRepo.insertMany(snapshotProduct);
    return true;
};

exports.getSnapshotProduct = async function (data, context) {
    let { body: requestBody } = data;
    let orgId;
    try {
        if (requestBody.token) {
            const decodeToken = Authorization.decodeToken(requestBody.token);
            // context.user = decodeToken;
            if (!decodeToken || !decodeToken.is_system) throw new Error('You have no authorization access');
            orgId = decodeToken.customer.organization_id;
        } else {
            const user = Authorization.getUser(context);
            if (!user) throw new Error('You have no authorization access');
            orgId = context.user.customer.organization_id;
        }
    } catch (err) {
        throw BizzyError.Forbidden(err.message);
    }

    try {
        requestBody = await Joi.validate(requestBody, schemaGet);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let getSnapshot = null;
    const purchaseContext = {
        user: {
            username: 'bizzy',
            customer: {
                person_id: 9999999,
                organization_id: 9999999
            }
        }
    };
    try {
        getSnapshot = await SyncRepo.getSnapshotPdp({
            path: {
                quotation_item_id: String(requestBody.quotation_item)
            }
        }, purchaseContext);
    } catch (err) {
        throw BizzyError.NotFound(`Gagal Mengambil Snapshot, ${err.message}`);
    }
    let productMapping = await getMappingProduct(requestBody.sku, orgId);

    if (productMapping.length > 0) {
        productMapping = {
            mapping: productMapping[0].payload.mapped,
            material_code: productMapping[0].payload.material_code,
            material_group: productMapping[0].payload.material_group
        };
    }
    const dataPurchase = getSnapshot.data;
    const skuSnapshot = getSnapshot.data.items.find(el => el.sku_no === requestBody.sku);
    if (!skuSnapshot) throw BizzyError.NotFound('Snapshot Sku tidak ditemukan');
    Object.assign(skuSnapshot, { check_mapping: productMapping });
    return {
        data: Transformer.itemSnapshot(dataPurchase, skuSnapshot, context)
    };
};

module.exports = exports;
