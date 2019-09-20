
/* eslint prefer-destructuring: off */
const { expect } = require('chai');
const authHelper = require('../../../../helper/token');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/backoffice/catalog/premoderation/assign_data.json');
const schemaResponse = require('../../../../helper/schema/backoffice/catalog/premoderation/assign_schema.json');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/assign.js');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    assign: 'As Backoffice user, I successfully assign premoderation sku to other user',
    assignInvalidToken: 'As Backoffice user, I failed assign premoderation sku to other user with invalid token',
    assignNoAuth: 'As Backoffice user, I failed assign premoderation sku to other user without authentication',
  },
};

describe('Premoderation Assign', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // TO DO: exploer more cases for this assignment SKU test

  it(`@happy @post @backoffice @premod | ${string.description.assign}`, (done) => {
    api.postPremodAssign(testData.validAssigneeAndProduct, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.be.jsonSchema(schemaResponse.validAssignPostResponse);
      expect(JSON.stringify(response.body.data.id)).to.equal(JSON.stringify(testData.validAssigneeAndProduct.products));
      done();
    });
  });

  it(`@neg @post @backoffice @premod | ${string.description.searchInvalidAuth}`, (done) => {
    api.postPremodAssign(testData.validAssigneeAndProduct, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @post @backoffice @premod | ${string.description.searchNoAuth}`, (done) => {
    api.postPremodAssignWoAuth(testData.validAssigneeAndProduct, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });
});
