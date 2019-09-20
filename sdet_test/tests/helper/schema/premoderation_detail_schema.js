var typeLabel = function (labelType) {
    return {
        type: labelType
    }
}

var allof_string = {
    allOf : [
        {not : {type : 'null'}},
        {type : 'string'}
    ],
    minLength: 1
}

var oneof_string = {
    "oneOf": [
        { "type": "string" },
        { "type": "null" }
    ]
}
     
var allof_number = {
    allOf : [
        {not : {type : 'null'}},
        {type : 'number'}
    ],
    minLength: 1
}

var data = {
    type : 'object',
    required :['id', 'type', 'product_name', 'product_group_id' , 'category', 'brand', 'variant_detail', 'package_weight', 'package_length', 'package_width', 'package_height', 'package_content', 'uom', 'stocking_uom', 'quantity_stocking_uom', 'premoderation_status', 'total_history'],
    properties : {
        id : allof_string,
        type : allof_string,
        product_group_id : typeLabel('null'),
        product_name : allof_string,
        category : {
            type : 'object',
            required : ['c0', 'c1', 'c2', 'c3'],
            properties : {
                c0 : {
                    type : 'object',
                    required : ['id', 'name', 'level', 'unspc'],
                    properties : {
                        id : allof_number,
                        name : allof_string,
                        level : allof_string,
                        unspc : allof_number
                    },
                    additionalProperties: false 
                },
                c1 : {
                    type : 'object',
                    required : ['id', 'name', 'level', 'unspc'],
                    properties : {
                        id : allof_number,
                        name : allof_string,
                        level : allof_string,
                        unspc : allof_number
                    },
                    additionalProperties: false 
                },
                c2 : {
                    type : 'object',
                    required : ['id', 'name', 'level', 'unspc'],
                    properties : {
                        id : allof_number,
                        name : allof_string,
                        level : allof_string,
                        unspc : allof_number
                    },
                    additionalProperties: false 
                },
                c3 : {
                    type : 'object',
                    required : ['id', 'name', 'level', 'unspc'],
                    properties : {
                        id : allof_number,
                        name : allof_string,
                        level : allof_string,
                        unspc : allof_number
                    },
                    additionalProperties: false 
                },
            }
        },
        brand : {
            type : 'object',
            required : ['id', 'status'],
            properties : {
                id : allof_string,
                name: allof_string,
                status: allof_string,
                image: oneof_string
            },
            additionalProperties: false 
        },
        variant_matrix: typeLabel('array'),
        variant_detail : {
            type : 'array',
            required : ['index', 'variants', 'variant_value', 'sku_vendor', 'tier_min_qty_1', 'tier_min_qty_2', 'tier_min_qty_3', 'stock', 'primary_image', 'additional_image'],
            properties : {
                index : allof_string,
                variants : {
                    type : 'array'
                },
                variant_value : allof_string,
                sku_vendor : allof_string,
                tier_min_qty_1 : allof_string,
                tier_min_qty_2 : allof_string,
                tier_min_qty_3 : allof_string,
                stock : allof_number,
                primary_image : allof_string,
                additional_image : typeLabel('array'),
                warehouse_id : allof_number,
                location_label : allof_string,
                reference_link : typeLabel('array'),
                warranty_option : allof_string,
                warranty_period : allof_number,
                warranty_coverage : allof_number,
                is_indent : allof_number,
                is_contract: allof_number,
                indent_period : allof_string,
                indent_limit : allof_number,
                variant_status : allof_string
            },
            additionalProperties: false 
        },
        specifications : typeLabel('array'),
        package_weight : allof_string,
        package_length : allof_string,
        package_width : allof_string,
        package_height : allof_string,
        package_content : allof_string,
        uom : {
            type : 'object',
            required : ['id', 'name'],
            properties : {
                id : allof_number,
                name : allof_string
            },
            additionalProperties: false 
        },
        stocking_uom : {
            type : 'object',
            required : ['id', 'name'],
            properties : {
                id : allof_number,
                name : allof_string
            },
            additionalProperties: false 
        },
        quantity_stocking_uom : allof_number,
        description : allof_string,
        premoderation_status : allof_string,
        barcode : allof_string,
        manufacturing_number : allof_string,
        total_history : allof_number
    },
    additionalProperties: false 
}

var variants_jsonschema = {
    type : 'object',
    require : ['attribute_id', 'attribute_code', 'attribute_code_label', 'attribute_value_name', 'attribute_value_id', 'attribute_status'],
    properties : {
        attribute_id : allof_number,
        attribute_code : allof_string,
        attribute_code_label : allof_string,
        attribute_value_name : allof_string,
        attribute_value_id : allof_number,
        attribute_status : allof_string
    },
    additionalProperties: false 
}


module.exports = {
    data: data,
    variants_jsonschema: variants_jsonschema
}

