var Codefile = require('../models/codefile-model.js');

exports.list = function(callback, errback) {
    Codefile.find(function(err, codefile) {
        if (err) {
            errback(err);
            return;
        }
        callback(codefile);
    });
};