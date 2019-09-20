 
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
const jwtDecoder = require('jwt-decode');
chai.use(require('chai-json-schema'));
const premoderationDetailApi = require('../../../../page-objects/api/frontoffice/catalog/products/premoderation_detail_page.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('../../../../helper/common');
const testData = require('../../../../helper/frontoffice/catalog/products/premoderation_detail_data.json');
const schemaAssertion = require('../../../../helper/schema/premoderation_detail_schema.json');

const testScenario = {
  describe: 'Read premoderationDetailApi Test',
  successGetData: 'should success get data premoderation with valid request parameter',
  successGetDataNoUNSPSC: 'should success get data premoderation without UNSPSC',
  successGetDataActiveIndent: 'should success get data premoderation with active indent product',
  successGetDataActiveDecimal: 'should success get data premoderation with active decimal product',
  successGetDataActiveDP: 'should success get data premoderation with active down payment product',
};

describe(testScenario.describe, () => {
  let token;
  let vendorId;

  before(async () => {
    const userBoToLogin = userCredential.vendor.dj2;
    const respondBo = await common.getTokenFo(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    token = respondBo.body.seller.token;
    vendorId = (jwtDecoder(token)).customer.organization_id;
  });

  it(`@happy @detailpremod ${testScenario.successGetData}`, (done) => {
    premoderationDetailApi.getPremoderationDetail(testData.successGetData, vendorId, testData.premoderationId, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk, JSON.stringify(resp.body));
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.id).to.be.equal(testData.premoderationId);
      done();
    });
  });

  it(`@happy @detailpremod ${testScenario.successGetDataNoUNSPSC}`, (done) => {
    premoderationDetailApi.getPremoderationDetail(testData.successGetData, vendorId, testData.premoderationIdWithoutUNSPSC, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.payload.category_id).to.be.equal(0);
      done();
    });
  });

  it(`@C11565 @happy @detailpremod ${testScenario.successGetDataActiveDecimal}`, (done) => {
    premoderationDetailApi.getPremoderationDetail(testData.successGetData, vendorId, testData.premoderation.withDecimal, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.payload.products[0].is_decimal).to.be.equal(1);
      done();
    });
  });

  it(`@C11563 @happy @detailpremod ${testScenario.successGetDataActiveIndent}`, (done) => {
    premoderationDetailApi.getPremoderationDetail(testData.successGetData, vendorId, testData.premoderation.withIndent, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.payload.products[0].is_indent).to.be.equal(1);
      done();
    });
  });

  it(`@C11564 @happy @detailpremod ${testScenario.successGetDataActiveDP}`, (done) => {
    premoderationDetailApi.getPremoderationDetail(testData.successGetData, vendorId, testData.premoderation.withDP, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
      expect(resp.body.data.payload.products[0].down_payment_type).not.equal(0);
      done();
    });
  });
});