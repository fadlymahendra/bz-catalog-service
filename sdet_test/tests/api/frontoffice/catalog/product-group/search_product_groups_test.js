
const { expect } = require('chai');
const api = require('../../../../page-objects/api/frontoffice/catalog/product-group/Search_product_groups.js');
const testData = require('../../../../helper/frontoffice/catalog/product-group/search_product_groups_data.json');
const credential = require('../../../../helper/userCredential.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const common = require('../../../../helper/common.js');

const string = {
  description: {
    get: 'Search Product group list',
    getNotFound: 'See Product group list with not found keyword',
    getWithoutAuth: 'See Product group list without Auth',
    getInvalidAuth: 'See Product group list invalid Auth',
  },
  describeIt: {
    checkGet: 'Product group list should be displayed',
    checkNotFound: 'See Product group list should not found',
    checkResultWithoutAuth: 'See Product group list without auth should give http response 401',
    checkResultInvalidAuth: 'See Product group list with invalid auth should give http response 403',
  },
};

describe('Search Product group', () => {
  let token;

  before(async () => {
    const response = await common.getTokenFo(credential.vendor.hvendor);
    token = response.body.seller.token;
  });

  it(`@happy @get @frontoffice ${string.description.get} ${string.describeIt.checkGet}`, async () => {
    const query = { ...testData.defaultSearchQuery };
    const response = await api.searchProdGroup(query, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.meta.total_data).not.equal(0);
  });

  it('@happy @get @frontoffice system does not return auto live product group', async () => {
    const query = { ...testData.defaultSearchQuery, search: 'Mesin Pengusir' };
    const response = await api.searchProdGroup(query, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.meta.total_data).not.equal(0);
  });

  it(`@neg @get @frontoffice ${string.description.getNotFound} ${string.describeIt.checkNotFound}`, async () => {
    const query = { ...testData.defaultSearchQuery, search: 'zxczxcz' };
    const response = await api.searchProdGroup(query, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.meta.total_data).to.equal(0);
  });

  it(`@neg @get @frontoffice ${string.description.getWithoutAuth} ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const query = { ...testData.defaultSearchQuery };
    const response = await api.searchProdGroupWoAuth(query);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @frontoffice ${string.description.getInvalidAuth} ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const query = { ...testData.defaultSearchQuery };
    const response = await api.searchProdGroup(query, credential.vendor.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
