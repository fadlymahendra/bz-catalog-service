const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));

const publicCatalog = require('./../../../page-objects/api/frontoffice/public-catalog/public_catalog.js');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
const schemaAssertion = require('./../../../helper/schema/public-catalog/public_catalog_schema.json');
const testcase = require('./../../../testcases/frontoffice/public-catalog/public_catalog_testcase.js');
const testdata = require('./../../../helper/public-catalog/public_catalog_data.json');

describe('@categoryPublicCatalog All Category Public Catalog Test API Service', () => {
  it(`@C10001 ${testcase.scenario.getSuccess.successGetCategoryPublicCatalog}`, async () => {
    const respond = await publicCatalog.getCategoryPublicCatalog();
    expect(respond.body).to.be.jsonSchema(schemaAssertion.validGetCategory);
    expect(respond.status).to.equal(responseMessageCode.successOk);
  });
  it(`@C10463 ${testcase.scenario.getFailed.failedGetInvalidKey}`, async () => {
    const key = testdata.invalidKey;
    const respond = await publicCatalog.getCategoryPublicCatalog(key);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, respond.body.message);
  });

  it(`@C10464 ${testcase.scenario.getFailed.failedGetBlankKey}`, async () => {
    const respond = await publicCatalog.getCategoryPublicCatalogWithoutKey();
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, respond.body.message);
  });
});
