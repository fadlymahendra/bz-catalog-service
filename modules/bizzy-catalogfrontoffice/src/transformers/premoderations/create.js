'use strict';

const generateRandomIndex = function generateRandomIndex() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

exports.collection = function (data) {
    data.category_id = parseInt(data.category_id);
    data.brand_id = parseInt(data.brand_id);
    data.uom_id = parseInt(data.uom_id);
    data.stocking_uom_id = parseInt(data.stocking_uom_id);
    data.variant_count = parseInt(data.variant_count);

    const uniqueId = data.uniqueId;
    const user = data.user;
    const type = data.type;
    const premoderationStatus = 'need_revision';
    const vendorId = data.vendor_id;
    const productGroupId = data.product_group_id;

    delete data.uniqueId;
    delete data.created_by;
    delete data.type;
    delete data.vendor_id;
    delete data.product_group_id;
    
    data.products.forEach((element) => {
        element.index = generateRandomIndex();
    });

    data.products.forEach((element) => {
        if (element.reference_link[0] === '') delete element.reference_link;
    });

    data.quantity_stocking_uom = parseInt(data.quantity_stocking_uom);

    const newdata = {
        id: uniqueId,
        type,
        payload: data,
        premoderation_status: premoderationStatus,
        vendor_id: vendorId,
        user: user,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (productGroupId) {
        newdata.product_group_id = productGroupId;
    }

    return newdata;
};

module.exports = exports;
