const expect = require('chai').expect;
const common = require('../../../helper/common.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Search_uoms.js');
const global = require('../../../helper/global.js');
const cases = require('../../../testcases/frontoffice/catalog/search_uom_testcase.js');
const schema = require('../../../helper/schema/uom_schema.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Get Uoms list', () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
    token = respond.body.seller.token;
  });

  it(`@happy @get @frontoffice ${cases.scenario.getOK.description}`, async () => {
    const resp = await api.searchUoms(token);
    expect(resp.status).to.equal(cases.scenario.getOK.response, JSON.stringify(resp.body));
    expect(resp.body.data).to.be.jsonSchema(schema.uomList);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getWithoutAuth.description}`, async () => {
    const resp = await api.searchUomsWoAuth();
    expect(resp.status).to.equal(cases.scenario.getWithoutAuth.response, JSON.stringify(resp.body));
    expect(resp.body.code).to.equal(global.codes.unauthorized);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getInvalidAuth.description}`, async () => {
    const resp = await api.searchUoms(`${token}${token}`);
    expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response, JSON.stringify(resp.body));
    expect(resp.body.code).to.equal(global.codes.invalidToken);
  });
});
