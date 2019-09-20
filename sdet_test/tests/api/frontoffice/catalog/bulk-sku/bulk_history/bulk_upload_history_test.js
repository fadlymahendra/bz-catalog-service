const { expect } = require('chai');
const chai = require('chai');
const moment = require('moment');
const jwtDecode = require('jwt-decode');
chai.use(require('chai-json-schema'));

const listHistoryApi = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/bulk-upload/list_history.js');
const responseMessageCode = require('../../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../../helper/userCredential.json');
const common = require('../../../../../helper/common.js');
const testData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/list_history_data.json');
const schemaAssertion = require('../../../../../helper/schema/list_history_schema.json');

const testScenario = {
  describe: 'Read list History Api Test',
  successGetData: 'should success get data with valid request parameter',
  successGetDataWithCompleteParam: 'should success get data with complete request parameter',
  successGetDataByFileName: 'should success get data filter by file name',
  successGetDataByUser: 'should success get data filter by user',
  successGetDataByValidDate: 'should success get data filter by valid date',
  failedGetDataByInvalidDate: 'should be failed get data filter by invalid date',
  failedGetDataByInvalidStartDate: 'should be failed get data filter by invalid start date (end date < start date)',
  failedGetDataInvalidIdVendor: 'should be failed get data with invalid vendor id',
  failedGetDataInvalidToken: 'get error when token invalid',
  failedGetDataWithoutCredential: 'get error when token blank',
};

describe(`@listhistory ${testScenario.describe}`, () => {
  let token;
  let organizationId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    token = respond.body.seller.token;
    organizationId = jwtDecode(token).customer.organization_id;
  });


  it(`@happy @C224 ${testScenario.successGetData}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.default_param, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.every(element => element.title === 'Bulk Tambah Produk')).ok;
      done();
    });
  });

  it(`@happy @C304 ${testScenario.successGetDataWithCompleteParam}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.completeParam, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.every(element => element.title === 'Bulk Tambah Produk')).ok;
      expect(resp.body.data.every(element => element.payload.file_name === testData.query.completeParam.search)).ok;
      expect(resp.body.data.every(element => moment(element.created_at).format('YYYY-MM-DD') === moment(testData.query.completeParam.start_date).format('YYYY-MM-DD'))).ok;
      done();
    });
  });

  it(`@happy @C299 ${testScenario.successGetDataByFileName}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.searchByFileName, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.length).to.not.equal(0);
      expect(resp.body.data.every(element => element.title === 'Bulk Tambah Produk')).ok;
      expect(resp.body.data.every(element => (element.payload.file_name).includes(testData.query.searchByFileName.search))).ok;
      done();
    });
  });

  it(`@happy @C300 ${testScenario.successGetDataByUser}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.searchByUser, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.length).to.not.equal(0);
      expect(resp.body.data.every(element => element.title === 'Bulk Tambah Produk')).ok;
      expect(resp.body.data.every(element => (element.user.name).includes(testData.query.searchByUser.search))).ok;
      done();
    });
  });

  it(`@happy @C301 ${testScenario.successGetDataByValidDate}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.searchByValidDate, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.length).to.not.equal(0);
      expect(resp.body.data.every(element => element.title === 'Bulk Tambah Produk')).ok;
      expect(resp.body.data.every((element) => {
        const dateToCheck = moment(element.created_at).format('YYYY-MM-DD');
        const minDate = moment(testData.query.searchByValidDate.start_date).format('YYYY-MM-DD');
        const maxDate = moment(testData.query.searchByValidDate.end_date).format('YYYY-MM-DD');
        return (dateToCheck >= minDate) && (dateToCheck <= maxDate);
      })).ok;
      done();
    });
  });

  it(`@neg @C302 ${testScenario.failedGetDataByInvalidDate}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.searchByInvalidDate, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      done();
    });
  });

  it(`@neg @C303 ${testScenario.failedGetDataByInvalidStartDate}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query.searchByInvalidStartDate, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      done();
    });
  });

  it(`@neg @C270 ${testScenario.failedGetDataInvalidIdVendor}`, (done) => {
    listHistoryApi.getListHistory(testData.vendor.invalidId, testData.query, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
      done();
    });
  });

  it(`@neg @C271 ${testScenario.failedGetDataInvalidToken}`, (done) => {
    listHistoryApi.getListHistory(organizationId, testData.query, testData.invalidToken, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
      done();
    });
  });

  it(`@neg @C272 ${testScenario.failedGetDataWithoutCredential}`, (done) => {
    listHistoryApi.getListHistoryWithoutAuth(organizationId, testData.query, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
      done();
    });
  });
});
