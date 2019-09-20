'use strict';

exports.configure = ({ handler }) => {
    const platformCommunicator = handler.getConfiguration().context.serviceCommunicator;
    exports.callSync = platformCommunicator.callSync;
    exports.callAsync = platformCommunicator.callAsync;
};

exports.SVC = {
    AUTHENTICATION: {
        name: 'bizzy-authentication',
        ACTION: {
            REQUEST_TOKEN: 'requestToken'
        }
    }
};

module.exports = exports;
