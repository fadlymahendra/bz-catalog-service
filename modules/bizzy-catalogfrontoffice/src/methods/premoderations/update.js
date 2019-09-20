'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const RepoProductVendor = require('../../repositories/product_vendor');
const Transformer = require('../../transformers/premoderations/update');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    pid: Joi.string().required(),
    type: Joi.string().required(),
    product_group_id: Joi.number().allow(null),
    payload: Joi.object().required()
});

const schemaVariants = {
    attribute_id: Joi.number().required(),
    attribute_code: Joi.string().required(),
    attribute_code_label: Joi.string().required(),
    attribute_value_name: Joi.string().required(),
    attribute_value_id: Joi.number().required(),
    attribute_status: Joi.string().required()
};

const schemaProduct = Joi.object().keys({
    index: Joi.string().required(),
    variants: Joi.array().items(schemaVariants),
    variant_value: Joi.required(),
    sku_vendor: Joi.string().max(20).required(),
    tier_min_qty_1: Joi.string().required(),
    tier_min_qty_2: Joi.string().allow(''),
    tier_min_qty_3: Joi.string().allow(''),
    tier_cogs_price_1: Joi.string().required(),
    tier_cogs_price_2: Joi.string().allow(''),
    tier_cogs_price_3: Joi.string().allow(''),
    stock: Joi
        .when('is_indent', {
            is: 1,
            then: Joi.only(0).required(),
            otherwise: Joi.number().required()
        }),
    primary_image: Joi.string().required(),
    additional_image: Joi.array(),
    warehouse_id: Joi.number().allow(''),
    location_label: Joi.string().allow(''),
    reference_link: Joi.array(),
    warranty_option: Joi.string().required(),
    warranty_period: Joi.string().valid('week', 'month', 'year', 'forever').allow(''),
    warranty_limit: Joi.number().allow('').allow(null).default(0),
    warranty_coverage: Joi.string().allow(''),
    is_indent: Joi.number().valid(0, 1).required(),
    indent_period: Joi
        .when('is_indent', {
            is: 0,
            then: Joi.only('').required(),
            otherwise: Joi.string().valid('day', 'week').required()
        }),
    indent_limit: Joi
        .when('is_indent', {
            is: 0,
            then: Joi.only('').required(),
            otherwise: Joi.number().min(1).positive().required()
        }),
    is_decimal: Joi.number().default(0).valid(0, 1).required(),
    down_payment_type: Joi.number().valid(0, 1, 2).required(),
    down_payment_value: Joi
        .when('down_payment_type', {
            is: 0,
            then: Joi.valid(0).required(),
            otherwise: Joi.number().greater(0).required()
        }),
    variant_status: Joi.string().allow(''),
    is_contract: Joi.number().required().valid(0, 1)
});


const schemaCategory = {
    c0: Joi.number().required(),
    c1: Joi.number().required(),
    c2: Joi.number().required(),
    c3: Joi.number().required()
};

const schemaPayload = Joi.object().keys({
    name: Joi.string().required(),
    category_id: Joi.number().required(),
    category: Joi.object().keys(schemaCategory),
    brand_id: Joi.number().required(),
    brand_status: Joi.string().required(),
    brand_name: Joi.string().allow(''),
    brand_image: Joi.allow('').allow(null),
    uom_id: Joi.number().required(),
    stocking_uom_id: Joi.number().required(),
    quantity_stocking_uom: Joi.number().allow(''),
    manufacturing_number: Joi.string().allow(''),
    package_weight: Joi.string().required(),
    package_length: Joi.string().required(),
    package_height: Joi.string().required(),
    package_width: Joi.string().required(),
    package_content: Joi.string().allow(''),
    barcode: Joi.string().allow(''),
    description: Joi.string().required(),
    variant_count: Joi.number().required(),
    variant_matrix: Joi.array().required(),
    specification_status: Joi.string().required(),
    specifications: Joi.array().required(),
    products: Joi.array().items(schemaProduct)
});

const checkPremoderationValidation = (product) => {
    if (product.is_indent === 1) {
        switch (product.indent_period) {
        case 'day':
            if (product.indent_limit > 365) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not Valid, Indent Limit must be Max 365 days`);
            break;
        case 'week':
            if (product.indent_limit > 52) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not Valid, Indent Limit must be Max 52 weeks`);
            break;
        default:
            break;
        }
    }

    if (product.down_payment_type === 1) {
        if (product.down_payment_value < 0 || product.down_payment_value > 99) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not valid Downpayment Value Must be 1 - 99 %`);
    } else if (product.down_payment_type === 2) {
        let tierPrice = product.tier_cogs_price_1;
        if (product.tier_cogs_price_3) {
            tierPrice = product.tier_cogs_price_3;
        } else if (product.tier_cogs_price_2) {
            tierPrice = product.tier_cogs_price_2;
        }
        if (product.down_payment_value > tierPrice) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not valid Downpayment Value Must be lower than ${tierPrice}`);
    }
};

exports.putPremoderation = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }
    const user = Authorization.getUser(context);
    const {
        path: input1,
        body: input2
    } = data;
    let input = input1;
    input.type = input2.type;
    if (input2.product_group_id) {
        input.product_group_id = input2.product_group_id;
    }
    input.payload = input2.payload;

    try {
        [
            input,
            input.payload
        ] = await Promise.join(
            Joi.validate(input, schema),
            Joi.validate(input.payload, schemaPayload)
        );
        input.payload.products.forEach((product) => {
            Helper.tierValidation(product);
        });
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const regex = /[^a-zA-Z0-9]/g;
    const vendorId = parseInt(input1.id);
    await Promise.map(input.payload.products, async (item, index) => {
        const skuVendor = (item.sku_vendor).toUpperCase();
        input.payload.products[index].sku_vendor = skuVendor;
        const found = skuVendor.match(regex);
        if (found) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} can not contains symbol.`);
        }

        checkPremoderationValidation(item);
        const dataProductVendor = await RepoProductVendor.findOne({ vendor_id: vendorId, sku_vendor: skuVendor });
        if (dataProductVendor) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} already used.`);
        }
    }, { concurrency: 10 });

    if (!input.payload.brand_image) input.payload.brand_image = 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg';

    const wheres = {};
    wheres.id = input.pid;
    wheres.vendor_id = parseInt(input.id);
    const result = await PremoderationRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Premoderation data is not found');
    }
    if (result.premoderation_status !== 'revision_inprogress') {
        throw BizzyError.BadRequest(`Premoderation status can not be processed: ${result.premoderation_status}`);
    }
    input.premoderation_status = 'revision_complete';

    const dataForUpdate = {};
    dataForUpdate.id = input.pid;
    dataForUpdate.payload = input.payload;
    dataForUpdate.premoderation_status = input.premoderation_status;

    const update = await PremoderationRepository.update(dataForUpdate.id, dataForUpdate);
    if (!update) {
        throw BizzyError.BadRequest('Update failed');
    }

    const resNewPremod = await PremoderationRepository.findOne(wheres);
    const log = {
        premoderation_id: resNewPremod.id,
        product_name: resNewPremod.payload.name,
        last_status: 'revision_inprogress',
        current_status: 'revision_complete',
        user: {
            id: user.customer.person_id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.username,
            type: 'vendor'
        },
        created_at: resNewPremod.created_at,
        updated_at: resNewPremod.updated_at
    };
    await PremoderationLogRepository.insertOne(log);

    return {
        data: Transformer.item(resNewPremod),
        message: 'Premoderation has been Changed'
    };
};

module.exports = exports;
