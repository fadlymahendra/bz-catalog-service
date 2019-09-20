'use strict';

const { MongoContext } = require('bizzy-common');

exports.findAll = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').find(wheres).toArray();
};
