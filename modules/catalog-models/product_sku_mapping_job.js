module.exports = function (sequelize, DataTypes) {
    const ProductSkuMappingJob = sequelize.define('ProductSkuMappingJob', {
        id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        catalogId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'catalog_id'
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        timestamp: {
            type: DataTypes.BIGINT(11),
            allowNull: true
        },
        chunk: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        batch: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
    }, {
            tableName: 'product_sku_mapping_job',
            timestamps: false
        });

    return ProductSkuMappingJob;
};
