'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const ProductGroupRepository = require('../../repositories/product_group');
const Transformer = require('../../transformers/algolia/reindex_all');

const schema = Joi.object().keys({
    start: Joi.number().positive().required(),
    end: Joi.when('start', {
        is: Joi.number(),
        then: Joi.number().greater(Joi.ref('start')).required(),
        otherwise: Joi.number().positive().required()
    })
});

exports.reindexAll = async function (data, context) {
    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let cursor = 0;
    const concurrency = 100;
    const diff = (input.end - input.start) + 1;
    const iteration = Math.ceil(diff / concurrency);

    const Op = DBContext.ORMProvider.Op;

    for (let i = 1; i <= iteration; i++) {
        const rangeBetween = [];
        if (i === 1) {
            rangeBetween.push(input.start);
            cursor = (input.start + concurrency) - 1;
            rangeBetween.push(cursor);
        } else if (i === iteration) {
            rangeBetween.push(cursor + 1);
            rangeBetween.push(input.end);
        } else {
            rangeBetween.push(cursor + 1);
            cursor += concurrency;
            rangeBetween.push(cursor);
        }

        const wheres = {
            id: {
                [Op.between]: rangeBetween
            }
        };
        const result = await ProductGroupRepository.findAllBetween(wheres);

        await Promise.map(result, async (row) => {
            if (row.status === 1 && row.visibility === 1) {
                await BizzyService.callAsync('bizzy-searchengine', 'reindex', Transformer.item(row));
            } else {
                await BizzyService.callAsync('bizzy-searchengine', 'deleteIndex', Transformer.item(row));
            }
        }, {
            concurrency
        });

        await Promise.delay(500);
    }

    return {
        data: {
            total_data: diff,
            start: input.start,
            end: input.end,
            iteration,
            concurrency,
            message: 'Already success reindex all'
        }
    };
};

module.exports = exports;
