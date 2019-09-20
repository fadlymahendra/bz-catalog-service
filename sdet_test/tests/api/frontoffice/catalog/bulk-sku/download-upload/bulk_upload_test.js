
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const path = require('path');
const base64Converter = require('base64-img');
const bulkUploadApi = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/download-upload/bulk_upload.js');
const responseMessageCode = require('../../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../../helper/userCredential.json');
const common = require('../../../../../helper/common.js');
const testData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/bulk_data.json');

const testScenario = {
  describe: 'As Vendor I able to see warning message if failed my bulk upload excel contain wrong data',
  successPostWithValidBody: 'should success upload new products with fill all colomn',
  successPostWithNonMandatory: 'should success upload new products without fill all non mandatory colomn',
  failedPostBlankProductName: 'should failed upload new products with blank Product Name',
  failedPostBlankBrand: 'should failed upload new products with blank Brand ID', // not yet
  failedPostUnregisterBrand: 'should failed upload new products with unregistered Brand ID',
  failedPostUnregisterBrandSubset: 'should failed upload new products with unregistered Brand ID with Subset String',
  failedPostBlankDesc: 'should failed upload new products with blank Desciprion',
  failedPostWrongDesc: 'should failed upload new products with desciprion below 30 char',
  failedPostBlankContentPack: 'should failed upload new products with blank Isi Dalam Kemasan',
  // failedPostBlankUnspc: 'should failed upload new products with blank UNSPC',
  failedPostWrongUnspc: 'should failed upload new products with unregistered UNSPC',
  failedPostWrongUnspcSubset: 'should failed upload new products with unregistered UNSPC subset',
  failedPostBlankUom: 'should failed upload new products with blank UOM',
  failedPostWrongUom: 'should failed upload new products with unregistered UOM',
  failedPostBlankStockUom: 'should failed upload new products with blank Stock UOM',
  failedPostWrongStockUom: 'should failed upload new products with unregistered Stock UOM',
  failedPostBlankQtyStockUom: 'should failed upload new products with blank Total Stock UOM',
  failedPostStrQtyStockUom: 'should failed upload new products with string Total Stock UOM',
  failedPostDecQtyStockUom: 'should failed upload new products with decimal point Total Stock UOM',
  failedPostNegQtyStockUom: 'should failed upload new products with negative Total Stock UOM',
  failedPostZeroQtyStockUom: 'should failed upload new products with 0 Total Stock UOM',
  failedPostBlankWeight: 'should failed upload new products with blank Weight',
  failedPostStrWeight: 'should failed upload new products with string Weight',
  failedPostZeroWeight: 'should failed upload new products with 0 Weight',
  failedPostNegWeight: 'should failed upload new products with negative Weight',
  failedPostBlankDimension: 'should failed upload new products with blank Dimension',
  failedPostZeroDimension: 'should failed upload new products with 0 Dimension',
  failedPostNegDimension: 'should failed upload new products with negative Dimension',
  failedPostStrDimension: 'should failed upload new products with string Dimension',
  failedPostBlankMinQty1: 'should failed upload new products with blank Min Qty Tier 1',
  failedPostNegMinQty123: 'should failed upload new products with negative Min Qty Tier 1, Tier 2, Tier 3',
  failedPostStrMinQty123: 'should failed upload new products with string Min Qty Tier 1, Tier 2, Tier 3',
  failedPostDecMinQty123: 'should failed upload new products with decimal Min Qty Tier 1, Tier 2, Tier 3',
  failedPostBlankPrice1: 'should failed upload new products with blank Price Tier 1',
  failedPostNegPrice1: 'should failed upload new products with negative Price Tier 1',
  failedPostBlankPrice23: 'should failed upload new products with blank Price Tier 2 and Tier 3',
  failedPostNegPrice23: 'should failed upload new products with negative Price Tier 2 and Tier 3',
  failedPostAbovePrice1: 'should failed upload new products with Price Tier 1 < Price Tier 2',
  failedPostStrPrice1: 'should failed upload new products with string Price Tier 1',
  failedPostStrPrice2: 'should failed upload new products with string Price Tier 2',
  failedPostBlankStock: 'should failed upload new products with blank Stock',
  failedPostStrStock: 'should failed upload new products with string Stock',
  failedPostNegStock: 'should failed upload new products with negative Stock',
  failedPostDecStock: 'should failed upload new products with decimal Stock',
  failedPostBlankGuarantee: 'should failed upload new products with blank Guarantee',
  failedPostWrongGuarantee: 'should failed upload new products with wrong Guarantee',
  failedPostGuaranteeOtherBlank: 'should failed upload new products with Guarantee Yes but Others set to blank',
  failedPostInvalidGuaranteePeriod: 'should failed upload new products with blank Long Period Guarantee',
  failedPostStringLongGuaranteePeriod: 'should failed upload new products with string Long Period Guarantee',
  failedPostZeroLongGuaranteePeriod: 'should failed upload new products with 0 Long Period Guarantee',
  failedPostCoverageGuarantee: 'should failed upload new products with blank Coverage Guarantee',
  failedPostBlankIndent: 'should failed upload new products with Indent Yes but other set blank',
  failedPostWrongIndentPeriod: 'should failed upload new products with Indent Period set blank',
  failedPostStrIndentPeriod: 'should failed upload new products with Indent Period set string',
  failedPostNegIndentPeriod: 'should failed upload new products with Indent Period set negative',
  failedPostDecIndentPeriod: 'should failed upload new products with Indent Period set decimal',
  failedPostInvalidSKUVendorID: 'should failed upload new products with invalid SKU ID Vendor',
  failedPostBlankSKUVendorID: 'should failed upload new products with blank SKU ID Vendor',
  failedPostLongSKUVendorID: 'should failed upload new products with more than 20 characters SKU ID Vendor',
  failedPostDuplicateSKUVendorID: 'should failed upload new products with same SKU ID Vendor',
  successPostZeroStock: 'should success upload new products with 0 Stock',
  failedPostInvalidDPType: 'should failed upload new products with invalid down payment type',
  failedPostInvalidPercentageDP: 'should failed upload new products with invalid percentage down payment',
  failedPostInvalidNominalDP: 'should failed upload new products with invalid nominal down payment',
  failedPostBlankDP: 'should failed upload new products with blank down payment',
  failedPostBlankDecimal: 'should failed upload new products with blank decimal type',
  failedPostBlankTimeIndent: 'should failed upload new products with blank time indent process and periode inden filled',
  failedPostInvalidTimeIndenDay: 'should failed upload new products with invalid time inden day',
  failedPostInvalidTimeIndenWeek: 'should failed upload new products with invalid time inden week',
  failedPostInvalidPeriodeInden: 'should failed upload new products with invalid periode inden',
  failedPostBelowMinimumTimeIndenDay: 'should failed upload new products with time inden below 7 days',
  failedPostBelowMinimumTimeIndenWeek: 'should failed upload new products with time inden below 1 week',
  failedPostBelowMinimumPercentageDP: 'should failed upload new products with percentage DP below 1%',
  failedPostBelowMinimumNominalDP: 'should failed upload new products with percentage DP below Rp.1',
};

describe(`${testScenario.describe}`, () => {
  let token;
  let resp;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Upload Produk ke Bizzy - 15Agu2018.xlsx'); // temporary file
    bodyData.data = base64Converter.base64Sync(pathXls);
    resp = await bulkUploadApi.postAddProducts(testData.vendor.dj2.orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successCreated);
  });

  it(`@happy ${testScenario.successPostWithValidBody}`, async () => {
    const respError = resp.body.data[0].error;
    expect(respError).to.be.an('array').that.is.empty;
  });

  it(`@happy ${testScenario.successPostWithNonMandatory}`, async () => {
    const respError = resp.body.data[1].error;
    expect(respError).to.be.an('array').that.is.empty;
  });

  it(`@neg ${testScenario.failedPostBlankProductName}`, async () => {
    const respError = resp.body.data[2].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankProductName);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostUnregisterBrand}`, async () => {
    const respError = resp.body.data[4].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongBrand);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostUnregisterBrandSubset}`, async () => {
    const respError = resp.body.data[5].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongBrand);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankDesc}`, async () => {
    const respError = resp.body.data[6].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankDescription);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostWrongDesc}`, async () => {
    const respError = resp.body.data[7].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongDescription);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankContentPack}`, async () => {
    const respError = resp.body.data[8].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankIsi);
    expect(respError.length).to.equal(1);
  });

  // it(`@neg ${testScenario.failedPostBlankUnspc}`, async () => {
  //   const respError = resp.body.data[9].error;
  //   expect(respError[0]).to.equal(testData.errorMessage.wrongUnspsc);
  //   expect(respError.length).to.equal(1);
  // });

  it(`@neg ${testScenario.failedPostWrongUnspc}`, async () => {
    const respError = resp.body.data[10].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongUnspsc);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostWrongUnspcSubset}`, async () => {
    const respError = resp.body.data[11].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongUnspsc);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankUom}`, async () => {
    const respError = resp.body.data[12].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostWrongUom}`, async () => {
    const respError = resp.body.data[13].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankStockUom}`, async () => {
    const respError = resp.body.data[14].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostWrongStockUom}`, async () => {
    const respError = resp.body.data[15].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankQtyStockUom}`, async () => {
    const respError = resp.body.data[16].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongQtyStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostStrQtyStockUom}`, async () => {
    const respError = resp.body.data[17].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongQtyStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostDecQtyStockUom}`, async () => {
    const respError = resp.body.data[18].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongQtyStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegQtyStockUom}`, async () => {
    const respError = resp.body.data[19].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongQtyStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostZeroQtyStockUom}`, async () => {
    const respError = resp.body.data[20].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongQtyStockUom);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankWeight}`, async () => {
    const respError = resp.body.data[21].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankWeight);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostStrWeight}`, async () => {
    const respError = resp.body.data[22].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongWeight);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostZeroWeight}`, async () => {
    const respError = resp.body.data[23].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankWeight);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegWeight}`, async () => {
    const respError = resp.body.data[24].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongWeight);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankDimension}`, async () => {
    const respError = resp.body.data[25].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankHeight);
    expect(respError[1]).to.equal(testData.errorMessage.blankWidth);
    expect(respError[2]).to.equal(testData.errorMessage.blankLong);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostZeroDimension}`, async () => {
    const respError = resp.body.data[26].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankHeight);
    expect(respError[1]).to.equal(testData.errorMessage.blankWidth);
    expect(respError[2]).to.equal(testData.errorMessage.blankLong);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostNegDimension}`, async () => {
    const respError = resp.body.data[27].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongHeight);
    expect(respError[1]).to.equal(testData.errorMessage.wrongWidth);
    expect(respError[2]).to.equal(testData.errorMessage.wrongLong);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostStrDimension}`, async () => {
    const respError = resp.body.data[28].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongHeight);
    expect(respError[1]).to.equal(testData.errorMessage.wrongWidth);
    expect(respError[2]).to.equal(testData.errorMessage.wrongLong);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostBlankMinQty1}`, async () => {
    const respError = resp.body.data[29].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankMinQty1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegMinQty123}`, async () => {
    const respError = resp.body.data[30].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostStrMinQty123}`, async () => {
    const respError = resp.body.data[31].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostDecMinQty123}`, async () => {
    const respError = resp.body.data[32].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongMinQty1);
    expect(respError[1]).to.equal(testData.errorMessage.wrongMinQty2);
    expect(respError[2]).to.equal(testData.errorMessage.wrongMinQty3);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostBlankPrice1}`, async () => {
    const respError = resp.body.data[33].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankPrice1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegPrice1}`, async () => {
    const respError = resp.body.data[34].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankPrice23}`, async () => {
    const respError = resp.body.data[35].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegPrice23}`, async () => {
    const respError = resp.body.data[36].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier2);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPriceTier3);
    expect(respError[2]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostAbovePrice1}`, async () => {
    const respError = resp.body.data[37].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError[1]).to.equal(testData.errorMessage.wrongTier2To1);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${testScenario.failedPostStrPrice1}`, async () => {
    const respError = resp.body.data[38].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier1);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostStrPrice2}`, async () => {
    const respError = resp.body.data[39].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPriceTier2);
    expect(respError[1]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${testScenario.failedPostBlankStock}`, async () => {
    const respError = resp.body.data[40].error;
    expect(respError).to.be.an('array').that.is.empty;
  });

  it(`@neg ${testScenario.failedPostStrStock}`, async () => {
    const respError = resp.body.data[41].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegStock}`, async () => {
    const respError = resp.body.data[42].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostDecStock}`, async () => {
    const respError = resp.body.data[43].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongStock);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankGuarantee}`, async () => {
    const respError = resp.body.data[44].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeType);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[2]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(3);
  });

  it(`@neg ${testScenario.failedPostWrongGuarantee}`, async () => {
    const respError = resp.body.data[45].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${testScenario.failedPostGuaranteeOtherBlank}`, async () => {
    const respError = resp.body.data[46].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteePeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${testScenario.failedPostInvalidGuaranteePeriod}`, async () => {
    const respError = resp.body.data[47].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostStringLongGuaranteePeriod}`, async () => {
    const respError = resp.body.data[48].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongLongGuarantee);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostZeroLongGuaranteePeriod}`, async () => {
    const respError = resp.body.data[49].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeTime);
    expect(respError.length).to.equal(1);
  });

  // Current: set as non mandatory
  // it(`@neg ${testScenario.failedPostCoverageGuarantee}`, async () => {
  //   const respError = resp.body.data[50].error;
  //   expect(respError[0]).to.equal(testData.errorMessage.blankGuranteeCoverage);
  //   expect(respError.length).to.equal(1);
  // });

  it(`@neg ${testScenario.failedPostBlankIndent}`, async () => {
    const respError = resp.body.data[51].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankIndentPeriode);
    expect(respError[1]).to.equal(testData.errorMessage.blankIndentProcess);
    expect(respError.length).to.equal(2);
  });

  it(`@neg ${testScenario.failedPostWrongIndentPeriod}`, async () => {
    const respError = resp.body.data[52].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankIndentProcess);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostStrIndentPeriod}`, async () => {
    const respError = resp.body.data[53].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriodeInt);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostNegIndentPeriod}`, async () => {
    const respError = resp.body.data[54].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriodeInt);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostDecIndentPeriod}`, async () => {
    const respError = resp.body.data[55].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongIndentPeriodeInt);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidSKUVendorID}`, async () => {
    const respError = resp.body.data[56].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankSKUVendorID}`, async () => {
    const respError = resp.body.data[57].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostLongSKUVendorID}`, async () => {
    const respError = resp.body.data[58].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostDuplicateSKUVendorID}`, async () => {
    const respError = resp.body.data[59].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongDuplicateSKUVendorID);
    expect(respError.length).to.equal(1);
  });

  it(`@happy ${testScenario.successPostZeroStock}`, async () => {
    const respError = resp.body.data[60].error;
    expect(respError).to.be.an('array').that.is.empty;
  });

  it(`@neg ${testScenario.failedPostInvalidDPType}`, async () => {
    const respError = resp.body.data[61].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongDPType);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidPercentageDP}`, async () => {
    const respError = resp.body.data[62].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPercentageDP);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidNominalDP}`, async () => {
    const respError = resp.body.data[63].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongNominalDP);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankDP}`, async () => {
    const respError = resp.body.data[64].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankJumlahDP);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankDecimal}`, async () => {
    const respError = resp.body.data[65].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankDecimal);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBlankTimeIndent}`, async () => {
    const respError = resp.body.data[66].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankTimeIndent);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidTimeIndenDay}`, async () => {
    const respError = resp.body.data[67].error;
    expect(respError[0]).to.equal(testData.errorMessage.invalidTimeIndenDay);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidTimeIndenWeek}`, async () => {
    const respError = resp.body.data[68].error;
    expect(respError[0]).to.equal(testData.errorMessage.invalidTimeIndenWeek);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidPeriodeInden}`, async () => {
    const respError = resp.body.data[69].error;
    expect(respError[0]).to.equal(testData.errorMessage.invalidPeriodeInden);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostInvalidTimeInden}`, async () => {
    const respError = resp.body.data[70].error;
    expect(respError[0]).to.equal(testData.errorMessage.invalidTimeInden);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBelowMinimumTimeIndenDay}`, async () => {
    const respError = resp.body.data[71].error;
    expect(respError[0]).to.equal(testData.errorMessage.minimumTimeIndenDay);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBelowMinimumTimeIndenWeek}`, async () => {
    const respError = resp.body.data[72].error;
    expect(respError[0]).to.equal(testData.errorMessage.minimumTimeIndenWeek);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBelowMinimumPercentageDP}`, async () => {
    const respError = resp.body.data[73].error;
    expect(respError[0]).to.equal(testData.errorMessage.minimumPercentageDP);
    expect(respError.length).to.equal(1);
  });

  it(`@neg ${testScenario.failedPostBelowMinimumNominalDP}`, async () => {
    const respError = resp.body.data[74].error;
    expect(respError[0]).to.equal(testData.errorMessage.minimumNominalDP);
    expect(respError.length).to.equal(1);
  });
});
