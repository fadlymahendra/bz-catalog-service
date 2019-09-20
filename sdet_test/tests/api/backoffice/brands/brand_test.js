/* eslint prefer-destructuring:off */

const { expect } = require('chai');
const testData = require('../../../helper/backoffice/brands/brands_data.json');
const brandDetailSchema = require('../../../helper/schema/backoffice/brand/brand_schema.json');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const authHelper = require('../../../helper/token.js');
const userCredential = require('../../../helper/userCredential.json');

const brands = require('./../../../page-objects/api/backoffice/brands/brand.js');
const cases = require('./../../../testcases/backoffice/catalog/brands_crud_testcase.js');

// CRUD brands
describe('CRUD /catalog/brands', () => {
  let token;
  let brandIdToDelete;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // create brand without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthCreate}`, (done) => {
    brands.createBrandWoAuth(testData.successCreateBrand, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionCreate}`, (done) => {
    brands.createBrand(testData.successCreateBrand, 'invalidAuth', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // create brand
  it(`@happy @brands @backoffice | ${cases.scenario.getOK.descCreate}`, (done) => {
    brands.createBrand(testData.successCreateBrand, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successCreated);
      expect(resp.body.data).to.be.jsonSchema(brandDetailSchema.successPostResponse);
      expect(resp.body.data.name).to.equal(testData.successCreateBrand.name);
      brandIdToDelete = resp.body.data.id;
      done();
    });
  });

  // create duplicate brand
  it(`@reg @brands @backoffice | ${cases.scenario.getBadRequest.descCreateDuplicate}`, (done) => {
    brands.createBrand(testData.successCreateBrand, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(testData.failedDuplicateBrand);
      done();
    });
  });

  // get brand without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthDetail}`, (done) => {
    brands.getBrandsDetailWoAuth(testData.successGetBrandDetail.brandId, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionDetail}`, (done) => {
    brands.getBrandsDetail(testData.successGetBrandDetail.brandId, 'incorrect_token', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // get brand
  it(`@reg @brands @backoffice | ${cases.scenario.getOK.descGetDetail}`, (done) => {
    brands.getBrandsDetail(testData.successGetBrandDetail.brandId, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(resp.body).to.be.jsonSchema(brandDetailSchema.validGetBrandDetail);
      expect(resp.body.data.id).to.equal(testData.successGetBrandDetail.brandId);
      expect(resp.body.data.name).to.equal(testData.successGetBrandDetail.brandName);
      done();
    });
  });

  // get brand random without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthRandomDetail}`, (done) => {
    brands.getBrandsDetailWoAuth(testData.successGetBrandDetail.brandId, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionAll}`, (done) => {
    brands.getBrandsDetail(testData.successGetBrandDetail.brandId, 'incorrect_token', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // get brand random
  it(`@happy @brands @backoffice | ${cases.scenario.getOK.descGetRandomDetail}`, (done) => {
    brands.getBrandsDetail(testData.successGetBrandDetail.brandId, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successOk);
      expect(resp.body).to.be.jsonSchema(brandDetailSchema.validGetBrandDetail);
      done();
    });
  });

  // get all brand without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthAll}`, (done) => {
    brands.searchBrandWoAuth(testData.successSearchBrand, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionAll}`, (done) => {
    brands.searchBrand(testData.successSearchBrand, 'incorrect_token', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // get all brand
  it(`@happy @brands @backoffice | ${cases.scenario.getOK.descGetAllBrand}`, (done) => {
    brands.searchBrand(testData.successSearchBrand, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successOk);
      expect(resp.body).to.be.jsonSchema(brandDetailSchema.successGetBrandListResponse);
      done();
    });
  });

  // update brand without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthUpdate}`, (done) => {
    brands.updateBrandWoAuth(testData.successUpdateBrandName.brandIdForUpdate, testData.successUpdateBrandName.updateBody, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionUpdate}`, (done) => {
    brands.updateBrand(testData.successUpdateBrandName.brandIdForUpdate, testData.successUpdateBrandName.updateBody, 'incorrect_token', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // update brand
  it(`@happy @brands @backoffice | ${cases.scenario.getOK.descUpdate}`, (done) => {
    brands.updateBrand(testData.successUpdateBrandName.brandIdForUpdate, testData.successUpdateBrandName.updateBody, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successOk);
      expect(resp.body).to.be.jsonSchema(brandDetailSchema.successPutBrandNameResponse);
      expect(resp.body.data.name).to.equal(testData.successUpdateBrandName.updateBody.name);
      done();
    });
  });

  // read brand after update
  it(`@happy @brands @backoffice | ${cases.scenario.getOK.descReadUpdate}`, (done) => {
    brands.getBrandsDetail(testData.successUpdateBrandName.brandIdForUpdate, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successOk);
      expect(resp.body).to.be.jsonSchema(brandDetailSchema.validGetBrandDetail);
      expect(resp.body.data.id).to.equal(testData.successUpdateBrandName.brandIdForUpdate);
      expect(resp.body.data.name).to.equal(testData.successUpdateBrandName.updateBody.name);
      done();
    });
  });

  // delete brand without auth
  it(`@neg @brands @backoffice | ${cases.scenario.getWithoutAuth.descWithoutAuthDelete}`, (done) => {
    brands.deleteBrandWoAuth(brandIdToDelete, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @brands @backoffice | ${cases.scenario.getInvalidAuth.descOtherSessionDelete}`, (done) => {
    brands.deleteBrand(brandIdToDelete, 'incorrect_token', (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // delete brand
  it(`@reg @brands @backoffice | ${cases.scenario.getOK.descDelete}`, (done) => {
    brands.deleteBrand(brandIdToDelete, token, (resp) => {
      expect(resp.status).to.equal(responseCodeMessage.successNoContent);
      done();
    });
  });
});
