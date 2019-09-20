const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testData = require('./../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const page = require('./../../../../page-objects/api/backoffice/catalog/sku-managements/sku_list.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');


const string = {
  description: {
    getList: 'SKU Managements list',
    getListWithoutAuth: 'SKU Managements list without Auth',
    getListInvalidAuth: 'SKU Managements list invalid Auth',
  },
  describeIt: {
    checkResult: 'SKU Managements  list should be displayed',
    checkResultWithoutAuth: 'SKU Managements list without auth should give http response 401',
    checkResultInvalidAuth: 'SKU Managements list invalid auth should give http response 403',
  },
};

describe(string.description.getList, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResult}`, async () => {
    const response = await page.skuManageList(token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await page.skuManageListWithoutAuth();
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@happy @get @backoffice @skumanage ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await page.skuManageList(testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
