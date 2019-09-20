'use strict';

module.exports = (DBContext, DataTypes) => {
    const ProductGroupAttribute = DBContext.define('ProductGroupAttribute', {
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
        attribute_code_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        attribute_value_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
        text_input: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        is_variant: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    },{
        tableName: 'product_group_attribute',
        freezeTableName: true,
        underscored: true
    });

    ProductGroupAttribute.associate = models => {       
        ProductGroupAttribute.belongsTo(models.AttributeCode, {
            foreignKey: 'attribute_code_id'
        });

        ProductGroupAttribute.belongsTo(models.AttributeValue, {
             foreignKey: 'attribute_value_id'
        });

        ProductGroupAttribute.belongsTo(models.ProductGroup, {
            foreignKey: 'product_group_id'
        });
    }

    return ProductGroupAttribute;
}