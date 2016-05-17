var app = angular.module('dhApp', []);
app
	.constant('DH_API_PREFIX', 'https://www.googleapis.com/webfonts/v1/webfonts?')
	.constant('DH_API_KEY', 'AIzaSyD0eVESfXT2RIQljAijyf_WpPRpPEeRT6E')
	.factory('dhRequest', ['$http', '$q', 'DH_API_PREFIX', 'DH_API_KEY', function($http, $q, DH_API_PREFIX, DH_API_KEY){
	    return function dhRequest(params) {
	      var reqParams = angular.extend({}, params, {key: DH_API_KEY});
	    return $http.get(DH_API_PREFIX, {cache: true, params: reqParams});
	    
	      };
	}])
	.factory('getFonts', ['dhRequest', function(dhRequest) {
	    return function getFonts() {
	      var params;
	        params = {
	          sort: 'popularity'
	        };
	      return dhRequest(params);
	    };
	}]) 
	
app.controller('FontCtrl', ['getFonts', '$scope', function(getFonts, $scope){
        
        var sansSerifs = [];
		var serifs = [];
		$scope.loadHeaderFont = loadHeaderFont;
		function addGoogleFont(fontLink) {
			$("head").append("<link href='https://fonts.googleapis.com/css?family=" + fontLink + "' rel='stylesheet' type='text/css'>");
		}

	  	function sortFonts(fonts) {
	  		for (i=0; i<=100; i++) {
					var forLink = fonts[i].family.replace(/ /g, '+');
					var forCSS = fonts[i].family.replace(/ /g, '');
					if (fonts[i].category === "sans-serif") {
						sansSerifs.push({family: fonts[i].family, forLink: forLink, forCSS: forCSS});
					}
					else {
						serifs.push({family: fonts[i].family, forLink: forLink, forCSS: forCSS});
					}
				};
	  	}

	  	function loadHeaderFont(thisFont) {
	   		console.log('calling function', thisFont);
		  	var fontLink = thisFont.forLink;
		  	$scope.fontFamily = thisFont.family;
		  	$scope.forCSS = thisFont.forCSS;
		  	addGoogleFont(fontLink);
		  	createCSSSelector("." + $scope.forCSS, "font-family: '" + $scope.fontFamily + "'");
	  	}


        getFonts()
		  	.then(function(data, status, headers, config) {

		        var fonts = data.data.items;
				sortFonts(fonts);
				
				$scope.serifs = serifs;
				$scope.sansSerifs = sansSerifs;
		 		$scope.thisSansSerifFont = $scope.sansSerifs[0];
		 		$scope.thisSerifFont = $scope.serifs[0];

		 		loadHeaderFont($scope.thisSansSerifFont);
		 		loadHeaderFont($scope.thisSerifFont);
		  })

}]);

app.directive('fontDropdown', function() {
	return {
		restrict: 'E',
		templateUrl: 'fonts/fonts-template.html',
		scope: true,
		link: function($scope, element, attrs) {
		
		}
	}	
});