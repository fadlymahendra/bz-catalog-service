const { expect } = require('chai');
const common = require('./../../../helper/common.js');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const jsonData = require('./../../../helper/backoffice/schema/catalog/categories/searchByBreadcrumb_schema.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const testData = require('./../../../helper/testData.js');

const string = {
  description: {
    search: 'Search by breadcrumb',
    searchWithTwobreadcrumb: 'Search by 2 breadcrumb',
    searchWithoutParam: 'Search by breadcrumb with empty param',
    searchInvalidAuth: 'Search by breadcrumb with invalid Auth',
    searchNoAuth: 'Search by breadcrumb without Auth',
  },
  describeIt: {
    checkSearch: 'Search by breadcrumb should be success',
    checkSearchWithTwobreadcrumb: 'Search by 2 breadcrumb should be success',
    checkSearchWithoutParam: 'Search by breadcrumb should NOT succes',
    checkSearchInvalidAuth: 'Should give http response 403',
    checkSearchNoAuth: 'Should give http response 401',
  },
};

describe('Check Mapping @test', () => {
  let paramQuery = {
    search: 'Maintenance, Repair, Overhaul / Operation (MRO)',
  };

  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(string.describeIt.checkSearch, async () => {
    const response = await api.searchByBreadcrumb(paramQuery, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body).to.be.jsonSchema(jsonData.searchByBreadcrumbs);
  });

  it(string.describeIt.checkSearchWithTwobreadcrumb, async () => {
    const response = await api.searchByBreadcrumb(paramQuery, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body).to.be.jsonSchema(jsonData.searchByBreadcrumbs);
  });

  it(string.describeIt.checkSearchWithoutParam, async () => {
    paramQuery = {};
    const response = await api.searchByBreadcrumb(paramQuery, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });
  it(string.describeIt.checkSearchInvalidAuth, async () => {
    const response = await api.searchByBreadcrumb(paramQuery, testData.invalidToken());
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(string.describeIt.checkSearchNoAuth, async () => {
    const response = await api.searchByBreadcrumbWithoutAuth(paramQuery);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
