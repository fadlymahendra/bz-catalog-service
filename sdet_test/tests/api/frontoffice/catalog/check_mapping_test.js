const expect = require('chai').expect;
const common = require('../../../helper/common.js');
const api = require('../../../page-objects/api/frontoffice/catalog/Check_mapping.js');
const jsonData = require('./../../../helper/schema/frontoffice/check_mapping_schema.json');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

const string = {
  description: {
    checkMapping: 'Check Mapping',
    checkMappingWithoutParam: 'Check mapping with empty param',
    checkMappingEmptySKUS: 'Check mapping with empty SKUS',
    checkMappingWithoutOrgId: 'Check mapping with empty SKUS',
    checkMappingEmptyCatalogId: 'Check mapping with empty SKUS',
    checkMappingInvalidAuth: 'Check mapping with invalid Auth',
    checkMappingNoAuth: 'Check mapping without Auth',
  },
  describeIt: {
    checkMapping: 'Check mapping should be success',
    checkMappingWithoutParam: 'Check mapping should NOT succes',
    checkMappingEmptySKUS: 'Should give http response 403',
    checkMappingWithoutOrgId: 'Should give http response 403',
    checkMappingEmptyCatalogId: 'Should give http response 403',
    checkMappingInvalidAuth: 'Should give http response 403',
    checkMappingNoAuth: 'Should give http response 401',
  },
};

describe('Check Mapping', () => {
  const paramQuery = {
    skus: 'TRG8QVK5SI',
    organization_id: 312,
    catalog_id: '5afab42ec5850268dba76c88',
  };

  describe(`@happy @get @frontoffice @checkMapping${string.description.checkMapping}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    it(string.describeIt.checkMapping, async () => {
      const response = await api.checkMapping(paramQuery, token);
      expect(response.status).to.equal(responseMessageCode.successOk, JSON.stringify(response.body));
      expect(response.body).to.be.jsonSchema(jsonData);
    });
  });

  describe(`@neg@get@frontoffice @checkMapping ${string.description.checkMappingWithoutParam}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    const paramQueryEmpty = {

    };
    it(string.describeIt.checkMappingWithoutParam, async () => {
      const response = await api.checkMapping(paramQueryEmpty, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal('BadRequest');
    });
  });

  describe(`@neg @get @frontoffice @checkMapping ${string.description.checkMappingEmptySKUS}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    const paramQueryEmptySKU = {
      skus: '',
      organization_id: 312,
      catalog_id: '5afab42ec5850268dba76c88',
    };
    it(string.describeIt.checkMappingEmptySKUS, async () => {
      const response = await api.checkMapping(paramQueryEmptySKU, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal('BadRequest');
    });
  });

  describe(`@neg @get @frontoffice @checkMapping ${string.description.checkMappingWithoutOrgId}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    const paramQueryWithoutOrgId = {
      skus: 'TRG8QVK5SI',
      catalog_id: '5afab42ec5850268dba76c88',
    };
    it(string.describeIt.checkMappingWithoutOrgId, async () => {
      const response = await api.checkMapping(paramQueryWithoutOrgId, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
    });
  });

  describe(`@neg @get @frontoffice @checkMapping ${string.description.checkMappingEmptyCatalogId}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    const paramQueryEmptyCatalogId = {
      skus: 'TRG8QVK5SI',
      organization_id: 312,
      catalog_id: '',
    };
    it(string.describeIt.checkMappingEmptyCatalogId, async () => {
      const response = await api.checkMapping(paramQueryEmptyCatalogId, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
    });
  });


  describe(`@neg @get @frontoffice @checkMapping ${string.description.checkMappingInvalidAuth}`, () => {
    let token;
    before(async () => {
      const userToLogin = userCredential.vendor.lindav;
      const respond = await common.getTokenFo(userToLogin);
      expect(respond.status).to.equal(responseMessageCode.successOk, JSON.stringify(respond.body));
      token = respond.body.seller.token;
    });
    it(string.describeIt.checkMappingInvalidAuth, async () => {
      const response = await api.checkMapping(paramQuery, `${token}${token}`);
      expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
    });
  });

  describe(`@neg @get @frontoffice @checkMapping ${string.description.checkMappingNoAuth}`, () => {
    it(string.describeIt.checkMappingNoAuth, async () => {
      const response = await api.checkMappingWoAuth(paramQuery);
      expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
    });
  });
});
