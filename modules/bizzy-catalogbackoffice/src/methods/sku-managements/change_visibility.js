'use strict';

const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductGroupRepository = require('../../repositories/product_group');

const Transformer = require('../../transformers/sku-managements/change_visibility');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    is_active: Joi.number()
});


exports.putSkuManagementVisibility = async function (data, context) {
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

    const id = parseInt(data.path.id);
    delete input.id;

    const findId = await ProductVariantRepository.findOne(id);

    if (!findId) {
        throw BizzyError.NotFound('Sku Not Found');
    }

    await ProductVariantRepository.update(id, input);

    // cek count product variant
    let activeParams;
    if (input.is_active === 1) {
        activeParams = 0;
    } else {
        activeParams = 1;
    }

    const wheres = {
        product_group_id: parseInt(findId.product_group_id),
        is_active: activeParams
    };

    const variantCount = await ProductVariantRepository.findCountVariant(wheres);

    const dataWheres = {};
    if (variantCount.count === 0 && input.is_active === 0) {
        dataWheres.visibility = 0;
    } else {
        dataWheres.visibility = 1;
    }
    await ProductGroupRepository.update(findId.product_group_id, dataWheres);

    let result = await ProductVariantRepository.findByIdWithDetail(id);
    result = Helper.parseDataObject(result);

    input.product_group_id = findId.product_group_id;
    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_variant',
                id: findId.sku,
                data: input
            }
        }
    });

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: findId.product_group_id,
                data: dataWheres
            }
        }
    });

    return {
        data: Transformer.item(result),
        message: 'Change Visibility Sku Success'
    };
};

module.exports = exports;
