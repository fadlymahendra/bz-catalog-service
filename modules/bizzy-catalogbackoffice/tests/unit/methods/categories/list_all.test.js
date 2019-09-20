'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const Methods = require('../../../../src/methods/categories/list_all');

const resFindAll = [
    {
        id: 1,
        name: 'Electronics',
        level: 'C0',
        base_margin: '5.00',
        commission: '3.00',
        breadcrumb: 'Electronics',
        unspsc: 1100000,
        sequence: 0,
        parent_id: 0,
        is_active: 1,
        created_by: 1,
        created_at: '2017-11-28T00:00:00.000Z',
        updated_at: '2017-12-07T09:26:05.000Z'
    }
];

const resCountAll = [
    {
        is_active: 0,
        total: 10
    },
    {
        is_active: 1,
        total: 10
    }
];

const resGetUserCreated = [
    {
        user_created: '1'
    }
];

test.serial('Should be return Category List with param search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            base_margin: '5.00',
            commission: '3.00',
            breadcrumb: 'Electronics',
            unspsc: 1100000,
            sequence: 0,
            parent_id: 4,
            childs: [
                {
                    id: 4,
                    name: 'Komputer'
                }
            ],
            is_active: 1,
            created_by: 1,
            created_at: '2017-11-28T00:00:00.000Z',
            updated_at: '2017-12-07T09:26:05.000Z'
        }
    ]);
    t.context.sandbox.mock(CategoryRepository).expects('countAll').resolves(resCountAll);
    t.context.sandbox.mock(CategoryRepository).expects('getUserCreated').resolves(resGetUserCreated);
    
    
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                level: 'C0',
                name: 'Electronics',
                status: '1'
            }
        };
        const result = yield Methods.getCategoryAll(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    breadcrumb: 'Electronics',
                    unspsc: 1100000,
                    sequence: 0,
                    parent: {
                        id: 4,
                        name: 'Komputer'
                    },
                    is_active: 1,
                    created_by: 1,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: '2017-12-07T09:26:05.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 20,
                total_page: 1,
                user_created: '1',
                total_active: 10,
                total_inactive: 10
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return Category List with param search C3', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C3',
            base_margin: '5.00',
            commission: '3.00',
            breadcrumb: 'Electronics',
            unspsc: 1100000,
            sequence: 0,
            parent_id: null,
            childs: [
            ],
            is_active: 1,
            created_by: 1,
            created_at: '2017-11-28T00:00:00.000Z',
            updated_at: '2017-12-07T09:26:05.000Z'
        }
    ]);
    t.context.sandbox.mock(CategoryRepository).expects('countAll').resolves(resCountAll);
    t.context.sandbox.mock(CategoryRepository).expects('getUserCreated').resolves(resGetUserCreated);
    
    
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                level: 'C3',
                name: 'Electronics',
                status: '1'
            }
        };
        const result = yield Methods.getCategoryAll(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C3',
                    base_margin: '5.00',
                    commission: '3.00',
                    breadcrumb: 'Electronics',
                    unspsc: 1100000,
                    sequence: 0,
                    parent: null,
                    is_active: 1,
                    created_by: 1,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: '2017-12-07T09:26:05.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 20,
                total_page: 1,
                user_created: '1',
                total_active: 10,
                total_inactive: 10
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List with param search with status active', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            base_margin: '5.00',
            commission: '3.00',
            breadcrumb: 'Electronics',
            unspsc: 1100000,
            sequence: 0,
            parent_id: 4,
            childs: [
                {
                    id: 4,
                    name: 'Komputer'
                }
            ],
            is_active: 1,
            created_by: 1,
            created_at: '2017-11-28T00:00:00.000Z',
            updated_at: '2017-12-07T09:26:05.000Z'
        }
    ]);
    t.context.sandbox.mock(ProductGroupRepository).expects('findAllSkuByCategory').resolves([]);
    t.context.sandbox.mock(CategoryRepository).expects('countAll').resolves(resCountAll);
    t.context.sandbox.mock(CategoryRepository).expects('getUserCreated').resolves(resGetUserCreated);
    
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                level: 'C0',
                name: 'Electronics',
                status: '1'
            }
        };
        const result = yield Methods.getCategoryAll(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    breadcrumb: 'Electronics',
                    unspsc: 1100000,
                    sequence: 0,
                    parent: {
                        id: 4,
                        name: 'Komputer'
                    },
                    is_active: 1,
                    created_by: 1,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: '2017-12-07T09:26:05.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 20,
                total_page: 1,
                user_created: '1',
                total_active: 10,
                total_inactive: 10
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List with search empty', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves(resFindAll);
    t.context.sandbox.mock(CategoryRepository).expects('countAll').resolves(resCountAll);
    t.context.sandbox.mock(CategoryRepository).expects('getUserCreated').resolves(resGetUserCreated);
    

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                created_by: 1
            }
        };
        const result = yield Methods.getCategoryAll(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    breadcrumb: 'Electronics',
                    unspsc: 1100000,
                    sequence: 0,
                    parent: null,
                    is_active: 1,
                    created_by: 1,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: '2017-12-07T09:26:05.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 20,
                total_page: 1,
                user_created: '1',
                total_active: 10,
                total_inactive: 10
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: []
            }
        };

        yield Methods.getCategoryAll(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: 'a'
            }
        };
        yield Methods.getCategoryAll(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
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
