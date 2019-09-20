const expect = require('chai').expect;
const common = require('../../../helper/common.js');
const global = require('../../../helper/global.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Warranty_periods.js');
const cases = require('../../../testcases/frontoffice/catalog/Warranty_periods_testcase.js');
const schema = require('../../../helper/schema/warranty_schema.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Get Warranty Periods', () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(`@happy @get @frontoffice ${cases.scenario.getOK.description}`, async () => {
    const response = await api.warrantyPeriod(token);
    expect(response.status).to.equal(cases.scenario.getOK.response);
    expect(response.body.data).to.be.jsonSchema(schema.warrantyPeriod);
    expect(response.body.data[0].value).to.equal(global.period.week);
    expect(response.body.data[0].label).to.equal(global.period.minggu);
    expect(response.body.data[1].value).to.equal(global.period.month);
    expect(response.body.data[1].label).to.equal(global.period.bulan);
    expect(response.body.data[2].value).to.equal(global.period.year);
    expect(response.body.data[2].label).to.equal(global.period.tahun);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getWithoutAuth.description}`, async () => {
    const response = await api.warrantyPeriodWoAuth();
    expect(response.status).to.equal(cases.scenario.getWithoutAuth.response);
    expect(response.body.code).to.equal(global.codes.unauthorized);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getInvalidAuth.description}`, async () => {
    const response = await api.warrantyPeriod(`${token}${token}`);
    expect(response.status).to.equal(cases.scenario.getInvalidAuth.response);
    expect(response.body.code).to.equal(global.codes.invalidToken);
  });
});
