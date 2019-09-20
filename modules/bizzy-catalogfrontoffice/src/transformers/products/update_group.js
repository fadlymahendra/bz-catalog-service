'use strict';

exports.payloadGroup = function (group, sku, uniqueId, person) {
    return {
        id: uniqueId,
        group_id: group,
        product_sku: sku,
        status: 'active',
        user: {
            id: person.user.customer.person_id,
            name: `${person.user.first_name} ${person.user.last_name}`,
            email: person.user.username
        },
        created_at: new Date(),
        updated_at: new Date()
    };
};

module.exports = exports;
