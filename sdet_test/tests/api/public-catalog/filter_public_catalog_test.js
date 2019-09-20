const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
chai.use(require('chai-subset'));
chai.use( require('chai-integer') );

const math = require('math-precision').ceil;
const filterPublicCatalog = require('./../../page-objects/api/public-catalog/filter_public_catalog.js');
const schemaAssertion = require('./../../helper/schema/public-catalog/filter_public_catalog_schema.json');
const testcase = require('./../../testcases/public-catalog/filter_public_catalog_testcase.js');
const responseMessageCode = require('./../../helper/responseMessageAndCode.json');
const testdata = require('./../../helper/public-catalog/filter_public_catalog_data.json');

describe('@filterPublicCatalog filter and search Public Catalog Test API Service', () => {
  
  it(`@C10104 ${testcase.scenario.postSuccess.successPostPublicCatalogLimitEven}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitEven;
    const bodyData = testdata.body.successPostPublicCatalogFilterC0;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    const pagelimit = respond.body.results[0].hitsPerPage;
    const totaldata = respond.body.results[0].nbHits;
    const totalpages = math(totaldata / pagelimit);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].nbPages).to.equal(totalpages);
    expect(respond.body.results[0].page).to.equal(testdata.params.successPostPublicCatalogLimitEven.page);
    expect(respond.body.results[0].hitsPerPage).to.equal(testdata.params.successPostPublicCatalogLimitEven.limit);  
  });

  it(`@C10105 ${testcase.scenario.postSuccess.successPostPublicCatalogLimitOdd}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogFilterC0;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    const pagelimit = respond.body.results[0].hitsPerPage;
    const totaldata = respond.body.results[0].nbHits;
    const totalpages = math(totaldata / pagelimit);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].nbPages).to.equal(totalpages);
    expect(respond.body.results[0].page).to.equal(testdata.params.successPostPublicCatalogLimitOdd.page);
    expect(respond.body.results[0].hitsPerPage).to.equal(testdata.params.successPostPublicCatalogLimitOdd.limit);  
  });

  it(`@C10106 ${testcase.scenario.postSuccess.successPostPublicCatalogSearchCategoryName}`, async () => {
    const query = testdata.params.successPostPublicCatalogSearchCategoryName;
    const bodyData = testdata.body.successPostPublicCatalogSearchCategoryName;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogSearchCategoryName);
  });

  it(`@C10378 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Decoration}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Decoration;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Decoration);
  });

  it(`@C10379 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Electronic}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Electronic;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Electronic);
  });

  it(`@C10380 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Furniture}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Furniture;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Furniture);
  });

  it(`@C10381 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Gift}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Gift;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Gift);
  });

  it(`@C10382 ${testcase.scenario.postSuccess.successPostPublicCatalogC0IT}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0IT;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0IT);
  });

  it(`@C10383 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Transportation}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Transportation;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10384 ${testcase.scenario.postSuccess.successPostPublicCatalogC0MRO}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0MRO;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0MRO);
  });

  it(`@C10385 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Otomotif}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Otomotif;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Otomotif);
  });

  it(`@C10386 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Pantry}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Pantry;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Pantry);
  });

  it(`@C10387 ${testcase.scenario.postSuccess.successPostPublicCatalogC0EquipmentHotel}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0EquipmentHotel;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0EquipmentHotel);
  });

  it(`@C10388 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Camera}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Camera;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Camera);
  });

  it(`@C10389 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Office}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Office;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Office);
  });

  it(`@C10390 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Agriculture}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Agriculture;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Agriculture);
  });

  it(`@C10391 ${testcase.scenario.postSuccess.successPostPublicCatalogC0Surveillance}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Surveillance;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC0Surveillance);
  });

  it(`@C10398 ${testcase.scenario.postSuccess.successPostPublicCatalogC0DecorationandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0DecorationandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0DecorationandBrand);
  });

  it(`@C10399 ${testcase.scenario.postSuccess.successPostPublicCatalogC0ElectronicandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0ElectronicandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0ElectronicandBrand);
  });

  it(`@C10400 ${testcase.scenario.postSuccess.successPostPublicCatalogC0FurnitureandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0FurnitureandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0FurnitureandBrand);
  });

  it(`@C10401 ${testcase.scenario.postSuccess.successPostPublicCatalogC0GiftandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0GiftandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0GiftandBrand);
  });

  it(`@C10402 ${testcase.scenario.postSuccess.successPostPublicCatalogC0ITandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0ITandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0ITandBrand);
  });

  it(`@C10403 ${testcase.scenario.postSuccess.successPostPublicCatalogC0TransportationandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0TransportationandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10404 ${testcase.scenario.postSuccess.successPostPublicCatalogC0MROandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0MROandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0MROandBrand);
  });

  it(`@C10405 ${testcase.scenario.postSuccess.successPostPublicCatalogC0OtomotifandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0OtomotifandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0OtomotifandBrand);
  });

  it(`@C10406 ${testcase.scenario.postSuccess.successPostPublicCatalogC0PantryandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0PantryandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0PantryandBrand);
  });

  it(`@C10407 ${testcase.scenario.postSuccess.successPostPublicCatalogC0EquipmentHotelandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0EquipmentHotelandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0EquipmentHotelandBrand);
  });

  it(`@C10408 ${testcase.scenario.postSuccess.successPostPublicCatalogC0CameraandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0CameraandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0CameraandBrand);
  });

  it(`@C10409 ${testcase.scenario.postSuccess.successPostPublicCatalogC0OfficeandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0OfficeandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0OfficeandBrand);
  });

  it(`@C10410 ${testcase.scenario.postSuccess.successPostPublicCatalogC0AgricultureandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0AgricultureandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0AgricultureandBrand);
  });

  it(`@C10411 ${testcase.scenario.postSuccess.successPostPublicCatalogC0SurveillanceandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0SurveillanceandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC0SurveillanceandBrand);
  });

  it(`@C10423 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Decoration}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Decoration;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Decoration);
  });

  it(`@C10424 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Electronic}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Electronic;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Electronic);
  });

  it(`@C10425 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Furniture}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Furniture;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Furniture);
  });

  it(`@C10412 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Gift}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Gift;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Gift);
  });

  it(`@C10413 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0IT}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0IT;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0IT);
  });

  it(`@C10414 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Transportation}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Transportation;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10415 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0MRO}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0MRO;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0MRO);
  });

  it(`@C10416 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Otomotif}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Otomotif;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Otomotif);
  });

  it(`@C10417 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Pantry}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Pantry;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Pantry);
  });

  it(`@C10418 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0EquipmentHotel}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0EquipmentHotel;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0EquipmentHotel);
  });

  it(`@C10419 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Camera}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Camera;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Camera);
  });

  it(`@C10420 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Office}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Office;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Office);
  });

  it(`@C10421 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Agriculture}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Agriculture;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Agriculture);
  });

  it(`@C10422 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0Surveillance}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0Surveillance;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0Surveillance);
  });

  it(`@C10426 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0DecorationandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0DecorationandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0DecorationandBrand);
  });

  it(`@C10427 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0ElectronicandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0ElectronicandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0ElectronicandBrand);
  });

  it(`@C10428 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0FurnitureandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0FurnitureandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0FurnitureandBrand);
  });

  it(`@C10429 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0GiftandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0GiftandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0GiftandBrand);
  });

  it(`@C10430 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0ITandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0ITandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0ITandBrand);
  });

  it(`@C10431 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0TransportationandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0TransportationandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10432 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0MROandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0MROandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0MROandBrand);
  });

  it(`@C10433 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0OtomotifandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0OtomotifandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0OtomotifandBrand);
  });

  it(`@C10434 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0PantryandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0PantryandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0PantryandBrand);
  });

  it(`@C10435 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0EquipmentHotelandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0EquipmentHotelandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0EquipmentHotelandBrand);
  });

  it(`@C10436 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0CameraandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0CameraandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0CameraandBrand);
  });

  it(`@C10437 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0OfficeandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0OfficeandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0OfficeandBrand);
  });

  it(`@C10438 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0AgricultureandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0AgricultureandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0AgricultureandBrand);
  });

  it(`@C10439 ${testcase.scenario.postSuccess.successPostPublicCatalogC1fromC0SurveillanceandBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC1fromC0SurveillanceandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogC1fromC0SurveillanceandBrand);
  });
  
  it(`@C10440 ${testcase.scenario.postSuccess.successPostPublicCatalogWithOneBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogWithOneBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogWithOneBrand);
  });

  it(`@C10441 ${testcase.scenario.postSuccess.successPostPublicCatalogWithMulitipleBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogWithMulitipleBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogWithMulitipleBrand);
  });

  it(`@C10455 ${testcase.scenario.postSuccess.successPostPublicCatalogSearchSKU}`, async () => {
    const query = testdata.params.successPostPublicCatalogSearchSKU;
    const bodyData = testdata.body.successPostPublicCatalogC0IT;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogSearchSKU);
  });

  it(`@C10442 ${testcase.scenario.postSuccess.successPostPublicCatalogInvalidSearchCategoryName}`, async () => {
    const query = testdata.params.successPostPublicCatalogInvalidSearchCategoryName;
    const bodyData = testdata.body.successPostPublicCatalogC0ITandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10443 ${testcase.scenario.postSuccess.successPostPublicCatalogInvalidFilterCategoryName}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogInvalidFilterCategoryName;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].nbHits).to.be.integer;
    expect(respond.body.results[0].page).to.be.integer;
    expect(respond.body.results[0].nbPages).to.be.integer;
    expect(respond.body.results[0].hitsPerPage).to.be.integer;
  });

  it(`@C10444 ${testcase.scenario.postSuccess.successPostPublicCatalogInvalidFilterBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogInvalidFilterBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].nbHits).to.be.integer;
    expect(respond.body.results[0].page).to.be.integer;
    expect(respond.body.results[0].nbPages).to.be.integer;
    expect(respond.body.results[0].hitsPerPage).to.be.integer;
  });

  it(`@C10445 ${testcase.scenario.postSuccess.successPostPublicCatalogCategoryNameAndSearchProductNameAndMultipleBrand}`, async () => {
    const query = testdata.params.successPostPublicCatalogCategoryNameAndSearchProductNameAndMultipleBrand;
    const bodyData = testdata.body.successPostPublicCatalogCategoryNameAndSearchProductNameAndMultipleBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0]).to.containSubset(testdata.response.successPostPublicCatalogCategoryNameAndSearchProductNameAndMultipleBrand);
  });

  it(`@C10446 ${testcase.scenario.postSuccess.successPostPublicCatalogCategoryNameAndBrandNameAndInvalidSerch}`, async () => {
    const query = testdata.params.successPostPublicCatalogInvalidSearchCategoryName;
    const bodyData = testdata.body.successPostPublicCatalogC0ITandBrand;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData);
    expect(respond.status).to.equal(responseMessageCode.successOk, respond.body.message);
    expect(respond.body).to.be.jsonSchema(schemaAssertion.postValidFilterPublicCatalog);
    expect(respond.body.results[0].hits).to.be.empty;
  });

  it(`@C10453 @neg ${testcase.scenario.postFailed.failedPostWithInvalidKey}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Decoration;
    const key = testdata.invalidKey;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData, key);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, respond.body.message);
  });

  it(`@C10457 @neg ${testcase.scenario.postFailed.failedPostWithBlankKey}`, async () => {
    const query = testdata.params.successPostPublicCatalogLimitOdd;
    const bodyData = testdata.body.successPostPublicCatalogC0Decoration;
    const respond = await filterPublicCatalog.postFilterPublicCatalog(query, bodyData, null);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber, respond.body.message);
  });
});