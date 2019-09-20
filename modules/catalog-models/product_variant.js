'use strict';

module.exports = (DBContext, DataTypes) => {
    const ProductVariant = DBContext.define('ProductVariant', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_group_id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false
        },
        sku: {
            type: DataTypes.CHAR(12),
            allowNull: false,
            unique: true
        },
        long_name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        variant_value: {
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: 'NO_VARIANT'
        },
        primary_image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        additional_image: {
            type: DataTypes.TEXT('medium'),
            allowNull: true
        },
        product_id_magento: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
        product_id_netsuite: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
        is_primary: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        is_discontinue: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        is_free: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        created_by: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
    }, {
        tableName: 'product_variant',
        freeTableName: true,
        underscored: true
    });

    ProductVariant.associate = models => {
        ProductVariant.belongsTo(models.ProductGroup, {
            foreignKey: 'product_group_id'
        });

        ProductVariant.hasMany(models.ProductVendor, {
            foreignKey: 'product_variant_id',
            sourceKey: 'id'
        });

    }
    
    return ProductVariant;
}