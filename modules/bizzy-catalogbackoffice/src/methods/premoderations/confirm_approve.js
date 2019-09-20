'use strict';

const Promise = require('bluebird');
const { BizzyService, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductGroupAttributeRepository = require('../../repositories/product_group_attribute');
const ProductSkuRepository = require('../../repositories/product_sku');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductVariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/premoderations/confirm_approve');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    product_group_id: Joi.string().required()
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

exports.putPremoderationApprove = async function putPremoderationApprove(data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const premoderation = await PremoderationRepository.findOne(input.id);
    if (!premoderation) {
        throw BizzyError.NotFound('Premoderation Not Found');
    }

    const regex = /[^a-zA-Z0-9]/g;
    const vendorId = premoderation.vendor_id;
    const products = premoderation.payload.products;
    await Promise.map(products, async (item, index) => {
        const skuVendor = (item.sku_vendor).toUpperCase();
        products[index].sku_vendor = skuVendor;
        const found = skuVendor.match(regex);
        if (found) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} can not contains symbol.`);
        }

        if (item.sku_vendor === '') {
            throw BizzyError.BadRequest('SKU can not be empty.');
        } else {
            const dataProductVendor = await ProductVendorRepository.findOne({ vendor_id: vendorId, sku_vendor: skuVendor });
            if (dataProductVendor) {
                throw BizzyError.BadRequest(`SKU ${item.sku_vendor} already used.`);
            }
        }
    }, { concurrency: 10 });

    const statusBefore = Helper.lowerTrim(premoderation.premoderation_status);
    if (statusBefore !== 'need_revision' && statusBefore !== 'revision_complete') {
        throw BizzyError.BadRequest(`Premoderation status cannot be processed: ${statusBefore}`);
    }

    const wheres = {};
    wheres.premoderation_status = {
        $ne: 'done'
    };
    wheres.id = input.id;

    const findWithStatus = await PremoderationRepository.findWithStatus(wheres);
    // Create Product Group
    // let payloadInsert = Transformer.payloadInsert(findWithStatus);
    // let result = await ProductGroupRepository.findOrCreate(payloadInsert);

    // Cek to Mysql Product Group
    const result = await ProductGroupRepository.findById(input.product_group_id);
    if (!result) {
        throw BizzyError.NotFound('Product Not Found.');
    }

    // cek variant_matrix
    if (result.variant_matrix !== JSON.stringify(findWithStatus.payload.variant_matrix)) {
        throw BizzyError.BadRequest('Variant Matrix not same');
    }

    const payload = Transformer.variantPayload(findWithStatus);

    const productGroupId = result.id;

    const dataProductVendor = [];
    const dataProductVariant = [];

    let exceptionMsg = null;

    for (let i = 0; i < payload.variants.length; i++) {
        const product = payload.variants[i];
        product.product_name = result.name;

        let variantValue = 'NO_VARIANT';
        if (product.variant_value !== 'NO_VARIANT') {
            variantValue = generateVariantValue(product.variants);
        }

        const productVariant = await ProductVariantRepository.findOne({
            product_group_id: parseInt(productGroupId),
            variant_value: variantValue
        });

        const longName = generateLongName(product);

        // Cek count variant
        const countVariant = await ProductVariantRepository.findCountVariant({
            product_group_id: parseInt(productGroupId)
        });

        let setIsVariant;
        if (countVariant.count === 0 && i === 0) {
            setIsVariant = 1;
            if (!result.primary_image) {
                const wheresData = {
                    primary_image: product.primary_image
                };
                await ProductGroupRepository.update(result.id, wheresData);
            }
        } else {
            setIsVariant = 0;
        }

        let sku = null;
        do {
            sku = Helper.generateSKUD(10);
        } while (await isSKUExists(sku));

        const userId = context.user.employee.id || null;

        const insertProductVariant = {
            product_group_id: parseInt(productGroupId),
            sku,
            long_name: longName,
            variant_value: variantValue,
            primary_image: product.primary_image,
            additional_image: (product.additional_image === '' || product.additional_image === null) ? [] : product.additional_image,
            is_primary: setIsVariant,
            is_discontinue: 0,
            is_active: 1,
            created_by: userId
        };

        insertProductVariant.additional_image = JSON.stringify(insertProductVariant.additional_image);

        const insertProductVendor = {
            vendor_id: parseInt(findWithStatus.vendor_id),
            warehouse_id: product.warehouse_id,
            location_label: product.location_label,
            stock_available: product.stock,
            stock_used: 0,
            tier_min_qty_1: product.tier_min_qty_1,
            tier_min_qty_2: (product.tier_min_qty_2 ? product.tier_min_qty_2 : null),
            tier_min_qty_3: (product.tier_min_qty_3 ? product.tier_min_qty_3 : null),
            tier_cogs_price_1: product.tier_cogs_price_1,
            tier_cogs_price_2: (product.tier_cogs_price_2 ? product.tier_cogs_price_2 : null),
            tier_cogs_price_3: (product.tier_cogs_price_3 ? product.tier_cogs_price_3 : null),
            warranty_option: product.warranty_option,
            warranty_period: (product.warranty_period ? product.warranty_period : null),
            warranty_limit: (product.warranty_limit ? product.warranty_limit : null),
            warranty_coverage: (product.warranty_coverage ? product.warranty_coverage : null),
            indent_period: product.indent_period ? product.indent_period : null,
            indent_limit: (product.indent_limit ? product.indent_limit : null),
            is_indent: product.is_indent,
            reference_link: JSON.stringify(product.reference_links),
            sku_vendor: (product.sku_vendor ? product.sku_vendor : null),
            is_active: 1,
            created_by: findWithStatus.user.id,
            is_contract: (product.is_contract ? product.is_contract : 0),
            is_decimal: (product.is_decimal ? product.is_decimal : 0),
            down_payment_type: (product.down_payment_type ? product.down_payment_type : 0),
            down_payment_value: (product.down_payment_value ? product.down_payment_value : 0)
        };

        if (productVariant) { // if product variant exist
            // check if the product vendor exist
            const productVendor = await ProductVendorRepository.findOne({
                product_variant_id: productVariant.id,
                vendor_id: parseInt(findWithStatus.vendor_id),
                warehouse_id: product.warehouse_id
            });

            if (productVendor) {
                exceptionMsg = `${longName} already exist`;
                break; // if the product vendor is exist then break
            } else {
                insertProductVendor.product_variant_id = productVariant.id;
                insertProductVendor.index = product.index;
                dataProductVendor.push(insertProductVendor);
            }
        } else { // if product variant not exist
            insertProductVariant.product_vendor = insertProductVendor;
            insertProductVariant.index = product.index;
            dataProductVariant.push(insertProductVariant);
        }
    }

    const arrVariant = [];

    // looping for insert
    if (dataProductVendor.length > 0 || dataProductVariant.length > 0) {
        for (let i = 0; i < dataProductVendor.length; i++) {
            const variantIndex = dataProductVendor[i].index;

            delete dataProductVendor[i].index;

            await ProductVendorRepository.createOne(dataProductVendor[i]);

            // update mongo
            let wheresVariant = {};
            wheresVariant = {
                id: {
                    $eq: input.id
                },
                'payload.products.index': {
                    $eq: variantIndex
                }
            };
            await PremoderationRepository.updateVariantId(wheresVariant, dataProductVendor[i].product_variant_id);
        }

        for (let i = 0; i < dataProductVariant.length; i++) {
            const variantIndex = dataProductVariant[i].index;

            delete dataProductVariant[i].index;

            const productVariant = await ProductVariantRepository.createOne(dataProductVariant[i]);

            await ProductSkuRepository.insertOne({
                sku: productVariant.getValues().sku
            });

            arrVariant.push({
                sku: productVariant.sku
            });
            dataProductVariant[i].product_vendor.product_variant_id = productVariant.id;
            await ProductVendorRepository.createOne(dataProductVariant[i].product_vendor);

            // update mongo
            let wheresVariant = {};
            wheresVariant = {
                id: {
                    $eq: input.id
                },
                'payload.products.index': {
                    $eq: variantIndex
                }
            };

            await PremoderationRepository.updateVariantId(wheresVariant, productVariant.id);
        }

        // Update Product Group visibility 1
        const pgWheres = {
            visibility: 1
        };
        await ProductGroupRepository.update(productGroupId, pgWheres);

        // return {
        //     "message": `${input.products.length} data inserted`,
        //     "success": true
        // };
    } else {
        throw BizzyError.BadRequest(exceptionMsg);
    }

    const attributeVariant = findWithStatus.payload.products;
    // note: attributeVariant.length always > 0
    // if (attributeVariant.length > 0) {
        for (let i = 0; i < attributeVariant.length; i++) {
            const isVariant = 1;
            const groupVariants = attributeVariant[i].variants;
            for (let v = 0; v < groupVariants.length; v++) {
                const variantsPayload = Transformer.groupAttributePayload(groupVariants[v], result.id, isVariant);
                await ProductGroupAttributeRepository.findOrCreate(variantsPayload);
            }
        }
    // }

    const specifications = findWithStatus.payload.specifications;
    if (specifications.length > 0) {
        const isVariant = 0;
        for (let s = 0; s < specifications.length; s++) {
            const specificationsPayload = Transformer.groupAttributePayload(specifications[s], result.id, isVariant);
            await ProductGroupAttributeRepository.findOrCreate(specificationsPayload);
        }
    }

    // Update status on mongo
    let statusMongo;
    await PremoderationRepository.update(input.id, statusMongo = 'done');

    await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
        context: {},
        data: {
            variants: arrVariant,
            mode: 'create'
        }
    });

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: data.body.product_group_id,
                data: Object.assign(input, { variants: arrVariant })
            }
        }
    });

    return {
        data: {
            id: input.id,
            status: statusMongo,
            created_at: findWithStatus.created_at,
            updated_at: findWithStatus.updated_at
        }
    };
};

module.exports = exports;
