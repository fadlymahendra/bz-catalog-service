'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Transformer = require('../../../../src/transformers/sku-managements/detail_price_engine');


test.serial('item: successfully type-1', (t) => {
    const data = {
        id: '',
        sku: '',
        is_active: '',
        product_group: {
            Category: {
                id: '',
                name: '',
                level: ''
            },
            quantity_stocking_uom: '',
            StockingUom: {
                id: '',
                name: ''
            }
        },
        package_width: '1  ',
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: '',
                sku_vendor: '1'
            },
            key: {
                brand: null,
                stock_uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        },
        vendor_information: {
            tier_min_qty_1: '',
            tier_min_qty_2: '',
            tier_min_qty_3: '',
            tier_cogs_price_1: '',
            tier_cogs_price_2: '',
            tier_cogs_price_3: '',
            vendor_id: '',
            warehouse_id: ''
        }
    };

    const transformer = new Transformer.item(data);
    const expected = {
        id: data.id,
        sku: data.sku,
        is_active: data.is_active,
        c3: {
            id: data.product_group.Category.id,
            name: data.product_group.Category.name,
            level: data.product_group.Category.level
        },
        tier_data: [
            {
                tier_min_qty_1: data.vendor_information ? data.vendor_information.tier_min_qty_1 : null,
                tier_cogs_price_1: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_1) : null
            },
            {
                tier_min_qty_2: data.vendor_information ? data.vendor_information.tier_min_qty_2 : null,
                tier_cogs_price_2: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_2) : null
            },
            {
                tier_min_qty_3: data.vendor_information ? data.vendor_information.tier_min_qty_3 : null,
                tier_cogs_price_3: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_3) : null
            }
        ],
        vendor: {
            id: data.vendor_information.vendor_id,
            warehouse_id: data.vendor_information.warehouse_id
        },
        product_group: {
            quantity_stocking_uom: data.product_group.quantity_stocking_uom,
            stocking_uom: {
                id: data.product_group.StockingUom.id,
                name: data.product_group.StockingUom.name
            }
        }
    };

    t.deepEqual(transformer, expected);
});


test.serial('item: successfully type-2', (t) => {
    const data = {
        id: '',
        sku: '',
        is_active: '',
        product_group: {
            Category: {
                id: '',
                name: '',
                level: ''
            },
            quantity_stocking_uom: '',
            StockingUom: {
                id: '',
                name: ''
            }
        },
        package_width: '1  ',
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: '',
                sku_vendor: '1'
            },
            key: {
                brand: null,
                stock_uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        },
        vendor_information: null
    };

    const transformer = new Transformer.item(data);
    const expected = {
        id: data.id,
        sku: data.sku,
        is_active: data.is_active,
        c3: {
            id: data.product_group.Category.id,
            name: data.product_group.Category.name,
            level: data.product_group.Category.level
        },
        tier_data: [
            {
                tier_min_qty_1: data.vendor_information ? data.vendor_information.tier_min_qty_1 : null,
                tier_cogs_price_1: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_1) : null
            },
            {
                tier_min_qty_2: data.vendor_information ? data.vendor_information.tier_min_qty_2 : null,
                tier_cogs_price_2: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_2) : null
            },
            {
                tier_min_qty_3: data.vendor_information ? data.vendor_information.tier_min_qty_3 : null,
                tier_cogs_price_3: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_3) : null
            }
        ],
        vendor: data.vendor_information ? {
            id: data.vendor_information.vendor_id,
            warehouse_id: data.vendor_information.warehouse_id
        } : null,
        product_group: {
            quantity_stocking_uom: data.product_group.quantity_stocking_uom,
            stocking_uom: {
                id: data.product_group.StockingUom.id,
                name: data.product_group.StockingUom.name
            }
        }
    };

    t.deepEqual(transformer, expected);
});


test.serial('itemBulk: successfully type-1', (t) => {
    const data = {
        id: '1  ',
        sku: '  1',
        product_group: {
            Category: {
                id: '',
                name: '',
                level: ''
            },
            quantity_stocking_uom: '',
            StockingUom: {
                id: '',
                name: ''
            }
        },
        package_width: '1  ',
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: '',
                sku_vendor: '1'
            },
            key: {
                brand: null,
                stock_uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        }
    };
    const vendorInformation = {
        tier_min_qty_1: '',
        tier_min_qty_2: '',
        tier_min_qty_3: '',
        tier_cogs_price_1: '',
        tier_cogs_price_2: '',
        tier_cogs_price_3: '',
        vendor_id: '',
        warehouse_id: ''
    };

    const transformer = new Transformer.itemBulk(data, vendorInformation);
    const expected = {
        id: data.id,
        sku: data.sku,
        c3: {
            id: data.product_group.Category.id,
            name: data.product_group.Category.name,
            level: data.product_group.Category.level
        },
        tier_data: [
            {
                tier_min_qty_1: vendorInformation.tier_min_qty_1,
                tier_cogs_price_1: parseFloat(vendorInformation.tier_cogs_price_1)
            },
            {
                tier_min_qty_2: vendorInformation.tier_min_qty_2,
                tier_cogs_price_2: parseFloat(vendorInformation.tier_cogs_price_2)
            },
            {
                tier_min_qty_3: vendorInformation.tier_min_qty_3,
                tier_cogs_price_3: parseFloat(vendorInformation.tier_cogs_price_3)
            }
        ],
        vendor: {
            id: vendorInformation.vendor_id,
            warehouse_id: vendorInformation.warehouse_id
        },
        product_group: {
            quantity_stocking_uom: data.product_group.quantity_stocking_uom,
            stocking_uom: {
                id: data.product_group.StockingUom.id,
                name: data.product_group.StockingUom.name
            }
        }
    };

    t.deepEqual(transformer, expected);
});
