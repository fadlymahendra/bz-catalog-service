const global = require('./../../../../tests/helper/global.js');

let getList = {

  checkResult: {
    description: 'Variant list should be displayed',
    responseCode: global.response.ok,
  },
  metadatacontentNosearch: {
    description: 'As a content team, I can see list variants in page 1 with limit 5',
    responseCode: global.response.ok,
  },
  metadatacontentSearchBypage: {
    description: 'As a content team, I can see list variants in page = 2',
    responseCode: global.response.ok,
  },
  checkpageSearchBylimitEven: {
    description: 'As a content team, I can see correct total_page & limit & page with added search param limit = 4',
    responseCode: global.response.ok,
  },
  checkpageSearchBylimitOdd: {
    description: 'As a content team, I can see correct total_page & limit & page with added search param limit = 3',
    responseCode: global.response.ok,
  },
  checkvaluesSearchbyIdvariant: {
    description: 'As a content team, I can see correct Values with added search param Id = 1',
    responseCode: global.response.ok,
  },
  checktotalSkuSearchbyIdvariant: {
    description: 'As a content team, I can see correct Total SKU with added search param Id = 1',
    responseCode: global.response.ok,
  },
  searchbyIdvariant: {
    description: 'As a content team, I can search by id variant and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategory: {
    description: 'As a content team, I can search by category and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyvariantname: {
    description: 'As a content team, I can search variant name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCreatedBy: {
    description: 'As a content team, I can search created by and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyIdvariantAndVariantname: {
    description: 'As a content team, I can search by id variant + variant name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyVariantnameAndCategory: {
    description: 'As a content team, I can search by variant name + category and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCreatedByAndCategory: {
    description: 'As a content team, I can search by created by + category and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCreatedByAndVariantname: {
    description: 'As a content team, I can search by created by + variant name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCreatedByAndVariantnameAndCategory: {
    description: 'As a content team, I can search by created by + variant name + category and show all correct data search in list',
    responseCode: global.response.ok,
  },

  // negative case
  blankcategory: {
    description: 'get error when blank value in param category',
    responseCode: global.response.badRequest,
  },
  blankpage: {
    description: 'get error when blank page',
    responseCode: global.response.badRequest,
  },
  blanklimit: {
    description: 'get error when blank limit',
    responseCode: global.response.badRequest,
  },
  blankpageBlanklimit: {
    description: 'get error when blank page and blank limit',
    responseCode: global.response.badRequest,
  },
  invalidtoken: {
    description: 'get error when token invalid',
    responseCode: global.response.forbidden,
  },
  blanktoken: {
    description: 'get error when token blank',
    responseCode: global.response.unauthorized,
  },
};

module.exports = {
  getList
};
