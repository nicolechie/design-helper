var app = angular.module('dhApp.home');
app.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'opt-in.template.html',
        replace: true
    }
});