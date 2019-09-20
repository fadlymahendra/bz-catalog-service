'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RepoProductVendor = require('../../repositories/product_vendor');
const PremoderationRepository = require('../../repositories/premoderation');
const Transformer = require('../../transformers/premoderations/create');

const schemaVariants = {
    attribute_id: Joi.number().required(),
    attribute_code: Joi.string().required(),
    attribute_code_label: Joi.string().required(),
    attribute_value_name: Joi.string().required(),
    attribute_value_id: Joi.number().required()
};

const schemaProduct = {
    variants: Joi.array().items(schemaVariants),
    variant_value: Joi.required(),
    sku_vendor: Joi.string().max(20).required(),
    tier_min_qty_1: Joi.string().required(),
    tier_min_qty_2: Joi.string().allow('').default(null),
    tier_min_qty_3: Joi.string().allow('').default(null),
    tier_cogs_price_1: Joi.string().required(),
    tier_cogs_price_2: Joi.string().allow('').default(null),
    tier_cogs_price_3: Joi.string().allow('').default(null),
    stock: Joi
        .when('is_indent', {
            is: 1,
            then: Joi.only(0).required(),
            otherwise: Joi.number().required()
        }),
    primary_image: Joi.string().required(),
    additional_image: Joi.array(),
    warehouse_id: Joi.number().positive(),
    location_label: Joi.string().required(),
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
        })
};

const schemaCategory = {
    c0: Joi.number().required(),
    c1: Joi.number().required(),
    c2: Joi.number().required(),
    c3: Joi.number().required()
};

const schema = Joi.object().keys({
    product_group_id: Joi.number(),
    name: Joi.string().required().min(1).max(250),
    category_id: Joi.number().required(),
    category: Joi.object().keys(schemaCategory),
    brand_id: Joi.number().required(),
    brand_name: Joi.string().allow(''),
    brand_image: Joi.string().allow(''),
    uom_id: Joi.number().required(),
    stocking_uom_id: Joi.number().required(),
    quantity_stocking_uom: Joi.number().positive(),
    manufacturing_number: Joi.string().allow(''),
    package_weight: Joi.string().default(0),
    package_length: Joi.string().default(0),
    package_width: Joi.string().default(0),
    package_height: Joi.string().default(0),
    package_content: Joi.string().allow(''),
    barcode: Joi.string().allow(''),
    description: Joi.string().required(),
    reference_link: Joi.array(),
    variant_count: Joi.number().default(0),
    variant_matrix: Joi.required(),
    products: Joi.array().min(1).items(schemaProduct),
    specifications: Joi.array().allow(''),
    uniqueId: Joi.string().allow(''),
    type: Joi.string().default('new')
});

const saveToMongo = function (payload) {
    return PremoderationRepository.insertOne(payload);
};

const generateAttributeStatus = function (data) {
    for (let i = 0; i < data.products.length; i++) {
        Helper.tierValidation(data.products[i]);
        let newVariant = 0;
        let newSpesification = 0;
        const product = data.products[i];
        const variants = data.products[i].variants;
        // const specifications = data.specifications;

        if (product.variant_value !== 'NO_VARIANT') {
            variants.forEach((element) => {
                if (element.attribute_value_id === 0) newVariant += 1;
                element.attribute_status = (element.attribute_value_id === 0) ? 'new' : 'clear';
            });
        }

        if (data.specifications) {
            data.specifications.forEach((element) => {
                if (element.attribute_type === 'dropdown' && element.attribute_value_id === 0) {
                    newSpesification += 1;
                    element.attribute_status = 'new';
                } else {
                    element.attribute_status = 'clear';
                }
            });
        }

        data.products[i].variant_status = (newVariant === 0 || data.products[i].variant_value === 'NO_VARIANT') ? 'complete' : 'pending';
        data.specification_status = (newSpesification === 0) ? 'clear' : 'new';
    }

    return data;
};

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

exports.postPremoderation = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const userId = Authorization.getUserId(context);
    const userEmail = Authorization.getUserEmail(context);
    const userFullname = Authorization.getUserFullname(context);

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const regex = /[^a-zA-Z0-9]/g;
    const vendorId = parseInt(data.path.id);
    await Promise.map(input.products, async (item, index) => {
        const skuVendor = (item.sku_vendor).toUpperCase();
        input.products[index].sku_vendor = skuVendor;
        const found = skuVendor.match(regex);
        if (found) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} can not contains symbol.`);
        }

        checkPremoderationValidation(item);
        const dataProductVendor = await RepoProductVendor.findOneDetail({ vendor_id: vendorId, sku_vendor: skuVendor });
        if (dataProductVendor) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} already used.`);
        }
    }, { concurrency: 10 });

    input.uniqueId = new Date().getTime().toString();
    input.user = {
        id: parseInt(userId),
        name: userFullname,
        email: userEmail,
        type: 'vendor'
    };
    input.vendor_id = vendorId;

    if (input.brand_id === 0) {
        input.brand_status = 'new';
    } else {
        input.brand_status = 'clear';
    }
    input = generateAttributeStatus(input);

    const newPayload = Transformer.collection(input);
    await saveToMongo(newPayload);

    return {
        data: {
            id: newPayload.id,
            type: newPayload.type,
            premoderation_status: newPayload.premoderation_status,
            created_at: newPayload.created_at,
            updated_at: newPayload.updated_at
        }
    };
};

module.exports = exports;
