
const { expect } = require('chai');
const cases = require('../../../testcases/backoffice/catalog/categories/case_listAll_categories.js');
const api = require('../../../page-objects/api/backoffice/categories/list_all');
const testData = require('../../../helper/backoffice/category/list_all_data.json');
const listAllCategorySchema = require('../../../helper/schema/backoffice/category/list_all_schema.json');
const authHelper = require('../../../helper/token');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('List categories @backoffice @categories @listallcategories', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`${cases.getList.correctparam_datacontent_active.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, status: 1 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_nonactive.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, status: 0 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_c0.description} will fail because timeout`, (done) => {
    const query = { ...testData.defaultPaginationReq, level: 'C0' };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.level === query.level)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_c1.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, level: 'C1' };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.level === query.level)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_c2.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, level: 'C2' };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.level === query.level)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_c3.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, level: 'C3' };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.level === query.level)).ok;
      done();
    });
  });

  it(`${cases.getList.correctparam_datacontent_createdby.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, created_by: 73 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.every(cat => cat.created_by === query.created_by)).ok;
      done();
    });
  });

  it(`${cases.getList.metadatacontentNosearch.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, limit: 10 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.meta.limit).to.equal(query.limit);
      expect(response.body.meta.page).to.equal(query.page);
      done();
    });
  });

  it(`${cases.getList.metadatacontentSearchBypage.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, page: 2 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.meta.limit).to.equal(query.limit);
      expect(response.body.meta.page).to.equal(query.page);
      done();
    });
  });

  // searchbyCategoryid
  it(`${cases.getList.searchby_idcategory.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByCatId };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.find(cat => cat.name.includes(query.name))).to.be.an('object');
      expect(response.body.data.find(cat => cat.id.toString() === query.name)).to.be.an('object');
      done();
    });
  });

  it(`${cases.getList.checkpage_search_bylimit_morethan_totaldata.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByCatId, limit: 14 };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(0);
      expect(response.body.data.find(cat => cat.name.includes(query.name))).to.be.an('object');
      expect(response.body.data.find(cat => cat.id.toString() === query.name)).to.be.an('object');
      done();
    });
  });


  // searchbyCategoryname
  it(`${cases.getList.searchbycategoryname.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSeacrhByCompleteCatName };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data.every(cat => cat.name === query.name)).ok;
      done();
    });
  });

  // searchbyCategoryname_partial
  it(`${cases.getList.searchbyCategoryname_partial.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByNamePartial };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(1);
      expect(response.body.data.every(cat => cat.name.toLowerCase().includes(query.name.toLowerCase()))).ok;
      done();
    });
  });

  // searchbyCategoryname_withstatusActive
  it(`${cases.getList.searchbyCategoryname_withstatusActive.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByNameAndStatus };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data.every(cat => cat.name === query.name)).ok;
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });

  // searchbyCategoryname_partial_withstatusActive
  it(`${cases.getList.searchbyCategoryname_partial_withstatusActive.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByPartialNameAndStatus };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.above(1);
      expect(response.body.data.every(cat => cat.name.toLowerCase().includes(query.name.toLowerCase()))).ok;
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });

  // searchbyCategoryname_withstatusNonActive
  it(`${cases.getList.searchbyCategoryname_withstatusNonActive.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByNameAndStatusInactive };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data.every(cat => cat.name === query.name)).ok;
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });

  // searchbyCategoryname_partial_withstatusNonActive
  it(`${cases.getList.searchbyCategoryname_partial_withstatusNonActive.description}`, (done) => {
    const query = { ...testData.defaultPaginationReq, ...testData.validSearchByPartialNameAndStatusInactive };
    api.getListAllCategory(token, query, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.jsonSchema(listAllCategorySchema);
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data.every(cat => cat.name.includes(query.name))).ok;
      expect(response.body.data.every(cat => cat.is_active === query.status)).ok;
      done();
    });
  });
});


describe('List categories @neg @backoffice @categories @listallcategories', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // blanklevel
  it(`${cases.getList.blanklevel.description}`, (done) => {
    api.getListAllCategory(token, { ...testData.defaultPaginationReq, level: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it('Get error when search with empty created by parameter', (done) => {
    api.getListAllCategory(token, { ...testData.defaultPaginationReq, created_by: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it('Get error when search with empty status parameter', (done) => {
    api.getListAllCategory(token, { ...testData.defaultPaginationReq, status: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  // blankpage
  it(`${cases.getList.blankpage.description}`, (done) => {
    api.getListAllCategory(token, { ...testData.defaultPaginationReq, page: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  // blanklimit
  it(`${cases.getList.blanklimit.description}`, (done) => {
    api.getListAllCategory(token, { ...testData.defaultPaginationReq, limit: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  // blankpageBlanklimit
  it(`${cases.getList.blankpageBlanklimit.description}`, (done) => {
    api.getListAllCategory(token, { page: '', limit: '' }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  // invalidtoken
  it(`${cases.getList.invalidtoken.description}`, (done) => {
    api.getListAllCategory('incorrect_token', { ...testData.defaultPaginationReq }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  // blanktoken
  it(`${cases.getList.blanktoken.description}`, (done) => {
    api.getListAllCategoryWoAuth({ ...testData.defaultPaginationReq }, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });
});
