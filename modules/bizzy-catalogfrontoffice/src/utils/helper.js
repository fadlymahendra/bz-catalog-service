'use strict';

const { BizzyError } = require('bizzy-common');

exports.parseDataObject = function (object) {
    return JSON.parse(JSON.stringify(object));
};

exports.offsetPagination = function (page, limit) {
    page = page ? parseInt(page) : 1;
    limit = parseInt(limit);
    const offset = ((page - 1) * limit);
    return offset ? offset : 0;
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

exports.generateSKUD = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.IsNewVariant = function (variants) {
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].attribute_value_id === 0) return true;
    }

    return false;
};

exports.convertToNull = function (obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
            obj[key] = null;
        }
    }

    return obj;
};

exports.convertToNullInteger = function (obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] === '' || Number(obj[key]) === 0)) {
            obj[key] = null;
        }
    }

    return obj;
};

exports.tierValidation = function tierValidation(input, throwError = true) {
    let tierStatus = true;

    const tierMinQty1 = parseInt(input.tier_min_qty_1);
    const tierMinQty2 = (input.tier_min_qty_2 === null) ? null : parseInt(input.tier_min_qty_2);
    const tierMinQty3 = (input.tier_min_qty_3 === null) ? null : parseInt(input.tier_min_qty_3);

    const tierCogsPrice1 = parseInt(input.tier_cogs_price_1);
    const tierCogsPrice2 = (input.tier_cogs_price_2 === null) ? null : parseInt(input.tier_cogs_price_2);
    const tierCogsPrice3 = (input.tier_cogs_price_3 === null) ? null : parseInt(input.tier_cogs_price_3);

    if ((tierMinQty2 !== null && tierCogsPrice2 === null) || (tierMinQty2 === null && tierCogsPrice2 !== null)) {
        tierStatus = false;
    }

    if ((tierMinQty3 !== null && tierCogsPrice3 === null) || (tierMinQty3 === null && tierCogsPrice3 !== null)) {
        tierStatus = false;
    }

    if (tierMinQty2 !== null && (tierMinQty2 <= tierMinQty1)) {
        tierStatus = false;
    }

    if (tierMinQty3 !== null && (tierMinQty3 <= tierMinQty2)) {
        tierStatus = false;
    }

    if (tierCogsPrice3 !== null && (tierCogsPrice3 >= tierCogsPrice2)) {
        tierStatus = false;
    }

    if (tierCogsPrice2 !== null && (tierCogsPrice2 >= tierCogsPrice1)) {
        tierStatus = false;
    }

    if (!tierStatus && throwError) {
        throw BizzyError.BadRequest('Tier Qty or Price Not Valid');
    } else {
        return tierStatus;
    }
};

exports.generateProductlog = function (_, logFrame, product1, product2) {
    let result = [];
    let clone1 = {}, clone2 = {};
    for (let i=1; i<=3; i++) {
        let product_1_min_qty = parseInt(product1['tier_min_qty_'+i]);        
        let product_2_min_qty = parseInt(product2['tier_min_qty_'+i]);        
        let product_1_cogs_price = parseInt(product1['tier_cogs_price_'+i]);
        let product_2_cogs_price = parseInt(product2['tier_cogs_price_'+i]);
        if (product_1_min_qty!=product_2_min_qty && (!isNaN(product_1_min_qty) || !isNaN(product_2_min_qty))) {
            clone1 = _.cloneDeep(logFrame);
            clone1.title = 'Ubah Jumlah Produk Dijual '+i;
            if (i==1) {
                clone1.payload.before = '1 - '+product_1_min_qty;
                clone1.payload.after = '1 - '+product_2_min_qty;
                result.push(clone1);
            }
            if (i==2) {
                clone1.payload.before = parseInt(product1['tier_min_qty_1'] +1)+' - '+product_1_min_qty;
                clone1.payload.after = parseInt(product2['tier_min_qty_1'] +1)+' - '+product_2_min_qty;        
                result.push(clone1);
            }
            if (i==3) {
                clone1.payload.before = parseInt(product1['tier_min_qty_2'] +1)+' - '+product_1_min_qty;
                clone1.payload.after = parseInt(product2['tier_min_qty_2'] +1)+' - '+product_2_min_qty;        
                result.push(clone1);
            }
        }
        
        if (product_1_cogs_price != product_2_cogs_price  && (!isNaN(product_1_cogs_price) || !isNaN(product_2_cogs_price))) {
            const clone2 = _.cloneDeep(logFrame);
            clone2.title = 'Ubah Harga Grosir '+i;
            clone2.payload.before = product_1_cogs_price;
            clone2.payload.after = product_2_cogs_price;
            result.push(clone2);
        }
    }

    if (parseInt(product1.stock_available) != parseInt(product2.stock_available)) {
        const clone3 = _.cloneDeep(logFrame);
        clone3.title = 'Ubah Stok';
        clone3.payload.before = product1.stock_available;
        clone3.payload.after = product2.stock_available;
        result.push(clone3);
    }

    return result;
};

exports.getHeadersExcel = function () {
    const headers = {
        no: 'No.',
        product_name: 'Nama Produk',
        sku_vendor: 'SKU ID Vendor',
        brand: 'ID Merek',
        description: 'Deskripsi',
        package_content: 'Isi Dalam Kemasan',
        unspsc: 'UNSPSC (Opsional)',
        manufacturing_number: 'Nomor Manufactur (Opsional)',
        barcode_number: 'Nomor Barcode (Opsional)',
        uom: 'Unit of Measure (UOM)',
        stocking_uom: 'Stok UOM',
        quantity_stocking_uom: 'Jumlah Stok per UOM',
        package_weight: 'Berat Kemasan (Gr)',
        package_width: 'Panjang Kemasan (Cm)',
        package_length: 'Lebar Kemasan (Cm)',
        package_height: 'Tinggi Kemasan (Cm)',
        tier_min_qty_1: 'Min. Quantity Jual Grosir 1',
        tier_min_qty_2: 'Min. Quantity Jual Grosir 2 (Opsional)',
        tier_min_qty_3: 'Min. Quantity Jual Grosir 3 (Opsional)',
        tier_cogs_price_1: 'Harga Jual Grosir 1 (Belum Termasuk PPN)',
        tier_cogs_price_2: 'Harga Jual Grosir 2 (Belum Termasuk PPN) (Opsional)',
        tier_cogs_price_3: 'Harga Jual Grosir 3 (Belum Termasuk PPN) (Opsional)',
        stock: 'Stok',
        warranty_type: 'Tipe Garansi',
        warranty_period: 'Periode Garansi',
        warranty_limit: 'Lama Garansi',
        warranty_coverage: 'Cakupan Garansi (Opsional)',
        is_indent: 'Produk Inden (Opsional)',
        indent_period: 'Periode Inden',
        indent_limit: 'Waktu Proses'
    };

    return headers;
};

exports.getHeadersExcelEdit = function (channelType) {
    const headers = {
        no: 'No.',
        sku_bizzy: 'SKU ID Bizzy',
        product_name: 'Nama Produk',
        sku_vendor: 'SKU ID Vendor (Opsional)',
        brand: 'ID Merek',
        variant1: 'Varian 1',
        variant2: 'Varian 2',
        tier_min_qty_1: 'Min. Quantity Jual Grosir 1',
        tier_min_qty_2: 'Min. Quantity Jual Grosir 2 (Opsional)',
        tier_min_qty_3: 'Min. Quantity Jual Grosir 3 (Opsional)',
        tier_cogs_price_1: 'Harga Jual Grosir 1',
        tier_cogs_price_2: 'Harga Jual Grosir 2 (Belum Termasuk PPN) (Opsional)',
        tier_cogs_price_3: 'Harga Jual Grosir 3 (Belum Termasuk PPN) (Opsional)',
        // tier_min_qty_for_bizzy: 'Min. Quantity Jual Kontrak', (uncomment this line to enable contract)
        // tier_price_for_bizzy: 'Harga Jual Kontrak (Belum Termasuk PPN)', (uncomment this line to enable contract)
        stock: 'Stock',
        warranty_type: 'Tipe Garansi',
        warranty_period: 'Periode Garansi',
        warranty_limit: 'Lama Garansi',
        warranty_coverage: 'Cakupan Garansi (Opsional)',
        is_indent: 'Produk Inden (Opsional)',
        indent_period: 'Periode Inden',
        indent_limit: 'Waktu Proses',
        is_active: 'Status SKU'
    };

    // if (channelType === 'MP') {
    //     delete headers.tier_min_qty_for_bizzy;
    //     delete headers.tier_price_for_bizzy;
    // }

    return headers;
};

exports.checkDuplicateArray = function (arr) {
    const arrObject = {};
    let valid = { isValid: true };
    arr.forEach((el) => {
        if (el in arrObject) { 
            valid = { isValid: false, value: arrObject[el] };
        }
        arrObject[el] = el;
    });
    return valid;
};

exports.isAlphaNumeric = function (text) {
    const regex = /[^a-zA-Z0-9]/g;
    const found = text.match(regex);
    if (found) return false;
    return true;
};

exports.checkValidDownpayment = (product) => {
    if (product.down_payment_type === 1) {
        if (product.down_payment_value < 0 || product.down_payment_value > 99) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not valid Downpayment Value Must be 1 - 99 %`);
    } else if (product.down_payment_type === 2) {
        let tierPrice = product.tier_cogs_price_1;
        if (product.tier_cogs_price_3) {
            tierPrice = product.tier_cogs_price_3;
        } else if (product.tier_cogs_price_2) {
            tierPrice = product.tier_cogs_price_2;
        }
        if (product.down_payment_value > tierPrice) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not valid Downpayment Value Must be lower than ${tierPrice}`);
    }
};

exports.NullUndefinedToStrEmpty = function (data) {
    return (data === null || data === undefined) ? '' : data;
};

exports.UndefinedToNull = function (data) {
    return (data === undefined) ? null : data;
};

exports.checkIndentProduct = (product) => {
    if (product.is_indent === 1) {
        switch (product.indent_period) {
        case 'day':
            if (product.indent_limit > 365) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not Valid, Indent Limit must be Max 365 days`);
            break;
        case 'week':
            if (product.indent_limit > 52) throw BizzyError.BadRequest(`SKU ${product.sku_vendor} Not Valid, Indent Limit must be Max 52 weeks`);
            break;
        default:
            break;
        }
    }
};

module.exports = exports;
