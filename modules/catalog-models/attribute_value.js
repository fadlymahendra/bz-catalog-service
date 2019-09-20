'use strict';

module.exports = (DBContext, DataTypes) => {
    const AttributeValue = DBContext.define('AttributeValue', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        attribute_code_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    },{
        tableName: 'attribute_value',
        freezeTableName: true,
        underscored: true
    });

    return AttributeValue;
}