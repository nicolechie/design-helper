// Display the fonts in a select
// When a font is chosen, it changes the header font
describe("headerFilter", function() {
    beforeEach(module("dhApp"));
    	var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('DesignCtrl', {
                $scope : scope
            });
            ctrl.allHeaderFonts = [{category: 'sans-serif', family:'Open Sans'}, 
            						{category: 'serif', family:'Lora'},
            						{category: 'sans-serif', family:'Roboto'}];
        }));
    describe("sans-serif", function() {

        it('should return only sans-serif fonts', function() {
            ctrl.setHeaderFilter('sans-serif');
            expect(ctrl.headerFontsList[0].family).toBe('Open Sans');
            });
        });
    describe("serif", function() {

        it('should return only serif fonts', function() {
            ctrl.setHeaderFilter('serif');
            expect(ctrl.headerFontsList[0].family).toBe('Lora');
            });
        });
    describe("all", function() {

        it('should return all fonts', function() {
            ctrl.setHeaderFilter('! ');
            expect(ctrl.headerFontsList[0].family).toBe('Open Sans');
            expect(ctrl.headerFontsList.length).toBe(3);
            });
        });
});
// Display the fonts in a select
// When a font is chosen, it changes the paragraph font

describe("paragraphFilter", function() {
    beforeEach(module("dhApp"));
    	var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('DesignCtrl', {
                $scope : scope
            });
            ctrl.allParagraphFonts = [{category: 'sans-serif', family:'Open Sans'}, 
            						{category: 'serif', family:'Lora'},
            						{category: 'sans-serif', family:'Roboto'}];
        }));
    describe("sans-serif", function() {

        it('should return only sans-serif fonts', function() {
            ctrl.setParagraphFilter('sans-serif');
            expect(ctrl.paragraphFontsList[0].family).toBe('Open Sans');
            });
        });
    describe("serif", function() {

        it('should return only serif fonts', function() {
            ctrl.setParagraphFilter('serif');
            expect(ctrl.paragraphFontsList[0].family).toBe('Lora');
            });
        });
    describe("all", function() {

        it('should return all fonts', function() {
            ctrl.setParagraphFilter('! ');
            expect(ctrl.paragraphFontsList[0].family).toBe('Open Sans');
            expect(ctrl.paragraphFontsList.length).toBe(3);
            });
        });
});
// Display the font sizes in a select
// When a size is chosen, it changes the size of the header font

describe("getParagraphSizes", function() {
    beforeEach(module("dhApp"));
    	var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('DesignCtrl', {
                $scope : scope
            });
        }));
    describe("paragraph size", function() {

        it('should set thisParagraphSize to 3rd size in array', function() {
            ctrl.getParagraphSizes();
            expect(ctrl.thisParagraphSize).toBe('14px');
            });
        });
});



// Sort Fonts
describe("sortFonts", function() {
    beforeEach(module("dhApp"));
        var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('DesignCtrl', {
                $scope : scope
            });
            ctrl.fonts = [{category: 'sans-serif', family:'Open Sans'}, 
                            {category: 'serif', family:'Lora'},
                            {category: 'sans-serif', family:'Roboto'}];
        }));
        
    // describe("forLink", function() {

    //     it('should replace any spaces from the font with a plus sign', function() {
    //         scope.sortFonts(scope.fonts);
    //         expect(scope.forLink).toBe('Open+Sans');
    //         });
    //     });
});

// Display the color options in a select
// When a color is chosen, it changes the color of the header font
// add in new color to array and see if it is added to the options

describe('Colors Directive', function() {
    
    var scope,
        element,
        compiled,
        selected,
        newColors,
        customOptions,
        html;

    beforeEach(module("dhApp"));
    beforeEach(module("sidebar.template.html"));
    beforeEach(inject(function($rootScope, $compile) {
        newColors = 'black';
        selected = 'black';
        customOptions = newColors;

        html="";
        html += "<ngjs-color-picker ";
        html += "   selected='" + selected + "'";
        html += "   custom-colors='" + newColors +"' " ;
        html += "   options='" + customOptions + "'>" ;
        html += "</ngjs-color-picker>";
        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();

    }));
    it('should load the color picker', function(){
        var colorPicker = element.find('ngjs-color-picker');
        expect(colorPicker.prevObject.length).toBe(1);
        expect(colorPicker.prevObject.attr('selected')).toBe('selected');
    });
});

// describe('design.html', function() {
    
//     var scope,
//         element,
//         compiled,
//         thisHeaderSize,
//         html,
//         makeEditable,
//         forHeaderCSS,
//         headerFontFamily,
//         selected,
//         ctrl;

//     beforeEach(module("dhApp"));
//     // beforeEach(module('editableItemTemplate.html'));
//     beforeEach(module('design.html'));
//     beforeEach(inject(function($rootScope, $compile, $httpBackend) {
//         // $httpBackend.whenGET('app/home/editableItemTemplate.html').respond('...');
//         thisHeaderSize = '36px';
//         forHeaderCSS = ' ';
//         headerFontFamily = ' ';
//         selected = 'black';
    
//         // html="";
//         // html += "<h1 ";
//         // html += " class = 'header " + forHeaderCSS + " text-center' ";
//         // // html += " ng-style='{ 'font-size':" + thisHeaderSize + ", 'color' :" + selected + " }' >" ;
//         // // html += " ng-style="'{' font-size:  '36px' , color : 'black' ''}'" >" ;
//         // html += " Header " + headerFontFamily ;
//         // html += " </h1> ";
//         // scope = $rootScope.$new();
//         // compiled = $compile(html);
//         // element = compiled(scope);
//         // scope.$digest();

//     }));
//     it('should have these attributes', function(){
//         console.log(element.find('h1'));
//         expect(element.find('h1').length).toBe(1);
//     });
// });
// Display the font sizes in a select
// When a size is chosen, it changes the size of the paragraph font

// When you click generate it goes to the next page
// That page displays the code for the selected options



describe("dhRequest", function() {
    beforeEach(module('dhApp'));

    it('should return a list of fonts',
    inject(function(dhRequest, $rootScope, $httpBackend) {
        $httpBackend.whenGET('home.html').respond('...');
        $httpBackend.expect('GET', 'https://www.googleapis.com/webfonts/v1/webfonts?&key=AIzaSyD0eVESfXT2RIQljAijyf_WpPRpPEeRT6E').respond(200);
        var status = false;
        dhRequest().then(function() {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});

// Selected fonts are pushed into a chosenFonts array so they can be accessed by the next page 
describe("chosenFonts", function() {
    beforeEach(module('dhApp'));
    var font = "Open Sans";
    it('should push the selected font into the chosenFonts array', function() {
        inject(function(chosenFonts) {
            chosenFonts.push(font);
            expect(chosenFonts.list()).toContain("Open Sans");
        });
    });
});