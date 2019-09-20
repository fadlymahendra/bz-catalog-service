module.exports = {
    up(query, DataTypes) {
        return query.createTable('category', {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(250),
                allowNull: false
            },
            level: {
                type: DataTypes.ENUM('C0','C1','C2','C3'),
                allowNull: false
            },
            base_margin: {
                type: DataTypes.DECIMAL(5,2).UNSIGNED,
                allowNull: true
            },
            commission: {
                type: DataTypes.DECIMAL(5,2).UNSIGNED,
                allowNull: true
            },
            unspsc: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            sequence: {
                type: DataTypes.INTEGER(4).UNSIGNED,
                allowNull: true
            },
            parent_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            breadcrumb: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
            is_active: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            created_by: {
                type: DataTypes.INTEGER(1),
                allowNull: true
            },
            is_deleted: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 0
            }
            
        });
    },
    down(query, DataTypes) {
        return query.dropTable('category');
    }
};