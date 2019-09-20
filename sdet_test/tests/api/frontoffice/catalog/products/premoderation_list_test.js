
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
const jwtDecoder = require('jwt-decode');
chai.use(require('chai-json-schema'));
const premoderationListApi = require('../../../../page-objects/api/frontoffice/catalog/products/premoderation_list_page.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const authHelper = require('../../../../helper/token');
const testData = require('../../../../helper/frontoffice/catalog/vendor/premoderation_list_data.json');
const schemaAssertion = require('../../../../helper/schema/premoderation_list_schema.json');

const testScenario = {
  describe: 'Create Read Update Delete premoderation ListApi Test',
  successGetData: 'should success get data with valid request parameter',
  successGetDataNoUNSPSC: 'should success get data without category/UNSPSC',
};

describe(testScenario.describe, () => {
  let token;
  let vendorId;

  before(async () => {
    const userBoToLogin = userCredential.vendor.dj2;
    const respondBo = await authHelper.getFrontOfficeToken.getToken(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    token = respondBo.body.seller.token;
    vendorId = (jwtDecoder(token)).customer.organization_id;
  });

  it(`@happy @listpremodfo ${testScenario.successGetData}`, (done) => {
    premoderationListApi.getPremoderationList(testData.successGetData, vendorId, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      done();
    });
  });

  it(`@happy @listpremodfo ${testScenario.successGetDataNoUNSPSC}`, (done) => {
    premoderationListApi.getPremoderationList(testData.successGetDataWithoutUNSPSC, vendorId, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      done();
    });
  });
});
