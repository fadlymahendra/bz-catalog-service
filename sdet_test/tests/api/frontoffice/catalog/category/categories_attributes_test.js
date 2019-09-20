const expect = require('chai').expect;
const common = require('./../../../../helper/common.js');
const api = require('./../../../../page-objects/api/frontoffice/catalog/category/categories_attributes.js');
const userCredential = require('../../../../helper/userCredential.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    get: 'Get categories Attributes',
    getNotFound: 'Get categories attributes with not found Id',
    getWithoutAuth: 'Get categories attributes without Auth',
    getInvalidAuth: 'Get categories attributes invalid Auth',

  },
  describeIt: {
    checkGet: 'Categories attributes should be displayed',
    checkNotFound: 'Should give error Attribute not found',
    checkResultWithoutAuth: 'Get categories attributes without auth should give http response 401',
    checkResultInvalidAuth: 'Get categories attributes should give http response 403',
  },
};

const categoryID = 8938;
const invalidCategory = 14000;

describe(`${'@happy @get @frontoffice @categoryAttribute | '}${string.description.get}`, () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(string.describeIt.checkGet, async () => {
    const response = await api.getCategoriesAttributes(categoryID, token);
    expect(response.status).to.equal(200);
    expect(response.body.data).not.equal(0);
    expect(response.body.data.variant_count).to.equal(1);
  });
});

describe(`${'@neg @get @frontoffice @categoryAttribute | '}${string.description.getNotFound}`, () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(string.describeIt.checkNotFound, async () => {
    const response = await api.getCategoriesAttributes(invalidCategory, token);
    expect(response.status).to.equal(404);
    expect(response.body.code).to.equal('NotFound');
  });
});
