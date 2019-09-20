'use strict';

const {
    BizzyService
} = require('bizzy-common');
const moment = require('moment');

exports.reIndexAlgolia = async (data) => {
    const publishedAt = moment().utc().format();
    return BizzyService.publish('re_index_algolia', { algolia: data, publishedAt });
};

exports.delIndexAlgolia = async (data) => {
    const publishedAt = moment().utc().format();
    return BizzyService.publish('del_index_algolia', { removedSku: data, publishedAt });
};

module.exports = exports;
