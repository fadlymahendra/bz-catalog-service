'use strict';

const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/products/change_stock');
const TransformerPubUpdate = require('../../transformers/products/pub_update');
const _ = require('lodash');

const schemaPath = Joi.object().keys({
    id: Joi.number().required(),
    pid: Joi.number().required()
});

const schema = Joi.object().keys({
    stock_available: Joi.number().min(0).required()
});

exports.putProductStock = async function putProductStock(data, context) {
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

    await ProductVendorRepository.update(path.pid, path.id, input);
    const product2 = await ProductVendorRepository.findOne(wheres);
    const result = product2.getValues();

    const logFrame = Transformer.payloadLog(product2, user);
    const logs = Helper.generateProductlog(_, logFrame, Helper.parseDataObject(product1), Helper.parseDataObject(product2));
    await ProductLogRepository.insertOne(logs[0]);

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
        message: 'Ubah stok product berhasil'
    };
};

module.exports = exports;
