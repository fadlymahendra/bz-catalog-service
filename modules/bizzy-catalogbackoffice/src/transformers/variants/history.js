'use strict';

const ADDVARIANT = 'ADDVARIANT';
const EDITVARIANTVALUE = 'EDITVARIANTVALUE';
const EDITVARIANTNAME = 'EDITVARIANTNAME';
const EDITVARIANTCATEGORY = 'EDITVARIANTCATEGORY';
const EDITVARIANTDESCRIPTION = 'EDITVARIANTDESCRIPTION';

exports.generateLog = function (payload, context) {
    let title;

    switch (payload.action) {
    case ADDVARIANT:
        title = 'Buat Variant Baru';
        break;
    case EDITVARIANTCATEGORY:
        title = 'Ubah Kategori Variant';
        break;
    case EDITVARIANTVALUE:
        title = 'Ubah Nilai Variant';
        break;
    case EDITVARIANTDESCRIPTION:
        title = 'Ubah Deskripsi Variant';
        break;
    case EDITVARIANTNAME:
    default:
        title = 'Ubah Nama Variant';
        break;
    }

    const log = {
        title,
        attribute_set_id: payload.attribute_set_id,
        payload: payload.request,
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
        variant: {
            id: data.attribute_set_id
        },
        payload: data.payload,
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
