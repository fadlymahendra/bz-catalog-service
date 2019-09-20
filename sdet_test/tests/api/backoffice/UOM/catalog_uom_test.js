const { expect } = require('chai');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/testData.js');
const uom = require('../../../page-objects/api/backoffice/UOM/uom_management.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const testDataUOM = require('../../../helper/backoffice/uom/uom_management_data.json');

const uomString = {
  description: {
    createUom: 'Create UOM',
    createUomWithoutAuth: 'Create UOM without Auth',
    createDuplicateUom: 'Create duplicate UOM',
    getUomDetails: 'Get UOM details',
    getRandomUoms: 'Get Random Uoms',
    getRandomUomsWithoutAuth: 'Get Random Uoms without auth',
    getAllUom: 'Get All UOM',
    getAllUomWithoutAuth: 'Get All UOM without Auth',
    updateUom: 'Update UOM name',
    updateUomWithoutAuth: 'Update UOM name without Auth',
    deleteUom: 'Delete UOM',
    deleteUomWithoutAuth: 'Delete UOM without Auth',
    withoutAuthUom: 'Request Get UOM without Auth token',
  },
  describeIt: {
    checkCreated: 'UOM should be created',
    checkCreateWithoutAuth: 'UOM should NOT be created',
    checkDuplicate: 'UOM should NOT be created',
    checkData: 'should give UOM details',
    checkAllUom: 'all UOM at page 1 will be displayed',
    checkUpdateUom: 'UOM name should be updated',
    checkUpdateUomWithoutAuth: 'UOM name should NOT be updated',
    checkDeletedUom: 'UOM should be deleted',
    checkDeletedUomWithoutAuth: 'UOM should NOT be deleted',
    checkwithoutAuthUom: 'should be unauthorized and give error 401',
  },
};

  // CRUD brands
describe('CRUD /catalog/uoms @text', () => {
  let iDUom = 0;
  const createRandomBody = (testData.dataRandomName('correct-name'));
  const uomID = common.randomUomsId();

  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(uomString.description.createUomWithoutAuth, async () => {
    const response = await uom.createUomWithoutAuth(testData.idCategory);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.describeIt.checkCreated, async () => {
    const response = await uom.createUom(createRandomBody, token);
    iDUom = response.body.data.id;
    expect(response.status).to.equal(responseCodeMessage.successCreated);
  });

  it(uomString.describeIt.checkDuplicate, async () => {
    const response = await uom.createUom(createRandomBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  // get UOM without auth
  it(uomString.describeIt.checkwithoutAuthUom, async () => {
    const response = await uom.getUomWithoutAuth(iDUom);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.describeIt.checkData, async () => {
    const response = await uom.getUom(iDUom, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
  });

  // get UOM random without auth
  it(uomString.description.getRandomUomsWithoutAuth, async () => {
    const response = await uom.getUomWithoutAuth(uomID);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.description.getRandomUoms, async () => {
    const response = await uom.getUom(uomID, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
  });

  it(uomString.description.getAllUomWithoutAuth, async () => {
    const response = await uom.searchUomsWithoutAuth(testDataUOM.validParam);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.describeIt.checkAllUom, async () => {
    const response = await uom.searchUoms(testDataUOM.validParam, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
  });

  it(uomString.describeIt.checkUpdateUomWithoutAuth, async () => {
    const updateuomBody = (testData.dataRandomName('update-name'));
    const response = await uom.updateUomWithoutAuth(iDUom, updateuomBody, token);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.describeIt.checkUpdateUom, async () => {
    const updateuomBody = (testData.dataRandomName('update-name'));
    const response = await uom.updateUom(iDUom, updateuomBody, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.name).to.equal(updateuomBody.name);
  });

  it(uomString.describeIt.checkData, async () => {
    const response = await uom.getUom(iDUom, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.id).to.equal(iDUom);
  });

  it(uomString.describeIt.checkDeletedUomWithoutAuth, async () => {
    const response = await uom.deleteUomWithoutAuth(iDUom, token);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });

  it(uomString.describeIt.checkDeletedUom, async () => {
    const response = await uom.deleteUom(iDUom, token);
    expect(response.status).to.equal(responseCodeMessage.successNoContent);
  });
});
