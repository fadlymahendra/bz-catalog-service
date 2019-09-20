const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testData = require('./../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const page = require('./../../../../page-objects/api/backoffice/catalog/sku-managements/sku_detail.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    getDetails: 'SKU Managements Details',
    getDetailsWithoutAuth: 'SKU Managements Details without Auth',
    getDetailsInvalidAuth: 'SKU Managements Details invalid Auth',
  },
  describeIt: {
    checkResult: 'SKU Managements Details should be displayed',
    checkResultWithoutAuth: 'SKU Managements Details without auth should give http response 401',
    checkResultInvalidAuth: 'SKU Managements Details invalid auth should give http response 403',
  },
};

describe(string.description.getDetails, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResult}`, async () => {
    const response = await page.getSKUDetail(testData.skuId, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await page.getSKUDetailWithoutAuth(testData.skuId);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await page.getSKUDetail(testData.skuId, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
