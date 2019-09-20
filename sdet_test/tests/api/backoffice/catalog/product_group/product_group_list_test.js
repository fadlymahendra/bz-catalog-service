/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */

const expect = require('chai').expect;
const moment = require('moment');
const common = require('./../../../../helper/common.js');
const productGroupList = require('./../../../../page-objects/api/backoffice/catalog/product_group/product_group');
const testData = require('./../../../../helper/product_group_data.json');

const testScenario = {
  testSuiteProductGroupList: {
    describe: 'Get List of Product Group',
    itGetProductGroupList: 'should get the list of product group',
    itGetProductGroupListSrch: 'should get the list of product group filter by name',
    itGetProductGroupListId: 'should get the list of product group filter by ID',
    itGetProductGroupListC0: 'should get the list of product group filter by C0',
    itGetProductGroupListC1: 'should get the list of product group filter by C1',
    itGetProductGroupListC2: 'should get the list of product group filter by C2',
    itGetProductGroupListC3: 'should get the list of product group filter by C3',
    itGetAllProductGroup: 'should get list of product group',
    itSearchByProductName: 'should search by product group name',
    itSortDesc: 'should check sort by descending',
    itSortAsc: 'should check sort by ascending',
  },
};

describe(`@desktop @all @regression @smoke @happy @backoffice @catalog ${testScenario.testSuiteProductGroupList.describe}`, () => {
  let token;
  let srch;
  let srchId;
  const productGroupName1 = 'RedMi A3';

  before((done) => {
    common.getAuthToken((resp) => {
      expect(resp.status).to.equal(200);
      token = resp.body.token;
      done();
    });
  });

  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupList}`, (done) => {
    productGroupList.getProductGroupList({}, token, (resp) => {
      expect(resp.status).to.equal(200);
      const dt = resp.body.data.length;
      if (dt !== 0) {
        srch = resp.body.data[0].name;
        srchId = resp.body.data[0].id;
      } else {
        srch = productGroupName1;
        srchId = '';
      }
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListSrch}`, (done) => {
    productGroupList.getProductGroupList({ search: srch }, token, (resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.data[0].name).to.contain(srch);
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListId}`, (done) => {
    productGroupList.getProductGroupList({ search: srchId }, token, (resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.data[0].name).to.contain(srch);
      expect(resp.body.data[0].id).to.equal(srchId);
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListC0}`, (done) => {
    productGroupList.getProductGroupList({ c0: '5' }, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListC1}`, (done) => {
    productGroupList.getProductGroupList({ c1: '210' }, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListC2}`, (done) => {
    productGroupList.getProductGroupList({ c2: '1301' }, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });
  it(`${testScenario.testSuiteProductGroupList.itGetProductGroupListC3}`, (done) => {
    productGroupList.getProductGroupList({ c3: '7019' }, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });
  it(testScenario.testSuiteProductGroupList.itGetAllProductGroup, (done) => {
    productGroupList.getProductGroupList({ sort: 'created_at_asc' }, token, (resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.meta.total_data).not.equal(0);
      done();
    });
  });

  it(testScenario.testSuiteProductGroupList.itSearchByProductName, (done) => {
    productGroupList.getProductGroupList(testData.queryProductGroup, token, (resp) => {
      expect(resp.status).to.equal(200);
      done();
    });
  });

  it(testScenario.testSuiteProductGroupList.itSortDesc, (done) => {
    productGroupList.getProductGroupList(testData.queryProductGroup, token, (resp) => {
      expect(resp.status).to.equal(200);
      const name = [];
      let i = 0;
      let totalFound = true;
      const { body: { data } } = resp;
      Object.keys(data).forEach((key) => {
        if (data.hasOwnProperty(key)) { // eslint-disable-line
          name[i] = data[key].created_at;
          i += 1;
        }
        for (let j = 0; j < name.length - 1; j += 1) {
          const beginningTime = moment(name[j]);
          const endTime = moment(name[j + 1]);
          // console.log(endTime.isBefore(beginningTime));
          if (beginningTime.isBefore(endTime)) totalFound = false;
        }
        if (totalFound) expect(resp.body.meta.total_data).not.equal(0);
        else expect(resp.body.meta.total_data).to.equal(0);
        done();
      });
    });
  });

  it(testScenario.testSuiteProductGroupList.itSortAsc, (done) => {
    productGroupList.getProductGroupList(testData.queryProductGroup, token, (resp) => {
      expect(resp.status).to.equal(200);
      const name = [];
      let i = 0;
      let totalFound = true;
      const { body: { data } } = resp;
      Object.keys(data).forEach((key) => {
        if (data.hasOwnProperty(key)) { // eslint-disable-line
          name[i] = data[key].created_at;
          i += 1;
        }
      });
      for (let j = 0; j < name.length - 1; j += 1) {
        const beginningTime = moment(name[j]);
        const endTime = moment(name[j + 1]);
        // console.log(beginningTime.isBefore(endTime));
        if (endTime.isBefore(beginningTime)) totalFound = false;
      }
      if (totalFound) expect(resp.body.meta.total_data).not.equal(0);
      else expect(resp.body.meta.total_data).to.equal(0);
      done();
    });
  });
});
