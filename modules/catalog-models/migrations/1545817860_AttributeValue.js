module.exports = {
    up(query, DataTypes) {
        return query.createTable('attribute_value', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            attribute_code_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false
            },
            value: {
                type: DataTypes.STRING(250),
                allowNull: false
            },
            image_url: {
                type: DataTypes.STRING(500),
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
        return query.dropTable('attribute_value');
    }
};