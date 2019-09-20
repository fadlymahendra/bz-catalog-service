'use strict';

const { MongoContext } = require('bizzy-common');

exports.findOrganizationsByIds = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('organzation_sub')
        .find(wheres)
        .toArray();
};
