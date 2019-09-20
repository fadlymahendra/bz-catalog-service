const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const api = require('./../../../../page-objects/api/backoffice/catalog/sku-managements/ecart_detail.js');
const cases = require('./../../../../testcases/backoffice/catalog/sku-managements/ecart_detail_testcase.js');
const schema = require('../../../../helper/schema.js');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');

describe('Get Ecart Product Details', () => {
  const skuNoVariant = 'YTTJR6RNNY';
  const sku1Variant = 'TRG8QVK5SI';
  const sku2Variant = 'WBQH1BWFAN';

  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @premod ${cases.scenario.getOK.descNoVariant}`, async () => {
    const response = await api.ecartDetail(skuNoVariant, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(schema.productEcart);
  });

  it(`@happy @get @backoffice @premod ${cases.scenario.getOK.desc1Variant}`, async () => {
    const response = await api.ecartDetail(sku1Variant, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(schema.productEcart);
  });

  it(`@happy @get @backoffice @premod ${cases.scenario.getOK.desc2Variant}`, async () => {
    const response = await api.ecartDetail(sku2Variant, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(schema.productEcart);
  });
});
