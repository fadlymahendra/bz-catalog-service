'use strict';

exports.list = function (data) {
    return {
        id: data.id,
        name: data.name,
        primary_image: data.primary_image,
        manufacturing_number: data.manufacturing_number,
        uom: {
            id: data.Uom.id,
            name: data.Uom.name
        },
        stocking_uom: {
            id: data.StockingUom.id,
            name: data.StockingUom.name
        },
        quantity_stocking_uom: data.quantity_stocking_uom
    };
};

module.exports = exports;
