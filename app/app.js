var app = angular.module('dhApp', ['mgcrea.ngStrap', 'mgcrea.ngStrap.button', 'ngAnimate', 'ngjsColorPicker', 'ngRoute']);
app
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    	// $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl : '/home/home.html',
            controller : 'HomeCtrl'
        })
        .when('/use', {
		    templateUrl : '/use/use.template.html',
		    controller : 'UseCtrl'
		})
    }])
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
	.factory('chosenFonts', [function() {
		var chosenFonts = [];
	    return {
	    	push: function(font) {
	    		chosenFonts.push(font);
	    	},
	    	list: function() {
	    		return chosenFonts;
	    	}
	    };
	}])
	// .factory('sortFonts', ['getFonts', function(getFonts) {
	// 	var allHeaderFonts = [];
	// 	var allParagraphFonts = [];
	// 	return function sortFonts(fonts) {
	// 	  		for (i=0; i<=100; i++) {
	// 				var forLink = fonts[i].family.replace(/ /g, '+');
	// 				var forCSS = fonts[i].family.replace(/ /g, '');
	// 				allHeaderFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
	// 				allParagraphFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
	// 			};
	// 			return (allHeaderFonts);
	//   	}
	// }]) 
	// .factory('loadFonts', ['sortFonts', function(sortFonts) {
	// 	return function loadHeaderFont(thisHeaderFont) {
	// 	  	var fontLink = thisHeaderFont.forLink;
	// 	  	var headerFontFamily = thisHeaderFont.family;
	// 	  	var forHeaderCSS = thisHeaderFont.forCSS;
	// 	  	addHeaderFont(fontLink);
	// 	  	createCSSSelector("." + forHeaderCSS, "font-family: '" + headerFontFamily + "'");
	//   	}
	// }]) 

app.directive('sidebarMenu', function() {
	return {
		restrict: 'E',
		templateUrl: 'home/sidebar.template.html',
		scope: false,
		// link: function($scope, element, attrs) {
		
		// }
	}	
});

app.directive('makeEditable', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'home/editableItemTemplate.html',
		scope: true,
    }
});