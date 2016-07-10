var User = require('../models/user-model.js');

exports.run = function(callback, errback) {
    User.create({
        username: 'testuser',
        password: 'test123'
    }, 
    function(err, user) {
        if (err) {
            errback(err);
            return;
        }
        callback(user);
    });
};

if (require.main === module) {
    require('./connect');
    exports.run(function() {
        var mongoose = require('mongoose');
        mongoose.disconnect();
    }, function(err) {
        console.error(err);
    });
}