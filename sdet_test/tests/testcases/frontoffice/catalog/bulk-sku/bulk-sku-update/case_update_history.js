const global = require('./../../../../../helper/global.js');

const getHistoryUpdate = {

  checkResult: {
    description: 'As a content team, I can see list history update',
    responseCode: global.response.ok,
  },
  searchByFilename: {
    description: 'As a content team, I can search by file name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchByUploader: {
    description: 'As a content team, I can search by uploader and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchByDate: {
    description: 'As a content team, I can search by start date and end date and show all correct data search in list',
    responseCode: global.response.ok,
  },

  searchByFilenameAndDate: {
    description: 'As a content team, I can search by valid date and file name and show all correct data search in list',
    responseCode: global.response.ok,
  },
  searchByUploaderAndDate: {
    description: 'As a content team, I can search by valid date and file name and show all correct data search in list',
    responseCode: global.response.ok,
  },

  // negative case
  invalidtoken: {
    description: 'get error when token invalid',
    responseCode: global.response.forbidden,
  },

  blanktoken: {
    description: 'get error when token blank',
    responseCode: global.response.unauthorized,
  },

  invalidVendorId: {
    description: 'get error when invalid vendor ID',
    responseCode: global.response.forbidden,
  },

  searchByInvalidDate: {
    description: 'get error when input invalid date',
    responseCode: global.response.badRequest,
  },

  searchByInvalidStartDate: {
    description: 'get error when input invalid start date',
    responseCode: global.response.ok,
  },
};

module.exports = {
  getHistoryUpdate,
};
