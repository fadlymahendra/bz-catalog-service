const global = require('./../../../../helper/global.js');

const scenario = ({
  // 200
  getOK: {
    descPrice1: 'As a Vendor, I want to update PRICE tier 1',
    descPrice2: 'As a Vendor, I want to update PRICE tier 2',
    descPrice3: 'As a Vendor, I want to update PRICE tier 3',
    descTier1: 'As a vendor, I want to update tier QUANTITY 1',
    descTier2: 'As a vendor, I want to update tier QUANTITY 2',
    descTier3: 'As a vendor, I want to update tier QUANTITY 3',
    updateInto1Tier: 'As a Vendor, I want only have 1 TIER',
    updateInto2Tier: 'As a Vendor, I want only have 2 TIER',
    descPrice1Twice: 'As a Vendor, I want to update PRICE tier 1 twice',
    descPrice2Twice: 'As a Vendor, I want to update PRICE tier 2 twice',
    descPrice3Twice: 'As a Vendor, I want to update PRICE tier 3 twice',
    descTier1Twice: 'As a vendor, I want to update tier QUANTITY 1 twice',
    descTier2Twice: 'As a vendor, I want to update tier QUANTITY 2 twice',
    descTier3Twice: 'As a vendor, I want to update tier QUANTITY 3 twice',
    // intTier1:'Update Tier QUANTITY 1 with Integer value',
    // intTier2:'Update Tier QUANTITY 2 with Integer value',
    // intTier3:'Update Tier QUANTITY 3 with Integer value',
    response: global.response.ok,
  },
  // 401
  getWithoutAuth: {
    desc: 'As a Vendor, I can NOT see indent period list without login',
    response: global.response.withoutAuth,

  },
  // 403
  getInvalidAuth: {
    desc: 'As a Vendor, I can NOT see indent period list with other user session',
    response: global.response.invalidAuth,
  },
  getForbidden: {
    desc: 'As a Vendor, I can NOT see other vendor data with owned SKU',
    descOther: 'As a Vendor, I can NOT see other vendor data',
    descOtherSession: 'As a Vendor, I can NOT see indent period list with other user session',
    response: global.response.forbidden,
    responseUnAuth: global.response.unauthorized,

  },
  // 400
  getNotFound: {
    descOther: 'As a Vendor, I can NOT see other vendor SKU',
    descInvalid: 'As a Vendor, I can NOT see unregistered SKU',
    response: global.response.notFound,
  },

  getBadRequest: {
    descTier2lessTier1: 'As a vendor, I want to update tier QUANTITY Tier 2 LESS than Tier 1',
    descTier3lessTier2: 'As a vendor, I want to update QUANTITY Tier 3 LESS than Tier 2',
    descTier2sameTier1: 'As a vendor, I want to update QUANTITY Tier 2 SAME with Tier 1',
    descTier3sameTier2: 'As a vendor, I want to update QUANTITY Tier 3 SAME with Tier 2',
    descPrice2morePrice1: 'As a vendor, I want to update PRICE Tier 2 MORE than Tier 1',
    descPrice3morePrice2: 'As a vendor, I want to update PRICE Tier 3 MORE than Tier 2',
    descPrice2samePrice1: 'As a vendor, I want to update PRICE Tier 2 SAME with Tier 1',
    descPrice3samePrice2: 'As a vendor, I want to update PRICE Tier 3 SAME with Tier 2',
    // intPrice1:'Update Tier PRICE 1 with Integer value',
    // intPrice2:'Update Tier PRICE 2 with Integer value',
    // intPrice3:'Update Tier PRICE 3 with Integer value',
    emptyTier1: 'Update Tier QUANTITY 1 with Empty value',
    emptyTier2: 'Update Tier QUANTITY 2 with Empty value',
    emptyTier3: 'Update Tier QUANTITY 3 with Empty value',
    emptyPrice1: 'Update Tier PRICE 1 with Empty value',
    emptyPrice2: 'Update Tier PRICE 2 with Empty value',
    emptyPrice3: 'Update Tier PRICE 3 with Empty value',
    stringTier1: 'Update Tier QUANTITY 1 with String value',
    stringTier2: 'Update Tier QUANTITY2 with String value',
    stringTier3: 'Update Tier QUANTITY3 with String value',
    stringPrice1: 'Update Price 1 with String value',
    stringPrice2: 'Update Price 2 with String value',
    stringPrice3: 'Update Price 3 with String value',
    tier1WithoutPrice1: 'Update Tier QUANTITY 1 without fill tier price 1',
    tier2WithoutPrice2: 'Update Tier QUANTITY 2 without fill tier price 2',
    tier3WithoutPrice3: 'Update Tier QUANTITY 3 without fill tier price 3',
    price1WithoutTier1: 'Update Tier PRICE 1 without fill tier quantity 1',
    price2WithoutTier2: 'Update Tier PRICE 2 without fill tier quantity 2',
    price3WithoutTier3: 'Update Tier PRICE 3 without fill tier quantity 3',
    response: global.response.badRequest,
  },
});

module.exports = {
  scenario,
};
