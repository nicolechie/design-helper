var app = angular.module('dhApp.user', []);

app.controller('UserCtrl', ['chosenFonts', '$scope', 'CodeStorage', '$http', 'UserInfo', function(chosenFonts, $scope, CodeStorage, $http, UserInfo){
    var self = this;
    
    var user = UserInfo.getData();
    var codefiles = CodeStorage.getData();
    var savedProjects = [];
    console.log(codefiles);
    
    // Get this users saved codefiles and push them into saved projects
    var getSavedCode = function() {
        $http.get('/codefiles')
        .then(function successCallback(response) {
            console.log('success', response.data);
            response.data.forEach(function(codefile) {
                if (codefile.user === user.username) {
                    savedProjects.push(codefile);
                }
            });
            self.savedProjects = savedProjects;
            CodeStorage.setData(savedProjects);
        }, function errorCallback(response) {
            console.log("Error");
        });
    };

    getSavedCode();

}]);