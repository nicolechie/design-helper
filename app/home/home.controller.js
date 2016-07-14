var app = angular.module('dhApp.home', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'ngAnimate']);


app.controller('HomeCtrl', ['$scope', '$modal', '$http', 'UserInfo', function($scope, $modal, $http, UserInfo){
    
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
    
//   Log Out

 $scope.logOut = function() {
        $http.get('/logout')
        .then(function (response) {
            console.log('Success!');
            $scope.signedIn = false;
        }, function (response) {
            console.log("Error");
        });
     };
   
//   Log In

    $scope.userLogin = {};
    $scope.logIn = function() {
        $http.post('/login', $scope.userLogin)
        .then(function (response) {
            console.log(response);
            console.log('Success!');
            $scope.signedIn = true;
            $scope.user = response.data;
            UserInfo.setData(response.data);
        }, function (response) {
              console.log(response);
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
    };
});

app.factory('UserInfo', function () {
    var user = {};
    return {
        setData: function (data) {
            user = data;
        },
        getData: function () {
            return user;
        }
    }
});
