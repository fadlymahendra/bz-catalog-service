const { expect } = require('chai');
const page = require('./../../../../page-objects/api/backoffice/catalog/premoderation/rejection_list.js');
const common = require('../../../../helper/common.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const testData = require('./../../../../helper/backoffice/premoderation/product_group.json');


const string = {
  description: {
    get: 'Rejection list',
    getWithoutAuth: 'Rejection list without Auth',
    getInvalidAuth: 'Rejection list invalid Auth',
  },
  describeIt: {
    checkResult: 'Rejection list list should be displayed',
    checkResultWithoutAuth: 'Rejection list without auth should give http response 401',
    checkResultInvalidAuth: 'Rejection list invalid auth should give http response 403',
  },
};

describe(string.description.get, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @premod ${string.describeIt.checkResult}`, async () => {
    const response = await page.rejectList(token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@neg @get @backoffice @premod ${string.describeIt.checkResult}`, async () => {
    const response = await page.rejectListWithoutAuth(token);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });


  it(`@neg @get @backoffice @premod ${string.describeIt.checkResult}`, async () => {
    const response = await page.rejectList(testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
