'use strict';

const Promise = require('bluebird');
const {
    Handler,
    DBContext,
    RedisContext,
    BizzyError,
    BizzyService,
    MongoContext
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

RedisContext.configure({
    connection_string_key: 'REDIS_CONNECTION_STRING'
});

Handler.registerRedisContext(RedisContext);

MongoContext.configure({
    connection_string_key: 'MONGO_CONNECTION_STRING'
});

Handler.registerMongoContext(MongoContext);

// region ACTIONS

Handler.registerMethods('categories/tree_menu');
Handler.registerMethods('categories/category_all');

Handler.registerMethods('algolia/reindex');
Handler.registerMethods('algolia/reindex_all');
Handler.registerMethods('algolia/delete_index');
Handler.registerMethods('algolia/setting_index');
Handler.registerMethods('algolia/search_index');

Handler.registerMethods('categories/sku_payment');

Handler.registerMethods('product-detail/variant');
Handler.registerMethods('product-stock/update');
Handler.registerMethods('product-stock/reverse');

Handler.registerMethods('product-detail/sku');
Handler.registerMethods('product-detail/sku_multiple');
Handler.registerMethods('product-detail/vendor');
Handler.registerMethods('product-detail/vendor_price');
Handler.registerMethods('sku-managements/list');
Handler.registerMethods('uoms/list');
Handler.registerMethods('product-detail/snapshot');

// Sebastian POC
Handler.registerMethods('algolia/create_mapping');

// importer from MySQL to Mongo
Handler.registerMethods('importer/import');

// public catalog
Handler.registerMethods('public/category');
Handler.registerMethods('public/variant');

// endregion
Handler.registerHandler();

BizzyService.configure({
    handler: Handler
});

BizzyError.configure({
    handler: Handler
});
