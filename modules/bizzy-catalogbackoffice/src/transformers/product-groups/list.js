'use strict';

exports.listWithTotalSku = function (listProductGroup, countTotalSKU, countTotalLogs) {
    const temp1 = [];
    countTotalSKU.forEach((item) => {
        temp1[parseInt(item.product_group_id)] = item.total_sku;
    });

    const temp2 = [];
    countTotalLogs.forEach((item) => {
        temp2[parseInt(item._id)] = item.total;
    });

    return listProductGroup.map(data => ({
        id: data.id,
        name: data.name,
        primary_image: data.primary_image,
        total_sku: (temp1[parseInt(data.id)]) ? temp1[parseInt(data.id)] : 0,
        total_history: (temp2[parseInt(data.id)]) ? temp2[parseInt(data.id)] : 0,
        status: data.status,
        visibility: data.visibility,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at
    }));
};


module.exports = exports;
