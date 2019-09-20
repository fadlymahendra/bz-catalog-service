/* eslint-disable linebreak-style */

'use strict';

const { MongoContext } = require('bizzy-common');

exports.getOrganizations = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    const result = db.collection('organization_sub').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort);

    const count = await result.count();
    const data = await result.toArray();

    return { data, total: count };
};
