'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        name: data.name
    };
};

exports.generateLogTitle = function () {
    return {
        sku_vendor: 'Ubah Sku Vendor',
        tier_min_qty_1: 'Ubah Jumlah Produk 1',
        tier_min_qty_2: 'Ubah Jumlah Produk 2',
        tier_min_qty_3: 'Ubah Jumlah Produk 3',
        tier_cogs_price_1: 'Ubah Harga Grosir 1',
        tier_cogs_price_2: 'Ubah Harga Grosir 2',
        tier_cogs_price_3: 'Ubah Harga Grosir 3',
        stock_available: 'Ubah Stok',
        is_indent: 'Ubah Status Indent',
        indent_period: 'Ubah Periode Indent',
        indent_limit: 'Ubah Limit Indent',
        warranty_option: 'Ubah Jenis Garansi',
        warranty_period: 'Ubah Periode Garansi',
        warranty_limit: 'Ubah Limit Garansi',
        warranty_coverage: 'Ubah Cangkupan Garansi',
        reference_link: 'Ubah Referensi Link Produk'
    };
};

module.exports = exports;
