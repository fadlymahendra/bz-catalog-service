module.exports = {
    up(query, DataTypes) {
        return query.createTable('attribute_set', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            category_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false
            },
            attribute_code_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
            },
            is_variant: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 1
            },
            created_by: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            is_deleted: {
                type: DataTypes.INTEGER(1).UNSIGNED,
                allowNull: true,
                defaultValue: 0
            }
        });
    },
    down(query, DataTypes) {
        return query.dropTable('attribute_set');
    }
};