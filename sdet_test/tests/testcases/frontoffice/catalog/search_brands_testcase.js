const global = require('./../../../helper/global.js');

var scenario = ({
    getOK: {
        desc: 'As a User, I want to see brand with specific period',
        descNotFound: 'As a User, I can not see result with not found keyword',
        response: global.response.ok,
    }
});



module.exports = {
    scenario:scenario
}