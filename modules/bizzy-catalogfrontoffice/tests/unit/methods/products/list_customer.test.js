/* eslint-disable linebreak-style */

'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const Method = require('../../../../src/methods/products/list_customer');
const ProductVendorRepo = require('../../../../src//repositories/product_vendor');

test.serial('Should be return list of customers', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).resolves({
        data: {
            id: 1,
            prefix: 'PT',
            name: 'Customer 1',
            suffix: 'Tbk',
            place: 'Gedung Kantor',
            street: 'Jalan Alamat 1',
            phone: '02111111',
            pic_name: 'PIC Customer 1',
            pic_email: 'customer1@mail.com',
            pic_mobile: '62811111'
        }
    });
    getOrg.onCall(1).resolves({
        data: {
            id: 2,
            prefix: 'PT',
            name: 'Customer 2',
            suffix: 'Tbk',
            place: 'Gedung Kantor',
            street: 'Jalan Alamat 2',
            phone: '02122222',
            pic_name: 'PIC Customer 2',
            pic_email: 'customer2@mail.com',
            pic_mobile: '628122222'
        }
    });
    getOrg.onCall(2).resolves({
        data: {
            id: 3,
            prefix: 'PT',
            name: 'Customer 3',
            suffix: 'Tbk',
            place: 'Gedung Kantor',
            street: 'Jalan Alamat 3',
            phone: '02133333',
            pic_name: 'PIC Customer 3',
            pic_email: 'customer3@mail.com',
            pic_mobile: '628133333'
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, pid: 337
            }
        };

        const product = {
            id: 337,
            customer: null,
            PrivateSkus: [
                {
                    id: 1,
                    product_vendor_id: 337,
                    customer_id: 1
                },
                {
                    id: 2,
                    product_vendor_id: 337,
                    customer_id: 2
                },
                {
                    id: 3,
                    product_vendor_id: 337,
                    customer_id: 3
                }
            ]
        };
        t.context.sandbox.stub(ProductVendorRepo, 'findOneWithPrivateSku').resolves(product);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'PT. Customer 1 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 1',
                    phone: '02111111',
                    pic: 'PIC Customer 1',
                    mobile_phone: '62811111',
                    email: 'customer1@mail.com'
                },
                {
                    id: 2,
                    name: 'PT. Customer 2 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 2',
                    phone: '02122222',
                    pic: 'PIC Customer 2',
                    mobile_phone: '628122222',
                    email: 'customer2@mail.com'
                },
                {
                    id: 3,
                    name: 'PT. Customer 3 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 3',
                    phone: '02133333',
                    pic: 'PIC Customer 3',
                    mobile_phone: '628133333',
                    email: 'customer3@mail.com'
                }
            ]
        };
        const result = yield Method.getCustomerListByVendor(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
    }
});

test.serial('Should be return customer auto live', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).resolves({
        data: {
            id: 1,
            prefix: 'PT',
            name: 'Customer 1',
            suffix: 'Tbk',
            place: 'Gedung Kantor',
            street: 'Jalan Alamat 1',
            phone: '02111111',
            pic_name: 'PIC Customer 1',
            pic_email: 'customer1@mail.com',
            pic_mobile: '62811111'
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, pid: 337
            }
        };

        const product = {
            id: 337,
            customer_id: 1,
            PrivateSkus: []
        };
        t.context.sandbox.stub(ProductVendorRepo, 'findOneWithPrivateSku').resolves(product);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'PT. Customer 1 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 1',
                    phone: '02111111',
                    pic: 'PIC Customer 1',
                    mobile_phone: '62811111',
                    email: 'customer1@mail.com'
                }
            ]
        };
        const result = yield Method.getCustomerListByVendor(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
    }
});

test.serial('Should be return not authorize', function* (t) {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: {}
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 5, pid: 337
            }
        };

        yield Method.getCustomerListByVendor(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You have no authorization access');
    }
});


test.serial('Should be return bad request: invalid payload', function* (t) {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: {}
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, pid: 'abc'
            }
        };

        yield Method.getCustomerListByVendor(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return product not found', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).resolves({
        data: {
            id: 1,
            prefix: 'PT',
            name: 'Customer 1',
            suffix: 'Tbk',
            place: 'Gedung Kantor',
            street: 'Jalan Alamat 1',
            phone: '02111111',
            pic_name: 'PIC Customer 1',
            pic_email: 'customer1@mail.com',
            pic_mobile: '62811111'
        }
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, pid: 1000
            }
        };
        t.context.sandbox.stub(ProductVendorRepo, 'findOneWithPrivateSku').resolves(null);
        yield Method.getCustomerListByVendor(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
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
