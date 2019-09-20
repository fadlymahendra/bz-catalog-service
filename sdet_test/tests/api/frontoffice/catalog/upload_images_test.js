/* eslint-disable indent */
const expect = require('chai').expect;
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/testData.js');
const api = require('./../../../page-objects/api/frontoffice/catalog/upload_images.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

const string = {
  description: {
    uploadImage: 'Upload images',
    getWithoutAuth: 'Upload images without Auth',
    getInvalidAuth: 'Upload images invalid Auth',

  },
  describeIt: {
    checkUpload: 'Image URL should be created',
    checkResultWithoutAuth: 'Upload images without auth should give http response 401',
    checkResultInvalidAuth: 'Upload images invalid auth should give http response 403',
  },
};

describe('Post Upload Image', () => {
  const image = ({
    image: testData.Imagefile(),
  });
  describe(`@happy @post @frontoffice ${string.description.uploadImage}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.dj2;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    it(string.describeIt.checkUpload, async () => {
      const response = await api.postUploadImages(image, token);
        expect(response.status).to.equal(responseMessageCode.successCreated, JSON.stringify(response.body));
        expect(response.body.data).not.equal(0);
    });
  });

  describe(`@neg @post @frontoffice ${string.description.getWithoutAuth}`, () => {
    it(string.describeIt.checkResultWithoutAuth, async () => {
      const response = await api.postUploadImagesWoAuth(image);
        expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber, JSON.stringify(response.body));
        expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
    });
  });

  describe(`@neg @post @frontoffice ${string.description.getInvalidAuth}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.dj2;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk);
      token = respond.body.seller.token;
    });
    it(string.describeIt.checkResultInvalidAuth, async () => {
      const response = await api.postUploadImages(image, `${token}${token}`);
        expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, JSON.stringify(response.body));
        expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
    });
  });
});
