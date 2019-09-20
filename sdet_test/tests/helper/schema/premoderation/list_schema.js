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

var categories = {
    type : 'array',
    required :['id', 'name', 'level', 'base_margin', 'commission', 'unspsc', 'sequence', 'parent_id', 'is_active', 'created_at', 'updated_at'],
    properties : {
        id : allof_number,
        name : allof_string,
        level : allof_string,
        base_margin : typeLabel('null'),
        commission : typeLabel('null'),
        unspsc : allof_number,
        sequence : allof_number,
        parent_id : typeLabel('null'),
        is_active : allof_number,
        created_at : allof_string,
        updated_at : allof_string,
    },
    additionalProperties: false 
}

var employees = {
    type : 'array',
    required :['employee_id', 'employee_name', 'employee_email', 'role_id', 'role_name', 'team_id', 'team_name', 'employee_status'],
    properties : {
        employee_id : allof_number,
        employee_name : allof_string,
        employee_email : allof_string,
        role_id : allof_number,
        role_name : allof_string,
        team_id : allof_number,
        team_name : allof_string,
        employee_status : allof_number,
    },
    additionalProperties: false 
}

var premoderations = {
    type : 'object',
    required : ['data', 'meta'],
    properties : {
        data : {
            type : 'array',
            required :['id', 'product_group_id', 'name', 'curations', 'vendor_id', 'assign_to', 'status', 'total_history', 'created_at', 'updated_at'],
            properties : {
                id : allof_string,
                product_group_id : typeLabel('null'),
                name : allof_string,
                curations : typeLabel('array'),
                vendor_id : allof_number,
                assign_to : typeLabel('null'),
                status : allof_string,
                total_history : allof_number,
                created_at : allof_string,
                updated_at : allof_string
            },
            additionalProperties: false
        },
        meta : {
            type : 'object',
            required : ['page', 'limit', 'total_data', 'total_page', 'total_need_revision', 'total_revision_complete', 'total_rejected', 'total_revision_inprogress'],
            properties : {
                page : allof_number,
                limit : allof_number,
                total_data : allof_number,
                total_page : allof_number,
                total_need_revision : allof_number,
                total_revision_complete : allof_number,
                total_rejected : allof_number,
                total_revision_inprogress : allof_number
            }
        }
    },
    additionalProperties: false
    
}

var vendors = {
    type : 'array',
    required :['id', 'prefix', 'name', 'suffix', 'npwp', 'status_pkp', 'place', 'street', 'phone', 'status', 'trademark', 'created_at', 'logo', 'geograph'],
    properties : {
        id : allof_number,
        prefix : allof_string,
        name : allof_string,
        suffix : typeLabel('string'),
        npwp : allof_string,
        status_pkp : allof_number,
        place : allof_string,
        street : allof_string,
        phone : allof_string,
        status : allof_number,
        trademark : typeLabel('null'),
        created_at : allof_string,
        logo : allof_string,
        geograph : {
            type : 'object',
            required : ['id', 'province', 'province', 'city', 'district', 'village', 'zipcode', 'geotag', 'jnecitycode'],
            properties : {
                id : allof_number,
                province : allof_string,
                city : allof_string,
                district : allof_string,
                village : allof_string,
                zipcode : allof_string,
                geotag : allof_string,
                jnecitycode : allof_string
            }
        }
    },
    additionalProperties: false 
}



module.exports = {
    categories: categories,
    employees: employees,
    premoderations: premoderations,
    vendors : vendors
}

