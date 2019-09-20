module.exports = {
    up(query, DataTypes) {
        return query.createTable('attribute_code', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: DataTypes.CHAR(50),
                allowNull: false,
                unique: true
            },
            label: {
                type: DataTypes.CHAR(50),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM('dropdown','textinput','textarea','radiobutton','checkbox'),
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.INTEGER(1).UNSIGNED,
                allowNull: true,
                defaultValue: 0
            }
        });
    },
    down(query, DataTypes) {
        return query.dropTable('attribute_code');
    }
};