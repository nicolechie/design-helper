var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();

//Set default NODE_ENV and MONGO LINK 
if (!process.env.NODE_ENV) { 
    process.env.NODE_ENV = 'development';
    process.env.MONGODB_NW = 'mongodb://nicolechie:taioRu26@ds017584.mlab.com:17584/shopping-list';
}


  app.use(express.static(__dirname + '/app'));
  // app.use(express.bodyParser());
  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  // app.use(app.router);

// var flash = require('connect-flash');

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

mongoose.connect(process.env.MONGODB_NW).then(function(err) {
    if (err) {
        console.log("error", err);
    }
    server.listen(8080 || process.env.PORT);
    console.log("Connected");
});

// CONNECTION EVENTS
// When successfully connected
// mongoose.connection.on('connected', function () {  
//   console.log('Mongoose default connection open to ');
// }); 

// // If the connection throws an error
// mongoose.connection.on('error',function (err) {  
//   console.log('Mongoose default connection error: ' + err);
// }); 

// // When the connection is disconnected
// mongoose.connection.on('disconnected', function () {  
//   console.log('Mongoose default connection disconnected'); 
// });

// // If the Node process ends, close the Mongoose connection 
// process.on('SIGINT', function() {  
//   mongoose.connection.close(function () { 
//     console.log('Mongoose default connection disconnected through app termination'); 
//     process.exit(0); 
//   }); 
// });

exports.app = app;