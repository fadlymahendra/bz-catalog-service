'use strict';

module.exports = (DBContext, DataTypes) => {
    const ProductGroup = DBContext.define('ProductGroup', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        uom_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        stocking_uom_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        quantity_stocking_uom: {
            type: DataTypes.INTEGER(4).UNSIGNED,
            allowNull: true
        },
        manufacturing_number: {
            type: DataTypes.CHAR(30),
            allowNull: true
        },
        manufacturing_number_type: {
            type: DataTypes.ENUM('upc','ean','isbn'),
            allowNull: true
        },
        package_weight: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        package_length: {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0.00
        },
        package_width: {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0.00
        },
        package_height: {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0.00
        },
        package_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        barcode: {
            type: DataTypes.CHAR(50),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        primary_image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        variant_count: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        },
        variant_matrix: {
            type: DataTypes.CHAR(250),
            allowNull: true
        },
        is_bulk: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        visibility: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        created_by: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }
    },{
        tableName: 'product_group',
        freeTableName: true,
        underscored: true
    });

    ProductGroup.associate = models => {
        ProductGroup.belongsTo(models.Brand, {            
            foreignKey: 'brand_id'
        });

        ProductGroup.belongsTo(models.Uom, {
            foreignKey: 'uom_id'
        });

        ProductGroup.belongsTo(models.Category, {            
            foreignKey: 'category_id'
        });

        ProductGroup.belongsTo(models.StockingUom, {
            foreignKey: 'stocking_uom_id'
        })

        ProductGroup.hasMany(models.ProductGroupAttribute, {
            foreignKey: 'product_group_id',
            sourceKey: 'id'
        });

        ProductGroup.hasMany(models.ProductVariant, {
            foreignKey: 'product_group_id',
            sourceKey: 'id'
        });
        
    }

    return ProductGroup;
}