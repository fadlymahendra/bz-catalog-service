const querydata = ({
  id: '1515402159491',
});

const putPremoderation = () => ({
  barcode: '0075678164125',
  brand_id: 466,
  brand_image: 'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0000/1549/brand.gif',
  brand_name: 'Epson',
  brand_status: 'clear',
  category: {
    c0: 3,
    c1: 57,
    c2: 183,
    c3: 507,
  },
  category_id: 507,
  description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.↵Performa: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.↵Kompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
  manufacturing_number: 'MPN4060882',
  name: 'Epson Tinta Refill Botol',
  package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
  package_height: '40.00',
  package_length: '100.00',
  package_weight: '400',
  package_width: '200.00',
  product: {
    index: 'UX6HBA',
    variants: {
      attribute_code: 'ink_color',
      attribute_code_label: 'Warna',
      attribute_id: 5,
      attribute_status: 'new',
      attribute_value_id: 0,
      attribute_value_name: 'Cyan',
    },
    variant_value: {
      ink_color: 0,
    },
    is_indent: 0,
    location_label: 'Jakarta selatan',
    primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
    reference_link: [],
    sku_vendor: '',
    stock: 212,
    tier_cogs_price_1: '20000',
    tier_cogs_price_2: '19500',
    tier_cogs_price_3: '19000',
    tier_min_qty_1: '1',
    tier_min_qty_2: '5',
    tier_min_qty_3: '10',
    variant_status: 'pending',
    additional_image: [],
    indent_limit: '',
    indent_period: '',
    warehouse_id: 1,
    warranty_coverage: '',
    warranty_limit: '',
    warranty_option: 'no_warranty',
    warranty_period: '',
  },
  quantity_stocking_uom: 3,
  specification_status: 'clear',
  specifications: {
    attribute_code: 'ink_volume',
    attribute_code_label: 'Volume',
    attribute_id: 6,
    attribute_status: 'clear',
    attribute_textinput: '80ml',
    attribute_type: 'textinput',
  },
  stocking_uom_id: 12,
  uom_id: 5,
  variant_count: 1,
  variant_matrix: 'ink_color',
  product_group_id: 3,
  type: 'existing',
});

const putQtyPremodList = () => ({
  tier_min_qty_1: '1',
  tier_min_qty_2: '50',
  tier_min_qty_3: '100',
  tier_cogs_price_1: '12000',
  tier_cogs_price_2: '11500',
  tier_cogs_price_3: '11100',
});

const putStatusPremodList = () => ({
  is_active: 1,
});
// update visibility
const bodyUpdateVisibility = (status) => {
  const body = putStatusPremodList();
  body.is_active = status;
  return body;
};

// update tiers and price
const bodyUpdateQtyProductList = (minTiers1, minTiers2, minTiers3, price1, price2, price3) => {
  const body = putQtyPremodList();

  body.tier_min_qty_1 = minTiers1;
  body.tier_min_qty_2 = minTiers2;
  body.tier_min_qty_3 = minTiers3;
  body.tier_cogs_price_1 = price1;
  body.tier_cogs_price_2 = price2;
  body.tier_cogs_price_3 = price3;

  return body;
};

const bodyUpdateTiers = (minTiers1, minTiers2, minTiers3, price1, price2, price3, stock) => {
  const body = putPremoderation();

  body.product.tier_min_qty_1 = minTiers1;
  body.product.tier_min_qty_2 = minTiers2;
  body.product.tier_min_qty_3 = minTiers3;
  body.product.tier_cogs_price_1 = price1;
  body.product.tier_cogs_price_2 = price2;
  body.product.tier_cogs_price_3 = price3;
  body.product.stock = stock;

  return body;
};


const bodyUpdateProduct = (name, UOM, stockUOM, qtyStockUOM, desc, content) => {
  const body = putPremoderation();

  body.name = name;
  body.uom_id = UOM;
  body.stocking_uom_id = stockUOM;
  body.quantity_stocking_uom = qtyStockUOM;
  body.description = desc;
  body.package_content = content;

  return body;
};

const bodyUpdateDetailProduct = (weight, length, height, width, warranty, period) => {
  const body = putPremoderation();

  body.product.weight = weight;
  body.product.width = width;
  body.product.length = length;
  body.product.height = height;
  body.product.warranty_option = warranty;
  body.product.warranty_period = period;

  return body;
};

module.exports = {
  querydata,
  putPremoderation,
  putQtyPremodList,
  putStatusPremodList,
  bodyUpdateVisibility,
  bodyUpdateQtyProductList,
  bodyUpdateTiers,
  bodyUpdateProduct,
  bodyUpdateDetailProduct,

};
