var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

var bcrypt = require('bcrypt');

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

// UserSchema.path('email').validate(function(value, done) {
//     this.model('User').count({ email: value }, function(err, count) {
//         if (err) {
//             return done(err);
//         } 
//         // If `count` is greater than zero, "invalidate"
//         done(!count);
//     });
// }, 'Email already exists');

// Then it'll just get wrapped into ValidationError and will return as first argument when you call validate or save .

// UserSchema.methods.validateUsername = function(username, callback) {
//     var self = this;
//     mongoose.models["User"].findOne({username : self.username}, function(err, isValid) {
//          if (err) {
//             callback(err);
//             return;
//         }
//         callback(null, isValid);
//     });
// };

// UserSchema.pre("save",function(next, done) {
//     var self = this;
//     mongoose.models["User"].findOne({email : self.email}, function(err, results) {
//         if(err) {
//             done(err);
//         } else if(results) { //there was a result found, so the email address exists
//             self.invalidate("email","email must be unique");
//             done(new Error("email must be unique"));
//         } else {
//             done();
//         }
//     });
//     next();
// });

var User = mongoose.model('User', UserSchema);

module.exports = User;