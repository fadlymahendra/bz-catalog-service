'use strict';

const { MongoContext, BizzyError } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
	const db = await MongoContext.getInstance();
	return db.collection('premoderation').insertOne(data);
}

module.exports = exports;