const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));

const common = require('./../../../../helper/common.js');
const global = require('./../../../../helper/global.js');
const api = require('./../../../../page-objects/api/frontoffice/catalog/vendor/product_count.js');
const cases = require('./../../../../testcases/frontoffice/catalog/vendors/product_count_testcase.js');
const userCredential = require('../../../../helper/userCredential.json');

const vendorID = common.vendor_list('h_vendor');
const invldVendorID = common.vendor_list('invalid_vendor');
const nfoundVendorID = common.vendor_list('notfound_vendor');
const emptyVendorID = common.vendor_list('empty_vendor');
const otherVendorID = common.vendor_list('ildav_vendor');

const pCount = {
  title: 'Product Count schema',
  type: 'object',
  required: ['products', 'premoderation_inprogress', 'premoderation_rejected'],
  properties: {
    products: {
      type: 'number',
    },
    premoderation_inprogress: {
      type: 'number',
    },
    premoderation_rejected: {
      type: 'number',
    },
  },
};

describe('Get Product Count summary', () => {
  let token;
  const incrToken = 'incorrect_token';
  const emptyToken = '';

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.hvendor);
    token = response.body.seller.token;
  });

  it(`@happy @get @frontoffice @countSum | ${cases.scenario.getOK.desc}`, (done) => {
    api.productCount(vendorID, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getOK.response);
      expect(resp.body.data).to.be.jsonSchema(pCount);
      expect(resp.body.products).to.not.be.null;
      expect(resp.body.premoderation_inprogress).to.not.be.null;
      expect(resp.body.premoderation_rejected).to.not.be.null;
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descOtherVendorID}`, (done) => {
    api.productCount(invldVendorID, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descEmptyVendor}`, (done) => {
    api.productCount(vendorID, emptyToken, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getForbidden.responseUnAuth);
      expect(resp.body.code).to.equal(global.codes.unauthorized);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descOtherSession}`, (done) => {
    api.productCount(vendorID, incrToken, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.invalidToken);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getWithoutAuth.descWithoutAuth}`, (done) => {
    api.productCountNoAuth(vendorID, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getWithoutAuth.response);
      expect(resp.body.code).to.equal(global.codes.unauthorized);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descNotFoundVendor}`, (done) => {
    api.productCount(nfoundVendorID, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descEmptyVendor}`, (done) => {
    api.productCount(emptyVendorID, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @get @frontoffice @countSum | ${cases.scenario.getInvalidAuth.descOtherVendorID}`, (done) => {
    api.productCount(otherVendorID, token, (resp) => {
      expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(resp.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });
});
