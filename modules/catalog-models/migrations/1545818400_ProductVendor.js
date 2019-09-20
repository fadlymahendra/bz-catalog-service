module.exports = {
    up(query, DataTypes) {
        return query.createTable('product_vendor', {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            product_variant_id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false
            },
            vendor_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false
            },
            warehouse_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false
            },
            location_label: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
            stock_available: {
                type: DataTypes.INTEGER(6).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            stock_used: {
                type: DataTypes.INTEGER(6).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            stock_reserved: {
                type: DataTypes.INTEGER(6).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            currency: {
                type: DataTypes.ENUM('IDR','USD'),
                allowNull: false,
                defaultValue: 'IDR'
            },
            tier_min_qty_1: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            tier_min_qty_2: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            tier_min_qty_3: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            },
            tier_cogs_price_1: {
                type: DataTypes.DECIMAL(13,2).UNSIGNED,
                allowNull: false,
                defaultValue: 0.00
            },
            tier_cogs_price_2: {
                type: DataTypes.DECIMAL(13,2).UNSIGNED,
                allowNull: true,
                defaultValue: 0.00
            },
            tier_cogs_price_3: {
                type: DataTypes.DECIMAL(13,2).UNSIGNED,
                allowNull: true,
                defaultValue: 0.00
            },
            warranty_option: {
                type: DataTypes.ENUM('no_warranty','official_warranty','distributor','international'),
                allowNull: true
            },
            warranty_period: {
                type: DataTypes.ENUM('week','month','year'),
                allowNull: true
            },
            warranty_limit: {
                type: DataTypes.INTEGER(4).UNSIGNED,
                allowNull: true
            },
            warranty_coverage: {
                type: DataTypes.CHAR(250),
                allowNull: true
            },
            indent_period: {
                type: DataTypes.ENUM('week','month','year'),
                allowNull: true
            },
            indent_limit: {
                type: DataTypes.INTEGER(4).UNSIGNED,
                allowNull: true
            },
            reference_link: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            sku_vendor: {
                type: DataTypes.CHAR(100),
                allowNull: true
            },
            is_indent: {
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
                allowNull: false
            },
            is_contract: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 0
            },
            customer_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true
            }
            
        });
    },
    down(query, DataTypes) {
        return query.dropTable('product_vendor');
    }
};