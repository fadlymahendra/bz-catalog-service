const updateProduct = require('./update_product_data.json');

function updateProdWithValidSKUVendor() {
  const validDataProd = updateProduct.validData;
  const validSKUVendor = JSON.parse(JSON.stringify(validDataProd));
  validSKUVendor.products[0].sku_vendor = 'avcjskjdg123';
  return validSKUVendor;
}

function updateProdWithEmptySKUVendor() {
  const validDataProd = updateProduct.validData;
  const emptySKUVendor = JSON.parse(JSON.stringify(validDataProd));
  emptySKUVendor.products[0].sku_vendor = '';
  return emptySKUVendor;
}

function updateProdWithInvalidSKUVendor() {
  const validDataProd = updateProduct.validData;
  const invalidSKUVendor = JSON.parse(JSON.stringify(validDataProd));
  invalidSKUVendor.products[0].sku_vendor = 'ASDK&JHD$12';
  return invalidSKUVendor;
}

function updateProdWithExistSKUVendor() {
  const validDataProd = updateProduct.validData;
  const existSKUVendor = JSON.parse(JSON.stringify(validDataProd));
  existSKUVendor.products[0].sku_vendor = 'ABSCFD45';
  return existSKUVendor;
}

function updateProdWithActiveDecimal() {
  const validDataProd = updateProduct.validData;
  const activeDecimal = JSON.parse(JSON.stringify(validDataProd));
  activeDecimal.products[0].is_decimal = 1;
  return activeDecimal;
}

function updateProdWithActiveInden() {
  const validDataProd = updateProduct.validData;
  const activeInden = JSON.parse(JSON.stringify(validDataProd));
  activeInden.products[0].is_indent = 1;
  activeInden.products[0].indent_limit= "14";
  activeInden.products[0].indent_period= "week";
  return activeInden;
}

function updateProdWithActiveDP() {
  const validDataProd = updateProduct.validData;
  const activeDP = JSON.parse(JSON.stringify(validDataProd));
  activeDP.products[0].is_indent = 1;
  activeDP.products[0].indent_limit= "14";
  activeDP.products[0].indent_period= "week";
  activeDP.products[0].down_payment_type= 1;
  activeDP.products[0].down_payment_value= 30;
  return activeDP;
}

function updateProdWithActiveDPNonactiveInden() {
  const validDataProd = updateProduct.validData;
  const activeDPNonactivaInden = JSON.parse(JSON.stringify(validDataProd));
  activeDPNonactivaInden.products[0].is_indent = 0;
  activeDPNonactivaInden.products[0].indent_limit= "";
  activeDPNonactivaInden.products[0].indent_period= "";
  activeDPNonactivaInden.products[0].down_payment_type= 1;
  activeDPNonactivaInden.products[0].down_payment_value= 30;
  return activeDPNonactivaInden;
}

function updateProdWithNonactiveDecimal() {
  const validDataProd = updateProduct.validData;
  const activeDecimal = JSON.parse(JSON.stringify(validDataProd));
  activeDecimal.products[0].is_decimal = 0;
  return activeDecimal;
}

function updateProdWithNonactiveInden() {
  const validDataProd = updateProduct.validData;
  const activeInden = JSON.parse(JSON.stringify(validDataProd));
  activeInden.products[0].is_indent = 0;
  activeInden.products[0].indent_limit= "";
  activeInden.products[0].indent_period= "";
  return activeInden;
}

function updateProdWithNonactiveDP() {
  const validDataProd = updateProduct.validData;
  const activeDP = JSON.parse(JSON.stringify(validDataProd));
  activeDP.products[0].is_indent = 0;
  activeDP.products[0].indent_limit= "";
  activeDP.products[0].indent_period= "";
  activeDP.products[0].down_payment_type= 0;
  activeDP.products[0].down_payment_value= 0;
  return activeDP;
}

function updateProdWithInvalidPercentageDP() {
  const validDataProd = updateProduct.validData;
  const activeDP = JSON.parse(JSON.stringify(validDataProd));
  activeDP.products[0].is_indent = 1;
  activeDP.products[0].indent_limit= "14";
  activeDP.products[0].indent_period= "week";
  activeDP.products[0].down_payment_type= 1;
  activeDP.products[0].down_payment_value= 100;
  return activeDP;
}

function updateProdWithInvalidNominalDP() {
  const validDataProd = updateProduct.validData;
  const activeDP = JSON.parse(JSON.stringify(validDataProd));
  activeDP.products[0].is_indent = 1;
  activeDP.products[0].indent_limit= "14";
  activeDP.products[0].indent_period= "week";
  activeDP.products[0].down_payment_type= 2;
  activeDP.products[0].down_payment_value= 120000;
  return activeDP;
}

function updateProdWithInvalidIndenLimit() {
  const validDataProd = updateProduct.validData;
  const activeDP = JSON.parse(JSON.stringify(validDataProd));
  activeDP.products[0].is_indent = 1;
  activeDP.products[0].indent_limit= "53";
  activeDP.products[0].indent_period= "week";
  return activeDP;
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

function errorMessageInvalidDPFlag(SKUVendor) {
  const message = `SKU ${SKUVendor} Not Valid, Downpayment only for Indent Product`;
  return message;
}

function errorMessageInvalidPercentageDP(SKUVendor) {
  const message = `SKU ${SKUVendor} Not valid Downpayment Value Must be 1 - 99 %`;
  return message;
}

function errorMessageInvalidNominalDP(SKUVendor, price) {
  const message = `SKU ${SKUVendor} Not valid Downpayment Value Must be lower than ${price}`;
  return message;
}

function errorMessageInvalidIndenLimit(SKUVendor) {
  const message = `SKU ${SKUVendor} Not Valid, Indent Limit must be Max 52 weeks`;
  return message;
}

module.exports = {
  updateProdWithEmptySKUVendor,
  updateProdWithInvalidSKUVendor,
  updateProdWithValidSKUVendor,
  updateProdWithExistSKUVendor,
  updateProdWithActiveDecimal,
  updateProdWithActiveInden,
  updateProdWithActiveDP,
  updateProdWithActiveDPNonactiveInden,
  updateProdWithNonactiveDecimal,
  updateProdWithNonactiveInden,
  updateProdWithNonactiveDP,
  updateProdWithInvalidPercentageDP,
  updateProdWithInvalidNominalDP,
  updateProdWithInvalidIndenLimit,
  errorMessageEmptySKUVendor,
  errorMessageExistSKUVendor,
  errorMessageInvalidSKUVendor,
  errorMessageInvalidDPFlag,
  errorMessageInvalidPercentageDP,
  errorMessageInvalidNominalDP,
  errorMessageInvalidIndenLimit
};
