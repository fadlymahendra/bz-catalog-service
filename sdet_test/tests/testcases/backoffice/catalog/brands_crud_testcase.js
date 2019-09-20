const global = require('./../../../helper/global.js');

const scenario = ({
  getOK: {
    descCreate: 'As a User, I want to create new brand',
    descGetDetail: 'As a User, I want to see new brand detail',
    descGetRandomDetail: 'As a User, I want to see random brand detail',
    descGetAllBrand: 'As a User, I want to see all brand',
    descUpdate: 'As a User, I want to update new brand name',
    descReadUpdate: 'As a User, I want to see brand update result',
    descDelete: 'As a User, I want to delete brand',
    response: global.response.ok,
    responseCreate: global.response.created,
  },
  getWithoutAuth: {
    descWithoutAuthCreate: 'As a User, I can NOT create new brand without login',
    descWithoutAuthDetail: 'As a User, I can NOT see brand detail without login',
    descWithoutAuthRandomDetail: 'As a User, I can NOT see random brand detail without login',
    descWithoutAuthAll: 'As a User, I can NOT see all brand without login',
    descWithoutAuthUpdate: 'As a User, I can NOT update brand without login',
    descWithoutAuthDelete: 'As a User, I can NOT delete brand without login',
    response: global.response.unauthorized,

  },
  getInvalidAuth: {
    descOtherSessionCreate: 'As a User, I can NOT create new brand with incorrect session',
    descOtherSessionDetail: 'As a User, I can NOT see brand detail with incorrect session',
    descOtherSessionAll: 'As a User, I can NOT see all brand with incorrect session',
    descOtherSessionUpdate: 'As a User, I can NOT update brand with incorrect session',
    descOtherSessionDelete: 'As a User, I can NOT update brand with incorrect session',
    response: global.response.invalidAuth,
  },
  getBadRequest: {
    descCreateDuplicate: 'As a User, I can NOT create duplicate brand',
    response: global.response.badRequest,
  },
});


module.exports = {
  scenario,
};
