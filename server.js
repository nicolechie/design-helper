var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/app'));

require('./routes/user.js')(app);
var passport = require('passport');

app.use(passport.initialize());

app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

app.get('/', passport.authenticate('basic', {session: false}), function(req, res) {
    console.log("hi");
    res.json(req.user);
    
});


mongoose.connect('mongodb://localhost/auth').then(function() {
    app.listen(8080 || process.env.PORT);
});