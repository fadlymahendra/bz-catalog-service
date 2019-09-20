const schema = {
  "type": "object",
  "required": ['id','name','description','category','values'],
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "category": {
      "type": "object",
      "required": ['category0_id','category0_name','category0_unspsc','category1_id','category1_name','category1_unspsc','category2_id','category2_name','category2_unspsc','category3_id','category3_name','category3_unspsc'],
      "properties": {
        "category0_id": {
          "type": "number"
        },
        "category0_name": {
          "type": "string"
        },
        "category0_unspsc": {
          "type": "number"
        },
        "category1_id": {
          "type": "number"
        },
        "category1_name": {
          "type": "string"
        },
        "category1_unspsc": {
          "type": "number"
        },
        "category2_id": {
          "type": "number"
        },
        "category2_name": {
          "type": "string"
        },
        "category2_unspsc": {
          "type": "number"
        },
        "category3_id": {
          "type": "number"
        },
        "category3_name": {
          "type": "string"
        },
        "category3_unspsc": {
          "type": "number"
        }
      }
    },
    "values": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}

module.exports = {
  schema
};