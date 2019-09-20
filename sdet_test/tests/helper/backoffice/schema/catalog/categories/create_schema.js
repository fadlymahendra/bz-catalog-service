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

var createCategories = {
    type : 'object',
    required :['message', 'ids'],
    properties : {
        message : allof_string,
        ids : {
            type : 'array',
            required :['id', 'name', 'level', 'unspsc', 'sequence', 'parent_id', 'is_active', 'created_at', 'updated_at'],
            properties : {
                id : allof_number,
                name : allof_string,
                level : allof_string,
                unspsc : allof_number,
                sequence : allof_number,
                parent_id : allof_string,
                is_active : allof_number,
                created_at : allof_string,
                updated_at : allof_string,
            },
        }
    },
    additionalProperties: false 
}

module.exports = {
    createCategories: createCategories,
}