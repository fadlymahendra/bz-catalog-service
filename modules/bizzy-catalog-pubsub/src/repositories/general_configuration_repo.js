'use strict';

const { MongoContext, BizzyError } = require('bizzy-common');

const COLLECTION_NAME = 'general_configuration';

exports.findOne = async () => {
    try {
        const mongoClient = await MongoContext.getInstance();
        return mongoClient.collection(COLLECTION_NAME).findOne();
    } catch (error) {
        throw BizzyError.InternalServerError(error.message);
    }
};

exports.deleteManyProductMapping = async (items, catalogId, organizationId) => {
    try {
        const mongoClient = await MongoContext.getInstance();
        return mongoClient.collection(COLLECTION_NAME).deleteMany({
            product_sku: { $in: items },
            'payload.catalog_id': catalogId,
            'payload.organization_id': organizationId
        });
    } catch (error) {
        throw BizzyError.InternalServerError(error.message);
    }
};
