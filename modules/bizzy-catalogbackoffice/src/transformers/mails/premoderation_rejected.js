'use strict';

const Helper = require('../../utils/time');

const generateVariant = function (dataProducts) {
    const valueList = [];

    for (let i = 0; i < dataProducts.length; i++) {
        if (dataProducts[i].variant_value === 'NO_VARIANT') {
            valueList.push('-');
        }
        const dataVariant = dataProducts[i].variants;
        let merge = '';
        for (let v = 0; v < dataVariant.length; v++) {
            const datas = dataVariant[v].attribute_value_name;
            merge = `${merge} - ${dataVariant[v].attribute_value_name}`;

            if (dataVariant.length === 1) {
                valueList.push(datas);
            } else {
                if (v % 2 === 1) {
                    const mergeVariant = merge.trimLeft();
                    const removeDash = mergeVariant.replace('-', '');
                    valueList.push(removeDash);
                    merge = '';
                }

                if (dataVariant.length % 2 === 1 && v === dataVariant.length - 1) {
                    valueList.push(datas);
                }
            }
        }
    }

    const productVariant = {
        variants: valueList
    };

    return productVariant;
};

const emailTo = function (vendor) {
    return [{
        id: vendor,
        type: 'PERSON'
    }];
};

const emailCc = function (data) {
    const itemsAssign = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].assign) {
            const assignCC = {
                id: parseInt(data[i].assign.id),
                type: data[i].assign.type.toUpperCase()
            };
            itemsAssign.push(assignCC);
        }
    }

    return itemsAssign;
};

const emailBcc = function () {
    return [{
        type: 'DIRECT',
        name: 'Content Team',
        email: 'content@bizzy.co.id',
        phone: '',
        company: 'Bizzy Indonesia'
    }];
};

const emailBody = function (item) {
    const data = {
        url: '',
        items: []
    };

    for (let i = 0; i < item.length; i++) {
        const dataProducts = item[i].payload;
        const productVariant = generateVariant(dataProducts.products);
        const datetime = Helper.convertDateForMail(item[i].created_at);
        data.items.push({
            name: item[i].payload.name,
            varian: productVariant.variants.join('<br/>'),
            date: datetime.date,
            time: datetime.time,
            alasan: item[i].log.reject_reasons.totally_reject
        });
    }

    return data;
};

exports.item = function (row) {
    return {
        data: {
            body: {
                template: {
                    email: 'premoderation_emails_rejected'
                },
                to: emailTo(row._id),
                cc: emailCc(row.data),
                bcc: emailBcc(),
                data: {
                    template: {
                        group_store: 'Kantor Pusat'
                    },
                    body: emailBody(row.data)
                }
            }
        }
    };
};

module.exports = exports;
