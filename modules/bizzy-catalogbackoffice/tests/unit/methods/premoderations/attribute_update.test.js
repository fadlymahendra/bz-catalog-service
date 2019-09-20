'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const RepoAttributeValue = require('../../../../src/repositories/attribute_value');
const RepoAttributeCode = require('../../../../src/repositories/attribute_code');
const RepoPremoderation = require('../../../../src/repositories/premoderation');

const Method = require('../../../../src/methods/premoderations/attribute_update');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should update attribute from premoderation with variant', function *(t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    variants: [
                        {
                            attribute_status: "pending"
                        }
                    ],
                    variant_value: {
                        phone_color: 1
                    },
                    variant_status: "pending"
                }                
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'completed' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11,
            created_at: '2018-01-03T09:17:32.700Z',
            updated_at: '2018-01-03T09:54:49.271Z'
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            created_at: '2017-12-19T10:37:02.000Z',
            updated_at: '2017-12-19T10:37:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateAttributeValueByProduct').resolves(
        {n: 0, nModified: 0, ok: 1}
    );
    
    t.context.sandbox.stub(RepoPremoderation, 'updateVariantStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }
    
        const result = yield Method.putPremoderationAttribute(data, context);
        const expected = {
            "data": {
                "id": "1514971052700",
                "created_at": "2018-01-03T09:17:32.700Z",
                "updated_at": "2018-01-03T09:54:49.271Z"
            }
        };

        t.deepEqual(result, expected);

    } catch(err){
        console.log(err);
    }
});

test.serial('Should update attribute from premoderation with variant', function *(t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    variants: [
                        {
                            attribute_status: "pending"
                        }
                    ],
                    variant_value: {
                        phone_color: 1
                    },
                    variant_status: "completed"
                }                
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'completed' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11,
            created_at: '2018-01-03T09:17:32.700Z',
            updated_at: '2018-01-03T09:54:49.271Z'
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            created_at: '2017-12-19T10:37:02.000Z',
            updated_at: '2017-12-19T10:37:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateAttributeValueByProduct').resolves(
        {n: 0, nModified: 0, ok: 1}
    );
    
    t.context.sandbox.stub(RepoPremoderation, 'updateVariantStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }
    
        const result = yield Method.putPremoderationAttribute(data, context);
        const expected = {
            "data": {
                "id": "1514971052700",
                "created_at": "2018-01-03T09:17:32.700Z",
                "updated_at": "2018-01-03T09:54:49.271Z"
            }
        };

        t.deepEqual(result, expected);

    } catch(err){
        console.log(err);
    }
});

test.serial('Should update attribute from premoderation with non variant', function *(t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    id: 1
                }
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'pending' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11,
            created_at: '2018-01-03T09:17:32.700Z',
            updated_at: '2018-01-03T09:54:49.271Z'
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            created_at: '2017-12-19T10:37:02.000Z',
            updated_at: '2017-12-19T10:37:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateAttributeValueByProduct').resolves(
        {n: 0, nModified: 0, ok: 1}
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateSpecificationStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": 0,        
                "attribute_value_id": 6
            }
        }
    
        const result = yield Method.putPremoderationAttribute(data, context);
        const expected = {
            "data": {
                "id": "1514971052700",
                "created_at": "2018-01-03T09:17:32.700Z",
                "updated_at": "2018-01-03T09:54:49.271Z"
            }
        };

        t.deepEqual(result, expected);

    } catch(err){
        console.log(err);
    }
});

test.serial('Should update attribute from premoderation with non variant', function *(t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    id: 1
                }
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'completed' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            created_at: '2017-12-19T10:37:02.000Z',
            updated_at: '2017-12-19T10:37:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateAttributeValueByProduct').resolves(
        {n: 0, nModified: 0, ok: 1}
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateSpecificationStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": 0,        
                "attribute_value_id": 6
            }
        }
    
        const result = yield Method.putPremoderationAttribute(data, context);
        const expected = {
            "data": {
                "id": "1514971052700",
                "created_at": '2017-12-19T03:43:04.000Z',
                "updated_at": '2017-12-19T03:43:04.000Z' 
            }
        };

        t.deepEqual(result, expected);

    } catch(err){
        console.log(err);
    }
});

test.serial('Should return Attribute Code not Found', function *(t){
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        {
            _id: '5a4c9facd270e75f7299ec99',
            id: '1514971052700',
            type: 'new'            
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { 
            id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null
        }
    );    

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(false);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }

        const result = yield Method.putPremoderationAttribute(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('Should return Badrequest when update attribute without index', function *(t){

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": 1,
                "attribute_value_id": "6",
                "index": ""
            }
        }

        const result = yield Method.putPremoderationAttribute(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should return Attribute Value not Found', function *(t){
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        {
            _id: '5a4c9facd270e75f7299ec99',
            id: '1514971052700',
            type: 'new'            
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(false);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }

        const result = yield Method.putPremoderationAttribute(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('Should return BadRequest, Unprocess Data', function *(t) {
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    id: 1                    
                }
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'pending' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11,
            created_at: '2018-01-03T09:17:32.700Z',
            updated_at: '2018-01-03T09:54:49.271Z'
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null,
            created_at: '2017-12-19T03:43:04.000Z',
            updated_at: '2017-12-19T03:43:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'dropdown',
            created_at: '2017-12-19T10:37:02.000Z',
            updated_at: '2017-12-19T10:37:04.000Z' 
        }
    );

    t.context.sandbox.stub(RepoPremoderation, 'updateAttributeValueByProduct').throws("Error");

    t.context.sandbox.stub(RepoPremoderation, 'updateSpecificationStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": 0,        
                "attribute_value_id": 6
            }
        }
            
        yield Method.putPremoderationAttribute(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, 'You are not authorized user');
    }
});

test.serial('Should return Premoderation not Found', function *(t){
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(false);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }

        const result = yield Method.putPremoderationAttribute(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('Should return BadRequest payload not valid', function *(t){    
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "",
                "attribute_id": "3"
            },
            body: {
                "is_variant": "1",        
                "attribute_value_id": "6"
            }
        }

        const result = yield Method.putPremoderationAttribute(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Deny to update attribute code with type textinput', function *(t){
    t.context.sandbox.stub(RepoPremoderation, 'findById').resolves(
        { _id: '5a4c9facd270e75f7299ec99',
        id: '1514971052700',
        type: 'new',
        payload:{   
            products: [
                {
                    id: 1
                }
            ],
            name: 'Apple iPhone 7',
            category_id: 561,
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 1,
            quantity_stocking_uom: 1,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_height: '300.00',
            package_width: '200.00',
            package_content: 'lorem ipsum content',
            barcode: '123',
            description: 'lorem ipsum description',
            variant_count: 2,
            variant_matrix: [ 'phone_color', 'phone_storage' ],
            specifications: [],
            category: { c0: 8, c1: 52, c2: 219, c3: 561 },
            specification_status: 'pending' },
            premoderation_status: 'need_revision',
            vendor_id: 13,
            created_by: 11
        }
    );

    t.context.sandbox.stub(RepoAttributeValue, 'findById').resolves(
        { id: 6,
            attribute_code_id: 3,
            value: 'Android',
            image_url: null
        }
    );

    t.context.sandbox.stub(RepoAttributeCode, 'findById').resolves(
        { id: 3,
            code: 'phone_os',
            label: 'Sistem Operasi',
            type: 'textinput'
        }
    );
    
    t.context.sandbox.stub(RepoPremoderation, 'updateSpecificationStatus').resolves(true);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1514971052700",
                "attribute_id": "3"
            },
            body: {
                "is_variant": 0,        
                "attribute_value_id": 6
            }
        }
            
        yield Method.putPremoderationAttribute(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, 'You are not authorized user');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            "path": {
                "id": "101"
            },
            "body": {                
            }
        }
        yield Method.putPremoderationAttribute(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function*(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test',function*(t) {
    t.context.sandbox.restore();
});

