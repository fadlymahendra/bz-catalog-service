'use strict';

const getVariant = function (data) {
    const valueList = [];
    const listVariant = [];
    for (let i = 0; i < data.length; i++) {
        const dataVariant = data[i].variants;
        let merge = '';

        for (let v = 0; v < dataVariant.length; v++) {
            const showVariant = dataVariant[v];
            const datas = dataVariant[v].attribute_value_name;
            merge = `${merge} - ${dataVariant[v].attribute_value_name}`;
            if (dataVariant.length === 1) {
                valueList.push(datas);
            } else {
                if (v % 2 === 1) {
                    const removeSpace = merge.trimLeft();
                    valueList.push(removeSpace.replace('- ', ''));

                    merge = '';
                }

                if (dataVariant.length % 2 === 1 && v === dataVariant.length - 1) {
                    valueList.push(datas);
                }
            }

            listVariant.push(showVariant);
        }
    }

    const productVariant = {
        variants: valueList
    };

    return productVariant;
};

const getCategory = function (item) {
    if (item === null) {
        return {
            id: 0,
            name: '',
            unspsc: 0
        };
    }
    return {
        id: item.id,
        name: item.name,
        unspsc: item.unspsc
    };
};

exports.collection = function (data) {
    const productVariant = getVariant(data.payload.products);

    return {
        id: data.id,
        name: data.payload.name,
        product_group_id: data.product_group_id ? data.product_group_id : null,
        variants: productVariant.variants,
        categories: {
            C0: getCategory(data.c0)
            /* JIKA SUATU HARI DIBUTUHKAN
            C1: {
                id: data.c1.id,
                name: data.c1.name,
                unspsc: data.c1.unspsc
            },
            C2: {
                id: data.c2.id,
                name: data.c2.name,
                unspsc: data.c2.unspsc
            },
            C3: {
                id: data.c3.id,
                name: data.c3.name,
                unspsc: data.c3.unspsc
            }, */
        },
        status: data.premoderation_status,
        created_by: data.user.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        rejected_at: data.rejected_at ? data.rejected_at : null
    };
};

exports.categoryList = function (data) {
    return {
        id: data.id,
        name: data.name
    };
};

module.exports = exports;
