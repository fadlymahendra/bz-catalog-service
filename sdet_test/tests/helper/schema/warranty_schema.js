var warrantyOption = {
    "type": "array",
    "uniqueItems": true,
    "additionalItems": false,
    "items": {
        "$id": "/properties/data/items",
        "type": "object",
        "required": ["value", "label"],
        "properties": {
            "value": {
                "$id": "/properties/data/items/properties/value",
                "type": "string"
            },
            "label": {
                "$id": "/properties/data/items/properties/label",
                "type": "string"
            }
        }
    }
}

var warrantyPeriod = {
    "type": "array",
    "uniqueItems": true,
    "additionalItems": false,
    "items": {
        "$id": "/properties/data/items",
        "type": "object",
        "required": ["value", "label"],
        "properties": {
            "value": {
                "$id": "/properties/data/items/properties/value",
                "type": "string"
            },
            "label": {
                "$id": "/properties/data/items/properties/label",
                "type": "string"
            }
        }
    }
}

module.exports = {
    warrantyOption: warrantyOption,
    warrantyPeriod: warrantyPeriod
}