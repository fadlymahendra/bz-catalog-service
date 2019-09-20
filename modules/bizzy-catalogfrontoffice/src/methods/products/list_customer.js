/* eslint-disable linebreak-style */

'use strict';

const { BizzyService, BizzyError } = require('bizzy-common');
const Authorization = require('../../utils/authorization');
const ProductVendorRepo = require('../../repositories/product_vendor');
const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.number().min(1).required(),
    pid: Joi.number().min(1).required()
});

exports.getCustomerListByVendor = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    try {
        await Joi.validate(data.path, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    let customers = [];
    const product = await ProductVendorRepo.findOneWithPrivateSku({ id: data.path.pid });
    if (!product) throw BizzyError.NotFound('Product not found');
    if (product.customer_id) {
        const org = await BizzyService.callSync('bizzy-entity', 'organizationFindById', {
            data: {
                path: {
                    id: product.customer_id
                }
            }
        });
        const result = {
            id: org.data.id,
            name: `${org.data.prefix}. ${org.data.name} ${org.data.suffix}`,
            address: `${org.data.place} ${org.data.street}`,
            phone: org.data.phone,
            pic: org.data.pic_name,
            mobile_phone: org.data.pic_mobile,
            email: org.data.pic_email
        };
        customers.push(result);
    } else {
        customers = await Promise.all(product.PrivateSkus.map(async (item) => {
            const org = await BizzyService.callSync('bizzy-entity', 'organizationFindById', {
                data: {
                    path: {
                        id: item.customer_id
                    }
                }
            });
            const result = {
                id: org.data.id,
                name: `${org.data.prefix}. ${org.data.name} ${org.data.suffix}`,
                address: `${org.data.place} ${org.data.street}`,
                phone: org.data.phone,
                pic: org.data.pic_name,
                mobile_phone: org.data.pic_mobile,
                email: org.data.pic_email
            };
            return result;
        }), {
            concurrency: 20
        });
    }

    return { data: customers };
};
