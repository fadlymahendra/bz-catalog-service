'use strict';

const Promise = require('bluebird');
const { BizzyService, BizzyError, DBContext } = require('bizzy-common');
const Joi = require('joi');
const _ = require('lodash');
const Helper = require('../../utils/helper');
const S3Bucket = require('../../utils/s3_bucket');
const Authorization = require('../../utils/authorization');

const CategoryRepository = require('../../repositories/category');
const BrandRepository = require('../../repositories/brand');
const UomRepository = require('../../repositories/uom');
const StockingUomRepository = require('../../repositories/stocking_uom');
const SyncRepository = require('../../repositories/sync_service');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductSkuRepository = require('../../repositories/product_sku');
const PremoderationRepository = require('../../repositories/premoderation');
const ProductUploadRepository = require('../../repositories/product_upload');
const Transformer = require('../../transformers/products/bulk_upload');
const ExcelAdapter = require('../../adapter/bulk_upload');

const NO_WARRANTY = 'no_warranty';
const OFFICIAL_WARRANTY = 'official_warranty';
const INTERNATIONAL = 'international';
const DISTRIBUTOR = 'distributor';

const WEEK = 'week';
const MONTH = 'month';
const YEAR = 'year';
const FOREVER = 'forever';

const ERR_TIER_COGS_1_EMPTY = 'Harga Tier 1 kosong';
const ERR_PRODUCT_NAME_EMPTY = 'Nama produk kosong';
const ERR_VENDOR_EMPTY = 'Vendor kosong';
const ERR_VENDOR_WAREHOUSE_NOT_FOUND = 'Warehouse Vendor tidak ditemukan';
const ERR_VENDOR_NOT_FOUND = 'Vendor tidak ditemukan';
const ERR_DUPLICATE_PRODUCT = 'Duplikasi Produk';
const ERR_TIER_COGS_1_MUST_INTEGER = 'Harga Tier 1 harus berupa angka dan lebih dari 0';

const searchKey = function (array, key) {
    return array.includes(key);
};

const findValue = function (list, name) {
    return list.find(el => String(el.name).toLowerCase() === String(name).toLowerCase()) || null;
};

const findValueById = function (list, id) {
    return list.find(el => Number(el.id) === Number(id)) || null;
};

const getWarrantyOption = function (value) {
    const warrantyOption = {
        'Tidak bergaransi': NO_WARRANTY,
        Resmi: OFFICIAL_WARRANTY,
        Distributor: DISTRIBUTOR,
        International: INTERNATIONAL
    };

    return warrantyOption[value] || null;
};

const getPeriod = function (value) {
    const period = {
        Minggu: WEEK,
        Bulan: MONTH,
        Tahun: YEAR,
        Selamanya: FOREVER
    };

    return period[value] || null;
};

const isSKUExists = async function (sku) {
    const result = await ProductSkuRepository.findOne(sku);
    if (!result) {
        return false;
    }
    // cannot create scenario on the unit-test for this code;
    return true;
};

const check = function (row, error, condition, key, message) {
    if (condition && !_.has(row[key], 'msg') && key) {
        row[key] = { val: row[key], msg: message };
        error.push(message);
    }
};

const productValidation = async function (row, keys) {
    const error = [];
    // Required field
    check(row, error, !row.product_name, 'product_name', ERR_PRODUCT_NAME_EMPTY);
    check(row, error, !row.tier_cogs_price_1, 'tier_cogs_price_1', ERR_TIER_COGS_1_EMPTY);
    check(row, error, row.tier_cogs_price_1 !== null && (typeof row.tier_cogs_price_1 === 'string' || row.tier_cogs_price_1 <= 0 || !Number.isInteger(row.tier_cogs_price_1)), 'tier_cogs_price_1', ERR_TIER_COGS_1_MUST_INTEGER);
    check(row, error, !row.vendor_id, 'vendor_id', ERR_VENDOR_EMPTY);
    check(row, error, !searchKey(keys.vendor, Number(row.vendor_id)), 'vendor', ERR_VENDOR_NOT_FOUND);

    const vendorData = keys.vendor_name.find(el => Number(el.id) === Number(row.vendor_id));
    if (vendorData.primary_warehouse === null) {
        error.push(ERR_VENDOR_WAREHOUSE_NOT_FOUND);
    }

    return {
        error,
        status: error.length === 0,
        row
    };
};

const uploadDocument = async function (base64data, fileName) {
    const uploadedFile = await S3Bucket.uploads3({
        fileName,
        base64data
    });

    return uploadedFile;
};


const generateProductPayload = function (data, validationKey, defaultValue) {
    const dateNow = defaultValue.process_time;
    const brandProduct = findValue(validationKey.brand, data.brand);
    const uomProduct = findValue(validationKey.uom, data.uom);
    const stockUomProduct = findValue(validationKey.stocking_uom, data.stocking_uom);
    const vendorProduct = findValueById(validationKey.vendor_name, data.vendor_id);

    const productGroup = {
        is_bulk: 1,
        name: data.product_name,
        category_id: defaultValue.category,
        brand_id: brandProduct ? brandProduct.id : defaultValue.brand,
        uom_id: uomProduct ? uomProduct.id : defaultValue.uom,
        stocking_uom_id: stockUomProduct ? stockUomProduct.id : defaultValue.stock_uom,
        quantity_stocking_uom: parseInt(data.quantity_stocking_uom) || 1,
        package_weight: data.package_weight || 0,
        package_width: data.package_width || 0,
        package_length: data.package_length || 0,
        package_height: data.package_height || 0,
        package_content: data.package_content || `1 ${data.product_name}`,
        description: data.description || data.product_name,
        status: 1,
        visibility: 1,
        variant_count: 0,
        variant_matrix: '[]',
        created_at: dateNow,
        created_by: data.admin_id
    };

    const productVariant = {
        long_name: data.product_name,
        variant_value: 'NO_VARIANT',
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
        additional_image: '[]',
        created_at: dateNow,
        created_by: data.admin_id
    };

    let warrantyOption = getWarrantyOption(data.warranty_option);
    let warrantyPeriod = getPeriod(data.warranty_period);
    let warrantyLimit = parseInt(data.warranty_limit) || null;

    // validate warranty
    if (warrantyOption !== NO_WARRANTY && (warrantyPeriod === null || warrantyLimit === null)) {
        warrantyOption = NO_WARRANTY;
        warrantyPeriod = null;
        warrantyLimit = null;
    }

    const productVendor = {
        vendor_id: data.vendor_id,
        warehouse_id: vendorProduct.primary_warehouse.id,
        location_label: vendorProduct.primary_warehouse.name,
        stock_available: 1000,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: parseInt(data.tier_min_qty_1) || 1,
        tier_cogs_price_1: data.tier_cogs_price_1,
        warranty_option: warrantyOption,
        warranty_period: warrantyOption === NO_WARRANTY ? null : warrantyPeriod,
        warranty_limit: warrantyOption === NO_WARRANTY ? null : warrantyLimit,
        is_indent: 0,
        is_active: 1,
        created_by: data.admin_id,
        customer_id: data.customer_id,
        created_at: dateNow
    };

    return {
        product_group: productGroup,
        product_variant: productVariant,
        product_vendor: productVendor,
        key: {
            brand: brandProduct,
            uom: uomProduct,
            stock_uom: stockUomProduct,
            vendor: vendorProduct
        }
    };
};

const insertProduct = async function (payload) {
    await DBContext.startTransaction();

    let skuProduct = null;
    let productGroupId;
    let productVariantId;
    try {
        // insert into product group
        const productGroup = await ProductGroupRepository.createOne(payload.product_group);
        productGroupId = productGroup.dataValues.id;

        // insert into product variant
        do {
            skuProduct = Helper.generateSKUD(10);
        } while (await isSKUExists(skuProduct)); // eslint-disable-line

        const productVariant = await ProductVariantRepository.createOne({
            ...payload.product_variant,
            sku: skuProduct,
            product_group_id: productGroupId
        });
        productVariantId = productVariant.dataValues.id;

        // insert into product vendor
        await ProductVendorRepository.createOne({
            ...payload.product_vendor,
            sku_vendor: skuProduct,
            is_decimal: 1,
            down_payment_type: 0,
            down_payment_value: 0,
            product_variant_id: productVariantId
        });
    } catch (err) { // eslint-disable-line
        await DBContext.rollback();
        return false;
    }
    await DBContext.commit();
    return {
        sku: skuProduct,
        product_variant_id: productVariantId,
        product_group_id: productGroupId
    };
};

exports.uploadSkuByBizzy = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const schema = Joi.object().keys({
        data: Joi.string().required(),
        customer_id: Joi.number().positive().required()
    });

    const { body: input } = data;

    try {
        await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const base64data = input.data;
    const d = new Date();
    const prefix = d.getTime();
    const adminId = context.user.employee.id;
    const customerId = input.customer_id;
    const fileName = `BULKUPLOADBYBIZZY_${customerId}_${prefix}.xlsx`;

    let documentStream = {};
    let s3File = {};
    let listBrand;
    let listUom;
    let listStockingUom;

    let defaultCategory;

    [listBrand, listUom, listStockingUom, documentStream, s3File, defaultCategory] =
        await Promise.join(
            BrandRepository.findAll(),
            UomRepository.findAll(),
            StockingUomRepository.findAll(),
            ExcelAdapter.generateStream(base64data),
            uploadDocument(base64data, fileName),
            CategoryRepository.findOne({
                name: 'Tidak Terkategori',
                level: 'C3'
            })
        );
    listBrand = Helper.parseDataObject(listBrand);
    listUom = Helper.parseDataObject(listUom);
    listStockingUom = Helper.parseDataObject(listStockingUom);

    s3File.file_name = fileName;
    const defaultBrand = listBrand.find(el => el.name === 'NO BRAND');
    const defaultUom = listUom.find(el => el.name === 'Each');
    const defaultStockUom = listStockingUom.find(el => el.name.replace(new RegExp(String.fromCharCode(160), 'g'), ' ') === 'Each / Buah');

    const listUomName = listUom.map(el => el.name);
    const listStockingUomName = listStockingUom.map(el => el.name);

    const listVendor = await SyncRepository.getListVendor(context);
    const listVendorId = listVendor.data.map(el => Number(el.id));

    const validationKey = {
        vendor: listVendorId,
        vendor_name: listVendor.data,
        brand: listBrand,
        uom: listUom,
        uom_name: listUomName,
        stocking_uom: listStockingUom,
        stocking_uom_name: listStockingUomName,
        record_key: []
    };

    const acceptedRecord = [];
    const rejectedRecord = [];
    let records = [];

    try {
        records = await ExcelAdapter.readDocumentForBulkUpload(documentStream);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    await Promise.each(records, async (val) => {
        const recordKey = `${val.vendor_id}-${val.product_name}-${val.tier_min_qty_1}`;
        const isVendorExist = searchKey(validationKey.vendor, Number(val.vendor_id));
        const isRecordExist = searchKey(validationKey.record_key, recordKey);

        // check if vendor exist && check duplicate record
        if (!isVendorExist || isRecordExist) {
            val.error = !isVendorExist ? [ERR_VENDOR_NOT_FOUND] : [ERR_DUPLICATE_PRODUCT];
            rejectedRecord.push(val);
        } else {
            validationKey.record_key.push(recordKey);
            // check if brand exist
            if (findValue(validationKey.brand, val.brand) === null && val.brand !== null) {
                // create new one and insert to list
                const newBrand = await BrandRepository.createOne({ name: val.brand, is_bulked: 1 });
                validationKey.brand.push(newBrand);
            }

            const analyze = await productValidation(val, validationKey);
            val.error = analyze.error;
            if (!analyze.status) { rejectedRecord.push(val); } else { acceptedRecord.push(val); }
        }
    }, { concurrency: 1 });

    const tableHeaders = Helper.getHeadersBulkUpload();
    const processTime = new Date();

    if (!defaultCategory || !defaultBrand || !defaultUom || !defaultStockUom) {
        throw BizzyError.BadRequest('Template Data tidak lengkap');
    }

    defaultCategory = Helper.parseDataObject(defaultCategory);

    const defaultValue = {
        uom: defaultUom.id,
        stock_uom: defaultStockUom.id,
        category: defaultCategory.id,
        brand: defaultBrand.id,
        warranty_option: NO_WARRANTY,
        process_time: processTime,
        customer_id: customerId,
        s3_file: s3File,
        context
    };

    const logs = [];
    const premoderation = [];
    const insertedVariant = [];
    const skuNS = [];
    try {
        await Promise.map(acceptedRecord, async (item) => {
            const product = generateProductPayload({
                ...item,
                admin_id: adminId,
                customer_id: customerId
            }, validationKey, defaultValue);
            const inserted = await insertProduct(product);
            if (inserted) {
                product.product_vendor.sku_vendor = inserted;
                skuNS.push({
                    sku: inserted.sku
                });
                premoderation.push(Transformer.transformProductPremoderation({
                    ...item,
                    product
                }, defaultValue));
                logs.push(Transformer.collection(item, defaultValue, true));

                insertedVariant.push({
                    id: inserted.product_variant_id,
                    sku: inserted.sku,
                    product_group_id: inserted.product_group_id
                });
            }
        }, { concurrency: 1 });
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    // reindex
    await Promise.map(insertedVariant, async (item) => {
        BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_group',
                    id: item.product_group_id,
                    data: Object.assign({}, {
                        inserted_variants: {
                            id: item.product_variant_id,
                            sku: item.sku
                        },
                        updated_variants: []
                    })
                }
            }
        });
    });

    if (skuNS.length > 0) {
        await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
            context: {},
            data: {
                variants: skuNS,
                mode: 'create'
            }
        });
    }

    const responseMessage = `${premoderation.length} Sku berhasil ditambahkan`;
    const response = {
        headers: tableHeaders,
        total_process: premoderation.length,
        total_unprocess: rejectedRecord.length,
        message: responseMessage
    };
    if (rejectedRecord.length > 0) {
        rejectedRecord.forEach((el) => {
            logs.push(Transformer.collection(el, defaultValue, false));
        });
        response.message = responseMessage.concat(`, ${rejectedRecord.length} Sku gagal`);
        Object.assign(response, { rejected_records: rejectedRecord });
    }

    if (logs.length > 0) await ProductUploadRepository.insertMany(logs);
    if (premoderation.length > 0) await PremoderationRepository.insertMany(premoderation);

    return response;
};

module.exports = exports;
