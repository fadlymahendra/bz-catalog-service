'use strict';

const _ = require('lodash');

exports.validateUser = function (context) {
    let access = false;

    if (_.get(context, 'user.customer', null)) {
        access = true;
    }

    if (_.get(context, 'user.employee', null)) {
        access = true;
    }

    return access;
};

exports.vendorAccess = function(data, context) {
	let access = false;
	if(context.user) {
		if (typeof context.user.customer.organization_id != "undefined" && context.user.customer.organization_id) {
			if (typeof data.path.id != "undefined" && data.path.id) {
				if (context.user.customer.organization_id == parseInt(data.path.id)) {
					access = true;
				}	
			}
		}
	}
	return access;
}

exports.getUser = function(context) {
	return (context.user ? context.user : false);
}

exports.getUserId = function(context) {
	if (typeof context.user.customer.person_id != "undefined" && context.user.customer.person_id) {
		return context.user.customer.person_id;
	}
	return '';
}

exports.getUserEmail = function(context) {
	if (typeof context.user.username != "undefined" && context.user.username) {
		return context.user.username;
	}
	return '';
}

exports.getUserFullname = function(context) {
	if (typeof context.user.first_name != "undefined" && context.user.first_name) {
		return context.user.first_name + 
			(context.user.last_name ? ' ' + context.user.last_name : '');
	}
	return '';
}

module.exports = exports;