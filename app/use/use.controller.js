app.controller('UseCtrl', ['chosenFonts', '$scope', '$rootScope', function(chosenFonts, $scope, $rootScope){
	$scope.chosenHeader = chosenFonts.list()[0];
	$scope.chosenParagraph = chosenFonts.list()[1];
	$scope.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>"
	$scope.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>"
}]);