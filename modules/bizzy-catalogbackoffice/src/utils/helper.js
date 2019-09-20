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

exports.implode = function (data, delimeter) {
    if (data.length === 0) {
        return '';
    }
    return data.join(delimeter);
};

exports.generateSKUD = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

exports.generateSKUDByPrefix = function (prefix, length) {
    let text = prefix;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};


exports.objectToArray = function (object) {
    return Object.keys(object).map((x) => {
        return object[x];
    });
};

exports.checkVariantStatus = function (product) {
    let status = 'completed';

    if (product.variant_value !== 'NO_VARIANT') {
        product.variants.forEach((element) => {
            if (element.attribute_status === 'new') status = 'pending';
        });
    }

    return status;
};

exports.checkSpecStatus = function (payload) {
    let status = 'completed';

    payload.specifications.forEach((element) => {
        if (element.type === 'dropdown' && element.attribute_status === 'new') status = 'pending';
    });

    return status;
};

exports.convertToNull = function (obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
            obj[key] = null;
        }
    }

    return obj;
};

exports.convertToArray = function (data) {
    if (data === null || data === '') {
        return [];
    }

    return JSON.parse(data);
};

exports.toTitleCase = function (str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

exports.getObjectKeys = function (data) {
    const values = [];
    const objectKey = Object.keys(data);
    objectKey.forEach(el => values.push(data[el]));
    return values;
};

exports.getHeadersBulkUpload = function () {
    return {
        no: 'No',
        vendor_id: 'ID Vendor',
        product_name: 'Nama Produk',
        brand: 'Merek',
        description: 'Deskripsi',
        package_content: 'Isi Dalam Kemasan',
        uom: 'Unit of Measure (UOM)',
        stocking_uom: 'Stok UOM',
        quantity_stocking_uom: 'Jumlah Stok per UOM',
        package_weight: 'Berat Kemasan (Gr)',
        package_width: 'Panjang Kemasan (Cm)',
        package_length: 'Lebar Kemasan (Cm)',
        package_height: 'Tinggi Kemasan (Cm)',
        tier_min_qty_1: 'Min. Quantity Jual Grosir 1',
        tier_cogs_price_1: 'Harga Jual Grosir 1 (Belum Termasuk PPN)',
        warranty_type: 'Tipe Garansi',
        warranty_period: 'Periode Garansi',
        warranty_limit: 'Lama Garansi'
    };
};

// for random index mongo
exports.generateRandomIndex = function () {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.jsonCopy = function (src) {
    return JSON.parse(JSON.stringify(src));
};

module.exports = exports;
