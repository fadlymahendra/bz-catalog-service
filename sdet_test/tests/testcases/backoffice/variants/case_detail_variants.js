const global = require('./../../../../tests/helper/global.js');


var getDetail = {

    correctparam_datacontent: {
        description:'As a content team, I can see detail variant in correct param and correct data content',
        responseCode: global.response.ok
    },

    //negative case
    invalidid:{
        description:'get error when id invalid',
        responseCode: global.response.notFound
    },
    negativeid: {
        description:'get error when id is negative',
        responseCode: global.response.notFound
    },
    blankid:{
        description:'will see all variants data',
        responseCode: global.response.ok
    },
    invalidtoken: {
        description:'get error when token invalid',
        responseCode: global.response.forbidden
    },
    blanktoken: {
        description:'get error when token blank',
        responseCode: global.response.unauthorized
    },
}

module.exports = {
    getDetail: getDetail,
} 