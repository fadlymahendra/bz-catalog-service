const global = require('./../../../../helper/global.js');

var scenario = ({
    getOK: {
        descNoVariant: 'As a Ecart user, I want to see product detail for no variant product',
        desc1Variant: 'As a Ecart user, I want to see product detail for 1 variant product',
        desc2Variant: 'As a Ecart user, I want to see product detail for 2 variant product',
        response: global.response.ok
    },
    getWithoutAuth: {
        descWithoutAuth: 'As a Ecart user, I can NOT see product detail without login',
        response: global.response.unauthorized

    },
    getInvalidAuth: {
        descOtherSession: 'As a Ecart user, I can NOT see product detail with Front Office user session',
        response: global.response.invalidAuth
    }
});

module.exports = {
    scenario:scenario
}