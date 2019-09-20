'use strict';

const _ = require('lodash');
const Helper = require('../../utils/helper');

const getCategoryUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

const implodeCategories = function (arr) {
    return arr.join(' > ');
};

const objectID = function (id, type) {
    if (type === 'product_group') {
        return `GP-${id}`;
    }
    return `SKU-${id}`;
};

const getAttributes = function (data) {
    const result = {
        variants: {},
        specifications: [],
        matrix_attributes: {}
    };

    if (data.variants.length > 0) {
        data.variants.forEach((d) => {
            if (!result.variants[d.code]) {
                result.variants[d.code] = {};
            }
            if (!result.variants[d.code][d.attribute_value_id]) {
                result.variants[d.code][d.attribute_value_id] = d;
            }
        });
    }

    let value = '';
    if (data.specifications.length > 0) {
        _.forEach(data.specifications, (val, key) => {
            const label = val.label.replace(' ', '_');
            if (val.type === 'textinput') {
                value = val.text_input;
            } else {
                value = val.value;
                if (typeof result.matrix_attributes[label] === 'undefined') {
                    result.matrix_attributes[label] = []; // initialize variable
                }
                result.matrix_attributes[label] = value;
                // result.matrix_attributes[label].push(value);
            }
            result.specifications.push({
                code: val.code,
                label: val.label,
                value
            });
        });
    }

    return result;
};

const getMatrixAttributes = function (attr, variantValue) {
    if (!(variantValue === 'NO_VARIANT')) {
        const newresult = {};
        const variants = JSON.parse(variantValue);
        if (variants) {
            Object.keys(variants).forEach((code) => {
                const valueId = variants[code];
                if (attr.variants[code][valueId]) {
                    newresult[attr.variants[code][valueId].label.replace(' ', '_')] = attr.variants[code][valueId].value;
                }
            });
        }
        return Object.assign(newresult, attr.matrix_attributes);
    }
    return attr.matrix_attributes;
};

const getWarehouseInformation = function (warehouses) {
    const temp = {};
    warehouses.data.forEach((data) => {
        temp[data.id] = data;
    });
    return temp;
};

const item = function (data) {
    return {
        objectID: objectID(data.product_variant_id, data.type),
        type: data.type,
        sku: data.sku,
        name: data.long_name,
        url_key: Helper.slugify(data.long_name),
        product_group: {
            id: data.product_group_id,
            name: data.product_group_name,
            url_key: Helper.slugify(data.product_group_name)
        },
        product_variant: {
            id: data.product_variant_id,
            sku: data.sku,
            long_name: data.long_name,
            url_key: Helper.slugify(data.long_name)
        },
        product_vendors: [
        ],
        brand: {
            id: data.brand_id,
            name: data.brand_name,
            url_key: Helper.slugify(data.brand_name)
        },
        categories: {
            lvl0: data.category0_name,
            lvl1: implodeCategories([data.category0_name, data.category1_name]),
            lvl2: implodeCategories([data.category0_name, data.category1_name, data.category2_name]),
            lvl3: implodeCategories([data.category0_name, data.category1_name, data.category2_name, data.category3_name])
        },
        hierarchical_categories: {
            c0: {
                id: data.category0_id,
                name: data.category0_name,
                url_key: getCategoryUrlKey(data.category0_name, data.category0_level, data.category0_id)
            },
            c1: {
                id: data.category1_id,
                name: data.category1_name,
                url_key: getCategoryUrlKey(data.category1_name, data.category1_level, data.category1_id)
            },
            c2: {
                id: data.category2_id,
                name: data.category2_name,
                url_key: getCategoryUrlKey(data.category2_name, data.category2_level, data.category2_id)
            },
            c3: {
                id: data.category3_id,
                name: data.category3_name,
                url_key: getCategoryUrlKey(data.category3_name, data.category3_level, data.category3_id)
            }
        },
        specifications: data.specifications,
        matrix_attributes: data.matrix_attributes,
        primary_image: data.primary_image,
        additional_image: (data.additional_image === null || data.additional_image === '') ? [] : JSON.parse(data.additional_image),
        stock_available: 0,
        total_offer: 0,
        start_from: 0,
        created_at: '',
        reindex_at: new Date(),
        timestamp: ''
    };
};

const vendor = function (data) {
    const warehouse = data.warehouse_information;
    const vendorName = [];
    if (warehouse) {
        vendorName.push(warehouse.vendor.prefix);
        vendorName.push(warehouse.vendor.name);
        vendorName.push(warehouse.vendor.suffix);
    }
    return {
        id: data.product_vendor_id,
        uuid: data.uuid,
        vendor_id: data.vendor_id,
        vendor_name: (vendorName.length > 0 ? vendorName.join(' ') : 'undefined'),
        vendor_logo: (warehouse && warehouse.vendor.logo ? warehouse.vendor.logo : ''),
        warehouse_id: data.warehouse_id,
        warehouse_geograph: {
            province: (warehouse ? warehouse.warehouse_address.geograph.province : 'undefined'),
            city: (warehouse ? warehouse.warehouse_address.geograph.city : 'undefined'),
            district: (warehouse ? warehouse.warehouse_address.geograph.district : 'undefined'),
            village: (warehouse ? warehouse.warehouse_address.geograph.village : 'undefined'),
            zipcode: (warehouse ? warehouse.warehouse_address.geograph.zipcode : 'undefined'),
            geotag: (warehouse ? warehouse.warehouse_address.geograph.geotag : 'undefined')
        },
        tier_min_qty_1: parseInt(data.tier_min_qty_1),
        tier_min_qty_2: parseInt(data.tier_min_qty_2),
        tier_min_qty_3: parseInt(data.tier_min_qty_3),
        tier_cogs_price_1: parseFloat(data.tier_cogs_price_1),
        tier_cogs_price_2: parseFloat(data.tier_cogs_price_2),
        tier_cogs_price_3: parseFloat(data.tier_cogs_price_3),
        stock_available: parseInt(data.stock_available),
        currency: data.currency,
        customer_id: (data.customer_id === null || data.customer_id === undefined) ? 0 : parseInt(data.customer_id),
        is_indent: parseInt(data.is_indent),
        indent_period: data.is_indent,
        indent_limit: parseInt(data.is_indent),
        is_decimal: parseInt(data.is_decimal),
        down_payment_type: parseInt(data.down_payment_type),
        down_payment_value: parseInt(data.down_payment_value),
        created_at: data.created_at,
        is_active: data.is_active,
        timestamp: (Date.parse(data.created_at) / 1000)
    };
};

const getMaxStock = function (items) {
    let result = 0;

    for (let i = 0; i < items.length; i++) {
        result = Math.max(result, items[i].stock_available);
    }
    return result;
};

const getCheapestPrice = function (items) {
    let result = Infinity;

    for (let i = 0; i < items.length; i++) {
        result = Math.min(result, items[i].tier_cogs_price_3 || items[i].tier_cogs_price_2 || items[i].tier_cogs_price_1);
    }
    return result;
};

exports.collection = function (products, attributes, others = []) {
    const temp = {};
    const pv = [];
    const result = [];
    let i = 0;

    const attrs = getAttributes(attributes);
    const warehouseInfo = getWarehouseInformation(others.warehouses);

    _.forEach(products, (value, key) => {
        const objId = objectID(value.product_variant_id, value.type);
        value.specifications = attrs.specifications;
        value.matrix_attributes = getMatrixAttributes(attrs, value.variant_value);
        value.warehouse_information = ((typeof warehouseInfo[value.warehouse_id] === 'undefined' && warehouseInfo[value.warehouse_id] !== undefined) ? {} : warehouseInfo[value.warehouse_id]);
        temp[objId] = item(value);
        if (typeof pv[objId] === 'undefined' || pv[objId].length === 0) {
            pv[objId] = []; // initialize variable
        }
        if (others.organizations.data.length > 0) {
            const organization = others.organizations.data.find(v => v.id === value.vendor_id);
            value.uuid = organization ? organization.uuid : null;
        }
        pv[objId].push(vendor(value));
    });

    _.forEach(temp, (value, key) => {
        value.product_vendors = pv[key];
        value.stock_available = pv[key][0].stock_available;
        value.total_offer = pv[key].length;
        value.start_from = pv[key][0].tier_cogs_price_1;
        value.created_at = pv[key][0].created_at;
        value.timestamp = pv[key][0].timestamp;
        result[i] = value;
        i += 1;
    });

    // Remove vendors that is inactive
    _.remove(result[0].product_vendors, n => n.is_active === 0);

    // Re-update values
    result[0].total_offer = 0;
    result[0].start_from = 0;
    result[0].stock_available = 0;
    if (result[0].product_vendors.length !== 0) {
        result[0].total_offer = result[0].product_vendors.length;
        result[0].start_from = getCheapestPrice(result[0].product_vendors);
        result[0].stock_available = getMaxStock(result[0].product_vendors);
    }

    return result;
};

// exports.item = function (data) {
//     const groups = [];
//     data.forEach((row) => {
//         groups.push(row.group_id);
//     });

//     return groups;
// };

// exports.labels = function (data) {
//     const label = [];
//     data.forEach((row) => {
//         label.push(row.payload);
//     });

//     return label;
// };

exports.mongoInsert = function (messageError, sku, uniqueId, input) {
    return {
        id: uniqueId,
        product_sku: sku,
        message: messageError,
        data_input: input,
        created_at: new Date(),
        updated_at: new Date()
    };
};

module.exports = exports;
