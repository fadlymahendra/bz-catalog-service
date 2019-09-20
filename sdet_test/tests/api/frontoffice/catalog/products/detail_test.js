
/* eslint prefer-destructuring:off */

const { expect } = require('chai');
const jwtDecoder = require('jwt-decode');
const api = require('./../../../../page-objects/api/frontoffice/catalog/products/detail.js');
const userCredential = require('../../../../helper/userCredential.json');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/frontoffice/catalog/products/detail_data.json');
const common = require('../../../../helper/common');

const string = {
  description: {
    get: 'Get valid product details',
    getOtherSession: 'Get product details with other user session',
    getInvalidVendor: 'Get product details with invalid vendor ID',
    getInvalidPgid: 'Get product details with invalid product group ID',
    getInvalidBoth: 'Get product details with invalid vendor ID and Product Group ID',
    getDetailsWithoutAuth: 'Get product details without Auth',
    getDetailsInvalidAuth: 'Get product details with invalid Auth',
    getDetailIndentProd: 'Get product details with indent product',
    getDetailDecimalProd: 'Get product details with decimal product',
    getDetailDPProd: 'Get product details with down payment product',
  },
  describeIt: {
    check: 'Valid product detail should be displayed',
    checkGetOtherSession: 'Product details should be not displayed',
    checkInvalidVendor: 'Should unauthorized and give error message 401',
    checkInvalidPgid: 'Get product details with invalid auth should give http response 403',
    checkInvalidBoth: 'Get product details with invalid auth should give http response 403',
    checkDetailsWithoutAuth: 'Get product details without auth should give http response 401',
    checkDetailsInvalidAuth: 'Get product details with invalid auth should give http response 403',
    checkWithoutPrivateCustomer: 'Can not see private customer list with product no private customer should give empty data',
    checkGetProductAutoLive: 'Get private customer list should be displayed from product auto live',
    checkProductWithPrivateCust: 'Valid product detail should be displayed with private customer',
    checkSKUContractWithPrivateCustomer: 'should success get data private customer',
    checkDetailIndentProd: 'Valid indent product detail should be displayed',
    checkDetailDecimalProd: 'Get decimal product details with decimal product',
    checkDetailDPProd: 'Get down payment product details with down payment product',
  },
};

describe('Get product details', () => {
  let token;
  let organizationId;
  let organizationVendorId;
  let tokenVendor;
  let tokenVendorAutoLive;
  let vendorAutoLiveOrgId;
  let tokenVendorContract;
  let organizationIdContract;
  const pgId = 2;
  const pgIdIndent = 564;
  const invalidPgid = 20000;

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.dj2);
    token = response.body.seller.token;
    organizationId = jwtDecoder(token).customer.organization_id;
    const responseVendorIldav = await common.getTokenFo(userCredential.vendor.lindav);
    tokenVendor = responseVendorIldav.body.seller.token;
    organizationVendorId = jwtDecoder(tokenVendor).customer.organization_id;
    const responseVendorAutoLive = await common.getTokenFo(userCredential.vendor.hvendor);
    tokenVendorAutoLive = responseVendorAutoLive.body.seller.token;
    vendorAutoLiveOrgId = jwtDecoder(tokenVendorAutoLive).customer.organization_id;
    const responseVendorContract = await common.getTokenFo(userCredential.vendor.tata);
    tokenVendorContract = responseVendorContract.body.seller.token;
    organizationIdContract = jwtDecoder(tokenVendorContract).customer.organization_id;
  });

  it(`@happy @get @products @frontoffice | ${string.description.get} ${string.describeIt.check}`, (done) => {
    api.prodDetails(organizationId, pgId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(pgId);
      done();
    });
  });

  it(`@get @get @products @frontoffice | ${string.description.getOtherSession} ${string.describeIt.checkGetOtherSession}`, (done) => {
    api.prodDetails(organizationId, pgId, userCredential.vendor.invalidToken, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @get @products @frontoffice | ${string.description.getInvalidVendor} ${string.describeIt.checkInvalidVendor}`, (done) => {
    api.prodDetails(-1, pgId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
      done();
    });
  });

  it(`@neg @get @products @frontoffice | ${string.description.getInvalidPgid} ${string.describeIt.checkInvalidPgid}`, (done) => {
    api.prodDetails(organizationId, -1, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
      done();
    });
  });

  it(`@neg @get @products @frontoffice | ${string.description.getInvalidBoth} ${string.describeIt.checkInvalidBoth}`, (done) => {
    api.prodDetails(-1, invalidPgid, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
      done();
    });
  });

  it(`@neg @get @products @frontoffice | ${string.description.getDetailsWithoutAuth} ${string.describeIt.checkDetailsWithoutAuth}`, (done) => {
    api.prodDetailWoAuth(organizationId, pgId, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @get @products @frontoffice | ${string.description.getDetailsInvalidAuth} ${string.describeIt.checkDetailsInvalidAuth}`, (done) => {
    api.prodDetails(organizationId, pgId, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@happy @get @products @frontoffice | ${string.description.get} ${string.describeIt.checkProductWithPrivateCust}`, (done) => {
    api.prodDetails(organizationVendorId, testData.productGroup.withPrivateCustomer.id, tokenVendor, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(testData.productGroup.withPrivateCustomer.id);
      expect(response.body.product[0].is_private_sku).to.equal(true);
      expect(response.body.product[0].private_customers.length).to.greaterThan(0);
      done();
    });
  });

  it(`@neg @get @products @frontoffice @privateCust | ${string.describeIt.checkWithoutPrivateCustomer}`, (done) => {
    api.prodDetails(organizationVendorId, testData.productGroup.noPrivateCustomer.id, tokenVendor, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.product[0].is_private_sku).to.equal(false);
      expect(response.body.product[0].private_customers.length).to.equal(0);
      done();
    });
  });

  it(`@happy @get @products @frontoffice @privateCust | ${string.describeIt.checkGetProductAutoLive}`, (done) => {
    api.prodDetails(vendorAutoLiveOrgId, testData.productGroup.autoLive.id, tokenVendorAutoLive, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.product[0].is_private_sku).to.equal(true);
      expect(response.body.product[0].is_bulk).to.equal(1);
      expect(response.body.product[0].private_customers.length).to.equal(1);
      done();
    });
  });

  it(`@testt @happy @get @products @frontoffice @privateCust | ${string.describeIt.checkSKUContractWithPrivateCustomer}`, (done) => {
    api.prodDetails(organizationIdContract, testData.productGroup.contract.id, tokenVendorContract, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.product[0].is_private_sku).to.equal(false);
      expect(response.body.product[0].private_customers.length).to.equal(1);
      done();
    });
  });

  it(`@C11383 @happy @get @products @frontoffice | ${string.description.getDetailDecimalProd} ${string.describeIt.checkDetailDecimalProd}`, (done) => {
    api.prodDetails(organizationId, pgIdIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(pgIdIndent);
      expect(response.body.product[0].is_decimal).to.equal(1);
      done();
    });
  });

  it(`@C11380 @happy @get @products @frontoffice | ${string.description.getDetailIndentProd} ${string.describeIt.checkDetailIndentProd}`, (done) => {
    api.prodDetails(organizationId, pgIdIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(pgIdIndent);
      expect(response.body.product[0].is_indent).to.equal(1);
      done();
    });
  });

  it(`@C11381 @happy @get @products @frontoffice | ${string.description.getDetailDPProd} ${string.describeIt.checkDetailDPProd}`, (done) => {
    api.prodDetails(organizationId, pgIdIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(pgIdIndent);
      expect(response.body.product[0].down_payment_type).to.equal(1);
      expect(response.body.product[0].down_payment_value).not.equal(0);
      done();
    });
  });
});
