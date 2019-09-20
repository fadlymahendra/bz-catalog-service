const global = require('./../../helper/global.js');

const scenario = {
  getOK: {
    description: 'As a Vendor, I want to see product details page',
    responseCode: global.response.ok,
  },
  getWithoutAuth: {
    description: 'As a Vendor, I can NOT see product details page without login',
    responseCode: global.response.unauthorized,

  },
  getInvalidAuth: {
    description: 'As a Vendor, I can NOT see product details page with other user session',
    descEmpty: 'As a Vendor, I can NOT see product details page with empty user session',
    respCodeInvld: global.response.invalidAuth,
    respCodeUnAuth: global.response.unauthorized,
  },
  getNotFound: {
    description: 'As a Vendor, I can NOT found RANDOM SKU',
    responseCode: global.response.notFound,
  },
};

module.exports = {
  scenario,
};
