const expect = require('chai').expect;
const chai = require('chai');
const api = require('./../../../../tests/page-objects/api/backoffice/variants/variant_management.js');
const apiList = require('../../../../tests/page-objects/api/backoffice/variants/list_variant.js');
const jsonData = require('./../../../../tests/helper/schema/variants/detail_schema');
const cases = require('./../../../testcases/backoffice/variants/case_detail_variants');
const casesList = require('../../../testcases/backoffice/variants/case_list_variants');
const testData = require('./../../../helper/testDataVariants.js');
const userCredential = require('../../../helper/userCredential.json');
const common = require('./../../../helper/common.js');
chai.use(require('chai-json-schema'));

describe('Detail variants @happy @backoffice @categories @variants @detailvariant', () => {
  let token;
  let vID;

  before(async () => {
    const response = await common.getTokenBo(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`${casesList.getList.checkResult.description}`, (done) => {
    apiList.variantList({}, token, (response) => {
      vID = response.body.data[0];
      expect(response.body.data.length).to.not.equal(0);
      done();
    });
  });

  it(`${cases.getDetail.correctparam_datacontent.description}`, (done) => {
    api.variantDetail(vID.id, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.correctparam_datacontent.responseCode, response.body.message);
      expect(response.body.data.length).to.not.equal(0);
      expect(response.body.data).to.be.jsonSchema(jsonData.schema);
      expect(response.body.data.id).to.equal(vID.id);
      expect(response.body.data.name).to.equal(vID.name);
      expect(response.body.data.category.category3_name).to.equal(vID.category);

      for (let i = 0; i < response.body.data.values.length; i += 1) {
        expect(response.body.data.values[i]).to.equal(vID.values[i]);
      }
      done();
    });
  });
});

describe('Detail variants @detailvariant @neg', () => {
  let token;
  let vID;
  before(async () => {
    const response = await common.getTokenBo(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`${casesList.getList.checkResult.description}`, (done) => {
    apiList.variantList({}, token, (response) => {
      vID = response.body.data[0];
      expect(response.body.data.length).to.not.equal(0);
      done();
    });
  });

  // invalidid
  it(`${cases.getDetail.invalidid.description}`, (done) => {
    api.variantDetail(testData.DetailInvalidIdVariant, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.invalidid.responseCode, response.body.message);
      done();
    });
  });

  // negativeid
  it(`${cases.getDetail.negativeid.description}`, (done) => {
    api.variantDetail(testData.DetailNegativeIdVariant, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.negativeid.responseCode, response.body.message);
      done();
    });
  });

  // blankid
  it(`${cases.getDetail.blankid.description}`, (done) => {
    api.variantDetail(testData.DetailBlankIdVariant, token, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.blankid.responseCode, response.body.message);
      done();
    });
  });

  // invalidtoken
  it(`${cases.getDetail.invalidtoken.description}`, (done) => {
    api.variantDetail(vID.id, `${token}${token}`, 'with-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.invalidtoken.responseCode, response.body.message);
      done();
    });
  });

  // blanktoken
  it(`${cases.getDetail.blanktoken.description}`, (done) => {
    api.variantDetail(testData.DetailInvalidIdVariant, token, 'without-auth', (response) => {
      expect(response.status).to.equal(cases.getDetail.blanktoken.responseCode, response.body.message);
      done();
    });
  });
});
