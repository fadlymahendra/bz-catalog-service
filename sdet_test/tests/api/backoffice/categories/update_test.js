
const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const testData = require('../../../helper/backoffice/category/update_data.json');
const authHelper = require('../../../helper/token');
const credentialInfo = require('../../../helper/userCredential.json');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    updateC0: 'Update categories C0',
    updateC1: 'Update categories C1',
    updateC2: 'Update categories C2',
    updateC3: 'Update categories C3',
    updateNeg: 'Update categories with negative cases',
    updateCategoryUsedBySKU: 'Update category that used in SKU',
    updateWithoutMandatory: 'Update categories with empty mandatory field',
    updateLevel: 'Update level categories',
    updateInvalidUNSPSC: 'Update categories with invalid UNSPSC',
    updateParentID: 'Update Parent ID categories',
    updateInvalidAuth: 'Update categories with invalid Auth',
    updateNoAuth: 'Update categories without Auth',
  },
  describeIt: {
    checkUpdateC0: 'Categories C0 should be updated',
    checkUpdateC1: 'Categories C1 should be updated',
    checkUpdateC2: 'Categories C2 should be updated',
    checkUpdateC3: 'Categories C3 should be updated',
    checkUpdateCategoryUsedBySKU: 'Category should NOT be updated',
    checkUpdateWithoutMandatory: 'Categories should NOT updated',
    checkUpdateLevel: 'Categories should NOT updated',
    checkUpdateUNSPSC: 'Categories should NOT updated',
    checkUpdateParentID: 'Categories should NOT updated',
    checkUpdateInvalidAuth: 'Should give http response 403',
    checkUpdateNoAuth: 'Should give http response 401',
  },
};

describe(`@happy @put @backoffice @categories @updateCategory | ${string.description.updateC0}`, () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(credentialInfo.backOffice.admin);
    token = response.body.token;
  });

  it(`${string.describeIt.checkUpdateC0}`, async () => {
    const bodyUpdate = testData.validUpdateCategoryLvlC0.updateBody;
    const expectedUnspscData = testData.validUpdateCategoryLvlC0.expectedUnspscGetDetail;
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC0.categoryIds.c0, bodyUpdate, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.unspsc).to.equal(expectedUnspscData.unspscC0);
    const responseC1 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC0.categoryIds.c1, token);
    expect(responseC1.body.data.unspsc).to.equal(expectedUnspscData.unspscC1);
    const responseC2 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC0.categoryIds.c2, token);
    expect(responseC2.body.data.unspsc).to.equal(expectedUnspscData.unspscC2);
    const responseC3 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC0.categoryIds.c3, token);
    expect(responseC3.body.data.unspsc).to.equal(expectedUnspscData.unspscC3);
  });

  it(`${string.describeIt.checkUpdateC1}`, async () => {
    const bodyUpdate = testData.validUpdateCategoryLvlC1.updateBody;
    const expectedUnspscData = testData.validUpdateCategoryLvlC1.expectedUnspscGetDetail;
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC1.categoryIds.c1, bodyUpdate, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.unspsc).to.equal(expectedUnspscData.unspscC1);
    const responseC2 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC1.categoryIds.c2, token);
    expect(responseC2.body.data.unspsc).to.equal(expectedUnspscData.unspscC2);
    const responseC3 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC1.categoryIds.c3, token);
    expect(responseC3.body.data.unspsc).to.equal(expectedUnspscData.unspscC3);
  });

  it(`${string.describeIt.checkUpdateC2}`, async () => {
    const bodyUpdate = testData.validUpdateCategoryLvlC2.updateBody;
    const expectedUnspscData = testData.validUpdateCategoryLvlC2.expectedUnspscGetDetail;
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC2.categoryIds.c2, bodyUpdate, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.unspsc).to.equal(expectedUnspscData.unspscC2);
    const responseC3 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC2.categoryIds.c3, token);
    expect(responseC3.body.data.unspsc).to.equal(expectedUnspscData.unspscC3);
  });

  it(`${string.describeIt.checkUpdateC3}`, async () => {
    const bodyUpdate = testData.validUpdateCategoryLvlC3.updateBody;
    const expectedUnspscData = testData.validUpdateCategoryLvlC3.expectedUnspscGetDetail;
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, bodyUpdate, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.unspsc).to.equal(expectedUnspscData.unspscC3);
    const responseC3 = await api.getSingleCategoryDetail(testData.validUpdateCategoryLvlC3.categoryIds.c3, token);
    expect(responseC3.body.data.unspsc).to.equal(expectedUnspscData.unspscC3);
  });
});

describe(`@neg @put @backoffice @categories @updateCategory | ${string.description.updateNeg}`, () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(credentialInfo.backOffice.admin);
    token = response.body.token;
  });

  it(`${string.describeIt.checkUpdateWithoutMandatory}`, async () => {
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.failedUpdateCategoryWithEmptyMandatory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`${string.describeIt.checkUpdateCategoryUsedBySKU}`, async () => {
    const response = await api.updateCategory(testData.failedUpdateCategoryWithSKU.categoryId, testData.validUpdateCategoryLvlC1.updateBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.message).to.equal('Category is already registered with sku');
  });

  it(`${string.describeIt.checkUpdateLevel}`, async () => {
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.failedUpdateCategoryWithLevelSpecified, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.message).to.equal('"level" is not allowed');
  });

  it(`${string.describeIt.checkUpdateUNSPSC}`, async () => {
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.failedUpdateCategoryWithInvalidUNSPSC, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
  });

  it(`${string.describeIt.checkUpdateParentID}`, async () => {
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.failedUpdateCategoryWithParentIdSpecified, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.message).to.equal('"parent_id" is not allowed');
  });

  it(`${string.describeIt.checkUpdateInvalidAuth}`, async () => {
    const response = await api.updateCategory(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.validUpdateCategoryLvlC1.updateBody, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`${string.describeIt.checkUpdateNoAuth}`, async () => {
    const response = await api.updateCategoryWithoutAuth(testData.validUpdateCategoryLvlC3.categoryIds.c3, testData.validUpdateCategoryLvlC1.updateBody);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
