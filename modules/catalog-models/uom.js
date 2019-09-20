'use strict';

module.exports = (DBContext, DataTypes) => {
    const Uom = DBContext.define('Uom', {
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
        tableName: 'uom',
        freezeTableName: true,
        underscored: true
    });

    Uom.associate = models => {
        Uom.hasMany(models.ProductGroup, {
            foreignKey: 'uom_id',
            sourceKey: 'id'
        });        
    }
    
    return Uom;
}