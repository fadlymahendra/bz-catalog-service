const expect = require('chai').expect;
const api = require('./../../../../page-objects/api/frontoffice/catalog/category/categories_by_id.js');
const common = require('./../../../../helper/common.js');
const userCredential = require('../../../../helper/userCredential.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    get: 'Search categories by ID',
    getNotFound: 'Search categories by ID with not found Id',
    getWithoutAuth: 'Search categories by ID without Auth',
    getInvalidAuth: 'Search categories by ID invalid Auth',

  },
  describeIt: {
    checkGet: 'Categories by ID should be displayed',
    checkNotFound: 'Should give error Search categories by ID not found',
    checkResultWithoutAuth: 'Search categories by ID without auth should give http response 401',
    checkResultInvalidAuth: 'Search categories by ID with invalid auth should give http response 403',
  },
};

const notFoundId = 14000;
const categoryID = 5;

describe(`${'@happy @get @frontoffice @categoryByID| '}${string.description.get}`, () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(string.describeIt.checkGet, async () => {
    const response = await api.getCategoriesById(categoryID, token);
    expect(response.status).to.equal(200);
    expect(response.body.data).not.equal(0);
  });
});

describe(`${'@neg @get @frontoffice @categoryByID| '}${string.description.getNotFound}`, () => {
  let token;
  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(string.describeIt.checkNotFound, async () => {
    const response = await api.getCategoriesById(notFoundId, token);
    expect(response.status).to.equal(200);
  });
});
