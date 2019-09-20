'use strict';

const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_group');
const ProductVariantRepo = require('../../repositories/product_variant');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/product-groups/change_visibility');
const Helper = require('../../utils/helper');
const _ = require('lodash');

const CHANGE_VISIBILITY_ACTION = 'putProductGroupVisibility';

const schemaPath = Joi.object().keys({
    id: Joi.number().required()
});

const schemaBody = Joi.object().keys({
    visibility: Joi.number().required()
});

exports.putProductGroupVisibility = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }
    const user = Authorization.getUser(context);
    let path;
    let input;
    let alterSKU;

    try {
        path = await Joi.validate(data.path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    try {
        input = await Joi.validate(data.body, schemaBody);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const findId = await Repo.findByIdWithDetail(path.id);

    if (!findId) {
        throw BizzyError.NotFound('Product not found');
    }

    if (findId.visibility === input.visibility) {
        const msg = input.visibility === 1 ? 'Active' : 'Non Active';
        throw BizzyError.BadRequest(`Product Group is already ${msg}`);
    }

    await DBContext.startTransaction();

    try {
        const Op = DBContext.ORMProvider.Op;

        const update = await Repo.update(path.id, input);
        if (!update) {
            throw BizzyError.BadRequest('Fail to change visibility');
        }

        alterSKU = await ProductVariantRepo.findAll({
            product_group_id: path.id,
            is_active: input.visibility === 1 ? 0 : 1
        });

        alterSKU = Helper.parseDataObject(alterSKU);
        alterSKU = alterSKU.map((el) => { return el.id; });

        const whereSKU = {
            product_group_id: path.id
        };
        const lastUpdate = await ProductLogRepository.findLastAction(path.id, CHANGE_VISIBILITY_ACTION);

        if (lastUpdate.constructor === Array && lastUpdate.length > 0 && input.visibility === 1) {
            const payload = lastUpdate[0].payload.altered_sku;

            const listSKU = _.split(payload, ',');
            if (listSKU.length > 0 && listSKU[0] !== '') {
                whereSKU.id = {
                    [Op.in]: listSKU
                };
            }
        }

        await ProductVariantRepo.updateMany(whereSKU, {
            is_active: input.visibility
        });
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err.message);
    }

    await DBContext.commit();

    const log = {
        action: 'putProductGroupVisibility',
        title: 'Change Visibility',
        product_group_id: parseInt(path.id),
        payload: {
            visibility: input.visibility,
            altered_sku: _.join(alterSKU, ',')
        },
        user: {
            id: user.employee.id,
            name: user.employee.name,
            email: user.username,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };

    await ProductLogRepository.insertOne(log);

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: path.id,
                data: input
            }
        }
    });

    return {
        data: Transformer.item({
            id: path.id,
            visibility: input.visibility
        }),
        message: 'Change product group visibility is successfully'
    };
};

module.exports = exports;
