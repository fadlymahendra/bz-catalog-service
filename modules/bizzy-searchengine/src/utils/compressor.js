'use strict';

const Promise = require('bluebird');
const ZLib = Promise.promisifyAll(require('zlib'));

exports.compressObjectToString = function compressObjectToString(input) {
    return ZLib.gzipSync(JSON.stringify(input)).toString('base64');
};

module.exports = exports;

