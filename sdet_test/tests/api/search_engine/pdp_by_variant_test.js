const { expect } = require('chai');
const randomstring = require('randomstring');
const global = require('./../../helper/global.js');
const api = require('./../../page-objects/api/search_engine/pdp_by_variant.js');
const cases = require('./../../testcases/search_engine/pdp_by_variant_testcase.js');
const schema = require('./../../helper/schema/pdp_by_variant_schema.js');
const userCredential = require('../../helper/userCredential.json');
const common = require('../../helper/common.js');

describe('Get PDP by variant', () => {
  const bizzySKUIDNoVariant = 'IFB7IAA5HU';
  const bizzySKUID2Variant = '93VN03AVNO';
  const bizzySKUID1Variant = 'NL729T50H2';
  const bizzySKUIDNotFound = randomstring.generate(12);
  let token;

  before(async () => {
    const response = await common.getTokenFo(userCredential.customer.hMpTopFrStaging);
    token = response.body.customer.token;
  });

  it(`@happy @get @searchengine | ${cases.scenario.getOK.description}`, (done) => {
    api.byVariant(bizzySKUIDNoVariant, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(resp.body.data.sku).to.equal(bizzySKUIDNoVariant);
      expect(resp.body.data.product_vendors).to.not.be.empty;
      expect(resp.body.data).to.be.jsonSchema(schema.productDetail);
      done();
    });
  });

  it(`@happy @get @searchengine | ${cases.scenario.getOK.description}`, (done) => {
    api.byVariant(bizzySKUID2Variant, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(resp.body.data.sku).to.equal(bizzySKUID2Variant);
      expect(resp.body.data.product_vendors).to.not.be.empty;
      expect(resp.body.data).to.be.jsonSchema(schema.productDetail);
      done();
    });
  });

  it(`@happy @get @searchengine | ${cases.scenario.getOK.description}`, (done) => {
    api.byVariant(bizzySKUID1Variant, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(resp.body.data.sku).to.equal(bizzySKUID1Variant);
      expect(resp.body.data.product_vendors).to.not.be.empty;
      expect(resp.body.data).to.be.jsonSchema(schema.productDetail);
      done();
    });
  });

  it(`@neg @get @searchengine | ${cases.scenario.getNotFound.descOther}`, (done) => {
    api.byVariant(bizzySKUIDNotFound, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getNotFound.response);
      expect(resp.body.code).to.equal(global.codes.notFound);
      done();
    });
  });

  it(`@neg @get @searchengine | ${cases.scenario.getWithoutAuth.description}`, (done) => {
    api.byVariantNoAuth(bizzySKUID1Variant, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getWithoutAuth.response);
      expect(resp.body.code).to.equal(global.codes.unauthorized);
      done();
    });
  });
});
