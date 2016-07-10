var User = require('../models/user-model.js');

exports.list = function(callback, errback) {
    User.find(function(err, user) {
        if (err) {
            errback(err);
            return;
        }
        callback(user);
    });
};