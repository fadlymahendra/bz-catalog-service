'use strict';

const { DBContext } = require('bizzy-common');
const Promise = require('bluebird');
const _ = require('lodash');
const AttributeCodeRepository = require('./attribute_code');
const AttributeValueRepository = require('./attribute_value');

const generateVariant = async function (attributeCode, attributeValue) {
    const variants = [];
    const temp = {};

    _.forEach(attributeValue, (value, key) => {
        temp[value.attribute_code_id] = value;
    });

    _.forEach(attributeCode, (value, key) => {
        variants.push({
            attribute_code: value.code,
            attribute_code_label: value.label,
            attribute_value_id: temp[value.id].id,
            attribute_value_name: temp[value.id].value
        });
    });

    return variants;
};

exports.findAttributeByVariantValue = async function (variantValue) {
    const Op = DBContext.ORMProvider.Op;

    let variants = [];
    const attributeCode = [];
    const attributeValueId = [];

    for (const prop in variantValue) {
        attributeCode.push(prop);
        attributeValueId.push(variantValue[prop]);
    }

    if (attributeCode.length > 0 && attributeValueId.length > 0) {
        const listAttributeCode = await AttributeCodeRepository.findAll({
            code: { [Op.in]: attributeCode }
        });

        const listAttributeValue = await AttributeValueRepository.findAll({
            id: { [Op.in]: attributeValueId }
        });

        if (listAttributeCode && listAttributeValue) {
            variants = generateVariant(listAttributeCode, listAttributeValue);
        }
    }

    return variants;
};

module.exports = exports;
