'use strict';

const Promise = require('bluebird');
const {
    Handler,
    DBContext,
    MongoContext,
    BizzyError,
    BizzyService
} = require('bizzy-common');

Handler.configure({
    environment: Handler.Types.AWS_LAMBDA,
    context: exports
});

DBContext.configure({
    path: 'catalog-models',
    connection_string_key: 'DB_CONNECTION_STRING'
});

Handler.registerDBContext(DBContext);

MongoContext.configure({
    connection_string_key: 'MONGO_CONNECTION_STRING'
});

Handler.registerMongoContext(MongoContext);

// region ACTIONS

Handler.registerMethods('publish');
Handler.registerMethods('webhook');
Handler.registerMethods('subscribe');

// endregion

Handler.registerHandler();

BizzyService.configure({
    handler: Handler
});

BizzyError.configure({
    handler: Handler
});
