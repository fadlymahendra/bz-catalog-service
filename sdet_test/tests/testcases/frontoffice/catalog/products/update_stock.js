const global = require('./../../../../helper/global.js');

const scenario = ({
  getOK: {
    descUpdate: 'As a vendor, I want to update stock product',
    response: global.response.ok,
  },
  // 400
  getNotFound: {
    descNegValue: 'As a Vendor, I can NOT Update stock of product with negative value',
    response: global.response.notFound,
  },
  // 401
  getWithoutAuth: {
    desc: 'As a Vendor, I can NOT Update stock of product without login',
    response: global.response.unauthorized,

  },
  // 403
  getInvalidAuth: {
    descOtherVendorID: 'As a Vendor, I can NOT update stock of product with invalid vendor ID',
    descInvalidAuth: 'As a vendor, I can NOT update stock of product with invalid Auth',
    response: global.response.invalidAuth,
  },
  // 403
  getForbidden: {
    descInvalidBoth: 'As, s vendor, I can NOT Update stock of product with invalid vendor ID and Product Group ID',
    response: global.response.forbidden,
  },
  // 404
  getBadRequest: {
    descInvalidSKU: 'As a vendor, I can NOT update stock of product with invalid SKU ID',
    response: global.response.badRequest,
  },
});

module.exports = {
  scenario,
};
