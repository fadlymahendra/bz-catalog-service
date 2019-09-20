'use strict';

const _ = require('lodash');

class Result {
    constructor(message = '', data = {}, meta = {}) {
        this.message = message;
        this.data = data;
        this.meta = meta;
    }

    toJSON() {
        return _.chain(this).pickBy(_.identity).value();
    }
}

module.exports = Result;
