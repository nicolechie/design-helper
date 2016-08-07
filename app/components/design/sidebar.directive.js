var app = angular.module('dhApp.design');

app.directive('sidebarMenu', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/design/sidebar.template.html',
		scope: false,
	};	
});