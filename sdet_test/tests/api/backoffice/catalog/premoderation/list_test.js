
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

const { expect } = require('chai');
const authHelper = require('../../../../helper/token');
const responseCodeAndMessage = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/backoffice/catalog/premoderation/list_data.json');
const api = require('../../../../page-objects/api/backoffice/catalog/premoderation/list.js');
const listSchema = require('../../../../helper/schema/backoffice/catalog/premoderation/list_schema.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  describeIt: {
    checkResult: 'Success get pre - moderation list',
    checkFilterAssign: 'Success displayed pre - moderation list with specific assign_id',
    checkFilterVendor: 'Success displayed pre - moderation list with specific vendor_id',
    checkFilterAssignInvalid: 'Failed get pre - moderation list with invalid assign_to id',
    checkFilterVendorInvalid: 'Failed get pre - moderation list with invalid vendor_id',
    checkFilterRevision: 'Success get pre - moderation list with status need_revision',
    checkFilterRevisionInprogress: 'Success get pre - moderation with status revision_inprogress',
    checkFilterReject: 'Success get pre - moderation list with status rejected',
    checkFilterDone: 'Success get pre - moderation with status revision_complete',
    checkFilterFull: 'Success get pre - moderation list with vendor_id=31, assign_to=73 and status need_revision',
    checkResultWithoutAuth: 'Failed get pre - moderation list without auth (http response 401)',
    checkResultInvalidAuth: 'Failed get pre - moderation list invalid auth (http response 403)',
  },
};

describe('Get Pre - moderation list', () => {
  let token;
  const organizationId = testData.vendorOrganizationId;
  const defaultQuery = JSON.parse(JSON.stringify(testData.defaultQuery));

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkResult}`, (done) => {
    api.getPremodList(defaultQuery, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data).not.equal(0);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterAssign}`, (done) => {
    api.getPremodList({ ...defaultQuery, assign_to: testData.employeeAssigneeInfo.id }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].assign_to).to.equal(testData.employeeAssigneeInfo.id);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterVendor}`, (done) => {
    api.getPremodList({ ...defaultQuery, vendor_id: organizationId }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].vendor_id).to.equal(organizationId);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterRevision}`, (done) => {
    api.getPremodList({ ...defaultQuery, status: testData.premodStatus.need_revision }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].status).to.equal(testData.premodStatus.need_revision);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterRevisionInprogress}`, (done) => {
    api.getPremodList({ ...defaultQuery, status: testData.premodStatus.revision_inprogress }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].status).to.equal(testData.premodStatus.revision_inprogress);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterReject}`, (done) => {
    api.getPremodList({ ...defaultQuery, status: testData.premodStatus.rejected }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].status).to.equal(testData.premodStatus.rejected);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterDone}`, (done) => {
    api.getPremodList({ ...defaultQuery, status: testData.premodStatus.revision_complete }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body).to.be.jsonSchema(listSchema);
      expect(response.body.data[0].status).to.equal(testData.premodStatus.revision_complete);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkResultWithoutAuth}`, (done) => {
    api.getPremodListWoAuth(defaultQuery, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkResultInvalidAuth}`, (done) => {
    api.getPremodList(defaultQuery, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkFilterAssignInvalid}`, (done) => {
    api.getPremodList({ ...defaultQuery, assign_to: testData.invalidAssigneeId }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body.data).to.be.empty;
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkFilterVendorInvalid}`, (done) => {
    api.getPremodList({ ...defaultQuery, vendor_id: testData.invalidVendorId }, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body.data).to.be.empty;
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkFilterFull}`, (done) => {
    const query = {
      ...defaultQuery,
      status: testData.premodStatus.need_revision,
      assign_to: testData.employeeAssigneeInfo.id,
      vendor_id: organizationId,
    };
    api.getPremodList(query, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successOk);
      expect(response.body.data[0].status).to.equal(testData.premodStatus.need_revision);
      expect(response.body.data[0].assign_to).to.equal(testData.employeeAssigneeInfo.id);
      expect(response.body.data[0].vendor_id).to.equal(organizationId);
      done();
    });
  });
});
