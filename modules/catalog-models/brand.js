'use strict';

module.exports = (DBContext, DataTypes) => {
    const Brand = DBContext.define('Brand', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: 1
        },
        is_bulked: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: true
        }
    }, {
        tableName: 'brand',
        freezeTableName: true,
        underscored: true
    });

    return Brand;
}