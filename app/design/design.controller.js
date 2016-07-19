var app = angular.module('dhApp.design', []);
app.controller('DesignCtrl', ['getFonts', 'chosenFonts', '$scope', '$rootScope', '$filter', 'CodeStorage', '$location', function(getFonts, chosenFonts, $scope, $rootScope, $filter, CodeStorage, $location){
	
	var savedProject = null;
	var savedCodeFiles = CodeStorage.getData();
	console.log($location.path());
	console.log("saved Code Files", savedCodeFiles);
	for (var i=0; i<savedCodeFiles.length; i++) {
		if ($location.path() === '/design/'+ savedCodeFiles[i].projectName) {
	            console.log("match!");
	            $scope.alreadySaved = true;
	            savedProject = savedCodeFiles[i];
	            $scope.savedProject = savedProject;
	    	}
	}
		
		$scope.newColors = [
			'#000000',
	        '#468966',
	        '#FFF0A5',
	        '#FFB03B',
	        '#B64926',
	        '#8E2800',
	        '#e1e1e1'
      	];

		var editMode = false;
		$scope.editMode = editMode;

        var allHeaderFonts = [];
        var allParagraphFonts = [];

		$scope.loadParagraphFont = loadParagraphFont;
		$scope.loadHeaderFont = loadHeaderFont;
		function addHeaderFont(fontLink) {
			$rootScope.style1 = 'https://fonts.googleapis.com/css?family=' + fontLink;
		}

		function addParagraphFont(fontLink) {
			$rootScope.style2 = 'https://fonts.googleapis.com/css?family=' + fontLink;
		}

		$scope.sortFonts = sortFonts;
	  	function sortFonts(fonts) {
	  		for (var i=0; i<=100; i++) {
				var forLink = fonts[i].family.replace(/ /g, '+');
				$scope.forLink = forLink;
				var forCSS = fonts[i].family.replace(/ /g, '');
				allHeaderFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
				allParagraphFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
			}
	  	}

	  	$scope.setHeaderFilter = setHeaderFilter;
	  	$scope.setParagraphFilter = setParagraphFilter;

	  	function setHeaderFilter(val) {
	  		$scope.headerFontsList = $filter('filter')($scope.allHeaderFonts, {category: val}, true);
	  		
	  		// if a saved project exists, set the dropdown to it's header font, 
	  		// otherwise set the dropdown to the first font in the header font list
	  		
	  		if (savedProject !== null) {
	  			if (val === '! ' || val === savedProject.chosenHeader.font.family) {
		  			$scope.thisHeaderFont = savedProject.chosenHeader.font;
		  			for (var i=0; i<$scope.headerFontsList.length; i++) {
		  				if ($scope.headerFontsList[i].family === savedProject.chosenHeader.font.family) {
		  					console.log("inside if");
		  					$scope.thisHeaderFont = $scope.headerFontsList[i];
		  					console.log(i);
		  				}
		  			}
	  			}
	  			else {
	  			$scope.thisHeaderFont = $scope.headerFontsList[0];
	  			}	
	  		}
	  		else {
	  			$scope.thisHeaderFont = $scope.headerFontsList[0];
	  		}
	  	}

	  	function setParagraphFilter(val) {
	  		$scope.paragraphFontsList = $filter('filter')($scope.allParagraphFonts, {category: val}, true);
	  		
	  		// if a saved project exists, set the dropdown to it's paragraph font, 
	  		// otherwise set the dropdown to the first font in the paragraph font list
	  		
	  		if (savedProject !== null) {
	  			if (val === '! ' || val === savedProject.chosenParagraph.font.family) {
		  			$scope.thisParagraphFont = savedProject.chosenParagraph.font;
		  			for (var i=0; i<$scope.headerFontsList.length; i++) {
		  				if ($scope.paragraphFontsList[i].family === savedProject.chosenParagraph.font.family) {
		  					console.log("inside if");
		  					$scope.thisParagraphFont = $scope.paragraphFontsList[i];
		  					console.log(i);
		  				}
		  			}
	  			}
	  			else {
	  			$scope.thisParagraphFont = $scope.paragraphFontsList[0];
	  			}
	  		}
	  		else {
	  			$scope.thisParagraphFont = $scope.paragraphFontsList[0];
	  		}
	  	}

	  	function loadHeaderFont(thisHeaderFont) {
		  	var fontLink = thisHeaderFont.forLink;
		  	$scope.headerFontFamily = thisHeaderFont.family;
		  	$scope.forHeaderCSS = thisHeaderFont.forCSS;
		  	addHeaderFont(fontLink);
		  	createCSSSelector("." + $scope.forHeaderCSS, "font-family: '" + $scope.headerFontFamily + "'");
	  	}

	  	function loadParagraphFont(thisParagraphFont) {
	   		console.log('calling loadParagraphFont function', thisParagraphFont);
		  	var fontLink = thisParagraphFont.forLink;
		  	$scope.paragraphFontFamily = thisParagraphFont.family;
		  	$scope.forParagraphCSS = thisParagraphFont.forCSS;
		  	addParagraphFont(fontLink);
		  	createCSSSelector("." + $scope.forParagraphCSS, "font-family: '" + $scope.paragraphFontFamily + "'");
	  		console.log("forParagraphCSS", $scope.forParagraphCSS);
	  	}

	  	$scope.button = {
				'radio': 2,
				'paragraphRadio': 2
		};

		function getHeaderSizes() {
			var headerSizes = [];
			$scope.headerSizes = headerSizes;
			for (var i=24; i<=84; i+=12) {
				headerSizes.push(i+'px');
			}
				$scope.thisHeaderSize = headerSizes[1];
			if (savedProject !== null) {
				$scope.thisHeaderSize = savedProject.chosenHeader.size;
			}
			else {
				$scope.thisHeaderSize = headerSizes[1];
			}
		}
		
		$scope.getParagraphSizes = getParagraphSizes;
		
		function getParagraphSizes() {
			var paragraphSizes = [];
			$scope.paragraphSizes = paragraphSizes;
			for (var i=8; i<=20; i+=2) {
				paragraphSizes.push(i+'px');
			}
				$scope.thisParagraphSize = paragraphSizes[3];
			if (savedProject !== null) {
				$scope.thisParagraphSize = savedProject.chosenParagraph.size;
			}
			else {
				$scope.thisParagraphSize = paragraphSizes[3];
			}
		}

		$scope.customOptions = {
			roundCorners: true
		};

		function generate() {
			chosenFonts.reset();
			chosenFonts.push({font: $scope.thisHeaderFont, size: $scope.thisHeaderSize, color: $scope.selected});
			chosenFonts.push({font: $scope.thisParagraphFont, size: $scope.thisParagraphSize});
		}

		$scope.generate = generate;

        getFonts()
		  	.then(function(data, status, headers, config) {
		        var fonts = data.data.items;
		        
				sortFonts(fonts);
				$scope.allHeaderFonts = allHeaderFonts;
				$scope.allParagraphFonts = allParagraphFonts;
		 		console.log(savedProject);
		 		
		 		if (savedProject !== null) {
		 			$scope.alreadySaved = true;
		 			$scope.selected = savedProject.chosenHeader.color;
		 			$scope.thisHeaderFont = savedProject.chosenHeader.font;
		 			$scope.thisParagraphFont = savedProject.chosenParagraph.font;
				}
		  		else {
		  			$scope.thisHeaderFont = $scope.allHeaderFonts[0];
		  			$scope.thisParagraphFont = $scope.allParagraphFonts[0];
		  		}
		  		console.log("already saved", $scope.alreadySaved);
		  		
		  		loadHeaderFont($scope.thisHeaderFont);
		 		loadParagraphFont($scope.thisParagraphFont);

		 		setHeaderFilter('! ');
		 		setParagraphFilter('! ');

		 		getHeaderSizes();
		 		getParagraphSizes();
		 		console.log(savedProject.projectName);
		  });
}]);

// app.directive('chatBox', function() {
//     return {
//         restrict: 'E',
//         transclude: true,
//         templateUrl: '/design/chat.template.html',
//         replace: true
//     };
// });