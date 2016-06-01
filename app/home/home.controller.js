var app = angular.module('dhApp.home', []);
app.controller('HomeCtrl', ['getFonts', 'chosenFonts', '$scope', '$rootScope', '$filter', function(getFonts, chosenFonts, $scope, $rootScope, $filter){
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
	  		for (i=0; i<=100; i++) {
				var forLink = fonts[i].family.replace(/ /g, '+');
				$scope.forLink = forLink;
				var forCSS = fonts[i].family.replace(/ /g, '');
				allHeaderFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
				allParagraphFonts.push({category: fonts[i].category, family: fonts[i].family, forLink: forLink, forCSS: forCSS});
			};
	  	}

	  	$scope.setHeaderFilter = setHeaderFilter;
	  	$scope.setParagraphFilter = setParagraphFilter;

	  	function setHeaderFilter(val) {
	  		$scope.headerFontsList = $filter('filter')($scope.allHeaderFonts, {category: val}, true);
	  		$scope.thisHeaderFont = $scope.headerFontsList[0];
	  	}

	  	function setParagraphFilter(val) {
	  		$scope.paragraphFontsList = $filter('filter')($scope.allParagraphFonts, {category: val}, true);
	  		$scope.thisParagraphFont = $scope.paragraphFontsList[0];
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
				"radio": 2,
				"paragraphRadio": 2
		};

		function getHeaderSizes() {
			var headerSizes = [];
			$scope.headerSizes = headerSizes;
			for (i=24; i<=84; i+=12) {
				headerSizes.push(i+"px");
			}
			$scope.thisHeaderSize = headerSizes[1];
		}
		$scope.getParagraphSizes = getParagraphSizes;
		function getParagraphSizes() {
			var paragraphSizes = [];
			$scope.paragraphSizes = paragraphSizes;
			for (i=8; i<=20; i+=2) {
				paragraphSizes.push(i+"px");
			}
			$scope.thisParagraphSize = paragraphSizes[3];
		}

		$scope.customOptions = {
			roundCorners: true
		};

		function generate() {
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
				$scope.thisHeaderFont = $scope.allHeaderFonts[0];
				$scope.thisParagraphFont = $scope.allParagraphFonts[0];

		 		loadHeaderFont($scope.thisHeaderFont);
		 		loadParagraphFont($scope.thisParagraphFont);

		 		setHeaderFilter('! ');
		 		setParagraphFilter('! ');

		 		getHeaderSizes();
		 		getParagraphSizes();
	
		  })
}]);