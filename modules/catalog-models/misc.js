'use strict';

module.exports = (DBContext, DataTypes) => {
    const Misc = DBContext.define('Misc', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true
        },
        value: {
            type: DataTypes.CHAR(50),
            allowNull: false
        }
    },{
        tableName: 'misc',
        freezeTableName: true,
        underscored: true
    });

    return Misc;
}