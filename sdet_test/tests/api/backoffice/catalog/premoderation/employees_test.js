const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testData = require('./../../../../helper/backoffice/premoderation/employees.json');
const page = require('./../../../../page-objects/api/backoffice/catalog/premoderation/employees.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');


const string = {
  description: {
    get: 'Employees list',
    getWithoutAuth: 'Employees list without Auth',
    getInvalidAuth: 'Employees list invalid Auth',
  },
  describeIt: {
    checkResult: 'Employees list should be displayed',
    checkResultWithoutAuth: 'Employees list without auth should give http response 401',
    checkResultInvalidAuth: 'Employees list invalid auth should give http response 403',
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
    const response = await page.employeeList(token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@neg @get @backoffice @premod ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await page.employeeListWithoutAuth();
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @backoffice @premod ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await page.employeeList(testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
