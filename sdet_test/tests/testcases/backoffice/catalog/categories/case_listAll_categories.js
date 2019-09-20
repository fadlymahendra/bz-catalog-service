const global = require('./../../../../helper/global.js');

const getList = {
  // happy case
  correctparam_datacontent_active: {
    description: 'As a content team, I can see all list of categories from C0-C3 in correct param and correct content in status ACTIVE',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_nonactive: {
    description: 'As a content team, I can see all list of categories from C0-C3 in correct param and correct content in status NON-ACTIVE',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_all: {
    description: 'As a content team, I can see all list of categories from C0-C3 in correct param and correct content in ALL status',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_c0: {
    description: 'As a content team, I can see all list of categories C0 in correct param and correct content',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_c1: {
    description: 'As a content team, I can see all list of categories C1 in correct param and correct content',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_c2: {
    description: 'As a content team, I can see all list of categories C2 in correct param and correct content',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_c3: {
    description: 'As a content team, I can see all list of categories C3 in correct param and correct content',
    responseCode: global.response.ok,
  },
  correctparam_datacontent_createdby: {
    description: 'As a content team, I can see all list of categories from C0-C3 in correct param and correct content by creator',
    responseCode: global.response.ok,
  },
  metadatacontentNosearch: {
    description: 'As a content team, I can see list categories in page 1 with limit 10',
    responseCode: global.response.ok,
  },
  metadatacontentSearchBypage: {
    description: 'As a content team, I can see list categories in page = 2',
    responseCode: global.response.ok,
  },
  checkpageSearchBylimitEven: {
    description: 'As a content team, I can see correct total_page & limit & page with added search param limit = 4',
    responseCode: global.response.ok,
  },
  checkpageSearchBylimitOdd: {
    description: 'As a content team, I can see correct total_page & limit & page with added search param limit = 5',
    responseCode: global.response.ok,
  },
  checkpage_search_bylimit_morethan_totaldata: {
    description: 'As a content team, I can see correct page = 1 with added search param limit > total_data',
    responseCode: global.response.ok,
  },
  searchby_idcategory: {
    description: 'As a content team, I can search by id category and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbycategoryname: {
    description: 'As a content team, I can search category name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategoryname_partial: {
    description: 'As a content team, I can search by category name partial and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchby_idcategory_withstatus: {
    description: 'As a content team, I can search by category id + status and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategoryname_withstatusActive: {
    description: 'As a content team, I can search by category name + status Active and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategoryname_withstatusNonActive: {
    description: 'As a content team, I can search by category name + status Non Active and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategorylevel_withstatus: {
    description: 'As a content team, I can search by category level + status and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategoryname_partial_withstatusActive: {
    description: 'As a content team, I can search by  category name partial + status Active and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchbyCategoryname_partial_withstatusNonActive: {
    description: 'As a content team, I can search by  category name partial + status Non Active and show all correct data search in list',
    responseCode: global.response.ok,
  },
  nosearch_withstatus: {
    description: 'As a Sales Admin, I can all data in one of kind status',
    responseCode: global.response.ok,
  },


  // negative case
  blanklevel: {
    description: 'get error when blank value in param level',
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
  getList,
};
