const assignedTo = ({
  assign: {
    id: 73,
    email: 'fatkhurozaq.budi@bizzy.co.id',
    name: 'Fathkhurozaq Budi Setiawan',
    type: 'employee',
  },
  products: [
    '1514450425982',
  ],
});

const visibleTrue = ({
  is_active: 1,
});

const visibleFalse = ({
  is_active: 0,
});

const updateSkuImages = ({
  primary_image: 'https://m3.awokcdn.com//upload/resize_cache/iblock/da6/325_280_1/da674220023f1be5faead98aff5a9a2c.png',
  additional_image: [
    'https://target.scene7.com/is/image/Target/51538716?wid=520&hei=520&fmt=pjpeg',
    'https://directvision.eu/image/cache/catalog/APPLE/4_3_71-800x800.jpg',
  ],
});

const updateStock = ({
  stock_available: 1111,
});

const updateStockNegative = ({
  stock_available: -100,
});

const approved = ({
  product_group_id: '14',
});

const rejected = ({
  status: 'rejected',
  reject_reasons: {
    product_data: '',
    sku_list: '',
    product_specification: '',
    description: '',
    product_details: '',
    package_dimension: '',
    warranty: '',
    totally_reject: 'Barang Ilegal',
  },
});

const partialRejected = ({
  status: 'revision_inprogress',
  reject_reasons: {
    product_data: 'data kurang lengkap',
    sku_list: 'sku masih salah',
    product_specification: 'Harap dilengkapi spesifikasinya',
    description: '',
    product_details: '',
    package_dimension: '',
    warranty: '',
    totally_reject: '',
  },
});

// const updateTier = ({
//     "tier_min_qty_1": "1",
//     "tier_min_qty_2": "50",
//     "tier_min_qty_3": "100",
//     "tier_cogs_price_1": "12000",
//     "tier_cogs_price_2": "11500",
//     "tier_cogs_price_3": "11100"
// });


// const updateTierInvalidQty = ({
//     "tier_min_qty_1": "1",
//     "tier_min_qty_2": "100",
//     "tier_min_qty_3": "50",
//     "tier_cogs_price_1": "12000",
//     "tier_cogs_price_2": "11500",
//     "tier_cogs_price_3": "11000"
// });

// const updateTierNegativeQty = ({
//     "tier_min_qty_1": "1",
//     "tier_min_qty_2": "-1",
//     "tier_min_qty_3": "50",
//     "tier_cogs_price_1": "12000",
//     "tier_cogs_price_2": "11500",
//     "tier_cogs_price_3": "11000"
// });

// const updateTierInvalidPrice = ({
//     "tier_min_qty_1": "1",
//     "tier_min_qty_2": "50",
//     "tier_min_qty_3": "100",
//     "tier_cogs_price_1": "12000",
//     "tier_cogs_price_2": "12000",
//     "tier_cogs_price_3": "14000"
// });

const updateProductData = ({
  product_group_id: null,
  type: 'new',
  payload: {
    name: 'Soft Case Macbook Minisooh',
    category_id: 9036,
    category: {
      c0: 5,
      c1: 177,
      c2: 333,
      c3: 9036,
    },
    brand_id: 3315,
    brand_name: 'MINIFLEX',
    brand_status: 'clear',
    brand_image: '',
    uom_id: 7,
    stocking_uom_id: 4,
    quantity_stocking_uom: 2222,
    manufacturing_number: 'NoManufaktur1',
    package_weight: '300',
    package_width: '37',
    package_height: '2.8',
    package_length: '57',
    description: '<p>Miniso Pelindung tas laptop 14 Inch</p><p>Busa tebal dengan resleting ganda yang akan memudahkan anda.</p>',
    package_content: '1 unit softcase Laptop',
    barcode: 'noBarcode1',
    variant_count: 0,
    variant_matrix: [],
    specifications: [],
    specification_status: 'clear',
    products: [
      {
        index: 'YNYHJA',
        variants: [],
        variant_value: 'NO_VARIANT',
        sku_vendor: 'Mini17092018',
        tier_min_qty_1: '1',
        tier_min_qty_2: '7',
        tier_min_qty_3: '',
        tier_cogs_price_1: '99000',
        tier_cogs_price_2: '79000',
        tier_cogs_price_3: '',
        stock: 2222,
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/09/product_1537176799.jpg',
        additional_image: [
          'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/09/product_1537176804.jpg',
          'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/09/product_1537176804.jpg',
          'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/09/product_1537176810.jpg',
        ],
        warehouse_id: 24,
        location_label: 'Jawa Barat',
        warranty_option: 'no_warranty',
        warranty_period: 'year',
        warranty_limit: 2020,
        warranty_coverage: '',
        is_indent: 0,
        indent_period: '',
        indent_limit: 0,
        variant_status: 'complete',
        is_contract: 0,
      },
    ],
  },
});

const updatePremodEmptyMandatory = ({
  description: '',
  name: '',
  package_content: '',
  package_height: '',
  package_length: '',
  package_weight: '',
  package_width: '',
  products: [{
    indent_limit: '',
    indent_period: '',
    index: 'CW2U2R',
    is_indent: 0,
    is_contract: 0,
    location_label: 'Jakarta Utara',
    primary_image: '',
    stock: '',
    tier_cogs_price_1: '',
    tier_cogs_price_2: '',
    tier_cogs_price_3: '',
    tier_min_qty_1: '',
    tier_min_qty_2: '',
    tier_min_qty_3: '',
  }],
  quantity_stocking_uom: 200,
  stocking_uom_id: 1,
  uom_id: 6,

  product_group_id: null,
  type: 'new',

});

const updateProductDataInvalidTierQty = ({
  payload: {
    barcode: '991984',
    brand_id: 1194,
    brand_name: 'Paseo',
    brand_status: 'clear',
    brand_image: null,
    category: {
      c0: 10,
      c1: 63,
      c2: 240,
      c3: 444,
    },
    category_id: 444,
    description: 'Tissue berkualitas premium dengan standar kualitas Internasional. Terbuat dari serat alami. Tissue Paseo memiliki kekuatan dan daya serap serta sentuhan kelembutan untuk Anda. Cocok digunakan untuk seluruh keluarga karena terbuat dari bahan dasar yang higienis, lembut dan alami. Nikmatilah kenyamanan dan kelembutan dari tissue kesayangan Anda',
    manufacturing_number: 'PSO12XX12',
    name: 'Paseo Facial Tissue 68JEXWqq',
    package_content: 'Hanya 1 kotak saja.',
    package_height: '25',
    package_length: '50',
    package_weight: '120',
    package_width: '20',
    products: [{
      additional_image: [],
      indent_limit: '',
      indent_period: '',
      index: 'CW2U2R',
      is_indent: 0,
      is_contract: 0,
      location_label: 'Jakarta Utara',
      primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515253537.jpg',
      reference_link: [],
      sku_vendor: '',
      stock: '20',
      tier_cogs_price_1: '20000',
      tier_cogs_price_2: '19500',
      tier_cogs_price_3: '19000',
      tier_min_qty_1: '1',
      tier_min_qty_2: '50',
      tier_min_qty_3: '10',
      variant_status: 'complete',
      variant_value: 'NO_VARIANT',
      variants: [],
      warehouse_id: 88888,
      warranty_coverage: '',
      warranty_limit: '',
      warranty_option: 'no_warranty',
      warranty_period: '',
    }],
    quantity_stocking_uom: 200,
    specification_status: 'clear',
    specifications: [],
    stocking_uom_id: 1,
    uom_id: 6,
    variant_count: 0,
    variant_matrix: [],
  },
  product_group_id: null,
  type: 'new',

});

const updateProductDataNegativeTierQty = ({
  payload: {
    barcode: '991984',
    brand_id: 1194,
    brand_name: 'Paseo',
    brand_status: 'clear',
    brand_image: '',
    category: {
      c0: 10,
      c1: 63,
      c2: 240,
      c3: 444,
    },
    category_id: 444,
    description: 'Tissue berkualitas premium dengan standar kualitas Internasional. Terbuat dari serat alami. Tissue Paseo memiliki kekuatan dan daya serap serta sentuhan kelembutan untuk Anda. Cocok digunakan untuk seluruh keluarga karena terbuat dari bahan dasar yang higienis, lembut dan alami. Nikmatilah kenyamanan dan kelembutan dari tissue kesayangan Anda',
    manufacturing_number: 'PSO12XX12',
    name: 'Paseo Facial Tissue 68JEXWqq',
    package_content: 'Hanya 1 kotak saja.',
    package_height: '25',
    package_length: '50',
    package_weight: '120',
    package_width: '20',
    products: [{
      additional_image: [],
      indent_limit: '',
      indent_period: '',
      index: 'CW2U2R',
      is_indent: 0,
      is_contract: 0,
      location_label: 'Jakarta Utara',
      primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515253537.jpg',
      reference_link: [],
      sku_vendor: '',
      stock: '20',
      tier_cogs_price_1: '20000',
      tier_cogs_price_2: '19500',
      tier_cogs_price_3: '19000',
      tier_min_qty_1: '1',
      tier_min_qty_2: '-2',
      tier_min_qty_3: '-1',
      variant_status: 'complete',
      variant_value: 'NO_VARIANT',
      variants: [],
      warehouse_id: 88888,
      warranty_coverage: '',
      warranty_limit: '',
      warranty_option: 'no_warranty',
      warranty_period: '',
    }],
    quantity_stocking_uom: 200,
    specification_status: 'clear',
    specifications: [],
    stocking_uom_id: 1,
    uom_id: 6,
    variant_count: 0,
    variant_matrix: [],
  },
  product_group_id: null,
  type: 'new',

});

const updateProductDataInvalidPrice = ({
  payload: {
    barcode: '991984',
    brand_id: 1194,
    brand_name: 'Paseo',
    brand_status: 'clear',
    brand_image: '',
    category: {
      c0: 10,
      c1: 63,
      c2: 240,
      c3: 444,
    },
    category_id: 444,
    description: 'Tissue berkualitas premium dengan standar kualitas Internasional. Terbuat dari serat alami. Tissue Paseo memiliki kekuatan dan daya serap serta sentuhan kelembutan untuk Anda. Cocok digunakan untuk seluruh keluarga karena terbuat dari bahan dasar yang higienis, lembut dan alami. Nikmatilah kenyamanan dan kelembutan dari tissue kesayangan Anda',
    manufacturing_number: 'PSO12XX12',
    name: 'Paseo Facial Tissue 68JEXWqq',
    package_content: 'Hanya 1 kotak saja.',
    package_height: '25',
    package_length: '50',
    package_weight: '120',
    package_width: '20',
    products: [{
      additional_image: [],
      indent_limit: '',
      indent_period: '',
      index: 'CW2U2R',
      is_indent: 0,
      is_contract: 0,
      location_label: 'Jakarta Utara',
      primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515253537.jpg',
      reference_link: [],
      sku_vendor: '',
      stock: '20',
      tier_cogs_price_1: '20000',
      tier_cogs_price_2: '20000',
      tier_cogs_price_3: '21000',
      tier_min_qty_1: '1',
      tier_min_qty_2: '5',
      tier_min_qty_3: '10',
      variant_status: 'complete',
      variant_value: 'NO_VARIANT',
      variants: [],
      warehouse_id: 88888,
      warranty_coverage: '',
      warranty_limit: '',
      warranty_option: 'no_warranty',
      warranty_period: '',
    }],
    quantity_stocking_uom: 200,
    specification_status: 'clear',
    specifications: [],
    stocking_uom_id: 1,
    uom_id: 6,
    variant_count: 0,
    variant_matrix: [],
  },
  product_group_id: null,
  type: 'new',

});


module.exports = {
  assignedTo,
  rejected,
  visibleTrue,
  visibleFalse,
  updateSkuImages,
  partialRejected,
  approved,
  updateStock,
  // updateTier: updateTier,
  // updateTierInvalidQty: updateTierInvalidQty,
  // updateTierInvalidPrice: updateTierInvalidPrice,
  // updateTierNegativeQty: updateTierNegativeQty,
  updateStockNegative,
  updateProductData,
  updatePremodEmptyMandatory,
  updateProductDataInvalidTierQty,
  updateProductDataNegativeTierQty,
  updateProductDataInvalidPrice,
};
