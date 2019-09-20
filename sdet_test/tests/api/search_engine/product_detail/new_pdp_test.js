
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

const { expect } = require('chai');
const chai = require('chai');
const jwtDecode = require('jwt-decode');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const productDetailsApi = require('../../../page-objects/api/search_engine/product_detail/new_pdp.js');
const productVendorApi = require('../../../page-objects/api/frontoffice/catalog/vendor/product_vendor.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/search_engine/product_detail/new_pdp_vendor_test_data.json');
const schemaAssertion = require('../../../helper/schema/search_engine/product_detail/new_pdp_vendor_schema.json');
const schemaAssertionProductVendor = require('../../../helper/schema/frontoffice/catalog/vendor/product_vendor_schema.json');

const testScenario = {
  describe: 'As a Customer MP, I able to get data vendor from Product Details page',
  postSuccessProductDetails: 'should success get detail vendor at PDP and get SLA days duration',
  postSuccessWithoutContract: 'should success get detail vendor without contract',
  postSuccessProductDetailsWithSLA: 'should success get detail vendor with SLA at PDP and get contract expiry date',
  postProductDetailsChangesStock: 'should success get updated stock after at PDP after vendor change the stock',
  postProductDetailsChangesStatus: 'should success get product detail at PDP after vendor disable their product',
  postFailedIncorrectVariantId: 'should failed get detail vendor at PDP with incorrect variant ID',
  postFailedIncorrectAuth: 'should failed get detail vendor at PDP with incorrect auth',
  postFailedWihtoutAuth: 'should failed get detail vendor at PDP without incorrect auth',
  postFailedProductDetailsWithSLA: 'should failed get detail vendor at PDP with invalid Product ID',
  postSuccessProductDetailsWithIndenData: 'should success get detail vendor with inden data at PDP',
};

describe(`${testScenario.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;
  let tokenCustomerContract;
  let vendorId;

  before(async () => {
    const userToLogin = userCredential.customer.labMpStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.customer.token;
    const userToLoginVendor = userCredential.vendor.lindav;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
    tokenCustomerContract = respondVendor.body.customer.token;
    vendorId = jwtDecode(tokenVendor).customer.organization_id;
  });

  it(`@happy @newPDP${testScenario.postSuccessProductDetails}`, async () => {
    const dataBody = testData.validParam;
    const vendorNameWithRating = 'PT Bizzy Commerce Indonesia ';
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidResponseProductVendor);
    const productVendor = respond.body.data.find(element => element.vendor_id === vendorId);
    const handlingTime = respond.body.data.filter(element => element.vendor_name === vendorNameWithRating);
    expect(handlingTime[0].rating_process_time).to.have.property('value');
    expect(productVendor).to.containSubset(testData.respProductDetail);
  });

  it(`@happy @newPDP ${testScenario.postSuccessProductDetailsWithSLA}`, async () => {
    const dataBody = testData.validParamWithSLA;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomerContract);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidResponseProductVendor);
    expect(respond.body.data).to.have.lengthOf(1);
    expect(respond.body.data[0].vendor_id).to.containSubset(testData.vendorIdContract);
    expect(respond.body.data[0].price).to.containSubset(testData.productDetailContract);
    expect(respond.body.data[0].price.sla).to.not.null;
    expect(respond.body.data[0].price.is_contract_price).to.equal(true);
  });

  it(`@happy @newPDP ${testScenario.postSuccessWithoutContract}`, async () => {
    const dataBody = testData.validParam;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomerContract);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidResponseProductVendor);
    expect(respond.body.data[0].price.is_contract_price).to.equal(false);
  });

  it(`@happy @newPDP ${testScenario.postProductDetailsChangesStock}`, async () => {
    const dataBodyUpdate = testData.bodyUpdateStockSTEELSekrup;
    const productVendorId = testData.productForDisable.product_id;
    const respondVendor = await productVendorApi.putProductVendorStock(vendorId, productVendorId, dataBodyUpdate, tokenVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    expect(respondVendor.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStock);
    const dataBody = testData.bodyProductDetailVendorSTEELSekrup;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    const productVendor = respond.body.data.find(element => element.vendor_id === vendorId);
    expect(productVendor.stock_available).to.equal(parseInt(dataBodyUpdate.stock_available, 10));
  });

  it(`@happy @newPDP ${testScenario.postProductDetailsChangesStatus}`, async () => {
    const dataBodyUpdate = testData.bodyUpdateDisableSku;
    const productVendorId = testData.productForDisable.product_id;
    const respondVendor = await productVendorApi.putProductVendorStatus(vendorId, productVendorId, dataBodyUpdate, tokenVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    expect(respondVendor.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStatus);
    const dataBody = testData.bodyProductDetailVendorSTEELSekrup;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    const productVendor = respond.body.data.find(element => element.vendor_id === vendorId);
    expect(productVendor).be.undefined;
  });

  it(`@negative @newPDP ${testScenario.postFailedProductDetailsWithSLA}`, async () => {
    const dataBody = testData.invalidParamWithSLA;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomerContract);
    expect(respond.status).to.equal(responseMessageCode.failedInternalServerError.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedInternalServerError.codeMessage);
  });

  it(`@negative @newPDP ${testScenario.postFailedIncorrectGroupId}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body.data).to.be.an('array').that.is.empty;
  });

  it(`@negative @newPDP ${testScenario.postFailedIncorrectAuth}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, testData.tokenData.incorrect);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@negative @newPDP ${testScenario.postFailedWihtoutAuth}`, async () => {
    const dataBody = testData.bodyProductDetailVendorIncorrectVariant;
    const respond = await productDetailsApi.postFailedProductDetailVendor(dataBody);
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });

  it(`@C11816 @happy @newPDP ${testScenario.postSuccessProductDetailsWithIndenData}`, async () => {
    const dataBody = testData.validParamWithInden;
    const respond = await productDetailsApi.postProductDetailVendor(dataBody, tokenCustomer);
    expect(respond.status).to.equal(responseMessageCode.successCreated);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.getValidResponseProductVendor);
    const productVendor = respond.body.data.find(element => element.vendor_id === vendorId);
    expect(productVendor).to.containSubset(testData.productDetailInden);
  });

  after(async () => {
    const dataBodyUpdateStock = testData.bodyRestoreStockSTEELSekrup;
    const dataBodyUpdateStatus = testData.bodyUpdateEnableSku;
    const productVendorId = testData.productForDisable.product_id;
    const respondVendorStock = await productVendorApi.putProductVendorStock(vendorId, productVendorId, dataBodyUpdateStock, tokenVendor);
    expect(respondVendorStock.status).to.equal(responseMessageCode.successOk);
    expect(respondVendorStock.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStock);
    const respondVendorStatus = await productVendorApi.putProductVendorStatus(vendorId, productVendorId, dataBodyUpdateStatus, tokenVendor);
    expect(respondVendorStatus.status).to.equal(responseMessageCode.successOk);
    expect(respondVendorStatus.body).to.be.jsonSchema(schemaAssertionProductVendor.getValidResponseUpdateStatus);
  });
});
