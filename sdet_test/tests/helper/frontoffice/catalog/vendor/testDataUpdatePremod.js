const updatePremoderation = require('./update_premod_data.json');

function updatePremodWithEmptySKUVendor() {
  const validData = updatePremoderation.validUpdateProductData;
  const emptySKUVendor = JSON.parse(JSON.stringify(validData));
  emptySKUVendor.payload.products[0].sku_vendor = '';
  return emptySKUVendor;
}

function updatePremodWithValidSKUVendor() {
  const validData = updatePremoderation.validUpdateProductData;
  const validSKUVendor = JSON.parse(JSON.stringify(validData));
  validSKUVendor.payload.products[0].sku_vendor = 'avcjskjdg123';
  return validSKUVendor;
}

function updatePremodWithInvalidSKUVendor() {
  const validData = updatePremoderation.validUpdateProductData;
  const invalidSKUVendor = JSON.parse(JSON.stringify(validData));
  invalidSKUVendor.payload.products[0].sku_vendor = 'ASDK&JHD$12';
  return invalidSKUVendor;
}

function updatePremodWithExistSKUVendor() {
  const validData = updatePremoderation.validUpdateProductData;
  const existSKUVendor = JSON.parse(JSON.stringify(validData));
  existSKUVendor.payload.products[0].sku_vendor = '2D3E436E5F';
  return existSKUVendor;
}

function errorMessageEmptySKUVendor() {
  const message = 'child "products" fails because ["products" at position 0 fails because [child "sku_vendor" fails because ["sku_vendor" is not allowed to be empty]]]';
  return message;
}

function errorMessageExistSKUVendor(SKUVendor) {
  const message = `SKU ${SKUVendor} already used.`;
  return message;
}

function errorMessageInvalidSKUVendor(SKUVendor) {
  const message = `SKU ${SKUVendor} can not contains symbol.`;
  return message;
}

function successMessageUpdateValidSKUVendor() {
  const message = 'Product berhasil diubah';
  return message;
}

module.exports = {
  updatePremodWithEmptySKUVendor,
  updatePremodWithInvalidSKUVendor,
  updatePremodWithValidSKUVendor,
  updatePremodWithExistSKUVendor,
  errorMessageEmptySKUVendor,
  errorMessageExistSKUVendor,
  errorMessageInvalidSKUVendor,
  successMessageUpdateValidSKUVendor,
};
