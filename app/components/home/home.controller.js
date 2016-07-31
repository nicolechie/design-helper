var app = angular.module('dhApp.home', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'ngAnimate', 'mgcrea.ngStrap.alert']);

app.controller('HomeCtrl', ['$scope', '$modal', '$http', 'UserInfo', '$alert','$location', function($scope, $modal, $http, UserInfo, $alert, $location){
    var self = this;
     
    self.loginError = false;
    self.signedUp = false;
    self.signedIn = false;
    self.user = {};
    self.takenEmail = false;
    self.takenUsername = false;
    
    // Sign Up
    
    // Brings up the signup modal
    self.showModal = function () {
        var signupModal = $modal({ scope: $scope, templateUrl: 'components/home/signup.html', contentTemplate: false, html: true, show: false });
        signupModal.$promise.then(signupModal.show);
    };
    
    self.createUser = function() {
        // Get request to /users compares entered username and email to existing users
        $http.get('/users')
        .then(function successCallback(response) {
            console.log(response);
            response.data.forEach(function(user) {
                if (user.username === self.user.username) {
                    // Displays alert if username is taken
                    self.takenUsername = true;
                    console.log("Username Taken");
                }
                else if (user.email === self.user.email) {
                    // Displays alert if email is taken
                    self.takenEmail = true;
                    console.log("There is already an account associated with this email");
                }
            });
        }, function errorCallback(response) {
            console.log("callback error", response);
            console.log("Error");
        });
        
        $http.post('/users', self.user)
        .then(function successCallback(response) {
            // If successful, display message and clear user fields
            self.signedUp = true;
            self.user = {};
        }, function errorCallback(response) {
            console.log(response);
            console.log("Error");
        });
    };
    
    // Log Out

    self.logOut = function() {
        $http.get('/logout')
        .then(function (response) {
            self.signedIn = false;
            $location.path('/');
        }, function (response) {
            console.log("Error");
        });
     };
   
    // Log In

    self.userLogin = {};
    self.logIn = function() {
        $http.post('/login', self.userLogin)
        .then(function (response) {
            self.loginError = false;
            self.signedIn = true;
            self.user = response.data;
            // Redirect to users home page
            $location.path('/' + response.data.username + '/home');
            UserInfo.setData(response.data);
            // Clear login fields
            self.userLogin = {};
        }, function (response) {
            // If error, display error message
            console.log(response);
            console.log("Error");
            self.loginError = true;
        });
    };

}]);

app.factory('UserInfo', function () {
    var user = {};
    return {
        setData: function (data) {
            user = data;
        },
        getData: function () {
            return user;
        }
    };
});