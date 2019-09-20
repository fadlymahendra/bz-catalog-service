'use strict';

const Helper = require('../../utils/time');

const emailTo = function (user) {
    return [{
        id: user,
        type: 'EMPLOYEE'
    }];
};

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
            assign_to: item[i].assign.name
        });
    }

    return data;
};

exports.item = function (item) {
    return {
        data: {
            body: {
                template: {
                    email: 'premoderation_emails_pending_and_after_revised'
                },
                to: emailTo(item._id),
                data: {
                    template: {
                    },
                    body: emailBody(item.data)
                }
            }
        }
    };
};

module.exports = exports;
