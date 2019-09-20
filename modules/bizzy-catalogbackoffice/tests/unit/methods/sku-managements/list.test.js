'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const RepoRaw = require('../../../../src/repositories/raw_query');
const RepoProductVariant = require('../../../../src/repositories/product_variant');
const Method = require('../../../../src/methods/sku-managements/list');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return list of Sku a', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [
            {
                product_group_id: 71,
                product_variant_id: 88,
                sku: 'DTFP5MFU8V',
                long_name: 'Test 2: Fill Mandatory Only Success',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 567,
                C2: 150,
                C1: 31,
                C0: 3
            },
            {
                product_group_id: 45,
                product_variant_id: 87,
                sku: '2BT5SHXXIY',
                long_name: 'Motorola - Silver - 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 69,
                product_variant_id: 86,
                sku: 'XMD8GQ5S6W',
                long_name: 'ANGSA Bantal Empuk',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121251.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121255.jpg"]',
                C3: 310,
                C2: 169,
                C1: 82,
                C0: 14
            },
            {
                product_group_id: 67,
                product_variant_id: 85,
                sku: 'PK9I68T8CK',
                long_name: 'Goody Bag Bizzy Blue 1192',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 66,
                product_variant_id: 84,
                sku: 'P2F33MOTP4',
                long_name: 'Goody Bag Bizzy Blue 15',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 2,
                product_variant_id: 80,
                sku: 'SOZYSCO6SH',
                long_name: 'Apple iPhone 7 - Silver - 164GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 59,
                product_variant_id: 79,
                sku: '8JICUYMB52',
                long_name: 'test data 1',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 58,
                product_variant_id: 78,
                sku: 'BVPCEFNUTU',
                long_name: 'Barang ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 282,
                C2: 280,
                C1: 32,
                C0: 3
            },
            {
                product_group_id: 57,
                product_variant_id: 77,
                sku: '19JN7H8C1W',
                long_name: 'Goody Bag Bizzy Blue 10',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 56,
                product_variant_id: 76,
                sku: 'MCE7AG0AYY',
                long_name: 'Goody Bag Bizzy Blue 1149',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522644200.png',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 52,
                product_variant_id: 74,
                sku: '3604JKRAUR',
                long_name: 'Miaww Makanan Kucing - 1Kg',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531473292.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531478326.png"]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 51,
                product_variant_id: 73,
                sku: 'I4A9V9ZAYU',
                long_name: 'Miaww Makanan Kucing - 500g',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531472505.jpg',
                additional_image: '[]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 2,
                product_variant_id: 72,
                sku: 'KDVTNR2U6P',
                long_name: 'Apple iPhone 7 - Midnight Black - 512GB ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1530609447.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [
            {
                product_variant_id: 78
            },
            {
                product_variant_id: 12
            },
            {
                product_variant_id: 77
            },
            {
                product_variant_id: 84
            },
            {
                product_variant_id: 86
            },
            {
                product_variant_id: 20
            },
            {
                product_variant_id: 13
            },
            {
                product_variant_id: 21
            },
            {
                product_variant_id: 24
            },
            {
                product_variant_id: 39
            },
            {
                product_variant_id: 73
            },
            {
                product_variant_id: 74
            },
            {
                product_variant_id: 16
            },
            {
                product_variant_id: 17
            },
            {
                product_variant_id: 76
            },
            {
                product_variant_id: 79
            },
            {
                product_variant_id: 85
            },
            {
                product_variant_id: 19
            },
            {
                product_variant_id: 7
            },
            {
                product_variant_id: 10
            },
            {
                product_variant_id: 1
            },
            {
                product_variant_id: 3
            },
            {
                product_variant_id: 8
            },
            {
                product_variant_id: 28
            },
            {
                product_variant_id: 11
            },
            {
                product_variant_id: 18
            },
            {
                product_variant_id: 50
            },
            {
                product_variant_id: 2
            },
            {
                product_variant_id: 4
            },
            {
                product_variant_id: 5
            },
            {
                product_variant_id: 22
            },
            {
                product_variant_id: 34
            },
            {
                product_variant_id: 45
            },
            {
                product_variant_id: 46
            },
            {
                product_variant_id: 47
            },
            {
                product_variant_id: 48
            },
            {
                product_variant_id: 49
            },
            {
                product_variant_id: 51
            },
            {
                product_variant_id: 54
            },
            {
                product_variant_id: 57
            },
            {
                product_variant_id: 61
            },
            {
                product_variant_id: 72
            },
            {
                product_variant_id: 80
            },
            {
                product_variant_id: 9
            },
            {
                product_variant_id: 52
            },
            {
                product_variant_id: 44
            },
            {
                product_variant_id: 23
            },
            {
                product_variant_id: 25
            },
            {
                product_variant_id: 26
            },
            {
                product_variant_id: 27
            },
            {
                product_variant_id: 30
            },
            {
                product_variant_id: 31
            },
            {
                product_variant_id: 32
            },
            {
                product_variant_id: 33
            },
            {
                product_variant_id: 35
            },
            {
                product_variant_id: 62
            },
            {
                product_variant_id: 29
            },
            {
                product_variant_id: 36
            },
            {
                product_variant_id: 37
            },
            {
                product_variant_id: 40
            },
            {
                product_variant_id: 41
            },
            {
                product_variant_id: 42
            },
            {
                product_variant_id: 43
            },
            {
                product_variant_id: 55
            },
            {
                product_variant_id: 56
            },
            {
                product_variant_id: 58
            },
            {
                product_variant_id: 59
            },
            {
                product_variant_id: 60
            },
            {
                product_variant_id: 65
            },
            {
                product_variant_id: 67
            },
            {
                product_variant_id: 69
            },
            {
                product_variant_id: 68
            },
            {
                product_variant_id: 87
            },
            {
                product_variant_id: 88
            },
            {
                product_variant_id: 38
            },
            {
                product_variant_id: 6
            },
            {
                product_variant_id: 14
            },
            {
                product_variant_id: 15
            },
            {
                product_variant_id: 53
            }
        ]
    });
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves({
        rows: [
            {
                product_group_id: 1,
                product_variant_id: 15,
                sku: 'LS5DIEZZWV',
                long_name: 'Apple iPhone 7 Black 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 2,
                product_variant_id: 16,
                sku: 'LS5DIEZZWV',
                long_name: 'Apple iPhone 7 Black 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [1, 2]
    });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 1, total: 7 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([{ product_variant_id: 15, total_vendor: 99 }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'iphone',
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 4,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 1,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 99,
                    total_image: 3
                },
                {
                    id: 16,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 7,
                total_active_data: 7,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});


test.serial('Should be return list of Sku b', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [
            {
                product_group_id: 71,
                product_variant_id: 88,
                sku: 'DTFP5MFU8V',
                long_name: 'Test 2: Fill Mandatory Only Success',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 567,
                C2: 150,
                C1: 31,
                C0: 3
            },
            {
                product_group_id: 45,
                product_variant_id: 87,
                sku: '2BT5SHXXIY',
                long_name: 'Motorola - Silver - 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 69,
                product_variant_id: 86,
                sku: 'XMD8GQ5S6W',
                long_name: 'ANGSA Bantal Empuk',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121251.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121255.jpg"]',
                C3: 310,
                C2: 169,
                C1: 82,
                C0: 14
            },
            {
                product_group_id: 67,
                product_variant_id: 85,
                sku: 'PK9I68T8CK',
                long_name: 'Goody Bag Bizzy Blue 1192',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 66,
                product_variant_id: 84,
                sku: 'P2F33MOTP4',
                long_name: 'Goody Bag Bizzy Blue 15',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 2,
                product_variant_id: 80,
                sku: 'SOZYSCO6SH',
                long_name: 'Apple iPhone 7 - Silver - 164GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 59,
                product_variant_id: 79,
                sku: '8JICUYMB52',
                long_name: 'test data 1',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 58,
                product_variant_id: 78,
                sku: 'BVPCEFNUTU',
                long_name: 'Barang ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 282,
                C2: 280,
                C1: 32,
                C0: 3
            },
            {
                product_group_id: 57,
                product_variant_id: 77,
                sku: '19JN7H8C1W',
                long_name: 'Goody Bag Bizzy Blue 10',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 56,
                product_variant_id: 76,
                sku: 'MCE7AG0AYY',
                long_name: 'Goody Bag Bizzy Blue 1149',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522644200.png',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 52,
                product_variant_id: 74,
                sku: '3604JKRAUR',
                long_name: 'Miaww Makanan Kucing - 1Kg',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531473292.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531478326.png"]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 51,
                product_variant_id: 73,
                sku: 'I4A9V9ZAYU',
                long_name: 'Miaww Makanan Kucing - 500g',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531472505.jpg',
                additional_image: '[]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 2,
                product_variant_id: 72,
                sku: 'KDVTNR2U6P',
                long_name: 'Apple iPhone 7 - Midnight Black - 512GB ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1530609447.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [
            {
                product_variant_id: 78
            },
            {
                product_variant_id: 12
            },
            {
                product_variant_id: 77
            },
            {
                product_variant_id: 84
            },
            {
                product_variant_id: 86
            },
            {
                product_variant_id: 20
            },
            {
                product_variant_id: 13
            },
            {
                product_variant_id: 21
            },
            {
                product_variant_id: 24
            },
            {
                product_variant_id: 39
            },
            {
                product_variant_id: 73
            },
            {
                product_variant_id: 74
            },
            {
                product_variant_id: 16
            },
            {
                product_variant_id: 17
            },
            {
                product_variant_id: 76
            },
            {
                product_variant_id: 79
            },
            {
                product_variant_id: 85
            },
            {
                product_variant_id: 19
            },
            {
                product_variant_id: 7
            },
            {
                product_variant_id: 10
            },
            {
                product_variant_id: 1
            },
            {
                product_variant_id: 3
            },
            {
                product_variant_id: 8
            },
            {
                product_variant_id: 28
            },
            {
                product_variant_id: 11
            },
            {
                product_variant_id: 18
            },
            {
                product_variant_id: 50
            },
            {
                product_variant_id: 2
            },
            {
                product_variant_id: 4
            },
            {
                product_variant_id: 5
            },
            {
                product_variant_id: 22
            },
            {
                product_variant_id: 34
            },
            {
                product_variant_id: 45
            },
            {
                product_variant_id: 46
            },
            {
                product_variant_id: 47
            },
            {
                product_variant_id: 48
            },
            {
                product_variant_id: 49
            },
            {
                product_variant_id: 51
            },
            {
                product_variant_id: 54
            },
            {
                product_variant_id: 57
            },
            {
                product_variant_id: 61
            },
            {
                product_variant_id: 72
            },
            {
                product_variant_id: 80
            },
            {
                product_variant_id: 9
            },
            {
                product_variant_id: 52
            },
            {
                product_variant_id: 44
            },
            {
                product_variant_id: 23
            },
            {
                product_variant_id: 25
            },
            {
                product_variant_id: 26
            },
            {
                product_variant_id: 27
            },
            {
                product_variant_id: 30
            },
            {
                product_variant_id: 31
            },
            {
                product_variant_id: 32
            },
            {
                product_variant_id: 33
            },
            {
                product_variant_id: 35
            },
            {
                product_variant_id: 62
            },
            {
                product_variant_id: 29
            },
            {
                product_variant_id: 36
            },
            {
                product_variant_id: 37
            },
            {
                product_variant_id: 40
            },
            {
                product_variant_id: 41
            },
            {
                product_variant_id: 42
            },
            {
                product_variant_id: 43
            },
            {
                product_variant_id: 55
            },
            {
                product_variant_id: 56
            },
            {
                product_variant_id: 58
            },
            {
                product_variant_id: 59
            },
            {
                product_variant_id: 60
            },
            {
                product_variant_id: 65
            },
            {
                product_variant_id: 67
            },
            {
                product_variant_id: 69
            },
            {
                product_variant_id: 68
            },
            {
                product_variant_id: 87
            },
            {
                product_variant_id: 88
            },
            {
                product_variant_id: 38
            },
            {
                product_variant_id: 6
            },
            {
                product_variant_id: 14
            },
            {
                product_variant_id: 15
            },
            {
                product_variant_id: 53
            }
        ]
    });
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves({
        rows: [{
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: '',
            additional_image: null,
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }],
        total: [1]
    });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 0, total: 1 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([{ product_variant_id: 1, total_vendor: 0 }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'iphone',
                is_active: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);

        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_active_data: 0,
                total_inactive_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku c', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [
            {
                product_group_id: 71,
                product_variant_id: 88,
                sku: 'DTFP5MFU8V',
                long_name: 'Test 2: Fill Mandatory Only Success',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 567,
                C2: 150,
                C1: 31,
                C0: 3
            },
            {
                product_group_id: 45,
                product_variant_id: 87,
                sku: '2BT5SHXXIY',
                long_name: 'Motorola - Silver - 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 69,
                product_variant_id: 86,
                sku: 'XMD8GQ5S6W',
                long_name: 'ANGSA Bantal Empuk',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121251.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121255.jpg"]',
                C3: 310,
                C2: 169,
                C1: 82,
                C0: 14
            },
            {
                product_group_id: 67,
                product_variant_id: 85,
                sku: 'PK9I68T8CK',
                long_name: 'Goody Bag Bizzy Blue 1192',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 66,
                product_variant_id: 84,
                sku: 'P2F33MOTP4',
                long_name: 'Goody Bag Bizzy Blue 15',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 2,
                product_variant_id: 80,
                sku: 'SOZYSCO6SH',
                long_name: 'Apple iPhone 7 - Silver - 164GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 59,
                product_variant_id: 79,
                sku: '8JICUYMB52',
                long_name: 'test data 1',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 58,
                product_variant_id: 78,
                sku: 'BVPCEFNUTU',
                long_name: 'Barang ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 282,
                C2: 280,
                C1: 32,
                C0: 3
            },
            {
                product_group_id: 57,
                product_variant_id: 77,
                sku: '19JN7H8C1W',
                long_name: 'Goody Bag Bizzy Blue 10',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 56,
                product_variant_id: 76,
                sku: 'MCE7AG0AYY',
                long_name: 'Goody Bag Bizzy Blue 1149',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522644200.png',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 52,
                product_variant_id: 74,
                sku: '3604JKRAUR',
                long_name: 'Miaww Makanan Kucing - 1Kg',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531473292.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531478326.png"]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 51,
                product_variant_id: 73,
                sku: 'I4A9V9ZAYU',
                long_name: 'Miaww Makanan Kucing - 500g',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531472505.jpg',
                additional_image: '[]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 2,
                product_variant_id: 72,
                sku: 'KDVTNR2U6P',
                long_name: 'Apple iPhone 7 - Midnight Black - 512GB ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1530609447.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [
            {
                product_variant_id: 78
            },
            {
                product_variant_id: 12
            },
            {
                product_variant_id: 77
            },
            {
                product_variant_id: 84
            },
            {
                product_variant_id: 86
            },
            {
                product_variant_id: 20
            },
            {
                product_variant_id: 13
            },
            {
                product_variant_id: 21
            },
            {
                product_variant_id: 24
            },
            {
                product_variant_id: 39
            },
            {
                product_variant_id: 73
            },
            {
                product_variant_id: 74
            },
            {
                product_variant_id: 16
            },
            {
                product_variant_id: 17
            },
            {
                product_variant_id: 76
            },
            {
                product_variant_id: 79
            },
            {
                product_variant_id: 85
            },
            {
                product_variant_id: 19
            },
            {
                product_variant_id: 7
            },
            {
                product_variant_id: 10
            },
            {
                product_variant_id: 1
            },
            {
                product_variant_id: 3
            },
            {
                product_variant_id: 8
            },
            {
                product_variant_id: 28
            },
            {
                product_variant_id: 11
            },
            {
                product_variant_id: 18
            },
            {
                product_variant_id: 50
            },
            {
                product_variant_id: 2
            },
            {
                product_variant_id: 4
            },
            {
                product_variant_id: 5
            },
            {
                product_variant_id: 22
            },
            {
                product_variant_id: 34
            },
            {
                product_variant_id: 45
            },
            {
                product_variant_id: 46
            },
            {
                product_variant_id: 47
            },
            {
                product_variant_id: 48
            },
            {
                product_variant_id: 49
            },
            {
                product_variant_id: 51
            },
            {
                product_variant_id: 54
            },
            {
                product_variant_id: 57
            },
            {
                product_variant_id: 61
            },
            {
                product_variant_id: 72
            },
            {
                product_variant_id: 80
            },
            {
                product_variant_id: 9
            },
            {
                product_variant_id: 52
            },
            {
                product_variant_id: 44
            },
            {
                product_variant_id: 23
            },
            {
                product_variant_id: 25
            },
            {
                product_variant_id: 26
            },
            {
                product_variant_id: 27
            },
            {
                product_variant_id: 30
            },
            {
                product_variant_id: 31
            },
            {
                product_variant_id: 32
            },
            {
                product_variant_id: 33
            },
            {
                product_variant_id: 35
            },
            {
                product_variant_id: 62
            },
            {
                product_variant_id: 29
            },
            {
                product_variant_id: 36
            },
            {
                product_variant_id: 37
            },
            {
                product_variant_id: 40
            },
            {
                product_variant_id: 41
            },
            {
                product_variant_id: 42
            },
            {
                product_variant_id: 43
            },
            {
                product_variant_id: 55
            },
            {
                product_variant_id: 56
            },
            {
                product_variant_id: 58
            },
            {
                product_variant_id: 59
            },
            {
                product_variant_id: 60
            },
            {
                product_variant_id: 65
            },
            {
                product_variant_id: 67
            },
            {
                product_variant_id: 69
            },
            {
                product_variant_id: 68
            },
            {
                product_variant_id: 87
            },
            {
                product_variant_id: 88
            },
            {
                product_variant_id: 38
            },
            {
                product_variant_id: 6
            },
            {
                product_variant_id: 14
            },
            {
                product_variant_id: 15
            },
            {
                product_variant_id: 53
            }
        ]
    });
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves({
        rows: [{
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }],
        total: [1]
    });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 1, total: 7 },
        { is_active: 0, total: 0 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([{ product_variant_id: 1, total_vendor: 0 }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c0: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);

        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 7,
                total_active_data: 7,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku with variant condition ', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [{
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }],
        total: [1]
    });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 1, total: 7 },
        { is_active: 0, total: 0 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([{ product_variant_id: 1, total_vendor: 0 }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                is_active: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);

        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 7,
                total_active_data: 7,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku d', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [
            {
                product_group_id: 71,
                product_variant_id: 88,
                sku: 'DTFP5MFU8V',
                long_name: 'Test 2: Fill Mandatory Only Success',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 567,
                C2: 150,
                C1: 31,
                C0: 3
            },
            {
                product_group_id: 45,
                product_variant_id: 87,
                sku: '2BT5SHXXIY',
                long_name: 'Motorola - Silver - 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 69,
                product_variant_id: 86,
                sku: 'XMD8GQ5S6W',
                long_name: 'ANGSA Bantal Empuk',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121251.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121255.jpg"]',
                C3: 310,
                C2: 169,
                C1: 82,
                C0: 14
            },
            {
                product_group_id: 67,
                product_variant_id: 85,
                sku: 'PK9I68T8CK',
                long_name: 'Goody Bag Bizzy Blue 1192',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 66,
                product_variant_id: 84,
                sku: 'P2F33MOTP4',
                long_name: 'Goody Bag Bizzy Blue 15',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 2,
                product_variant_id: 80,
                sku: 'SOZYSCO6SH',
                long_name: 'Apple iPhone 7 - Silver - 164GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 59,
                product_variant_id: 79,
                sku: '8JICUYMB52',
                long_name: 'test data 1',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 58,
                product_variant_id: 78,
                sku: 'BVPCEFNUTU',
                long_name: 'Barang ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 282,
                C2: 280,
                C1: 32,
                C0: 3
            },
            {
                product_group_id: 57,
                product_variant_id: 77,
                sku: '19JN7H8C1W',
                long_name: 'Goody Bag Bizzy Blue 10',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 56,
                product_variant_id: 76,
                sku: 'MCE7AG0AYY',
                long_name: 'Goody Bag Bizzy Blue 1149',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522644200.png',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 52,
                product_variant_id: 74,
                sku: '3604JKRAUR',
                long_name: 'Miaww Makanan Kucing - 1Kg',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531473292.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531478326.png"]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 51,
                product_variant_id: 73,
                sku: 'I4A9V9ZAYU',
                long_name: 'Miaww Makanan Kucing - 500g',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531472505.jpg',
                additional_image: '[]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 2,
                product_variant_id: 72,
                sku: 'KDVTNR2U6P',
                long_name: 'Apple iPhone 7 - Midnight Black - 512GB ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1530609447.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [
            {
                product_variant_id: 78
            },
            {
                product_variant_id: 12
            },
            {
                product_variant_id: 77
            },
            {
                product_variant_id: 84
            },
            {
                product_variant_id: 86
            },
            {
                product_variant_id: 20
            },
            {
                product_variant_id: 13
            },
            {
                product_variant_id: 21
            },
            {
                product_variant_id: 24
            },
            {
                product_variant_id: 39
            },
            {
                product_variant_id: 73
            },
            {
                product_variant_id: 74
            },
            {
                product_variant_id: 16
            },
            {
                product_variant_id: 17
            },
            {
                product_variant_id: 76
            },
            {
                product_variant_id: 79
            },
            {
                product_variant_id: 85
            },
            {
                product_variant_id: 19
            },
            {
                product_variant_id: 7
            },
            {
                product_variant_id: 10
            },
            {
                product_variant_id: 1
            },
            {
                product_variant_id: 3
            },
            {
                product_variant_id: 8
            },
            {
                product_variant_id: 28
            },
            {
                product_variant_id: 11
            },
            {
                product_variant_id: 18
            },
            {
                product_variant_id: 50
            },
            {
                product_variant_id: 2
            },
            {
                product_variant_id: 4
            },
            {
                product_variant_id: 5
            },
            {
                product_variant_id: 22
            },
            {
                product_variant_id: 34
            },
            {
                product_variant_id: 45
            },
            {
                product_variant_id: 46
            },
            {
                product_variant_id: 47
            },
            {
                product_variant_id: 48
            },
            {
                product_variant_id: 49
            },
            {
                product_variant_id: 51
            },
            {
                product_variant_id: 54
            },
            {
                product_variant_id: 57
            },
            {
                product_variant_id: 61
            },
            {
                product_variant_id: 72
            },
            {
                product_variant_id: 80
            },
            {
                product_variant_id: 9
            },
            {
                product_variant_id: 52
            },
            {
                product_variant_id: 44
            },
            {
                product_variant_id: 23
            },
            {
                product_variant_id: 25
            },
            {
                product_variant_id: 26
            },
            {
                product_variant_id: 27
            },
            {
                product_variant_id: 30
            },
            {
                product_variant_id: 31
            },
            {
                product_variant_id: 32
            },
            {
                product_variant_id: 33
            },
            {
                product_variant_id: 35
            },
            {
                product_variant_id: 62
            },
            {
                product_variant_id: 29
            },
            {
                product_variant_id: 36
            },
            {
                product_variant_id: 37
            },
            {
                product_variant_id: 40
            },
            {
                product_variant_id: 41
            },
            {
                product_variant_id: 42
            },
            {
                product_variant_id: 43
            },
            {
                product_variant_id: 55
            },
            {
                product_variant_id: 56
            },
            {
                product_variant_id: 58
            },
            {
                product_variant_id: 59
            },
            {
                product_variant_id: 60
            },
            {
                product_variant_id: 65
            },
            {
                product_variant_id: 67
            },
            {
                product_variant_id: 69
            },
            {
                product_variant_id: 68
            },
            {
                product_variant_id: 87
            },
            {
                product_variant_id: 88
            },
            {
                product_variant_id: 38
            },
            {
                product_variant_id: 6
            },
            {
                product_variant_id: 14
            },
            {
                product_variant_id: 15
            },
            {
                product_variant_id: 53
            }
        ]
    });
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves({
        rows: [{
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }],
        total: [1]
    });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 1, total: 7 },
        { is_active: 0, total: 0 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([{ product_variant_id: 1, total_vendor: 0 }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c1: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);

        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 7,
                total_active_data: 7,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});


test.serial('Should be return list of Sku with nothing sku product', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getAllSKUProducts').resolves({
        rows: [
            {
                product_group_id: 71,
                product_variant_id: 88,
                sku: 'DTFP5MFU8V',
                long_name: 'Test 2: Fill Mandatory Only Success',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 567,
                C2: 150,
                C1: 31,
                C0: 3
            },
            {
                product_group_id: 45,
                product_variant_id: 87,
                sku: '2BT5SHXXIY',
                long_name: 'Motorola - Silver - 64GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 69,
                product_variant_id: 86,
                sku: 'XMD8GQ5S6W',
                long_name: 'ANGSA Bantal Empuk',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121251.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121252.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535121255.jpg"]',
                C3: 310,
                C2: 169,
                C1: 82,
                C0: 14
            },
            {
                product_group_id: 67,
                product_variant_id: 85,
                sku: 'PK9I68T8CK',
                long_name: 'Goody Bag Bizzy Blue 1192',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 66,
                product_variant_id: 84,
                sku: 'P2F33MOTP4',
                long_name: 'Goody Bag Bizzy Blue 15',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 2,
                product_variant_id: 80,
                sku: 'SOZYSCO6SH',
                long_name: 'Apple iPhone 7 - Silver - 164GB',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            },
            {
                product_group_id: 59,
                product_variant_id: 79,
                sku: '8JICUYMB52',
                long_name: 'test data 1',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 58,
                product_variant_id: 78,
                sku: 'BVPCEFNUTU',
                long_name: 'Barang ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 282,
                C2: 280,
                C1: 32,
                C0: 3
            },
            {
                product_group_id: 57,
                product_variant_id: 77,
                sku: '19JN7H8C1W',
                long_name: 'Goody Bag Bizzy Blue 10',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                additional_image: '[]',
                C3: 304,
                C2: 159,
                C1: 50,
                C0: 3
            },
            {
                product_group_id: 56,
                product_variant_id: 76,
                sku: 'MCE7AG0AYY',
                long_name: 'Goody Bag Bizzy Blue 1149',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522644200.png',
                additional_image: '[]',
                C3: 385,
                C2: 133,
                C1: 79,
                C0: 10
            },
            {
                product_group_id: 52,
                product_variant_id: 74,
                sku: '3604JKRAUR',
                long_name: 'Miaww Makanan Kucing - 1Kg',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531473292.jpg',
                additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531478326.png"]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 51,
                product_variant_id: 73,
                sku: 'I4A9V9ZAYU',
                long_name: 'Miaww Makanan Kucing - 500g',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1531472505.jpg',
                additional_image: '[]',
                C3: 319,
                C2: 96,
                C1: 16,
                C0: 1
            },
            {
                product_group_id: 2,
                product_variant_id: 72,
                sku: 'KDVTNR2U6P',
                long_name: 'Apple iPhone 7 - Midnight Black - 512GB ',
                is_active: 1,
                is_discontinue: 0,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/07/product_1530609447.jpg',
                additional_image: '[]',
                C3: 561,
                C2: 219,
                C1: 52,
                C0: 8
            }
        ],
        total: [
            {
                product_variant_id: 78
            },
            {
                product_variant_id: 12
            },
            {
                product_variant_id: 77
            },
            {
                product_variant_id: 84
            },
            {
                product_variant_id: 86
            },
            {
                product_variant_id: 20
            },
            {
                product_variant_id: 13
            },
            {
                product_variant_id: 21
            },
            {
                product_variant_id: 24
            },
            {
                product_variant_id: 39
            },
            {
                product_variant_id: 73
            },
            {
                product_variant_id: 74
            },
            {
                product_variant_id: 16
            },
            {
                product_variant_id: 17
            },
            {
                product_variant_id: 76
            },
            {
                product_variant_id: 79
            },
            {
                product_variant_id: 85
            },
            {
                product_variant_id: 19
            },
            {
                product_variant_id: 7
            },
            {
                product_variant_id: 10
            },
            {
                product_variant_id: 1
            },
            {
                product_variant_id: 3
            },
            {
                product_variant_id: 8
            },
            {
                product_variant_id: 28
            },
            {
                product_variant_id: 11
            },
            {
                product_variant_id: 18
            },
            {
                product_variant_id: 50
            },
            {
                product_variant_id: 2
            },
            {
                product_variant_id: 4
            },
            {
                product_variant_id: 5
            },
            {
                product_variant_id: 22
            },
            {
                product_variant_id: 34
            },
            {
                product_variant_id: 45
            },
            {
                product_variant_id: 46
            },
            {
                product_variant_id: 47
            },
            {
                product_variant_id: 48
            },
            {
                product_variant_id: 49
            },
            {
                product_variant_id: 51
            },
            {
                product_variant_id: 54
            },
            {
                product_variant_id: 57
            },
            {
                product_variant_id: 61
            },
            {
                product_variant_id: 72
            },
            {
                product_variant_id: 80
            },
            {
                product_variant_id: 9
            },
            {
                product_variant_id: 52
            },
            {
                product_variant_id: 44
            },
            {
                product_variant_id: 23
            },
            {
                product_variant_id: 25
            },
            {
                product_variant_id: 26
            },
            {
                product_variant_id: 27
            },
            {
                product_variant_id: 30
            },
            {
                product_variant_id: 31
            },
            {
                product_variant_id: 32
            },
            {
                product_variant_id: 33
            },
            {
                product_variant_id: 35
            },
            {
                product_variant_id: 62
            },
            {
                product_variant_id: 29
            },
            {
                product_variant_id: 36
            },
            {
                product_variant_id: 37
            },
            {
                product_variant_id: 40
            },
            {
                product_variant_id: 41
            },
            {
                product_variant_id: 42
            },
            {
                product_variant_id: 43
            },
            {
                product_variant_id: 55
            },
            {
                product_variant_id: 56
            },
            {
                product_variant_id: 58
            },
            {
                product_variant_id: 59
            },
            {
                product_variant_id: 60
            },
            {
                product_variant_id: 65
            },
            {
                product_variant_id: 67
            },
            {
                product_variant_id: 69
            },
            {
                product_variant_id: 68
            },
            {
                product_variant_id: 87
            },
            {
                product_variant_id: 88
            },
            {
                product_variant_id: 38
            },
            {
                product_variant_id: 6
            },
            {
                product_variant_id: 14
            },
            {
                product_variant_id: 15
            },
            {
                product_variant_id: 53
            }
        ]
    });
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves({ rows: [], total: [] });

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([{ is_active: 1, total: 7 },
        { is_active: 0, total: 0 }]);

    t.context.sandbox.stub(RepoProductVariant, 'getTotalVendor').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c1: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [
                // {
                //     id: 15,
                //     product_group_id: 2,
                //     sku: 'LS5DIEZZWV',
                //     long_name: 'Apple iPhone 7 Black 64GB',
                //     is_active: 1,
                //     is_discontinue: 0,
                //     total_vendor: 3,
                //     total_image: 3
                // }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 7,
                total_active_data: 7,
                total_inactive_data: 0,
                total_page: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            body: {
                name: 'Unit'
            }
        };
        yield Method.getSkuManagement(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});


test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                page: -1,
                limit: -2
            }
        };
        yield Method.getSkuManagement(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
