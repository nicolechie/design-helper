var app = angular.module('dhApp.codefile', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'ngAnimate']);

app.controller('CodefileCtrl', ['chosenFonts', '$scope', '$rootScope', 'CodeStorage', '$http', 'UserInfo', '$modal', '$location', function(chosenFonts, $scope, $rootScope, CodeStorage, $http, UserInfo, $modal, $location){
	var self = this;
	
	var generatedCode = {};
	
	var user = UserInfo.getData();
	self.alreadySaved = false;
	
	var savedProjects = CodeStorage.getData();

    // If there are saved projects...
	if (savedProjects.length !== 0) {
	    // Loop throught them
    	savedProjects.forEach(function(savedProject) {
    	    console.log("saved Projects for each", savedProject);
    	        // If one of them is contained in the current path, set it to 
    	        // generatedCode (the code to be displayed)
    	    	if ($location.path() === '/codefile/'+ savedProject.projectName) {
    	    	    self.alreadySaved = true;
    	            console.log("match!");
    	            generatedCode = savedProject;
                	generatedCode.username = user.username;
    	    	}
    	    	// If the current path ends with new, call new project settings
    	    	else if ($location.path() === '/codefile/new') {
    	    	    self.alreadySaved = false;
    	    	    newProjectSettings();
    	    	}
    	    	// If the current path ends with edit, set the saved code id to generated code id
    	        // and call new project settings
	    		else if ($location.path() === '/codefile/edit/' + savedProject.projectName) {
    	    	    self.alreadySaved = true;
    	    	    generatedCode.id = savedProject._id;
    	    	    newProjectSettings();
    	    	}
    	});
    }
    // If there are  no saved projects...
    else {
        self.alreadySaved = false;
        newProjectSettings(); 
    }
    
	// Sets generated code to the chosen options
	function newProjectSettings() {
	    generatedCode.chosenHeader = chosenFonts.list()[0];
    	generatedCode.chosenParagraph = chosenFonts.list()[1];
    	generatedCode.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>";
    	generatedCode.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>";
    	generatedCode.username = user.username;
	}
	
	self.generatedCode = generatedCode;
	
	 // Brings up save modal
    self.showSaveModal = function () {
        var saveModal = $modal({ scope: $scope, templateUrl: "components/codefile/save-modal.html", contentTemplate: false, html: true, show: false });
        saveModal.$promise.then(saveModal.show);
    };
    
	self.saved = false;
	
	// Saves new project
	self.saveCode = function(data) {
	 	console.log('generatedCode', self.generatedCode, data);
        $http.post('/codefiles', self.generatedCode)
        .then(function successCallback(response) {
        	console.log('success');
        	self.saved = true;
        }, function errorCallback(response) {
            console.log("Error");
        });
    };
    
    // Edits saved project
    self.saveChanges = function(data) {
        console.log('data', data);
        $http.put('/codefiles/' + data.id, data)
        .then(function successCallback(response) {
        	console.log('success', response);
        	self.saved = true;
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });
    };
	
}]);

app.factory('CodeStorage', function () {
    var codefiles = [];
    return {
        setData: function (data) {
            codefiles = data;
        },
        getData: function () {
            return codefiles;
        }
    };
});