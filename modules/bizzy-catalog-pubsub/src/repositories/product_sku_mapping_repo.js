'use strict';

const { MongoContext, BizzyError } = require('bizzy-common');

const COLLECTION_NAME = 'product_sku_mapping';

exports.syncProductSkuMapping = async (sku, catalogId, organizationId, user) => {
    try {
        const mongoClient = await MongoContext.getInstance();
        return mongoClient.collection(COLLECTION_NAME).findOneAndUpdate(
            {
                product_sku: sku,
                'payload.catalog_id': catalogId,
                'payload.organization_id': organizationId
            },
            {
                $setOnInsert: {
                    id: new Date().getTime().toString(),
                    product_sku: sku,
                    payload: {
                        catalog_id: catalogId,
                        organization_id: organizationId,
                        material_code: '',
                        material_group: '',
                        mapped: 0
                    },
                    user,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            },
            {
                upsert: true
            }
        );
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
