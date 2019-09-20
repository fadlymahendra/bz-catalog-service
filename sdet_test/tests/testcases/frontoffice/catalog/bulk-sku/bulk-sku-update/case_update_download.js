const global = require('./../../../../../helper/global.js');

let getDownloadUpdate = {

  checkResult: {
    description: 'Template should be downloaded',
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

  invalid_vendorID: {
    description: 'get error when invalid vendor ID',
    responseCode: global.response.forbidden,
  },
};

module.exports = {
  getDownloadUpdate
};
