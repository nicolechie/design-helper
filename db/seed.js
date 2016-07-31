var User = require('../models/user-model.js');
// var Codefile = require('../models/codefile-model.js');

exports.run = function(callback, errback) {
    User.create({
        firstName: 'Bob',
        lastName: 'Ross',
        email: 'bob@email.com',
        username: 'testuser',
        password: 'test123'
    }, 
    function(err, users) {
        if (err) {
            // errback(err);
            return;
        }
        callback(users);
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