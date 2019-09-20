/* eslint-disable linebreak-style */

'use strict';

const { BizzyService, BizzyError } = require('bizzy-common');
const Authorization = require('../../utils/authorization');
const OrganizationRepo = require('../../repositories/organizations');
const Joi = require('joi');
const Helper = require('../../utils/helper');

const schemaQuery = Joi.object().keys({
    search: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1),
    sort: Joi.string().allow('')
});

const schema = Joi.object().keys({
    id: Joi.number().required().min(1),
    sku: Joi.string().required()
});

exports.getAllCustomers = async function (data, context) {
    if (!Authorization.validateUser(context)) {
        throw BizzyError.NotAuthorized('You have no authorization access');
    }

    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('Forbidden access');
    }

    const { query, path } = data;
    try {
        await Joi.validate(path, schema);
        await Joi.validate(query, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const offset = Helper.offsetPagination(query.page, query.limit);
    const limit = query.limit;
    const sort = query.sort;

    const customers = await OrganizationRepo.getOrganizations({ is_vendor: 0, $or: [{ name: new RegExp(query.search, 'i') }, { prefix: new RegExp(query.search, 'i') }] }, offset, limit, sort);
    const contracts = await Promise.all(customers.data.map(async (item) => {
        let contract = null;

        try {
            contract = await BizzyService.callSync('bizzy-contract', 'getAgreementCustomerVendorId', {
                data: {
                    path: {
                        customer_id: item.id,
                        vendor_id: context.user.customer.organization_id,
                        sku_number: data.path.sku,
                        brand_id: 0,
                        category_id: 0
                    }
                },
                context: { user: { customer: { organization_id: item.id } } }
            });
        } catch (err) {
            throw BizzyError.UnprocessableEntity(`Error while getting customer contract, ${err.message}`);
        }

        const result = {
            id: item.id,
            name: `${item.prefix}. ${item.name} ${item.suffix}`,
            address: `${item.place} ${item.street}`,
            phone: item.phone,
            pic: item.pic_name,
            mobile_phone: item.pic_mobile,
            email: item.pic_email,
            is_contract: !!contract && contract.data.priceRules.length > 0
        };
        return result;
    }), {
        concurrency: query.limit
    });

    return {
        data: contracts,
        meta: {
            page: query.page,
            limit: query.limit,
            total_data: customers.total,
            total_page: Math.ceil(customers.total / query.limit)
        }
    };
};
