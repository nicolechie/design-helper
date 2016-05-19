var app = angular.module('dhApp', ['mgcrea.ngStrap', 'mgcrea.ngStrap.button', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside']);
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
	
app.controller('FontCtrl', ['getFonts', '$scope', '$rootScope', '$filter', function(getFonts, $scope, $rootScope, $filter){
		
        var allHeaderFonts = [];
        var allParagraphFonts = [];

		// $scope.aside = {
		//   "title": "Title",
		//   "content": "Hello Aside<br />This is a multiline message!"
		// };
		$scope.loadParagraphFont = loadParagraphFont;
		$scope.loadHeaderFont = loadHeaderFont;
		function addHeaderFont(fontLink) {
			$rootScope.style1 = 'https://fonts.googleapis.com/css?family=' + fontLink;
		}

		function addParagraphFont(fontLink) {
			$rootScope.style2 = 'https://fonts.googleapis.com/css?family=' + fontLink;
		}

	  	function sortFonts(fonts) {
	  		for (i=0; i<=100; i++) {
				var forLink = fonts[i].family.replace(/ /g, '+');
				var forCSS = fonts[i].family.replace(/ /g, '');
				allHeaderFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
				allParagraphFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
			};
	  	}

	  	$scope.setHeaderFilter = setHeaderFilter;
	  	$scope.setParagraphFilter = setParagraphFilter;

	  	function setHeaderFilter(val) {
	  		$scope.headerFontsList = $filter('filter')($scope.allHeaderFonts, {category: val}, true);
	  		$scope.thisHeaderFont = $scope.headerFontsList[0];
	  	}

	  	function setParagraphFilter(val) {
	  		$scope.paragraphFontsList = $filter('filter')($scope.allParagraphFonts, {category: val}, true);
	  		$scope.thisParagraphFont = $scope.paragraphFontsList[0];
	  	}

	  	function loadHeaderFont(thisHeaderFont) {
	   		console.log('calling function', thisHeaderFont);
		  	var fontLink = thisHeaderFont.forLink;
		  	$scope.headerFontFamily = thisHeaderFont.family;
		  	$scope.forHeaderCSS = thisHeaderFont.forCSS;
		  	addHeaderFont(fontLink);
		  	createCSSSelector(".header" + $scope.forHeaderCSS, "font-family: '" + $scope.headerFontFamily + "'");
	  	}

	  	function loadParagraphFont(thisParagraphFont) {
	   		console.log('calling function', thisParagraphFont);
		  	var fontLink = thisParagraphFont.forLink;
		  	$scope.paragraphFontFamily = thisParagraphFont.family;
		  	$scope.forParagraphCSS = thisParagraphFont.forCSS;
		  	addParagraphFont(fontLink);
		  	createCSSSelector(".paragraph" + $scope.forParagraphCSS, "font-family: '" + $scope.paragraphFontFamily + "'");
	  	}

	  	$scope.button = {
				"radio": 2,
				"paragraphRadio": 2
		};

        getFonts()
		  	.then(function(data, status, headers, config) {
		        var fonts = data.data.items;
		        
				sortFonts(fonts);

				$scope.allHeaderFonts = allHeaderFonts;
				$scope.allParagraphFonts = allParagraphFonts;
				$scope.thisHeaderFont = $scope.allHeaderFonts[0];
				$scope.thisParagraphFont = $scope.allParagraphFonts[0];

		 		loadHeaderFont($scope.thisHeaderFont);
		 		loadParagraphFont($scope.thisParagraphFont);

		 		setHeaderFilter('! ');
		 		setParagraphFilter('! ');
		  })
}]);

app.directive('fontDropdown', function() {
	return {
		restrict: 'E',
		templateUrl: 'fonts/fonts-template.html',
		scope: false,
		// link: function($scope, element, attrs) {
		
		// }
	}	
});

app.directive('makeEditable', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'fonts/editableItemTemplate.html',
		scope: true,
    }
});

// var app = angular.module('dhApp', ['mgcrea.ngStrap', 'mgcrea.ngStrap.button', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside']);
// app
// 	.constant('DH_API_PREFIX', 'https://www.googleapis.com/webfonts/v1/webfonts?')
// 	.constant('DH_API_KEY', 'AIzaSyD0eVESfXT2RIQljAijyf_WpPRpPEeRT6E')
// 	.factory('dhRequest', ['$http', '$q', 'DH_API_PREFIX', 'DH_API_KEY', function($http, $q, DH_API_PREFIX, DH_API_KEY){
// 	    return function dhRequest(params) {
// 	      var reqParams = angular.extend({}, params, {key: DH_API_KEY});
// 	    return $http.get(DH_API_PREFIX, {cache: true, params: reqParams});
	    
// 	      };
// 	}])
// 	.factory('getFonts', ['dhRequest', function(dhRequest) {
// 	    return function getFonts() {
// 	      var params;
// 	        params = {
// 	          sort: 'popularity'
// 	        };
// 	      return dhRequest(params);
// 	    };
// 	}]) 
	
// app.controller('FontCtrl', ['getFonts', '$scope', '$rootScope', '$filter', function(getFonts, $scope, $rootScope, $filter){
		
//         var allFonts = [];

// 		$scope.aside = {
// 		  "title": "Title",
// 		  "content": "Hello Aside<br />This is a multiline message!"
// 		};

// 		$scope.loadHeaderFont = loadHeaderFont;
// 		function addGoogleFont(fontLink) {
// 			$rootScope.style1 = 'https://fonts.googleapis.com/css?family=' + fontLink;
// 		}

// 	  	function sortFonts(fonts) {
// 	  		for (i=0; i<=100; i++) {
// 				var forLink = fonts[i].family.replace(/ /g, '+');
// 				var forCSS = fonts[i].family.replace(/ /g, '');
// 				allFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
// 			};
// 	  	}

// 	  	$scope.setFilter = setFilter;

// 	  	function setFilter(val) {
// 	  		$scope.fontsList = $filter('filter')($scope.allFonts, {category: val}, true);
// 	  		$scope.thisFont = $scope.fontsList[0];
// 	  	}

// 	  	function loadHeaderFont(thisFont) {
// 	   		console.log('calling function', thisFont);
// 		  	var fontLink = thisFont.forLink;
// 		  	$scope.fontFamily = thisFont.family;
// 		  	$scope.forCSS = thisFont.forCSS;
// 		  	addGoogleFont(fontLink);
// 		  	createCSSSelector("." + $scope.forCSS, "font-family: '" + $scope.fontFamily + "'");
// 	  	}

// 	  	$scope.button = {
// 				"radio": 2
// 		};

//         getFonts()
// 		  	.then(function(data, status, headers, config) {
// 		        var fonts = data.data.items;
		        
// 				sortFonts(fonts);

// 				$scope.allFonts = allFonts;
// 				$scope.thisFont = $scope.allFonts[0];

// 		 		loadHeaderFont($scope.thisFont);

// 		 		setFilter('! ');
// 		  })
// }]);

// app.directive('fontDropdown', function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'fonts/fonts-template.html',
// 		scope: false,
// 		// link: function($scope, element, attrs) {
		
// 		// }
// 	}	
// });

// app.directive('makeEditable', function() {
// 	return {
// 		restrict: 'A',
// 		transclude: true,
// 		templateUrl: 'fonts/editableItemTemplate.html',
// 		scope: true,
//     }
// });