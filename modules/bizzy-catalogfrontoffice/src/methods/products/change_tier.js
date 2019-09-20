'use strict';

const { BizzyError, BizzyService, DBContext } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/products/change_tier');
const TransformerPubUpdate = require('../../transformers/products/pub_update');
const _ = require('lodash');

const schemaPath = Joi.object().keys({
    id: Joi.number().required(),
    pid: Joi.number().required()
});

const schema = Joi.object().keys({
    tier_min_qty_1: Joi.number().required(),
    tier_min_qty_2: Joi.number().allow(''),
    tier_min_qty_3: Joi.number().allow(''),
    tier_cogs_price_1: Joi.number().required(),
    tier_cogs_price_2: Joi.number().allow(''),
    tier_cogs_price_3: Joi.number().allow('')
});

exports.putProductTier = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }
    const user = Authorization.getUser(context);
    let {
        path,
        body: input
    } = data;

    try {
        path = await Joi.validate(path, schemaPath);
        input = await Joi.validate(input, schema);
        input = Helper.convertToNullInteger(input);
        Helper.tierValidation(input);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        id: parseInt(path.pid),
        vendor_id: parseInt(path.id)
    };
    const product1 = await ProductVendorRepository.findOne(wheres);
    if (!product1) {
        throw BizzyError.NotFound('Product Not Found');
    }

    try {
        await DBContext.startTransaction();
        await ProductVendorRepository.update(path.pid, path.id, input);

        // updatecontract
        try {
            await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
                data: {
                    body: {
                        type: 'product_variant',
                        id: product1.ProductVariant.sku,
                        data: {}
                    }
                }
            });
        } catch (errContract) {
            const e = errContract.message.replace(/"/g, '');
            throw new Error(`Gagal Update nilai Kontrak, ${e}`);
        }
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err.message);
    }
    await DBContext.commit();

    const product2 = await ProductVendorRepository.findOne(wheres);
    const result = product2.getValues();

    const logFrame = Transformer.payloadLog(product2, user);
    const logs = Helper.generateProductlog(_, logFrame, Helper.parseDataObject(product1), Helper.parseDataObject(product2));
    if (logs.length > 0) {
        await ProductLogRepository.insertMany(logs);

        input.product_vendor_id = product2.id;
        await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_variant',
                    id: product2.ProductVariant.sku,
                    data: input
                }
            }
        });
    }

    // Trigger Webhook for 3rd Party IF entity IS NOT BCI
    if (parseInt(process.env.BCI_ID) !== context.user.customer.organization_id) {
        const pubProduct = TransformerPubUpdate.item(await ProductVendorRepository.findProductVendorWithDetailById({
            id: path.pid,
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

    return {
        data: Transformer.item(result),
        message: 'Ubah jumlah dan harga grosir berhasil'
    };
};

module.exports = exports;
