
const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
chai.use(require('chai-subset'));
const path = require('path');
const base64Converter = require('base64-img');
const bulkUploadApi = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/download-upload/bulk_upload.js');
const productListApi = require('../../../../../page-objects/api/frontoffice/catalog/products/product_list.js');
// const contractDetailApi = require('../../../../../page-objects/api/frontoffice/contract/contract.js'); // commented due to remove S2S to Contract
const responseMessageCode = require('../../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../../helper/userCredential.json');
const common = require('../../../../../helper/common.js');
const testData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/bulk_data.json');
const testDataListProduct = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/vendor_product_list.json');
// const testDataAgreements = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/agreement_details.json'); // commented due to remove S2S to Contract
const schemaAssertion = require('../../../../../helper/schema/bulk_upload/bulk_update.json');

const scenarioNegativeCase = {
  describe: 'As Vendor I able to see warning message if failed my bulk update excel contain wrong data',
  successPostWithValidBody: 'should success update existing products with fill all colomn',
  failedPostBlankMinQty1: 'should failed update existing products with blank Min Qty Tier 1',
  failedPostNegMinQty123: 'should failed update existing products with negative Min Qty Tier 1, Tier 2, Tier 3',
  failedPostStrMinQty123: 'should failed update existing products with string Min Qty Tier 1, Tier 2, Tier 3',
  failedPostDecMinQty123: 'should failed update existing products with decimal Min Qty Tier 1, Tier 2, Tier 3',
  failedPostBlankPrice1: 'should failed update existing products with blank Price Tier 1',
  failedPostNegPrice1: 'should failed update existing products with negative Price Tier 1',
  failedPostBlankPrice23: 'should failed update existing products with blank Price Tier 2 and Tier 3',
  failedPostNegPrice23: 'should failed update existing products with negative Price Tier 2 and Tier 3',
  failedPostAbovePrice1: 'should failed update existing products with Price Tier 1 < Price Tier 2',
  failedPostStrPrice1: 'should failed update existing products with string Price Tier 1',
  failedPostStrPrice2: 'should failed update existing products with string Price Tier 2',
  failedPostBlankQtyBizzy: 'should failed update existing products with blank Bizzy Min Qty',
  failedPostStringQtyBizzy: 'should failed update existing products with string Bizzy Min Qty',
  failedPostNegQtyBizzy: 'should failed update existing products with negative Bizzy Min Qty',
  failedPostDecQtyBizzy: 'should failed update existing products with decimal Bizzy Min Qty',
  failedPostBlankPriceBizzy: 'should failed update existing products with blank Bizzy Price',
  failedPostStringPriceBizzy: 'should failed update existing products with string Bizzy Price',
  failedPostNegPriceBizzy: 'should failed update existing products with negative Bizzy Price',
  failedPostPriceBizzyAboveTier1: 'should failed update existing products with Bizzy Price > Price Tier 1',
  failedPostBlankStock: 'should failed update existing products with blank Stock',
  failedPostStrStock: 'should failed update existing products with string Stock',
  failedPostNegStock: 'should failed update existing products with negative Stock',
  failedPostDecStock: 'should failed update existing products with decimal Stock',
  failedPostBlankGuarantee: 'should failed update existing products with blank Guarantee',
  failedPostWrongGuarantee: 'should failed update existing products with wrong Guarantee',
  failedPostGuaranteeOtherBlank: 'should failed update existing products with Guarantee Yes but Others set to blank',
  failedPostInvalidGuaranteePeriod: 'should failed update existing products with blank Long Period Guarantee',
  failedPostStringLongGuaranteePeriod: 'should failed update existing products with string Long Period Guarantee',
  failedPostZeroLongGuaranteePeriod: 'should failed udpate new products with 0 Long Period Guarantee',
  failedPostCoverageGuarantee: 'should failed update existing products with blank Coverage Guarantee',
  failedPostBlankIndent: 'should failed update existing products with Indent Yes but other set blank',
  failedPostWrongIndentPeriod: 'should failed update existing products with Indent Period set blank',
  failedPostStrIndentPeriod: 'should failed update existing products with Indent Period set string',
  failedPostNegIndentPeriod: 'should failed update existing products with Indent Period set negative',
  failedPostDecIndentPeriod: 'should failed update existing products with Indent Period set decimal',
  failedPostUnregisterProductName: 'should failed update existing products with unregister product',
  failedPostInvalidSKUVendorID: 'should failed upload existing products with invalid SKU ID Vendor',
  failedPostBlankSKUVendorID: 'should failed upload existing products with blank SKU ID Vendor',
  failedPostLongSKUVendorID: 'should failed upload existing products with more than 20 characters SKU ID Vendor',
  failedPostDuplicateSKUVendorID: 'should failed upload existing products with duplicate SKU ID Vendor',
};

const scenarioEditBulk = {
  describe: 'As Vendor I want to edit my product via bulk update and able to see the changes in product details',
  successPostWithUpdateSingleTier: 'should success update existing products with change multi tier to single tier',
  successGetListWithUpdateSingleTier: 'should success get list detail products after change multi tier to single tier',
  successGetListWithUpdateZeroStock: 'should success get list detail products after add product with stock 0',
  // successGetContractUpdateSingleTier: 'should success get base price at contract after change multi tier to single tier', //remove contract
  successPostWithDefault: 'should success update existing products with default data',
  successGetListProductWithDefault: 'should success get list detail products after post default data',
  // successGetContractDefault: 'should success get base price at contract', //remove contract
  successPostRestore: 'should success update existing products with initialize data',
  successGetListProductWithRestore: 'should success get list detail products after restore the initialize data',
  // successGetContractRestore: 'should success get base price at contract after restore the initialize data', //remove contract
};

const scenarioErrorMessage = {
  describe: 'As Vendor I able to see warning message if failed my bulk update excel more than 2000 Sku',
  failedPostUpdateSKU: 'should failed upload existing products with SKU more than 2000',
};

describe(scenarioNegativeCase.describe, () => {
  let token;
  let resp;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - Negative Case.xlsx'); // temporary file
    const orgId = testData.vendor.dj2.orgId;
    bodyData.data = base64Converter.base64Sync(pathXls);
    resp = await bulkUploadApi.postUpdateProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
  });

  it(`@happy ${scenarioNegativeCase.successPostWithValidBody}`, async () => {
    const respError = resp.body.data[0].error;
    expect(respError).to.be.an('array').that.is.empty;
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankMinQty1}`, async () => {
    const respError = resp.body.data[1].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankMinQty1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegMinQty123}`, async () => {
    const respError = resp.body.data[2].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError[3]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(4);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStrMinQty123}`, async () => {
    const respError = resp.body.data[3].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError[3]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(4);
  });

  it(`@neg ${scenarioNegativeCase.failedPostDecMinQty123}`, async () => {
    const respError = resp.body.data[4].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError[3]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(4);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankPrice1}`, async () => {
    const respError = resp.body.data[5].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankPrice1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegPrice1}`, async () => {
    const respError = resp.body.data[6].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankPrice23}`, async () => {
    const respError = resp.body.data[7].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegPrice23}`, async () => {
    const respError = resp.body.data[8].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier2);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPriceTier3);
    expect(respError[2]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${scenarioNegativeCase.failedPostAbovePrice1}`, async () => {
    const respError = resp.body.data[9].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongTier2To1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongTier3To1);
    expect(respError[2]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStrPrice1}`, async () => {
    const respError = resp.body.data[10].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStrPrice2}`, async () => {
    const respError = resp.body.data[11].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier2);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankQtyBizzy}`, async () => {
    const respError = resp.body.data[12].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankMinQty1); // change warning
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStringQtyBizzy}`, async () => {
    const respError = resp.body.data[13].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1); // change warning
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegQtyBizzy}`, async () => {
    const respError = resp.body.data[14].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1); // change warning
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostDecQtyBizzy}`, async () => {
    const respError = resp.body.data[15].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1); // change warning
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankPriceBizzy}`, async () => {
    const respError = resp.body.data[16].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankPrice1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStringPriceBizzy}`, async () => {
    const respError = resp.body.data[17].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegPriceBizzy}`, async () => {
    const respError = resp.body.data[18].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostPriceBizzyAboveTier1}`, async () => {
    const respError = resp.body.data[19].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongTier2To1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankStock}`, async () => {
    const respError = resp.body.data[20].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStrStock}`, async () => {
    const respError = resp.body.data[21].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegStock}`, async () => {
    const respError = resp.body.data[22].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostDecStock}`, async () => {
    const respError = resp.body.data[23].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankGuarantee}`, async () => {
    const respError = resp.body.data[24].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeType);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[2]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${scenarioNegativeCase.failedPostWrongGuarantee}`, async () => {
    const respError = resp.body.data[25].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError[2]).to.equal(testData.errorMessage.wrongGuranteeType);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${scenarioNegativeCase.failedPostGuaranteeOtherBlank}`, async () => {
    const respError = resp.body.data[26].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostInvalidGuaranteePeriod}`, async () => {
    const respError = resp.body.data[27].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError[1]).to.equal(testData.errorMessage.wrongGuranteePeriode);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStringLongGuaranteePeriod}`, async () => {
    const respError = resp.body.data[28].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongLongGuarantee);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostZeroLongGuaranteePeriod}`, async () => {
    const respError = resp.body.data[29].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(1);
  });

  // Current: set as optional
  // it(`@neg ${scenarioNegativeCase.failedPostCoverageGuarantee}`, async () => {
  //   const respError = resp.body.data[30].error;
  //   expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeCoverage);
  //   expect(respError.length).to.equal(1);
  // });

  it(`@neg ${scenarioNegativeCase.failedPostBlankIndent}`, async () => {
    const respError = resp.body.data[31].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankIndentPeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankIndentProcess);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostWrongIndentPeriod}`, async () => {
    const respError = resp.body.data[32].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankIndentProcess);
    expect(respError[1]).to.equal(testData.errorMessage.wrongIndentPeriodeValid);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${scenarioNegativeCase.failedPostStrIndentPeriod}`, async () => {
    const respError = resp.body.data[33].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriode);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostNegIndentPeriod}`, async () => {
    const respError = resp.body.data[34].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriode);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostDecIndentPeriod}`, async () => {
    const respError = resp.body.data[35].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriode);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostUnregisterProductName}`, async () => {
    const respError = resp.body.data[36].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongProductName);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostInvalidSKUVendorID}`, async () => {
    const respError = resp.body.data[37].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostBlankSKUVendorID}`, async () => {
    const respError = resp.body.data[38].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostLongSKUVendorID}`, async () => {
    const respError = resp.body.data[39].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${scenarioNegativeCase.failedPostDuplicateSKUVendorID}`, async () => {
    const respError = resp.body.data[40].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongDuplicateSKUVendorID);
    expect(respError.length).to.equal(1);
  });
});

describe(`${scenarioEditBulk.describe}`, () => {
  let token;
  let orgId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    orgId = testData.vendor.dj2.orgId;
  });

  it(`@happy ${scenarioEditBulk.successPostWithUpdateSingleTier}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - Positive Case 2.xlsx'); // temporary file
    bodyData.data = base64Converter.base64Sync(pathXls);
    const resp = await bulkUploadApi.postUpdateProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseValidBulkUpdate);
  });

  it(`@happy ${scenarioEditBulk.successGetListWithUpdateSingleTier}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testDataListProduct.successGetListProducts));
    bodyData.search = testDataListProduct.successPostWithUpdateSingleTier.sku;
    const resp = await productListApi.getVendorProductList(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.data[0]).to.containSubset(testDataListProduct.successPostWithUpdateSingleTier);
  });

  it(`@happy ${scenarioEditBulk.successGetListWithUpdateZeroStock}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testDataListProduct.successGetListProducts));
    bodyData.search = testDataListProduct.successGetListWithUpdateZeroStock.sku;
    const resp = await productListApi.getVendorProductList(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.data[0]).to.containSubset(testDataListProduct.successGetListWithUpdateZeroStock);
  });

  // Current: remove checking on contract
  // it(`@happy ${testScenario2.successGetContractUpdateSingleTier}`, async () => {
  //   const resp = await contractDetailApi.getAgreementDetails(testData.vendor.dj2.agreementId, token);
  //   expect(resp.status).to.equal(responseMessageCode.successOk);
  //   const priceRules = resp.body.data.price_rule[0].price_rule_items;
  //   const priceRulesItems = priceRules.find(priceRule => priceRule.sku_number === testData.vendor.dj2.skuIdEpsonMagenta);
  //   expect(priceRulesItems).to.containSubset(testDataAgreements.successGetContractUpdateSingleTier);
  // });

  it(`@happy ${scenarioEditBulk.successPostWithDefault}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - Positive Case 1.xlsx'); // temporary file
    bodyData.data = base64Converter.base64Sync(pathXls);
    const resp = await bulkUploadApi.postUpdateProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseValidBulkUpdate);
  });

  it(`@happy ${scenarioEditBulk.successGetListProductWithDefault}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testDataListProduct.successGetListProducts));
    bodyData.search = testDataListProduct.successGetListProductWithDefault.sku;
    const resp = await productListApi.getVendorProductList(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.data[0]).to.containSubset(testDataListProduct.successGetListProductWithDefault);
  });

  // Remove S2S to Contract
  // it(`@happy ${testScenario2.successGetContractDefault}`, async () => {
  //   const resp = await contractDetailApi.getAgreementDetails(testData.vendor.dj2.agreementId, token);
  //   expect(resp.status).to.equal(responseMessageCode.successOk);
  //   const priceRules = resp.body.data.price_rule[0].price_rule_items;
  //   const priceRulesItems = priceRules.find(priceRule => priceRule.sku_number === testData.vendor.dj2.skuIdEpsonMagenta);
  //   expect(priceRulesItems).to.containSubset(testDataAgreements.successGetPriceRulesItemWithDefault);
  // });

  it(`@happy ${scenarioEditBulk.successPostRestore}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - Positive Case Default.xlsx'); // temporary file
    bodyData.data = base64Converter.base64Sync(pathXls);
    const resp = await bulkUploadApi.postUpdateProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.success).to.equal(true);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseValidBulkUpdate);
  });

  it(`@happy ${scenarioEditBulk.successGetListProductWithRestore}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testDataListProduct.successGetListProducts));
    bodyData.search = testDataListProduct.successPostWithRestore.sku;
    const resp = await productListApi.getVendorProductList(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.data[0]).to.containSubset(testDataListProduct.successPostWithRestore);
  });

  // Remove S2S to Contract
  // it(`@happy ${testScenario2.successGetContractRestore}`, async () => {
  //   const resp = await contractDetailApi.getAgreementDetails(testData.vendor.dj2.agreementId, token);
  //   expect(resp.status).to.equal(responseMessageCode.successOk);
  //   const priceRules = resp.body.data.price_rule[0].price_rule_items;
  //   const priceRulesItems = priceRules.find(priceRule => priceRule.sku_number === testData.vendor.dj2.skuIdEpsonMagenta);
  //   expect(priceRulesItems).to.containSubset(testDataAgreements.successGetContractRestore);
  // });
});

describe(scenarioErrorMessage.describe, () => {
  let token;
  let resp;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - 21Sep2018.xlsx'); // temporary file
    const orgId = testData.vendor.dj2.orgId;
    bodyData.data = base64Converter.base64Sync(pathXls);
    resp = await bulkUploadApi.postUpdateProducts(orgId, bodyData, token);
  });

  it(`@neg @1${scenarioErrorMessage.failedPostUpdateSKU}`, async () => {
    expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseInvalidBulkUpdate);
  });
});
