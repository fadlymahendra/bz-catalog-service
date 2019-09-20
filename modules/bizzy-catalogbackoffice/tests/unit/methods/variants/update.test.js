'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const VariantAdapter = require('../../../../src/utils/adapter/variants');
const AttributeSetRepo = require('../../../../src/repositories/attribute_set');
const AttributeCodeRepo = require('../../../../src/repositories/attribute_code');
const AttributeValueRepo = require('../../../../src/repositories/attribute_value');
const ProductGroupRepo = require('../../../../src/repositories/product_group');
const RawRepo = require('../../../../src/repositories/raw_query');
const CategoryRepo = require('../../../../src/repositories/category');
const VariantLogRepo = require('../../../../src/repositories/variant_log');
const Methods = require('../../../../src/methods/variants/update');

const validPayload = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna Case',
        description: '',
        value: [
            'Red',
            'Silver'
        ]
    }
};

const validPayloadCase2 = {
    path: {
        id: '1'
    },
    body: {
        label: 'Warna Case',
        description: 'This is Phone Color',
        category: 504,
        value: [
            'Red',
            'Silver'
        ]
    }
};

const validPayloadCase3 = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna',
        description: '',
        value: [
            'Silver',
            'blue'
        ]
    }
};

const validPayloadCase4 = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna',
        description: '',
        value: [
            'Red',
            'silver',
            'black'
        ]
    }
};

const validPayloadCase5 = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna',
        description: '',
        value: [
            'Red'
        ]
    }
};

const validPayloadCase6 = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna',
        description: '',
        value: [
            'Red',
            'Silver'
        ]
    }
};

const validPayloadCase7 = {
    path: {
        id: '1'
    },
    body: {
        category: 520,
        label: 'Warna',
        description: '',
        value: [
            'Red',
            'red'
        ]
    }
};


const invalidPayload = {
    path: {
        ids: '1'
    },
    body: {
        ids: '1'
    }
};

const resVariant = {
    id: 1,
    category_id: 520,
    AttributeCode: {
        code: 'phone_color',
        label: 'Warna',
        description: '',
        AttributeValues: [
            {
                id: 5,
                value: 'Red'
            },
            {
                id: 6,
                value: 'Silver'
            }
        ]
    }
};

const resProductGroup = [
    {
        id: 1,
        ProductVariants: [
            {
                id: 1,
                variant_value: 'NO_VARIANT'
            }
        ]
    }
];

const resProductGroupExistVariant = [
    {
        id: 1,
        ProductVariants: [
            {
                id: 1,
                variant_value: '{"phone_color": 5}'
            },
            {
                id: 2,
                variant_value: '{"phone_color": 6}'
            }
        ]
    }
];

const resCategory = {
    id: '504',
    name: 'Phone and Electronic'
};

const resCatBreakdown = [{
    category0_id: 8,
    category0_name: 'IT and Mobile Devices',
    category0_unspsc: 43000000,
    category1_id: 52,
    category1_name: 'Communications Devices & Accessories',
    category1_unspsc: 43190000,
    category2_id: 219,
    category2_name: 'Personal communication devices',
    category2_unspsc: 43191500,
    category3_id: 561,
    category3_name: 'Mobile phones',
    category3_unspsc: 43191501
}];

const resSKUByAttributeCode = [
    {
        id: 1
    },
    {
        id: 2
    }
];

const resCategoryFindOne = {
    id: 1,
    name: 'Mobile Phone'
};

const validContext = require('../../../mocks/context.json');


test.serial('Successfull update Variant, update label variant', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategoryFindOne);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.mock(RawRepo).expects('updateAttributeCode').resolves(true).atLeast(2);

    try {
        yield Methods.putVariant(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull update Variant, update description, category variant', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves([]);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull update Variant, update label, category variant', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves([]);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Successfull update Variant, add new variant value', function* (t) {
    
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase3, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull update Variant, add new variant value with nothing to delete', function* (t) {
   
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase4, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull update Variant, delete variant value, with nothing to add', function* (t) {
   
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase5, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Successfull update Variant, nothing new variant value but delete the existing', function* (t) {

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase4, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Failed update Variant, Tidak ada data dirubah', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategoryFindOne);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase6, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Failed update Variant, Duplikasi Nilai Variant', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategoryFindOne);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase7, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Failed update Variant, update label, category variant, label already registered', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves([]);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves({
        id: 1
    });
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed update Variant, update label, category variant, label already registered', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([]);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves([]);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves({
        id: 1
    });

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed update Variant, variant already registered with skus', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.mock(VariantAdapter).expects('findByIdVariant').resolves(resVariant).atLeast(2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantLogRepo, 'insertMany').resolves(true);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves(resSKUByAttributeCode);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, variant tidak dapat dihapus', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(resVariant);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroupExistVariant);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);
    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    try {
        yield Methods.putVariant(validPayloadCase3, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, category baru tidak ditemukan', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(resVariant);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroupExistVariant);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(null);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);
    t.context.sandbox.stub(DBContext, 'getInstance').returns({
        context: {
            and: (e, r, s) => { return true; },
            where: (e, r) => { return true; },
            col: (e) => { return true; },
            fn: (f) => { return true; }
        },
        ORMProvider: {
            Op: {
                in: true
            }
        }
    });

    try {
        yield Methods.putVariant(validPayloadCase2, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, variant tidak ditemukan', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(null);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);
    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([]);

    try {
        yield Methods.putVariant(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, update reject by database', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(resVariant);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').rejects();
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves(resCatBreakdown);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategoryFindOne);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, variant tidak ditemukan', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(resVariant);
    t.context.sandbox.stub(ProductGroupRepo, 'findAllSkuByCategory').resolves(resProductGroup);
    t.context.sandbox.stub(CategoryRepo, 'findOne').resolves(resCategory);

    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'insertMany').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([]);
    t.context.sandbox.stub(AttributeCodeRepo, 'findOne').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'replaceAttributeCode').resolves(true);

    try {
        yield Methods.putVariant(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, Not Authorized', function* (t) {
    try {
        yield Methods.putVariant(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Update Variant, Payload Not Valid', function* (t) {
    try {
        yield Methods.putVariant(invalidPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
