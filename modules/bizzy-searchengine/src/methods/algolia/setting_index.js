'use strict';


const Algoliasearch = require('algoliasearch');

const algoliaConnect = function () {
    return Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
};

exports.putSetting = async function (data, context) {
    const algolia = algoliaConnect();
    const index = algolia.initIndex(process.env.ALGOLIA_INDICES);

    const result = index.getSettings();

    return index.setSettings(result, { forwardToReplicas: true });
};

module.exports = exports;
