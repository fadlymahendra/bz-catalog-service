module.exports = {
    up(query, DataTypes) {
        return query.createTable('category_view', {
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
            
        });
    },
    down(query, DataTypes) {
        return query.dropTable('category_view');
    }
};