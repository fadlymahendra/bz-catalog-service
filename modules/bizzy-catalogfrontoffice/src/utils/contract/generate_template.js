'use strict';

const _ = require('lodash');
const Excel = require('exceljs');

// Label Value
const labelNo = 'No';
const labelNamaSku = 'Nama SKU';
const labelSkuNumber = 'Nomor SKU';
const labelHargaGrosir = 'Harga Grosir';
const labelHargaDiskon = 'Harga Diskon';
const labelMinQty = 'Min Qty';
const labelHargaGrosirTier1 = 'Harga Grosir Tier 1';
const labelHargaGrosirTier2 = 'Harga Grosir Tier 2';
const labelHargaGrosirTier3 = 'Harga Grosir Tier 3';
const labelMinQtyTier1 = 'Min Qty Tier 1';
const labelMinQtyTier2 = 'Min Qty Tier 2';
const labelMinQtyTier3 = 'Min Qty Tier 3';
const labelTipeDiskon = 'Tipe Diskon';
const labelHargaDiskonTier1 = 'Harga Diskon Tier 1';
const labelHargaDiskonTier2 = 'Harga Diskon Tier 2';
const labelHargaDiskonTier3 = 'Harga Diskon Tier 3';
const labelAlamatPenerima = 'Alamat Penerima';
const labelStartSku = 'Awal Masa Berlaku';
const labelEndSku = 'Akhir Masa Berlaku';
const labelAlamatPengirim = 'Alamat Pengirim';
const tipeDiskon = 'Harga Tetap,Diskon Persen,Diskon Nominal';
// -------------------------------------------------------------------------

// Helper Function
const setCellFont = function (worksheet, row, firstCell, lastCell, style) {
    for (let i = firstCell; i < lastCell; i++) {
        row.getCell(i).font = style;
    }
};

const setRowFill = function (worksheet, row, firstCell, lastCell, style) {
    for (let i = firstCell; i < lastCell; i++) {
        row.getCell(i).fill = style;
    }
};

const generateBorder = function (worksheet, row, firstCell, lastCell) {
    const c = worksheet.getRow(row);
    for (let i = 1; i < lastCell; i++) {
        c.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    }
};

const setStyle = function (startRow) {
    if (startRow % 2 === 1) {
        return {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0EBF5' }
        };
    }

    return {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFEFEFD' }
    };
};
// -------------------------------------------------------------------------

// Loco
const templateLocoCustom = function (workbook, templatePayload) {
    const worksheet = workbook.getWorksheet('Template Tambah Produk Masal');

    // Define label header
    // ----
    const labelTemplate = [
        labelNo,
        labelNamaSku,
        labelSkuNumber,
        labelHargaGrosir,
        labelMinQty,
        labelTipeDiskon,
        labelHargaDiskon,
        labelStartSku,
        labelEndSku
    ];
    const columnLength = labelTemplate.length;

    // Set Column Size
    const colWidth = [0, 8, 40, 20, 20, 15, 15, 20, 25, 25];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheet.getColumn(i).width = el;
    }
    // ----

    // Set label header
    // ----
    worksheet.addRow(labelTemplate);
    const header = worksheet.getRow(1);
    setRowFill(worksheet, header, 1, columnLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet, header, 1, columnLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startRow = 2;
    for (let index = 1; index <= templatePayload.length; index++) {
        const element = templatePayload[index - 1];

        // Set value
        const rowValue = [];
        rowValue[0] = index;
        rowValue[1] = element.skuName;
        rowValue[2] = element.skuNumber;
        rowValue[3] = element.tierPrice1;
        rowValue[7] = element.convertedStartDate;
        rowValue[8] = element.convertedEndDate;

        // Add new row
        worksheet.addRow(rowValue);

        // Set spesial row
        const row = worksheet.getRow(startRow);
        // Set diskon type
        row.getCell(6).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${tipeDiskon}"`]
        };

        const style = setStyle(startRow);

        setRowFill(worksheet, row, 1, rowValue.length + 1, style);
        startRow += 1;
    }
    // ----

    // Generate Border
    for (let i = 1; i <= templatePayload.length + 1; i++) {
        generateBorder(worksheet, i, 1, labelTemplate.length + 1);
    }

    return workbook;
};

const templateLocoDefault = function (workbook, templatePayload) {
    const worksheet = workbook.getWorksheet('Template Tambah Produk Masal');

    const labelTemplate = [
        labelNo,
        labelNamaSku,
        labelSkuNumber,
        labelHargaGrosirTier1,
        labelHargaGrosirTier2,
        labelHargaGrosirTier3,
        labelMinQtyTier1,
        labelMinQtyTier2,
        labelMinQtyTier3,
        labelTipeDiskon,
        labelHargaDiskonTier1,
        labelHargaDiskonTier2,
        labelHargaDiskonTier3,
        labelStartSku,
        labelEndSku
    ];

    const columnLength = labelTemplate.length;

    // Set Column Size
    const colWidth = [0, 8, 40, 20, 20, 20, 20, 20, 20, 20, 15, 25, 25, 25, 25, 25];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheet.getColumn(i).width = el;
    }
    // ----

    // Set label header
    // ----
    worksheet.addRow(labelTemplate);
    const header = worksheet.getRow(1);
    setRowFill(worksheet, header, 1, columnLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet, header, 1, columnLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startRow = 2;
    for (let index = 1; index <= templatePayload.length; index++) {
        const element = templatePayload[index - 1];

        // Set value
        const rowValue = [];
        rowValue[0] = index;
        rowValue[1] = element.skuName;
        rowValue[2] = element.skuNumber;
        rowValue[3] = element.tierPrice1;
        rowValue[4] = element.tierPrice2 ? element.tierPrice2 : '---';
        rowValue[5] = element.tierPrice3 ? element.tierPrice3 : '---';
        rowValue[6] = element.tierQty1;
        rowValue[7] = element.tierQty2 ? element.tierQty2 : '---';
        rowValue[8] = element.tierQty3 ? element.tierQty3 : '---';
        rowValue[11] = element.tierQty2 ? '' : '---';
        rowValue[12] = element.tierQty3 ? '' : '---';
        rowValue[13] = element.convertedStartDate;
        rowValue[14] = element.convertedEndDate;

        // Add new row
        worksheet.addRow(rowValue);

        // Set spesial row
        const row = worksheet.getRow(startRow);
        // Set diskon type
        row.getCell(10).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${tipeDiskon}"`]
        };

        const style = setStyle(startRow);

        setRowFill(worksheet, row, 1, rowValue.length + 1, style);
        startRow += 1;
    }
    // ----

    // Generate Border
    for (let i = 1; i <= templatePayload.length + 1; i++) {
        generateBorder(worksheet, i, 1, labelTemplate.length + 1);
    }

    return workbook;
};

// - Franco
const templateFrancoCustom = function (workbook, templatePayload, shippingOrigins) {
    const worksheet = workbook.getWorksheet('Template Tambah Produk Masal');

    const labelTemplate = [
        labelNo,
        labelNamaSku,
        labelSkuNumber,
        labelHargaGrosir,
        labelMinQty,
        labelTipeDiskon,
        labelHargaDiskon,
        labelAlamatPenerima,
        labelStartSku,
        labelEndSku
    ];

    const columnLength = labelTemplate.length;

    // Set Column Size
    const colWidth = [0, 8, 40, 20, 20, 15, 15, 20, 40, 25, 25];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheet.getColumn(i).width = el;
    }
    // ----

    // Set label header
    // ----
    worksheet.addRow(labelTemplate);
    const header = worksheet.getRow(1);
    setRowFill(worksheet, header, 1, columnLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet, header, 1, columnLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startRow = 2;
    for (let index = 1; index <= templatePayload.length; index++) {
        const element = templatePayload[index - 1];

        // Set value
        const rowValue = [];
        rowValue[0] = index;
        rowValue[1] = element.skuName;
        rowValue[2] = element.skuNumber;
        rowValue[3] = element.tierPrice1;
        rowValue[7] = element.destination;
        rowValue[8] = element.convertedStartDate;
        rowValue[9] = element.convertedEndDate;

        // Add new row
        worksheet.addRow(rowValue);

        // Set spesial row
        const row = worksheet.getRow(startRow);
        // Set diskon type
        row.getCell(6).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${tipeDiskon}"`]
        };

        const style = setStyle(startRow);

        setRowFill(worksheet, row, 1, rowValue.length + 1, style);
        startRow += 1;
    }
    // ----

    // Generate Border
    for (let i = 1; i <= templatePayload.length + 1; i++) {
        generateBorder(worksheet, i, 1, labelTemplate.length + 1);
    }

    // ------------------------------------------------------------------

    // Add worksheet 2
    const worksheet2 = workbook.addWorksheet('Daftar Alamat Pengirim');

    // Define label
    const labelOrigins = [
        labelNo,
        labelAlamatPengirim
    ];
    const originsLength = labelOrigins.length;

    // Set Column Size
    const colOriginsWidth = [0, 8, 40];
    for (let i = 1; i < colOriginsWidth.length; i++) {
        const el = colWidth[i];
        worksheet2.getColumn(i).width = el;
    }

    // Set label header
    // ----
    worksheet2.addRow(labelOrigins);
    const headerOrigins = worksheet2.getRow(1);
    setRowFill(worksheet2, headerOrigins, 1, originsLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet2, headerOrigins, 1, originsLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startOrigins = 2;
    const hub = _.get(shippingOrigins, 'shippingHubs', []);
    for (let index = 1; index <= hub.length; index++) {
        const ele = hub[index - 1];

        const rowValue = [];
        rowValue[0] = startOrigins - 1;
        rowValue[1] = `${ele.name}-HUB-${ele.hub}`;

        // Add new row
        worksheet2.addRow(rowValue);

        // Customize row
        const style = setStyle(startOrigins);
        const row = worksheet2.getRow(startOrigins);
        setRowFill(worksheet2, row, 1, rowValue.length + 1, style);

        startOrigins += 1;
    }

    const geo = _.get(shippingOrigins, 'shippingGeographs', []);
    for (let index = 1; index <= geo.length; index++) {
        const ele = geo[index - 1];

        const rowValue = [];
        rowValue[0] = startOrigins - 1;
        rowValue[1] = `${ele.name}-GEO-${ele.geograph}`;

        // Add new row
        worksheet2.addRow(rowValue);

        // Customize row
        const style = setStyle(startOrigins);
        const row = worksheet2.getRow(startOrigins);
        setRowFill(worksheet2, row, 1, rowValue.length + 1, style);

        startOrigins += 1;
    }
    // ---

    // Generate Border
    for (let i = 1; i <= startOrigins - 1; i++) {
        generateBorder(worksheet2, i, 1, labelOrigins.length + 1);
    }

    return workbook;
};

const templateFrancoDefault = function (workbook, templatePayload, shippingOrigins) {
    const worksheet = workbook.getWorksheet('Template Tambah Produk Masal');

    const labelTemplate = [
        labelNo,
        labelNamaSku,
        labelSkuNumber,
        labelHargaGrosirTier1,
        labelHargaGrosirTier2,
        labelHargaGrosirTier3,
        labelMinQtyTier1,
        labelMinQtyTier2,
        labelMinQtyTier3,
        labelTipeDiskon,
        labelHargaDiskonTier1,
        labelHargaDiskonTier2,
        labelHargaDiskonTier3,
        labelAlamatPenerima,
        labelStartSku,
        labelEndSku
    ];
    const columnLength = labelTemplate.length;

    // Set Column Size
    const colWidth = [0, 8, 40, 20, 20, 20, 20, 20, 20, 20, 15, 25, 25, 25, 40, 25, 25];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheet.getColumn(i).width = el;
    }
    // ----

    // Set label header
    // ----
    worksheet.addRow(labelTemplate);
    const header = worksheet.getRow(1);
    setRowFill(worksheet, header, 1, columnLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet, header, 1, columnLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startRow = 2;
    for (let index = 1; index <= templatePayload.length; index++) {
        const element = templatePayload[index - 1];

        // Set value
        const rowValue = [];
        rowValue[0] = index;
        rowValue[1] = element.skuName;
        rowValue[2] = element.skuNumber;
        rowValue[3] = element.tierPrice1;
        rowValue[4] = element.tierPrice2 ? element.tierPrice2 : '---';
        rowValue[5] = element.tierPrice3 ? element.tierPrice3 : '---';
        rowValue[6] = element.tierQty1;
        rowValue[7] = element.tierQty2 ? element.tierQty2 : '---';
        rowValue[8] = element.tierQty3 ? element.tierQty3 : '---';
        rowValue[11] = element.tierQty2 ? '' : '---';
        rowValue[12] = element.tierQty2 ? '' : '---';
        rowValue[13] = element.destination;
        rowValue[14] = element.convertedStartDate;
        rowValue[15] = element.convertedEndDate;

        // Add new row
        worksheet.addRow(rowValue);

        // Set spesial row
        const row = worksheet.getRow(startRow);
        // Set diskon type
        row.getCell(10).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${tipeDiskon}"`]
        };

        const style = setStyle(startRow);

        setRowFill(worksheet, row, 1, rowValue.length + 1, style);
        startRow += 1;
    }
    // ----

    // Generate Border
    for (let i = 1; i <= templatePayload.length + 1; i++) {
        generateBorder(worksheet, i, 1, labelTemplate.length + 1);
    }

    // ------------------------------------------------------------------

    // Add worksheet 2
    const worksheet2 = workbook.addWorksheet('Daftar Alamat Pengirim');

    // Define label
    const labelOrigins = [
        labelNo,
        labelAlamatPengirim
    ];
    const originsLength = labelOrigins.length;

    // Set Column Size
    const colOriginsWidth = [0, 8, 40];
    for (let i = 1; i < colOriginsWidth.length; i++) {
        const el = colWidth[i];
        worksheet2.getColumn(i).width = el;
    }

    // Set label header
    // ----
    worksheet2.addRow(labelOrigins);
    const headerOrigins = worksheet2.getRow(1);
    setRowFill(worksheet2, headerOrigins, 1, originsLength + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7f7f7f' }
    });
    setCellFont(worksheet2, headerOrigins, 1, originsLength + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });
    // ----

    // Fill data into worksheet
    // ----
    let startOrigins = 2;
    const hub = _.get(shippingOrigins, 'shippingHubs', []);
    for (let index = 1; index <= hub.length; index++) {
        const ele = hub[index - 1];

        const rowValue = [];
        rowValue[0] = startOrigins - 1;
        rowValue[1] = `${ele.name}-HUB-${ele.hub}`;

        // Add new row
        worksheet2.addRow(rowValue);

        // Customize row
        const style = setStyle(startOrigins);
        const row = worksheet2.getRow(startOrigins);
        setRowFill(worksheet2, row, 1, rowValue.length + 1, style);

        startOrigins += 1;
    }

    const geo = _.get(shippingOrigins, 'shippingGeographs', []);
    for (let index = 1; index <= geo.length; index++) {
        const ele = geo[index - 1];

        const rowValue = [];
        rowValue[0] = startOrigins - 1;
        rowValue[1] = `${ele.name}-GEO-${ele.geograph}`;

        // Add new row
        worksheet2.addRow(rowValue);

        // Customize row
        const style = setStyle(startOrigins);
        const row = worksheet2.getRow(startOrigins);
        setRowFill(worksheet2, row, 1, rowValue.length + 1, style);

        startOrigins += 1;
    }
    // ---

    // Generate Border
    for (let i = 1; i <= startOrigins - 1; i++) {
        generateBorder(worksheet2, i, 1, labelOrigins.length + 1);
    }

    return workbook;
};

// Generate template
exports.generateProductTemplate = async function (payload) {
    const {
        templatePayload,
        shippingPaymentTypeId,
        shippingOrigins,
        tierType,
        isVendor,
        vendorId,
        customerId
    } = payload;

    const workbook = new Excel.Workbook();
    workbook.addWorksheet('Template Tambah Produk Masal');

    // let finalWorkbook;

    let finalWorkbook;

    if (shippingPaymentTypeId === 1) {
        if (tierType === 'CUSTOM') {
            finalWorkbook = templateFrancoCustom(workbook, templatePayload, shippingOrigins);
        }
        if (tierType === 'DEFAULT') {
            finalWorkbook = templateFrancoDefault(workbook, templatePayload, shippingOrigins);
        }
    } else {
        // Loco with custom tier
        if (tierType === 'CUSTOM') {
            finalWorkbook = templateLocoCustom(workbook, templatePayload);
        }

        // Loco with defaul tier
        if (tierType === 'DEFAULT') {
            finalWorkbook = templateLocoDefault(workbook, templatePayload);
        }
    }

    // Set file system informations
    const worksheetInfo = finalWorkbook.addWorksheet('File System Information');

    const labelTemplate = [
        'Shipping Type',
        'Tier Type',
        'Is Vendor',
        'Vendor Organization Id',
        'Customer Organization Id'
    ];

    // Set Column Size
    const colWidth = [0, 10, 10, 10];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheetInfo.getColumn(i).width = el;
    }
    // ----

    // Set label header
    // ----
    worksheetInfo.addRow(labelTemplate);
    // ----

    // Set value'
    // ----
    const labelValue = [
        shippingPaymentTypeId,
        tierType,
        isVendor,
        vendorId,
        customerId
    ];
    worksheetInfo.addRow(labelValue);
    // ----


    // Return workbook
    return {
        message: 'transformed',
        template: await finalWorkbook.xlsx.writeBuffer()
    };
};

module.exports = exports;
