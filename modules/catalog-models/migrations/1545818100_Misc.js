module.exports = {
    up(query, DataTypes) {
        return query.createTable('misc', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            key: {
                type: DataTypes.STRING(250),
                allowNull: false,
                unique: true
            },
            value: {
                type: DataTypes.CHAR(50),
                allowNull: false
            }
            
        });
    },
    down(query, DataTypes) {
        return query.dropTable('misc');
    }
};