var app = angular.module('dhApp', ['dhApp.design', 'dhApp.login', 'dhApp.home', 'dhApp.codefile', 'dhApp.user', 'mgcrea.ngStrap', 'mgcrea.ngStrap.button', 'ngjsColorPicker', 'ngRoute']);

app
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    	$locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl : '/home/home.html',
            controller : 'HomeCtrl'
        })
        .when('/login', {
            templateUrl : '/login/login.html',
            controller : 'LoginCtrl'
        })
        .when('/:username/home', {
    		templateUrl : '/user/user.html',
    		controller : 'UserCtrl'
    	})
        .when('/design', {
            templateUrl : '/design/design.html',
            controller : 'DesignCtrl'
        })
        .when('/design/:projectlink', {
            templateUrl : '/design/design.html',
            controller : 'DesignCtrl'
        })
        .when('/codefile/new', {
		    templateUrl : '/codefile/codefile.html',
		    controller : 'CodefileCtrl'
		})
		.when('/codefile/:projectlink', {
		    templateUrl : '/codefile/codefile.html',
		    controller : 'CodefileCtrl'
		})
		.when('/codefile/edit/:projectlink', {
		    templateUrl : '/codefile/codefile.html',
		    controller : 'CodefileCtrl'
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
	
	.factory('chosenFonts', [function() {
		var chosenFonts = [];
	    return {
	    	push: function(font) {
	    		chosenFonts.push(font);
	    	},
	    	list: function() {
	    		console.log("chosen fonts", chosenFonts);
	    		return chosenFonts;
	    	},
	    	reset: function() {
	    		chosenFonts = [];
	    		return;
	    	}
	    };
	}]);