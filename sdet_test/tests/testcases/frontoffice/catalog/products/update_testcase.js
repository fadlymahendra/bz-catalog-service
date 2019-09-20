const global = require('./../../../../helper/global.js');

const scenario = ({
  getOK: {
    desc: 'Update premoderation details',
    activeDecimal: 'As a Vendor, I want activate flag decimal',
    nonactiveDecimal: 'As a Vendor, I want deactivate flag decimal',
    activateIndent: 'As a Vendor, I want to update product with active indent product',
    activeDP: 'As a Vendor, I want to update product with active indent product and active Down Payment',
    nonActiveIndent: 'As a Vendor, I want to update product with non-active indent product',
    nonactivateIndent: 'As a Vendor, I want to update product with deactivate indent product',
    nonactiveDP: 'As a Vendor, I want to update product with deactivate indent product and active Down Payment',
    nonactiveDPAndActiveIndent: 'As a Vendor, I want to Deactivate Down Payment with Activate Indent Product',
    nonactiveIndentAndNonactiveDP: 'As a Vendor, I want to Deactivate Down Payment and Deactivate Indent Product',
    response: global.response.ok,
  },
  getWithoutAuth: {
    desc: 'As a Vendor, I can NOT see premoderation list without login',
    response: global.response.withoutAuth,
  },
  getInvalidAuth: {
    desc: 'As a Vendor, I can NOT see premoderation list with other user session',
    response: global.response.invalidAuth,
  },
  getBadRequest: {
    nonactiveIndentAndActiveDP: 'As a Vendor, I cant update product with active Down Payment without activate indent product',
    response: global.response.badRequest,
  },
});

module.exports = {
  scenario,
};
