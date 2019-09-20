const expect = require('chai').expect;
const common = require('../../../helper/common.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Search_brands.js');
const cases = require('../../../testcases/frontoffice/catalog/search_brands_testcase.js');
const schema = require('../../../helper/schema/brands_crud_schema.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Search Brands', () => {
  const search = 'se';
  const searchNotFound = 'kasodkawokd';
  const page = 1;
  const limit = 5;

  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
    token = respond.body.seller.token;
  });

  it(`@happy @get @frontoffice  ${cases.scenario.getOK.desc}`, async () => {
    const resp = await api.searchBrand(search, page, limit, token);
    expect(resp.status).to.equal(cases.scenario.getOK.response, JSON.stringify(resp.body));
    expect(resp.body.meta.totaldata).not.equal(0);
    expect(resp.body.meta.total_page).not.equal(0);
    expect(resp.body.meta.page).to.equal(page);
    expect(resp.body.meta.limit).to.equal(limit);
    expect(resp.body.data).to.be.jsonSchema(schema.brandSearch);
  });

  it(`@neg @get @frontoffice ${cases.scenario.getOK.descNotFound}`, async () => {
    const resp = await api.searchBrand(searchNotFound, page, limit, token);
    expect(resp.status).to.equal(cases.scenario.getOK.response, JSON.stringify(resp.body));
    expect(resp.body.meta.total_data).to.equal(0);
    expect(resp.body.meta.total_page).to.equal(0);
    expect(resp.body.meta.page).to.equal(page);
    expect(resp.body.meta.limit).to.equal(limit);
    expect(resp.body.data).to.be.jsonSchema(schema.brandSearch);
  });
});
