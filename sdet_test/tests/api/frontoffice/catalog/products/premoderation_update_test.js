
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const authHelper = require('../../../../helper/token');
const api = require('../../../../page-objects/api/frontoffice/catalog/update');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/frontoffice/catalog/products/update_premod_data.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  describeIt: {
    successUpdateIndentPremodWithoutChangingStock: 'Success update premoderation indent product without changing the stock',
    failedUpdateIndentPremodChangingStock: 'Update premoderation indent product with changing the stock',
    failedUpdateIndentPremodWithoutAuthorization: 'Update premoderation indent product without proper authorization token',
  },
};

describe('Update Premoderation', () => {
  let token;
  const vendorId = testData.validVendorId;
  const validPremodId = testData.validPremodId;
  const validPremodIdChangeStock = testData.validPremodIdChangeStock;
  const validPremodIdWOAuth = testData.validPremodIdWOAuth;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.lindav);
    token = response.body.seller.token;
  });

  it(`@C11655 @happy @put @frontoffice @premodupdate @raymond | ${string.describeIt.successUpdateIndentPremodWithoutChangingStock}`, async () => {
    const response = await api.putPremodUpdate(vendorId, validPremodId, testData.validUpdatePremodRequestBody, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.id).to.equal(validPremodId);
    expect(response.body.data.vendor_id).to.equal(Number(vendorId));
    expect(response.body.data.premoderation_status).to.equal('revision_complete');
    expect(response.body.message).to.equal('Premoderation has been Changed');
  });

  it(`@C11687 @put @frontoffice @neg @premodupdate |  ${string.describeIt.failedUpdateIndentPremodChangingStock}`, async () => {
    const response = await api.putPremodUpdate(vendorId, validPremodIdChangeStock, testData.invalidUpdatePremodRequestBody, token);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@C11688 @put @frontoffice @neg @premodupdate |  ${string.describeIt.failedUpdateIndentPremodWithoutAuthorization}`, async () => {
    const response = await api.putPremodUpdateWoAuth(vendorId, validPremodIdWOAuth, testData.validUpdatePremodRequestBody);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
    expect(response.body.message).to.equal('Resource require credential');
  });
});
