const global = require('./../../../../helper/global.js');


var getDelete = {
    //happy case
    correctdata: {
        description:'As a content team, I can delete category in level',
        responseCode: global.response.noContent
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
    getDelete: getDelete,
} 