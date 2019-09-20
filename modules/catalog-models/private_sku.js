'use strict';

module.exports = (DBContext, DataTypes) => {
    const PrivateSku = DBContext.define('PrivateSku', {
        id: {
            type: DataTypes.INTEGER(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_vendor_id: {
            type: DataTypes.INTEGER(20).UNSIGNED,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'private_sku',
        freezeTableName: true,
        underscored: true
    },{
        indexes: [
            {
                unique: true,
                fields: ['product_vendor_id', 'customer_id']
            }
        ]
    });

    PrivateSku.associate = models => {
        PrivateSku.belongsTo(models.ProductVendor, {
            foreignKey: 'product_vendor_id'
        });
    }

    return PrivateSku;
}