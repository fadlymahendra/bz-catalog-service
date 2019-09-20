const { expect } = require('chai');
const jwtDecode = require('jwt-decode');

const api = require('./../../../../page-objects/api/frontoffice/catalog/products/update_stock.js');
const testData = require('../../../../helper/frontoffice/catalog/products/update_stock_data.json');
const authHelper = require('../../../../helper/token');
const credentialInfo = require('../../../../helper/userCredential.json');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    update: 'Update stock of product',
    updateNegative: 'Update stock of product with negative value',
    getInvalidVendor: 'Update stock of product with invalid vendor ID',
    getinvalidSku: 'Update stock of product with invalid SKU ID',
    getInvalidBoth: 'Update stock of product with invalid vendor ID and Product Group ID',
    updateInvalidAuth: 'Update stock of product with invalid Auth',
    updateNoAuth: 'Update stock of product without Auth',
  },
  describeIt: {
    checkUpdate: 'Stock of product should be updated',
    checkUpdateNegative: 'Stock of product should NOT updated',
    checkInvalidVendor: 'Should unauthorized and give error message 401',
    checkInvalidSku: 'Should not found and give error message 404',
    checkInvalidBoth: 'Should give http response 403',
    checkUpdateInvalidAuth: 'Should give http response 403',
    checkUpdateNoAuth: 'Should give http response 401',
  },
};

describe('@happy @put @updateStock Success update stock from product list', () => {
  let token;
  let vendorOrgId;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(credentialInfo.vendor.dj2);
    token = response.body.seller.token;
    vendorOrgId = jwtDecode(token).customer.organization_id;
  });

  it(`${string.description.update} ${string.describeIt.checkUpdate}`, async () => {
    const productVendorId = testData.validProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStock(vendorOrgId, productVendorId, requestBody, token);
    expect(response.status).to.equal(responseCodeMessage.successOk, response.body.message);
    expect(response.body.data.id).to.equal(productVendorId);
    expect((response.body.data.stock_available).toString()).to.equal((requestBody.stock_available).toString());
    expect(response.body.data.vendor_id).to.equal(vendorOrgId);
  });
});

describe('@neg @put @updateStock Failed update stock from product list', () => {
  let token;
  let vendorOrgId;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(credentialInfo.vendor.dj2);
    token = response.body.seller.token;
    vendorOrgId = jwtDecode(token).customer.organization_id;
  });

  it(`${string.describeIt.checkInvalidVendor}`, async () => {
    const otherVendorOrgId = vendorOrgId + 1;
    const productVendorId = testData.validProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStock(otherVendorOrgId, productVendorId, requestBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @updateStock ${string.description.updateNegative} ${string.describeIt.checkUpdateNegative}`, async () => {
    const productVendorId = testData.validProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.negativeStockUpdate };
    const response = await api.putNewStock(vendorOrgId, productVendorId, requestBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @updateStock ${string.description.getinvalidSku} ${string.describeIt.checkInvalidSku}`, async () => {
    const productVendorId = testData.invalidProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStock(vendorOrgId, productVendorId, requestBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @put @updateStock ${string.description.getInvalidBoth} ${string.describeIt.checkInvalidBoth}`, async () => {
    const otherVendorOrgId = vendorOrgId + 1;
    const productVendorId = testData.invalidProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStock(otherVendorOrgId, productVendorId, requestBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @updateStock ${string.description.updateInvalidAuth} ${string.describeIt.checkUpdateInvalidAuth}`, async () => {
    const productVendorId = testData.validProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStock(vendorOrgId, productVendorId, requestBody, credentialInfo.vendor.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@neg @put @updateStock ${string.description.updateNoAuth} ${string.describeIt.checkUpdateNoAuth}`, async () => {
    const productVendorId = testData.validProductVendorId;
    const requestBody = { ...testData.updateStockRequestBody.validStockUpdate };
    const response = await api.putNewStockWoAuth(vendorOrgId, productVendorId, requestBody);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
