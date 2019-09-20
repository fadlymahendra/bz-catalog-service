const { expect } = require('chai');
const chai = require('chai');
const jwtDecode = require('jwt-decode');
chai.use(require('chai-sorted'));

const api = require('../../../../page-objects/api/frontoffice/catalog/products/private_customer_list.js');
const testData = require('../../../../helper/frontoffice/catalog/products/private_customer_list_data.json');
const authHelper = require('../../../../helper/token');
const userCredential = require('../../../../helper/userCredential.json');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const schemaAssertion = require('../../../../helper/schema/frontoffice/catalog/products/get_private_customer_schema.json');

const string = {
  description: {
    get: 'Get private customer list',
  },
  describeIt: {
    checkGet: 'Get private customer list should be displayed',
    checkGetOtherSession: 'Private customer list should be not displayed',
    checkGetInvalid: 'See Private customer list with invalid vendor ID should give http response 404',
    checkWithoutAuth: 'See Private customer list without auth should give http response 401',
    checkWithInvalidAuth: 'See Private customer list with invalid auth should give http response 403',
    checkWithoutPrivateCustomer: 'Can not see private customer list with product no private customer should give empty data',
    checkGetInvalidProductId: 'See Private customer list with invalid product id ID should give empty data',
    checkGetProductAutoLive: 'Get private customer list should be displayed from product auto live',
  },
};

describe(`Get product list | ${string.description.get}`, () => {
  let token;
  let vendorOrgId;
  let tokenVendorAutoLive;
  let vendorAutoLiveOrgId;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.lindav);
    token = response.body.seller.token;
    vendorOrgId = jwtDecode(token).customer.organization_id;
    const responseVendorAutoLive = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.hvendor);
    tokenVendorAutoLive = responseVendorAutoLive.body.seller.token;
    vendorAutoLiveOrgId = jwtDecode(tokenVendorAutoLive).customer.organization_id;
  });

  it(`@C9100 @happy @get @products @frontoffice @privateCust | ${string.describeIt.checkGet}`, async () => {
    const pid = testData.searchByProduct.withPrivateCustomer.id;
    const response = await api.getPrivateCustomerList(vendorOrgId, pid, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.greaterThan(0);
    expect(response.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
  });

  it(`@C9120 @neg @get @products @frontoffice @privateCust | ${string.describeIt.checkGetOtherSession}`, async () => {
    const pid = testData.searchByProduct.withPrivateCustomer.id;
    const response = await api.getPrivateCustomerList(vendorOrgId + 1, pid, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@C9120 @neg @get @products @frontoffice @privateCust${string.describeIt.checkGetInvalid}`, async () => {
    const pid = testData.searchByProduct.withPrivateCustomer.id;
    const response = await api.getPrivateCustomerList(testData.invalidVendorOrgId, pid, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@C9122 @neg @get @products @frontoffice @privateCust${string.describeIt.checkWithoutAuth}`, async () => {
    const pid = testData.searchByProduct.withPrivateCustomer.id;
    const response = await api.getPrivateCustomerListWoAuth(vendorOrgId, pid);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@C9121 @neg @get @products @frontoffice @privateCust  | ${string.describeIt.checkWithInvalidAuth}`, async () => {
    const pid = testData.searchByProduct.withPrivateCustomer.id;
    const response = await api.getPrivateCustomerList(vendorOrgId, pid, userCredential.vendor.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@C9154 @neg @get @products @frontoffice @privateCust | ${string.describeIt.checkWithoutPrivateCustomer}`, async () => {
    const pid = testData.searchByProduct.noPrivateCustomer.id;
    const response = await api.getPrivateCustomerList(vendorOrgId, pid, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.equal(0);
  });

  it(`@C9154 @neg @get @products @frontoffice @privateCust | ${string.describeIt.checkGetInvalidProductId}`, async () => {
    const pid = testData.searchByProduct.invalidProductId.id;
    const response = await api.getPrivateCustomerList(vendorOrgId, pid, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.equal(0);
  });

  it(`@happy @get @products @frontoffice @privateCust | ${string.describeIt.checkGetProductAutoLive}`, async () => {
    const pid = testData.searchByProduct.autoLive.id;
    const response = await api.getPrivateCustomerList(vendorAutoLiveOrgId, pid, tokenVendorAutoLive);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.equal(1);
  });
});
