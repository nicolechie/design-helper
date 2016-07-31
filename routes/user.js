var User = require('../models/user-model.js');
var users = require('../services/user.js');

module.exports = function(app, passport) {
    var bodyParser = require('body-parser');
    var jsonParser = bodyParser.json();
    var bcrypt = require('bcrypt');
    
    var LocalStrategy = require('passport-local').Strategy;
    var BasicStrategy = require('passport-http').BasicStrategy;

    passport.serializeUser(function(user, done) { done(null, user.id); });
    passport.deserializeUser(function(id, done) { 
        User.findById(id, function(err, user) { 
            done(err, user); 
            
        });
    });

    passport.use('local', new LocalStrategy(
      function(username, password, callback) {
          
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                callback(err);
                return;
            }
    
            if (!user) {
                return callback(null, false, {
                    message: 'Incorrect username.'
                });
            }
            user.validatePassword(password, function(err, isValid) {
                if (err) {
            
                    return callback(err);
                }
    
                if (!isValid) {
                    return callback(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return callback(null, user);
        });
      }
    );
    }));

    app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
        res.json({
            message: 'Luke... I am your father'
        });
    });
    
    app.post('/login',
      passport.authenticate('local'),
      function(req, res) {
          console.log('user loggedIn');
          res.json(req.user);
      });
    
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    app.get('/users', function(req, res) {
        users.list(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).json(err);
        });
    });
        
    app.post('/users', jsonParser, function(req, res) {
        if (!req.body) {
            return res.status(400).json({
                message: "No request body"
            });
        }
        
    // FIRST NAME
    
         if (!('firstName' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: first name'
            });
        }
    
        var firstName = req.body.firstName;
    
        if (typeof firstName !== 'string') {
            return res.status(422).json({
                message: 'Incorrect field type: first name'
            });
        }
    
        firstName = firstName.trim();
    
        if (firstName === '') {
            return res.status(422).json({
                message: 'Incorrect field length: first name'
            }); 
        }
    
    // LAST NAME
        
         if (!('lastName' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: last name'
            });
        }
    
        var lastName = req.body.lastName;
    
        if (typeof lastName !== 'string') {
            return res.status(422).json({
                message: 'Incorrect field type: last name'
            });
        }
    
        lastName = lastName.trim();
    
        if (lastName === '') {
            return res.status(422).json({
                message: 'Incorrect field length: last name'
            });
        }
    
    // USERNAME
    
        if (!('username' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: username'
            });
        }
    
        var username = req.body.username;
    
        if (typeof username !== 'string') {
            return res.status(422).json({
                message: 'Incorrect field type: username'
            });
        }
    
        username = username.trim();
    
        if (username === '') {
            return res.status(422).json({
                message: 'Incorrect field length: username'
            });
        }
        
    // EMAIL
        
         if (!('email' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: email'
            });
        }
    
        var email = req.body.email;
    
        if (typeof email !== 'string') {
            return res.status(422).json({
                message: 'Incorrect field type: email'
            });
        }
    
        email = email.trim();
    
        if (email === '') {
            return res.status(422).json({
                message: 'Incorrect field length: email'
            });
        }
    
    // PASSWORD
    
        if (!('password' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: password'
            });
        }
    
        var password = req.body.password;
    
        if (typeof password !== 'string') {
            return res.status(422).json({
                message: 'Incorrect field type: password'
            });
        }
    
        password = password.trim();
    
        if (password === '') {
            return res.status(422).json({
                message: 'Incorrect field length: password'
            });
        }
    
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
    
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
    
                var user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: hash
                });
                console.log(req.body, user);
    
                user.save(function(err) {
                    
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    return res.status(201).json({});
                });
            });
        });
    });

};