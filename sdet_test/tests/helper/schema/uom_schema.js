var uomList = {
    "type": "array",
    "uniqueItems": true,
    "additionalItems": false,
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
                "type": "string"
            }
        }
    }
}

module.exports = {
    uomList: uomList
}