const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testDataSKU = require('./../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const testData = require('./../../../../helper/testDataPremoderation.js');
const api = require('./../../../../page-objects/api/backoffice/catalog/sku-managements/visibility.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    visible: 'Set Visibility of new product as visible',
    invisible: 'Set Visibility of new product as invisible',
    visibleInvalidAuth: 'Set Visibility of new product with invalid Auth',
    visibleNoAuth: 'Set Visibility of new product without Auth',
    visibleNotFound: 'Set Visibility of new product with invalid SKU ID',
  },
  describeIt: {
    checkVisibility: 'New product should be visible',
    checkVisibilityFalse: 'New product should be invisible',
    checkVisibilityInvalidAuth: 'Set Visibility of new product without auth should give http response 403',
    checkVisibilityNoAuth: 'Set Visibility of new product without auth should give http response 401',
    checkNotFound: 'Set Visibility of new product with invalid SKU ID should give message not found',
  },
};

describe(string.description.visible, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkVisibility}`, async () => {
    const response = await api.skuVisibility(testDataSKU.skuId, testData.visibleTrue, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.is_active).to.equal(1);
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkVisibilityFalse}`, async () => {
    const response = await api.skuVisibility(testDataSKU.skuId, testData.visibleFalse, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.is_active).to.equal(0);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkNotFound}`, async () => {
    const response = await api.skuVisibility(testDataSKU.invalidSku, testData.visibleFalse, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkVisibilityInvalidAuth}`, async () => {
    const response = await api.skuVisibility(testDataSKU.skuId, testData.visibleTrue, testDataSKU.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkVisibilityNoAuth}`, async () => {
    const response = await api.skuVisibilityWithoutAuth(testDataSKU.skuId, testData.visibleTrue);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
