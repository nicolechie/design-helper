var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();


  app.use(express.static(__dirname + '/app'));
  // app.use(express.bodyParser());
  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  // app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  // app.use(app.router);


require('./routes/user.js')(app, passport);
require('./routes/codefile.js')(app, passport);

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
   
//     socket.on('message', function(message) {
//         console.log('Received message:', message);
//         socket.broadcast.emit('message', this.name + ': ' + message);
//     });
    
    socket.on('disconnect', function (message) {
      io.emit('message', this.name + ' disconnected');
  });
});

mongoose.connect('mongodb://localhost/auth').then(function() {
    server.listen(8080 || process.env.PORT);
});