const { expect } = require('chai');
const chai = require('chai');
const jwtDecoder = require('jwt-decode');
chai.use(require('chai-json-schema'));
const updateProductApi = require('../../../../page-objects/api/frontoffice/catalog/products/update_product_page.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/frontoffice/catalog/vendor/update_product_data.json');
const authHelper = require('../../../../helper/token');
const schemaAssertion = require('../../../../helper/schema/update_product_schema.json');
const userCredential = require('./../../../../helper/userCredential.json');
const getPreProcessData = require('./../../../../helper/frontoffice/catalog/vendor/testDataUpdateProduct');

const testScenario = {
  describe: 'Update update Product Api Test',
  successPutData: 'should success put data with valid request parameter',
  updateValidSKUVendor: 'should success Update product details with valid SKU Id Vendor',
  updateEmptySKUVendor: 'should failed Update product details with empty SKU Id Vendor',
  updateInvalidSKUVendor: 'should failed Update product details with invalid SKU Id Vendor',
  updateExistSKUVendor: 'should failed Update product details with exist SKU Id Vendor',
  updateActiveDecimal: 'should success put data with active decimal data',
  updateActiveInden: 'should success put data with active Inden data',
  updateActiveDP: 'should success put data with active down payment data',
  updateActiveDPNonactiveInden: 'should failed put data with Active Down Payment and Non-active Inden',
  updateNonactiveDecimal: 'should success put data with non-active decimal data',
  updateNonactiveInden: 'should success put data with non-active inden data',
  updateNonactiveDP: 'should success put data with non-active down payment data',
  updateInvalidPercentageDP: 'should failed Update product details with invalid percentage down payment',
  updateInvalidNominalDP: 'should failed Update product details with invalid nominal down payment',
  updateInvalidIndenLimit: 'should failed Update product details with invalid inden limit',

};

describe(testScenario.describe, () => {
  let token;
  let organizationId;
  let tokenVendor;
  let organizationIdContract;

  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const response = await authHelper.getFrontOfficeToken.getToken(userToLogin);
    expect(response.status).to.equal(responseMessageCode.successOk);
    token = response.body.seller.token;
    organizationId = jwtDecoder(token).customer.organization_id;
    const vendorContract = userCredential.vendor.tata;
    const responseVendorContract = await authHelper.getFrontOfficeToken.getToken(vendorContract);
    expect(responseVendorContract.status).to.equal(responseMessageCode.successOk);
    tokenVendor = responseVendorContract.body.seller.token;
    organizationIdContract = jwtDecoder(tokenVendor).customer.organization_id;
  });

  it(`@happy @put @frontoffice @updateprod ${testScenario.successPutData}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, testData.validData, token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@happy @put @frontoffice @updateprod @CVV ${testScenario.updateValidSKUVendor}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithValidSKUVendor(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@neg @put @frontoffice @updateprod ${testScenario.updateEmptySKUVendor}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithEmptySKUVendor(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageEmptySKUVendor());
      done();
    });
  });

  it(`@neg @put @frontoffice @updateprod ${testScenario.updateInvalidSKUVendor}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithInvalidSKUVendor(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageInvalidSKUVendor(getPreProcessData.updateProdWithInvalidSKUVendor().products[0].sku_vendor));
      done();
    });
  });

  it(`@neg @put @frontoffice @updateprod ${testScenario.updateExistSKUVendor}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithExistSKUVendor(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageExistSKUVendor(getPreProcessData.updateProdWithExistSKUVendor().products[0].sku_vendor));
      done();
    });
  });

  it(`@happy @put @frontoffice @updateprod ${testScenario.updateSKUContractWithPrivateCustomer}`, (done) => {
    updateProductApi.putUpdateProduct(organizationIdContract, testData.productGroupId, getPreProcessData.updateProdWithExistSKUVendor(), tokenVendor, (error, resp) => {
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11369 @happy @put @frontoffice @updateprod ${testScenario.updateActiveDecimal}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithActiveDecimal(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11370 @happy @put @frontoffice @updateprod ${testScenario.updateActiveInden}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithActiveInden(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11371 @happy @put @frontoffice @updateprod ${testScenario.updateActiveDP}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithActiveDP(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11372 @neg @put @frontoffice @updateprod ${testScenario.updateActiveDPNonactiveInden}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithActiveDPNonactiveInden(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageInvalidDPFlag(getPreProcessData.updateProdWithActiveDPNonactiveInden().products[0].sku_vendor));
      done();
    });
  });

  it(`@C11398 @happy @put @frontoffice @updateprod ${testScenario.updateNonactiveDecimal}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithNonactiveDecimal(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11399 @happy @put @frontoffice @updateprod ${testScenario.updateNonactiveInden}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithNonactiveInden(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11400 @happy @put @frontoffice @updateprod ${testScenario.updateNonactiveDP}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithNonactiveDP(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.successOk);
      expect(resp.body).to.be.jsonSchema(schemaAssertion.putResponseValidSchema);
      expect(resp.body.message).to.be.equal('Product berhasil diubah');
      done();
    });
  });

  it(`@C11614 @neg @put @frontoffice @updateprod ${testScenario.updateInvalidPercentageDP}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithInvalidPercentageDP(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageInvalidPercentageDP(getPreProcessData.updateProdWithInvalidPercentageDP().products[0].sku_vendor));
      done();
    });
  });

  it(`@C11615 @neg @put @frontoffice @updateprod ${testScenario.updateInvalidNominalDP}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithInvalidNominalDP(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageInvalidNominalDP(getPreProcessData.updateProdWithInvalidNominalDP().products[0].sku_vendor, getPreProcessData.updateProdWithInvalidNominalDP().products[0].tier_cogs_price_1));
      done();
    });
  });

  it(`@C11616 @neg @put @frontoffice @updateprod ${testScenario.updateInvalidIndenLimit}`, (done) => {
    updateProductApi.putUpdateProduct(organizationId, testData.productGroupId, getPreProcessData.updateProdWithInvalidIndenLimit(), token, (error, resp) => {
      expect(resp.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(resp.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
      expect(resp.body.message).to.equal(getPreProcessData.errorMessageInvalidIndenLimit(getPreProcessData.updateProdWithInvalidIndenLimit().products[0].sku_vendor));
      done();
    });
  });
});
