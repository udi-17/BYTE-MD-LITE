// Override the original Hamza.js server
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
    // If loading Hamza.js, return our custom server instead
    if (id === './Hamza.js' || id.endsWith('/Hamza.js')) {
        return require('./custom-server.js');
    }
    return originalRequire.apply(this, arguments);
};

// Now require the main file which will use our custom server
require('./talkdrove.js');