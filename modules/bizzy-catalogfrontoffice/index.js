/* eslint-disable linebreak-style */
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

Handler.registerMethods('categories/list');
Handler.registerMethods('categories/detail');
Handler.registerMethods('categories/attribute');

Handler.registerMethods('brand');
Handler.registerMethods('uom');
Handler.registerMethods('stocking_uom');
Handler.registerMethods('warranty_option');
Handler.registerMethods('warranty_period');
Handler.registerMethods('indent_period');
Handler.registerMethods('upload_image');

Handler.registerMethods('product-groups/list');
Handler.registerMethods('product-groups/detail');
Handler.registerMethods('product-groups/category');

Handler.registerMethods('products/list');
Handler.registerMethods('products/detail');
Handler.registerMethods('products/create');
Handler.registerMethods('products/update');
Handler.registerMethods('products/change_status');
Handler.registerMethods('products/change_tier');
Handler.registerMethods('products/change_stock');
Handler.registerMethods('products/history');
Handler.registerMethods('products/create_group');
Handler.registerMethods('products/delete_group');
Handler.registerMethods('products/list_group');
Handler.registerMethods('products/create_mapping');
Handler.registerMethods('products/update_mapping');
Handler.registerMethods('products/check_mapping');
Handler.registerMethods('products/delete_mapping');
Handler.registerMethods('products/list_mapping');
Handler.registerMethods('products/download_template');
Handler.registerMethods('products/bulk_upload');
Handler.registerMethods('products/bulk_update');
Handler.registerMethods('products/list_customer');
Handler.registerMethods('products/list_entity');

Handler.registerMethods('premoderations/list');
Handler.registerMethods('premoderations/detail');
Handler.registerMethods('premoderations/create');
Handler.registerMethods('premoderations/update');

Handler.registerMethods('summary/product_count');
Handler.registerMethods('summary/product_stock');

// Cat Man
Handler.registerMethods('filter_catman');

// external (vendor) api
Handler.registerMethods('externals/update');

// Contract
Handler.registerMethods('product-contract/download_contract_template');

// endregion

Handler.registerHandler();

BizzyService.configure({
    handler: Handler
});

BizzyError.configure({
    handler: Handler
});
