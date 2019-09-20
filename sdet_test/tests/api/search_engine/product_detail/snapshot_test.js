
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const productDetailSnapshotApi = require('../../../page-objects/api/search_engine/product_detail/snapshot.js');
const productVendorApi = require('../../../page-objects/api/frontoffice/catalog/vendor/product_vendor.js');
const productGroupApi = require('../../../page-objects/api/backoffice/catalog/product_group/product_group.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/search_engine/product_detail/snapshot_test_data.json');
const testDataListProduct = require('../../../helper/search_engine/product_detail/catalog_vendor_test_data.json');
const testDataBoPg = require('../../../helper/search_engine/product_detail/bo_product_group_test_data.json');
const schemaAssertion = require('../../../helper/schema/search_engine/product_detail/snapshot_schema.json');

const testScenarioPostSnapshot = {
  describe: 'As a Customer Punchout, I able to get product details snapshot',
  postSuccessSnapshot: 'should post and get response product details snapshot',
  postInvalidQuotaionIdSnapshot: 'should post and get message Quotation not found response when post invalid Quotaion Id',
  postInvalidSkuIdSnapshot: 'should post and get message Quotation not found response when post invalid SKU Number',
  postInvalidTokenSnapshot: 'should post and get message Quotation not found response when post invalid Punchout Token',
};

const testScenarioChangeVendorPrice = {
  describe: 'As a Customer Punchout, I able to get product details snapshot after Price & Tier at Vendor change',
  postSuccessSnapshot: 'should get product details snapshot not change after Price & Tier at Vendor change',
};

const testScenarioChangeVendorStatus = {
  describe: 'As a Customer Punchout, I able to get product details snapshot after status SKU change',
  postSuccessSnapshot: 'should get response product details not change snapshot after status SKU change',
};

const testScenarioChangePg = {
  describe: 'As a Customer Punchout, I able to get product details snapshot after Product Group Details change',
  postSuccessSnapshot: 'should get response product details not change snapshot after Product Group Details change',
};

const testScenarioChangePgVisibility = {
  describe: 'As a Customer Punchout, I able to get product details snapshot after Product Group Visibility',
  postSuccessSnapshot: 'should get response product details not change snapshot after Product Group Visibility change to inactive',
};

describe(testScenarioPostSnapshot.describe, () => {
  let tokenPunchout;

  before(async () => {
    const bodyUserPunchout = testData.postTokenPunchout;
    const respondPunchout = await common.getTokenPunchout(bodyUserPunchout);
    expect(respondPunchout.status).to.equal(responseMessageCode.successOk);
    tokenPunchout = respondPunchout.body.customer.token;
  });

  it(`@happy ${testScenarioPostSnapshot.postSuccessSnapshot}`, async () => {
    const dataBody = testData.postValidPunchout;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.successOk);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseValidPunchout);
    expect(respondSnapshot.body.data).to.containSubset(testData.responseBodyPunchout.data);
  });

  it(`@negative ${testScenarioPostSnapshot.postInvalidSkuIdSnapshot}`, async () => {
    const dataBody = testData.postInvalidQuoataionIdPunchout;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseInvalidPunchout);
  });

  it(`@negative ${testScenarioPostSnapshot.postInvalidSkuIdSnapshot}`, async () => {
    const dataBody = testData.postInvalidSkuIdPunchout;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.failedNotFound.codeNumber);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseInvalidPunchout);
  });

  it(`@negative ${testScenarioPostSnapshot.postInvalidTokenSnapshot}`, async () => {
    const dataBody = testData.postInvalidTokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseInvalidPunchout);
  });
});

describe(testScenarioChangeVendorPrice.describe, () => {
  let tokenVendor;

  before(async () => {
    const userToLoginVendor = userCredential.vendor.dj2;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
    const vendorId = testDataListProduct.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphone7White32Vendor22.id;
    const dataBody = testDataListProduct.bodyUpdatePriceIphone7White32;
    const respondCatalogVendorStatus = await productVendorApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(`@negative ${testScenarioChangeVendorPrice.postSuccessSnapshot}`, async () => {
    const bodyUserPunchout = testData.postTokenPunchout;
    const respondPunchout = await common.getTokenPunchout(bodyUserPunchout);
    expect(respondPunchout.status).to.equal(responseMessageCode.successOk);
    const tokenPunchout = respondPunchout.body.customer.token;
    const dataBody = testData.postValidPunchoutOutSideContract;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.successOk);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseValidPunchout);
    expect(respondSnapshot.body.data).to.containSubset(testData.responseBodyPunchoutOutsideContract.data);
  });

  after(async () => {
    const vendorId = testDataListProduct.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphone7White32Vendor22.id;
    const dataBody = testDataListProduct.bodyRestorePriceIphone7White32;
    const respondCatalogVendorStatus = await productVendorApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });
});

describe(testScenarioChangeVendorStatus.describe, () => {
  let tokenVendor;

  before(async () => {
    const userToLoginVendor = userCredential.vendor.dj2;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
    const vendorId = testDataListProduct.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphone7White32Vendor22.id;
    const dataBody = testDataListProduct.bodyPutProductVendorStatusNotActive;
    const respondCatalogVendorStatus = await productVendorApi.putProductVendorStatus(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(`@negative ${testScenarioChangeVendorStatus.postSuccessSnapshot}`, async () => {
    const bodyUserPunchout = testData.postTokenPunchout;
    const respondPunchout = await common.getTokenPunchout(bodyUserPunchout);
    expect(respondPunchout.status).to.equal(responseMessageCode.successOk);
    const tokenPunchout = respondPunchout.body.customer.token;
    const dataBody = testData.postValidPunchoutOutSideContract;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.successOk);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseValidPunchout);
    expect(respondSnapshot.body.data).to.containSubset(testData.responseBodyPunchoutOutsideContract.data);
  });

  after(async () => {
    const vendorId = testDataListProduct.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphone7White32Vendor22.id;
    const dataBody = testDataListProduct.bodyPutProductVendorStatusActive;
    const respondCatalogVendorStatus = await productVendorApi.putProductVendorStatus(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });
});

describe(testScenarioChangePg.describe, () => {
  let tokenBo;

  before(async () => {
    const userToLoginBo = userCredential.backOffice.admin;
    const respondBo = await common.getTokenFo(userToLoginBo);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
    const productGroupId = testDataBoPg.productGroup.iphoneXVendor22.id;
    const bodyData = testDataBoPg.bodyUpdatePgIphoneX;
    const respondPgUpdate = await productGroupApi.putBoProductGroup(productGroupId, bodyData, tokenBo);
    expect(respondPgUpdate.status).to.equal(responseMessageCode.successOk);
  });

  it(`@negative ${testScenarioChangePg.postSuccessSnapshot}`, async () => {
    const bodyUserPunchout = testData.postTokenPunchout;
    const respondPunchout = await common.getTokenPunchout(bodyUserPunchout);
    expect(respondPunchout.status).to.equal(responseMessageCode.successOk);
    const tokenPunchout = respondPunchout.body.customer.token;
    const dataBody = testData.postValidPunchoutOutSideCatalog;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.successOk);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseValidPunchout);
    expect(respondSnapshot.body.data).to.containSubset(testData.responseBodyPunchoutOutsideCatalog.data);
  });

  after(async () => {
    const productGroupId = testDataBoPg.productGroup.iphoneXVendor22.id;
    const bodyData = testDataBoPg.bodyUpdateRestorePgIphoneX;
    const respondPgUpdate = await productGroupApi.putBoProductGroup(productGroupId, bodyData, tokenBo);
    expect(respondPgUpdate.status).to.equal(responseMessageCode.successOk);
  });
});

describe(testScenarioChangePgVisibility.describe, () => {
  let tokenBo;

  before(async () => {
    const userToLoginBo = userCredential.backOffice.admin;
    const respondBo = await common.getTokenFo(userToLoginBo);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
    const productGroupId = testDataBoPg.productGroup.iphoneXVendor22.id;
    const bodyData = testDataBoPg.bodyUpdateVisibilty;
    const respondPgUpdate = await productGroupApi.putBoProductGroupVisibility(productGroupId, bodyData, tokenBo);
    expect(respondPgUpdate.status).to.equal(responseMessageCode.successOk);
  });

  it(`@negative ${testScenarioChangePgVisibility.postSuccessSnapshot}`, async () => {
    const bodyUserPunchout = testData.postTokenPunchout;
    const respondPunchout = await common.getTokenPunchout(bodyUserPunchout);
    expect(respondPunchout.status).to.equal(responseMessageCode.successOk);
    const tokenPunchout = respondPunchout.body.customer.token;
    const dataBody = testData.postValidPunchoutOutSideCatalog;
    dataBody.token = tokenPunchout;
    const respondSnapshot = await productDetailSnapshotApi.postProductDetailSnapshot(dataBody, tokenPunchout);
    expect(respondSnapshot.status).to.equal(responseMessageCode.successOk);
    expect(respondSnapshot.body).to.be.jsonSchema(schemaAssertion.getResponseValidPunchout);
    expect(respondSnapshot.body.data).to.containSubset(testData.responseBodyPunchoutOutsideCatalog.data);
  });

  after(async () => {
    const productGroupId = testDataBoPg.productGroup.iphoneXVendor22.id;
    const bodyData = testDataBoPg.bodyRestoreVisibilty;
    const respondPgUpdate = await productGroupApi.putBoProductGroupVisibility(productGroupId, bodyData, tokenBo);
    expect(respondPgUpdate.status).to.equal(responseMessageCode.successOk);
  });
});
