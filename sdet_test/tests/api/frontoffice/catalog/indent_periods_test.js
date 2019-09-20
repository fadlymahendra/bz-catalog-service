const expect = require('chai').expect;
const global = require('../../../helper/global.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Indent_periods.js');
const cases = require('../../../testcases/frontoffice/catalog/Indent_periods_testcase.js');
const schema = require('../../../helper/schema/indent_periods_schema.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');

describe('Get Indent Periods', () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
    token = respond.body.seller.token;
  });
  it(`@happy @get @frontoffice ${cases.scenario.getOK.description}`, async () => {
    const response = await api.indentPeriod(token);
    expect(response.status).to.equal(cases.scenario.getOK.response, JSON.stringify(response.body));
    expect(response.body.data).to.be.jsonSchema(schema.indentPeriod);
    expect(response.body.data[0].value).to.equal(global.period.day);
    expect(response.body.data[0].label).to.equal(global.period.hari);
    expect(response.body.data[1].value).to.equal(global.period.week);
    expect(response.body.data[1].label).to.equal(global.period.minggu);
    expect(response.body.data[2].value).to.equal(global.period.month);
    expect(response.body.data[2].label).to.equal(global.period.bulan);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getWithoutAuth.description}`, async () => {
    const response = await api.indentPeriodWoAuth();
    expect(response.status).to.equal(cases.scenario.getWithoutAuth.response, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.unauthorized);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getInvalidAuth.description}`, async () => {
    const response = await api.indentPeriod(`${token}${token}`);
    expect(response.status).to.equal(cases.scenario.getInvalidAuth.response, JSON.stringify(response.body));
    expect(response.body.code).to.equal(global.codes.invalidToken);
  });
});
