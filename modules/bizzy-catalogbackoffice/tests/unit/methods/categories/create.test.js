const test = require('ava');
const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const sinon = require('sinon');

const CategoryRepo = require('../../../../src/repositories/category');
const CategoryLogRepo = require('../../../../src/repositories/category_log');
const Method = require('../../../../src/methods/categories/create');

const validPayloadCase1 = {
    body: {
        C0: {
            id: 12,
            name: 'this is c0',
            unspsc: 27000000
        },
        C1: {
            id: 75,
            name: 'this is c1',
            unspsc: 27110000
        },
        C2: {
            id: 140,
            name: 'this is c2',
            unspsc: 27111700
        },
        C3: [
            {
                name: 'this is c3 one',
                unspsc: 27111702
            }
        ]
    }
};

const validPayloadCase2 = {
    body: {
        C0: {
            id: 12,
            name: 'this is c0',
            unspsc: 27000000
        },
        C1: {
            id: 75,
            name: 'this is c1',
            unspsc: 27110000
        },
        C2: {
            id: 0,
            name: 'this is c2',
            unspsc: 27111700
        },
        C3: [
            {
                name: 'this is c3 one',
                unspsc: 27111702
            }
        ]
    }
};


const validPayloadCase3 = {
    body: {
        C0: {
            id: 0,
            name: 'this is c0',
            unspsc: 27000000
        },
        C1: {
            id: 0,
            name: 'this is c1',
            unspsc: 27110000
        },
        C2: {
            id: 0,
            name: 'this is c2',
            unspsc: 27111700
        },
        C3: [
            {
                name: 'this is c3 one',
                unspsc: 27111702
            }
        ]
    }
};

const validPayloadCase4 = {
    body: {
        C0: {
            id: 0,
            name: 'this is c0',
            unspsc: 27000000
        },
        C1: {
            id: 0,
            name: 'this is c1',
            unspsc: 27111700
        },
        C2: {
            id: 0,
            name: 'this is c2',
            unspsc: 27111711
        },
        C3: [
            {
                name: 'this is c3 one',
                unspsc: 27111702
            }
        ]
    }
};


const validPayloadCase5 = {
    body: {
        C0: {
            id: 0,
            name: 'this is c0',
            unspsc: 27000000
        },
        C1: {
            id: 0,
            name: 'this is c1',
            unspsc: 27110000
        },
        C2: {
            id: 0,
            name: 'this is c2',
            unspsc: 27111711
        },
        C3: [
            {
                name: 'this is c3 one',
                unspsc: 27111702
            }
        ]
    }
};

const invalidPayload = {
    body: {
        C0: {
            id: 12,
            name: 'this is c0',
            unspsc: 52000000
        },
        C1: {
            id: 75,
            name: 'this is c1',
            unspsc: 52150000
        },
        C2: {
            id: 140,
            name: 'this is c2',
            unspsc: 52151700
        }
    }
};

const validContext = require('../../../mocks/context.json');

const resfindOrCreateSuccess = [
    {
        id: 1,
        parent_id: null
    },
    true
];

const resfindOrCreateFailed = [
    {
        id: 1,
        parent_id: null
    },
    false
];

test.serial('Successfull to create category, with only one C3 created', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindOne.onCall(2).resolves({
        id: 3,
        level: 'C2',
        unspsc: '27111700',
        parent_id: 2
    });

    // looping C3 to insert
    // get Breadcrumb
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(2).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(3).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(5).resolves(false);

    t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase1, validContext);
        t.pass();
    } catch (err) {
        // console.log(err);
        t.fail();
    }
});

test.serial('Successfull to create category, with C2 and C3 created', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '2700000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);

    t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess).atLeast(2);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull to create category, with C0, C1, C2 and C3 created', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');

    // insert C0
    // unspsc validation for C0
    catRepoFindOne.onCall(0).resolves(false);
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);

    // insert C1
    // get Breadcrumb C1
    catRepoFindById.onCall(0).resolves({
        id: 2,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C1
    catRepoFindOne.onCall(1).resolves(false);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);

    // insert C2
    // get Breadcrumb C2
    catRepoFindById.onCall(1).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(2).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);
    findOrCreate.onCall(2).resolves(resfindOrCreateSuccess);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(3).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(4).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(5).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);
    findOrCreate.onCall(3).resolves(resfindOrCreateSuccess);

    // t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess).atLeast(2);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase3, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed to create category, with only one C3 created: Return Badrequest reject by database: Category Already Exist', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);

    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);
    findOrCreate.onCall(1).resolves(resfindOrCreateFailed);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.fail('Should Return Error: BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, with only one C3 created: Return Badrequest reject by database: Category Already Exist, with non of inserting before', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);

    // t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess).atLeast(2);
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');
    findOrCreate.onCall(0).resolves(resfindOrCreateFailed);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);

    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.fail('Should Return Error: BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, with C0 Category is not valid', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');

    // unspsc validation for C0
    catRepoFindOne.onCall(0).resolves(false);
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);

    try {
        yield Method.postCategory(validPayloadCase1, validContext);
        t.fail('Should Return BadRequest');
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed to create category, with only one C3 created: Return Badrequest, invalid Unspsc C3 error in 0, 4', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '17111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '17110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);

    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.fail('Should Return Error: BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, with only one C3 created: Return Badrequest, invalid Unspsc C3 error in 4, 6', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27112200',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);

    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.fail('Should Return Error: BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, invalid unspsc in C1', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');

    // insert C0
    // unspsc validation for C0
    catRepoFindOne.onCall(0).resolves(false);
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);

    // insert C1
    // get Breadcrumb C1
    catRepoFindById.onCall(0).resolves({
        id: 2,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C1
    catRepoFindOne.onCall(1).resolves(false);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);

    // insert C2
    // get Breadcrumb C2
    catRepoFindById.onCall(1).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(2).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);
    findOrCreate.onCall(2).resolves(resfindOrCreateSuccess);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(3).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(4).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(5).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);
    findOrCreate.onCall(3).resolves(resfindOrCreateSuccess);

    // t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess).atLeast(2);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase4, validContext);
        t.fail();
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, invalid unspsc in C2 in 0, 4', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');

    // insert C0
    // unspsc validation for C0
    catRepoFindOne.onCall(0).resolves(false);
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);

    // insert C1
    // get Breadcrumb C1
    catRepoFindById.onCall(0).resolves({
        id: 2,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C1
    catRepoFindOne.onCall(1).resolves(false);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);

    // insert C2
    // get Breadcrumb C2
    catRepoFindById.onCall(1).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(2).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27270000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);
    findOrCreate.onCall(2).resolves(resfindOrCreateSuccess);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(3).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(4).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(5).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);
    findOrCreate.onCall(3).resolves(resfindOrCreateSuccess);

    // t.context.sandbox.mock(CategoryRepo).expects('findOrCreate').resolves(resfindOrCreateSuccess).atLeast(2);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase3, validContext);
        t.fail();
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, invalid unspsc in C2 in 6, 8', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');

    // insert C0
    // unspsc validation for C0
    catRepoFindOne.onCall(0).resolves(false);
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);

    // insert C1
    // get Breadcrumb C1
    catRepoFindById.onCall(0).resolves({
        id: 2,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C1
    catRepoFindOne.onCall(1).resolves(false);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);

    // insert C2
    // get Breadcrumb C2
    catRepoFindById.onCall(1).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(2).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);
    findOrCreate.onCall(2).resolves(resfindOrCreateSuccess);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(3).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(4).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(5).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(false);
    findOrCreate.onCall(3).resolves(resfindOrCreateSuccess);

    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase5, validContext);
        t.fail('Should Return BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed to create category, with only one C3 created: Return Badrequest, unspsc already exists', function* (t) {
    // looping already created category
    const catRepoFindOne = t.context.sandbox.stub(CategoryRepo, 'findOne');
    catRepoFindOne.onCall(0).resolves({
        id: 1,
        level: 'C0',
        unspsc: '27000000',
        parent_id: null
    });
    catRepoFindOne.onCall(1).resolves({
        id: 2,
        level: 'C1',
        unspsc: '27110000',
        parent_id: 1
    });

    // insert C2
    // get Breadcrumb C2
    const catRepoFindById = t.context.sandbox.stub(CategoryRepo, 'findById');
    catRepoFindById.onCall(0).resolves({
        id: 3,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 2
    });
    catRepoFindById.onCall(1).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C0',
        unspsc: '270000',
        parent_id: null
    });

    // unspsc validation for C2
    catRepoFindOne.onCall(2).resolves({
        dataValues: {
            id: 3,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(3).resolves(false);

    // looping C3 to insert
    // get Breadcrumb C3
    catRepoFindById.onCall(2).resolves({
        id: 3,
        level: 'C2',
        name: 'This is C2',
        unspsc: '27111700',
        parent_id: 2
    });
    catRepoFindById.onCall(3).resolves({
        id: 2,
        level: 'C1',
        name: 'This is C1',
        unspsc: '27110000',
        parent_id: 1
    });
    catRepoFindById.onCall(4).resolves({
        id: 1,
        level: 'C0',
        name: 'This is C0',
        unspsc: '27000000',
        parent_id: null
    });

    // unspsc validation for C3
    catRepoFindOne.onCall(4).resolves({
        dataValues: {
            id: 3,
            level: 'C2',
            unspsc: '27111700',
            parent_id: 2
        }
    });
    catRepoFindOne.onCall(5).resolves({
        dataValues: {
            id: 2,
            level: 'C1',
            unspsc: '27110000',
            parent_id: 1
        }
    });
    catRepoFindOne.onCall(6).resolves(true);

    const findOrCreate = t.context.sandbox.stub(CategoryRepo, 'findOrCreate');
    findOrCreate.onCall(0).resolves(resfindOrCreateSuccess);
    findOrCreate.onCall(1).resolves(resfindOrCreateSuccess);
    t.context.sandbox.mock(CategoryLogRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(CategoryRepo).expects('deleteMany').resolves(true);

    try {
        yield Method.postCategory(validPayloadCase2, validContext);
        t.fail('Should Return Error: BadRequest');
    } catch (err) {
        // console.log(err);
        t.pass();
    }
});

test.serial('Failed To Create Category, Payload Not Valid', function* (t) {
    try {
        yield Method.postCategory(invalidPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed To Create Category, Not Authorized', function* (t) {
    try {
        yield Method.postCategory(validPayloadCase1, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
