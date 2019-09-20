/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const testData = require('./../../../../helper/testDataProductGroup.js');
const productGroupList = require('./../../../../page-objects/api/backoffice/catalog/product_group/product_group');

const testScenario = {
  testSuiteProductGroupCrud: {
    describe: 'CRUD for check New Product Group',
    itPostNewProductGroup: 'should post new product group',
    itGetProductGroupDetail: 'should get the details of product group',
    itPutProductGroup: 'should update the product group',
    itVisProductGroup: 'should change the visibility of product group',
    itPostSkuProductGroup: 'should post sku of product group',
    itGetSkuGroupDetail: 'should get sku of product group',
    itSearchSkuByName: 'should get list of sku by name',
    itGetHistoryProductGroup: 'should get history of the product group',
    itPostExistingProductGroup: 'should not post existing product group name',
    itPutExistingProductGroup: 'should not update existing product group name',
    itPostExcludeNonMandatoryProductGroup: 'should post if non-mandatory fields not filled in product group name',
    itDeleteProductGroup: 'should delete the product group',
  },
};

const bodyProductGroup = (productGroupName) => {
  const body = testData.postDataProductGroup;
  body.name = productGroupName;
  return body;
};
const bodyUpdateProductGroup = (productGroupName) => {
  const body = testData.putDataProductGroup;
  body.name = productGroupName;
  return body;
};
const bodyNonMandatoryProductGroup = (productGroupName) => {
  const body = testData.postDataExcNonMandatoryProductGroup;
  body.name = productGroupName;
  return body;
};
const bodyProductGroupVis = (visible) => {
  const body = testData.putVisibilityProductGroup;
  body.visibility = visible;
  return body;
};
const bodySkuProductGroup = (skuProductGroupName) => {
  const body = testData.postDataSkuProductGroup;
  body.product_variant_id = skuProductGroupName;
  return body;
};

describe(`@desktop @all @regression @backoffice @catalog ${testScenario.testSuiteProductGroupCrud.describe}`, () => {
  let token;
  let productGroupId;
  let productGroupId2;
  const productGroupName1 = `Samsung Galaxys ${common.randomNumber()}`;
  const productGroupName2 = `Samsung Galaxy ${common.randomNumber()}`;

  before((done) => {
    common.getAuthToken((resp) => {
      expect(resp.status).to.equal(200);
      token = resp.body.token;
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itPostNewProductGroup, (done) => {
    productGroupList.postProductGroup(bodyProductGroup(productGroupName1), token, (resp) => {
      expect(resp.status).to.equal(200);
      productGroupId = resp.body.product_group_id;
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itGetProductGroupDetail, (done) => {
    productGroupList.getProductGroupDetail(productGroupId, token, (resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.data.name).to.equal(productGroupName1);
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itPutProductGroup, (done) => {
    productGroupList.putProductGroup(productGroupId, JSON.stringify(bodyUpdateProductGroup(productGroupName2)), token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itVisProductGroup, (done) => {
    productGroupList.visProductGroup(productGroupId, bodyProductGroupVis('0'), token, (resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.data.visibility).to.equal(0);
      done();
    });
  });

  // it(testScenario.testSuiteProductGroupCrud.itPostSkuProductGroup, function(done) {
  //     productGroupList.addSkuProductGroup(productGroupId, bodySkuProductGroup('9'), token, function(resp) {
  //         expect(resp.status).to.equal(200);
  //         expect(resp.body.id).to.equal(9);
  //         done();
  //     });
  // });

  // it(testScenario.testSuiteProductGroupCrud.itGetSkuGroupDetail, function(done) {
  //     productGroupList.getSkuDetails(productGroupId, token, function(resp) {
  //         expect(resp.status).to.equal(200);
  //         expect(resp.body.data.product_group_id).to.equal(productGroupId);
  //         done();
  //     });
  // });

  it(testScenario.testSuiteProductGroupCrud.itPostExistingProductGroup, (done) => {
    productGroupList.postProductGroup(bodyProductGroup(productGroupName2), token, (resp) => {
      expect(resp.status).to.equal(400);
      expect(resp.body.message).to.equal('Product Already Exist');
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itPostExcludeNonMandatoryProductGroup, (done) => {
    productGroupList.postProductGroup(bodyNonMandatoryProductGroup(productGroupName1), token, (resp) => {
      expect(resp.status).to.equal(200);
      productGroupId2 = resp.body.product_group_id;
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itPutExistingProductGroup, (done) => {
    productGroupList.putProductGroup(productGroupId, bodyUpdateProductGroup(productGroupName1), token, (resp) => {
      expect(resp.status).to.equal(400);
      expect(resp.body.message).to.equal('Another catalog with same name already exist!');
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itGetHistoryProductGroup, (done) => {
    productGroupList.getHistoryProductGroup(productGroupId, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });

  it(testScenario.testSuiteProductGroupCrud.itDeleteProductGroup, (done) => {
    productGroupList.delProductGroup(productGroupId, token, (resp) => {
      expect(resp.status).to.equal(204);
      done();
    });
  });
});
