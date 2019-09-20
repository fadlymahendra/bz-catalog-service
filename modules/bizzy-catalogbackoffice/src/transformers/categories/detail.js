'use strict';

const getParent = function (data) {
    let parent = null;
    if (data.parent_id !== null && data.childs) {
        parent = {
            id: data.childs[0].id,
            name: data.childs[0].name
        };
    }
    return parent;
};

exports.collection = function (data) {
    return {
        id: data.id,
        name: data.name,
        level: data.level,
        base_margin: data.base_margin,
        commission: data.commission,
        unspsc: data.unspsc,
        sequence: data.sequence,
        parent_id: data.parent_id,
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

exports.collectionItem = function (data) {
    return {
        id: data.id,
        name: data.name,
        level: data.level,
        base_margin: data.base_margin,
        commission: data.commission,
        unspsc: data.unspsc,
        sequence: data.sequence,
        parent: getParent(data),
        hirarchy: data.hirarchy,
        breadcrumb: data.breadcrumb,
        is_active: data.is_active,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

module.exports = exports;
