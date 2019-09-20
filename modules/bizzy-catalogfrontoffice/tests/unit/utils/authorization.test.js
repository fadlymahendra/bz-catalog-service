'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Authorization = require('../../../src/utils/authorization');


test.serial('validateUser: test type-1', function* (t) {
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
            employee: {
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

    const result = Authorization.validateUser(context);
    const expected = true;

    t.deepEqual(result, expected);
});

test.serial('validateUser: test type-2', function* (t) {
    const context = {
        user: {
            username: 'vendor2@test.com',
            first_name: 'Bambang',
            last_name: 'Widodo',
            scope: 'organization',
            addons: [],
            groups: null,
            iat: 1515740579,
            exp: 1515747779
        }
    };

    const result = Authorization.validateUser(context);
    const expected = false;

    t.deepEqual(result, expected);
});

test.serial('vendorAccess: test type-1', function* (t) {
    const data = {
        path: {
            id: ''
        }
    };
    const context = {
        
    };

    const result = Authorization.vendorAccess(data, context);
    const expected = false;

    t.deepEqual(result, expected);
});

test.serial('getUser: test type-1', function* (t) {
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
            employee: {
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

    const result = Authorization.getUser(context);
    const expected = {
        addons: [],
        customer: {
            organization_id: 3,
            organization_name: 'PT Vendor Jaya Tbk.',
            person_id: 3,
            roles: [
                {
                    name: 'Super Admin',
                    role_id: 1
                }
            ],
            superadmin: 3
        },
        employee: {
            roles: [
                {
                    name: 'Super Admin',
                    role_id: 1
                }
            ]
        },
        exp: 1515747779,
        first_name: 'Bambang',
        groups: null,
        iat: 1515740579,
        last_name: 'Widodo',
        scope: 'organization',
        username: 'vendor2@test.com'
    };

    t.deepEqual(result, expected);
});

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
    t.deepEqual(Authorization.getUser(data, context), false);
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

    const context = {
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
