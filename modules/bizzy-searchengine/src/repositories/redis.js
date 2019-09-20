'use strict';

const { RedisContext } = require('bizzy-common');

exports.find = async function (key) {
    const redisClient = await RedisContext.getInstance();
    const multi = redisClient.multi();

    return multi.get(key).execAsync()
        .then(res => ({ total: res[0] }))
        .catch((err) => {
            throw new Error(err.message);
        });
};

exports.insert = async function (key, value) {
    const redisClient = await RedisContext.getInstance();
    const multi = redisClient.multi();

    return multi.set(key, JSON.stringify(value)).execAsync()
        .then(() => value)
        .catch((err) => {
            throw new Error(err.message);
        });
};

module.exports = exports;
