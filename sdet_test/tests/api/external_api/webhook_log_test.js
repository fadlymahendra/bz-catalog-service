const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const webhookApi = require('../../page-objects/api/external_api/webhook/webhook_logs.js');
const updateStockApi = require('../../page-objects/api/frontoffice/catalog/products/update_stock.js');
const openApi = require('../../page-objects/api/external_api/update_product_summary.js');
const catalogVendorStatuApi = require('../../page-objects/api/frontoffice/catalog/vendor/product_vendor.js');
const subscriberLibrary = require('./../../helper/external_api/subscriber_library');
const subscriberInvoker = require('./../../helper/external_api/subscriber_invoker');
const userCredential = require('../../helper/userCredential.json');
const testData = require('../../helper/external_api/webhook/webhook_log_data.json');
const schemaAssertion = require('../../helper/schema/external_api/webhook/webhook_logs_schema.json');
const responseMessageCode = require('../../helper/responseMessageAndCode.json');
const responseMessage = require('../../helper/external_api/product_summary/response_message.json');
const common = require('../../helper/common');

describe('@publicApi @webhookLogNonBci Get List and Detail Webhook Logs via Open API for Vendor Non BCI', () => {
  let tokenNonBci;

  before(async () => {
    tokenNonBci = await openApi.constructJwtToken(userCredential.vendor.vendorPublicApi);
  });

  for (const testCase of testData.nonBciDataList) {
    it(`@happy ${testCase.title}`, async () => {
      const getLogQueryNonBCI = testData.getLogQueryNonBciSubscriber;
      const vendorId = getLogQueryNonBCI.query.vendor_id;
      const vendorSkuNumber = testCase.requestBody.products[0].vendor_sku;
      const responseOpenAPI = await openApi.putUpdateProductSummary(vendorId, testCase.requestBody, tokenNonBci);
      expect(responseOpenAPI.status).to.equal(responseMessageCode.successOk);
      expect(responseOpenAPI.body.products[0].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
      webhookApi.sleep(3000);
      const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryNonBCI);
      expect(responseWebhookLogs).to.be.jsonSchema(schemaAssertion.responseValidWebhookList);
      const payloadWebhookResponse = responseWebhookLogs.find(element => element.payload.sku_vendor === vendorSkuNumber);
      expect(payloadWebhookResponse.payload).to.include(testCase.expectedBody.product_value);
      const getDetail = JSON.parse(JSON.stringify(testData.getLogDetailSubscriber));
      getDetail.path.id = payloadWebhookResponse.id;
      const responseWebhookDetails = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_DETAIL, getDetail);
      expect(responseWebhookDetails).to.be.jsonSchema(schemaAssertion.responseValidWebhookDetails);
      expect(responseWebhookDetails.payload).to.include(testCase.expectedBody.product_value);
    });
  }
});

describe('@publicApi @webhookLogBci Get List Webhook Logs via Open API for Vendor BCI', () => {
  let tokenBci;

  before(async () => {
    tokenBci = await openApi.constructJwtToken(userCredential.vendor.openAPIhbmi);
  });

  it(`@happy @updateProductBCI ${testData.updateProductBCI.title}`, async () => {
    const getLogQueryBCI = testData.getLogQueryBciSubscriber;
    const vendorId = getLogQueryBCI.query.vendor_id;
    const responseOpenAPI = await openApi.putUpdateProductSummary(vendorId, testData.updateProductBCI.requestBody, tokenBci);
    expect(responseOpenAPI.status).to.equal(responseMessageCode.successOk);
    expect(responseOpenAPI.body.products[0].status).to.equal(responseMessage.status.OK);
    expect(responseOpenAPI.body.products[0].message).to.equal(responseMessage.message.dataLevel.UPDATE_SUCCESS);
    webhookApi.sleep(3000);
    const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryBCI);
    expect(responseWebhookLogs).to.be.an('array').that.is.empty;
  });
});

describe('@publicApi @webhookLogVendorTools Get List Webhook Logs via Vendor Tools', () => {
  let tokenVendor;
  let tokenBciVendor;
  const vendorIdNonBCI = userCredential.vendor.vendorPublicApi.vendorId;
  const vendorIdBCI = userCredential.vendor.openAPIhbmi.vendorId;

  before(async () => {
    const responseToken = await common.getTokenFo(userCredential.vendor.hvendor);
    expect(responseToken.status).to.equal(responseMessageCode.successOk);
    tokenVendor = responseToken.body.seller.token;

    const responseTokenBCI = await common.getTokenFo(userCredential.vendor.bcivendor);
    expect(responseTokenBCI.status).to.equal(responseMessageCode.successOk);
    tokenBciVendor = responseTokenBCI.body.seller.token;
  });

  it(`@happy ${testData.updateStockViaVendorTools.title}`, async () => {
    const getLogQueryNonBCI = testData.getLogQueryNonBciSubscriber;
    const vendorSkuNumber = testData.updateStockViaVendorTools.vendorSku;
    const productVendorId = testData.updateStockViaVendorTools.productVendorId;
    const bodyUpdateStock = testData.updateStockViaVendorTools.requestBody;
    const putStockResponse = await updateStockApi.putNewStock(vendorIdNonBCI, productVendorId, bodyUpdateStock, tokenVendor);
    expect(putStockResponse.status).to.equal(responseMessageCode.successOk);
    webhookApi.sleep(4000);
    const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryNonBCI);
    expect(responseWebhookLogs).to.be.jsonSchema(schemaAssertion.responseValidWebhookList);
    const payloadWebhookResponse = responseWebhookLogs.find(element => element.payload.sku_vendor === vendorSkuNumber);
    expect(payloadWebhookResponse.payload).to.include(testData.updateStockViaVendorTools.expectedBody.product_value);
  });

  it(`@happy ${testData.updateTierViaVendorTools.title}`, async () => {
    const getLogQueryNonBCI = testData.getLogQueryNonBciSubscriber;
    const vendorSkuNumber = testData.updateTierViaVendorTools.vendorSku;
    const productVendorId = testData.updateTierViaVendorTools.productVendorId;
    const bodyChangeTier = testData.updateTierViaVendorTools.requestBody;
    const changeTierResponse = await catalogVendorStatuApi.putProductVendor(vendorIdNonBCI, productVendorId, bodyChangeTier, tokenVendor);
    expect(changeTierResponse.status).to.equal(responseMessageCode.successOk);
    webhookApi.sleep(4000);
    const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryNonBCI);
    expect(responseWebhookLogs).to.be.jsonSchema(schemaAssertion.responseValidWebhookList);
    const payloadWebhookResponse = responseWebhookLogs.find(element => element.payload.sku_vendor === vendorSkuNumber);
    expect(payloadWebhookResponse.payload).to.include(testData.updateTierViaVendorTools.expectedBody.product_value);
  });

  it(`@happy ${testData.updateAllItemProductPageViaVendorTools.title}`, async () => {
    const getLogQueryNonBCI = testData.getLogQueryNonBciSubscriber;
    const vendorSkuNumber = testData.updateAllItemProductPageViaVendorTools.vendorSku;
    const productGroupId = testData.updateAllItemProductPageViaVendorTools.productGroupId;
    const bodyProduct = testData.updateAllItemProductPageViaVendorTools.requestBody;
    const responsePutUpdate = await webhookApi.putUpdateProduct(vendorIdNonBCI, productGroupId, bodyProduct, tokenVendor);
    expect(responsePutUpdate.status).to.equal(responseMessageCode.successOk);
    webhookApi.sleep(4000);
    const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryNonBCI);
    expect(responseWebhookLogs).to.be.jsonSchema(schemaAssertion.responseValidWebhookList);
    const payloadWebhookResponse = responseWebhookLogs.find(element => element.payload.sku_vendor === vendorSkuNumber);
    expect(payloadWebhookResponse.payload).to.include(testData.updateAllItemProductPageViaVendorTools.expectedBody.product_value);
  });

  it(`@happy ${testData.updateBCIViaVendorTools.title}`, async () => {
    const getLogQueryBCI = testData.getLogQueryBciSubscriber;
    const productVendorId = testData.updateBCIViaVendorTools.productVendorId;
    const bodyProduct = testData.updateBCIViaVendorTools.requestBody;
    const responsePutUpdate = await updateStockApi.putNewStock(vendorIdBCI, productVendorId, bodyProduct, tokenBciVendor);
    expect(responsePutUpdate.status).to.equal(responseMessageCode.successOk);
    webhookApi.sleep(4000);
    const responseWebhookLogs = await subscriberInvoker(subscriberLibrary.PUBSUB_LAMBDA, subscriberLibrary.PUBSUB_GET_LIST, getLogQueryBCI);
    expect(responseWebhookLogs).to.be.jsonSchema(schemaAssertion.responseValidWebhookList);
    expect(responseWebhookLogs).to.be.an('array').that.is.empty;
  });
});
