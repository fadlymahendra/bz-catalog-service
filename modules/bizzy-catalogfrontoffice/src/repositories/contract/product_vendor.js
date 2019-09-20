'use strict';

const { DBContext } = require('bizzy-common');

exports.findProductByVendorAndCategory = async function findProductByVendorAndCategory(vendorId, categoryId) {
    const models = await DBContext.getInstance();
    const { Op } = DBContext.ORMProvider;
    return models.ProductVendor.findAll({
        include: [{
            model: models.ProductVariant,
            where: {
                is_active: 1
            },
            required: true,
            include: [{
                model: models.ProductGroup,
                required: true,
                where: {
                    category_id: {
                        [Op.in]: categoryId
                    },
                    visibility: 1,
                    status: 1
                }
            }]
        }],
        where: {
            vendor_id: vendorId,
            is_active: 1
        }
    });
};

module.exports = exports;
