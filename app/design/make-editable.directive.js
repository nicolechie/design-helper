app.directive('makeEditable', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'design/make-editable.template.html',
		scope: true,
    };
});