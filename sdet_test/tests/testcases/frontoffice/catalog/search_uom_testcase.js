const global = require('./../../../helper/global.js');

var scenario = ({
    getOK: {
        description: 'As a Vendor, I want to see UOM list',
        response: global.response.ok
    },
    getWithoutAuth: {
        description: 'As a Vendor, I can NOT see UOM list without login',
        response: global.response.unauthorized

    },
    getInvalidAuth: {
        description: 'As a Vendor, I can NOT see UOM list with other user session',
        response: global.response.invalidAuth
    }
});

module.exports = {
    scenario:scenario
}