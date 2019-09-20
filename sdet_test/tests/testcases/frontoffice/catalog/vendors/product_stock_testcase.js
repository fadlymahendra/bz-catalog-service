const global = require('./../../../../helper/global.js');

const scenario = ({
  getOK: {
    descAsc: 'As a Vendor, I want to see product stock summary ASCENDING',
    descDesc: 'As a Vendor, I want to see product stock summary DESCENDING',
    descLimitEmpty: 'As a Vendor, I can see product stock summary with parameter limit is EMPTY',
    descSortEmpty: 'As a Vendor, I can see product stock summary with parameter sort is EMPTY',
    response: global.response.ok,
  },
  getWithoutAuth: {
    descWithoutAuth: 'As a Vendor, I can NOT see product stock summary without login',
    response: global.response.unauthorized,

  },
  getInvalidAuth: {
    descOtherSession: 'As a Vendor, I can NOT see product stock summary with other user session',
    descOtherVendorID: 'As a Vendor, I can NOT see product stock summary with other user ID',
    descNotFoundVendor: 'As a Vendor, I can NOT see product stock summary with not found user ID',
    descEmptyVendor: 'As a Vendor, I can NOT see product stock summary with empty user ID',
    response: global.response.invalidAuth,
  },
  getBadRequest: {
    descLimitString: 'As a Vendor, I can NOT see product stock summary with parameter limit is STRING',
    descSortInt: 'As a Vendor, I can NOT see product stock summary with parameter sort is INTEGER',
    response: global.response.badRequest,
  },
});

module.exports = {
  scenario,
};
