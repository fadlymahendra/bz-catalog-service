
const productDetail = {
  type: 'object',
  required: [],
  properties: {
    data: {
      type: 'object',
      required: [],
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
          required: [],
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
          required: [],
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
          required: [],
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
          required: [],
          properties: {
            c0: {
              type: 'object',
              required: [],
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
              required: [],
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
              required: [],
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
              required: [],
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
          required: [],
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
              vendor_trademark: {
                type: 'string',
              },
              vendor_pkp: {
                type: 'number',
              },
              vendor_logo: {
                type: 'string',
              },
              warehouse_id: {
                type: 'number',
              },
              warehouse_name: {
                type: 'string',
              },
              warehouse_hub_id: {
                type: 'number',
              },
              warehouse_hub_shipper: {
                type: 'array',
                items: {
                  type: 'object',
                  required: [],
                  properties: {
                    id: {
                      type: 'number',
                    },
                    warehouse_hub_id: {
                      type: 'number',
                    },
                    shipping_id: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    code: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                },
              },
              warehouse_hub: {
                type: 'object',
                required: [],
                properties: {
                  id: {
                    type: 'number',
                  },
                  name: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                  phone: {
                    type: 'string',
                  },
                  geograph: {
                    type: 'object',
                    required: [],
                    properties: {
                      id: {
                        type: 'number',
                      },
                      province: {
                        type: 'string',
                      },
                      city: {
                        type: 'string',
                      },
                      district: {
                        type: 'string',
                      },
                      village: {
                        type: 'string',
                      },
                      zipcode: {
                        type: 'string',
                      },
                      geotag: {
                        type: 'string',
                      },
                      jnecitycode: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
              stock_available: {
                type: 'number',
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
              warehouse_geograph: {
                type: 'object',
                required: [],
                properties: {
                  id: {
                    type: 'number',
                  },
                  province: {
                    type: 'string',
                  },
                  city: {
                    type: 'string',
                  },
                  district: {
                    type: 'string',
                  },
                  village: {
                    type: 'string',
                  },
                  zipcode: {
                    type: 'string',
                  },
                  geotag: {
                    type: 'string',
                  },
                  jnecitycode: {
                    type: 'string',
                  },
                },
              },
              vendor_joined_at: {
                type: 'string',
              },
              is_contract: {
                type: 'string',
              },
              top_days: {
                type: 'string',
              },
              channel_type: {
                type: 'string',
              },
              cid: {
                type: 'string',
              },
              is_franco: {
                type: 'string',
              },
              shipping: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              sku_vendor: {
                type: 'string',
              },
            },
          },
        },
        material_code: {
          type: 'string',
        },
        material_group: {
          type: 'string',
        },
        is_mapping: {
          type: 'string',
        },
      },
    },
  },
};


module.exports = {
  productDetail,
};
