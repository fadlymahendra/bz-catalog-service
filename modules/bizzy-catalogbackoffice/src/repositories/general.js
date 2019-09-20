'use strict';

const { DBContext } = require('bizzy-common');
const RepoAttributeCode = require('./attribute_code');
const RepoAttributeValue = require('./attribute_value');

const generateVariant = async function (attributeCode, attributeValue) {
    const variants = [];

    for (let i = 0; i < attributeCode.length; i++) {
        variants.push({
            label: attributeCode[i].label,
            value: attributeValue[i].value
        });
    }
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
        const listAttributeCode = await RepoAttributeCode.findAll({
            code: { [Op.or]: attributeCode }
        });

        const listAttributeValue = await RepoAttributeValue.findAll({
            id: { [Op.or]: attributeValueId }
        });

        if (listAttributeCode && listAttributeValue) {
            variants = generateVariant(listAttributeCode, listAttributeValue);
        }
    }

    return variants;
};

module.exports = exports;
