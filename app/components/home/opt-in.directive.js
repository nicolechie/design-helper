app.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'components/home/opt-in.template.html',
        replace: true
    }
});