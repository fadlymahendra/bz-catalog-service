'use strict';

exports.item = function (data) {
    const result = {
        id: parseInt(data.id),
        vendor_id: parseInt(data.vendor_id),
        stock_available: parseInt(data.stock_available),
        stock_used: parseInt(data.stock_used),
        stock_reserved: parseInt(data.stock_reserved),
        currency: data.currency,
        tier_min_qty_1: parseInt(data.tier_min_qty_1),
        tier_min_qty_2: parseInt(data.tier_min_qty_2) || null,
        tier_min_qty_3: parseInt(data.tier_min_qty_3) || null,
        tier_cogs_price_1: parseInt(data.tier_cogs_price_1),
        tier_cogs_price_2: parseInt(data.tier_cogs_price_2) || null,
        tier_cogs_price_3: parseInt(data.tier_cogs_price_3) || null,
        indent_period: data.indent_period || null,
        indent_limit: data.indent_limit || null,
        sku_vendor: data.sku_vendor || null,
        is_indent: data.is_indent,
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.updated_at,
        product_variant: {
            id: data.ProductVariant.id,
            sku: data.ProductVariant.sku,
            long_name: data.ProductVariantlong_name,
            variant_value: data.ProductVariant.variant_value,
            is_primary: data.ProductVariant.is_primary,
            is_discontinue: data.ProductVariant.is_discontinue,
            is_active: data.ProductVariant.is_active,
            updated_at: data.ProductVariant.updated_at,
            created_at: data.ProductVariant.created_at,
            product_group: {
                id: data.ProductVariant.ProductGroup.id,
                name: data.ProductVariant.ProductGroup.name,
                variant_count: data.ProductVariant.ProductGroup.variant_count,
                variant_matrix: data.ProductVariant.ProductGroup.variant_matrix,
                status: data.ProductVariant.ProductGroup.status,
                visibility: data.ProductVariant.ProductGroup.visibility,
                created_at: data.ProductVariant.ProductGroup.created_at,
                updated_at: data.ProductVariant.ProductGroup.updated_at,
                category: {
                    id: data.ProductVariant.ProductGroup.Category.id,
                    name: data.ProductVariant.ProductGroup.Category.name,
                    level: data.ProductVariant.ProductGroup.Category.level,
                    base_margin: data.ProductVariant.ProductGroup.Category.base_margin,
                    unspsc: data.ProductVariant.ProductGroup.Category.unspsc,
                    sequence: data.ProductVariant.ProductGroup.Category.sequence,
                    parent_id: data.ProductVariant.ProductGroup.Category.parent_id,
                    is_active: data.ProductVariant.ProductGroup.Category.is_active,
                    is_deleted: data.ProductVariant.ProductGroup.Category.is_deleted,
                    created_at: data.ProductVariant.ProductGroup.Category.created_at,
                    updated_at: data.ProductVariant.ProductGroup.Category.updated_at
                }
            }
        }
    };
    return result;
};
