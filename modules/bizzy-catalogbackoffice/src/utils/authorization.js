'use strict';

exports.getUser = function (context) {
    return (context.user ? context.user : false);
};

exports.getUserId = function (context) {
    if (typeof context.user.employee.id !== 'undefined' && context.user.employee.id) {
        return context.user.employee.id;
    }
    return '';
};

exports.getUserEmail = function (context) {
    if (typeof context.user.username !== 'undefined' && context.user.username) {
        return context.user.username;
    }
    return '';
};

exports.getUserFullname = function (context) {
    if (typeof context.user.first_name !== 'undefined' && context.user.first_name) {
        return context.user.first_name + (context.user.last_name ? `${context.user.last_name}` : '');
    }
    return '';
};

exports.getUserRole = function (context) {
    return {};
};

module.exports = exports;
