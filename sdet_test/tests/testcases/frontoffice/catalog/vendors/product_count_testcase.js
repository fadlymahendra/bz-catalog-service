const global = require('./../../../../helper/global.js');

const scenario = ({
  getOK: {
    desc: 'As a Vendor, I want to see product count summary',
    response: global.response.ok,
  },
  // 401
  getWithoutAuth: {
    desc: 'As a Vendor, I can NOT see product count summary without login',
    response: global.response.unauthorized,

  },
  getForbidden: {
    desc: 'As a Vendor, I can NOT see other vendor data with owned SKU',
    descOther: 'As a Vendor, I can NOT see other vendor data',
    descOtherSession: 'As a Vendor, I can NOT see product count summary with other user session',
    response: global.response.forbidden,
    responseUnAuth: global.response.unauthorized,

  },
  // 400
  getNotFound: {
    descOther: 'As a Vendor, I can NOT see other vendor product count summary ',
    response: global.response.notFound,
  },
  // 403
  getInvalidAuth: {
    descOtherSession: 'As a Vendor, I can NOT see product count summary with other user session',
    descInvalidVendorID: 'As a Vendor, I can NOT see product count summary with other user session',
    descOtherVendorID: 'As a Vendor, I can NOT see product count summary with other user ID',
    descNotFoundVendor: 'As a Vendor, I can NOT see product count summary with not found user ID',
    descEmptyVendor: 'As a Vendor, I can NOT see product count summary with empty user ID',
    response: global.response.invalidAuth,
  },
});

module.exports = {
  scenario,
};
