const dataToDuplicate = {
  vendor_sku: 'SKUOPENAPI2',
  product_sku: 'JZ5DIB3VNT',
  manufacturing_no: 'MPN7PK1781',
  stock: 5000,
  wholesales: [
    {
      tier: 1,
      min: 2,
      unit_price: 10400001,
    },
    {
      tier: 2,
      min: 6,
      unit_price: 10000001,
    },
    {
      tier: 3,
      min: 10,
      unit_price: 9800001,
    },
  ],
  product_status: 1,
};

function dataDuplicate(duplicate) {
  const result = [];
  for (let i = 0; i < duplicate; i += 1) {
    result.push(dataToDuplicate);
  }
  return {
    products: result,
  };
}

module.exports = {
  dataDuplicate,
};
