'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductGroupAttributeRepository = require('../../../../src/repositories/product_group_attribute');
const AttributeValueRepository = require('../../../../src/repositories/attribute_value');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/product-groups/sku_add');
const SyncRepository = require('../../../../src/repositories/sync_service');

test.serial('Should be return SKU List', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);

    t.context.sandbox.stub(AttributeValueRepository, 'findOne').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves([
        1
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol 32GB',
        variant_value: '{"ink_color":3}',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(SyncRepository, 'countPOBySku').resolves({
        message: 'successfully retrieved total purchase orders by sku',
        data: {
            sku: '9999',
            count: 0
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        const result = yield Methods.putProductGroupSku(data, context);
        const expected = {
            id: 9,
            product_group_id: 3,
            sku: '9999',
            long_name: 'Epson Tinta Refill Botol 32GB',
            variant_value: '{"ink_color":3}',
            primary_image: null,
            additional_image: null,
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: null,
            updated_at: '2018-01-02T10:12:47.000Z'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return SKU List NO_VARIANT', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);

    t.context.sandbox.stub(AttributeValueRepository, 'findAll').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves([
        1
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: 'NO_VARIANT',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(SyncRepository, 'countPOBySku').resolves({
        message: 'successfully retrieved total purchase orders by sku',
        data: {
            sku: '9999',
            count: 0
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        const result = yield Methods.putProductGroupSku(data, context);
        const expected = {
            id: 9,
            product_group_id: 3,
            sku: '9999',
            long_name: 'Epson Tinta Refill Botol',
            variant_value: 'NO_VARIANT',
            primary_image: null,
            additional_image: null,
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: null,
            updated_at: '2018-01-02T10:12:47.000Z'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Product variant is not found: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);

    t.context.sandbox.stub(AttributeValueRepository, 'findAll').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves([
        1
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves(null);

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '8'
            }
        };

        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product variant is not found');
    }
});


test.serial('SKU not in the same category: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);


    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 1,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(AttributeValueRepository, 'findAll').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves([
        1
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol 32GB',
        variant_value: '{"ink_color":3}',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Update failed: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);


    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(AttributeValueRepository, 'findOne').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves(null);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol 32GB',
        variant_value: '{"ink_color":3}',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(SyncRepository, 'countPOBySku').resolves({
        message: 'successfully retrieved total purchase orders by sku',
        data: {
            sku: '9999',
            count: 0
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Update failed');
    }
});

test.serial('Count PO failed: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 3,
        name: 'Epson Tinta Refill Botol',
        category_id: 507,
        brand_id: 466,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 400,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '40.00',
        package_content: 'loremp ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
        variant_count: 1,
        variant_matrix: '["ink_color"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T08:43:09.000Z',
        updated_at: '2017-12-19T08:43:09.000Z'
    });

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 5,
        product_group_id: 3,
        attribute_code_id: 5,
        attribute_value_id: 3,
        text_input: null,
        is_variant: 1,
        created_at: '2017-12-19T08:44:22.000Z',
        updated_at: '2017-12-19T08:44:22.000Z',
        AttributeCode: {
            id: 5,
            code: 'ink_color',
            label: 'Color',
            type: 'dropdown',
            created_at: '2017-12-19T08:38:41.000Z',
            updated_at: '2017-12-19T08:38:41.000Z'
        }
    }]);


    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 507,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(AttributeValueRepository, 'findOne').resolves([{
        id: 3,
        attribute_code_id: 2,
        value: '32GB',
        image_url: null,
        created_at: '2017-12-19T03:41:25.000Z',
        updated_at: '2017-12-19T03:41:25.000Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'update').resolves(null);

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol 32GB',
        variant_value: '{"ink_color":3}',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(SyncRepository, 'countPOBySku').resolves({
        message: 'successfully retrieved total purchase orders by sku',
        data: {
            sku: '9999',
            count: 1
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Sudah terjadi transaksi di SKU ini');
    }
});

test.serial('Empty data: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(null);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
    }]);

    t.context.sandbox.stub(ProductGroupRepository, 'findAndCountAllProductGroup').resolves({
        count: 1,
        rows: [
            {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                category_id: 1,
                brand_id: 466,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'XXXXX',
                manufacturing_number_type: null,
                package_weight: 400,
                package_length: '100.00',
                package_width: '200.00',
                package_height: '40.00',
                package_content: 'loremp ipsum content',
                barcode: null,
                description: 'lorem ipsum description',
                primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                variant_count: 1,
                variant_matrix: '["ink_color"]',
                status: 1,
                visibility: 1,
                created_by: 1,
                created_at: '2017-12-19T08:43:09.000Z',
                updated_at: '2017-12-19T08:43:09.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findById').resolves({
        id: 9,
        product_group_id: 3,
        sku: '9999',
        long_name: 'Epson Tinta Refill Botol 32GB',
        variant_value: '{"ink_color":3}',
        primary_image: null,
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: null,
        updated_at: '2018-01-02T10:12:47.000Z'
    });


    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: '3'
            },
            body: {
                product_variant_id: '9'
            }
        };

        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Invalid input data: Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            body: {
                product_variant_id: ''
            }
        };
        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Invalid context: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: ''
            },
            body: {
                product_variant_id: ''
            }
        };
        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {};
        context.user = '';
        const data = {
            path: {
                id: ''
            },
            body: {
                product_variant_id: ''
            }
        };
        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});


test.serial('You are not logged in: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {};
        context.user = {
            employee: {
                id: ''
            }
        };
        const data = {
            path: {
                id: ''
            },
            body: {
                product_variant_id: ''
            }
        };
        yield Methods.putProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not logged in');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
