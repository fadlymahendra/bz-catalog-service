const requestProdWithProdGroupData = require('./request_product_data.json');

function reqProductWithInvalidProdGroup() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const tier2LessThanTier1Data = JSON.parse(JSON.stringify(validData));
  tier2LessThanTier1Data.product_group_id = '-1';
  return tier2LessThanTier1Data;
}

function reqProdWithProdGroupQty2LessThanQty1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const tier2LessThanTier1Data = JSON.parse(JSON.stringify(validData));
  tier2LessThanTier1Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  tier2LessThanTier1Data.products[0].tier_min_qty_1 = '5';
  tier2LessThanTier1Data.products[0].tier_min_qty_2 = '3';
  return tier2LessThanTier1Data;
}

function reqProdWithProdGroupQty3LessThanQty2() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const tier3LessThanTier2Data = JSON.parse(JSON.stringify(validData));
  tier3LessThanTier2Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  tier3LessThanTier2Data.products[0].tier_min_qty_2 = '20';
  tier3LessThanTier2Data.products[0].tier_min_qty_3 = '19';
  return tier3LessThanTier2Data;
}

function reqProdWithProdGroupQty2EqualQty1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const tier2EqualTier1Data = JSON.parse(JSON.stringify(validData));
  tier2EqualTier1Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  tier2EqualTier1Data.products[0].tier_min_qty_1 = '5';
  tier2EqualTier1Data.products[0].tier_min_qty_2 = '5';
  return tier2EqualTier1Data;
}

function reqProdWithProdGroupQty3EqualQty2() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const tier3EqualTier2Data = JSON.parse(JSON.stringify(validData));
  tier3EqualTier2Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  tier3EqualTier2Data.products[0].tier_min_qty_3 = '7';
  tier3EqualTier2Data.products[0].tier_min_qty_2 = '7';
  return tier3EqualTier2Data;
}

function reqProdWithProdGroupPrice2MoreThanPrice1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const price2MoreThanPrice1Data = JSON.parse(JSON.stringify(validData));
  price2MoreThanPrice1Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  price2MoreThanPrice1Data.products[0].tier_cogs_price_1 = '10000000';
  price2MoreThanPrice1Data.products[0].tier_cogs_price_2 = '15000000';
  return price2MoreThanPrice1Data;
}

function reqProdWithProdGroupPrice3MoreThanPrice2() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const price3MoreThanPrice2Data = JSON.parse(JSON.stringify(validData));
  price3MoreThanPrice2Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  price3MoreThanPrice2Data.products[0].tier_cogs_price_2 = '9800000';
  price3MoreThanPrice2Data.products[0].tier_cogs_price_3 = '9900000';
  return price3MoreThanPrice2Data;
}

function reqProdWithProdGroupPrice2EqualPrice1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const price2EqualPrice1Data = JSON.parse(JSON.stringify(validData));
  price2EqualPrice1Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  price2EqualPrice1Data.products[0].tier_cogs_price_1 = '10000000';
  price2EqualPrice1Data.products[0].tier_cogs_price_2 = '10000000';
  return price2EqualPrice1Data;
}

function reqProdWithProdGroupPrice3EqualPrice2() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const price3EqualPrice2Data = JSON.parse(JSON.stringify(validData));
  price3EqualPrice2Data.products[0].sku_vendor = 'APIPHFRMM0CH46';
  price3EqualPrice2Data.products[0].tier_cogs_price_2 = '9700000';
  price3EqualPrice2Data.products[0].tier_cogs_price_3 = '9700000';
  return price3EqualPrice2Data;
}

function reqProdWithProdGroupEmptyQtyTier1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const emptyQtyTier1Data = JSON.parse(JSON.stringify(validData));
  emptyQtyTier1Data.products[0].tier_min_qty_1 = '';
  return emptyQtyTier1Data;
}

function reqProdWithProdGroupEmptyPriceTier1() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const emptyPriceTier1Data = JSON.parse(JSON.stringify(validData));
  emptyPriceTier1Data.products[0].tier_cogs_price_1 = '';
  return emptyPriceTier1Data;
}

function reqProdWithProdGroupEmptySKUVendor() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const emptySKUVendor = JSON.parse(JSON.stringify(validData));
  emptySKUVendor.products[0].sku_vendor = '';
  return emptySKUVendor;
}

function reqProdWithProdGroupInvalidSKUVendor() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const invalidSKUVendor = JSON.parse(JSON.stringify(validData));
  invalidSKUVendor.products[0].sku_vendor = 'APIPHFRMM0CHAPIPHF$46';
  return invalidSKUVendor;
}

function reqProdWithProdGroupExistSKUVendor() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const emptySKUVendor = JSON.parse(JSON.stringify(validData));
  emptySKUVendor.products[0].sku_vendor = '';
  return emptySKUVendor;
}

function reqProdWithProdGroupQtyTier1NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const qtyTier1NotString = JSON.parse(JSON.stringify(validData));
  qtyTier1NotString.products[0].tier_min_qty_1 = 1;
  return qtyTier1NotString;
}

function reqProdWithProdGroupQtyTier2NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const qtyTier2NotString = JSON.parse(JSON.stringify(validData));
  qtyTier2NotString.products[0].tier_min_qty_2 = 10;
  return qtyTier2NotString;
}

function reqProdWithProdGroupQtyTier3NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const qtyTier3NotString = JSON.parse(JSON.stringify(validData));
  qtyTier3NotString.products[0].tier_min_qty_3 = 30;
  return qtyTier3NotString;
}

function reqProdWithProdGroupPriceTier1NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const priceTier1NotString = JSON.parse(JSON.stringify(validData));
  priceTier1NotString.products[0].tier_cogs_price_1 = 10000000;
  return priceTier1NotString;
}

function reqProdWithProdGroupPriceTier2NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const priceTier2NotString = JSON.parse(JSON.stringify(validData));
  priceTier2NotString.products[0].tier_cogs_price_2 = 9800000;
  return priceTier2NotString;
}

function reqProdWithProdGroupPriceTier3NotString() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const priceTier3NotString = JSON.parse(JSON.stringify(validData));
  priceTier3NotString.products[0].tier_cogs_price_3 = 9500000;
  return priceTier3NotString;
}

function reqProdWithProdGroupInvalidPercentageDP() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const invalidPercentageDP = JSON.parse(JSON.stringify(validData));
  invalidPercentageDP.products[0].is_indent = 1;
  invalidPercentageDP.products[0].indent_period = 'week';
  invalidPercentageDP.products[0].indent_limit = '4';
  invalidPercentageDP.products[0].down_payment_type = 1;
  invalidPercentageDP.products[0].down_payment_value = 100;
  return invalidPercentageDP;
}

function reqProdWithProdGroupInvalidNominalDP() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const invalidNominalDP = JSON.parse(JSON.stringify(validData));
  invalidNominalDP.products[0].is_indent = 1;
  invalidNominalDP.products[0].indent_period = 'week';
  invalidNominalDP.products[0].indent_limit = '4';
  invalidNominalDP.products[0].down_payment_type = 2;
  invalidNominalDP.products[0].down_payment_value = 9700001;
  return invalidNominalDP;
}

function reqProdWithProdGroupInvalidIndenLimit() {
  const validData = requestProdWithProdGroupData.validReqSkuWithProdGroup;
  const invalidIndenLimit = JSON.parse(JSON.stringify(validData));
  invalidIndenLimit.products[0].is_indent = 1;
  invalidIndenLimit.products[0].indent_period = 'week';
  invalidIndenLimit.products[0].indent_limit = '53';
  return invalidIndenLimit;
}

function errorMessageEmptyQtyTier(tierNumber) {
  const message = `child "products" fails because ["products" at position 0 fails because [child "tier_min_qty_${tierNumber}" fails because ["tier_min_qty_${tierNumber}" is not allowed to be empty]]]`;
  return message;
}

function errorMessageEmptyPriceTier(tierNumber) {
  const message = `child "products" fails because ["products" at position 0 fails because [child "tier_cogs_price_${tierNumber}" fails because ["tier_cogs_price_${tierNumber}" is not allowed to be empty]]]`;
  return message;
}

function errorMessageEmptySKUVendor() {
  const message = 'child "products" fails because ["products" at position 0 fails because [child "sku_vendor" fails because ["sku_vendor" is not allowed to be empty]]]';
  return message;
}

function errorMessageQtyTierMustString(tierNumber) {
  const message = `child "products" fails because ["products" at position 0 fails because [child "tier_min_qty_${tierNumber}" fails because ["tier_min_qty_${tierNumber}" must be a string]]]`;
  return message;
}

function errorMessagePriceTierMustString(tierNumber) {
  const message = `child "products" fails because ["products" at position 0 fails because [child "tier_cogs_price_${tierNumber}" fails because ["tier_cogs_price_${tierNumber}" must be a string]]]`;
  return message;
}

function errorMessageExistSKUVendor(SKUVendor) {
  const message = `SKU ${SKUVendor} already used.`;
  return message;
}

function errorMessageInvalidSKUVendor() {
  const message = 'child "products" fails because ["products" at position 0 fails because [child "sku_vendor" fails because ["sku_vendor" length must be less than or equal to 20 characters long]]]';
  return message;
}

function errorMessageProdutGroupMustBePositive() {
  const message = 'child "product_group_id" fails because ["product_group_id" must be a positive number]';
  return message;
}

module.exports = {
  reqProductWithInvalidProdGroup,
  reqProdWithProdGroupQty2LessThanQty1,
  reqProdWithProdGroupQty3LessThanQty2,
  reqProdWithProdGroupQty2EqualQty1,
  reqProdWithProdGroupQty3EqualQty2,
  reqProdWithProdGroupPrice2MoreThanPrice1,
  reqProdWithProdGroupPrice3MoreThanPrice2,
  reqProdWithProdGroupPrice2EqualPrice1,
  reqProdWithProdGroupPrice3EqualPrice2,
  reqProdWithProdGroupEmptyQtyTier1,
  reqProdWithProdGroupEmptyPriceTier1,
  reqProdWithProdGroupEmptySKUVendor,
  reqProdWithProdGroupExistSKUVendor,
  reqProdWithProdGroupInvalidSKUVendor,
  reqProdWithProdGroupQtyTier1NotString,
  reqProdWithProdGroupQtyTier2NotString,
  reqProdWithProdGroupQtyTier3NotString,
  reqProdWithProdGroupPriceTier1NotString,
  reqProdWithProdGroupPriceTier2NotString,
  reqProdWithProdGroupPriceTier3NotString,
  reqProdWithProdGroupInvalidPercentageDP,
  reqProdWithProdGroupInvalidNominalDP,
  reqProdWithProdGroupInvalidIndenLimit,
  errorMessageEmptyQtyTier,
  errorMessageEmptyPriceTier,
  errorMessageEmptySKUVendor,
  errorMessageQtyTierMustString,
  errorMessagePriceTierMustString,
  errorMessageExistSKUVendor,
  errorMessageInvalidSKUVendor,
  errorMessageProdutGroupMustBePositive,
};
