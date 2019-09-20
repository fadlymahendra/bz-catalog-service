'use strict';

const Excel = require('exceljs');
const Stream = require('stream');
const _ = require('lodash');

const bulkUploadColumnsKey = [
    '',
    'no',
    'product_name',
    'brand',
    'sku_vendor',
    'description',
    'package_content',
    'unspsc',
    'manufacturing_number',
    'barcode_number',
    'uom',
    'stocking_uom',
    'quantity_stocking_uom',
    'package_weight',
    'package_width',
    'package_length',
    'package_height',
    'tier_min_qty_1',
    'tier_min_qty_2',
    'tier_min_qty_3',
    'tier_cogs_price_1',
    'tier_cogs_price_2',
    'tier_cogs_price_3',
    'stock',
    'is_decimal',
    'warranty_type',
    'warranty_period',
    'warranty_limit',
    'warranty_coverage',
    'indent_period',
    'indent_limit',
    'down_payment_type',
    'down_payment_value'
];

const convertRowObject = function (row) {
    const key = bulkUploadColumnsKey;
    const keyIntValue = [
        'tier_min_qty_1',
        'tier_min_qty_2',
        'tier_min_qty_3',
        'tier_cogs_price_1',
        'tier_cogs_price_2',
        'tier_cogs_price_3',
        'stock',
        'package_weight',
        'package_width',
        'package_length',
        'package_height',
        'quantity_stocking_uom',
        'warranty_limit',
        'indent_limit'
    ];
    const objectResult = {};
    for (let i = 1; i < row.length; i++) {
        let el = row[i];
        if (typeof el === 'object') el = el.text;
        if (_.indexOf(keyIntValue, key[i]) !== -1 && el !== null) {
            el = el === '' ? null : Number(el);
            objectResult[key[i]] = el || null;
        } else {
            objectResult[key[i]] = el === '' ? null : el;
        }
    }
    return objectResult;
};

exports.generateStream = async function (base64data) {
    const documentStream = new Stream.Readable();
    const file = Buffer.from(base64data, 'base64');
    documentStream.push(file); // file is ArrayBuffer variable
    documentStream.push(null);
    return documentStream;
};

exports.readDocumentForBulkUpload = async function (documentStream) {
    const workbook = new Excel.Workbook();
    const records = [];
    let worksheet = null;

    await workbook.xlsx.read(documentStream)
        .then(async (res) => {
            worksheet = workbook.getWorksheet(2);
            const cellHeaders = worksheet.getRow(1).values;
            if (cellHeaders[1] !== 'Bulk Upload Template' && worksheet.name !== 'Template Tambah Produk Masal') {
                throw Error('Your template is not valid.');
            }

            // Add Template validation here
            for (let startRow = 3; startRow < 5000; startRow++) {
                const rowText = [undefined];
                for (let i = 1; i < bulkUploadColumnsKey.length; i++) {
                    const e = worksheet.getRow(startRow).getCell(i).text;
                    rowText.push(e);
                }
                const val = convertRowObject(rowText);
                if (!val.product_name &&
                    !val.barcode &&
                    !val.sku_vendor &&
                    !val.uom &&
                    !val.unspsc &&
                    !val.stock) break;
                records.push(val);
            }
        }).catch((err) => {
            throw Error('Upload failed, your file may be corrupt or not valid with bizzy template');
        });
    return records;
};

module.exports = exports;
