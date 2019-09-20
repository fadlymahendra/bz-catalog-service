const schema = {
  "type": "object",
  "required": ['data', 'meta'],
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ['id', 'name', 'total_sku', 'category', 'values', 'created_by'],
        "properties": {
          "id": {
            "type": "number"
          },
          "name": {
            "type": "string"
          },
          "total_sku": {
            "type": "number"
          },
          "category": {
            "type": "string"
          },
          "values": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "created_by": {
            "type": ['null', 'number'],
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "required": ['page', 'limit', 'user_created', 'total_data', 'total_page'],
      "properties": {
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        },
        "user_created": {
          "type": "string"
        },
        "total_data": {
          "type": "number"
        },
        "total_page": {
          "type": "number"
        }
      }
    }
  }
}

module.exports = {
  schema
};
