const global = require('./../../../../helper/global.js');


var getStatus = {
    //happy case
    correctparam_datacontent: {
        description:'As a content team, I can change status category in correct param and correct data content',
        responseCode: global.response.ok
    },
   

    //negative case
    invalidid:{
        description:'get error when id invalid',
        responseCode: global.response.badRequest
    },
    negativeid: {
        description:'get error when id is negative',
        responseCode: global.response.notFound
    },
    blankid:{
        description:'get error when id blank',
        responseCode: global.response.badRequest
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
    getStatus: getStatus,
} 