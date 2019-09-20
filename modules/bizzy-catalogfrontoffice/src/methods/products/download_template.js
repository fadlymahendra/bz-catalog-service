'use strict';

// const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Authorization = require('../../utils/authorization');
const UomRepository = require('../../repositories/uom');
const StockUomRepository = require('../../repositories/stocking_uom');
const ProductVendorRepository = require('../../repositories/product_vendor');
const AttributeCodeRepository = require('../../repositories/attribute_code');
const AttributeValueRepository = require('../../repositories/attribute_value');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const S3Bucket = require('../../utils/s3_bucket');
// const fs = require('fs');
const Transformer = require('../../transformers/products/download_template');
const _ = require('lodash');
const Excel = require('exceljs');

// const getActiveSkuByVendorId = function (id, context) {
//     return BizzyService.callSync('bizzy-contract', 'getActiveQrSkuByVendorId', {
//         context,
//         data: {
//             vendor_id: id
//         }
//     });
// };

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

const getAttribute = function (res) {
    const attributeCode = [];
    const attributeValue = [];
    res.forEach((el) => {
        if (el.ProductVariant.variant_value !== 'NO_VARIANT') {
            const variant = JSON.parse(el.ProductVariant.variant_value);
            const keys = Object.keys(variant);
            keys.forEach((k) => {
                attributeCode.push(k);
                attributeValue.push(variant[k]);
            });
        }
    });

    return {
        code: _.uniq(attributeCode),
        value: _.uniq(attributeValue)
    };
};

// const base64Encode = async function (file) {
//     // read binary data
//     const bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return new Buffer(bitmap).toString('base64');
// });

const saveToFile = async function (workbook, fileName) {
    // await workbook.xlsx.writeFile(`./temp/${fileName}`);
    const stream = await workbook.xlsx.writeBuffer();

    const base64 = stream.toString('base64');
    // const base64 = await base64Encode(`./temp/${fileName}`);
    return base64;
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

const getDate = function () {
    const d = new Date();
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul',
        'Agu', 'Sep', 'Oct', 'Nov', 'Des'
    ];
    const date = `${d.getDate()}${months[d.getMonth()]}${d.getFullYear()}`;
    return date;
};

const rulesTableTemplate = [
    ['SKU ID Bizzy', 'Ya', 'SKU ID tidak dapat diubah', 'SKU213311'],
    ['Nama Produk', 'Ya', 'Masukkan nama produk yang ingin dijual', 'HP Pavilion x360 Convert 14-ba136TX'],
    ['Merek', 'Ya', 'Masukkan nama merek yang ingin dijual', 'BR-81 atau Apple'],
    ['SKU ID Vendor', 'Ya', 'Isi SKU ID vendor/pembuat', ''],
    ['Varian 1', 'Ya', 'Varian 1 tidak dapat diubah', 'Warna: Merah'],
    ['Varian 2', 'Ya', 'Varian 2 tidak dapat diubah', 'Kapasitas : 2GB'],
    ['Deskripsi', 'Ya', 'Masukkan deskripsi produk anda secara lengkap. minimal 30 karakter', 'HP'],
    ['Isi Dalam Kemasan', 'Ya', 'Masukkan isi dalam kemasan produk', 'HP001'],
    ['UNSPSC', 'Tidak', 'Masukkan kode UNSPSC produk anda (cek halaman Daftar Semua Merek & Kategori).', '43211503'],
    ['Nomor Manufaktur', 'Tidak', 'Masukkan nomor manufaktur produk anda', ''],
    ['Nomor Barcode', 'Tidak', 'Masukkan nomor barcode produk anda', ''],
    ['Unit of Measurement (UOM)', 'Ya', 'Masukkan UOM/satuan jual produk dengan pilihan yang tersedia. (Unit/Dozen/Pack/Box/Set). Contoh: Jual produk per Box. Contoh: Jual produk per Box', 'Unit'],
    ['Stock UOM', 'Ya', 'Masukkan jenis kemasan di dalam UOM/satuan jual produk dengan pilihan yang tersedia. (Box/Carton/Dozen(Lusin)Each(Buah)/Piece/Pack/Pack 100/Pair(Pasang)/Set/ Sheet(Lembar)/Tube. Contoh: Di dalam UOM per Box terdapat 10 Pair(pasang) sarung tangan, maka diisi dengan pair(pasang). Contoh: Di dalam UOM per Box terdapat 10 Pair(pasang) sarung tangan, maka diisi dengan pair(pasang)', 'Each'],
    ['Jumlah Per Stock UOM', 'Ya', 'Masukkan jumlah stok UOM produk di  dalam isi kemasan produk. Contoh: 10', '1'],
    ['Berat Kemasan (Gr)', 'Ya', 'Masukkan berat kemasan produk dalam gram', '1660'],
    ['Panjang Kemasan (Cm)', 'Ya', 'Masukkan panjang kemasan produk dalam cm', '1000'],
    ['Lebar Kemasan (Cm)', 'Ya', 'Masukkan lebar kemasan produk dalam cm', '500'],
    ['Tinggi Kemasan (Cm)', 'Ya', 'Masukkan tinggi kemasan produk dalam cm', '100'],
    ['Min. Quantity Jual Grosir 1', 'Ya', 'Masukkan Minimum quantity untuk harga jual grosir 1/ minimum pembelian', '1'],
    ['Min. Quantity Jual Grosir 2', 'Tidak', 'Masukkan Minimum quantity untuk harga jual grosir 2 (jika ada). ', '100'],
    ['Min. Quantity Jual Grosir 3', 'Tidak', 'Masukkan Minimum quantity untuk harga jual grosir 3(jika ada). ', '200'],
    ['Harga Jual Grosir 1 (Belum Termasuk PPN)', 'Ya', 'Harga jual grosir 1 (satuan)', '10.000.000'],
    ['Harga Jual Grosir 2 (Belum Termasuk PPN)', 'Tidak', 'Harga jual grosir 2 (satuan) tidak boleh lebih mahal dari harga jual grosir 1 (jika ada). Harga jual grosir 2 harus lebih murah dari harga jual grosir 1', '9.800.000'],
    ['Harga Jual Grosir 3 (Belum Termasuk PPN)', 'Tidak', 'Harga jual grosir 3 (satuan) tidak boleh lebih mahal dari harga jual grosir 2 (jika ada). Harga jual grosir 3 harus lebih murah dari harga jual grosir 2', '9.500.000'],
    // ['Min. Quantity Jual Kontrak', 'Ya', 'Minimum quantity khusus untuk Bizzy', '20'], (uncomment this line to enable contract)
    // ['Harga Jual Kontrak (Belum Termasuk PPN)', 'Ya', 'Harga khusus untuk Bizzy. Harga ini harus sama atau lebih murah dari harga jual grosir 1.', '9,400,000'], (uncomment this line to enable contract)
    ['Stok', 'Ya', 'Stok yang tersedia ', '30'],
    ['Jual Dalam Pecahan/Desimal?', 'Ya', 'Pilih Ya jika anda ingin menjual produk tersebut dalam jumlah pecahan desimal. Jika bukan produk inden silakan pilih Tidak', 'Ya'],
    ['Tipe Garansi', 'Ya', 'Pilihan tipe garansi (Tidak bergaransi/Resmi/Distributor/Toko/Internasional)', 'Distributor'],
    ['Periode Garansi', 'Ya', 'Pilihan periode garansi (Minggu/Bulan/Tahun/Selamanya). Abaikan jika memilih tipe garansi: tidak bergaransi', 'Bulan'],
    ['Lama Garansi', 'Ya', 'Lama garansi berdasarkan periode yang dipilih. Abaikan jika memilih tipe garansi "tidak bergaransi" atau memilih periode garansi "selamanya"', '2'],
    ['Cakupan Garansi', 'Ya', 'Garansi yang diberikan berlaku untuk keseluruhan produk atau hanya bagian tertentu. Abaikan jika memilih tipe garansi: tidak bergaransi', 'Kipas laptop'],
    // ['Produk Inden', 'Tidak', 'Pilihan (Ya/Tidak)', 'Ya'],
    ['Periode Inden', 'Ya', 'Pilihan periode garansi (Minggu/Bulan/Tahun). Abaikan jika produk inden "tidak" inden.', 'Bulan'],
    ['Waktu Proses Inden', 'Ya', 'Lama inden berdasarkan periode yang dipilih. Abaikan jika produk inden "tidak" inden.', '1'],
    ['Tipe Down Payment', 'Tidak', 'Pilihan tipe down payment untuk produk tersebut (Persen (%)/Nominal (Rp)). Kosongkan jika down payment tidak diperlukan', 'Persen(%)'],
    ['Jumlah DP', 'Tidak', 'Jumlah down payment untuk produk tersebut. Abaikan jika Tipe Down Payment kosong.', ' 30 (Jika persen), 3000000 (Jika nominal)'],
    ['Status', 'Ya', 'Pilihan status (Aktif/Tidak Aktif)', 'Aktif']
];

const labelTableTemplate = ['No.', 'SKU ID Bizzy', 'Nama Produk', 'Merek',
    'Varian 1', 'Varian 2', 'SKU ID Vendor', 'Deskripsi', 'Isi Dalam Kemasan', 'UNSPSC (Opsional)', 'Nomor Manufactur (Opsional)',
    'Nomor Barcode (Opsional)', 'Unit of Measure (UOM)', 'Stok UOM', 'Jumlah Stok per UOM', 'Berat Kemasan (Gr)',
    'Panjang Kemasan (Cm)', 'Lebar Kemasan (Cm)', 'Tinggi Kemasan (Cm)', 'Min. Quantity Jual Grosir 1',
    'Min. Quantity Jual Grosir 2 (Opsional)', 'Min. Quantity Jual Grosir 3 (Opsional)', 'Harga Jual Grosir 1 (Belum Termasuk PPN)',
    'Harga Jual Grosir 2 (Belum Termasuk PPN) (Opsional)', 'Harga Jual Grosir 3 (Belum Termasuk PPN) (Opsional)',
    // 'Min. Quantity Jual Kontrak', (uncomment this line to enable contract)
    // 'Harga Jual Kontrak (Belum Termasuk PPN)', (uncomment this line to enable contract)
    'Stok', 'Jual Dalam Pecahan/Desimal?', 'Tipe Garansi',
    'Periode Garansi', 'Lama Garansi', 'Cakupan Garansi (Opsional)',
    // 'Produk Inden (Opsional)',
    'Periode Inden',
    'Waktu Proses',
    'Tipe Down Payment (Opsional)',
    'Jumlah DP (Opsional)',
    'Status SKU'
];

exports.downloadTemplateUpload = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const {
        path: requestPath
    } = data;

    const schemaPath = Joi.object().keys({
        id: Joi.number().required()
    });

    try {
        await Joi.validate(requestPath, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const workbook = new Excel.Workbook();

    // let listBrand = await BrandRepository.findAll();
    // listBrand = Helper.parseDataObject(listBrand);

    // listBrand = listBrand.map((el) => { return el.name; });
    // listBrand = _.join(listBrand, ',');

    let listUom = await UomRepository.findAll();
    listUom = Helper.parseDataObject(listUom);
    listUom = listUom.filter(el => el.name !== '-').map(el => el.name);

    let listStockUom = await StockUomRepository.findAll();
    listStockUom = Helper.parseDataObject(listStockUom);
    listStockUom = listStockUom.filter(el => el.name !== '-').map(el => el.name);

    // let listCategory = await CategoryRepository.findAll({
    //     is_active: 1,
    //     is_deleted: 0
    // });
    // listCategory = Helper.parseDataObject(listCategory);

    let labelTable;

    // Sheet 1
    const worksheet = workbook.addWorksheet('Petunjuk Tambah Produk Masal');
    const head = worksheet.getRow(1);
    setRowFill(worksheet, head, 1, 5, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheet, head, 1, 5, {
        name: 'Arial Black',
        size: 20,
        color: { argb: 'FFFFFFFF' }
    });

    // Set Column
    worksheet.getColumn('A').width = 24;
    worksheet.getColumn('B').width = 19;
    worksheet.getColumn('C').width = 115;
    worksheet.getColumn('D').width = 32;

    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Petunjuk Tambah Produk Masal Bizzy.co.id';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('A3:D3');
    worksheet.getCell('A3').value = 'Isi kolom di dalam file excel harus sesuai dengan urutan dan kondisi berikut:';

    worksheet.mergeCells('A4:D4');
    worksheet.getCell('A4').value = '*Maksimum unggah sebanyak 5000 produk perfile ';

    worksheet.getCell('A5').value = '';

    worksheet.addRow(['Nama Kolom', 'Harus Diisi', 'Deskripsi', 'Contoh']);

    const headerSecond = worksheet.getRow(6);
    setRowFill(worksheet, headerSecond, 1, 5, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheet, headerSecond, 1, 5, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });

    let rulesTable = rulesTableTemplate.slice();

    // remove these rows
    rulesTable = rulesTable.filter(row =>
        row[0] !== 'SKU ID Bizzy' &&
        row[0] !== 'Varian 1' &&
        row[0] !== 'Varian 2' &&
        row[0] !== 'Status');

    // delete these rows if MP (uncomment this line to enable contract)
    // rulesTable = rulesTable.filter(row =>
    //     row[0] !== 'Min. Quantity Jual Kontrak' &&
    //     row[0] !== 'Harga Jual Kontrak (Belum Termasuk PPN)');

    const totalRow = rulesTable.length + 1;
    let startRowSecond = 7;

    for (let i = 0; i < rulesTable.length; i++) {
        const el = rulesTable[i];
        worksheet.addRow(el);
        const row = worksheet.getRow(startRowSecond);

        let styleRow = '';
        if (startRowSecond % 2 === 1) {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0EBF5' }
            };
        } else {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEFEFD' }
            };
        }

        setRowFill(worksheet, row, 1, 5, styleRow);
        startRowSecond += 1;
    }

    // Generate Border
    for (let i = 6; i < totalRow + 6; i++) {
        generateBorder(worksheet, i, 1, 5);
    }

    // Sheet 2
    const worksheetSecond = workbook.addWorksheet('Template Tambah Produk Masal');
    // Set Column Size
    const colWidth = [
        0, 8, 14, 30, 16,
        50, 25, 26, 30, 35,
        30, 20, 25, 25, 25,
        25, 25, 30, 30, 30,
        50, 50, 50, 10, 55,
        32, 15, 20, 30, 17,
        20, 30, 25
    ];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheetSecond.getColumn(i).width = el;
    }

    labelTable = labelTableTemplate.slice();

    // remove these rows
    labelTable = labelTable.filter(element =>
        element !== 'SKU ID Bizzy' &&
        element !== 'Varian 1' &&
        element !== 'Varian 2' &&
        element !== 'Status SKU');

    // Delete these columns if MP (uncomment this line to enable contract)
    // labelTable.splice(labelTable.indexOf('Min. Quantity Jual Kontrak'), 1);
    // labelTable.splice(labelTable.indexOf('Harga Jual Kontrak (Belum Termasuk PPN)'), 1);

    const colUOM = labelTable.indexOf('Unit of Measure (UOM)') + 1;
    const colStokUOM = labelTable.indexOf('Stok UOM') + 1;
    const colWarrantyType = labelTable.indexOf('Tipe Garansi') + 1;
    const colWarrantyPeriod = labelTable.indexOf('Periode Garansi') + 1;
    // const colIndentProduct = labelTable.indexOf('Produk Inden (Opsional)') + 1;
    const colIndentPeriod = labelTable.indexOf('Periode Inden') + 1;
    const colIsDecimal = labelTable.indexOf('Jual Dalam Pecahan/Desimal?') + 1;
    const colDPType = labelTable.indexOf('Tipe Down Payment (Opsional)') + 1;
    // const colDPValue = labelTable.indexOf('Jumlah DP (Opsional)') + 1;
    const totalCol = labelTable.length;

    worksheetSecond.mergeCells('A1:D1');
    worksheetSecond.getCell('A1').value = 'Bulk Upload Template';
    worksheetSecond.getCell('A1').font = {
        name: 'Arial Black',
        size: 16,
        color: { argb: 'FF000000' }
    };
    worksheetSecond.addRow(labelTable);
    const header = worksheetSecond.getRow(2);
    header.getCell('FF').value = 'Master UOM';
    header.getCell('FG').value = 'Master Stock UOM';
    setRowFill(worksheetSecond, header, 1, totalCol + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheetSecond, header, 1, totalCol + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });

    let startRow = 3;
    let y = 0;
    for (let i = 1; i <= 5000; i++) {
        worksheetSecond.addRow([i]);
        const row = worksheetSecond.getRow(startRow);
        row.getCell('FF').value = listUom[y] ? listUom[y] : '';
        row.getCell('FG').value = listStockUom[y] ? listStockUom[y] : '';

        // eslint-disable-next-line no-plusplus
        y++;

        let x = listUom.length + 2;
        const uomCell = `$FF$3:$FF${x}`;

        x = listStockUom.length + 2;
        const stockuomCell = `$FG$3:$FG${x}`;
        row.getCell(colUOM).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [uomCell]
        };

        row.getCell(colStokUOM).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [stockuomCell]
        };

        row.getCell(colIsDecimal).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"Ya, Tidak"']
        };

        row.getCell(colDPType).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"Persen(%), Nominal(Rp)"']
        };

        const warrantyType = 'Tidak bergaransi,Resmi,Distributor,International,Toko';
        row.getCell(colWarrantyType).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${warrantyType}"`]
        };

        const warrantyPeriod = 'Minggu,Bulan,Tahun,Selamanya';
        row.getCell(colWarrantyPeriod).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${warrantyPeriod}"`]
        };

        // const indentProduct = 'Ya,Tidak';
        // row.getCell(colIndentProduct).dataValidation = {
        //     type: 'list',
        //     allowBlank: false,
        //     formulae: [`"${indentProduct}"`]
        // };

        const indentPeriod = 'Minggu,Bulan,Tahun';
        row.getCell(colIndentPeriod).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${indentPeriod}"`]
        };

        let styleRow = '';
        if (startRow % 2 === 1) {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0EBF5' }
            };
        } else {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEFEFD' }
            };
        }

        setRowFill(worksheetSecond, row, 1, totalCol + 1, styleRow);
        startRow += 1;
    }

    worksheetSecond.getColumn('FF').hidden = true;
    worksheetSecond.getColumn('FG').hidden = true;

    // Generate Border
    for (let i = 2; i < 5000 + 3; i++) {
        generateBorder(worksheetSecond, i, 1, totalCol + 1);
    }
    // End of Sheet

    const prefix = getDate();
    const fileName = `Upload Produk ke Bizzy - ${prefix}.xlsx`;
    let base64data = '';

    base64data = await saveToFile(workbook, fileName);

    const upload = await S3Bucket.uploads3({
        fileName,
        base64data
    });

    return {
        data: upload.Location
    };
};

exports.downloadTemplateUpdate = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const {
        path: requestPath,
        query: requestQuery
    } = data;

    const schemaPath = Joi.object().keys({
        id: Joi.number().required()
    });

    const schemaQuery = Joi.object().keys({
        brand_id: Joi.number().positive().allow(''),
        c0: Joi.number().positive().allow(''),
        search: Joi.string().allow(''),
        is_active: Joi.number().valid(1, 0).allow(''),
        stock: Joi.number().valid(1, 0).allow('')
    });

    try {
        await Joi.validate(requestPath, schemaPath);
        await Joi.validate(requestQuery, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = [{
        name: 'vendor',
        value: requestPath.id
    }];

    if (requestQuery.brand_id) {
        const id = parseInt(requestQuery.brand_id);
        wheres.push({
            name: 'brand',
            value: id
        });
    }

    if (requestQuery.c0) {
        const id = parseInt(requestQuery.c0);
        wheres.push({
            name: 'category',
            value: id
        });
    }

    if (requestQuery.search) {
        wheres.push({
            name: 'search',
            value: requestQuery.search
        });
    }

    if (requestQuery.is_active === '1' || requestQuery.is_active === '0') {
        wheres.push({
            name: 'is_active',
            value: requestQuery.is_active
        });
    }

    if (requestQuery.stock === '0') {
        wheres.push({
            name: 'stock_nonavailable',
            value: parseInt(requestQuery.stock)
        });
    }

    const getTotal = await ProductVendorRepository.countProductVendorWithDetail(wheres);
    if (getTotal > 2000) {
        throw BizzyError.BadRequest(`Maaf, jumlah produk yang anda mencoba unduh (${getTotal} produk) ‌melebihi batas 2000 jumlah produk`);
    }

    const result = await ProductVendorRepository.findAllProductVendorWithDetail(wheres);
    const res = Helper.parseDataObject(result);

    const listAttribute = getAttribute(res);

    const Op = DBContext.ORMProvider.Op;

    let attributeCode = await AttributeCodeRepository.findAll({
        code: {
            [Op.in]: listAttribute.code
        }
    });

    let attributeValue = await AttributeValueRepository.findAll({
        id: {
            [Op.in]: listAttribute.value
        }
    });

    attributeValue = Transformer.parseAttributeValue(attributeValue);
    attributeCode = Transformer.parseAttributeCode(attributeCode);

    const attribute = {
        value: attributeValue,
        code: attributeCode
    };

    const reportData = Transformer.collection_report(res, attribute);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Product');

    // Set Column Size
    const colWidth = [0, 8, 14, 30, 13, 14, 14, 26, 27, 38, 38, 44, 55, 55, 8, 14, 16, 22, 24, 13, 14, 12];
    for (let i = 1; i < colWidth.length; i++) {
        const el = colWidth[i];
        worksheet.getColumn(i).width = el;
    }

    let labelTable = labelTableTemplate;

    // Remove these rows
    labelTable = labelTable.filter(element =>
        element !== 'Deskripsi' &&
        element !== 'Isi Dalam Kemasan' &&
        element !== 'UNSPSC (Opsional)' &&
        element !== 'Nomor Manufactur (Opsional)' &&
        element !== 'Nomor Barcode (Opsional)' &&
        element !== 'Unit of Measure (UOM)' &&
        element !== 'Stok UOM' &&
        element !== 'Jumlah Stok per UOM' &&
        element !== 'Berat Kemasan (Gr)' &&
        element !== 'Panjang Kemasan (Cm)' &&
        element !== 'Lebar Kemasan (Cm)' &&
        element !== 'Tinggi Kemasan (Cm)');

    // Delete these columns if MP (uncomment this line to enable contract)
    // if (context.user.customer.channel_type === 'MP') {
    //     labelTable.splice(labelTable.indexOf('Min. Quantity Jual Kontrak'), 1);
    //     labelTable.splice(labelTable.indexOf('Harga Jual Kontrak (Belum Termasuk PPN)'), 1);
    // }

    const colWarrantyType = labelTable.indexOf('Tipe Garansi') + 1;
    const colWarrantyPeriod = labelTable.indexOf('Periode Garansi') + 1;
    // const colIndentProduct = labelTable.indexOf('Produk Inden (Opsional)') + 1;
    const colIndentPeriod = labelTable.indexOf('Periode Inden') + 1;
    const colIsActive = labelTable.indexOf('Status SKU') + 1;

    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Daftar Produk Dijual';
    worksheet.getCell('A1').font = {
        name: 'Arial Black',
        size: 16,
        color: { argb: 'FF000000' }
    };
    worksheet.addRow(labelTable);
    const header = worksheet.getRow(2);

    setRowFill(worksheet, header, 1, 7, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00000000' }
    });

    setRowFill(worksheet, header, 7, labelTable.length + 1, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheet, header, 1, labelTable.length + 1, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });

    let startRow = 3;
    // let listSkuVendor = null;
    // const vendorId = requestPath.id;
    // const channel = context.user.customer.channel_type;

    // if (channel !== 'MP') {
    //     try {
    //         const ctx = { user: { scope: 'employee' } };
    //         listSkuVendor = await getActiveSkuByVendorId(vendorId, ctx);
    //         listSkuVendor = listSkuVendor.data;
    //     } catch (err) {
    //         throw BizzyError.BadRequest(`Gagal Mengambil Sku Vendor, ${err}`);
    //     }
    // }

    reportData.forEach((element) => {
        const rowArray = [];
        // if (channel !== 'MP') {
        //     const found = listSkuVendor.find(sku => sku.sku === element.sku_bizzy);
        //     if (found) {
        //         element.tier_min_qty_for_bizzy = found.min_qty;
        //         element.min_price_for_bizzy = found.cogs;
        //     }
        // }
        const props = Object.keys(element);
        props.forEach((el) => {
            // if (channel === 'QR' || channel === 'MIX' || (el !== 'tier_min_qty_for_bizzy' && el !== 'min_price_for_bizzy')) {
            rowArray.push(element[el]);
            // }
        });

        worksheet.addRow(rowArray);
        const row = worksheet.getRow(startRow);

        const warrantyType = 'Tidak bergaransi,Resmi,Distributor,International,Toko';
        row.getCell(colWarrantyType).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${warrantyType}"`]
        };

        const warrantyPeriod = 'Minggu,Bulan,Tahun,Selamanya';
        row.getCell(colWarrantyPeriod).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${warrantyPeriod}"`]
        };

        const indentProduct = 'Ya,Tidak';
        // row.getCell(colIndentProduct).dataValidation = {
        //     type: 'list',
        //     allowBlank: false,
        //     formulae: [`"${indentProduct}"`]
        // };

        const indentPeriod = 'Minggu,Bulan,Tahun';
        row.getCell(colIndentPeriod).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${indentPeriod}"`]
        };

        row.getCell(colIsActive).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${indentProduct}"`]
        };

        let styleRow = '';
        if (startRow % 2 === 1) {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0EBF5' }
            };
        } else {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEFEFD' }
            };
        }

        setRowFill(worksheet, row, 1, rowArray.length + 1, styleRow);
        startRow += 1;
    });

    // Generate Border
    for (let i = 2; i < reportData.length + 3; i++) {
        generateBorder(worksheet, i, 1, labelTable.length + 1);
    }

    // Sheet 2
    const worksheetSecond = workbook.addWorksheet('Petunjuk Produk Sekaligus');
    const head = worksheetSecond.getRow(1);
    setRowFill(worksheetSecond, head, 1, 5, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheetSecond, head, 1, 5, {
        name: 'Arial Black',
        size: 20,
        color: { argb: 'FFFFFFFF' }
    });

    // Set Column
    worksheetSecond.getColumn('A').width = 24;
    worksheetSecond.getColumn('B').width = 19;
    worksheetSecond.getColumn('C').width = 115;
    worksheetSecond.getColumn('D').width = 32;

    worksheetSecond.mergeCells('A1:D1');
    worksheetSecond.getCell('A1').value = 'Petunjuk Edit  Produk Sekaligus Bizzy.co.id';
    worksheetSecond.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheetSecond.mergeCells('A3:D3');
    worksheetSecond.getCell('A3').value = 'File ini dapat digunakan sebagai template untuk mengedit produk dalam jumlah banyak. Data yang dapat diubah adalah Min. Quantity Jual Grosir, Harga Jual Grosir, Stok, Status, Grup Garansi, Grup Inden, dan Status.';

    worksheetSecond.mergeCells('A4:D4');
    worksheetSecond.getCell('A4').value = 'Untuk keterangan lebih lanjut mohon untuk memperhatikan tabel dibawah ini: ';

    worksheetSecond.getCell('A5').value = '';

    worksheetSecond.addRow(['Nama Kolom', 'Harus Diisi', 'Deskripsi', 'Contoh']);

    const headerSecond = worksheetSecond.getRow(6);
    setRowFill(worksheetSecond, headerSecond, 1, 5, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4D73BE' }
    });

    setCellFont(worksheetSecond, headerSecond, 1, 5, {
        name: 'Arial Black',
        size: 11,
        color: { argb: 'FFFFFFFF' }
    });

    let rulesTable = rulesTableTemplate.slice();

    // Remove these rows
    rulesTable = rulesTable.filter(row =>
        row[0] !== 'Deskripsi' &&
        row[0] !== 'Isi Dalam Kemasan' &&
        row[0] !== 'UNSPSC' &&
        row[0] !== 'Nomor Manufaktur' &&
        row[0] !== 'Nomor Barcode' &&
        row[0] !== 'Unit of Measurement (UOM)' &&
        row[0] !== 'Stock UOM' &&
        row[0] !== 'Jumlah Per Stock UOM' &&
        row[0] !== 'Berat Kemasan (Gr)' &&
        row[0] !== 'Panjang Kemasan (Cm)' &&
        row[0] !== 'Lebar Kemasan (Cm)' &&
        row[0] !== 'Tinggi Kemasan (Cm)');

    // delete these rows if MP (uncomment this line to enable contract)
    // if (context.user.customer.channel_type === 'MP') {
    //     rulesTable = rulesTable.filter(row =>
    //         row[0] !== 'Min. Quantity Jual Kontrak' &&
    //         row[0] !== 'Harga Jual Kontrak (Belum Termasuk PPN)');
    // }

    rulesTable = rulesTable.map((row) => {
        if (row[0] === 'SKU ID Bizzy' ||
            row[0] === 'Nama Produk' ||
            row[0] === 'ID Merek' ||
            row[0] === 'Varian 1' ||
            row[0] === 'Varian 2') {
            row[2] = `${row[0]} tidak dapat diubah`;
        }
        if (row[1] === 'Tidak') {
            row[1] = 'Opsional';
        }
        return row;
    });

    let startRowSecond = 7;

    for (let i = 0; i < rulesTable.length; i++) {
        const el = rulesTable[i];
        worksheetSecond.addRow(el);
        const row = worksheetSecond.getRow(startRowSecond);

        let styleRow = '';
        if (startRowSecond % 2 === 1) {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0EBF5' }
            };
        } else {
            styleRow = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEFEFD' }
            };
        }

        setRowFill(worksheetSecond, row, 1, 5, styleRow);
        startRowSecond += 1;
    }

    // Generate Border
    for (let i = 6; i < rulesTable.length + 7; i++) {
        generateBorder(worksheetSecond, i, 1, 5);
    }

    let base64data = '';

    const prefix = getDate();
    const fileName = `Daftar Produk ke Bizzy - ${prefix}.xlsx`;
    base64data = await saveToFile(workbook, fileName);

    const upload = await S3Bucket.uploads3({
        fileName,
        base64data
    });

    return {
        data: upload.Location
    };
};

module.exports = exports;
