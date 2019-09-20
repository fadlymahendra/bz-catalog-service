'use strict';

/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const RepoPG = require('../../repositories/product_group');
const RepoPVA = require('../../repositories/product_variant');
const RepoPVE = require('../../repositories/product_vendor');
const RepoUOM = require('../../repositories/uom');
const RepoCategory = require('../../repositories/category');
const RepoBrand = require('../../repositories/brand');
const RepoStockingUOM = require('../../repositories/stocking_uom');
const SyncRepository = require('../../repositories/sync_service');

exports.postSkuFromPunchout = async function (data, context) {
    const input = data;
    try {
        const schema = Joi.object().keys({
            vendor_id: Joi.number().required(),
            items: Joi.array().items({
                sku_name: Joi.string().required(),
                product_desc: Joi.string().required(),
                qty: Joi.number().required(),
                unit_price: Joi.number().required(),
                uom: Joi.string().required()
            })
        });
        await Joi.validate(data, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const vendorId = input.vendor_id;
    const items = input.items;

    const Op = DBContext.ORMProvider.Op;
    const [
        dataFindUom,
        dataFindStockingUom,
        dataFindCategory,
        dataFindBrand
    ] = await Promise.all([
        RepoUOM.findOne({
            name: {
                [Op.like]: 'unit%'
            }
        }),
        RepoStockingUOM.findOne({
            name: {
                [Op.like]: '%each / buah%'
            }
        }),
        RepoCategory.findOne({
            [Op.and]: [{
                name: {
                    [Op.like]: '%tidak terkategori%'
                },
                level: {
                    [Op.like]: '%c3%'
                }
            }]
        }),
        RepoBrand.findOne({
            [Op.and]: [{
                name: {
                    [Op.like]: '%NO BRAND%'
                }
            }]
        })
    ]);

    if (!dataFindUom) {
        throw BizzyError.NotFound('Get uom by name unit not found');
    }
    if (!dataFindStockingUom) {
        throw BizzyError.NotFound('Get stocking uom by name each / buah not found');
    }
    if (!dataFindCategory) {
        throw BizzyError.NotFound('Get no category not found');
    }
    if (!dataFindBrand) {
        throw BizzyError.NotFound('Get no brand not found');
    }

    const response = {
        vendor_id: vendorId,
        items: []
    };
    const result = {
        data: {
            product_group: [],
            product_variant: [],
            product_vendor: []
        }
    };
    const dataForNS = [];
    try {
        await DBContext.startTransaction();
        for (let i = 0; i < items.length; i++) {
            const skuName = items[i].sku_name;
            const qty = items[i].qty;
            const productDesc = items[i].product_desc;
            const createdBy = 0; // because no context
            const stockingUomId = dataFindStockingUom.id;
            const uom = items[i].uom;
            const unitPrice = items[i].unit_price;

            // GET UOM ID
            let uomId = 0;
            let findUOM = await RepoUOM.findByName(uom);
            if (!findUOM) {
                uomId = dataFindUom.id;
            } else {
                findUOM = findUOM.getValues();
                uomId = findUOM.id;
            }
            // END

            // CREATE PG
            const dataForPG = {
                name: skuName,
                category_id: dataFindCategory.id,
                brand_id: dataFindBrand.id,
                uom_id: uomId,
                stocking_uom_id: stockingUomId,
                quantity_stocking_uom: qty,
                package_weight: 0,
                package_length: 0.00,
                package_width: 0.00,
                package_height: 0.00,
                package_content: '',
                description: productDesc,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                variant_count: 0,
                variant_matrix: '[]',
                is_bulk: 0,
                status: 1,
                visibility: 1,
                created_by: createdBy
            };
            let newPG = await RepoPG.createOne(dataForPG);
            if (!newPG) {
                throw BizzyError.BadRequest('Failed create new product group');
            }
            newPG = newPG.getValues();
            result.data.product_group.push(newPG);
            // END

            // CREATE PVA
            let sku;
            let next = true;
            do {
                sku = Helper.generateSKUDByPrefix('FRE', 7);
                const newSKU = await RepoPVA.findOne({ sku });
                if (!newSKU) {
                    next = false;
                }
            } while (next);
            dataForNS.push({
                sku
            });
            const dataForPVA = {
                product_group_id: newPG.id,
                sku,
                long_name: skuName,
                variant_value: 'NO_VARIANT',
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                is_primary: 1,
                is_active: 1,
                is_free: 1,
                created_by: createdBy
            };
            let newPVA = await RepoPVA.createOne(dataForPVA);
            if (!newPVA) {
                throw BizzyError.BadRequest('Failed create new product variant');
            }
            newPVA = newPVA.getValues();
            result.data.product_variant.push(newPVA);
            // END

            // CREATE PVE
            const getWarehouse = await SyncRepository.getVendorWarehousePrimary({ user: { username: '', customer: { organization_id: vendorId } } });
            const warehouseId = getWarehouse.data.warehouse_address.id;
            const locationLabel = getWarehouse.data.warehouse_address.geograph.province;
        
            const dataForPVE = {
                product_variant_id: newPVA.id,
                vendor_id: vendorId,
                warehouse_id: warehouseId,
                location_label: locationLabel,
                long_name: skuName,
                stock_available: qty,
                stock_used: 0.00,
                stock_reserved: 0.00,
                currency: 'IDR',
                tier_min_qty_1: 1,
                tier_cogs_price_1: unitPrice,
                sku_vendor: sku,
                is_indent: 0,
                is_active: 1,
                created_by: createdBy
            };
            let newPVE = await RepoPVE.createOne(dataForPVE);
            if (!newPVE) {
                throw BizzyError.BadRequest('Failed create new product vendor');
            }
            newPVE = newPVE.getValues();
            result.data.product_vendor.push(newPVE);
            // END

            const tempResponse = items[i];
            tempResponse.sku = sku;
            response.items.push(tempResponse);
        }

        // REINDEX
        // eslint-disable-next-line no-loop-func
        try {
            result.data.product_variant.forEach(async (item) => {
                BizzyService.callAsync('bizzy-searchengine', 'reindex', {
                    data: {
                        body: {
                            type: 'product_group',
                            id: item.product_group_id,
                            data: Object.assign({}, {
                                inserted_variants: {
                                    id: item.id,
                                    sku: item.sku
                                },
                                updated_variants: []
                            })
                        }
                    }
                });
            });
        } catch (err) {
            throw BizzyError.BadRequest(`reindex error: ${err}`);
        }

        try {
            if (dataForNS.length > 0) {
                await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
                    context: {},
                    data: {
                        variants: dataForNS,
                        mode: 'create'
                    }
                });
            }
        } catch (err) {
            throw BizzyError.BadRequest(`to ns error: ${err}`);
        }

        await DBContext.commit();

        return response;
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err);
    }
};

module.exports = exports;
