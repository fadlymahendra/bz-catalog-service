const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testDataSKU = require('./../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const testData = require('./../../../../helper/testDataPremoderation.js');
const api = require('./../../../../page-objects/api/backoffice/catalog/sku-managements/update.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    update: 'Updates Sku images',
    updateInvalidAuth: 'Updates Sku images with invalid Auth',
    updateNoAuth: 'Updates Sku images with without Auth',
    updateNotFound: 'Updates Sku images with invalid SKU ID',
  },
  describeIt: {
    checkUpdatesImages: 'SKU images should be updated',
    checkUpdatesinvalidAuth: 'Updates Sku images without auth should give http response 403',
    checkUpdatesNoAuth: 'Updates Sku images without auth should give http response 401',
    checkNotFound: 'Updates Sku images with invalid SKU ID should give message not found',
  },
};

describe(string.description.update, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkUpdatesImages}`, async () => {
    const response = await api.updateSku(testDataSKU.skuId, testData.updateSkuImages, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkNotFound}`, async () => {
    const response = await api.updateSku(testDataSKU.invalidSku, testData.updateSkuImages, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkUpdatesNoAuth}`, async () => {
    const response = await api.updateSkuWithoutAuth(testDataSKU.skuId, testData.updateSkuImages);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @backoffice @skumanage ${string.describeIt.checkUpdatesinvalidAuth}`, async () => {
    const response = await api.updateSku(testDataSKU.skuId, testData.updateSkuImages, testDataSKU.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
