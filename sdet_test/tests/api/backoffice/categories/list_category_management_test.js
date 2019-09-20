
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const listCategoryManagementApi = require('../../../page-objects/api/backoffice/categories/list_category_management_page');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/backoffice/category/list_category_management_data.json');
const schemaAssertion = require('../../../helper/schema/list_category_management_schema.json');

const testScenario = {
  describe: 'Read listCategoryManagementApi Test',
  successGetData: 'should success get data with valid request parameter',
  successGetDataByLevel: 'should success get list categories filter by level category',
  failedGetDataEmptyLevel: 'should failed get list categories filter by empty level category value',
  failedGetDataInvalidToken: 'get error when token invalid',
  failedGetDataWithoutCredential: 'get error when token blank',
};

describe(testScenario.describe, () => {
  let token;

  before((done) => {
    const userToLogin = userCredential.backOffice.admin;
    common.getAuth(userToLogin, (resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      token = resp.body.token;
      done();
    });
  });

  it(`@happy @C716 ${testScenario.successGetData}`, (done) => {
    listCategoryManagementApi.getListCategoryManagement(testData.successGetData, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.length).to.not.equal(0);
      resp.body.data.forEach((data) => {
        expect(data.level).to.equal(testData.successGetData.level);
        expect(data.parent.id).to.equal(testData.successGetData.parent_id);
      });
      done();
    });
  });

  it(`@happy @C717 ${testScenario.successGetDataByLevel}`, (done) => {
    listCategoryManagementApi.getListCategoryManagement(testData.successGetDataByLevel, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.length).to.not.equal(0);
      resp.body.data.forEach((data) => {
        expect(data.level).to.equal(testData.successGetDataByLevel.level);
      });
      done();
    });
  });

  it(`@neg @C718 ${testScenario.failedGetDataEmptyLevel}`, (done) => {
    listCategoryManagementApi.getListCategoryManagement(testData.failedGetDataEmptyLevelValue, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.message).to.be.equal('child "level" fails because ["level" is not allowed to be empty]');
      done();
    });
  });

  it(`@neg @xoxo ${testScenario.failedGetDataInvalidToken}`, (done) => {
    listCategoryManagementApi.getListCategoryManagement(testData.successGetData, testData.invalidToken, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
      done();
    });
  });

  it(`@neg @xoxo ${testScenario.failedGetDataWithoutCredential}`, (done) => {
    listCategoryManagementApi.getListCategoryManagementWithoutAuth(testData.successGetData, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
      done();
    });
  });
});
