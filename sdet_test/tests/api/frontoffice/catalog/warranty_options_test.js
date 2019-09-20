const expect = require('chai').expect;
const common = require('../../../helper/common.js');
const global = require('../../../helper/global.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Warranty_options.js');
const cases = require('../../../testcases/frontoffice/catalog/Warranty_options_testcase.js');
const schema = require('../../../helper/schema/warranty_schema.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Get Warranty Options', () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
    token = respond.body.seller.token;
  });

  it(`@happy @get @frontoffice ${cases.scenario.getOK.description}`, async () => {
    const response = await api.warrantyOption(token);
    expect(response.status).to.equal(cases.scenario.getOK.response, JSON.stringify(response.body));
    expect(response.body.data).to.be.jsonSchema(schema.warrantyOption);
    expect(response.body.data[0].value).to.equal('no_warranty');
    expect(response.body.data[0].label).to.equal('Tidak Bergaransi');
    expect(response.body.data[1].value).to.equal('official_warranty');
    expect(response.body.data[1].label).to.equal('Resmi');
    expect(response.body.data[2].value).to.equal('distributor');
    expect(response.body.data[2].label).to.equal('Distributor');
    expect(response.body.data[3].value).to.equal('warranty_shop');
    expect(response.body.data[3].label).to.equal('Toko');
    expect(response.body.data[4].value).to.equal('international');
    expect(response.body.data[4].label).to.equal('Internasional');
  });

  it(`@neg @get @frontoffice ${cases.scenario.getWithoutAuth.description}`, async () => {
    const response = await api.warrantyOptionWoAuth();
    expect(response.status).to.equal(cases.scenario.getWithoutAuth.response, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.unauthorized);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getInvalidAuth.description}`, async () => {
    const response = await api.warrantyOption(`${token}${token}`);
    expect(response.status).to.equal(cases.scenario.getInvalidAuth.response, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.invalidToken);
  });
});
