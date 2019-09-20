'use strict';

const Promise = require('bluebird');
const { DBContext, RedisContext, MongoContext, BizzyError , BizzyService } = require('bizzy-common');
const Handler = require('./handler');
const DotEnv = require('dotenv');
const fs = require('fs');
const path = require('path');

Handler.configure({
    context: exports
});

DBContext.configure({
    path: 'catalog-models',
    connection_string_key: 'DB_CONNECTION_STRING'
});

MongoContext.configure({
    connection_string_key: 'MONGO_CONNECTION_STRING'
})

RedisContext.configure({
    connection_string_key: 'REDIS_CONNECTION'
});

// check if the specified param is exist in local param
const loadedEnv = DotEnv.parse(fs.readFileSync(path.join('environments', 'local.env')));
for (const key in loadedEnv) {
    process.env[key] = loadedEnv[key];
}
process.env.NODE_ENV = 'local';

console.log(process.env.MONGO_CONNECTION_STRING);

if (
    process.env.DB_CONNECTION_STRING !== undefined &&
    process.env.DB_CONNECTION_STRING !== ''
) {
    Handler.registerDBContext(DBContext);
}

if (
    process.env.MONGO_CONNECTION_STRING !== undefined &&
    process.env.MONGO_CONNECTION_STRING !== ''
) {
    Handler.registerMongoContext(MongoContext);
}

if (
    process.env.REDIS_CONNECTION !== undefined &&
    process.env.REDIS_CONNECTION !== ''
) {
    Handler.registerRedisContext(RedisContext);
}

Handler.registerHandler();

BizzyError.configure({
    handler: Handler,
});


BizzyService.configure({
    handler: Handler,
});

exports.Handler = Handler;
module.exports = exports;