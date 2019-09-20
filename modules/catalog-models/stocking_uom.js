'use strict';

module.exports = (DBContext, DataTypes) => {
    const StockingUom = DBContext.define('StockingUom', {
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
        }
    }, {
            tableName: 'stocking_uom',
            freezeTableName: true,
            underscored: true
        }
    );

    return StockingUom;
}