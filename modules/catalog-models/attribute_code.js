'use strict';

module.exports = (DBContext, DataTypes) => {
    const AttributeCode = DBContext.define('AttributeCode', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.CHAR(50),
            allowNull: false,
            unique: true
        },
        label: {
            type: DataTypes.CHAR(50),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('dropdown','textinput','textarea','radiobutton','checkbox'),
            allowNull: false,
            defaultValue: ''
        },
        is_deleted: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    },{
        tableName: 'attribute_code',
        freezeTableName: true,
        underscored: true
    });

    AttributeCode.associate = models => {
        AttributeCode.hasMany(models.AttributeValue, {            
            foreignKey: 'attribute_code_id',
            sourceKey: 'id'
        });

        AttributeCode.hasMany(models.AttributeSet, {            
            foreignKey: 'attribute_code_id',
            sourceKey: 'id'
        });
    }

    return AttributeCode;
}