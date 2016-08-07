var app = angular.module('dhApp');

app.directive('navBar', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'shared/navbar.template.html',
        replace: true
    };
});