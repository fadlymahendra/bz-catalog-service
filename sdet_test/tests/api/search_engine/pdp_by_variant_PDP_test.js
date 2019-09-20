const chai = require('chai');
chai.use(require('chai-json-schema'));
const { expect } = require('chai');
const common = require('./../../helper/common.js');
const global = require('./../../helper/global.js');
const api = require('./../../page-objects/api/search_engine/pdp_by_variant_PDP.js');
const cases = require('./../../testcases/search_engine/pdp_by_variant_PDP_testcase.js');
const jsonData = require('./../../helper/schema/search_engine/pdp_by_variant_PDP_schema.js');
const testDataPOC = require('../../helper/testDataPdp.js');
const responseMessageCode = require('../../helper/responseMessageAndCode.json');
const userCredential = require('../../helper/userCredential.json');

describe('Get PDP by variant @varianpdp', () => {
  let token;
  const emptyToken = '';
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
    token = respond.body.seller.token;
  });

  // getOK
  it(`@happy @varianpdp ${cases.scenario.getOK.description}`, async () => {
    const response = await api.byVariant(testDataPOC.skuNoVariant, token);
    expect(response.status).to.equal(cases.scenario.getOK.responseCode, JSON.stringify(response.body));
    expect(response.body.data).to.be.jsonSchema(jsonData.schema);
    expect(response.body.data.sku).to.equal(testDataPOC.skuNoVariant);
  });

  it(`@neg @varianpdp ${cases.scenario.getNotFound.description}`, async () => {
    const response = await api.byVariant(testDataPOC.skuNotFound, token);
    expect(response.status).to.equal(cases.scenario.getNotFound.responseCode, JSON.stringify(response.body));
  });

  it(`${'@neg @varianpdp | '}${cases.scenario.getInvalidAuth.description}`, async () => {
    const response = await api.byVariant(testDataPOC.skuNoVariant, `${token}${token}`);
    expect(response.status).to.equal(cases.scenario.getInvalidAuth.respCodeInvld, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.invalidToken);
  });

  it(`${'@neg @varianpdp | '}${cases.scenario.getWithoutAuth.description}`, async () => {
    const response = await api.byVariantNoAuth(testDataPOC.skuNoVariant);
    expect(response.status).to.equal(cases.scenario.getWithoutAuth.responseCode, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.unauthorized);
  });

  it(`${'@neg @varianpdp | '}${cases.scenario.getInvalidAuth.descEmpty}`, async () => {
    const response = await api.byVariant(testDataPOC.skuNoVariant, emptyToken);
    expect(response.status).to.equal(cases.scenario.getInvalidAuth.respCodeUnAuth, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.unauthorized);
  });
});
