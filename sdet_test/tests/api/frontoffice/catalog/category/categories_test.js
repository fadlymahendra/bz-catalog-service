const expect = require('chai').expect;
const api = require('./../../../../page-objects/api/frontoffice/catalog/category/categories.js');
const common = require('./../../../../helper/common.js');
const userCredential = require('../../../../helper/userCredential.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    get: 'Get all categories',
    getWithoutAuth: 'Get all categories without Auth',
    getInvalidAuth: 'Get all categories invalid Auth',

  },
  describeIt: {
    checkGet: 'Categories should be displayed',
    checkResultWithoutAuth: 'Get all categories without auth should give http response 401',
    checkResultInvalidAuth: 'Get all categories invalid auth should give http response 403',
  },
};

describe('Get Categories list', () => {
  describe(`@happy @get @frontoffice ${string.description.get}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk);
      token = respond.body.seller.token;
    });
    it(string.describeIt.checkGet, async () => {
      const response = await api.searchCategories(token);
      expect(response.status).to.equal(200);
      expect(response.body.data).not.equal(0);
      expect(response.body.data[0].level).to.equal('C0');
    });
  });
});
