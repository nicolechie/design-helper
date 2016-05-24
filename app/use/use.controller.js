app.controller('UseCtrl', ['getFonts', '$scope', '$rootScope', '$filter', function(getFonts, $scope, $rootScope, $filter){
	$scope.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>"
	$scope.headerStyle = "." + $scope.forHeaderCSS + " {font-family: '" + $scope.headerFontFamily + "'};"
	$scope.headerStyleTag = "<h1 class = '" + $scope.forHeaderCSS + "'>";

	$scope.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>"
	$scope.paragraphStyle = "." + $scope.forParagraphCSS + " {font-family: '" + $scope.paragraphFontFamily + "'};"
	$scope.paragraphStyleTag = "<p class = '" + $scope.forParagraphCSS + "'>";
}]);