function errorMessageInvalidPercentageDP(sku) {
  const message = `SKU ${sku} Not valid Downpayment Value Must be 1 - 99 %`;
  return message;
}

function errorMessageInvalidNominalDP(sku, price) {
  const message = `SKU ${sku} Not valid Downpayment Value Must be lower than ${price}`;
  return message;
}

function errorMessageInvalidIndentLimit(sku) {
  const message = `SKU ${sku} Not Valid, Indent Limit must be Max 52 weeks`;
  return message;
}

module.exports = {
  errorMessageInvalidPercentageDP,
  errorMessageInvalidNominalDP,
  errorMessageInvalidIndentLimit,
};
