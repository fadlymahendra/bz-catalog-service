const global = require('./../../../helper/global.js');

var scenario = ({
    getOK: {
        description: 'As a Vendor, I want to see warranty period list',
        response: global.response.ok
    },
    getWithoutAuth: {
        description: 'As a Vendor, I can NOT see warranty period list without login',
        response: global.response.unauthorized

    },
    getInvalidAuth: {
        description: 'As a Vendor, I can NOT see warranty period list with other user session',
        response: global.response.invalidAuth
    }
});

module.exports = {
    scenario:scenario
}