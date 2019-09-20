module.exports = {
    up(query, DataTypes) {
        return query.createTable('product_group_attribute', {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            product_group_id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false
            },
            attribute_code_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false
            },
            attribute_value_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            text_input: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
            is_variant: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            }
            
        });
    },
    down(query, DataTypes) {
        return query.dropTable('product_group_attribute');
    }
};