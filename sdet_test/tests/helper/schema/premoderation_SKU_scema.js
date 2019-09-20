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


var payload = {
    type : 'object',
    required :['id', 'name', 'premoderation_status', 'type', 'vendor_id'],
    properties : {
        id : allof_string,
        name : allof_string,
        premoderation_status : allof_string,
        type : allof_string,
        vendor_id : allof_number,
    },
    additionalProperties: false 
}


module.exports = {
    payload: payload,
}

