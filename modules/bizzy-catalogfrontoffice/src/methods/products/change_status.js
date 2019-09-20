'use strict';

const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductVendorRepository = require('../../repositories/product_vendor');
const Transformer = require('../../transformers/products/change_status');

const schemaPath = Joi.object().keys({
    id: Joi.string().required(),
    pid: Joi.string().required()
});

const schema = Joi.object().keys({
    is_active: Joi.number().only(0, 1).required()
});


exports.putProductStatus = async function putProductStatus(data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        path: inputPath,
        body: inputBody
    } = data;

    try {
        inputPath = await Joi.validate(inputPath, schemaPath);
        inputBody = await Joi.validate(inputBody, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        id: parseInt(inputPath.pid),
        vendor_id: parseInt(inputPath.id)
    };
    let product = await ProductVendorRepository.findOne(wheres);

    if (!product) {
        throw BizzyError.NotFound('Product Not Found');
    }

    await ProductVendorRepository.update(inputPath.pid, inputPath.id, inputBody);
    product = await ProductVendorRepository.findById(inputPath.pid);
    const result = product.getValues();

    inputBody.product_vendor_id = product.id;
    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_variant',
                id: product.ProductVariant.sku,
                data: inputBody
            }
        }
    });

    return {
        data: Transformer.item(result),
        message: 'Ubah status product berhasil'
    };
};

module.exports = exports;
