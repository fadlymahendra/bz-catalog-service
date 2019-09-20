const { expect } = require('chai');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/vendor_list.js');
const common = require('../../../../helper/common.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const testData = require('./../../../../helper/backoffice/catalog/premoderation/vendor_data.json');

const string = {
  description: {
    search: 'Search Vendor list',
    searchInvalidAuth: 'Search Vendor with invalid Auth',
    searchNoAuth: 'Search Vendor without Auth',
    searchSpecific: 'Search Vendor with specific keyword',
    searchNotFound: 'Search Vendor with not found keyword',
  },
  describeIt: {
    checkSearch: 'Vendor list should be displayed',
    checkSearchInvalidAuth: 'Search Vendor without auth should give http response 403',
    checkSearchNoAuth: 'Search Vendor without auth should give http response 401',
    checkNotFound: 'Search Vendor list with not found keyword should give http response 404',
    checkSearchSpecific: 'Search Vendor list with keyword mer will appear',
  },
};

describe(string.description.search, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @premod ${string.describeIt.checkResult}`, async () => {
    const response = await api.searchVendor(testData.validGetVendor, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@happy @get @backoffice @premod ${string.describeIt.checkResult}`, async () => {
    const response = await api.searchVendorWithoutAuth(testData.validGetVendorWithSpesificKeyword);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(`@happy @get @backoffice @premod ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await api.searchVendor(testData.invalidVendorName, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.data).not.equal(0);
  });
});
