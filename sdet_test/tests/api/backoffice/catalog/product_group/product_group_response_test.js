const expect = require('chai').expect;
const testData = require('./../../../../helper/testDataProductGroup.js');
const productGroupList = require('./../../../../page-objects/api/backoffice/catalog/product_group/product_group');

const testScenario = {
  testSuiteRespondeCode: {
    describe: 'Product Group List to Check Response Code',
    itUnauthorizeGetPgList: 'should check unauthorize response code for get product group list',
    itUnauthorizePostPg: 'should check unauthorize response code for post product group',
    itUnauthorizeGetPgDetail: 'should check unauthorize response code for get detail product group',
    itUnauthorizePutProductGroup: 'should check unauthorize response code for update detail product group',
    itUnauthorizeVisProductGroup: 'should check unauthorize response code for update visibilty product group',
    itUnauthorizeGetHistory: 'should check unauthorize response code for get history product group',
    itUnauthorizeDeleteProductGroup: 'should check unauthorize response code for delete product group',
    itUnauthorizePostSkuProductGroup: 'should check unauthorize response code for post sku of product group',
    itUnauthorizeGetSkuGroupDetail: 'should check unauthorize response code for get sku of product group',
  },
};

const q = testData.queryProductGroupList;
const bodyUpdateProductGroup = testData.putDataProductGroup;
const bodyProductGroup = testData.postDataProductGroup;
const bodySkuProductGroup = testData.postDataSkuProductGroup;

describe(`@desktop @all @regression @backoffice @catalog ${testScenario.testSuiteRespondeCode.describe}`, () => {
  const incorrectToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZlbmRvckBpbGRhdi5jb20iLCJmaXJzdF9uYW1lIjoiSWxkYXYiLCJsYXN0X25hbWUiOiJQS1AiLCJzY29wZSI6Im9yZ2FuaXphdGlvbiIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0IjpmYWxzZSwiaXNfdXNlcl9wdW5jaG91dCI6ZmFsc2UsInNhbGVzX2FkbWluX2lkIjowLCJkYXRhIjp7fX0sImN1c3RvbWVyIjp7Im9yZ2FuaXphdGlvbl9uYW1lIjoiUFQgSWxkYXYgTWFrbXVyIFNlbnRvc2EiLCJvcmdhbml6YXRpb25faWQiOjkxLCJwZXJzb25faWQiOjM1Nywic3VwZXJhZG1pbiI6MzU3LCJyb2xlcyI6W3sicm9sZV9pZCI6MywibmFtZSI6IlN1cGVyIEFkbWluIn1dLCJpc192ZW5kb3IiOjEsInNldHVwIjo2LCJzdGF0dXMiOjMsImhhc19hZ3JlZW1lbnQiOjEsImNoYW5uZWxfdHlwZSI6Ik1QIn0sImlhdCI6MTUzMzcyNDAyOSwiZXhwIjoxNTMzNzMxMjI5fQ.ryGQEqBjt_ZIJflPeIJ6kkbBIXJa7opfuCKHjcdadBCG_GeiY_zQXZmfi4y49k50IvxvDXchYpIuKR1cxDOCUdrjnpzkqSdHDeEID7qBx4_FUomP4mQRYjgiOxgdY_UzDnEllD-UaQ4KviaBoO0vW_5N0-7PUBRiaNTeeGPD6GeCp-jhb-HADKypnEJFZ9edmWfizdzMHYO9YmmulFmEKYxkqdpG9FNxX7-HbcMH8e13yeuspUJkO7oIGI3FRiDnr01hcCS1VMNW0TL0snVxIDbxrMMsOSWKrM3gKHZKLHsTC0G5AbWgKocpKuCMi35NFK0xMvvfU7TzMUIa';

  it(testScenario.testSuiteRespondeCode.itUnauthorizeGetPgList, (done) => {
    productGroupList.getProductGroupList({ sort: 'created_at_desc' }, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizePostPg, (done) => {
    productGroupList.postProductGroup(bodyProductGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizeGetPgDetail, (done) => {
    productGroupList.getProductGroupDetail(q.productGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizePutProductGroup, (done) => {
    productGroupList.putProductGroup(q.productGroup, bodyUpdateProductGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizeVisProductGroup, (done) => {
    productGroupList.visProductGroup(q.productGroup, bodyProductGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizeGetHistory, (done) => {
    productGroupList.getHistoryProductGroup(q.productGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizeDeleteProductGroup, (done) => {
    productGroupList.delProductGroup(q.productGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizePostSkuProductGroup, (done) => {
    productGroupList.addSkuProductGroup(q.productGroup, bodySkuProductGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });

  it(testScenario.testSuiteRespondeCode.itUnauthorizeGetSkuGroupDetail, (done) => {
    productGroupList.getSkuDetails(q.productGroup, incorrectToken, (resp) => {
      expect(resp.status).to.equal(403);
      done();
    });
  });
});
