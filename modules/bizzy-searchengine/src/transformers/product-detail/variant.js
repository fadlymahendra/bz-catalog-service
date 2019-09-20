'use strict';

const Helper = require('../../utils/helper');
const uuid = require('uuid');

const CHANNEL_TYPE = {
    QUASIRETAIL: 'QR',
    MARKETPLACE: 'MP'
};


const getVendorInformation = function (data) {
    const result = {};
    const delimeter = ' ';
    data.forEach((row, key) => {
        const nameVendor = [];
        nameVendor.push(row.vendor.prefix.trim());
        nameVendor.push(row.vendor.name.trim());
        nameVendor.push(row.vendor.suffix.trim());

        result[row.vendor.id] = {
            name: (nameVendor.length === 0) ? '' : Helper.implode(nameVendor, delimeter),
            created_at: row.vendor.created_at ? row.vendor.created_at : '',
            logo: row.vendor.logo ? row.vendor.logo : '',
            trademark: row.vendor.trademark ? row.vendor.trademark : '',
            status_pkp: row.vendor.status_pkp ? row.vendor.status_pkp : 0,
            warehouse_hub_shipper: row.warehouse_hub_shipper ? row.warehouse_hub_shipper : []
        };
    });
    return result;
};

const getWarehouseInformation = function (data) {
    const result = {};
    data.forEach((row, key) => {
        result[row.id] = {
            name: `${row.warehouse_address.name}`,
            hub_id: row.warehouse_hub_id,
            warehouse_hub: row.warehouse_hub ? row.warehouse_hub : []
        };
    });
    return result;
};

const getPriceItems = function (data) {
    const result = {};
    const priceData = data;
    priceData.forEach((row, key) => {
        priceData[key].tier_min_qty_1 = row.tier_data.tier_min_qty_1;
        priceData[key].tier_cogs_price_1 = row.tier_data.tier_price_1;

        if (row.tier_data.tier_min_qty_2 && row.tier_data.tier_price_2) {
            priceData[key].tier_min_qty_2 = row.tier_data.tier_min_qty_2;
            priceData[key].tier_cogs_price_2 = row.tier_data.tier_price_2;
        }

        if (row.tier_data.tier_min_qty_3 && row.tier_data.tier_price_3) {
            priceData[key].tier_min_qty_3 = row.tier_data.tier_min_qty_3;
            priceData[key].tier_cogs_price_3 = row.tier_data.tier_price_3;
        }

        result[row.vendor_id] = {
            tier_min_qty_1: row.tier_min_qty_1,
            tier_cogs_price_1: row.tier_cogs_price_1,
            tier_min_qty_2: row.tier_min_qty_2,
            tier_cogs_price_2: row.tier_cogs_price_2,
            tier_min_qty_3: row.tier_min_qty_3,
            tier_cogs_price_3: row.tier_cogs_price_3,
            is_contract: row.type,
            is_contract_price: row.is_contract_price,
            top_days: row.top_days,
            channel_type: row.channel_type,
            cid: row.cid,
            is_franco: row.is_franco,
            shipping: row.shipping,
            is_qvl: row.is_qvl
        };
    });
    return result;
};

const getWarehouseGeograph = function (data) {
    const result = {};
    data.forEach((row, key) => {
        result[row.id] = row.warehouse_address.geograph;
    });
    return result;
};

const getWarehouseData = function (data) {
    if (data === '' || data === undefined) {
        return {
            id: '',
            province: '',
            city: '',
            district: '',
            village: '',
            zipcode: '',
            geotag: '',
            jnecitycode: ''
        };
    }
    return data;
};

const getProcessTimeByOrganizationUuid = function (data) {
    if (data === null || data.ratings === undefined || data.ratings.PO_PROCESS_TIME === undefined) {
        return null;
    }

    return data.ratings.PO_PROCESS_TIME;
};

const customVendor = function (data, vendorInformation, channelType, priceEngine) {
    const dataVendor = [];
    const vendorName = getVendorInformation(vendorInformation.data);
    const warehouseName = getWarehouseInformation(vendorInformation.data);
    const warehouseGeograph = getWarehouseGeograph(vendorInformation.data);
    const priceItems = getPriceItems(priceEngine);

    data.forEach((row, key) => {
        let vendorShowName = vendorName[(row.vendor_id).toString().trim()].name;
        let vendorShowLogo = vendorName[(row.vendor_id).toString().trim()].logo;
        let vendorShowWarehouse = warehouseName[(row.warehouse_id).toString().trim()].name;
        let vendorShowTrademark = vendorName[(row.vendor_id).toString().trim()].trademark;
        let vendorCreatedAt = vendorName[(row.vendor_id)].created_at;

        const warehouseData = getWarehouseData(warehouseGeograph[(row.warehouse_id)]);
        const warehouseHub = warehouseName[(row.warehouse_id)].warehouse_hub;

        const skuChannelType = priceItems[(row.vendor_id)].channel_type;

        if (skuChannelType === CHANNEL_TYPE.QUASIRETAIL) {
            vendorShowName = 'Bizzy Indonesia';
            vendorShowLogo = '';
            vendorShowWarehouse = 'Warehouse Bizzy';
            vendorCreatedAt = '';
            vendorShowTrademark = '';
        } else {
            warehouseHub.geograph = warehouseData;
        }

        const vendorInfo = {
            id: row.id,
            vendor_id: row.vendor_id,
            vendor_name: vendorShowName,
            vendor_trademark: vendorShowTrademark,
            vendor_pkp: vendorName[(row.vendor_id)].status_pkp,
            vendor_logo: vendorShowLogo,
            warehouse_id: row.warehouse_id,
            warehouse_name: vendorShowWarehouse,
            warehouse_hub_id: warehouseName[(row.warehouse_id)].hub_id,
            warehouse_hub_shipper: vendorName[(row.vendor_id).toString().trim()].warehouse_hub_shipper,
            warehouse_hub: warehouseHub,
            stock_available: row.stock_available,
            currency: row.currency,
            tier_min_qty_1: priceItems[(row.vendor_id)].tier_min_qty_1,
            tier_min_qty_2: priceItems[(row.vendor_id)].tier_min_qty_2,
            tier_min_qty_3: priceItems[(row.vendor_id)].tier_min_qty_3,
            tier_cogs_price_1: priceItems[(row.vendor_id)].tier_cogs_price_1,
            tier_cogs_price_2: priceItems[(row.vendor_id)].tier_cogs_price_2,
            tier_cogs_price_3: priceItems[(row.vendor_id)].tier_cogs_price_3,
            warehouse_geograph: warehouseData,
            vendor_joined_at: vendorCreatedAt,
            is_contract: (priceItems[(row.vendor_id)].is_contract === 'RC' || priceItems[(row.vendor_id)].is_contract_price === true) ? 1 : 0,
            top_days: priceItems[(row.vendor_id)].top_days,
            channel_type: priceItems[(row.vendor_id)].channel_type,
            cid: priceItems[(row.vendor_id)].cid,
            is_franco: (priceItems[(row.vendor_id)].is_franco === true) ? 1 : 0,
            shipping: priceItems[(row.vendor_id)].shipping ? priceItems[(row.vendor_id)].shipping : [],
            sku_vendor: row.sku_vendor ? row.sku_vendor : '',
            is_qvl: priceItems[(row.vendor_id)].is_qvl,
            warranty_option: row.warranty_option,
            warranty_period: row.warranty_period,
            warranty_limit: row.warranty_limit,
            warranty_coverage: row.warranty_coverage
        };

        dataVendor.push(vendorInfo);
    });

    return dataVendor;
};

const customVendorPdp = function (data, vendorInformation, channelType, prices) {
    const dataVendor = [];
    const vendorName = getVendorInformation(vendorInformation.data);
    const warehouseName = getWarehouseInformation(vendorInformation.data);
    const warehouseGeograph = getWarehouseGeograph(vendorInformation.data);
    // const priceItems = getPriceItems(priceEngine);

    data.forEach((row, key) => {
        const vendorShowName = vendorName[(row.vendor_id).toString().trim()].name;
        const vendorShowLogo = vendorName[(row.vendor_id).toString().trim()].logo;
        const vendorShowWarehouse = warehouseName[(row.warehouse_id).toString().trim()].name;
        const vendorShowTrademark = vendorName[(row.vendor_id).toString().trim()].trademark;
        const vendorCreatedAt = vendorName[(row.vendor_id)].created_at;

        const warehouseData = getWarehouseData(warehouseGeograph[(row.warehouse_id)]);
        const warehouseHub = warehouseName[(row.warehouse_id)].warehouse_hub;
        warehouseHub.geograph = warehouseData;
        warehouseHub.name = vendorShowWarehouse;

        // const skuChannelType = priceItems[(row.vendor_id)].channel_type;
        const vendorInfo = {
            id: row.id,
            vendor_id: row.vendor_id,
            vendor_name: vendorShowName,
            vendor_trademark: vendorShowTrademark,
            vendor_pkp: vendorName[(row.vendor_id)].status_pkp,
            vendor_logo: vendorShowLogo,
            warehouse_id: row.warehouse_id,
            warehouse_name: vendorShowWarehouse,
            warehouse_hub_id: warehouseName[(row.warehouse_id)].hub_id,
            warehouse_hub_shipper: vendorName[(row.vendor_id).toString().trim()].warehouse_hub_shipper,
            warehouse_hub: warehouseHub,
            stock_available: row.stock_available,
            currency: row.currency,
            // tier_min_qty_1: priceItems[(row.vendor_id)].tier_min_qty_1,
            // tier_min_qty_2: priceItems[(row.vendor_id)].tier_min_qty_2,
            // tier_min_qty_3: priceItems[(row.vendor_id)].tier_min_qty_3,
            // tier_cogs_price_1: priceItems[(row.vendor_id)].tier_cogs_price_1,
            // tier_cogs_price_2: priceItems[(row.vendor_id)].tier_cogs_price_2,
            // tier_cogs_price_3: priceItems[(row.vendor_id)].tier_cogs_price_3,
            warehouse_geograph: warehouseData,
            vendor_joined_at: vendorCreatedAt,
            // is_contract: (priceItems[(row.vendor_id)].is_contract === 'RC' || priceItems[(row.vendor_id)].is_contract_price === true) ? 1 : 0,
            // top_days: priceItems[(row.vendor_id)].top_days,
            // channel_type: priceItems[(row.vendor_id)].channel_type,
            // cid: priceItems[(row.vendor_id)].cid,
            // is_franco: (priceItems[(row.vendor_id)].is_franco === true) ? 1 : 0,
            // shipping: priceItems[(row.vendor_id)].shipping ? priceItems[(row.vendor_id)].shipping : [],
            sku_vendor: row.sku_vendor ? row.sku_vendor : '',
            warranty_option: row.warranty_option,
            warranty_period: row.warranty_period,
            warranty_limit: row.warranty_limit,
            warranty_coverage: row.warranty_coverage
            // is_qvl: priceItems[(row.vendor_id)].is_qvl
        };

        dataVendor.push(vendorInfo);
    });

    return dataVendor;
};

const ratingVendorFilter = function (data, key) {
    if (data === null) {
        return null;
    }

    const result = data.filter(function(el) {
        return el.organization_uuid == key;
    });

    let final = {};
    if (result.length > 0) {
        final = result[0];
    } else {
        final = null;
    }
    return final;
};

const customVendorPrice = function (data, vendorInformation, channelType, prices, ratingVendors) {
    const dataVendor = [];
    const dataVendorContract = [];
    const vendorName = getVendorInformation(vendorInformation.data);
    const warehouseName = getWarehouseInformation(vendorInformation.data);
    const warehouseGeograph = getWarehouseGeograph(vendorInformation.data);

    data.forEach((row, key) => {
        const vendorShowName = vendorName[(row.vendor_id).toString().trim()].name;
        const vendorShowLogo = vendorName[(row.vendor_id).toString().trim()].logo;
        const vendorShowWarehouse = warehouseName[(row.warehouse_id).toString().trim()].name;
        const vendorShowTrademark = vendorName[(row.vendor_id).toString().trim()].trademark;
        const vendorCreatedAt = vendorName[(row.vendor_id)].created_at;
        const ratingProcessTime = getProcessTimeByOrganizationUuid(ratingVendorFilter(ratingVendors, row.uuid));

        const warehouseData = getWarehouseData(warehouseGeograph[(row.warehouse_id)]);
        const warehouseHub = warehouseName[(row.warehouse_id)].warehouse_hub;
        warehouseHub.geograph = warehouseData;
        warehouseHub.name = vendorShowWarehouse;
        const vendorInfo = {
            id: row.id,
            uuid: row.uuid,
            vendor_id: row.vendor_id,
            vendor_name: vendorShowName,
            vendor_trademark: vendorShowTrademark,
            vendor_pkp: vendorName[(row.vendor_id)].status_pkp,
            vendor_logo: vendorShowLogo,
            warehouse_id: row.warehouse_id,
            warehouse_name: vendorShowWarehouse,
            warehouse_hub_id: warehouseName[(row.warehouse_id)].hub_id,
            warehouse_hub_shipper: vendorName[(row.vendor_id).toString().trim()].warehouse_hub_shipper,
            warehouse_hub: warehouseHub,
            stock_available: row.stock_available,
            currency: row.currency,
            price: prices ? prices.find(p => Number(p.vendor_id) === row.vendor_id) : {},
            warehouse_geograph: warehouseData,
            vendor_joined_at: vendorCreatedAt,
            sku_vendor: row.sku_vendor ? row.sku_vendor : '',
            warranty_option: row.warranty_option,
            warranty_period: row.warranty_period,
            warranty_limit: row.warranty_limit,
            warranty_coverage: row.warranty_coverage,
            indent_period: row.indent_period || '',
            indent_limit: row.indent_limit || 0,
            is_indent: row.is_indent || 0,
            rating_process_time: ratingProcessTime,
            down_payment_type: row.down_payment_type,
            down_payment_value: row.down_payment_value,
            is_decimal: row.is_decimal
        };

        if (vendorInfo.price.is_contract_price || vendorInfo.price.from_franco) {
            vendorInfo.down_payment_type = 0;
            vendorInfo.down_payment_value = 0;
            dataVendorContract.push(vendorInfo);
        } else {
            dataVendor.push(vendorInfo);
        }
    });

    return dataVendorContract.length > 0 ? dataVendorContract : dataVendor;
};

const customVendorERP = function (data, vendorInformation) {
    const dataVendor = [];
    const vendorName = getVendorInformation(vendorInformation.data);
    const warehouseName = getWarehouseInformation(vendorInformation.data);
    const warehouseGeograph = getWarehouseGeograph(vendorInformation.data);

    data.forEach((row, key) => {
        const vendorInfo = {
            id: row.id,
            vendor_id: row.vendor_id,
            vendor_name: vendorName[(row.vendor_id).toString().trim()].name,
            vendor_trademark: vendorName[(row.vendor_id).toString().trim()].trademark,
            vendor_pkp: vendorName[(row.vendor_id)].status_pkp,
            vendor_logo: vendorName[(row.vendor_id).toString().trim()].logo,
            warehouse_id: row.warehouse_id,
            warehouse_name: warehouseName[(row.warehouse_id).toString().trim()].name,
            warehouse_hub_id: warehouseName[(row.warehouse_id)].hub_id,
            warehouse_hub_shipper: vendorName[(row.vendor_id).toString().trim()].warehouse_hub_shipper,
            warehouse_hub: warehouseName[(row.warehouse_id)].warehouse_hub,
            stock_available: row.stock_available,
            currency: row.currency,
            tier_min_qty_1: row.tier_min_qty_1,
            tier_min_qty_2: row.tier_min_qty_2,
            tier_min_qty_3: row.tier_min_qty_3,
            tier_cogs_price_1: parseFloat(row.tier_cogs_price_1),
            tier_cogs_price_2: parseFloat(row.tier_cogs_price_2),
            tier_cogs_price_3: parseFloat(row.tier_cogs_price_3),
            warehouse_geograph: getWarehouseData(warehouseGeograph[(row.warehouse_id)]),
            vendor_joined_at: vendorName[(row.vendor_id)].created_at
        };

        dataVendor.push(vendorInfo);
    });

    return dataVendor;
};

const getProductVariant = function (data) {
    const result = [];
    data.forEach((row, key) => {
        const variants = {
            code: row.attribute_code,
            label: row.attribute_code_label,
            value: row.attribute_value_name
        };

        result.push(variants);
    });
    return result;
};

const getProductSpecifications = function (ProductAttributes) {
    const result = [];
    ProductAttributes.forEach((row, key) => {
        const attrLabel = row.AttributeCode.label;
        const attrCode = row.AttributeCode.code;
        let spec = {};

        if (row.text_input === null) {
            spec = {
                code: attrCode,
                label: attrLabel,
                value: row.AttributeValue.value
            };
        } else {
            const attrValue = row.text_input;
            spec = {
                code: attrCode,
                label: attrLabel,
                value: attrValue
            };
        }

        result.push(spec);
    });

    return result;
};

const getUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

const getProductMapping = function (maps) {
    return {
        material_group: (maps.length !== 0) ? maps[0].payload.material_group : '',
        material_code: (maps.length !== 0) ? maps[0].payload.material_code : ''
    };
};

exports.item = function (data, channelType) {
    const productVendors = customVendor(data.vendors, data.vendor_information, channelType, data.price_engine);

    return {
        data: {
            type: 'product_variant',
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            brand: {
                id: data.brand.id,
                name: data.brand.name,
                url_key: Helper.slugify(data.brand.name)
            },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            categories: {
                c0: {
                    id: data.c0.id,
                    name: data.c0.name,
                    url_key: getUrlKey(data.c0.name, data.c0.level, data.c0.id),
                    unspsc: data.c0.unspsc
                },
                c1: {
                    id: data.c1.id,
                    name: data.c1.name,
                    url_key: getUrlKey(data.c1.name, data.c1.level, data.c1.id),
                    unspsc: data.c1.unspsc
                },
                c2: {
                    id: data.c2.id,
                    name: data.c2.name,
                    url_key: getUrlKey(data.c2.name, data.c2.level, data.c2.id),
                    unspsc: data.c2.unspsc
                },
                c3: {
                    id: data.c3.id,
                    name: data.c3.name,
                    url_key: getUrlKey(data.c3.name, data.c3.level, data.c3.id),
                    unspsc: data.c3.unspsc
                }
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            package_content: data.payload.package_content,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image, 'array'),
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            specifications: (data.product_specifications.length === 0) ? [] : getProductSpecifications(data.product_specifications),
            variants: (data.variant_attribute.length === 0) ? [] : getProductVariant(data.variant_attribute),
            variant_count: data.payload.variant_count,
            variant_matrix: (data.payload.variant_matrix.length === 0) ? [] : Helper.convertToArray(data.payload.variant_matrix, 'array'),
            variant_value: (data.variant_value === 'NO_VARIANT') ? 'NO_VARIANT' : Helper.convertToArray(data.variant_value, 'object'),
            product_vendors: productVendors,
            material_code: getProductMapping(data.product_mapping).material_code,
            material_group: getProductMapping(data.product_mapping).material_group,
            is_mapping: (data.product_mapping.length === 0) ? 0 : 1
        }
    };
};

exports.itemPdp = function (data, channelType) {
    return {
        data: {
            type: 'product_variant',
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            brand: {
                id: data.brand.id,
                name: data.brand.name,
                url_key: Helper.slugify(data.brand.name)
            },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            categories: {
                c0: {
                    id: data.category[0].c0_id,
                    name: data.category[0].c0_name,
                    url_key: getUrlKey(data.category[0].c0_name, data.category[0].c0_level, data.category[0].c0_id),
                    unspsc: data.category[0].c0_unspsc
                },
                c1: {
                    id: data.category[0].c1_id,
                    name: data.category[0].c1_name,
                    url_key: getUrlKey(data.category[0].c1_name, data.category[0].c1_level, data.category[0].c1_id),
                    unspsc: data.category[0].c1_unspsc
                },
                c2: {
                    id: data.category[0].c2_id,
                    name: data.category[0].c2_name,
                    url_key: getUrlKey(data.category[0].c2_name, data.category[0].c2_level, data.category[0].c2_id),
                    unspsc: data.category[0].c2_unspsc
                },
                c3: {
                    id: data.category[0].c3_id,
                    name: data.category[0].c3_name,
                    url_key: getUrlKey(data.category[0].c3_name, data.category[0].c3_level, data.category[0].c3_id),
                    unspsc: data.category[0].c3_unspsc
                }
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            package_content: data.payload.package_content,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image, 'array'),
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            specifications: getProductSpecifications(data.product_specifications),
            variants: (data.variant_attribute.length === 0) ? [] : getProductVariant(data.variant_attribute),
            variant_count: data.payload.variant_count,
            variant_matrix: (data.payload.variant_matrix.length === 0) ? [] : Helper.convertToArray(data.payload.variant_matrix, 'array'),
            variant_value: (data.variant_value === 'NO_VARIANT') ? 'NO_VARIANT' : Helper.convertToArray(data.variant_value, 'object'),
        }
    };
};

exports.vendorDetail = function (data, channelType) {
    const productVendors = customVendorPdp(data.vendors, data.vendor_information, channelType, data.prices);

    return {
        data: productVendors
    };
};

exports.vendorPrice = function (data, channelType) {
    const productVendors = customVendorPrice(
        data.vendors,
        data.vendor_information,
        channelType,
        data.prices,
        data.ratingVendors
    );

    return {
        data: productVendors
    };
};

exports.itemERP = function (data) {
    const productVendors = customVendorERP(data.vendors, data.vendor_information);

    return {
        data: {
            type: 'product_variant',
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            brand: {
                id: data.brand.id,
                name: data.brand.name,
                url_key: Helper.slugify(data.brand.name)
            },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            categories: {
                c0: {
                    id: data.c0.id,
                    name: data.c0.name,
                    url_key: getUrlKey(data.c0.name, data.c0.level, data.c0.id),
                    unspsc: data.c0.unspsc
                },
                c1: {
                    id: data.c1.id,
                    name: data.c1.name,
                    url_key: getUrlKey(data.c1.name, data.c1.level, data.c1.id),
                    unspsc: data.c1.unspsc
                },
                c2: {
                    id: data.c2.id,
                    name: data.c2.name,
                    url_key: getUrlKey(data.c2.name, data.c2.level, data.c2.id),
                    unspsc: data.c2.unspsc
                },
                c3: {
                    id: data.c3.id,
                    name: data.c3.name,
                    url_key: getUrlKey(data.c3.name, data.c3.level, data.c3.id),
                    unspsc: data.c3.unspsc
                }
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            package_content: data.payload.package_content,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image, 'array'),
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            specifications: (data.product_specifications.length === 0) ? [] : getProductSpecifications(data.product_specifications),
            variants: (data.variant_attribute.length === 0) ? [] : getProductVariant(data.variant_attribute),
            variant_count: data.payload.variant_count,
            variant_matrix: (data.payload.variant_matrix.length === 0) ? [] : Helper.convertToArray(data.payload.variant_matrix, 'array'),
            variant_value: (data.variant_value === 'NO_VARIANT') ? 'NO_VARIANT' : Helper.convertToArray(data.variant_value, 'object'),
            product_vendors: productVendors
            // is_mapping: (data.product_mapping.length === 0) ? 0 : 1
        }
    };
};

exports.itemPublic = function (data) {
    return {
        data: {
            type: 'product_variant',
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            brand: {
                id: data.brand.id,
                name: data.brand.name,
                url_key: Helper.slugify(data.brand.name)
            },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            categories: {
                c0: {
                    id: data.category[0].c0_id,
                    name: data.category[0].c0_name,
                    url_key: getUrlKey(data.category[0].c0_name, data.category[0].c0_level, data.category[0].c0_id),
                    unspsc: data.category[0].c0_unspsc
                },
                c1: {
                    id: data.category[0].c1_id,
                    name: data.category[0].c1_name,
                    url_key: getUrlKey(data.category[0].c1_name, data.category[0].c1_level, data.category[0].c1_id),
                    unspsc: data.category[0].c1_unspsc
                },
                c2: {
                    id: data.category[0].c2_id,
                    name: data.category[0].c2_name,
                    url_key: getUrlKey(data.category[0].c2_name, data.category[0].c2_level, data.category[0].c2_id),
                    unspsc: data.category[0].c2_unspsc
                },
                c3: {
                    id: data.category[0].c3_id,
                    name: data.category[0].c3_name,
                    url_key: getUrlKey(data.category[0].c3_name, data.category[0].c3_level, data.category[0].c3_id),
                    unspsc: data.category[0].c3_unspsc
                }
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            package_content: data.payload.package_content,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image, 'array'),
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            specifications: getProductSpecifications(data.product_specifications),
            variants: (data.variant_attribute.length === 0) ? [] : getProductVariant(data.variant_attribute),
            variant_count: data.payload.variant_count,
            variant_matrix: Helper.convertToArray(data.payload.variant_matrix, 'array'),
            variant_value: (data.variant_value === 'NO_VARIANT') ? 'NO_VARIANT' : Helper.convertToArray(data.variant_value, 'object'),
            total_offer: data.total_offer
        }
    };
};

module.exports = exports;
