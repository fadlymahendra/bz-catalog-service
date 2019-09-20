const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_list_categories.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/testData.js');


const search = '';
const name = 'Lenovo Desktop';

function dataQuery() {
  return {
    level: 'C0',
    search: '',
  };
}

describe('List categories @backoffice @categories @listcategories', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(cases.getList.correctparam_datacontent_c0.description, async () => {
    const paramquery = dataQuery();
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.every(element => element.level === paramquery.level)).ok;
  });

  it(cases.getList.searchbycategoryname.description, async () => {
    const paramquery = dataQuery();
    paramquery.search = name;
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.every(element => (element.user.name).includes(search))).ok;
  });

  it(cases.getList.searchbyCategorynamePartial.description, async () => {
    const paramquery = dataQuery();
    paramquery.search = name.split(' ')[1];
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.every(element => (element.user.name).includes(search))).ok;
  });

  it(cases.getList.blanklevel.description, async () => {
    const paramquery = dataQuery();
    paramquery.level = '';
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getList.blankpage.description, async () => {
    const paramquery = dataQuery();
    paramquery.page = '';
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getList.blanklimit.description, async () => {
    const paramquery = dataQuery();
    paramquery.limit = '';
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getList.blankpageBlanklimit.description, async () => {
    const paramquery = dataQuery();
    paramquery.page = '';
    paramquery.limit = '';
    const response = await api.list(paramquery, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getList.invalidtoken.description, async () => {
    const paramquery = dataQuery();
    const response = await api.list(paramquery, testData.invalidToken());
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.getList.blanktoken.description, async () => {
    const paramquery = dataQuery();
    const response = await api.listWithoutAuth(paramquery);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
