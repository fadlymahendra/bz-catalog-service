'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
	const models = await DBContext.getInstance();
	return models.Misc.findOne({
		where: wheres
    });
}

exports.findAll = async function (wheres = {}, offset, limit) {
	const models = await DBContext.getInstance();
	return models.Misc.findAll({
		where: wheres,
        offset: offset,
        limit: limit
    });
}

exports.findById = async function (id) {
	const models = await DBContext.getInstance();
	return models.Misc.findOne({
		where: {
			id: parseInt(id)
		}
    });
}

exports.findByKey = async function (key) {
	const models = await DBContext.getInstance();
	return models.Misc.findOne({
		where: {
			key: key
		}
    });
}

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
	const models = await DBContext.getInstance();
	return models.Misc.findAndCountAll({
		where: wheres,
        offset: offset,
        limit: limit
    });
}

module.exports = exports;