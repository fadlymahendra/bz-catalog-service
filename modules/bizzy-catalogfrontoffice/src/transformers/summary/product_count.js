'use strict';

const getPremoderation = function (data) {
    const total = {
        need_revision: 0,
        revision_complete: 0,
        rejected: 0,
        revision_inprogress: 0
    };
    data.forEach((element) => {
        if (element.status[0] === 'revision_inprogress') {
            total.revision_inprogress = element.count;
        } else if (element.status[0] === 'need_revision') {
            total.need_revision = element.count;
        } else if (element.status[0] === 'rejected') {
            total.rejected = element.count;
        } else if (element.status[0] === 'revision_complete') {
            total.revision_complete = element.count;
        }
    });
    return total;
};

const sumPremoderation = function (data) {
    const result = data.need_revision + data.revision_inprogress + data.revision_complete;
    return result;
};

exports.item = function (data) {
    const countPremoderation = getPremoderation(data.count_premoderation);

    return {
        data: {
            products: data.count_vendor,
            premoderation_inprogress: sumPremoderation(countPremoderation),
            premoderation_rejected: countPremoderation.rejected ? countPremoderation.rejected : 0
        }
    };
};

module.exports = exports;
