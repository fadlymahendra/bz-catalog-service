'use strict';

const Promise = require('bluebird');
const { Handler, DBContext, MongoContext, BizzyError, BizzyService } = require('bizzy-common');

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
Handler.registerMethods('brands/list');
Handler.registerMethods('brands/detail');
Handler.registerMethods('brands/create');
Handler.registerMethods('brands/update');
Handler.registerMethods('brands/delete');

Handler.registerMethods('uoms/list');
Handler.registerMethods('uoms/detail');
Handler.registerMethods('uoms/create');
Handler.registerMethods('uoms/update');
Handler.registerMethods('uoms/delete');

Handler.registerMethods('stocking-uoms/list');
Handler.registerMethods('stocking-uoms/detail');
Handler.registerMethods('stocking-uoms/create');
Handler.registerMethods('stocking-uoms/update');
Handler.registerMethods('stocking-uoms/delete');

Handler.registerMethods('categories/list');
Handler.registerMethods('categories/list_all');
Handler.registerMethods('categories/detail');
Handler.registerMethods('categories/detail_single');
Handler.registerMethods('categories/attribute');
Handler.registerMethods('categories/create');
Handler.registerMethods('categories/update');
Handler.registerMethods('categories/history');
Handler.registerMethods('categories/delete');
Handler.registerMethods('categories/change_status');

Handler.registerMethods('attributes/detail');

Handler.registerMethods('premoderations/list');
Handler.registerMethods('premoderations/detail');
Handler.registerMethods('premoderations/assign');
Handler.registerMethods('premoderations/brand_create');
Handler.registerMethods('premoderations/attribute_create');
Handler.registerMethods('premoderations/attribute_update');
Handler.registerMethods('premoderations/pg_search');
Handler.registerMethods('premoderations/reject_list');
Handler.registerMethods('premoderations/confirm_reject');
Handler.registerMethods('premoderations/confirm_approve');
Handler.registerMethods('premoderations/change_status');
Handler.registerMethods('premoderations/history');

Handler.registerMethods('product-groups/list');
Handler.registerMethods('product-groups/detail');
Handler.registerMethods('product-groups/create');
Handler.registerMethods('product-groups/update');
Handler.registerMethods('product-groups/delete');
Handler.registerMethods('product-groups/change_visibility');
Handler.registerMethods('product-groups/sku_list');
Handler.registerMethods('product-groups/sku_search');
Handler.registerMethods('product-groups/sku_add');
Handler.registerMethods('product-groups/history');

Handler.registerMethods('sku-managements/list');
Handler.registerMethods('sku-managements/delete');
Handler.registerMethods('sku-managements/detail');
Handler.registerMethods('sku-managements/update');
Handler.registerMethods('sku-managements/create');
Handler.registerMethods('sku-managements/change_visibility');
Handler.registerMethods('sku-managements/detail_ecart');
Handler.registerMethods('sku-managements/detail_for_ecart');
Handler.registerMethods('sku-managements/list_multiple');
Handler.registerMethods('sku-managements/detail_price_engine');

Handler.registerMethods('mails/premoderation_approved');
Handler.registerMethods('mails/premoderation_rejected');
Handler.registerMethods('mails/premoderation_revision');
Handler.registerMethods('mails/premoderation_assign');

Handler.registerMethods('variants/create');
Handler.registerMethods('variants/delete');
Handler.registerMethods('variants/history');
Handler.registerMethods('variants/detail');
Handler.registerMethods('variants/list');
Handler.registerMethods('variants/update');
Handler.registerMethods('products/bulk_upload');

Handler.registerMethods('products/bulk_upload');

Handler.registerMethods('upload_image');
Handler.registerMethods('cron');
Handler.registerMethods('product_sku_sync');

// endregion

Handler.registerHandler();

BizzyService.configure({
    handler: Handler
});

BizzyError.configure({
    handler: Handler
});
