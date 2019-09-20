module.exports = {
    up(query, DataTypes) {
        return query.createTable('uom', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(250),
                allowNull: false,
                unique: true
            }      
        });
    },
    down(query, DataTypes) {
        return query.dropTable('uom');
    }
};