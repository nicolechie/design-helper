var app = angular.module('dhApp.design');

app.controller('ChatCtrl', ['$scope', 'socket', 'UserInfo', function($scope, socket, UserInfo){
    $scope.messages = [];
    $scope.user = UserInfo.getData();
    
    socket.on('send:message', function (message) {
      $scope.messages.push(message);
    });
    
    $scope.sendMessage = function () {
      var message = {
        user: $scope.user.username,
        text: $scope.message
      };
      
      socket.emit('send:message', message);

      $scope.messages.push(message);

    $scope.message = '';
    };
    
}]);