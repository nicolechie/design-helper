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

exports.edit = function(codefile, callback, errback) {
    var query = {_id : codefile.id};
    Codefile.findOneAndUpdate(query, { chosenHeader : codefile.chosenHeader}, function(err, codefile) {
        if (err) {
            errback(err);
            return;
        }
        callback(codefile);
    });
};