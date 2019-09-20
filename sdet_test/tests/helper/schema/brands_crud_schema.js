var typeLabel = function (labelType) {
    return {
        type: labelType
    }
}


var brand = {
    type: 'object',
    required: ['id', 'name', 'created_at', 'updated_at'],
    properties: {
        id: typeLabel('integer'),
        name: typeLabel('string'),
        created_at: typeLabel('string'),
        updated_at: typeLabel('string')
    }
}

var brandWithImage = {
    type: 'object',
    required: ['id', 'name', 'image_url', 'created_at', 'updated_at'],
    properties: {
        id: typeLabel('integer'),
        name: typeLabel('string'),
        image_url: typeLabel(['string', 'null']),
        created_at: typeLabel('string'),
        updated_at: typeLabel('string')
    }
}

var brandArray  = {
    type: 'array',
    items:{
        type: 'object',
        required: ['id', 'name', 'image_url', 'created_at', 'updated_at'],
        properties: {
            id: typeLabel('integer'),
            name: typeLabel('string'),
            image_url: typeLabel(['string', 'null']),
            created_at: typeLabel('string'),
            updated_at: typeLabel('string')
        }
    },
    additionalItems: false,
}

var brandSearch = {
    "type": "array",
      "items": {
        "$id": "/properties/data/items",
        "type": "object",
        "required": ["id", "name"],
        "properties": {
          "id": {
            "$id": "/properties/data/items/properties/id",
            "type": "integer"
          },
          "name": {
            "$id": "/properties/data/items/properties/name",
            "type": "string",
            "minLength": 1
          }
        }
      }
    ,
    "meta": {
      "$id": "/properties/meta",
      "type": "object",
      "required": ["page", "limit", "total_data", "total_page"],
      "properties": {
        "page": {
          "$id": "/properties/meta/properties/page",
          "type": "integer"
        },
        "limit": {
          "$id": "/properties/meta/properties/limit",
          "type": "integer"
        },
        "total_data": {
          "$id": "/properties/meta/properties/total_data",
          "type": "integer"
        },
        "total_page": {
          "$id": "/properties/meta/properties/total_page",
          "type": "integer"
        }
      }
    }
}

module.exports = {
    brand: brand,
    brandWithImage: brandWithImage,
    brandArray: brandArray,
    brandSearch: brandSearch
}