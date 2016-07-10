var app = angular.module('dhApp.home', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'ngAnimate']);


app.controller('HomeCtrl', ['$scope', '$modal', '$http', function($scope, $modal, $http){
    
    // Sign Up
    var signupModal = $modal({ scope: $scope, templateUrl: "home/signup.html", contentTemplate: false, html: true, show: false });

    $scope.showModal = function () {
        signupModal.$promise.then(signupModal.show);
    };
    
    $scope.signedUp = false;
    $scope.user = {};
    $scope.createUser = function() {
        console.log($scope.user);
        $http.post('/users', $scope.user)
        .then(function successCallback(response) {
            console.log('Success!');
            $scope.signedUp = true;
        }, function errorCallback(response) {
            console.log("Error");
        });
    };
   
//   Sign In
    $scope.userLogin = {};
    $scope.logIn = function() {
        console.log($scope.userLogin.username);
        $http.get('/users')
        .then(function successCallback(response) {
            console.log(response.data);
            response.data.forEach(function(user) {
                if (user.username === $scope.userLogin.username) {
                    console.log("username match!", user);
                    if (user.password === $scope.userLogin.password) {
                        console.log ("sign in successful");
                        $scope.signedIn = true;
                        $scope.firstName = user.firstName;
                        $scope.username = user.username;
                    }
                    else {
                        console.log("incorrect password");
                    }
                }
            });
        }, function errorCallback(response) {
            console.log("Error");
        });
        
    };
}]);

app.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'home/opt-in.template.html',
        replace: true
    }
});

app.directive('navBar', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'home/navbar.html',
        replace: true
    }
});
