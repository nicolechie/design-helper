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

app.directive('fontDropdown', function() {
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