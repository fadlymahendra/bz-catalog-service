'use strict';

const ADDCATEGORY = 'ADDCATEGORY';
const EDITCATEGORY = 'EDITCATEGORY';
const CHANGESTATUS_CATEGORY = 'CHANGESTATUS_CATEGORY';

exports.generateLog = function (action, value, context) {
    let title;

    switch (action) {
    case ADDCATEGORY:
        title = 'Tambah Kategori';
        break;
    case CHANGESTATUS_CATEGORY:
        title = 'Ubah Status Kategori';
        break;
    case EDITCATEGORY:
    default:
        title = 'Ubah Kategori';
        break;
    }

    const log = {
        title,
        category: value.currentValue,
        user: {
            id: context.user.employee.id,
            name: context.user.employee.name,
            email: context.user.username,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
    return log;
};

exports.collection = function (data) {
    return {
        id: data._id,
        title: data.title,
        category: {
            id: data.category.id,
            name: data.category.name,
            level: data.category.level,
            is_active: data.category.is_active
        },
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            type: data.user.type
        },
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

module.exports = exports;
