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
     
var allof_number = {
    allOf : [
        {not : {type : 'null'}},
        {type : 'number'}
    ],
    minLength: 1
}


var attribute_schema = {
    type : 'object',
    required : ['variants', 'specifications', 'variant_count', 'variant_matrix'],
    properties : {
        variants : {
            type : 'array',
            required : ['id', 'code', 'type', 'values'],
            properties : {
                id : allof_number,
                code : allof_string,
                label : allof_string,
                type :allof_string,
                values : {
                    type : 'array',
                    required : ['id', 'values'],
                    properties : {
                        id : allof_number,
                        value : allof_string
                    }
                }
            }
        },
        specifications : {
            type : 'array',
            required : ['id', 'code', 'type', 'values'],
            properties : {
                id : allof_number,
                code : allof_string,
                label : allof_string,
                type :allof_string,
                values : {
                    type : 'array',
                    properties : {
                        id : allof_number,
                        value : allof_string
                    }
                }
            }
        },
        variant_count : allof_number,
        variant_matrix : 'array'           
            
    },
    additionalProperties: false  
}



module.exports = {
    attribute_schema: attribute_schema,
}

