module.exports = {
    up(query, DataTypes) {
        return query.createTable('product_variant', {
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
            sku: {
                type: DataTypes.CHAR(12),
                allowNull: false,
                unique: true
            },
            long_name: {
                type: DataTypes.STRING(250),
                allowNull: false
            },
            variant_value: {
                type: DataTypes.STRING(250),
                allowNull: true,
                defaultValue: 'NO_VARIANT'
            },
            primary_image: {
                type: DataTypes.STRING(500),
                allowNull: true
            },
            additional_image: {
                type: DataTypes.TEXT('medium'),
                allowNull: true
            },
            product_id_magento: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            product_id_netsuite: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            is_primary: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 0
            },
            is_discontinue: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 0
            },
            is_active: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 1
            },
            created_by: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            }  
        });
    },
    down(query, DataTypes) {
        return query.dropTable('product_variant');
    }
};