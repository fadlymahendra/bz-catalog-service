'use strict';

// Plugin
const { BizzyError, DBContext } = require('bizzy-common');
const _ = require('lodash');

// Tranformer
const Transformer = require('../../transformers/contract/download_template');

// Utils
const Generate = require('../../utils/contract/generate_template');
const Authorization = require('../../utils/authorization');
const Validator = require('../../utils/contract/download_contract_validator');
const UploadTemplate = require('../../utils/contract/upload_template');

// Repository
const ContractRepoCategory = require('../../repositories/contract/category');
const ContractRepoProduct = require('../../repositories/contract/product_vendor');

exports.downloadContractTemplate = async function (data, context) {
    if (!Authorization.validateUser(context)) {
        throw BizzyError.Forbidden('Not Authorized');
    }

    // - validate path
    const vendorId = await Validator.validate(_.get(data, 'path.vendor_id'), 'id')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    // - transform body to camel case
    const bodyTransformed = Transformer.transformPayload(data.body);

    // - validate body
    const body = await Validator.validate(bodyTransformed, 'downloadTemplate')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    const { customerId } = body;

    try {
        // - start transaction
        await DBContext.startTransaction();

        // Get category data
        const { type, id } = _.get(body, 'category', {});

        const {
            shippingPaymentTypeId,
            shippingOrigins,
            shippingDestinations,
            tierType,
            isVendor,
            startDate,
            endDate
        } = body;

        // Validation on shipping
        if (shippingPaymentTypeId === 1) {
            // FRANCO
            // Shipping origin validation
            const hubOrigins = _.get(shippingOrigins, 'shippingHubs', []);
            const geoOrigins = _.get(shippingOrigins, 'shippingGeographs', []);
            if (hubOrigins.length === 0 && geoOrigins.length === 0) {
                throw BizzyError.BadRequest('Anda mempunyai tipe pengiriman FRANCO sehingga anda harus memilih origins geograph ataupun hub');
            }

            // Shipping destination validation
            const hubDestination = _.get(shippingDestinations, 'shippingHubs', []);
            const geoDestination = _.get(shippingDestinations, 'shippingGeographs', []);
            if (hubDestination.length === 0 && geoDestination.length === 0) {
                throw BizzyError.BadRequest('Anda mempunyai tipe pengiriman FRANCO sehingga anda harus memilih destinations geograph ataupun hub');
            }
        } else {
            // LOCO
            // Shipping origin validation
            const hubOrigins = _.get(shippingOrigins, 'shippingHubs', []);
            const geoOrigins = _.get(shippingOrigins, 'shippingGeographs', []);
            if (hubOrigins.length > 0 || geoOrigins.length > 0) {
                throw BizzyError.BadRequest('Anda mempunyai tipe pengiriman LOCO sehingga anda tidak boleh memilih origins geograph ataupun hub');
            }

            // Shipping destination validation
            const hubDestination = _.get(shippingDestinations, 'shippingHubs', []);
            const geoDestination = _.get(shippingDestinations, 'shippingGeographs', []);
            if (hubDestination.length > 0 || geoDestination.length > 0) {
                throw BizzyError.BadRequest('Anda mempunyai tipe pengiriman LOCO sehingga anda tidak boleh memilih destinations geograph ataupun hub');
            }
        }

        let categoryId = [];

        if (type === 'C2') {
            // Get c2
            let c2 = await ContractRepoCategory.findC2(id);
            c2 = JSON.parse(JSON.stringify(c2));
            c2 = _.flatMap(c2, 'id');

            // Get c3 based on c2
            categoryId = await ContractRepoCategory.findC3ByC2(c2);
            categoryId = JSON.parse(JSON.stringify(categoryId));
            categoryId = _.flatMap(categoryId, 'id');
        } 
        if (type === 'C3') {
            // Get c3
            categoryId = await ContractRepoCategory.findC3(id);
            categoryId = JSON.parse(JSON.stringify(categoryId));
            categoryId = _.flatMap(categoryId, 'id');
        }

        // Get product by category id
        let product = await ContractRepoProduct.findProductByVendorAndCategory(vendorId, categoryId);
        product = JSON.parse(JSON.stringify(product));

        if (product.length === 0) {
            throw BizzyError.NotFound('Produk tidak ditemukan');
        }

        // Transform into template payload
        const templatePayload = Transformer.transformTemplatePayload(product, shippingPaymentTypeId, shippingDestinations, startDate, endDate);

        // TODO: Generate excel
        const { template } = await Generate.generateProductTemplate({
            templatePayload,
            shippingPaymentTypeId,
            shippingOrigins,
            tierType,
            isVendor,
            vendorId,
            customerId
        });

        // Generate file name
        const fileName = Transformer.generateFileName();

        // Upload to s3
        const upload = await UploadTemplate.upload({
            fileName,
            buffer: template
        });

        // - commit transaction
        await DBContext.commit();

        // - generate response message
        const response = {
            file_name: fileName,
            url: upload.Location
        };

        // - return some response
        return Transformer.response('success', response);
    } catch (error) {
        // - rollback transaction
        await DBContext.rollback();

        // - throw error message
        throw error;
    }
};

module.exports = exports;