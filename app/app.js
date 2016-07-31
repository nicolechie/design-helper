var app = angular.module('dhApp', ['dhApp.design', 'dhApp.home', 'dhApp.codefile', 'dhApp.user', 'mgcrea.ngStrap', 'mgcrea.ngStrap.button', 'ngjsColorPicker', 'ngRoute']);

app
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    	$locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl : '/components/home/home.html',
            controller : 'HomeCtrl as hc'
        })
        .when('/:username/home', {
    		templateUrl : '/components/user/user.html',
    		controller : 'UserCtrl as uc'
    	})
        .when('/design', {
            templateUrl : '/components/design/design.html',
            controller : 'DesignCtrl as dc'
        })
        .when('/design/:projectlink', {
            templateUrl : '/components/design/design.html',
            controller : 'DesignCtrl as dc'
        })
        .when('/codefile/new', {
		    templateUrl : '/components/codefile/codefile.html',
		    controller : 'CodefileCtrl as cc'
		})
		.when('/codefile/:projectlink', {
		    templateUrl : '/components/codefile/codefile.html',
		    controller : 'CodefileCtrl as cc'
		})
		.when('/codefile/edit/:projectlink', {
		    templateUrl : '/components/codefile/codefile.html',
		    controller : 'CodefileCtrl as cc'
		})
		.otherwise({
    		redirectTo : '/'
		});
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
	
	