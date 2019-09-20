'use strict';

const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_group');
const RepoProductVariant = require('../../repositories/product_variant');

const schemaPath = Joi.object().keys({
    id: Joi.number().required()
});

exports.deleteProductGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let path;

    try {
        path = await Joi.validate(data.path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const findId = await Repo.findByIdWithDetail(path.id);
    if (!findId) {
        throw BizzyError.NotFound('Product not found');
    }
    const findProductVariant = await RepoProductVariant.findByIdProductGroup(path.id);
    if (findProductVariant.length > 0) {
        throw BizzyError.BadRequest('Product can not be deleted');
    }

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: path.id,
                data: path
            }
        }
    });

    try {
        const del = await Repo.delete(path.id);
        if (!del) {
            throw BizzyError.InternalServerError('Problem Database Occur');
        }
    } catch (err) {
        throw BizzyError.UnprocessableEntity(err.message);
    }

    return ''; // Delete never return data
};

module.exports = exports;
