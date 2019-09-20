
const { expect } = require('chai');
const jwt = require('jwt-decode');
const authHelper = require('../../../../helper/token');
const testData = require('../../../../helper/testDataPremoderation.js');
const testPremod = require('../../../../helper/frontoffice/catalog/vendor/update_premod_data.json');
const api = require('../../../../page-objects/api/frontoffice/catalog/products/update.js');
const jsonData = require('../../../../helper/schema/premoderation_SKU_scema.js');
const userCredential = require('../../../../helper/userCredential.json');
const getPreProcessData = require('../../../../helper/frontoffice/catalog/vendor/testDataUpdatePremod');
const responseCodeAndMessage = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    update: 'Update premoderation details',
    updateSKUVendor: 'Update SKU vendor',
    updateWOUNSPSC: 'Update premoderation details without UNSPSC',
    updateTwice: 'Update premoderation details twice',
    updateWithoutMandatory: 'Update premoderation details with empty mandatory field',
    updateInvalidQty: 'Update premoderation details with invalid tier stock range',
    updateNegativeQty: 'Update premoderation details with negative tier stock range',
    updateInvalidPrice: 'Update premoderation details with invalid price',
    updateValidSKUVendor: 'Update premoderation details with valid SKU Id Vendor',
    updateEmptySKUVendor: 'Update premoderation details with empty SKU Id Vendor',
    updateInvalidSKUVendor: 'Update premoderation details with invalid SKU Id Vendor',
    updateExistSKUVendor: 'Update premoderation details with exist SKU Id Vendor',
    getInvalidVendor: 'Update premoderation details with invalid vendor ID',
    getInvalidBoth: 'Update premoderation details with invalid vendor ID and Product Group ID',
    updateInvalidAuth: 'Update premoderation details with invalid Auth',
    updateNoAuth: 'Update premoderation details without Auth',

  },
  describeIt: {
    checkUpdate: 'Premoderation should be updated',
    checkUpdateSKUVendor: 'Premoderation should be updated',
    checkUpdateWOUNSPSC: 'Premoderation should be updated',
    checkUpdateTwice: 'Update premoderation data with same payload should NOT allowed',
    checkUpdateWithoutMandatory: 'Premoderation should NOT updated',
    checkUpdateInvalidQty: 'Premoderation should NOT updated',
    checkUpdateNegativeQty: 'Premoderation should NOT updated',
    checkUpdateInvalidPrice: 'Premoderation should NOT updated',
    checkUpdateEmptySKUVendor: 'Premoderation should NOT updated',
    checkUpdateInvalidSKUVendor: 'Premoderation should NOT updated',
    checkUpdateExistSKUVendor: 'Premoderation should NOT updated',
    checkInvalidVendor: 'Should unauthorized and give error message 401',
    checkInvalidBoth: 'Should give http response 403',
    checkUpdateInvalidAuth: 'Should give http response 403',
    checkUpdateNoAuth: 'Should give http response 401',
  },
};


describe(`Product List Update: ${string.description.update}`, () => {
  let token;
  let tokenDj;
  let vendorOrgId;
  let vendorOrgIdDj;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.hvendor);
    const responseDj = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.dj2);
    token = response.body.seller.token;
    tokenDj = responseDj.body.seller.token;
    vendorOrgId = jwt(token).customer.organization_id;
    vendorOrgIdDj = jwt(tokenDj).customer.organization_id;
  });

  it(`@happy @put @frontoffice @premoderation| ${string.describeIt.checkUpdate}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updateProductData, token);
    expect(response.status).to.equal(responseCodeAndMessage.successOk);
    expect(response.body.data).to.be.jsonSchema(jsonData.payload);
    expect(response.body.data.name).to.equal('Soft Case Macbook Minisooh');
    expect(response.body.data.premoderation_status).to.equal('revision_complete');
  });

  it(`@happy @put @frontoffice @premoderation | ${string.describeIt.checkUpdateSKUVendor}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuIdSuccessUpdateSKUVen, getPreProcessData.updatePremodWithValidSKUVendor(), token);
    expect(response.status).to.equal(responseCodeAndMessage.successOk);
    expect(response.body.data).to.be.jsonSchema(jsonData.payload);
    expect(response.body.message).to.equal(getPreProcessData.successMessageUpdateValidSKUVendor());
    expect(response.body.data.premoderation_status).to.equal('revision_complete');
  });

  it(`@happy @put @frontoffice @premoderation | ${string.describeIt.checkUpdateWOUNSPSC}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgIdDj, testPremod.updateWoUNSPSC, getPreProcessData.updatePremodWithValidSKUVendor(), tokenDj);
    expect(response.status).to.equal(responseCodeAndMessage.successOk);
    expect(response.body.data).to.be.jsonSchema(jsonData.payload);
    expect(response.body.message).to.equal(getPreProcessData.successMessageUpdateValidSKUVendor());
    expect(response.body.data.premoderation_status).to.equal('revision_complete');
  });
});

describe('Product List Update : ', () => {
  let token;
  let vendorOrgId;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.hvendor);
    token = response.body.seller.token;
    vendorOrgId = jwt(token).customer.organization_id;
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateWithoutMandatory} ${string.describeIt.checkUpdateWithoutMandatory}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updatePremodEmptyMandatory, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateInvalidQty} ${string.describeIt.checkUpdateInvalidQty}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updateProductDataInvalidTierQty, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateNegativeQty} ${string.describeIt.checkUpdateNegativeQty}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updateProductDataNegativeTierQty, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateInvalidPrice} ${string.describeIt.checkUpdateInvalidPrice}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updateProductDataInvalidPrice, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateEmptySKUVendor} ${string.describeIt.checkUpdateEmptySKUVendor}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuIdUpdateSKUVen, getPreProcessData.updatePremodWithEmptySKUVendor(), token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
    expect(response.body.message).to.equal(getPreProcessData.errorMessageEmptySKUVendor());
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateInvalidSKUVendor} ${string.describeIt.checkUpdateInvalidSKUVendor}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuIdUpdateSKUVen, getPreProcessData.updatePremodWithInvalidSKUVendor(), token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
    expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidSKUVendor(getPreProcessData.updatePremodWithInvalidSKUVendor().payload.products[0].sku_vendor));
  });

  it(`@put @frontoffice @premoderation | ${string.description.updateExistSKUVendor} ${string.describeIt.checkUpdateExistSKUVendor}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuIdUpdateSKUVen, getPreProcessData.updatePremodWithExistSKUVendor(), token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
    expect(response.body.message).to.equal(getPreProcessData.errorMessageExistSKUVendor(getPreProcessData.updatePremodWithExistSKUVendor().payload.products[0].sku_vendor));
  });

  it(`@neg @put @premoderation @frontoffice | ${string.description.getInvalidVendor} ${string.describeIt.checkInvalidVendor}`, async () => {
    const response = await api.vendorUpdatePremoderation(999999999999, testPremod.skuId, testData.updateProductData, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @premoderation @frontoffice | ${string.description.getInvalidBoth} ${string.describeIt.checkInvalidBoth}`, async () => {
    const response = await api.vendorUpdatePremoderation(999999999999, testPremod.invalidSku, testData.updateProductData, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateInvalidAuth} ${string.describeIt.checkUpdateInvalidAuth}`, async () => {
    const response = await api.vendorUpdatePremoderation('invalidId', testPremod.skuId, testData.updateProductData, 'incorrect_token');
    expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateNoAuth} ${string.describeIt.checkUpdateNoAuth}`, async () => {
    const response = await api.vendorUpdatePremodWoAuth(vendorOrgId, testPremod.skuId, testData.updateProductData);
    expect(response.status).to.equal(responseCodeAndMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeAndMessage.failedUnauthorized.codeMessage);
  });

  it(`@neg @put @frontoffice @premoderation | ${string.description.updateTwice} ${string.describeIt.checkUpdateTwice}`, async () => {
    const response = await api.vendorUpdatePremoderation(vendorOrgId, testPremod.skuId, testData.updateProductData, token);
    expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
    expect(response.body.message).to.equal('Premoderation status can not be processed: revision_complete');
  });
});
