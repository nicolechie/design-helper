describe("dhApp", function() {
    beforeEach(module("dhApp"));
    
    describe("/", function() {
        it('should load the template and controller',
        inject(function($location, $rootScope, $httpBackend, $route) {
            $httpBackend.whenGET('/home/home.html').respond('...');
            $httpBackend.expectGET('/').respond({});

            $rootScope.$apply(function() {
                $location.path('/');
            });
            
            expect($route.current.controller).toBe("HomeCtrl as hc");
            expect($route.current.loadedTemplateUrl).toBe("/home/home.html");

        }));
    });
    
    describe("/design", function() {
        it('should load the template and controller',
        inject(function($location, $rootScope, $httpBackend, $route) {
            $httpBackend.whenGET('/design/design.html').respond('...');
            $httpBackend.expectGET('/design').respond({});

            $rootScope.$apply(function() {
                $location.path('/design');
            });
            
            expect($route.current.controller).toBe("DesignCtrl as dc");
            expect($route.current.loadedTemplateUrl).toBe("/design/design.html");

        }));
    });
    
    describe("/codefile", function() {
        it('should load the template and controller',
        inject(function($location, $rootScope, $httpBackend, $route) {
            $httpBackend.whenGET('/codefile/codefile.html').respond('...');
            $httpBackend.expectGET('/codefile').respond({});

            $rootScope.$apply(function() {
                $location.path('/codefile/new');
            });
            
            expect($route.current.controller).toBe("CodefileCtrl as cc");
            expect($route.current.loadedTemplateUrl).toBe("/codefile/codefile.html");

        }));
    });
});

