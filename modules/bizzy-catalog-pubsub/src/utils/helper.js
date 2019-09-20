'use strict';

const { BizzyService } = require('bizzy-common');
const moment = require('moment');

exports.publishEvent = (event, data, context) => BizzyService.publish(event, { data, context, published_at: moment().utc().format() });

module.exports = exports;
