'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
	const models = await DBContext.getInstance();
	return models.AttributeValue.findOne({
		where: wheres
    });
}

exports.findAll = async function (wheres = {}, offset, limit) {
	const models = await DBContext.getInstance();
	return models.AttributeValue.findAll({
		where: wheres,
        offset: offset,
        limit: limit
    });
}

exports.findById = async function (id) {
	const models = await DBContext.getInstance();
	return models.AttributeValue.findOne({
		where: {
			id: parseInt(id)
		}
    });
}

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
	const models = await DBContext.getInstance();
	return models.AttributeValue.findAndCountAll({
		where: wheres,
        offset: offset,
        limit: limit
    });
}

module.exports = exports;