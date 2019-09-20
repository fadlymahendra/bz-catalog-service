const { expect } = require('chai');
const chai = require('chai');
const common = require('./../../../../tests/helper/common.js');
const api = require('./../../../../tests/page-objects/api/backoffice/variants/variant_management.js');
const jsonData = require('./../../../../tests/helper/schema/variants/history_schema');
const cases = require('./../../../testcases/backoffice/variants/case_history_variants');
const testData = require('./../../../helper/testDataVariants.js');
const userCredential = require('./../../../helper/userCredential.json');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
chai.use(require('chai-json-schema'));


describe('History variants @happy @backoffice @categories @historyvariant @test', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenBo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(cases.getHistory.correctparam_datacontent.description, async () => {
    const response = await api.variantHistory(testData.HistoryIdVariant, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.data.length).to.not.equal(0);
    expect(response.body.data).to.be.jsonSchema(jsonData.schema);
    for (let i = 0; i < response.body.data.length; i += 1) {
      const value = ['Black', 'White', 'Green'];
      expect(response.body.data[i].variant.id).to.equal(testData.HistoryIdVariant);
      expect(response.body.data[i].title).to.equal('Buat Variant Baru');
      expect(response.body.data[i].payload.label).to.equal('warna');
      expect(response.body.data[i].payload.category).to.equal(605);
      expect(response.body.data[i].payload.description).to.equal('qwertyuiopasdfghjklzxcvbnm');
      expect(JSON.stringify(response.body.data[i].payload.values)).to.equal(JSON.stringify(value));
      expect(response.body.data[i].user.id).to.equal(73);
      expect(response.body.data[i].user.name).to.equal('Fathkurozaq BS');
      expect(response.body.data[i].user.email).to.equal('fatkhurozaq.budi@bizzy.co.id');
      expect(response.body.data[i].user.type).to.equal('employee');
      expect(response.body.data[i].created_at).to.equal('2018-07-12T06:37:26.738Z');
      expect(response.body.data[i].updated_at).to.equal('2018-07-12T06:37:26.738Z');
    }
  });

  it(cases.getHistory.invalidid.description, async () => {
    const response = await api.variantHistory(testData.HistoryInvalidIdVariant, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).to.be.instanceOf(Array);
    expect(response.body.data).to.be.empty;
  });

  it(cases.getHistory.negativeid.description, async () => {
    const response = await api.variantHistory(testData.HistoryNegativeIdVariant, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).to.be.instanceOf(Array);
    expect(response.body.data).to.be.empty;
  });

  it(cases.getHistory.blankid.description, async () => {
    const response = await api.variantHistory(testData.HistoryBlankIdVariant, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.getHistory.invalidtoken.description, async () => {
    const response = await api.variantHistory(testData.HistoryIdVariant, testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.getHistory.blanktoken.description, async () => {
    const response = await api.variantHistoryWithoutAuth(testData.HistoryIdVariant);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });
});
