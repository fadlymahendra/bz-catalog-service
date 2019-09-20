'use strict';

const Promise = require('bizzy-common');
const { BizzyError, BizzyService } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');

const publisher = require('../../../src/utils/publisher');

test.serial('Publish Algolia', function* (t) {

    const publisherResult = {
        ShardId: 'shardId-000000000000',
        SequenceNumber: '49586469145229483627558889690931285725346742055766851586'
    };

    t.context.sandbox.stub(BizzyService, 'publish').resolves(publisherResult);

    try {
        const result = yield publisher.reIndexAlgolia({id: 1});
        t.deepEqual(result, publisherResult);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('delete Algolia', function* (t) {

    const publisherResult = {
        ShardId: 'shardId-000000000000',
        SequenceNumber: '49586469145229483627558889690931285725346742055766851586'
    };

    t.context.sandbox.stub(BizzyService, 'publish').resolves(publisherResult);

    try {
        const result = yield publisher.delIndexAlgolia({id: 1});
        t.deepEqual(result, publisherResult);
    } catch (err) {
        t.fail(err.stack);
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
