const chai = require('chai');
const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const global = require('./../../../../helper/global.js');
chai.use(require('chai-sorted'));
const api = require('./../../../../page-objects/api/frontoffice/catalog/vendor/product_stock.js');
const cases = require('./../../../../testcases/frontoffice/catalog/vendors/product_stock_testcase');
const userCredential = require('../../../../helper/userCredential.json');
const schema = require('../../../../helper/schema/frontoffice/catalog/vendor/product_stock_schema.json');

describe('Get Product Stock summary ', () => {
  let token;
  const vendorID = common.vendor_list('h_vendor');
  const invalidVendor = common.vendor_list('invalid_vendor');
  const nfoundVendor = common.vendor_list('notfound_vendor');
  const emptyVendor = common.vendor_list('empty_vendor');
  const otherVendor = common.vendor_list('ildav_vendor');
  const limit = 5;
  const sortAsc = 'stock_asc';
  const sortDesc = 'stock_desc';

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.hvendor);
    token = response.body.seller.token;
  });

  it(`@happy @get @frontoffice @productStock | ${cases.scenario.getOK.descAsc}`, (done) => {
    api.productStock(vendorID, sortAsc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(common.convertJSONStringValueToNumber(resp.body.data)).to.be.ascendingBy('stock_available');
      expect(resp.body.data).to.be.jsonSchema(schema.validProductStockScheme);
      done();
    });
  });

  it(`@happy @get @frontoffice @productStock | ${cases.scenario.getOK.descDesc}`, (done) => {
    api.productStock(vendorID, sortDesc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(common.convertJSONStringValueToNumber(resp.body.data)).to.be.descendingBy('stock_available');
      expect(resp.body.data).to.be.jsonSchema(schema.validProductStockScheme);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getWithoutAuth.descWithoutAuth}`, (done) => {
    api.productStockNoAuth(vendorID, sortAsc, limit, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getWithoutAuth.response);
      expect(resp.body.code).to.equal(global.codes.unauthorized);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getInvalidAuth.descOtherSession}`, (done) => {
    api.productStock(invalidVendor, sortAsc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getInvalidAuth.descOtherVendorID}`, (done) => {
    api.productStock(otherVendor, sortAsc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getInvalidAuth.descNotFoundVendor}`, (done) => {
    api.productStock(nfoundVendor, sortAsc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getInvalidAuth.descEmptyVendor}`, (done) => {
    api.productStock(emptyVendor, sortAsc, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getBadRequest.descLimitString}`, (done) => {
    api.productStock(vendorID, sortAsc, 'limit', token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getBadRequest.response);
      expect(resp.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getOK.descLimitEmpty}`, (done) => {
    api.productStock(vendorID, sortDesc, '', token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(common.convertJSONStringValueToNumber(resp.body.data)).to.be.descendingBy('stock_available');
      expect(resp.body.data).to.be.jsonSchema(schema.validProductStockScheme);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getBadRequest.descSortInt}`, (done) => {
    api.productStock(vendorID, 123, limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getBadRequest.response);
      expect(resp.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @get @frontoffice @productStock | ${cases.scenario.getOK.descSortEmpty}`, (done) => {
    api.productStock(vendorID, '', limit, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(common.convertJSONStringValueToNumber(resp.body.data)).to.be.descendingBy('stock_available');
      expect(resp.body.data).to.be.jsonSchema(schema.validProductStockScheme);
      done();
    });
  });
});
