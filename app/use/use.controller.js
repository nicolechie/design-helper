app.controller('UseCtrl', ['chosenFonts', '$scope', '$rootScope', 'CodeStorage', '$http', 'UserInfo', function(chosenFonts, $scope, $rootScope, CodeStorage, $http, UserInfo){
	var generatedCode = {};
	
	var user = UserInfo.getData();
	
	generatedCode.chosenHeader = chosenFonts.list()[0];
	generatedCode.chosenParagraph = chosenFonts.list()[1];
	generatedCode.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>";
	generatedCode.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>";
	generatedCode.username = user.username;
	
	
	$scope.generatedCode = generatedCode;
	
	 $scope.saveCode = function() {
	 	console.log("user", user);
	 	console.log('Success!', $scope.generatedCode);
        $http.post('/codefiles', $scope.generatedCode)
        .then(function successCallback(response) {
            CodeStorage.setData($scope.generatedCode);
        }, function errorCallback(response) {
            console.log("Error");
        });
    };
	
}]);

app.factory('CodeStorage', function () {
    var codefile = {};
    return {
        setData: function (data) {
            codefile = data;
        },
        getData: function () {
            return codefile;
        }
    };
});

// creat factory with object containing all the about information ie 
// codeFile.chosenHeader;
// codefile.username;

// When a user goes into design mode check for a saved codeFile. If codFile exists, load into view. 
// If not, load regular view.