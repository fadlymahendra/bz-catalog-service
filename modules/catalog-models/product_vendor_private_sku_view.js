'use strict';

module.exports = (DBContext, DataTypes) => {
    const ProductGroupView = DBContext.define('ProductVendorPrivateSkuView', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true
        },
        customers: DataTypes.STRING,
    },{
        tableName: 'product_vendor_private_sku_view',
        freeTableName: true,
        underscored: true
    });

    return ProductGroupView;
}