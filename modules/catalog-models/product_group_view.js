'use strict';

module.exports = (DBContext, DataTypes) => {
    const ProductGroupView = DBContext.define('ProductGroupView', {
        c3: DataTypes.INTEGER,
        c2: DataTypes.INTEGER,
        c1: DataTypes.INTEGER,
        c0: DataTypes.INTEGER,
        total_sku: DataTypes.INTEGER,
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true
        },
        name: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        brand_id: DataTypes.INTEGER,
        uom_id: DataTypes.INTEGER,
        stocking_uom_id: DataTypes.INTEGER,
        quantity_stocking_uom: DataTypes.INTEGER,
        manufacturing_number: DataTypes.CHAR,
        manufacturing_number_type: DataTypes.STRING,
        package_weight: DataTypes.INTEGER,
        package_length: DataTypes.DECIMAL,
        package_width: DataTypes.DECIMAL,
        package_height: DataTypes.DECIMAL,
        package_content: DataTypes.TEXT,
        barcode: DataTypes.CHAR,
        description: DataTypes.TEXT,
        primary_image: DataTypes.STRING,
        variant_count: DataTypes.TINYINT,
        variant_matrix: DataTypes.CHAR,
        status: DataTypes.INTEGER,
        visibility: DataTypes.INTEGER,
        created_by: DataTypes.INTEGER
    },{
        tableName: 'product_group_view',
        freeTableName: true,
        underscored: true
    });

    return ProductGroupView;
}