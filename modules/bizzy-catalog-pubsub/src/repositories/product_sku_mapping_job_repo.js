const { DBContext } = require('bizzy-common');
const { PRODUCT_SKU_MAPPING_JOB_STATUS: JOB_STATUS } = require('../utils/constanta');

exports.findAllGeneralCriteria = async (where) => {
    const db = await DBContext.getInstance();
    return db.ProductSkuMappingJob.findAll({
        where
    });
};

exports.findOneGeneralCriteria = async (where) => {
    const db = await DBContext.getInstance();
    return db.ProductSkuMappingJob.findOne({
        where
    });
};

exports.findPreviousCatalogInProgress = async (catalogId, timestamp) => {
    const db = await DBContext.getInstance();
    const { Op } = DBContext.ORMProvider;
    return db.ProductSkuMappingJob.findOne({
        where: {
            catalogId,
            timestamp: { [Op.lt]: timestamp },
            status: JOB_STATUS.PROCESSING
        }
    });
};

exports.findCurrentCatalogInProgress = async (catalogId, timestamp) => {
    const db = await DBContext.getInstance();
    return db.ProductSkuMappingJob.findOne({
        where: {
            catalogId,
            timestamp,
            status: JOB_STATUS.PROCESSING
        }
    });
};

exports.setPreviousCatalogDiscontinued = async (catalogId, timestamp) => {
    const db = await DBContext.getInstance();
    const { Op } = DBContext.ORMProvider;
    return db.ProductSkuMappingJob.update(
        {
            status: JOB_STATUS.DISCONTINUED
        },
        {
            where: {
                catalogId,
                timestamp: { [Op.lt]: timestamp },
                status: JOB_STATUS.PROCESSING
            }
        }
    );
};

exports.bulkCreate = async (data) => {
    const db = await DBContext.getInstance();
    return db.ProductSkuMappingJob.bulkCreate(data, { transaction: db.db_transaction });
};

exports.updateOne = async job => job.save();

module.exports = exports;
