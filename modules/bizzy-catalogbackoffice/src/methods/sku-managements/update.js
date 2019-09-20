'use strict';

const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_variant');
const ProductGroupRepository = require('../../repositories/product_group');
const Transformer = require('../../transformers/sku-managements/detail');
const RepoGeneral = require('../../repositories/general');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    primary_image: Joi.string().required(),
    additional_image: Joi.array()
});

exports.putSkuManagement = async function (data, context) {
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

    const findId = await Repo.findOne(id);

    if (!findId) {
        throw BizzyError.NotFound('Sku Not Found');
    }

    input.additional_image = JSON.stringify(input.additional_image);

    await DBContext.startTransaction();

    try {
        await Repo.update(id, input);

        if (findId.is_primary === 1) {
            await ProductGroupRepository.update(findId.product_group_id, {
                primary_image: input.primary_image
            });
        }
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.InternalServerError(err.message);
    }

    await DBContext.commit();

    let result = await Repo.findByIdWithDetail(id);
    result = Helper.parseDataObject(result);
    result.variants = [];

    if (result.variant_value !== 'NO_VARIANT') {
        const variantValue = JSON.parse(result.variant_value);
        const variants = await RepoGeneral.findAttributeByVariantValue(variantValue);

        result.variants = variants;
    }

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_variant',
                id: result.sku,
                data: input
            }
        }
    });

    return Transformer.item(result);
};

module.exports = exports;
