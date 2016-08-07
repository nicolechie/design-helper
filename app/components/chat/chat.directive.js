var app = angular.module('dhApp.design');

app.directive('chatBox', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'components/chat/chat.template.html',
        replace: true
    };
});