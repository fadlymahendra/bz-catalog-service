const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));

const common = require('../../helper/common');
const responseMessageCode = require('../../helper/responseMessageAndCode.json');
const userCredential = require('../../helper/userCredential.json');

const openApi = require('../../page-objects/api/external_api/update_product_summary');
const productVendorApi = require('../../page-objects/api/frontoffice/catalog/products/detail');
const responseMessage = require('../../helper/external_api/product_summary/response_message.json');
const testDataSuccess = require('../../helper/external_api/product_summary/update_product_summary_positive_data.json');
const testDataFail = require('../../helper/external_api/product_summary/update_product_summary_negative_data.json');
const testDataPartialSuccess = require('../../helper/external_api/product_summary/update_product_summary_partial_success_data.json');
const testDataLimit = require('../../helper/external_api/product_summary/update_product_summary_data');
const testDataProductVendor = require('../../helper/external_api/product_summary/product_vendor_data.json');
const schemaAssertion = require('../../helper/schema/external_api/update_product_summary_schema.json');

describe('@publicApi @productSummary @updateStatusStockPrice Test update price and/or stock', () => {
  let token;
  let tokenVendor;
  const vendorId = userCredential.vendor.vendorPublicApi.vendorId;

  before(async () => {
    token = await openApi.constructJwtToken(userCredential.vendor.vendorPublicApi);
    const responseToken = await common.getTokenFo(userCredential.vendor.hvendor);
    expect(responseToken.status).to.equal(responseMessageCode.successOk);
    tokenVendor = responseToken.body.seller.token;
  });

  afterEach(async () => {
    const response = await openApi.putUpdateProductSummary(vendorId, testDataSuccess.dataRevertList.requestBody, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.products[0].status).to.equal(responseMessage.status.OK);
    expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
  });

  for (const testCase of testDataSuccess.dataList) {
    it(`@happy ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      if (testCase.requestBody.products[0].stock !== null) {
        productComparation.stock_available = testCase.requestBody.products[0].stock.toFixed(2);
      }
      if (testCase.requestBody.products[0].product_status !== null) {
        productComparation.is_active = testCase.requestBody.products[0].product_status;
      }
      if (testCase.requestBody.products[0].wholesales.length !== 0) {
        const tierPrice = testCase.requestBody.products[0].wholesales;
        tierPrice.forEach((item) => {
          productComparation[`tier_min_qty_${item.tier}`] = item.min;
          productComparation[`tier_cogs_price_${item.tier}`] = item.unit_price.toFixed(2);
        });
      }
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responseValidSchema);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }
});

describe('@publicApi @productSummary @dataLimitBoundary Data Limit Boundary', () => {
  let token;
  const vendorId = userCredential.vendor.vendorPublicApi.vendorId;

  before(async () => {
    token = await openApi.constructJwtToken(userCredential.vendor.vendorPublicApi);
    const responseToken = await common.getTokenFo(userCredential.vendor.hvendor);
    expect(responseToken.status).to.equal(responseMessageCode.successOk);
  });

  for (const testCase of testDataSuccess.dataLimitBoundary) {
    it(`@happy ${testCase.title}`, async () => {
      const response = await openApi.putUpdateProductSummary(vendorId, testDataLimit.dataDuplicate(testCase.numberOfProductToUpdate), token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responseValidSchema);
    });
  }
});

describe('@publicApi @productSummary @fullReject Fully Reject Request Update', () => {
  let token;
  let tokenVendor;
  const vendorId = userCredential.vendor.vendorPublicApi.vendorId;

  before(async () => {
    token = openApi.constructJwtToken(userCredential.vendor.vendorPublicApi);
    const responseToken = await common.getTokenFo(userCredential.vendor.hvendor);
    expect(responseToken.status).to.equal(responseMessageCode.successOk);
    tokenVendor = responseToken.body.seller.token;
  });

  for (const testCase of testDataFail.dataFullRejectExceedLimit) {
    it(`@negative ${testCase.title}`, async () => {
      const response = await openApi.putUpdateProductSummary(vendorId, testDataLimit.dataDuplicate(testCase.numberOfProductToUpdate), token);
      expect(response.status).to.equal(responseMessageCode.failedUnprocessableEntity.codeNumber);
      expect(response.body.message).to.equal(responseMessage.message.httpLevel.EXCESS_DATA_LIMIT);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responseFullyReject);
    });
  }

  for (const testCase of testDataFail.dataFullRejectMissingParameter) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(response.body.message).to.equal(responseMessage.message.httpLevel.MISSING_PARAMETER);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responseFullyReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataFail.dataFullRejectFormat) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
      expect(response.body.message).to.equal(responseMessage.message.httpLevel.INVALID_REQUEST_FORMAT);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responseFullyReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  it(`@negative ${testDataFail.dataFullRejectVendorIDNull[0].title}`, async () => {
    const testCaseProductVendorId = testDataFail.dataFullRejectVendorIDNull[0].productVendors[0].id;
    const testCaseProductGroupId = testDataFail.dataFullRejectVendorIDNull[0].productVendors[0].product_group_id;
    const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
    const response = await openApi.putUpdateProductSummary(null, testDataFail.dataFullRejectVendorIDNull[0].requestBody, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.message).to.equal(responseMessage.message.httpLevel.INVALID_REQUEST_FORMAT);
    expect(response.body).to.be.jsonSchema(schemaAssertion.responseFullyReject);
    const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
    expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
    const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
    expect(productVendor).to.containSubset(productComparation);
  });
});

describe('@publicApi @productSummary @partialSuccess Partial Success Request Update', () => {
  let token;
  let tokenVendor;
  const vendorId = userCredential.vendor.vendorPublicApi.vendorId;

  before(async () => {
    token = await openApi.constructJwtToken(userCredential.vendor.vendorPublicApi);
    const responseToken = await common.getTokenFo(userCredential.vendor.hvendor);
    expect(responseToken.status).to.equal(responseMessageCode.successOk);
    tokenVendor = responseToken.body.seller.token;
  });

  after(async () => {
    const response = await openApi.putUpdateProductSummary(vendorId, testDataSuccess.dataRevertList.requestBody, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body.products[0].status).to.equal(responseMessage.status.OK);
    expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
  });

  for (const testCase of testDataPartialSuccess.dataInvalidStock) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.INVALID_STOCK);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataPartialSuccess.dataInvalidTier) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.INVALID_TIER);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataPartialSuccess.dataInvalidMinQty) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.INVALID_MIN_QTY);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataPartialSuccess.dataInvalidUnitPrice) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.INVALID_PRICE);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataPartialSuccess.dataMissingSelector) {
    it(`@negative ${testCase.title}`, async () => {
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.EMPTY_SKU);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
    });
  }

  for (const testCase of testDataPartialSuccess.dataEmptyProduct) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.EMPTY_PRODUCT_DATA);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }

  for (const testCase of testDataPartialSuccess.dataSkuNotFound) {
    it(`@negative ${testCase.title}`, async () => {
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.equal(responseMessage.message.dataLevel.SKU_NOT_FOUND);
      expect(response.body).to.be.jsonSchema(schemaAssertion.responsePartialReject);
    });
  }

  for (const testCase of testDataPartialSuccess.dataMultiplePartialSuccess) {
    it(`@negative ${testCase.title}`, async () => {
      const testCaseProductVendorId = testCase.productVendors[0].id;
      const testCaseProductGroupId = testCase.productVendors[0].product_group_id;
      const productComparation = JSON.parse(JSON.stringify(testDataProductVendor[`product_${testCaseProductVendorId}`].data));
      if (testCase.requestBody.products[1].stock !== null) {
        productComparation.stock_available = testCase.requestBody.products[1].stock.toFixed(2);
      }
      if (testCase.requestBody.products[1].product_status !== null) {
        productComparation.is_active = testCase.requestBody.products[1].product_status;
      }
      if (testCase.requestBody.products[1].wholesales.length !== 0) {
        const tierPrice = testCase.requestBody.products[1].wholesales;
        tierPrice.forEach((item) => {
          productComparation[`tier_min_qty_${item.tier}`] = item.min;
          productComparation[`tier_cogs_price_${item.tier}`] = item.unit_price.toFixed(2);
        });
      }
      const response = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, token);
      expect(response.status).to.equal(responseMessageCode.successOk);
      expect(response.body.products[0].status).to.equal(responseMessage.status.NOT_OK);
      expect(response.body.products[0].message).to.not.equal(null);
      expect(response.body.products[1].status).to.equal(responseMessage.status.OK);
      expect(response.body.products[1].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
      const responseProductVendor = await productVendorApi.getProductDetail(vendorId, testCaseProductGroupId, tokenVendor);
      expect(responseProductVendor.status).to.equal(responseMessageCode.successOk);
      const productVendor = responseProductVendor.body.product.find(item => item.id === testCaseProductVendorId);
      expect(productVendor).to.containSubset(productComparation);
    });
  }
});
