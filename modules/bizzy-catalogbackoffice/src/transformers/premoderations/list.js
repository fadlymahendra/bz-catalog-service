'use strict';

const getVariant = function (data) {
    const valueList = [];

    for (let i = 0; i < data.length; i++) {
        const dataVariant = data[i].variants;
        let merge = '';
        for (let v = 0; v < dataVariant.length; v++) {
            const datas = dataVariant[v].attribute_value_name;
            merge = `${merge} ${dataVariant[v].attribute_value_name}`;

            if (dataVariant.length === 1) {
                valueList.push(datas);
            } else {
                if (v % 2 === 1) {
                    valueList.push(merge.trim());

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

const getSpecification = function (dataSpec) {
    const valueSpec = [];
    for (let s = 0; s < dataSpec.length; s++) {
        let pushData = '';

        if (dataSpec[s].attribute_status === 'new') {
            if (dataSpec[s].attribute_type === 'dropdown') {
                const pushDataDrop = dataSpec[s].attribute_value_label;
                valueSpec.push(pushDataDrop);
            } else {
                pushData = dataSpec[s].attribute_textinput;
                valueSpec.push(pushData);
            }
        }
    }

    const productSpec = {
        specification: valueSpec
    };

    return productSpec;
};

const getBrand = function (payload) {
    const brand = [];
    if (payload.brand_status === 'new' && payload.brand_id === 0) {
        const dataBrand = payload.brand_name;
        brand.push(dataBrand);
    }

    const brandProduct = {
        brand_name: brand
    };
    return brandProduct;
};

exports.collection = function (data) {
    const productVariant = getVariant(data.payload.products);
    const productSpecification = getSpecification(data.payload.specifications);
    const premoderationBrand = getBrand(data.payload);

    const {
        total_history: totalHistory,
        premoderation_status: premoderationStatus
    } = data;

    return {
        id: data.id,
        product_group_id: data.product_group_id ? data.product_group_id : null,
        name: data.payload.name,
        curations: productVariant.variants.concat(productSpecification.specification, premoderationBrand.brand_name),
        vendor_id: data.vendor_id ? data.vendor_id : null,
        assign_to: data.assign ? data.assign.id : null,
        status: premoderationStatus,
        total_history: totalHistory,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

module.exports = exports;
