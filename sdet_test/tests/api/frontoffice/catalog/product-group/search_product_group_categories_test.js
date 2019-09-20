
const { expect } = require('chai');
const userCredential = require('../../../../helper/userCredential.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const api = require('../../../../page-objects/api/frontoffice/catalog/product-group/search_product_group_categories.js');
const common = require('../../../../helper/common.js');

const string = {
  description: {
    get: 'Search Product group by categories',
    getNotFound: 'Search Product group by categories with not found keyword',
    getWithoutAuth: 'Search Product group by categories without Auth',
    getInvalidAuth: 'Search Product group by categories invalid Auth',

  },
  describeIt: {
    checkGet: 'Product group by categories should be displayed',
    checkNotFound: 'Should give error Attribute not found',
    checkResultWithoutAuth: 'Search Product group by categories without auth should give http response 401',
    checkResultInvalidAuth: 'Search Product group by categories should give http response 403',
  },
};

const search = 'hangkul';
const searchNotFound = 'zxczcmlsafakf';

describe(`${string.description.get}`, () => {
  let token;

  before(async () => {
    const vendorH = userCredential.vendor.hvendor;
    const response = await common.getTokenFo(vendorH);
    token = response.body.seller.token;
  });

  it(`@happy @get @frontoffice @searchPGCategories | ${string.describeIt.checkGet}`, async () => {
    const response = await api.searchPgroupCategories(search, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.data[12].total).to.equal(4);
  });

  it('@happy @get @frontoffice @searchPGCategories success uncount auto live product group', async () => {
    const searchHideAutoLiveProduct = 'Mesin Pengusir';
    const response = await api.searchPgroupCategories(searchHideAutoLiveProduct, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(api.getTotalProductGroupCountByCategoryId(12, response)).to.equal(2);
  });

  it(`@neg @get @frontoffice @searchPGCategories | ${string.description.getNotFound} ${string.describeIt.checkNotFound}`, async () => {
    const response = await api.searchPgroupCategories(searchNotFound, token);
    expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
    expect(response.body.data[7].total).to.equal(0);
  });

  it(`@neg @get @frontoffice @searchPGCategories | ${string.description.getNotFound} ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await api.searchPgroupCatNoAuth(search);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @frontoffice @searchPGCategories | ${string.description.getNotFound} ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await api.searchPgroupCategories(search, userCredential.vendor.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
