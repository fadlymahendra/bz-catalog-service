'use strict';

const { BizzyError, DBContext } = require('bizzy-common');
const Promise = require('bluebird');
const Joi = require('joi');
const Algoliasearch = require('algoliasearch');
const CategoryRepository = require('../../repositories/category');
const CategoryTransformer = require('../../transformers/categories/tree_menu');

const schema = Joi.object().keys({
    ids: Joi.string().required()
});

const algoliaConnect = function () {
    return Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
};

exports.getSkuByCategoriesId = async function (data, context) {
    let {
        query: input
    } = data;

    const algolia = algoliaConnect();
    const index = algolia.initIndex(process.env.ALGOLIA_INDICES);

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const { Op } = await DBContext.ORMProvider;
    const where = {
        id: {
            [Op.in]: input.ids.split(',')
        }
    };
    const dataCategories = await CategoryRepository.findAll(where, 0, 999999999);
    const result = [];
    await Promise.map(dataCategories, async (item) => {
        const searchParams = {
            facetFilters: []
        };
        const temp = [];
        const level = (item.level).toLowerCase();
        const urlkey = CategoryTransformer.getUrlKey(item.name, level, item.id);

        temp.push(`hierarchical_categories.${level}.url_key:${urlkey}`);
        searchParams.facetFilters.push(temp);
        const resultSearch = await index.search(searchParams);
        result.push({
            id: item.id,
            total_sku: resultSearch.nbHits
        });
    });

    return result;
};

module.exports = exports;

