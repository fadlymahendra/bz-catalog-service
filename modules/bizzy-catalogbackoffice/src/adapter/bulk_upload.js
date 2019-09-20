'use strict';

const Excel = require('exceljs');
const Stream = require('stream');

const convertRowObject = function (row) {
    const key = [
        '',
        'no',
        'vendor_id',
        'product_name',
        'brand',
        'description',
        'package_content',
        'uom',
        'stocking_uom',
        'quantity_stocking_uom',
        'package_weight',
        'package_length',
        'package_width',
        'package_height',
        'tier_min_qty_1',
        'tier_cogs_price_1',
        'warranty_option',
        'warranty_period',
        'warranty_limit',
        'indent_limit'
    ];
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
        if (keyIntValue.includes(key[i])) {
            el = Number(row[i]);
        }
        objectResult[key[i]] = el === '' ? null : el;
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

            // Add Template validation here
            for (let startRow = 3; startRow < 9999999; startRow++) {
                const rowValues = worksheet.getRow(startRow).values;
                const rowText = [undefined];
                for (let i = 1; i < rowValues.length + 1; i++) {
                    const e = worksheet.getRow(startRow).getCell(i).text;
                    rowText.push(e);
                }
                const val = convertRowObject(rowText);
                if (val.product_name === undefined) break;
                records.push(val);
            }
        }).catch((err) => {
            throw Error('Upload failed, your file may be corrupt or not valid with bizzy template');
        });
    return records;
};

module.exports = exports;
