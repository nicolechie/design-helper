var app = angular.module('dhApp.design');

app.directive('makeEditable', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'components/design/make-editable.template.html',
		scope: true,
    };
});