app.controller('UseCtrl', ['chosenFonts', '$scope', '$rootScope', function(chosenFonts, $scope, $rootScope){
	$scope.chosenHeader = chosenFonts.list()[0];
	$scope.chosenParagraph = chosenFonts.list()[1];
	// $scope.chosenHeaderCSS = chosenFonts.list()[0].font.forCSS;
	// $scope.chosenHeaderFamily = chosenFonts.list()[0].font.family;
	// $scope.chosenHeaderSize = chosenFonts.list()[0].size;
	// $scope.chosenParagraphCSS = chosenFonts.list()[1].font.forCSS;
	// $scope.chosenParagraphFamily = chosenFonts.list()[1].font.family;
	// $scope.chosenParagraphSize = chosenFonts.list()[1].size;
	$scope.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>"
	$scope.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>"
}]);