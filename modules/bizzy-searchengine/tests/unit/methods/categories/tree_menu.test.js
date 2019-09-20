'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const TreeMenuRepository = require('../../../../src/repositories/tree_menu');
const RedisRepository = require('../../../../src/repositories/redis');
const Methods = require('../../../../src/methods/categories/tree_menu');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success no redis', function* (t) {
    t.context.sandbox.stub(TreeMenuRepository, 'getCategoryBreakdownList').resolves([
        {
            category0_id: 15,
            category0_name: 'IT and Technology Services',
            category0_level: 'C0',
            category0_unspsc: 81000000,
            category1_id: 84,
            category1_name: 'Professional engineering services',
            category1_level: 'C1',
            category1_unspsc: 81100000,
            category2_id: 115,
            category2_name: 'Civil engineering',
            category2_level: 'C2',
            category2_unspsc: 81101500,
            category3_id: 495,
            category3_name: 'Highway engineering',
            category3_level: 'C3',
            category3_unspsc: 81101510
        }
    ]);
    t.context.sandbox.stub(RedisRepository, 'find').resolves({
        total: null
    });
    t.context.sandbox.stub(RedisRepository, 'insert').resolves({
        data: [
            {
                id: 15,
                name: 'IT and Technology Services',
                url_key: 'it-and-technology-services_c0',
                level: 'C0',
                unspsc: 81000000,
                childs: [
                    {
                        id: 84,
                        name: 'Professional engineering services',
                        url_key: 'professional-engineering-services_c1',
                        level: 'C1',
                        unspsc: 81100000,
                        childs: [
                            {
                                id: 115,
                                name: 'Civil engineering',
                                url_key: 'civil-engineering_c2',
                                level: 'C2',
                                unspsc: 81101500,
                                childs: [
                                    {
                                        id: 495,
                                        name: 'Highway engineering',
                                        url_key: 'highway-engineering_c3',
                                        level: 'C3',
                                        unspsc: 81101510
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    try {
        const data = {
            query: {
                reset: 1
            }
        };
        const context = require('../../../mocks/context.json');
        const result = yield Methods.getCategoryTreeMenu(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    name: 'IT and Technology Services',
                    url_key: 'it-and-technology-services_c0',
                    level: 'C0',
                    unspsc: 81000000,
                    childs: [
                        {
                            id: 84,
                            name: 'Professional engineering services',
                            url_key: 'professional-engineering-services_c1',
                            level: 'C1',
                            unspsc: 81100000,
                            childs: [
                                {
                                    id: 115,
                                    name: 'Civil engineering',
                                    url_key: 'civil-engineering_c2',
                                    level: 'C2',
                                    unspsc: 81101500,
                                    childs: [
                                        {
                                            id: 495,
                                            name: 'Highway engineering',
                                            url_key: 'highway-engineering_c3',
                                            level: 'C3',
                                            unspsc: 81101510
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return success no redis with another data', function* (t) {
    t.context.sandbox.stub(TreeMenuRepository, 'getCategoryBreakdownList').resolves([
    ]);
    t.context.sandbox.stub(RedisRepository, 'find').resolves({
        total: null
    });
    t.context.sandbox.stub(RedisRepository, 'insert').resolves({
        data: [
            {
                id: 15,
                name: 'IT and Technology Services',
                url_key: 'it-and-technology-services_c0',
                level: 'C0',
                unspsc: 81000000,
                childs: [
                    {
                        id: 84,
                        name: 'Professional engineering services',
                        url_key: 'professional-engineering-services_c1',
                        level: 'C1',
                        unspsc: 81100000,
                        childs: [
                            {
                                id: 115,
                                name: 'Civil engineering',
                                url_key: 'civil-engineering_c2',
                                level: 'C2',
                                unspsc: 81101500,
                                childs: [
                                    {
                                        id: 495,
                                        name: 'Highway engineering',
                                        url_key: 'highway-engineering_c3',
                                        level: 'C3',
                                        unspsc: 81101510
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    try {
        const data = {
            query: {
                reset: 1
            }
        };
        const context = require('../../../mocks/context.json');
        const result = yield Methods.getCategoryTreeMenu(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    name: 'IT and Technology Services',
                    url_key: 'it-and-technology-services_c0',
                    level: 'C0',
                    unspsc: 81000000,
                    childs: [
                        {
                            id: 84,
                            name: 'Professional engineering services',
                            url_key: 'professional-engineering-services_c1',
                            level: 'C1',
                            unspsc: 81100000,
                            childs: [
                                {
                                    id: 115,
                                    name: 'Civil engineering',
                                    url_key: 'civil-engineering_c2',
                                    level: 'C2',
                                    unspsc: 81101500,
                                    childs: [
                                        {
                                            id: 495,
                                            name: 'Highway engineering',
                                            url_key: 'highway-engineering_c3',
                                            level: 'C3',
                                            unspsc: 81101510
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return success no redis with another data 2', function* (t) {
    t.context.sandbox.stub(TreeMenuRepository, 'getCategoryBreakdownList').resolves([
        {
            category0_id: 15,
            category0_name: 'IT and Technology Services',
            category0_level: 'C0',
            category0_unspsc: 81000000,
            category1_id: 84,
            category1_name: 'Professional engineering services',
            category1_level: 'C1',
            category1_unspsc: 81100000,
            category2_id: 115,
            category2_name: 'Civil engineering',
            category2_level: 'C2',
            category2_unspsc: 81101500,
            category3_id: 495,
            category3_name: 'Highway engineering',
            category3_level: 'C3',
            category3_unspsc: 81101510
        },
        {
            category0_id: 15,
            category0_name: 'IT and Technology Services',
            category0_level: 'C0',
            category0_unspsc: 81000000,
            category1_id: 84,
            category1_name: 'Professional engineering services',
            category1_level: 'C1',
            category1_unspsc: 81100000,
            category2_id: 115,
            category2_name: 'Civil engineering',
            category2_level: 'C2',
            category2_unspsc: 81101500,
            category3_id: 496,
            category3_name: 'Highway engineering',
            category3_level: 'C3',
            category3_unspsc: 81101510
        }
    ]);
    t.context.sandbox.stub(RedisRepository, 'find').resolves({
        total: null
    });
    t.context.sandbox.stub(RedisRepository, 'insert').resolves({
        data: [
            {
                id: 15,
                name: 'IT and Technology Services',
                url_key: 'it-and-technology-services_c0',
                level: 'C0',
                unspsc: 81000000,
                childs: [
                    {
                        id: 84,
                        name: 'Professional engineering services',
                        url_key: 'professional-engineering-services_c1',
                        level: 'C1',
                        unspsc: 81100000,
                        childs: [
                            {
                                id: 115,
                                name: 'Civil engineering',
                                url_key: 'civil-engineering_c2',
                                level: 'C2',
                                unspsc: 81101500,
                                childs: [
                                    {
                                        id: 495,
                                        name: 'Highway engineering',
                                        url_key: 'highway-engineering_c3',
                                        level: 'C3',
                                        unspsc: 81101510
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    try {
        const data = {
            query: {
                reset: 1
            }
        };
        const context = require('../../../mocks/context.json');
        const result = yield Methods.getCategoryTreeMenu(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    name: 'IT and Technology Services',
                    url_key: 'it-and-technology-services_c0',
                    level: 'C0',
                    unspsc: 81000000,
                    childs: [
                        {
                            id: 84,
                            name: 'Professional engineering services',
                            url_key: 'professional-engineering-services_c1',
                            level: 'C1',
                            unspsc: 81100000,
                            childs: [
                                {
                                    id: 115,
                                    name: 'Civil engineering',
                                    url_key: 'civil-engineering_c2',
                                    level: 'C2',
                                    unspsc: 81101500,
                                    childs: [
                                        {
                                            id: 495,
                                            name: 'Highway engineering',
                                            url_key: 'highway-engineering_c3',
                                            level: 'C3',
                                            unspsc: 81101510
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(TreeMenuRepository, 'getCategoryBreakdownList').resolves([
        {
            category0_id: 15,
            category0_name: 'IT and Technology Services',
            category0_level: 'C0',
            category0_unspsc: 81000000,
            category1_id: 84,
            category1_name: 'Professional engineering services',
            category1_level: 'C1',
            category1_unspsc: 81100000,
            category2_id: 115,
            category2_name: 'Civil engineering',
            category2_level: 'C2',
            category2_unspsc: 81101500,
            category3_id: 495,
            category3_name: 'Highway engineering',
            category3_level: 'C3',
            category3_unspsc: 81101510
        }
    ]);
    t.context.sandbox.stub(RedisRepository, 'find').resolves({
        total: '{\"data\":[{\"id\":15,\"name\":\"IT and Technology Services\",\"url_key\":\"it-and-technology-services_c0\",\"level\":\"C0\",\"unspsc\":81000000,\"childs\":[{\"id\":84,\"name\":\"Professional engineering services\",\"url_key\":\"professional-engineering-services_c1\",\"level\":\"C1\",\"unspsc\":81100000,\"childs\":[{\"id\":115,\"name\":\"Civil engineering\",\"url_key\":\"civil-engineering_c2\",\"level\":\"C2\",\"unspsc\":81101500,\"childs\":[{\"id\":495,\"name\":\"Highway engineering\",\"url_key\":\"highway-engineering_c3\",\"level\":\"C3\",\"unspsc\":81101510}]}]}]}]}'
    });
    t.context.sandbox.stub(RedisRepository, 'insert').resolves({
        data: [
            {
                id: 15,
                name: 'IT and Technology Services',
                url_key: 'it-and-technology-services_c0',
                level: 'C0',
                unspsc: 81000000,
                childs: [
                    {
                        id: 84,
                        name: 'Professional engineering services',
                        url_key: 'professional-engineering-services_c1',
                        level: 'C1',
                        unspsc: 81100000,
                        childs: [
                            {
                                id: 115,
                                name: 'Civil engineering',
                                url_key: 'civil-engineering_c2',
                                level: 'C2',
                                unspsc: 81101500,
                                childs: [
                                    {
                                        id: 495,
                                        name: 'Highway engineering',
                                        url_key: 'highway-engineering_c3',
                                        level: 'C3',
                                        unspsc: 81101510
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    try {
        const data = {
            query: {
                reset: 0
            }
        };
        const context = require('../../../mocks/context.json');
        const result = yield Methods.getCategoryTreeMenu(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    name: 'IT and Technology Services',
                    url_key: 'it-and-technology-services_c0',
                    level: 'C0',
                    unspsc: 81000000,
                    childs: [
                        {
                            id: 84,
                            name: 'Professional engineering services',
                            url_key: 'professional-engineering-services_c1',
                            level: 'C1',
                            unspsc: 81100000,
                            childs: [
                                {
                                    id: 115,
                                    name: 'Civil engineering',
                                    url_key: 'civil-engineering_c2',
                                    level: 'C2',
                                    unspsc: 81101500,
                                    childs: [
                                        {
                                            id: 495,
                                            name: 'Highway engineering',
                                            url_key: 'highway-engineering_c3',
                                            level: 'C3',
                                            unspsc: 81101510
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Shoul be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                reset: 'Testing'
            }
        };

        yield Methods.getCategoryTreeMenu(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
