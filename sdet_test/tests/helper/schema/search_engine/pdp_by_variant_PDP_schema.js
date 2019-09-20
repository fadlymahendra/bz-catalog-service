const schema = {
  type: 'object',
  required: [],
  properties: {
    data: {
      type: 'object',
      required: ['type', 'id', 'sku', 'name', 'brand', 'uom', 'stocking_uom', 'quantity_stocking_uom', 'categories', 'barcode', 'manufacturing_number', 'package_weight', 'package_length', 'package_width', 'package_height', 'package_content', 'primary_image', 'description', 'product_group', 'specifications', 'variants', 'variant_count', 'variant_matrix', 'variant_value'],
      properties: {
        type: {
          type: 'string',
        },
        id: {
          type: 'number',
        },
        sku: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        brand: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            url_key: {
              type: 'string',
            },
          },
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
        categories: {
          type: 'object',
          required: ['c0', 'c1', 'c2', 'c3'],
          properties: {
            c0: {
              type: 'object',
              required: ['id', 'name', 'url_key', 'unspsc'],
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
                url_key: {
                  type: 'string',
                },
                unspsc: {
                  type: 'number',
                },
              },
            },
            c1: {
              type: 'object',
              required: ['id', 'name', 'url_key', 'unspsc'],
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
                url_key: {
                  type: 'string',
                },
                unspsc: {
                  type: 'number',
                },
              },
            },
            c2: {
              type: 'object',
              required: ['id', 'name', 'url_key', 'unspsc'],
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
                url_key: {
                  type: 'string',
                },
                unspsc: {
                  type: 'number',
                },
              },
            },
            c3: {
              type: 'object',
              required: ['id', 'name', 'url_key', 'unspsc'],
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
                url_key: {
                  type: 'string',
                },
                unspsc: {
                  type: 'number',
                },
              },
            },
          },
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
        specifications: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        variants: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        variant_count: {
          type: 'string',
        },
        variant_matrix: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        variant_value: {
          type: 'string',
        },
      },
    },
  },
};

module.exports = {
  schema,
};
