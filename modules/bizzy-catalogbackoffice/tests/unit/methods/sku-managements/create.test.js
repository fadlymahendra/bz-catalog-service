'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');

const RepoPVE = require('../../../../src/repositories/product_vendor');
const RepoPVA = require('../../../../src/repositories/product_variant');
const RepoPG = require('../../../../src/repositories/product_group');
const RepoUOM = require('../../../../src/repositories/uom');
const RepoStockingUOM = require('../../../../src/repositories/stocking_uom');
const RepoCategory = require('../../../../src/repositories/category');
const RepoBrand = require('../../../../src/repositories/brand');
const SyncRepository = require('../../../../src/repositories/sync_service');

const Method = require('../../../../src/methods/sku-managements/create');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return SUCCESS', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({
        getValues() {
            return {
                id: 1
            };
        }
    });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({
        getValues() {
            return {
                id: 1
            };
        }
    });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves({
        getValues() {
            return {
                id: 1
            };
        }
    });

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            vendor_id: 2,
            items: [
                {
                    sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                },
                {
                    sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                }
            ]
        };
        yield Method.postSkuFromPunchout(data, context);
        t.pass();
    } catch (err) {
        t.fail(err);
    }
}));


test.serial('Should be return ERROR case 1', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves({ id: 1 });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');
    } catch (err) {
        t.pass();
    }
}));


test.serial('Should be return ERROR case 2', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves(null);

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves({ id: 1 });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));

test.serial('Should be return ERROR case 3', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves(null);

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves({ id: 1 });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));


test.serial('Should be return ERROR case 4', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));

test.serial('Should be return ERROR case 5', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves(null);
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));


test.serial('Should be return ERROR case 6', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves(null);
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });


    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));

test.serial('Should be return ERROR case 7', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves(null);
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves({
        id: 2
    });


    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));

test.serial('Should be return ERROR case 8', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(RepoUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoStockingUOM, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoCategory, 'findOne').resolves({
        id: 2
    });
    t.context.sandbox.stub(RepoBrand, 'findOne').resolves(null);

    t.context.sandbox.stub(RepoUOM, 'findByName').resolves(null);
    t.context.sandbox.stub(RepoPG, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(RepoPVA, 'findOne').resolves(false);
    t.context.sandbox.stub(RepoPVA, 'createOne').resolves({ id: 1 });

    t.context.sandbox.stub(SyncRepository, 'getVendorWarehousePrimary').resolves({
        data: {
            warehouse_address: {
                id: 1,
                geograph: {
                    province: 1
                }
            }
        }
    });
    t.context.sandbox.stub(RepoPVE, 'createOne').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: 2,
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('Should throw error');        
    } catch (err) {
        t.pass();
    }
}));


test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                vendor_id: '',
                items: [
                    {
                        sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    },
                    {
                        sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
                    }
                ]
            }
        };
        yield Method.postSkuFromPunchout(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.pass();
    }
});


// test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
//     try {
//         const context = {
//             user: ''
//         };
//         const data = {
//             body: {
//                 vendor_id: '',
//                 items: [
//                     {
//                         sku_name: 'Iphone 3', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
//                     },
//                     {
//                         sku_name: 'Iphone 4', product_desc: 'Touchscreen feature', qty: 6.2, unit_price: 500000, uom: 'Box'
//                     }
//                 ]
//             }
//         };
//         yield Method.postSkuFromPunchout(data, context);
//         t.fail('The validator doesn\'t throw an error');
//     } catch (err) {
//         t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
//     }
// });

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
