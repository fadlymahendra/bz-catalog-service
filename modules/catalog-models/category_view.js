'use strict';

module.exports = (DBContext, DataTypes) => {
    const CategoryView = DBContext.define('CategoryView', {
        total_sku: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true
        },
        name: DataTypes.STRING,
        level: DataTypes.STRING,
        base_margin: DataTypes.DECIMAL,
        commission: DataTypes.DECIMAL,
        unspsc: DataTypes.INTEGER,
        sequence: DataTypes.INTEGER,
        parent_id: DataTypes.INTEGER,
        breadcrumb: DataTypes.STRING,
        is_active: DataTypes.INTEGER,
        created_by: DataTypes.INTEGER,
        is_deleted: DataTypes.INTEGER
    },{
        tableName: 'category_view',
        freezeTableName: true,
        underscored: true,
    });

    CategoryView.associate = models => {
        CategoryView.hasMany(models.CategoryView, {
            sourceKey: 'parent_id',
            foreignKey: 'id',
            as: 'childs'
        });

        CategoryView.belongsTo(models.CategoryView, {
            foreignKey: 'parent_id'
        });

        CategoryView.hasMany(models.ProductGroup, {
            foreignKey: 'category_id'
        });
    }

    return CategoryView;
}