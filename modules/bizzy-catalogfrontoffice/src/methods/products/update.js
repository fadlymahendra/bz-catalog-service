'use strict';

const Promise = require('bluebird');
const { BizzyError, DBContext, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Transformer = require('../../transformers/products/update');
const TransformerPubUpdate = require('../../transformers/products/pub_update');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductLogRepository = require('../../repositories/product_log');
const PrivateSkuRepo = require('../../repositories/private_sku');

const schemaPath = Joi.object().keys({
    id: Joi.number().positive().required(),
    pid: Joi.number().positive().required()
});

const schemaOrg = Joi.object().keys({
    id: Joi.number().positive().required()
});

const schemaProduct = {
    id: Joi.number().required(),
    sku_vendor: Joi.string().max(20).required(),
    tier_min_qty_1: Joi.string().required(),
    tier_min_qty_2: Joi.string().allow('').default(null),
    tier_min_qty_3: Joi.string().allow('').default(null),
    tier_cogs_price_1: Joi.string().allow('').required(),
    tier_cogs_price_2: Joi.string().allow('').default(null),
    tier_cogs_price_3: Joi.string().allow('').default(null),
    stock_available: Joi
        .when('is_indent', {
            is: 1,
            then: Joi.only(0).required(),
            otherwise: Joi.number().required()
        }),
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
    warranty_option: Joi.string().allow('').default('no_warranty'),
    warranty_period: Joi.string().valid('week', 'month', 'year', 'forever').allow(''),
    warranty_limit: Joi.number().allow('').allow(null).default(0),
    warranty_coverage: Joi.string().allow(''),
    reference_link: Joi.array().default([]),
    is_bulk: Joi.number().optional(),
    is_private_sku: Joi.boolean().optional(),
    private_customers: Joi.array().items(schemaOrg).optional().default([])
};

const schema = Joi.object().keys({
    products: Joi.array().items(schemaProduct)
});

const compareValues = function (productToUpdate, updatedProduct) {
    const attribute = [];
    const compare = [];

    delete productToUpdate.created_at;
    delete productToUpdate.updated_at;
    delete productToUpdate.ProductVariant;

    for (const prop in productToUpdate) {
        attribute.push(prop);
    }

    for (let i = 0; i < attribute.length; i++) {
        const element = attribute[i];

        if (productToUpdate[element] !== updatedProduct[element]) {
            compare.push({
                field: element,
                before: productToUpdate[element],
                after: updatedProduct[element]
            });
        }
    }

    return compare;
};

exports.putProduct = async function (data, context) {
    const Op = DBContext.ORMProvider.Op;

    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const user = Authorization.getUser(context);
    let {
        body: input,
        path
    } = data;

    try {
        input = await Joi.validate(input, schema, { allowUnknown: true });
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    if (input.products.length > 0 && input.products[0].is_bulk === 1 && input.products[0].private_customers && input.products[0].private_customers.length !== 1) {
        throw BizzyError.BadRequest('Cannot edit customer for auto live SKU');
    }

    const result = await ProductVendorRepository.findByProductGroupId(path.pid, path.id);
    if (!result) {
        throw BizzyError.NotFound('Product not found');
    }

    const vendorId = path.id;
    const regex = /[^a-zA-Z0-9]/g;
    await Promise.map(input.products, async (item, index) => {
        const productVendorId = item.id;
        const skuVendor = (item.sku_vendor).toUpperCase();
        input.products[index].sku_vendor = skuVendor;
        const found = skuVendor.match(regex);
        if (found) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} can not contains symbol.`);
        }

        let dataProductVendor = await ProductVendorRepository.findOneDetail({ id: { [Op.ne]: productVendorId }, vendor_id: vendorId, sku_vendor: skuVendor });
        dataProductVendor = JSON.parse(JSON.stringify(dataProductVendor));
        if (dataProductVendor) {
            throw BizzyError.BadRequest(`SKU ${item.sku_vendor} already used.`);
        }

        // Downpayment validation
        Helper.checkValidDownpayment(item);
        Helper.checkIndentProduct(item);

        if (item.is_indent === 0) {
            item.indent_period = '';
            item.indent_limit = 0;
        }
    }, { concurrency: 10 });


    const logs = [];

    await DBContext.startTransaction();
    await Promise.map(input.products, async (item, i) => {
        let element = input.products[i];

        element = Helper.convertToNull(element);
        Helper.tierValidation(input.products[i]);

        const id = element.id;

        delete element.id;
        element.reference_link = JSON.stringify(element.reference_link);

        let productToUpdate = await ProductVendorRepository.findOne({
            id,
            vendor_id: path.id
        });

        if (!productToUpdate) throw BizzyError.NotFound('Product Vendor Not Found');
        productToUpdate = productToUpdate.getValues();

        if (JSON.parse(element.reference_link).length === 0) delete element.reference_link;
        delete element.id;

        try {
            element.is_private_sku = item.is_private_sku;
            await ProductVendorRepository.updateOne(id, path.id, element);

            if (input.products[0].is_bulk === 0) {
                const customersToDelete = productToUpdate.PrivateSkus.filter(p => !(item.private_customers.find(c => c.id === p.customer_id)));
                const customersToInsert = item.private_customers.filter(c => !(productToUpdate.PrivateSkus.find(p => c.id === p.customer_id)));
                await PrivateSkuRepo.delete({ id: customersToDelete.map(p => p.id) });
                const privateSkus = customersToInsert.map(p => ({ product_vendor_id: id, customer_id: p.id }));
                await PrivateSkuRepo.insert(privateSkus);
            }

            // updatecontract
            try {
                await BizzyService.callAsync('bizzy-contract', 'updateBasePriceItem', {
                    context,
                    data: {
                        path: {
                            sku: productToUpdate.ProductVariant.sku
                        },
                        body: {
                            vendor_id: parseInt(path.id),
                            tier_min_qty_1: parseInt(element.tier_min_qty_1),
                            tier_min_qty_2: parseInt(element.tier_min_qty_2) || null,
                            tier_min_qty_3: parseInt(element.tier_min_qty_3) || null,
                            tier_cogs_price_1: parseInt(element.tier_cogs_price_1),
                            tier_cogs_price_2: parseInt(element.tier_cogs_price_2) || null,
                            tier_cogs_price_3: parseInt(element.tier_cogs_price_3) || null
                        }
                    }
                });
            // eslint-disable-next-line no-unused-vars
            } catch (errContract) {
                // const e = errContract.message.replace(/"/g, '');
                // throw new Error(`Gagal Update nilai Kontrak, ${e}`);
            }
        } catch (err) {
            await DBContext.rollback();
            throw BizzyError.BadRequest(err.message);
        }

        // Trigger Webhook for 3rd Party IF entity IS NOT BCI
        if (parseInt(process.env.BCI_ID) !== context.user.customer.organization_id) {
            const pubProduct = TransformerPubUpdate.item(await ProductVendorRepository.findProductVendorWithDetailById({
                id,
                vendor_id: path.id
            }));
            try {
                await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishUpdateProduct', {
                    context,
                    data: {
                        e: pubProduct
                    }
                });
            } catch (err) {
                throw BizzyError.BadRequest(err.message);
            }
        }

        // insert into product log
        let updatedProduct = await ProductVendorRepository.findOne({
            id,
            vendor_id: path.id
        });
        updatedProduct = updatedProduct.getValues();

        const compare = compareValues(productToUpdate, updatedProduct);

        compare.forEach((row) => {
            const title = Transformer.generateLogTitle();
            const field = row.field;
            delete row.field;

            logs.push({
                action: 'putProduct',
                title: (title[field] === undefined) ? 'Ubah Produk Vendor' : title[field],
                product_group_id: parseInt(path.pid),
                product_variant_id: parseInt(updatedProduct.product_variant_id),
                product_vendor_id: parseInt(updatedProduct.id),
                payload: row,
                user: {
                    id: user.customer.person_id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.username,
                    type: 'vendor'
                },
                created_at: updatedProduct.created_at,
                updated_at: updatedProduct.updated_at
            });
        });
    });
    await DBContext.commit();

    if (logs.length > 0) await ProductLogRepository.insertMany(logs);

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: path.pid,
                data: input
            }
        }
    });

    return {
        data: Transformer.item(result),
        message: 'Product berhasil diubah'
    };
};

module.exports = exports;
