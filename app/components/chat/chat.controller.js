var app = angular.module('dhApp.design');

app.controller('ChatCtrl', ['$scope', 'socket', 'UserInfo', function($scope, socket, UserInfo){
    var self = this;
    
    self.messages = [];
    self.user = UserInfo.getData();
    
    socket.on('send:message', function (message) {
      self.messages.push(message);
    });
    
    self.sendMessage = function () {
      var message = {
        user: self.user.username,
        text: self.message
      };
      
      socket.emit('send:message', message);

      self.messages.push(message);

      self.message = '';
    };
    
}]);