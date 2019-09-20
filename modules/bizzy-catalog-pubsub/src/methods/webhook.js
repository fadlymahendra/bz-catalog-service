'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const skuMappingJob = require('../repositories/product_sku_mapping_job_repo');
const ZLib = require('zlib');
const skuMappingRepo = require('../repositories/product_sku_mapping_repo');
const catalogPubsubService = require('../repositories/catalog_pubsub_service_repo');
const generalConfig = require('../repositories/general_configuration_repo');
const { PRODUCT_SKU_MAPPING_JOB_TYPE: JOB_TYPE, PRODUCT_SKU_MAPPING_JOB_STATUS: JOB_STATUS } = require('../utils/constanta');

exports.upsertProductSkuMapping = async (data, context) => {
    const { id: catalogId } = data;

    // - get payload job to be process and the configuration
    const [job, configuration] = await Promise.join(
        skuMappingJob.findOneGeneralCriteria({ catalogId, status: JOB_STATUS.PROCESSING }),
        generalConfig.findOne()
    );

    if (!job) return 'success-done';

    try {
        //  - extract payload
        const { product_sku_mapping_job_concurrency: concurrency } = configuration;
        const { content: payload } = job;
        const uncompressedString = ZLib.gunzipSync(Buffer.from(payload, 'base64'));
        const {
            organization_id: organizationId,
            id,
            items,
            user
        } = JSON.parse(uncompressedString);

        // - process the job base on type, set current status job to be done and then get to the next job
        if (job.type === JOB_TYPE.ADD) {
            await Promise.map(items, sku => skuMappingRepo.syncProductSkuMapping(sku, id, organizationId, user), { concurrency });
        } else {
            await skuMappingRepo.deleteManyProductMapping(items, id, organizationId);
        }

        job.status = JOB_STATUS.DONE;
        await skuMappingJob.updateOne(job);
        await catalogPubsubService.upsertProductSkuMapping(catalogId);

        return 'success';
    } catch (err) {
        throw BizzyError.InternalServerError(err.message);
    }
};

module.exports = exports;
