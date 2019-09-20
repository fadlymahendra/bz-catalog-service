'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Authorization = require('../../../src/utils/authorization');

test.serial('Should be return object', function* (t) {
    const context = {
        user: {
            username: 'admin@bizzy.co.id',
            first_name: 'Admin',
            last_name: 'Bizzy',
            scope: 'organization',
            employee: {
                id: 2,
                name: 'Admin Bizzy',
                team: 'Technology',
                roles: [{
                    id: 11,
                    name: 'Super Admin'
                }]
            },
            iat: 1514477786,
            exp: 1514479586
        }
    };
    const data = {};
    t.deepEqual(Authorization.getUser(data, context), false);
    t.deepEqual(Authorization.getUser(context), context.user);
    t.deepEqual(Authorization.getUserEmail(context), context.user.username);
    t.deepEqual(Authorization.getUserId(context), context.user.employee.id);
    t.deepEqual(Authorization.getUserFullname(context), 'AdminBizzy');
    t.deepEqual(Authorization.getUserRole(context), {});
    const contextData = {
        user: {
            username: 'admin@bizzy.co.id',
            first_name: 'Admin'
        }
    };
    t.deepEqual(Authorization.getUserFullname(contextData), 'Admin');
});

test.serial('Should be return user id empty', function* (t) {
    const context = {
        user: {
            username: 'admin@bizzy.co.id',
            first_name: 'Admin',
            last_name: 'Bizzy',
            scope: 'organization',
            employee: {
                name: 'Admin Bizzy',
                team: 'Technology',
                roles: [{
                    id: 11,
                    name: 'Super Admin'
                }]
            },
            iat: 1514477786,
            exp: 1514479586
        }
    };

    t.deepEqual(Authorization.getUserId(context), '');
});

test.serial('Should be return user email empty', function* (t) {
    const context = {
        user: {
            first_name: 'Admin',
            last_name: 'Bizzy',
            scope: 'organization',
            employee: {
                id: 2,
                name: 'Admin Bizzy',
                team: 'Technology',
                roles: [{
                    id: 11,
                    name: 'Super Admin'
                }]
            },
            iat: 1514477786,
            exp: 1514479586
        }
    };

    t.deepEqual(Authorization.getUserEmail(context), '');
});

test.serial('Should be return user fullname empty', function* (t) {
    const context = {
        user: {
            username: 'admin@bizzy.co.id',
            scope: 'organization',
            employee: {
                id: 2,
                name: 'Admin Bizzy',
                team: 'Technology',
                roles: [{
                    id: 11,
                    name: 'Super Admin'
                }]
            },
            iat: 1514477786,
            exp: 1514479586
        }
    };

    t.deepEqual(Authorization.getUserFullname(context), '');
});
