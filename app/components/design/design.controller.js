var app = angular.module('dhApp.design', []);
app.controller('DesignCtrl', ['getFonts', 'chosenFonts', '$scope', '$rootScope', '$filter', 'CodeStorage', '$location', function(getFonts, chosenFonts, $scope, $rootScope, $filter, CodeStorage, $location){
	var self = this;
	
	var savedProject = null;
	var savedCodeFiles = CodeStorage.getData();
	console.log($location.path());
	console.log("saved Code Files", savedCodeFiles);
	
	// If the path ends with a project name, find the project in saved files
	// and set it as savedProject
	for (var i=0; i<savedCodeFiles.length; i++) {
		if ($location.path() === '/design/'+ savedCodeFiles[i].projectName) {
	            console.log("match!");
	            self.alreadySaved = true;
	            savedProject = savedCodeFiles[i];
	            self.savedProject = savedProject;
	    	}
	}
		
	self.newColors = [
		'#000000',
        '#468966',
        '#FFF0A5',
        '#FFB03B',
        '#B64926',
        '#8E2800',
        '#e1e1e1'
  	];
	
	// Toggles sidebar
	var editMode = false;
	self.editMode = editMode;

    var allHeaderFonts = [];
    var allParagraphFonts = [];

	self.loadParagraphFont = loadParagraphFont;
	self.loadHeaderFont = loadHeaderFont;
	function addHeaderFont(fontLink) {
		$rootScope.style1 = 'https://fonts.googleapis.com/css?family=' + fontLink;
	}

	function addParagraphFont(fontLink) {
		$rootScope.style2 = 'https://fonts.googleapis.com/css?family=' + fontLink;
	}

	self.sortFonts = sortFonts;
	
	// Creates additionally needed font fields and pushes them into headers array and paragraphs array
  	function sortFonts(fonts) {
  		for (var i=0; i<=100; i++) {
			var forLink = fonts[i].family.replace(/ /g, '+');
			self.forLink = forLink;
			var forCSS = fonts[i].family.replace(/ /g, '');
			allHeaderFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
			allParagraphFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
		}
  	}

  	self.setHeaderFilter = setHeaderFilter;
  	self.setParagraphFilter = setParagraphFilter;

	// Filters header fonts based on category value; value will be serif, sans-serif or both
  	function setHeaderFilter(val) {
  		self.headerFontsList = $filter('filter')(self.allHeaderFonts, {category: val}, true);
  		
  		// if a saved project exists, set the dropdown to it's header font, 
  		// otherwise set the dropdown to the first font in the header font list
  		
  		if (savedProject !== null) {
  			if (val === '! ' || val === savedProject.chosenHeader.font.family) {
	  			self.thisHeaderFont = savedProject.chosenHeader.font;
	  			for (var i=0; i<self.headerFontsList.length; i++) {
	  				if (self.headerFontsList[i].family === savedProject.chosenHeader.font.family) {
	  					console.log("inside if");
	  					self.thisHeaderFont = self.headerFontsList[i];
	  					console.log(i);
	  				}
	  			}
  			}
  			else {
  				self.thisHeaderFont = self.headerFontsList[0];
  			}	
  		}
  		else {
  			self.thisHeaderFont = self.headerFontsList[0];
  		}
  	}

	// Filters paragraph fonts based on category value; value will be serif, sans-serif or both
  	function setParagraphFilter(val) {
  		self.paragraphFontsList = $filter('filter')(self.allParagraphFonts, {category: val}, true);
  		
  		// if a saved project exists, set the dropdown to it's paragraph font, 
  		// otherwise set the dropdown to the first font in the paragraph font list
  		
  		if (savedProject !== null) {
  			if (val === '! ' || val === savedProject.chosenParagraph.font.family) {
	  			self.thisParagraphFont = savedProject.chosenParagraph.font;
	  			for (var i=0; i<self.headerFontsList.length; i++) {
	  				if (self.paragraphFontsList[i].family === savedProject.chosenParagraph.font.family) {
	  					console.log("inside if");
	  					self.thisParagraphFont = self.paragraphFontsList[i];
	  					console.log(i);
	  				}
	  			}
  			}
  			else {
  			self.thisParagraphFont = self.paragraphFontsList[0];
  			}
  		}
  		else {
  			self.thisParagraphFont = self.paragraphFontsList[0];
  		}
  	}
	
	// Sets chosen fonts options to style header
  	function loadHeaderFont(thisHeaderFont) {
	  	var fontLink = thisHeaderFont.forLink;
	  	self.headerFontFamily = thisHeaderFont.family;
	  	self.forHeaderCSS = thisHeaderFont.forCSS;
	  	addHeaderFont(fontLink);
	  	createCSSSelector("." + self.forHeaderCSS, "font-family: '" + self.headerFontFamily + "'");
  	}
	
	// Sets chosen fonts options to style paragraph
  	function loadParagraphFont(thisParagraphFont) {
   		console.log('calling loadParagraphFont function', thisParagraphFont);
	  	var fontLink = thisParagraphFont.forLink;
	  	self.paragraphFontFamily = thisParagraphFont.family;
	  	self.forParagraphCSS = thisParagraphFont.forCSS;
	  	addParagraphFont(fontLink);
	  	createCSSSelector("." + self.forParagraphCSS, "font-family: '" + self.paragraphFontFamily + "'");
  		console.log("forParagraphCSS", self.forParagraphCSS);
  	}

  	self.button = {
			'radio': 2,
			'paragraphRadio': 2
	};
	
	// Populates header sizes dropdown
	function getHeaderSizes() {
		var headerSizes = [];
		self.headerSizes = headerSizes;
		for (var i=24; i<=84; i+=12) {
			headerSizes.push(i+'px');
		}
		self.thisHeaderSize = headerSizes[1];
		// If it's a saved project, set initial set option to the saved size
		if (savedProject !== null) {
			self.thisHeaderSize = savedProject.chosenHeader.size;
		}
		// Otherwise set it to the default size
		else {
			self.thisHeaderSize = headerSizes[1];
		}
	}
	
	self.getParagraphSizes = getParagraphSizes;
	// Populates paragraph sizes dropdown
	function getParagraphSizes() {
		var paragraphSizes = [];
		self.paragraphSizes = paragraphSizes;
		for (var i=8; i<=20; i+=2) {
			paragraphSizes.push(i+'px');
		}
		self.thisParagraphSize = paragraphSizes[3];
		// If it's a saved project, set initial set option to the saved size
		if (savedProject !== null) {
			self.thisParagraphSize = savedProject.chosenParagraph.size;
		}
		// Otherwise set it to the default size
		else {
			self.thisParagraphSize = paragraphSizes[3];
		}
	}

	self.customOptions = {
		roundCorners: true
	};

	function generate() {
		chosenFonts.reset();
		chosenFonts.push({font: self.thisHeaderFont, size: self.thisHeaderSize, color: self.selected});
		chosenFonts.push({font: self.thisParagraphFont, size: self.thisParagraphSize});
	}

	self.generate = generate;

    getFonts()
	  	.then(function(data, status, headers, config) {
	        var fonts = data.data.items;
	        
			sortFonts(fonts);
			self.allHeaderFonts = allHeaderFonts;
			self.allParagraphFonts = allParagraphFonts;
	 		console.log(savedProject);
	 		
	 		// If it's a saved project, set initial set options to the saved projects settings
	 		if (savedProject !== null) {
	 			self.alreadySaved = true;
	 			self.selected = savedProject.chosenHeader.color;
	 			self.thisHeaderFont = savedProject.chosenHeader.font;
	 			self.thisParagraphFont = savedProject.chosenParagraph.font;
			}
			// Otherwise set them to default
	  		else {
	  			self.thisHeaderFont = self.allHeaderFonts[0];
	  			self.thisParagraphFont = self.allParagraphFonts[0];
	  		}
	  		console.log("already saved", self.alreadySaved);
	  		
	  		loadHeaderFont(self.thisHeaderFont);
	 		loadParagraphFont(self.thisParagraphFont);

	 		setHeaderFilter('! ');
	 		setParagraphFilter('! ');

	 		getHeaderSizes();
	 		getParagraphSizes();
	  });
}]);

app.factory('chosenFonts', [function() {
	var chosenFonts = [];
    return {
    	push: function(font) {
    		chosenFonts.push(font);
    	},
    	list: function() {
    		console.log("chosen fonts", chosenFonts);
    		return chosenFonts;
    	},
    	reset: function() {
    		chosenFonts = [];
    		return;
    	}
    };
}]);