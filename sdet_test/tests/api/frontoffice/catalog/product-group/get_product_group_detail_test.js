
const { expect } = require('chai');
const userCredential = require('../../../../helper/userCredential.json');
const api = require('../../../../page-objects/api/frontoffice/catalog/product-group/get_product_detail');
const common = require('../../../../helper/common.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    get: 'See product group details',
    getNotFound: 'See product group details with not found Id',
    getWithoutAuth: 'See product group details without Auth',
    getInvalidAuth: 'See product group details invalid Auth',
  },
  describeIt: {
    checkGet: 'Product group details should be displayed',
    checkNotFound: 'Should give error See product group details not found',
    checkResultWithoutAuth: 'See product group details without auth should give http response 401',
    checkResultInvalidAuth: 'See product group details with invalid auth should give http response 403',
  },
};

describe('Product group details', () => {
  let token;
  const pgroupId = 2;
  const notFoundId = 30000;

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.lindav);
    token = response.body.seller.token;
  });

  it(`@happy @get @frontoffice | ${string.description.get} ${string.describeIt.checkGet}`, async () => {
    const response = await api.getProductGroupDetail(pgroupId, token);
    expect(response.status).to.equal(responseCodeMessage.successOk, response.body.message);
    expect(response.body.data.id).to.equal(pgroupId);
  });

  it(`@reg @get @frontoffice | ${string.description.getNotFound} ${string.describeIt.checkNotFound}`, async () => {
    const response = await api.getProductGroupDetail(notFoundId, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @get @frontoffice | ${string.description.getWithoutAuth} ${string.describeIt.checkResultWithoutAuth}`, async () => {
    const response = await api.getProductGroupDetailWoAtuh(pgroupId);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @frontoffice | ${string.description.getInvalidAuth} ${string.describeIt.checkResultInvalidAuth}`, async () => {
    const response = await api.getProductGroupDetail(pgroupId, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRqLnZlb');
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber, response.body.message);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });
});
