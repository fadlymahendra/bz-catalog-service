'use strict';

const Promise = require('bluebird');
const { BizzyError, BizzyService, DBContext } = require('bizzy-common');
const Joi = require('joi');
const RepoProductVendor = require('../../repositories/product_vendor');
const RepoProductVariant = require('../../repositories/product_variant');
const RepoProductGroup = require('../../repositories/product_group');
const RepoCategory = require('../../repositories/category');
const ProductSkuRepository = require('../../repositories/product_sku');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RequestSkuMethod = require('../../methods/premoderations/create');

const schemaProduct = {
    variants: Joi.array().required(),
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
    warehouse_id: Joi.number().positive().required(),
    location_label: Joi.string().allow(''),
    reference_link: Joi.array().allow(),
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

const schema = Joi.object().keys({
    product_group_id: Joi.number().positive().required(),
    products: Joi.array().min(1).items(schemaProduct),
    specifications: Joi.array().allow([])
});

const generateVariantValue = function (data) {
    const variants = {};
    for (let j = 0; j < data.length; j++) {
        variants[data[j].attribute_code] = data[j].attribute_value_id;
    }
    return JSON.stringify(variants);
};

const generateLongName = function (product) {
    let longName = product.product_name;
    for (let i = 0; i < product.variants.length; i++) {
        longName = longName.concat(` - ${product.variants[i].attribute_value_name}`);
    }
    return longName;
};

const isSKUExists = async function (sku) {
    const result = await ProductSkuRepository.findOne(sku);

    if (!result) {
        return false;
    }
    return true;
};

const generateSpesification = function (ProductGroupAttributes) {
    const specifications = [];
    ProductGroupAttributes.forEach((element) => {
        if (element.is_variant === 0) {
            const spec = {
                attribute_id: element.AttributeCode.id,
                attribute_code: element.AttributeCode.code,
                attribute_code_label: element.AttributeCode.label,
                attribute_type: element.AttributeCode.type
            };

            if (element.AttributeCode.type === 'dropdown') {
                spec.attribute_value_id = element.AttributeValue.id;
                spec.attribute_value_label = element.AttributeValue.value;
            } else {
                spec.attribute_textinput = element.text_input;
            }

            specifications.push(spec);
        }
    });

    return specifications;
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

exports.postProduct = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        body: input
    } = data;

    const { path } = data;
    const vendorId = path.id;
    const userId = Authorization.getUserId(context);

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const productGroup = await RepoProductGroup.findByIdWithDetail(parseInt(input.product_group_id));
    if (!productGroup) {
        throw BizzyError.NotFound('Product Group not found');
    }

    const regex = /[^a-zA-Z0-9]/g;

    // Record Validation
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

    const dataProductVendor = [];
    const dataProductVariant = [];
    let exceptionMsg = null;
    let isNewVariant = false;

    input.products.forEach((element) => {
        if (Helper.IsNewVariant(element.variants) === true) isNewVariant = true;
    });

    if (isNewVariant) {
        const premodData = {
            path: {
                id: data.path.id
            },
            body: {
                name: productGroup.name,
                category_id: productGroup.category_id,
                brand_id: productGroup.brand_id,
                brand_name: productGroup.Brand.name,
                brand_image: (productGroup.Brand.image_url === null) ? '' : productGroup.Brand.image_url,
                uom_id: productGroup.uom_id,
                stocking_uom_id: productGroup.stocking_uom_id,
                quantity_stocking_uom: productGroup.quantity_stocking_uom,
                manufacturing_number: productGroup.barcode ? productGroup.manufacturing_number : '',
                package_weight: productGroup.package_weight.toString(),
                package_length: productGroup.package_length,
                package_height: productGroup.package_height,
                package_width: productGroup.package_width,
                package_content: (productGroup.package_content === null) ? '' : productGroup.package_content,
                barcode: productGroup.barcode ? productGroup.barcode : '',
                description: productGroup.description,
                variant_count: productGroup.variant_count,
                variant_matrix: JSON.parse(productGroup.variant_matrix),
                specifications: generateSpesification(productGroup.ProductGroupAttributes),
                products: data.body.products,
                type: 'existing',
                product_group_id: parseInt(data.body.product_group_id)
            }
        };

        const category = await RepoCategory.getCategoryBreakdown(productGroup.category_id);

        const productCategory = {
            c0: category[0].category0_id,
            c1: category[0].category1_id,
            c2: category[0].category2_id,
            c3: category[0].category3_id
        };

        premodData.body.category = productCategory;

        return RequestSkuMethod.postPremoderation(premodData, context);
    }

    // const totalProductVariant = await RepoProductVariant.findAndCountAll({
    //     product_group_id: input.product_group_id
    // });

    // let isPrimary = true;
    // if (totalProductVariant.count > 0) {
    //     isPrimary = false;
    // }

    await Promise.map(input.products, async (item, index) => {
        // check if the product variant is exist
        Helper.tierValidation(item);
        const product = item;
        product.product_name = productGroup.name;

        let variantValue = 'NO_VARIANT';
        if (product.variant_value !== 'NO_VARIANT') {
            variantValue = generateVariantValue(product.variants);
        }

        const productVariant = await RepoProductVariant.findOne({
            product_group_id: parseInt(input.product_group_id),
            variant_value: variantValue
        });

        const longName = generateLongName(product);

        // Cek count variant
        const countVariant = await RepoProductVariant.findCountVariant({
            product_group_id: parseInt(productGroup.id)
        });

        let setIsVariant = 0;
        if (countVariant.count === 0 && index === 0) {
            setIsVariant = 1;
            if (!productGroup.primary_image) {
                const wheresData = {
                    primary_image: product.primary_image
                };
                await RepoProductGroup.update(productGroup.id, wheresData);
            }
        } else {
            setIsVariant = 0;
        }

        let sku = null;
        do {
            sku = Helper.generateSKUD(10);
        // eslint-disable-next-line no-await-in-loop
        } while (await isSKUExists(sku));

        const insertProductVariant = {
            product_group_id: parseInt(input.product_group_id),
            sku,
            long_name: longName,
            variant_value: variantValue,
            primary_image: product.primary_image,
            additional_image: JSON.stringify(product.additional_image),
            is_primary: setIsVariant,
            is_discontinue: 0,
            is_active: 1
        };
        const insertProductVendor = {
            vendor_id: parseInt(vendorId),
            warehouse_id: product.warehouse_id,
            location_label: product.location_label,
            stock_available: product.stock,
            stock_used: 0,
            tier_min_qty_1: product.tier_min_qty_1,
            tier_min_qty_2: product.tier_min_qty_2,
            tier_min_qty_3: product.tier_min_qty_3,
            tier_cogs_price_1: product.tier_cogs_price_1,
            tier_cogs_price_2: product.tier_cogs_price_2,
            tier_cogs_price_3: product.tier_cogs_price_3,
            warranty_option: product.warranty_option,
            warranty_period: (product.warranty_period ? product.warranty_period : null),
            warranty_limit: (product.warranty_limit ? product.warranty_limit : null),
            warranty_coverage: (product.warranty_coverage ? product.warranty_coverage : null),
            indent_period: (product.indent_period ? product.indent_period : null),
            indent_limit: (product.indent_limit ? product.indent_limit : null),
            is_indent: product.is_indent,
            is_decimal: product.is_decimal,
            down_payment_type: product.down_payment_type,
            down_payment_value: product.down_payment_value,
            sku_vendor: product.sku_vendor,
            is_active: 1,
            created_by: userId
        };

        if (product.reference_link[0] !== '') {
            insertProductVendor.reference_link = JSON.stringify(product.reference_link);
        }

        if (productVariant) { // if product variant exist
            // check if the product vendor exist
            const productVendor = await RepoProductVendor.findOne({
                product_variant_id: productVariant.id,
                vendor_id: parseInt(vendorId),
                warehouse_id: item.warehouse_id
            });

            if (productVendor) {
                exceptionMsg = `${longName} sudah terdaftar pada katalog Anda.`;
                // break; // if the product vendor is exist then break
            } else {
                insertProductVendor.product_variant_id = productVariant.id;
                insertProductVendor.product_variant_sku = productVariant.sku;
                dataProductVendor.push(insertProductVendor);
            }
        } else { // mif product variant not exist
            insertProductVariant.product_vendor = insertProductVendor;
            dataProductVariant.push(insertProductVariant);
        }
    });

    const insertedVariant = [];
    const updatedVariant = [];
    const insertedVendor = [];

    // looping for insert
    if (dataProductVendor.length > 0 || dataProductVariant.length > 0) {
        try {
            await DBContext.getInstance();
            await DBContext.startTransaction();
            await Promise.map(dataProductVendor, async (temp1, i) => {
                updatedVariant.push({
                    id: dataProductVendor[i].product_variant_id,
                    sku: dataProductVendor[i].product_variant_sku
                });

                const item = Helper.convertToNull(dataProductVendor[i]);
                delete item.product_variant_sku;
                const status = await RepoProductVendor.createOne(item);
                if (status.getValues()) {
                    insertedVendor.push({
                        id: status.getValues().id,
                        vendor_id: status.getValues().vendor_id
                    });
                }
            });

            await Promise.map(dataProductVariant, async (temp1, i) => {
                const productVariant = await RepoProductVariant.createOne(dataProductVariant[i]);
                if (productVariant.getValues()) {
                    insertedVariant.push({
                        id: productVariant.getValues().id,
                        sku: productVariant.getValues().sku
                    });
                }

                await ProductSkuRepository.insertOne({
                    sku: productVariant.getValues().sku
                });

                dataProductVariant[i].product_vendor.product_variant_id = productVariant.id;
                const item = Helper.convertToNull(dataProductVariant[i].product_vendor);
                const status = await RepoProductVendor.createOne(item);
                if (status.getValues()) {
                    insertedVendor.push({
                        id: status.getValues().id,
                        vendor_id: status.getValues().vendor_id
                    });
                }
            });

            await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishUpsertItemERP', {
                context: {},
                data: {
                    inserted_variants: insertedVariant,
                    updated_variants: updatedVariant
                }
            });

            await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
                data: {
                    body: {
                        type: 'product_group',
                        id: input.product_group_id,
                        data: Object.assign(input, {
                            inserted_variants: insertedVariant,
                            updated_variants: updatedVariant
                        })
                    }
                }
            });

            await DBContext.commit();
            return {
                data: {
                    product_group_id: input.product_group_id,
                    product_variant: insertedVariant,
                    product_vendor: insertedVendor
                }
            };
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            exceptionMsg = 'Terjadi Kesalahan';
            await DBContext.rollback();
        }
    }
    throw BizzyError.BadRequest(exceptionMsg);
};

module.exports = exports;
