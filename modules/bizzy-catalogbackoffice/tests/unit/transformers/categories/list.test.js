'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Transformer = require('../../../../src/transformers/categories/list');

test.serial('Should be return object', function(t) {
    const data = {
        id: '',
        name: '',
        level: '',
        base_margin: '',
        commission: '',
        unspsc: '',
        sequence: '',
        breadcrumb: '',
        is_active: '',
        created_by: '',
        created_at: '',
        updated_at: '',
        parent_id: '1',
        childs: null
    };;
    const transformer = new Transformer.collection(data);
    const expected = {
        id: data.id,
        name: data.name,
        level: data.level,
        base_margin: data.base_margin,
        commission: data.commission,
        unspsc: data.unspsc,
        sequence: data.sequence,
        parent: null,
        breadcrumb: data.breadcrumb,
        is_active: data.is_active,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at
    };

    t.deepEqual(transformer, expected);
});

test.serial('Should be return object', function(t) {
    const data = {
        id: '',
        name: '',
        level: '',
        base_margin: '',
        commission: '',
        unspsc: '',
        sequence: '',
        breadcrumb: '',
        is_active: '',
        created_by: '',
        created_at: '',
        updated_at: '',
        childs: [
            {
                id: '',
                name: ''
            }
        ]
    };;
    const transformer = new Transformer.collection_all(data);
    const expected = {
        id: data.id,
        name: data.name,
        level: data.level,
        base_margin: data.base_margin,
        commission: data.commission,
        unspsc: data.unspsc,
        sequence: data.sequence,
        parent: {
            id: data.childs[0].id,
            name: data.childs[0].name
        },
        breadcrumb: data.breadcrumb,
        is_active: data.is_active,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at
    };

    t.deepEqual(transformer, expected);
});