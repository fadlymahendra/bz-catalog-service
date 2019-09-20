
const { expect } = require('chai');
const chai = require('chai');
const jwtDecode = require('jwt-decode');
const moment = require('moment');
const common = require('../../../../../helper/common');
const userCredential = require('../../../../../helper/userCredential.json');
const api = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/bulk_sku_update.js');
const jsonData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-sku-update/history_update_shcema.js');
const cases = require('../../../../../testcases/frontoffice/catalog/bulk-sku/bulk-sku-update/case_update_history.js');
const testData = require('../../../../../helper/testDatabulk.js');
chai.use(require('chai-json-schema'));


describe('download template bulk update @frontoffice @bulkupdate @historyupdate', () => {
  let token;
  let organizationId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    token = respond.body.seller.token;
    organizationId = jwtDecode(token).customer.organization_id;
  });

  // checkResult
  it(`@c292 ${cases.getHistoryUpdate.checkResult.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByFilename, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.checkResult.responseCode, response.body.message);
      expect(response.body).to.be.jsonSchema(jsonData.schema);
      expect(response.body.data.length).to.not.equal(0);
      done();
    });
  });

  // searchByFilename
  it(`@c305 ${cases.getHistoryUpdate.searchByFilename.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByFilename, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByFilename.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(element => element.payload.file_name === testData.searchByFilename.search)).ok;
      done();
    });
  });

  // searchByUploader
  it(`@c306 ${cases.getHistoryUpdate.searchByUploader.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByUploader, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByUploader.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(element => (element.user.name).includes(testData.searchByUploader.search))).ok;
      done();
    });
  });

  // searchByFilenameAndDate
  it(`@c310 ${cases.getHistoryUpdate.searchByFilenameAndDate.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByFilenameAndDate, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByFilenameAndDate.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(element => element.payload.file_name === testData.searchByFilenameAndDate.search));
      expect(response.body.data.every(element => (element.created_at).includes(testData.searchByFilenameAndDate.start_date) || (element.created_at).includes(testData.searchByFilenameAndDate.end_date))).ok;
      done();
    });
  });

  // searchByUploaderAndDate
  it(`@c311 ${cases.getHistoryUpdate.searchByUploaderAndDate.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByUploaderAndDate, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByUploaderAndDate.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(element => element.payload.file_name === testData.searchByUploaderAndDate.search));
      expect(response.body.data.every(element => (element.created_at).includes(testData.searchByUploaderAndDate.start_date) || (element.created_at).includes(testData.searchByUploaderAndDate.end_date))).ok;
      done();
    });
  });

  // searchByDate
  it(`@c307 ${cases.getHistoryUpdate.searchByDate.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByDate, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByDate.responseCode, response.body.message);
      expect(response.body.data).to.not.equal(0);
      expect(response.body.data.every((element) => {
        const dateToCheck = moment(element.created_at).format('YYYY-MM-DD');
        return (dateToCheck >= testData.searchByDate.start_date) && (dateToCheck <= testData.searchByDate.end_date);
      })).ok;
      done();
    });
  });
});

describe('download template bulk update @neg @frontoffice @bulkupdate @historyupdate', () => {
  let token;
  let organizationId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    token = respond.body.seller.token;
    organizationId = jwtDecode(token).customer.organization_id;
  });

  // invalidtoken
  it(`@c294 ${cases.getHistoryUpdate.invalidtoken.description}`, (done) => {
    api.historyBulkUpdate(organizationId, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9', 'incorrect_token', 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.invalidtoken.responseCode, response.body.message);
      done();
    });
  });

  // blanktoken
  it(`@c295 ${cases.getHistoryUpdate.blanktoken.description}`, (done) => {
    api.historyBulkUpdate(organizationId, null, token, 'without-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.blanktoken.responseCode, response.body.message);
      done();
    });
  });

  // invalidVendorId
  it(`@c293 ${cases.getHistoryUpdate.invalidVendorId.description}`, (done) => {
    api.historyBulkUpdate(testData.invalidVendorId, null, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.invalidVendorId.responseCode, response.body.message);
      done();
    });
  });

  // searchByInvalidDate
  it(`@c308 ${cases.getHistoryUpdate.searchByInvalidDate.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByInvalidDate, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByInvalidDate.responseCode, response.body.message);
      done();
    });
  });

  // searchByInvalidStartDate
  it(`@c309 ${cases.getHistoryUpdate.searchByInvalidStartDate.description}`, (done) => {
    api.historyBulkUpdate(organizationId, testData.searchByInvalidStartDate, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getHistoryUpdate.searchByInvalidStartDate.responseCode, response.body.message);
      done();
    });
  });
});
