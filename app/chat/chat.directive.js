app.directive('chatBox', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/chat/chat.template.html',
        replace: true
    };
});