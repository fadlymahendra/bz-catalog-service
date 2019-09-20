'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const uuid = require('uuid');
const Helper = require('../../../../src/utils/helper');
const Transformer = require('../../../../src/transformers/products/bulk_upload');

test.serial('collection: successfully with status is false', (t) => {
    const data = {
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: ''
            },
            key: {
                brand: {
                    image_url: ''
                },
                uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        }
    };
    const info = {
        s3_file: {
            file_name: '',
            Location: ''
        },
        context: {
            user: {
                last_name: '',
                employee: {
                    id: ''
                }
            }
        }
    };
    const status = false;

    const transformer = new Transformer.collection(data, info, status);
    const expected = {
        title: 'Bulk Upload By Bizzy',
        customer_id: info.customer_id,
        file: {
            url: info.s3_file.Location,
            file_name: info.s3_file.file_name
        },
        product: data,
        user: {
            id: info.context.user.employee.id,
            name: `${info.context.user.first_name} ${info.context.user.last_name}`,
            email: info.context.user.username,
            type: 'employee'
        },
        inserted: status,
        created_at: info.process_time,
        updated_at: info.process_time
    };

    t.deepEqual(transformer, expected);
});


test.serial('collection: successfully with status is true', (t) => {
    const data = {
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: ''
            },
            key: {
                brand: {
                    image_url: ''
                },
                uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        }
    };
    const info = {
        s3_file: {
            file_name: '',
            Location: ''
        },
        context: {
            user: {
                last_name: '',
                employee: {
                    id: ''
                }
            }
        }
    };

    const transformer = new Transformer.collection(data, info);
    const expected = {
        title: 'Bulk Upload By Bizzy',
        customer_id: info.customer_id,
        file: {
            url: info.s3_file.Location,
            file_name: info.s3_file.file_name
        },
        product: data,
        user: {
            id: info.context.user.employee.id,
            name: `${info.context.user.first_name} ${info.context.user.last_name}`,
            email: info.context.user.username,
            type: 'employee'
        },
        inserted: true,
        created_at: info.process_time,
        updated_at: info.process_time
    };

    t.deepEqual(transformer, expected);
});


test.serial('transformProductPremoderation: successfully type-1', (t) => {
    t.context.sandbox.stub(uuid, 'v4').returns('1');
    t.context.sandbox.stub(Helper, 'generateRandomIndex').returns('123');

    const data = {
        package_weight: '1',
        package_length: '1',
        package_height: '1',
        package_width: '1',
        brand: '',
        product: {
            product_group: {

            },
            product_vendor: {
                id: '',
                vendor_id: ''
            },
            key: {
                brand: {
                    image_url: ''
                },
                uom: {
                    id: ''
                }
            },
            stock_uom: {
                id: ''
            }
        }
    };
    const info = {
        process_time: {

        },
        context: {
            user: {
                last_name: '',
                employee: {
                    id: ''
                }
            }
        }
    };

    const transformer = new Transformer.transformProductPremoderation(data, info);
    const expected = {
        id: '1',
        type: 'new',
        payload: {
            name: data.product_name,
            brand_id: data.product.product_group.brand_id,
            brand_name: data.brand,
            category_id: 0,
            category: {
                c3: 0,
                c2: 0,
                c1: 0,
                c0: 0
            },
            brand_image: data.product.key.brand.image_url,
            uom_id: data.product.key.uom ? data.product.key.uom.id : info.uom,
            stocking_uom_id: data.product.key.stock_uom ? data.product.key.stock_uom.id : info.stock_uom,
            quantity_stocking_uom: parseInt(data.quantity_stocking_uom, 10),
            manufacturing_number: '',
            brand_status: 'clear',
            specification_status: 'completed',
            package_weight: String(data.package_weight),
            package_length: String(data.package_length),
            package_height: String(data.package_height),
            package_width: String(data.package_width),
            package_content: data.product.product_group.package_content,
            barcode: '',
            description: data.product.product_group.description,
            variant_count: 0,
            variant_matrix: [],
            specifications: [],
            products: [
                {
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    index: '123',
                    sku_vendor: data.product.product_vendor.sku_vendor ? String(data.product.product_vendor.sku_vendor).toUpperCase() : '',
                    tier_min_qty_1: String(data.tier_min_qty_1),
                    tier_min_qty_2: '',
                    tier_min_qty_3: '',
                    tier_cogs_price_1: String(Math.floor(data.tier_cogs_price_1)),
                    tier_cogs_price_2: '',
                    tier_cogs_price_3: '',
                    stock: 1000,
                    warehouse_id: data.product.product_vendor.id,
                    location_label: data.product.product_vendor.location_label,
                    reference_link: [],
                    warranty_option: data.product.product_vendor.warranty_type,
                    warranty_period: data.product.product_vendor.warranty_period,
                    warranty_coverage: '',
                    warranty_limit: data.product.product_vendor.warranty_limit,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'complete',
                    primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                    additional_image: []
                }
            ]
        },
        premoderation_status: 'need_to_review',
        vendor_id: data.product.product_vendor.vendor_id,
        user: {
            id: info.context.user.employee.id,
            name: `${info.context.user.first_name} ${info.context.user.last_name}`,
            email: info.context.user.username,
            type: 'employee'
        },
        created_at: info.process_time,
        updated_at: info.process_time
    };

    t.deepEqual(transformer, expected);
});

test.serial('transformProductPremoderation: successfully type-2', (t) => {
    t.context.sandbox.stub(uuid, 'v4').returns('1');
    t.context.sandbox.stub(Helper, 'generateRandomIndex').returns('123');

    const data = {
        package_weight: '1  ',
        package_length: '  1',
        package_height: '1  ',
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
    const info = {
        process_time: {

        },
        context: {
            user: {
                last_name: '',
                employee: {
                    id: ''
                }
            }
        }
    };

    const transformer = new Transformer.transformProductPremoderation(data, info);
    const expected = {
        id: '1',
        type: 'new',
        payload: {
            name: data.product_name,
            brand_id: data.product.product_group.brand_id,
            brand_name: data.brand,
            category_id: 0,
            category: {
                c3: 0,
                c2: 0,
                c1: 0,
                c0: 0
            },
            brand_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
            uom_id: data.product.key.uom ? data.product.key.uom.id : info.uom,
            stocking_uom_id: data.product.key.stock_uom ? data.product.key.stock_uom.id : info.stock_uom,
            quantity_stocking_uom: parseInt(data.quantity_stocking_uom, 10),
            manufacturing_number: '',
            brand_status: 'clear',
            specification_status: 'completed',
            package_weight: '1  ',
            package_length: '  1',
            package_height: '1  ',
            package_width: '1  ',
            package_content: data.product.product_group.package_content,
            barcode: '',
            description: data.product.product_group.description,
            variant_count: 0,
            variant_matrix: [],
            specifications: [],
            products: [
                {
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    index: '123',
                    sku_vendor: data.product.product_vendor.sku_vendor ? String(data.product.product_vendor.sku_vendor).toUpperCase() : '',
                    tier_min_qty_1: String(data.tier_min_qty_1),
                    tier_min_qty_2: '',
                    tier_min_qty_3: '',
                    tier_cogs_price_1: String(Math.floor(data.tier_cogs_price_1)),
                    tier_cogs_price_2: '',
                    tier_cogs_price_3: '',
                    stock: 1000,
                    warehouse_id: data.product.product_vendor.id,
                    location_label: data.product.product_vendor.location_label,
                    reference_link: [],
                    warranty_option: data.product.product_vendor.warranty_type,
                    warranty_period: data.product.product_vendor.warranty_period,
                    warranty_coverage: '',
                    warranty_limit: data.product.product_vendor.warranty_limit,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'complete',
                    primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                    additional_image: []
                }
            ]
        },
        premoderation_status: 'need_to_review',
        vendor_id: data.product.product_vendor.vendor_id,
        user: {
            id: info.context.user.employee.id,
            name: `${info.context.user.first_name} ${info.context.user.last_name}`,
            email: info.context.user.username,
            type: 'employee'
        },
        created_at: info.process_time,
        updated_at: info.process_time
    };

    t.deepEqual(transformer, expected);
});


test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
