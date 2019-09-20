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

var searchByBreadcrumbs = {
    type : 'object',
    required :['data', 'meta'], 
    properties : {
        data : {
            type : 'array',
            required :['id', 'name', 'level', 'unspsc', 'parent_id'], 
            properties : {
                id : allof_number,
                name : allof_string,
                level : allof_string,
                base_margin : typeLabel('null'),
                commission : typeLabel('null'),
                unspsc : allof_number,
                sequence : allof_number,
                parent_id : allof_string,
                breadcrumb : allof_string,
                is_active : allof_number,
                created_at : allof_string,
                updated_at : allof_string,
            },
        },
        meta : {
            type : 'object',
            required :['page', 'limit', 'total_data'], 
            properties : {
                page : allof_number,
                limit : allof_number,
                total_data : allof_number,
            },
            additionalProperties: false
        }
    },
    additionalProperties: false 
}

module.exports = {
    searchByBreadcrumbs: searchByBreadcrumbs,
}

 