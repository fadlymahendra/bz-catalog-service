const { expect } = require('chai');
const page = require('./../../../../page-objects/api/backoffice/catalog/premoderation/product_groups.js');
const common = require('../../../../helper/common.js');
const testData = require('./../../../../helper/backoffice/premoderation/product_group.json');
const jsonData = require('./../../../../helper/schema/premoderation/product_group_schema.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');


const string = {
  description: {
    get: 'Premoderation - Product Groups',
    getWithoutAuth: 'Premoderation - Product Groups without Auth',
    getInvalidAuth: 'Premoderation - Product Groups invalid Auth',
  },
  describeIt: {
    checkResult: 'Premoderation - Product Groups should be displayed',
    checkResultWithoutAuth: 'Premoderation - Product Groups without auth should give http response 401',
    checkResultInvalidAuth: 'Premoderation - Product Groups invalid auth should give http response 403',
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
    const response = await page.prodGroup(token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body).to.be.jsonSchema(jsonData.productGroup);
  });

  it(`@neg @get @backoffice @premod ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await page.prodGroupWithoutAuth();
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @backoffice @premod ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await page.prodGroup(testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
