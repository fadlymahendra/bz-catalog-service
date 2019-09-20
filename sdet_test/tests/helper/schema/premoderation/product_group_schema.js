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



var productGroup = {
    type : 'object',
    required : ['data', 'meta'],
    properties : {
        data : {
            type : 'array',
            required :['id', 'name', 'primary_image', 'total_sku', 'visibility', 'status', 'total_history', 'created_at', 'updated_at', 'created_by'],
            properties : {
                id : allof_number,
                name : allof_string,
                primary_image : allof_string,
                total_sku : allof_number,
                status : allof_number,
                visibility : allof_number,
                created_by : allof_number,
                created_at : allof_string,
                updated_at : allof_string,
                total_history : allof_number
            },
            additionalProperties: false
        },
        meta : {
            type : 'object',
            required : ['page', 'limit', 'total_data', 'total_page'],
            properties : {
                page : allof_number,
                limit : allof_number,
                total_data : allof_number,
                total_page : allof_number,
                total_active_data : allof_number,
                total_inactive_data : allof_number
            }
        }
    },
    additionalProperties: false
    
}



module.exports = {
    productGroup: productGroup,
}

