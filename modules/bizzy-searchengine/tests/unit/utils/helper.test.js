const Promise = require('bluebird');
const test = require('ava');
const Helper = require('../../../src/utils/helper');

test.serial('Should be return object', function* (t) {
    const page = 2;
    const limit = 20;
    const object = {
        id: 10045,
        name: 'Uom Test'
    };

    t.deepEqual(Helper.offsetPagination(page, limit), 20);
    t.deepEqual(Helper.parseDataObject(object), { id: 10045, name: 'Uom Test' });
    t.deepEqual(Helper.lowerTrim('Lorem Ipsum'), 'lorem ipsum');

    const type = '';
    t.deepEqual(Helper.convertToArray('NO_VARIANT', type), 'NO_VARIANT');
    t.deepEqual(Helper.convertToArray('', 'object'), {});
    t.deepEqual(Helper.convertToArray('', type), []);
    t.deepEqual(Helper.implode([], ' '), '');
    t.deepEqual(Helper.slugify(''), '');
    t.deepEqual(Helper.isNumber(123), true);
    t.deepEqual(Helper.isNumber('object'), null);
});

test.serial('Should be return object with no page is set', function* (t) {
    const limit = 20;
    const object = {
        id: 10045,
        name: 'Uom Test'
    };

    t.deepEqual(Helper.offsetPagination(null, limit), 0);
    t.deepEqual(Helper.parseDataObject(object), { id: 10045, name: 'Uom Test' });
    t.deepEqual(Helper.lowerTrim('Lorem Ipsum'), 'lorem ipsum');
});
