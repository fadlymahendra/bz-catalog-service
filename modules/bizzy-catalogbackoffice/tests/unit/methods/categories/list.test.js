'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const context = require('../../../mocks/context.json');
const getCategoryByBreadcrumbJson = require('../../../mocks/getCategoryByBreadcrumb.json');

const Methods = require('../../../../src/methods/categories/list');
const CategoryRepository = require('../../../../src/repositories/category');

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
            unspsc: 11000000,
            sequence: 0,
            parent_id: null,
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: []
        }
    ]);

    try {
        const data = {
            query: {
                search: 'E'
            }
        };
        const result = yield Methods.getCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: null,
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
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
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            base_margin: '5.00',
            commission: '3.00',
            unspsc: 11000000,
            sequence: 0,
            parent_id: null,
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: []
        }
    ]);

    try {
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: null,
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List with param parent_id', function* (t) {
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
            unspsc: 11000000,
            sequence: 0,
            parent_id: 123,
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: [{
                id: 1,
                name: 'name'
            }]
        }
    ]);

    try {
        const data = {
            query: {
                parent_id: '123'
            }
        };
        const result = yield Methods.getCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: {
                        id: 1,
                        name: 'name'
                    },
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
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
        const data = {
            query: {
                search: []
            }
        };

        yield Methods.getCategory(data, context);
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
        yield Methods.getCategory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Category List by id with param search', function* (t) {
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
            unspsc: 11000000,
            sequence: 0,
            parent_id: null,
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: []
        }
    ]);

    try {
        const data = {
            query: {
                search: 'E'
            }
        };
        const result = yield Methods.getListCategoryById(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: null,
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List by id with param search and parent id', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 67,
            name: 'Consumer electronics',
            level: 'C1',
            base_margin: null,
            commission: null,
            unspsc: 52160000,
            sequence: 1,
            parent_id: 1,
            breadcrumb: 'Consumer electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: [
                {
                    id: 340,
                    name: 'Aksesoris peralatan audio visual'
                }
            ]
        }
    ]);

    try {
        const data = {
            query: {
                search: 'C',
                parent_id: 1
            }
        };
        const result = yield Methods.getListCategoryById(data, context);
        const expected = {
            data: [
                {
                    id: 67,
                    name: 'Consumer electronics',
                    level: 'C1',
                    base_margin: null,
                    commission: null,
                    unspsc: 52160000,
                    sequence: 1,
                    parent: {
                        id: 340,
                        name: 'Aksesoris peralatan audio visual'
                    },
                    breadcrumb: 'Consumer electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List by id with param parent_id', function* (t) {
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
            unspsc: 11000000,
            sequence: 0,
            parent_id: {
                id: 257,
                name: 'Parent Category'
            },
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: [
                {
                    id: 340,
                    name: 'Aksesoris peralatan audio visual'
                }
            ]
        }
    ]);

    try {
        const data = {
            query: {
                parent_id: '257'
            }
        };
        const result = yield Methods.getListCategoryById(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: {
                        id: 340,
                        name: 'Aksesoris peralatan audio visual'
                    },
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List by id with search empty', function* (t) {
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
            unspsc: 11000000,
            sequence: 0,
            parent_id: null,
            breadcrumb: 'Electronics',
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2018-03-29T14:19:48.000Z',
            updated_at: '2018-03-29T14:19:48.000Z',
            childs: []
        }
    ]);

    try {
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getListCategoryById(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    level: 'C0',
                    base_margin: '5.00',
                    commission: '3.00',
                    unspsc: 11000000,
                    sequence: 0,
                    parent: null,
                    breadcrumb: 'Electronics',
                    is_active: 1,
                    created_by: null,
                    created_at: '2018-03-29T14:19:48.000Z',
                    updated_at: '2018-03-29T14:19:48.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request for category list by id', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const data = {
            query: {
                search: []
            }
        };

        yield Methods.getListCategoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden for category list by id', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: 'a'
            }
        };
        yield Methods.getListCategoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});


test.serial('getCategoryByBreadcrumb: throw Forbidden when Authorization', function* (t) {
    try {
        const data = null;
        const context = {};
        
        yield Methods.getCategoryByBreadcrumb(data, context);
        t.fail('should be throw Forbidden when Authorization');
    } catch (err) {
        t.pass();
    }
});

test.serial('getCategoryByBreadcrumb: throw BadRequest when joi validate', function* (t) {
    try {
        const data = JSON.parse(JSON.stringify(getCategoryByBreadcrumbJson));
        data.query.search = '';

        yield Methods.getCategoryByBreadcrumb(data, context);
        t.fail('should be throw BadRequest when joi validate');
    } catch (err) {
        t.pass();
    }
});


test.serial('getCategoryByBreadcrumb: successfully', function* (t) {
    const resultStub = [
        {
          id: 748,
          name: 'Testing Adit C1',
          level: 'C1',
          base_margin: null,
          commission: null,
          unspsc: 99000000,
          sequence: 1,
          parent_id: 747,
          breadcrumb: 'Category Testing Adit > Testing Adit C1',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 747,
              name: 'Category Testing Adit',
              level: 'C0',
              base_margin: null,
              commission: null,
              unspsc: 99000000,
              sequence: 1,
              parent_id: null,
              breadcrumb: 'Category Testing Adit',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 752,
          name: 'Gardening C1',
          level: 'C1',
          base_margin: null,
          commission: null,
          unspsc: 19000000,
          sequence: 1,
          parent_id: 1,
          breadcrumb: 'Gardening and Tools > Gardening C1',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 1,
              name: 'Gardening and Tools',
              level: 'C0',
              base_margin: null,
              commission: null,
              unspsc: 10000000,
              sequence: 1,
              parent_id: null,
              breadcrumb: null,
              is_active: 1,
              created_by: null,
              is_deleted: 0,
              created_at: '2017-12-18T06:32:18.000Z',
              updated_at: '2017-12-18T06:32:18.000Z'
            }
          ]
        },
        {
          id: 749,
          name: 'Testing Adit C2',
          level: 'C2',
          base_margin: null,
          commission: null,
          unspsc: 99001000,
          sequence: 1,
          parent_id: 748,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 748,
              name: 'Testing Adit C1',
              level: 'C1',
              base_margin: null,
              commission: null,
              unspsc: 99000000,
              sequence: 1,
              parent_id: 747,
              breadcrumb: 'Category Testing Adit > Testing Adit C1',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 753,
          name: 'Gardening C2',
          level: 'C2',
          base_margin: null,
          commission: null,
          unspsc: 19009900,
          sequence: 1,
          parent_id: 752,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 752,
              name: 'Gardening C1',
              level: 'C1',
              base_margin: null,
              commission: null,
              unspsc: 19000000,
              sequence: 1,
              parent_id: 1,
              breadcrumb: 'Gardening and Tools > Gardening C1',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        },
        {
          id: 750,
          name: 'Testing Adit C3 1',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 99001001,
          sequence: 1,
          parent_id: 749,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 1',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 749,
              name: 'Testing Adit C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 99001000,
              sequence: 1,
              parent_id: 748,
              breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 751,
          name: 'Testing Adit C3 2',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 99001002,
          sequence: 1,
          parent_id: 749,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 2',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:47.000Z',
          updated_at: '2018-09-13T11:34:47.000Z',
          childs: [
            {
              id: 749,
              name: 'Testing Adit C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 99001000,
              sequence: 1,
              parent_id: 748,
              breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 754,
          name: 'Gardening C3',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 19009909,
          sequence: 1,
          parent_id: 753,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 753,
              name: 'Gardening C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 19009900,
              sequence: 1,
              parent_id: 752,
              breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        },
        {
          id: 755,
          name: 'Gardening C3 2',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 19009908,
          sequence: 1,
          parent_id: 753,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3 2',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 753,
              name: 'Gardening C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 19009900,
              sequence: 1,
              parent_id: 752,
              breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        }
      ];
    const allRowsStub = [
        {
          id: 748,
          name: 'Testing Adit C1',
          level: 'C1',
          base_margin: null,
          commission: null,
          unspsc: 99000000,
          sequence: 1,
          parent_id: 747,
          breadcrumb: 'Category Testing Adit > Testing Adit C1',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 747,
              name: 'Category Testing Adit',
              level: 'C0',
              base_margin: null,
              commission: null,
              unspsc: 99000000,
              sequence: 1,
              parent_id: null,
              breadcrumb: 'Category Testing Adit',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 749,
          name: 'Testing Adit C2',
          level: 'C2',
          base_margin: null,
          commission: null,
          unspsc: 99001000,
          sequence: 1,
          parent_id: 748,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 748,
              name: 'Testing Adit C1',
              level: 'C1',
              base_margin: null,
              commission: null,
              unspsc: 99000000,
              sequence: 1,
              parent_id: 747,
              breadcrumb: 'Category Testing Adit > Testing Adit C1',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 750,
          name: 'Testing Adit C3 1',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 99001001,
          sequence: 1,
          parent_id: 749,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 1',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:46.000Z',
          updated_at: '2018-09-13T11:34:46.000Z',
          childs: [
            {
              id: 749,
              name: 'Testing Adit C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 99001000,
              sequence: 1,
              parent_id: 748,
              breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 751,
          name: 'Testing Adit C3 2',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 99001002,
          sequence: 1,
          parent_id: 749,
          breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 2',
          is_active: 1,
          created_by: 166,
          is_deleted: 0,
          created_at: '2018-09-13T11:34:47.000Z',
          updated_at: '2018-09-13T11:34:47.000Z',
          childs: [
            {
              id: 749,
              name: 'Testing Adit C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 99001000,
              sequence: 1,
              parent_id: 748,
              breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
              is_active: 1,
              created_by: 166,
              is_deleted: 0,
              created_at: '2018-09-13T11:34:46.000Z',
              updated_at: '2018-09-13T11:34:46.000Z'
            }
          ]
        },
        {
          id: 752,
          name: 'Gardening C1',
          level: 'C1',
          base_margin: null,
          commission: null,
          unspsc: 19000000,
          sequence: 1,
          parent_id: 1,
          breadcrumb: 'Gardening and Tools > Gardening C1',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 1,
              name: 'Gardening and Tools',
              level: 'C0',
              base_margin: null,
              commission: null,
              unspsc: 10000000,
              sequence: 1,
              parent_id: null,
              breadcrumb: null,
              is_active: 1,
              created_by: null,
              is_deleted: 0,
              created_at: '2017-12-18T06:32:18.000Z',
              updated_at: '2017-12-18T06:32:18.000Z'
            }
          ]
        },
        {
          id: 753,
          name: 'Gardening C2',
          level: 'C2',
          base_margin: null,
          commission: null,
          unspsc: 19009900,
          sequence: 1,
          parent_id: 752,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 752,
              name: 'Gardening C1',
              level: 'C1',
              base_margin: null,
              commission: null,
              unspsc: 19000000,
              sequence: 1,
              parent_id: 1,
              breadcrumb: 'Gardening and Tools > Gardening C1',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        },
        {
          id: 754,
          name: 'Gardening C3',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 19009909,
          sequence: 1,
          parent_id: 753,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 753,
              name: 'Gardening C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 19009900,
              sequence: 1,
              parent_id: 752,
              breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        },
        {
          id: 755,
          name: 'Gardening C3 2',
          level: 'C3',
          base_margin: null,
          commission: null,
          unspsc: 19009908,
          sequence: 1,
          parent_id: 753,
          breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3 2',
          is_active: 1,
          created_by: 2,
          is_deleted: 0,
          created_at: '2018-09-13T12:32:54.000Z',
          updated_at: '2018-09-13T12:32:54.000Z',
          childs: [
            {
              id: 753,
              name: 'Gardening C2',
              level: 'C2',
              base_margin: null,
              commission: null,
              unspsc: 19009900,
              sequence: 1,
              parent_id: 752,
              breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
              is_active: 1,
              created_by: 2,
              is_deleted: 0,
              created_at: '2018-09-13T12:32:54.000Z',
              updated_at: '2018-09-13T12:32:54.000Z'
            }
          ]
        }
      ];

    const findAllStub = t.context.sandbox.stub(CategoryRepository, 'findAll');
    findAllStub.onCall(0).resolves(resultStub);
    findAllStub.onCall(1).resolves(allRowsStub);

    try {
        const data = JSON.parse(JSON.stringify(getCategoryByBreadcrumbJson));

        const result = yield Methods.getCategoryByBreadcrumb(data, context);
        const expected = {
            data: [
              {
                id: 748,
                name: 'Testing Adit C1',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 99000000,
                sequence: 1,
                parent: {
                  id: 747,
                  name: 'Category Testing Adit'
                },
                breadcrumb: 'Category Testing Adit > Testing Adit C1',
                is_active: 1,
                created_by: 166,
                created_at: '2018-09-13T11:34:46.000Z',
                updated_at: '2018-09-13T11:34:46.000Z'
              },
              {
                id: 752,
                name: 'Gardening C1',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 19000000,
                sequence: 1,
                parent: {
                  id: 1,
                  name: 'Gardening and Tools'
                },
                breadcrumb: 'Gardening and Tools > Gardening C1',
                is_active: 1,
                created_by: 2,
                created_at: '2018-09-13T12:32:54.000Z',
                updated_at: '2018-09-13T12:32:54.000Z'
              },
              {
                id: 749,
                name: 'Testing Adit C2',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 99001000,
                sequence: 1,
                parent: {
                  id: 748,
                  name: 'Testing Adit C1'
                },
                breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2',
                is_active: 1,
                created_by: 166,
                created_at: '2018-09-13T11:34:46.000Z',
                updated_at: '2018-09-13T11:34:46.000Z'
              },
              {
                id: 753,
                name: 'Gardening C2',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 19009900,
                sequence: 1,
                parent: {
                  id: 752,
                  name: 'Gardening C1'
                },
                breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2',
                is_active: 1,
                created_by: 2,
                created_at: '2018-09-13T12:32:54.000Z',
                updated_at: '2018-09-13T12:32:54.000Z'
              },
              {
                id: 750,
                name: 'Testing Adit C3 1',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 99001001,
                sequence: 1,
                parent: {
                  id: 749,
                  name: 'Testing Adit C2'
                },
                breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 1',
                is_active: 1,
                created_by: 166,
                created_at: '2018-09-13T11:34:46.000Z',
                updated_at: '2018-09-13T11:34:46.000Z'
              },
              {
                id: 751,
                name: 'Testing Adit C3 2',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 99001002,
                sequence: 1,
                parent: {
                  id: 749,
                  name: 'Testing Adit C2'
                },
                breadcrumb: 'Category Testing Adit > Testing Adit C1 > Testing Adit C2 > Testing Adit C3 2',
                is_active: 1,
                created_by: 166,
                created_at: '2018-09-13T11:34:47.000Z',
                updated_at: '2018-09-13T11:34:47.000Z'
              },
              {
                id: 754,
                name: 'Gardening C3',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 19009909,
                sequence: 1,
                parent: {
                  id: 753,
                  name: 'Gardening C2'
                },
                breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3',
                is_active: 1,
                created_by: 2,
                created_at: '2018-09-13T12:32:54.000Z',
                updated_at: '2018-09-13T12:32:54.000Z'
              },
              {
                id: 755,
                name: 'Gardening C3 2',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 19009908,
                sequence: 1,
                parent: {
                  id: 753,
                  name: 'Gardening C2'
                },
                breadcrumb: 'Gardening and Tools > Gardening C1 > Gardening C2 > Gardening C3 2',
                is_active: 1,
                created_by: 2,
                created_at: '2018-09-13T12:32:54.000Z',
                updated_at: '2018-09-13T12:32:54.000Z'
              }
            ],
            meta: {
              page: 1,
              limit: 20,
              total_data: 8
            }
          };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
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
