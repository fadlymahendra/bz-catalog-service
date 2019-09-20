'use strict';

const { MongoContext, BizzyError } = require('bizzy-common');

const COLLECTION_NAME = 'organization_sub';

exports.addOrganizationSub = async (data) => {
    try {
        const mongoClient = await MongoContext.getInstance();
        return mongoClient.collection(COLLECTION_NAME).replaceOne(
            { id: data.id }, data, {upsert: true})
    } catch (error) {
        throw BizzyError.InternalServerError(error.message);
    }
};