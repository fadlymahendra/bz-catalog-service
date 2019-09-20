'use strict';

const { MongoContext, BizzyError } = require('bizzy-common');

const COLLECTION_NAME = 'organization_sub';

exports.getOrganizationSubs = async (where) => {
    try {
        const mongoClient = await MongoContext.getInstance();
        return mongoClient.collection(COLLECTION_NAME).find({ id: { $in: where } }).toArray();
    } catch (error) {
        throw BizzyError.InternalServerError(error.message);
    }
};
