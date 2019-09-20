/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const typeLabel = labelType => ({
  type: labelType,
});

const productEcart = {
  type: 'object',
  required: [],
  properties: {
    data: {
      type: 'object',
      required: ['id', 'sku', 'name', 'uom', 'stocking_uom', 'quantity_stocking_uom', 'package_weight', 'package_length', 'package_width', 'package_height', 'description', 'package_content', 'product_group'],
      properties: {
        id: {
          type: 'number',
        },
        sku: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        uom: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
          },
        },
        stocking_uom: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
          },
        },
        quantity_stocking_uom: {
          type: 'number',
        },
        barcode: {
          type: 'string',
        },
        manufacturing_number: {
          type: 'string',
        },
        package_weight: {
          type: 'number',
        },
        package_length: {
          type: 'number',
        },
        package_width: {
          type: 'number',
        },
        package_height: {
          type: 'number',
        },
        package_content: {
          type: 'string',
        },
        primary_image: {
          type: 'string',
        },
        additional_image: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        description: {
          type: 'string',
        },
        product_group: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
          },
        },
        product_vendors: {
          type: 'array',
          items: {
            type: 'object',
            required: [],
            properties: {
              id: {
                type: 'number',
              },
              vendor_id: {
                type: 'number',
              },
              vendor_name: {
                type: 'string',
              },
              warehouse_id: {
                type: 'number',
              },
              stock_available: {
                type: 'string',
              },
              currency: {
                type: 'string',
              },
              tier_min_qty_1: {
                type: 'number',
              },
              tier_min_qty_2: {
                type: 'number',
              },
              tier_min_qty_3: {
                type: 'number',
              },
              tier_cogs_price_1: {
                type: 'number',
              },
              tier_cogs_price_2: {
                type: 'number',
              },
              tier_cogs_price_3: {
                type: 'number',
              },
            },
          },
        },
        cheapest: {
          type: 'object',
          required: ['id', 'vendor_id', 'vendor_name', 'warehouse_id', 'stock_available', 'currency', 'tier_min_qty_1', 'tier_min_qty_2', 'tier_min_qty_3', 'tier_cogs_price_1', 'tier_cogs_price_2', 'tier_cogs_price_3'],
          properties: {
            id: {
              type: 'number',
            },
            vendor_id: {
              type: 'number',
            },
            vendor_name: {
              type: 'string',
            },
            warehouse_id: {
              type: 'number',
            },
            stock_available: {
              type: 'string',
            },
            currency: {
              type: 'string',
            },
            tier_min_qty_1: {
              type: 'number',
            },
            tier_min_qty_2: {
              type: 'number',
            },
            tier_min_qty_3: {
              type: 'number',
            },
            tier_cogs_price_1: {
              type: 'number',
            },
            tier_cogs_price_2: {
              type: 'number',
            },
            tier_cogs_price_3: {
              type: 'number',
            },
          },
        },
      },
    },
  },
};

module.exports = {
  productEcart,

};
