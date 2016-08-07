var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();

//Set default NODE_ENV and MONGO LINK 
if (!process.env.NODE_ENV) { 
    process.env.NODE_ENV = 'development';
    process.env.MONGODB_NW = 'mongodb://nicolechie:rukka2016@ds017584.mlab.com:17584/shopping-list';
}

app.use(express.static(__dirname + '/app'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./routes/user.js')(app, passport);
require('./routes/codefile.js')(app);

var socket_io = require('socket.io');
var http = require('http');

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('new user', function () {
      this.name = 'user' + io.engine.clientsCount;
      console.log(this.name);
      console.log(socket.name);
      io.emit('message', this.name + ' connected');
    });

    socket.on('send:message', function (message) {
       console.log(message);
    socket.broadcast.emit('send:message', message);
    });
    
    socket.on('disconnect', function (message) {
        io.emit('message', this.name + ' disconnected');
    });
});

mongoose.connect(process.env.MONGODB_NW).then(function(err) {
    if (err) {
        console.log("error", err);
    }
    server.listen(process.env.PORT || 8080);
    console.log("connected", process.env.PORT);
});

exports.app = app;