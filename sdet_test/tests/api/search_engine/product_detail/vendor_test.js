
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const productDetailsApi = require('../../../page-objects/api/search_engine/product_detail/vendor.js');
const productVendorApi = require('../../../page-objects/api/frontoffice/catalog/vendor/product_vendor.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/search_engine/product_detail/vendor_test_data.json');
const schemaAssertion = require('../../../helper/schema/search_engine/product_detail/vendor_schema.json');
const schemaAssertionProductVendor = require('../../../helper/schema/frontoffice/catalog/vendor/product_vendor_schema.json');

const testScenario = {
  describe: 'As a Customer QR, I able to get data vendor from Product Details page',
  postSuccessProductDetails: 'should success get detail vendor at PDP',
  postProductDetailsChangesStock: 'should success get updated stock after at PDP after vendor change the stock',
  postProductDetailsChangesStatus: 'should success get product detail at PDP after vendor disable their product',
  postFailedIncorrectVariantId: 'should failed get detail vendor at PDP with incorrect variant ID',
  postFailedIncorrectAuth: 'should failed get detail vendor at PDP with incorrect auth',
  postFailedWihtoutAuth: 'should failed get detail vendor at PDP without incorrect auth',
};
// add @skip for QR schema
describe(`@skip ${testScenario.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.token;
    const userToLoginVendor = userCredential.vendor.dj1;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.token;
  });

  it(`@happy ${testScenario.postSuccessProductDetails}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIphone7White64;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidResponseProductVendor);
    const productVendor = respond.body.data.find(element => element.vendor_id === testData.vendor.dj_pkp_1.organization_id);
    expect(productVendor).to.containSubset(testData.productDetailVendor22);
  });

  it(`@happy ${testScenario.postProductDetailsChangesStock}`, async () => {
    const dataBodyUpdate = testData.bodyUpdateStockIphone;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productVendorId = testData.product.iphone.vendor22_id;
    const respondVendor = await productVendorApi.putProductVendorStock(vendorId, productVendorId, dataBodyUpdate, tokenVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    expect(respondVendor.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStock);
    const dataBody = testData.bodyProductDetailVendorIphone7White64;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    const productVendor = respond.body.data.find(element => element.vendor_id === testData.vendor.dj_pkp_1.organization_id);
    expect(productVendor.stock_available).to.equal(parseInt(dataBodyUpdate.stock_available, 10));
  });

  it(`@happy ${testScenario.postProductDetailsChangesStatus}`, async () => {
    const dataBodyUpdate = testData.bodyUpdateDisableSku;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productVendorId = testData.product.iphone.vendor22_id;
    const respondVendor = await productVendorApi.putProductVendorStatus(vendorId, productVendorId, dataBodyUpdate, tokenVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    expect(respondVendor.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStatus);
    const dataBody = testData.bodyProductDetailVendorIphone7White64;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    const productVendor = respond.body.data.find(element => element.vendor_id === testData.vendor.dj_pkp_1.organization_id);
    expect(productVendor).be.undefined;
  });

  it(`@negative ${testScenario.postFailedIncorrectVariantId}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body.data).to.be.an('array').that.is.empty;
  });

  it(`@negative ${testScenario.postFailedIncorrectAuth}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, testData.tokenData.incorrect);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@negative ${testScenario.postFailedWihtoutAuth}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postFailedProductDetailVendor(dataBody);
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  after(async () => {
    const dataBodyUpdateStock = testData.bodyRestoreStockIphone;
    const dataBodyUpdateStatus = testData.bodyUpdateEnableSku;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productVendorId = testData.product.iphone.vendor22_id;
    const respondVendorStock = await productVendorApi.putProductVendorStock(vendorId, productVendorId, dataBodyUpdateStock, tokenVendor);
    expect(respondVendorStock.status).to.equal(responseMessageCode.successOk);
    expect(respondVendorStock.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStock);
    const respondVendorStatus = await productVendorApi.putProductVendorStatus(vendorId, productVendorId, dataBodyUpdateStatus, tokenVendor);
    expect(respondVendorStatus.status).to.equal(responseMessageCode.successOk);
    expect(respondVendorStatus.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStatus);
  });
});
