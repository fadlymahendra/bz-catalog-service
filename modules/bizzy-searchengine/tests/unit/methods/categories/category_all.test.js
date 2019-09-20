'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/categories/category_all');

test.serial('Should be return Category List', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            unspsc: 1100000
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    hierarchy: [],
                    id: 1,
                    name: 'Electronics',
                    url_key: 'electronics_c0.1',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List without search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 1,
            name: 'Electronics',
            url_key: 'electronics_c0.1',
            level: 'C0',
            unspsc: 1100000
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    hierarchy: [],
                    id: 1,
                    name: 'Electronics',
                    url_key: 'electronics_c0.1',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List complete from C3 until C0', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 3,
            name: 'Electronics',
            level: 'C3',
            unspsc: 1100000,
            parent_id: 2
        },
        {
            id: 2,
            name: 'Electronics C2',
            level: 'C2',
            unspsc: 1100000,
            parent_id: 1
        },
        {
            id: 1,
            name: 'Electronics C1',
            level: 'C1',
            unspsc: 1100000,
            parent_id: 0
        },
        {
            id: 0,
            name: 'Electronics C0',
            level: 'C0',
            unspsc: 1100000
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Electronics',
                    url_key: 'electronics_c3.3',
                    level: 'C3',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 2,
                            name: 'Electronics C2',
                            url_key: 'electronics-c2_c2.2',
                            level: 'C2',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Electronics C2',
                    url_key: 'electronics-c2_c2.2',
                    level: 'C2',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Electronics C1',
                    url_key: 'electronics-c1_c1.1',
                    level: 'C1',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 0,
                    name: 'Electronics C0',
                    url_key: 'electronics-c0_c0.0',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List from C3 find C0', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 3,
            name: 'Electronics',
            level: 'C3',
            unspsc: 1100000,
            parent_id: 2
        },
        {
            id: 2,
            name: 'Electronics C2',
            level: 'C2',
            unspsc: 1100000,
            parent_id: 1
        },
        {
            id: 1,
            name: 'Electronics C1',
            level: 'C1',
            unspsc: 1100000,
            parent_id: 0
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOneMinimum').resolves({
        id: 0,
        name: 'Electronics C0',
        level: 'C0',
        unspsc: 1100000
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Electronics',
                    url_key: 'electronics_c3.3',
                    level: 'C3',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 2,
                            name: 'Electronics C2',
                            url_key: 'electronics-c2_c2.2',
                            level: 'C2',
                            unspsc: 1100000,
                            hierarchy: [
                                {
                                    id: 1,
                                    name: 'Electronics C1',
                                    level: 'C1',
                                    unspsc: 1100000,
                                    parent_id: 0,
                                    hierarchy: [
                                        {
                                            id: 0,
                                            name: 'Electronics C0',
                                            url_key: 'electronics-c0_c0.0',
                                            level: 'C0',
                                            unspsc: 1100000,
                                            hierarchy: undefined
                                        }
                                    ]
                                },
                                {
                                    id: 0,
                                    name: 'Electronics C0',
                                    level: 'C0',
                                    unspsc: 1100000
                                }
                            ]
                        },
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: [
                                {
                                    id: 0,
                                    name: 'Electronics C0',
                                    level: 'C0',
                                    unspsc: 1100000
                                }
                            ]
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Electronics C2',
                    url_key: 'electronics-c2_c2.2',
                    level: 'C2',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: [
                                {
                                    id: 0,
                                    name: 'Electronics C0',
                                    level: 'C0',
                                    unspsc: 1100000
                                }
                            ]
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Electronics C1',
                    url_key: 'electronics-c1_c1.1',
                    level: 'C1',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
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

test.serial('Should be return Category List from C3 find C1', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 3,
            name: 'Electronics',
            level: 'C3',
            unspsc: 1100000,
            parent_id: 2
        },
        {
            id: 2,
            name: 'Electronics C2',
            level: 'C2',
            unspsc: 1100000,
            parent_id: 1
        },
        {
            id: 0,
            name: 'Electronics C0',
            level: 'C0',
            unspsc: 1100000
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOneMinimum').resolves({
        id: 1,
        name: 'Electronics C1',
        level: 'C1',
        unspsc: 1100000,
        parent_id: 0
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Electronics',
                    url_key: 'electronics_c3.3',
                    level: 'C3',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 2,
                            name: 'Electronics C2',
                            url_key: 'electronics-c2_c2.2',
                            level: 'C2',
                            unspsc: 1100000,
                            hierarchy: [
                                {
                                    id: 1,
                                    name: 'Electronics C1',
                                    level: 'C1',
                                    unspsc: 1100000,
                                    parent_id: 0
                                },
                                {
                                    id: 0,
                                    name: 'Electronics C0',
                                    level: 'C0',
                                    unspsc: 1100000,
                                    hierarchy: []
                                }
                            ]
                        },
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Electronics C2',
                    url_key: 'electronics-c2_c2.2',
                    level: 'C2',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: []
                        }
                    ]
                },
                {
                    id: 0,
                    name: 'Electronics C0',
                    url_key: 'electronics-c0_c0.0',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List from C3 find C2', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 3,
            name: 'Electronics',
            level: 'C3',
            unspsc: 1100000,
            parent_id: 2
        },
        {
            id: 1,
            name: 'Electronics C1',
            level: 'C1',
            unspsc: 1100000,
            parent_id: 0
        },
        {
            id: 0,
            name: 'Electronics C0',
            level: 'C0',
            unspsc: 1100000
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOneMinimum').resolves({
        id: 2,
        name: 'Electronics C2',
        level: 'C2',
        unspsc: 1100000,
        parent_id: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    name: 'Electronics',
                    url_key: 'electronics_c3.3',
                    level: 'C3',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 2,
                            name: 'Electronics C2',
                            url_key: 'electronics-c2_c2.2',
                            level: 'C2',
                            unspsc: 1100000,
                            hierarchy: undefined
                        },
                        {
                            id: 1,
                            name: 'Electronics C1',
                            url_key: 'electronics-c1_c1.1',
                            level: 'C1',
                            unspsc: 1100000,
                            hierarchy: [
                                {
                                    id: 0,
                                    name: 'Electronics C0',
                                    url_key: 'electronics-c0_c0.0',
                                    level: 'C0',
                                    unspsc: 1100000,
                                    hierarchy: undefined
                                }
                            ]
                        },
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: []
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Electronics C1',
                    url_key: 'electronics-c1_c1.1',
                    level: 'C1',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: undefined
                        }
                    ]
                },
                {
                    id: 0,
                    name: 'Electronics C0',
                    url_key: 'electronics-c0_c0.0',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List from exist parent', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findBySearch').resolves([
        {
            id: 0,
            name: 'Electronics C0',
            level: 'C0',
            unspsc: 1100000
        },
        {
            id: 0,
            name: 'Electronics C0 2',
            level: 'C0',
            unspsc: 1100000
        },
        {
            id: 4,
            name: 'Electronics C1',
            level: 'C1',
            unspsc: 1100000,
            parent_id: 0
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.categorySearchAll(data, context);
        const expected = {
            data: [
                {
                    id: 0,
                    name: 'Electronics C0',
                    url_key: 'electronics-c0_c0.0',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                },
                {
                    id: 0,
                    name: 'Electronics C0 2',
                    url_key: 'electronics-c0-2_c0.0',
                    level: 'C0',
                    unspsc: 1100000,
                    hierarchy: []
                },
                {
                    id: 4,
                    name: 'Electronics C1',
                    url_key: 'electronics-c1_c1.4',
                    level: 'C1',
                    unspsc: 1100000,
                    hierarchy: [
                        {
                            id: 0,
                            name: 'Electronics C0',
                            url_key: 'electronics-c0_c0.0',
                            level: 'C0',
                            unspsc: 1100000,
                            hierarchy: []
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

        yield Methods.categorySearchAll(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
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

