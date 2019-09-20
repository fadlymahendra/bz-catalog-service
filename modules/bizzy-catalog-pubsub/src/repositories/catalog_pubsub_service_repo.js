'use strict';

const { BizzyService, BizzyError } = require('bizzy-common');

const serviceName = 'bizzy-catalog-pubsub';

exports.upsertProductSkuMapping = async (id, context) => {
    try {
        return BizzyService.callAsync(serviceName, 'upsertProductSkuMapping', {
            context,
            data: {
                id
            }
        });
    } catch (error) {
        throw BizzyError.ServiceUnavailable(error.message);
    }
};

module.exports = exports;
