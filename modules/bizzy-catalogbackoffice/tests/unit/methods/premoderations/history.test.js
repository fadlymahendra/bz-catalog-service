'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const Methods = require('../../../../src/methods/premoderations/history');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Premoderation History List', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({"id": "1513934336601"});
    t.context.sandbox.stub(PremoderationLogRepository, 'findAll').resolves(
        [
            {
                "_id": "5a412eee014b801ea43b1a92",
                "premoderation_id": "1513934336601",
                "product_name": "Product Baru",
                "reject_reasons": {
                    "product_data": "",
                    "sku_list": "",
                    "product_specification": "",
                    "description": "",
                    "product_details": "",
                    "package_dimension": "",
                    "warranty": "",
                    "totally_reject": "Barang Ilegal"
                },
                "user": {
                    "id": 2, 
                    "name": "admin@bizzy.co.id", 
                    "email": "Admin Bizzy", 
                    "type": "employee"
                }, 
                "last_status" : "revision_complete", 
                "current_status" : "rejected", 
                "created_at": "2017-12-25T17:01:34.056Z",
                "updated_at": "2017-12-25T17:01:34.056Z"
            }
        ]
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "query": {
                "sort": "created_at_desc",
                "page": 1,
                "limit": 1
            }
        }

        const result = yield Methods.getPremoderationHistory(data, context);
        const expected = {
            "data": [
                {
                    "id": "5a412eee014b801ea43b1a92",
                    "premoderation_id": "1513934336601",
                    "product_name": "Product Baru",
                    "reject_reasons": {
                        "product_data": "",
                        "sku_list": "",
                        "product_specification": "",
                        "description": "",
                        "product_details": "",
                        "package_dimension": "",
                        "warranty": "",
                        "totally_reject": "Barang Ilegal"
                    },
                    "user": {
                        "id": 2, 
                        "name": "admin@bizzy.co.id", 
                        "email": "Admin Bizzy", 
                        "type": "employee"
                    },
                    "last_status" : "revision_complete", 
                    "current_status" : "rejected", 
                    "created_at": "2017-12-25T17:01:34.056Z",
                    "updated_at": "2017-12-25T17:01:34.056Z"
                }
            ],
            "meta": {
                "page": 1,
                "limit": 1,
                "total_data": 1,
                "total_page": 1
            }
        }
        t.deepEqual(result, expected);
    } catch(err) {
        //console.log(err.message);
        console.log(err);
    }
});

test.serial('Should be return Premoderation History List Ascending', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({"id": "1513934336601"});
    t.context.sandbox.stub(PremoderationLogRepository, 'findAll').resolves(
        [
            {
                "_id": "5a412eee014b801ea43b1a92",
                "premoderation_id": "1513934336601",
                "product_name": "Product Baru",
                "reject_reasons": {
                    "product_data": "",
                    "sku_list": "",
                    "product_specification": "",
                    "description": "",
                    "product_details": "",
                    "package_dimension": "",
                    "warranty": "",
                    "totally_reject": "Barang Ilegal"
                },
                "user": {
                    "id": 2, 
                    "name": "admin@bizzy.co.id", 
                    "email": "Admin Bizzy", 
                    "type": "employee"
                },
                "last_status" : "revision_complete", 
                "current_status" : "rejected", 
                "created_at": "2017-12-25T17:01:34.056Z",
                "updated_at": "2017-12-25T17:01:34.056Z"
            }
        ]
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "query": {
                "sort": "created_at_asc",
                "page": 1,
                "limit": 1
            }
        }

        const result = yield Methods.getPremoderationHistory(data, context);
        const expected = {
            "data": [
                {
                    "id": "5a412eee014b801ea43b1a92",
                    "premoderation_id": "1513934336601",
                    "product_name": "Product Baru",
                    "reject_reasons": {
                        "product_data": "",
                        "sku_list": "",
                        "product_specification": "",
                        "description": "",
                        "product_details": "",
                        "package_dimension": "",
                        "warranty": "",
                        "totally_reject": "Barang Ilegal"
                    },
                    "user": {
                        "id": 2, 
                        "name": "admin@bizzy.co.id", 
                        "email": "Admin Bizzy", 
                        "type": "employee"
                    },
                    "last_status" : "revision_complete", 
                    "current_status" : "rejected", 
                    "created_at": "2017-12-25T17:01:34.056Z",
                    "updated_at": "2017-12-25T17:01:34.056Z"
                }
            ],
            "meta": {
                "page": 1,
                "limit": 1,
                "total_data": 1,
                "total_page": 1
            }
        }
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Should be return Premoderation History Bad Request', function*(t) {
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": 10
            },
            "query": {
                "sort": "created_at_desc",
                "page": 1,
                "limit": 1
            }
        }
        yield Methods.getPremoderationHistory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Product History Not Found: Should be return BizzyError.NotFound', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(PremoderationLogRepository, 'findAll').resolves(
        [
            {
                "_id": "5a412eee014b801ea43b1a92",
                "premoderation_id": "1513934336601",
                "product_name": "Product Baru",
                "reject_reasons": {
                    "product_data": "",
                    "sku_list": "",
                    "product_specification": "",
                    "description": "",
                    "product_details": "",
                    "package_dimension": "",
                    "warranty": "",
                    "totally_reject": "Barang Ilegal"
                },
                "user": {
                    "id": 2, 
                    "name": "admin@bizzy.co.id", 
                    "email": "Admin Bizzy", 
                    "type": "employee"
                },
                "last_status" : "revision_complete", 
                "current_status" : "rejected", 
                "created_at": "2017-12-25T17:01:34.056Z",
                "updated_at": "2017-12-25T17:01:34.056Z"
            }
        ]
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "query": {
                "sort": "created_at_desc",
                "page": 1,
                "limit": 1
            }
        }

        yield Methods.getPremoderationHistory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            "path": {
                "id": 10
            },
            "query": {
                "sort": "created_at_desc",
                "page": 1,
                "limit": 1
            }
        }
        yield Methods.getPremoderationHistory(data, context);
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