var app = angular.module('dhApp.user', []);

app.controller('UserCtrl', ['chosenFonts', '$scope', 'CodeStorage', '$http', 'UserInfo', '$modal', function(chosenFonts, $scope, CodeStorage, $http, UserInfo, $modal){
    
    var user = UserInfo.getData();
    var codefiles = CodeStorage.getData();
    var savedProjects = [];
    console.log(codefiles);
    
    var getSavedCode = function() {
        $http.get('/codefiles')
        .then(function successCallback(response) {
            console.log('success', response.data);
            response.data.forEach(function(codefile) {
                if (codefile.user === user.username) {
                    savedProjects.push(codefile);
                    console.log("saved projects", savedProjects);
                    // $scope.projectlink = savedProjects.projectName;
                }
            });
            $scope.savedProjects = savedProjects;
            CodeStorage.setData(savedProjects);
        }, function errorCallback(response) {
            console.log("Error");
        });
    };
    
    getSavedCode();
    console.log("user saved projects", savedProjects);
}]);