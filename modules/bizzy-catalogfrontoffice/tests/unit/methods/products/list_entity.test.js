/* eslint-disable linebreak-style */

'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const Method = require('../../../../src/methods/products/list_entity');
const OrganizationRepo = require('../../../../src/repositories/organizations');

test.serial('Should be return list of customers', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, sku: 'QWERTY'
            },
            query: {
                search: '',
                page: 1,
                limit: 20,
                sort: ''
            }
        };

        const organizations = {
            data: [
                {
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
            ],
            total: 25
        };
        t.context.sandbox.stub(OrganizationRepo, 'getOrganizations').resolves(organizations);

        const expected = {
            data: [
                {
                    id: 2,
                    name: 'PT. Customer 2 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 2',
                    phone: '02122222',
                    pic: 'PIC Customer 2',
                    mobile_phone: '628122222',
                    email: 'customer2@mail.com',
                    is_contract: false
                }
            ],
            meta: {
                limit: 20,
                page: 1,
                total_data: 25,
                total_page: 2
            }
        };
        const result = yield Method.getAllCustomers(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
    }
});

test.serial('Should be return list of customers with contract', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).resolves({ data: { priceRules: [{ sku: 'QWERTY' }] } });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, sku: 'QWERTY'
            },
            query: {
                search: '',
                page: 1,
                limit: 20,
                sort: ''
            }
        };

        const organizations = {
            data: [
                {
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
            ],
            total: 25
        };
        t.context.sandbox.stub(OrganizationRepo, 'getOrganizations').resolves(organizations);

        const expected = {
            data: [
                {
                    id: 2,
                    name: 'PT. Customer 2 Tbk',
                    address: 'Gedung Kantor Jalan Alamat 2',
                    phone: '02122222',
                    pic: 'PIC Customer 2',
                    mobile_phone: '628122222',
                    email: 'customer2@mail.com',
                    is_contract: true
                }
            ],
            meta: {
                limit: 20,
                page: 1,
                total_data: 25,
                total_page: 2
            }
        };
        const result = yield Method.getAllCustomers(data, context);
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
        const context = {};
        const data = {
            path: {
                id: 5, pid: 337
            }
        };

        yield Method.getAllCustomers(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.NotAuthorized, 'You have no authorization access');
    }
});

test.serial('Should be return Forbidden access', function* (t) {
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

        yield Method.getAllCustomers(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'Forbidden access');
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

        yield Method.getAllCustomers(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return error get customer contract', function* (t) {
    const getOrg = t.context.sandbox.stub(BizzyService, 'callSync');
    getOrg.onCall(0).rejects();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3, sku: 'QWERTY'
            },
            query: {
                search: '',
                page: 1,
                limit: 20,
                sort: ''
            }
        };

        const organizations = {
            data: [
                {
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
            ],
            total: 25
        };
        t.context.sandbox.stub(OrganizationRepo, 'getOrganizations').resolves(organizations);

        yield Method.getAllCustomers(data, context);
        t.fail();
    } catch (err) {
        t.true(err instanceof BizzyError.UnprocessableEntity, 'Forbidden access');
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
