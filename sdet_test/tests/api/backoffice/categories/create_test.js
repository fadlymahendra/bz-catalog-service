
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const common = require('./../../../helper/common.js');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const jsonData = require('./../../../helper/backoffice/schema/catalog/categories/create_schema.js');
const testData = require('./../../../helper/testDataCategories.js');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
const userCredential = require('./../../../helper/userCredential.json');

const testScenario = {
  describe: 'As Bizzy Content, I able to create categories',
  successPostCategory: 'should success create categories with fill all field',
  failedPostCategoryWithoutMandatory: 'failed create categories with empty mandatory field',
  failedPostCategoryExistName: 'failed create categories with exist name',
  failedPostCategoryExistUNSPSC: 'failed create categories with exist UNSPSC',
  failedPostCategoryInvalidAuth: 'failed create categories with invalid Auth',
  failedPostCategoryNoAuth: 'failed create categories without Auth',
};

describe(`@createCat ${testScenario.describe}`, () => {
  let tokenBo;

  before(async () => {
    const userBoToLogin = userCredential.backOffice.admin;
    const respondBo = await common.getTokenBo(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
  });

  testData.createCategoriesInvalid.forEach((element) => {
    it(`@neg ${testScenario.failedPostCategoryWithoutMandatory}`, (done) => {
      api.create(element, tokenBo, (error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.code).to.equal('BadRequest');
        done();
      });
    });
  });

  it(`@neg ${testScenario.failedPostCategoryExistName}`, (done) => {
    api.create(testData.createCategoriesExistName, tokenBo, (error, response) => {
      expect(response.status).to.equal(400);
      expect(response.body.code).to.equal('BadRequest');
      done();
    });
  });

  it(`@neg ${testScenario.failedPostCategoryExistUNSPSC}`, (done) => {
    api.create(testData.createCategoriesExistUNSPSC, tokenBo, (error, response) => {
      expect(response.status).to.equal(400);
      expect(response.body.code).to.equal('BadRequest');
      done();
    });
  });

  testData.createCategories.forEach((element) => {
    it(`@happy ${testScenario.successPostCategory}`, (done) => {
      api.create(element, tokenBo, (error, response) => {
        expect(response.status).to.equal(201);
        response.body.ids.forEach((category) => {
          expect(category.is_active).to.equal(1);
        });
        expect(response.body).to.be.jsonSchema(jsonData.createCategories);
        done();
      });
    });
  });

  it(`@neg ${testScenario.failedPostCategoryInvalidAuth}`, (done) => {
    api.create(testData.createCategories, testData.token.invalidToken, (error, response) => {
      expect(response.status).to.equal(403);
      expect(response.body.code).to.equal('INVALID_TOKEN');
      done();
    });
  });

  it(`@neg ${testScenario.failedPostCategoryNoAuth}`, (done) => {
    api.createWithoutAuth(testData.createCategories, (error, response) => {
      expect(response.status).to.equal(401);
      expect(response.body.code).to.equal('UNAUTHORIZED');
      done();
    });
  });
});
