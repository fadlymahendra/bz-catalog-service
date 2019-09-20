'use strict';

exports.parseDataObject = function (object) {
    return JSON.parse(JSON.stringify(object));
};

exports.offsetPagination = function (page, limit) {
    page = page ? parseInt(page) : 1;
    limit = parseInt(limit);
    const offset = ((page - 1) * limit);
    return offset || 0;
};

exports.lowerTrim = function (string) {
    return string.toLowerCase().trim();
};

exports.isNumber = function (x) {
    if (typeof x === 'number') {
        return true;
    }
    return x.match(/^[0-9]+$/);
};

exports.implode = function (data, delimeter) {
    if (data.length === 0) {
        return '';
    }
    return data.join(delimeter);
};

exports.slugify = function (string) {
    if (string === '') return '';
    let url = string.toLowerCase().trim();
    url = url.replace(' / ', ' ');
    url = url.replace(' & ', '-');
    url = url.replace(/ /g, '-');
    url = url.replace(/--/g, '-');
    url = url.replace(/[^\w.]/g, '-');
    url = url.replace(/--/g, '-');
    url = url.replace(/-_/g, '_');
    return url;
};

exports.convertToArray = function (data, type) {
    if (data === 'NO_VARIANT') {
        return 'NO_VARIANT';
    }

    if (type === 'object') {
        if (data === null || data === '') {
            return {};
        }
    }

    if (data === null || data === '') {
        return [];
    }

    return JSON.parse(data);
};

exports.generateProductlog = function (_, log_frame, product1, product2) {
    const result = [];
    let clone1 = {};
    let clone2 = {};
    for (let i = 1; i <= 3; i++) {
        const product_1_min_qty = parseInt(product1[`tier_min_qty_${i}`]);
        const product_2_min_qty = parseInt(product2[`tier_min_qty_${i}`]);
        const product_1_cogs_price = parseInt(product1[`tier_cogs_price_${i}`]);
        const product_2_cogs_price = parseInt(product2[`tier_cogs_price_${i}`]);
        if (product_1_min_qty != product_2_min_qty && (!isNaN(product_1_min_qty) || !isNaN(product_2_min_qty))) {
            clone1 = _.cloneDeep(log_frame);
            clone1.title = `Ubah Jumlah Produk Dijual ${i}`;
            if (i == 1) {
                clone1.payload.before = `1 - ${product_1_min_qty}`;
                clone1.payload.after = `1 - ${product_2_min_qty}`;
                result.push(clone1);
            }
            if (i == 2) {
                clone1.payload.before = `${parseInt(product1.tier_min_qty_1 + 1)} - ${product_1_min_qty}`;
                clone1.payload.after = `${parseInt(product2.tier_min_qty_1 + 1)} - ${product_2_min_qty}`;
                result.push(clone1);
            }
            if (i == 3) {
                clone1.payload.before = `${parseInt(product1.tier_min_qty_2 + 1)} - ${product_1_min_qty}`;
                clone1.payload.after = `${parseInt(product2.tier_min_qty_2 + 1)} - ${product_2_min_qty}`;
                result.push(clone1);
            }
        }

        if (product_1_cogs_price !== product_2_cogs_price && (!isNaN(product_1_cogs_price) || !isNaN(product_2_cogs_price))) {
            clone2 = _.cloneDeep(log_frame);
            clone2.title = `Ubah Harga Grosir ${i}`;
            clone2.payload.before = product_1_cogs_price;
            clone2.payload.after = product_2_cogs_price;
            result.push(clone2);
        }
    }

    if (parseInt(product1.stock_available) !== parseInt(product2.stock_available)) {
        const clone3 = _.cloneDeep(log_frame);
        clone3.title = 'Ubah Stok';
        clone3.payload.before = product1.stock_available;
        clone3.payload.after = product2.stock_available;
        result.push(clone3);
    }

    return result;
};

// exports.checkDuplicateArray = function (arr) {
//     const arrObject = {};
//     let valid = { isValid: true };
//     arr.forEach((el) => {
//         if (el in arrObject) valid = { isValid: false, value: el };
//         arrObject[el] = true;
//     });
//     return valid;
// };

module.exports = exports;
