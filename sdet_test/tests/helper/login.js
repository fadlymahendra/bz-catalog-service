const env = require('dotenv').config();
const supertest = require('supertest');
var api = supertest(process.env.API_BASE_URL);

var login = function (loginData) {
    return api.post("/oauth/token")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(loginData)
}

module.exports = {
    login: login
}