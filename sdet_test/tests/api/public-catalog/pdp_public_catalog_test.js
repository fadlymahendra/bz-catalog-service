const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
chai.use(require('chai-subset'));

const pdpPublicCatalog = require('./../../page-objects/api/public-catalog/pdp_public_catalog.js');
const schemaAssertion = require('./../../helper/schema/public-catalog/pdp_public_catalog_schema.json');
const testcase = require('./../../testcases/public-catalog/pdp_public_catalog_testcase.js');
const responseMessageCode = require('./../../helper/responseMessageAndCode.json');
const testdata = require('./../../helper/public-catalog/pdp_public_catalog_data.json');

describe('@pdpPublicCatalog PDP Public Catalog Test API Service', () => {
  it(`@C10038 ${testcase.scenario.getSuccess.successGetPDPPublicCatalog}`, async () => {
    const id = testdata.successGetPDPValidSKU.sku;
    const respond = await pdpPublicCatalog.getPDPPublicCatalog(id);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidPDPPublicCatalog);
    expect(respond.body.data).to.containSubset(testdata.successGetPDPValidSKU);
  });

  it(`@C10456 ${testcase.scenario.getSuccess.successGetCategoryC2PublicCatalog}`, async () => {
    const id = testdata.successGetCategoriC2PublicCatalog.id;
    const respond = await pdpPublicCatalog.getPDPCategory(id);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidCategory2AndCategory3);
    expect(respond.body.data).to.containSubset(testdata.successGetCategoriC2PublicCatalog);
  });

  it(`@C10461 ${testcase.scenario.getSuccess.successGetCategoryC3PublicCatalog}`, async () => {
    const id = testdata.successGetCategoryC3PublicCatalog.id;
    const respond = await pdpPublicCatalog.getPDPCategory(id);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidCategory2AndCategory3);
    expect(respond.body.data).to.containSubset(testdata.successGetCategoryC3PublicCatalog);
  });

  it(`@C10039 @neg ${testcase.scenario.getFailed.failedGetPDPPublicCatalogInvalidSKU.Desc}`, async () => {
    const id = testdata.failedGetPDPInvalidSKU.sku;
    const respond = await pdpPublicCatalog.getPDPPublicCatalog(id);
    expect(respond.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
  });

  it(`@C10040 @neg ${testcase.scenario.getFailed.failedGetPDPPublicCatalogSKUNull.Desc}`, async () => {
    const respond = await pdpPublicCatalog.getPDPPublicCatalog(null);
    expect(respond.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
  });

  it(`@C10100 ${testcase.scenario.getFailed.failedGetPDPPublicCatalogInactiveSKU.Desc}`, async () => {
    const id = testdata.failedGetPDPInactiveSKU.sku;
    const respond = await pdpPublicCatalog.getPDPPublicCatalog(id);
    expect(respond.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
  });

  it(`@C10454 @neg ${testcase.scenario.getFailed.failedGetPDPPublicCatalogInvalidKey.Desc}`, async () => {
    const id = testdata.successGetPDPValidSKU.sku;
    const key = testdata.invalidKey;
    const respond = await pdpPublicCatalog.getPDPPublicCatalog(id, key);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@C10458 @neg ${testcase.scenario.getFailed.failedGetPDPPublicCatalogBlankKey.Desc}`, async () => {
    const id = testdata.successGetPDPValidSKU.sku;
    const respond = await pdpPublicCatalog.getPDPPublicCatalogWithoutKey(id);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@C10459 @neg ${testcase.scenario.getFailed.failedGetCategoryPublicCatalogInvalidKey.Desc}`, async () => {
    const id = testdata.successGetPDPValidSKU.sku;
    const key = testdata.invalidKey;
    const respond = await pdpPublicCatalog.getPDPCategory(id, key);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@C10460 @neg ${testcase.scenario.getFailed.failedGetCategoryPublicCatalogBlankKey.Desc}`, async () => {
    const id = testdata.successGetPDPValidSKU.sku;
    const respond = await pdpPublicCatalog.getPDPCategoryWithoutKey(id);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@C10462 @neg ${testcase.scenario.getFailed.failedGetCategoryWithInvalidId.Desc}`, async () => {
    const id = testdata.failedGetCategoryWithInvalidId;
    const respond = await pdpPublicCatalog.getPDPCategory(id);
    expect(respond.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
  });
});
