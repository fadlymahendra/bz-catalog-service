'use strict';

module.exports = (DBContext, DataTypes) => {
    const AttributeSet = DBContext.define('AttributeSet', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        attribute_code_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        is_variant: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        created_by: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    },{
        tableName: 'attribute_set',
        freezeTableName: true,
        underscored: true
    });

    AttributeSet.associate = models => {
        AttributeSet.belongsTo(models.Category, {            
            foreignKey: 'category_id'
        });

        AttributeSet.belongsTo(models.AttributeCode, {
            foreignKey: 'attribute_code_id'
        });
    }

    return AttributeSet;
}