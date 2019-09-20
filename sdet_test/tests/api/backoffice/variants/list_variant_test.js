
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

const { expect } = require('chai');
const math = require('math-precision').ceil;  // eslint-disable-line
const chai = require('chai');
const api = require('../../../../tests/page-objects/api/backoffice/variants/list_variant');
const authHelper = require('../../../helper/token');
const testDataVariant = require('../../../helper/backoffice/variant/list_data.json');
const jsonData = require('../../../../tests/helper/schema/variants/list_schema');
const cases = require('../../../testcases/backoffice/variants/case_list_variants');
const testData = require('../../../helper/testDataVariants.js');
const userCredential = require('../../../helper/userCredential.json');
chai.use(require('chai-json-schema'));

describe('List variants @happy @backoffice @variants @searchvariants @variantlist', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // checkResult
  it(`${cases.getList.checkResult.description}`, (done) => {
    api.variantList({}, token, (response) => {
      expect(response.status).to.equal(cases.getList.checkResult.responseCode, response.body.message);
      expect(response.body).to.be.jsonSchema(jsonData.schema);
      expect(response.body.data).to.not.equal(0);
      done();
    });
  });

  // searchbyvariantname
  it(`${cases.getList.searchbyvariantname.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, search: 'Warna TV' };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyvariantname.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.name.toString().toLowerCase().includes(query.search.toLowerCase()))).ok;
      done();
    });
  });

  // searchbyIdvariant
  it(`${cases.getList.searchbyIdvariant.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, search: '22' };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyIdvariant.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.find(variant => variant.id.toString().includes(query.search))).is.an('object');
      done();
    });
  });

  // searchbyIdvariantAndVariantname
  it(`${cases.getList.searchbyIdvariantAndVariantname.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, search: '21/Handphone' };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyIdvariantAndVariantname.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      done();
    });
  });

  // searchbyCategory
  it(`${cases.getList.searchbyCategory.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, category: testDataVariant.searchByCategory.category };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyCategory.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.category === testDataVariant.searchByCategory.expectedCategoryName)).ok;
      done();
    });
  });

  // searchbyCreatedBy
  it(`${cases.getList.searchbyCreatedBy.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, created_by: testDataVariant.validTemplateRequest.created_by };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyCreatedBy.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.created_by === testDataVariant.validTemplateRequest.created_by)).ok;
      done();
    });
  });

  // searchbyCreatedByAndCategory
  it(`${cases.getList.searchbyCreatedByAndCategory.description}`, (done) => {
    const query = {
      ...testDataVariant.validDefaultPaginationReq,
      created_by: testDataVariant.validTemplateRequest.created_by,
      category: testDataVariant.searchByCategory.category,
    };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyCreatedByAndCategory.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.created_by === testDataVariant.validTemplateRequest.created_by)).ok;
      expect(response.body.data.every(variant => variant.category === testDataVariant.searchByCategory.expectedCategoryName)).ok;
      done();
    });
  });

  // searchbyVariantnameAndCategory
  it(`${cases.getList.searchbyVariantnameAndCategory.description}`, (done) => {
    const query = {
      ...testDataVariant.validDefaultPaginationReq,
      search: testDataVariant.categoryPerangkatLunak.search,
      category: testDataVariant.categoryPerangkatLunak.category,
    };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyVariantnameAndCategory.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.category === testDataVariant.categoryPerangkatLunak.expectedCategoryName)).ok;
      expect(response.body.data.find(variant => variant.name.toString().toLowerCase().includes(query.search.toLowerCase()))).is.an('object');
      done();
    });
  });

  // searchbyCreatedByAndVariantname
  it(`${cases.getList.searchbyCreatedByAndVariantname.description}`, (done) => {
    const query = {
      ...testDataVariant.validDefaultPaginationReq,
      created_by: testDataVariant.validTemplateRequest.created_by,
      search: testDataVariant.categoryPerangkatLunak.search,
    };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyCreatedByAndVariantname.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.created_by === testDataVariant.validTemplateRequest.created_by)).ok;
      expect(response.body.data.find(variant => variant.name.toString().toLowerCase().includes(query.search.toLowerCase()))).is.an('object');
      done();
    });
  });

  // searchbyCreatedByAndVariantnameAndCategory
  it(`${cases.getList.searchbyCreatedByAndVariantnameAndCategory.description}`, (done) => {
    const query = {
      ...testDataVariant.validDefaultPaginationReq,
      created_by: testDataVariant.validTemplateRequest.created_by,
      search: testDataVariant.categoryPerangkatLunak.search,
      category: testDataVariant.categoryPerangkatLunak.category,
    };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.searchbyCreatedByAndVariantnameAndCategory.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.created_by === testDataVariant.validTemplateRequest.created_by)).ok;
      expect(response.body.data.every(variant => variant.category === testDataVariant.categoryPerangkatLunak.expectedCategoryName)).ok;
      expect(response.body.data.find(variant => variant.name.toString().toLowerCase().includes(query.search.toLowerCase()))).is.an('object');
      done();
    });
  });

  // metadatacontentNosearch
  it(`${cases.getList.metadatacontentNosearch.description}`, (done) => {
    api.variantList(testData.metadatacontentNosearch, token, (response) => {
      expect(response.status).to.equal(cases.getList.metadatacontentNosearch.responseCode, response.body.message);
      expect(response.body.meta.page).to.equal(testData.metadatacontentNosearch.page);
      expect(response.body.meta.limit).to.equal(testData.metadatacontentNosearch.limit);
      done();
    });
  });

  // metadatacontentSearchBypage
  it(`${cases.getList.metadatacontentSearchBypage.description}`, (done) => {
    api.variantList(testData.metadatacontentSearchBypage, token, (response) => {
      expect(response.status).to.equal(cases.getList.metadatacontentSearchBypage.responseCode, response.body.message);
      expect(response.body.meta.page).to.equal(testData.metadatacontentSearchBypage.page);
      done();
    });
  });

  // checkpageSearchBylimitEven
  it(`${cases.getList.checkpageSearchBylimitEven.description}`, (done) => {
    api.variantList(testData.checkpageSearchBylimitEven, token, (response) => {
      expect(response.status).to.equal(cases.getList.checkpageSearchBylimitEven.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.meta.page).to.equal(testData.checkpageSearchBylimitEven.page);
      expect(response.body.meta.limit).to.equal(testData.checkpageSearchBylimitEven.limit);
      done();
    });
  });

  // checkpageSearchBylimitOdd
  it(`${cases.getList.checkpageSearchBylimitOdd.description}`, (done) => {
    api.variantList(testData.checkpageSearchBylimitOdd, token, (response) => {
      expect(response.status).to.equal(cases.getList.checkpageSearchBylimitOdd.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.meta.page).to.equal(testData.checkpageSearchBylimitOdd.page);
      expect(response.body.meta.limit).to.equal(testData.checkpageSearchBylimitOdd.limit);
      done();
    });
  });

  // checktotalSkuSearchbyIdvariant
  it(`${cases.getList.checktotalSkuSearchbyIdvariant.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, search: testDataVariant.searchByVariantIdWithTotalSku.search };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.checktotalSkuSearchbyIdvariant.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => variant.id === query.search)).ok;
      expect(response.body.data.every(variant => variant.total_sku === testDataVariant.searchByVariantIdWithTotalSku.total_sku)).ok;
      done();
    });
  });

  // checkvaluesSearchbyIdvariant
  it(`${cases.getList.checkvaluesSearchbyIdvariant.description}`, (done) => {
    const query = { ...testDataVariant.validDefaultPaginationReq, search: testDataVariant.searchByVariantIdWithValues.search };
    api.variantList(query, token, (response) => {
      expect(response.status).to.equal(cases.getList.checkpageSearchBylimitOdd.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data.every(variant => JSON.stringify(variant.values) === JSON.stringify(testDataVariant.searchByVariantIdWithValues.values))).ok;
      done();
    });
  });
});

describe('List variants @neg @backoffice @variants @variantlist', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // blankcategory
  it(`${cases.getList.blankcategory.description}`, (done) => {
    api.variantList(testData.listblankcategory, token, (response) => {
      expect(response.status).to.equal(cases.getList.blankcategory.responseCode, response.body.message);
      done();
    });
  });

  // blankpage
  it(`${cases.getList.blankpage.description}`, (done) => {
    api.variantList(testData.blankpage, token, (response) => {
      expect(response.status).to.equal(cases.getList.blankpage.responseCode, response.body.message);
      done();
    });
  });

  // blanklimit
  it(`${cases.getList.blanklimit.description}`, (done) => {
    api.variantList(testData.blanklimit, token, (response) => {
      expect(response.status).to.equal(cases.getList.blanklimit.responseCode, response.body.message);
      done();
    });
  });

  // blankpageBlanklimit
  it(`${cases.getList.blankpageBlanklimit.description}`, (done) => {
    api.variantList(testData.blankpageBlanklimit, token, (response) => {
      expect(response.status).to.equal(cases.getList.blankpageBlanklimit.responseCode, response.body.message);
      done();
    });
  });

  // invalidtoken
  it(`${cases.getList.invalidtoken.description}`, (done) => {
    api.variantList(testData.metadatacontentNosearch, 'incorrect_token', (response) => {
      expect(response.status).to.equal(cases.getList.invalidtoken.responseCode, response.body.message);
      done();
    });
  });

  // blanktoken
  it(`${cases.getList.blanktoken.description}`, (done) => {
    api.variantListWoAuth(testData.metadatacontentNosearch, (response) => {
      expect(response.status).to.equal(cases.getList.blanktoken.responseCode, response.body.message);
      done();
    });
  });
});
