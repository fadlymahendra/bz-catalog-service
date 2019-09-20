const { expect } = require('chai');
const chai = require('chai');
const jwtDecode = require('jwt-decode');
chai.use(require('chai-sorted'));

const api = require('./../../../../page-objects/api/frontoffice/catalog/products/product_list.js');
const testData = require('../../../../helper/frontoffice/catalog/products/product_list_data.json');
const authHelper = require('../../../../helper/token');
const common = require('../../../../helper/common');
const userCredential = require('../../../../helper/userCredential.json');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');

const string = {
  description: {
    get: 'Get product list',
  },
  describeIt: {
    checkGet: 'Get product list should be displayed',
    checkGetOtherSession: 'Product list should be not displayed',
    checkGetInvalid: 'See product list with invalid vendor ID should give http response 404',
    checkWithoutAuth: 'See product list without auth should give http response 401',
    checkWithInvalidAuth: 'See product list with invalid auth should give http response 403',
    checkSpecificKeyword: 'Product with keyword Tissue should be appear',
    checkSpecificKeywordNotFound: 'Product with keyword scasda should be appear',
    checkStatusInactive: 'Product with status inactive will be displayed',
    checkStatusActive: 'Product with status active will be displayed',
    checkEmptyStock: 'Product with status empty stock will be displayed',
    checkStockAvailable: 'Product with status stock available will be displayed',
    checkStockAsc: 'Product list result will sorted by ascending group by stock',
    checkStockDesc: 'Product list result will sorted by descending group by stock',
    checkTierAsc: 'Product list result will sorted by ascending group by tier',
    checkTierDesc: 'Product list result will sorted by descending group by tier',
    checkPrivateCust: 'Product list will contain private customer true',
    checkTotalPrivateCust: 'Product list will contain total private customer',
    checkNoPrivateCust: 'Product list will not contain private customer true',
    checkIndent: 'See product list with indent label',
  },
};

describe(`Get product list | ${string.description.get}`, () => {
  let token;
  let tokenVendorIldav;
  let vendorOrgId;
  let vendorOrgIdIldav;

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.dj2);
    token = response.body.seller.token;
    vendorOrgId = jwtDecode(token).customer.organization_id;
    const responseVendorIldav = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.lindav);
    tokenVendorIldav = responseVendorIldav.body.seller.token;
    vendorOrgIdIldav = jwtDecode(tokenVendorIldav).customer.organization_id;
  });

  it(`@happy @get @products @frontoffice @productList | ${string.describeIt.checkGet}`, async () => {
    const query = testData.defaultQuery;
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@neg @get @products @frontoffice @productList | ${string.describeIt.checkGetOtherSession}`, async () => {
    const query = testData.defaultQuery;
    const response = await api.getVendorProductList(vendorOrgId + 1, query, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@happy @get @products @frontoffice @productList${string.describeIt.checkGetInvalid}`, async () => {
    const query = testData.defaultQuery;
    const response = await api.getVendorProductList(testData.invalidVendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@happy @get @products @frontoffice @productList${string.describeIt.checkWithoutAuth}`, async () => {
    const query = testData.defaultQuery;
    const response = await api.getVendorProductListWoAuth(vendorOrgId, query);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(`@neg @get @products @frontoffice @productList  | ${string.describeIt.checkWithInvalidAuth}`, async () => {
    const query = testData.defaultQuery;
    const response = await api.getVendorProductList(vendorOrgId, query, userCredential.vendor.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkSpecificKeyword}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.validProductName };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.every(element => (element.long_name.toLowerCase()).includes(query.search)));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkSpecificKeywordNotFound}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.notFoundProductName };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.length).to.equal(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkStatusInactive}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.productStatus.inactive };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.is_active).to.equal(query.is_active));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkStatusActive}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.productStatus.active };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.is_active).to.equal(query.is_active));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkEmptyStock}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.stockAvailability.unavailable };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.stock_available).to.equal(query.stock));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkStockAvailable}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.stockAvailability.available };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.every(element => element.stock_available === query.stock));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkStockAsc}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.sortBy.stockAscending };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).to.be.ascendingBy('stock_available');
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList | ${string.describeIt.checkStockDesc}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.sortBy.stockDescending };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).to.be.descendingBy('stock_available');
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkTierAsc}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.sortBy.priceAscending };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).to.be.ascendingBy('tier_cogs_price_1');
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkTierDesc}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.sortBy.priceDescending };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).to.be.descendingBy('tier_cogs_price_1');
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@C9123 @get @products @frontoffice @productList  | ${string.describeIt.checkPrivateCust}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.productWithPrivateCustomer };
    const response = await api.getVendorProductList(vendorOrgIdIldav, query, tokenVendorIldav);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.is_private_sku).to.equal(true));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@C9124 @get @products @frontoffice @productList  | ${string.describeIt.checkTotalPrivateCust}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.productWithPrivateCustomer };
    const response = await api.getVendorProductList(vendorOrgIdIldav, query, tokenVendorIldav);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.private_customers).to.equal(testData.privateCustomer.total));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@get @products @frontoffice @productList  | ${string.describeIt.checkNoPrivateCust}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.productNoPrivateCustomer };
    const response = await api.getVendorProductList(vendorOrgIdIldav, query, tokenVendorIldav);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    const resp = response.body.data;
    resp.map(e => expect(e.is_private_sku).to.equal(false));
    expect(response.body.data.length).to.greaterThan(0);
  });

  it(`@C11379 @get @products @frontoffice @productList  | ${string.describeIt.checkIndent}`, async () => {
    const query = { ...testData.defaultQuery, ...testData.searchBy.indentProductName };
    const response = await api.getVendorProductList(vendorOrgId, query, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.every(element => element.is_indent === query.is_indent));
    expect(response.body.data.length).to.greaterThan(0);
  });
});
