'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Authorization = require('../../../src/utils/authorization');

test.serial('Should be return object', function* (t) {
    const data = {
        path: {
            id: '3'
        },
        body: {
            foo: 'bar'
        }
    };

    const context = {
        user: {
            username: 'vendor2@test.com',
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    const contextEmpty = {
        user: {}
    };

    const expected = {
        username: 'vendor2@test.com',
        first_name: 'Bambang',
        last_name: 'Widodo',
        scope: 'organization',
        customer: {
            organization_name: 'PT Vendor Jaya Tbk.',
            organization_id: 3,
            person_id: 3,
            superadmin: 3,
            roles: [
                {
                    role_id: 1,
                    name: 'Super Admin'
                }
            ]
        },
        addons: [],
        groups: null,
        iat: 1515740579,
        exp: 1515747779
    };
    t.deepEqual(Authorization.getUser(context), expected);
    t.deepEqual(Authorization.getUser(data, contextEmpty), false);
    t.deepEqual(Authorization.getUserEmail(context), context.user.username);
    t.deepEqual(Authorization.getUserId(context), context.user.customer.person_id);
    t.deepEqual(Authorization.getUserFullname(context), 'Bambang Widodo');
});

test.serial('Should be return user id empty', function* (t) {
    const context = {
        user: {
            username: 'vendor2@test.com',
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.getUserId(context), '');
});

test.serial('Should be return user last name empty', function* (t) {
    const context = {
        user: {
            username: 'vendor2@test.com',
            first_name: 'Bambang',
            last_name: '',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.getUserFullname(context), 'Bambang');
});

test.serial('Should be return user id different with path', function* (t) {
    const data = {
        path: {
            id: '3'
        },
        body: {
            foo: 'bar'
        }
    };

    const context = {
        user: {
            username: 'vendor2@test.com',
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.vendorAccess(data, context), true);
});

test.serial('Should be return vendor access false', function* (t) {
    const data = {
        path: {
            id: '3'
        },
        body: {
            foo: 'bar'
        }
    };

    const context = {};
    const contextOrganizationId = {
        user: {
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: undefined,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.vendorAccess(data, context), false);
    t.deepEqual(Authorization.vendorAccess(data, contextOrganizationId), false);
});

test.serial('Should be return vendor access false data path id', function* (t) {
    const data = {
        path: {
            id: ''
        },
        body: {
            foo: 'bar'
        }
    };

    const dataTest = {
        path: {
            id: '18'
        },
        body: {
            foo: 'bar'
        }
    };
    const context = {
        user: {
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.vendorAccess(data, context), false);
    t.deepEqual(Authorization.vendorAccess(dataTest, context), false);
});

test.serial('Should be return user email empty', function* (t) {
    const context = {
        user: {
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.getUserEmail(context), '');
});

test.serial('Should be return user fullname empty', function* (t) {
    const context = {
        user: {
            username: 'vendor2@test.com',
            scope: 'organization',
            customer: {
                organization_name: 'PT Vendor Jaya Tbk.',
                organization_id: 3,
                person_id: 3,
                superadmin: 3,
                roles: [
                    {
                        role_id: 1,
                        name: 'Super Admin'
                    }
                ]
            },
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    t.deepEqual(Authorization.getUserFullname(context), '');
});
