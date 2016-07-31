describe("HomeCtrl", function() {
    beforeEach(module("dhApp"));
    	var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {
                $scope : scope
            });
            ctrl.userLogin = {username: 'user', password:'password'};
        }));
        describe("logIn", function() {
    
            it('should post to the backend when a user logs in',
                inject(function($httpBackend, $rootScope) {
                    ctrl.logIn(ctrl.userLogin);
                    $httpBackend.expect('POST', '/login', ctrl.userLogin).respond(200, ctrl.userLogin);
                    $rootScope.$digest();
                    $httpBackend.flush();
                    expect(ctrl.loginError).toBe(false);
                    expect(ctrl.signedIn).toBe(true);
                    $httpBackend.verifyNoOutstandingRequest();
        }));
    });
});