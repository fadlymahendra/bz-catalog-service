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


var detail_history = {
    type : 'object',
    required : ['data', 'meta'],
    properties : {
                data : {
                    type : 'array',
                    required : ['id', 'title', 'category', 'user', 'created_at', 'updated_at'],
                    properties : {
                        id : allof_string,
                        title : allof_string,
                        category : {
                            type : 'object',
                            require : ['id', 'name', 'level'],
                            properties : {
                                id : allof_number,
                                name : allof_string,
                                level : allof_string
                            },
                            additionalProperties: false
                        },
                        user : {
                            type : 'object',
                            required : ['name', 'email', 'employee_id'],
                            properties : {
                                name : allof_string,
                                email : allof_string,
                                employee_id : allof_number,
                            },
                            additionalProperties: false
                        },
                        created_at : allof_string,
                        updated_at : allof_string
                    },
                },
                meta : {
                    type : 'object',
                    require : ['page', 'limit', 'total_data', 'total_page'],
                    properties : {
                        page : allof_number,
                        limit : allof_number,
                        total_data : allof_number,
                        total_page : allof_number
                    },
                    additionalProperties: false
                }
            },
            additionalProperties: false
    
}



module.exports = {
    detail_history: detail_history,
}

