var app = angular.module('dhApp.codefile', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'ngAnimate']);

app.controller('UseCtrl', ['chosenFonts', '$scope', '$rootScope', 'CodeStorage', '$http', 'UserInfo', '$modal', '$location', function(chosenFonts, $scope, $rootScope, CodeStorage, $http, UserInfo, $modal, $location){
	var generatedCode = {};
	
	var user = UserInfo.getData();
	$scope.alreadySaved = false;
	
	var savedProjects = CodeStorage.getData();
	console.log($location.path());
	console.log('savedCodeFiles', savedProjects);
	console.log("length", savedProjects.length);
	if (savedProjects.length !== 0) {
    	savedProjects.forEach(function(project) {
    	   // console.log("saved Code FIle", project);
    	    	if ($location.path() === '/use/'+ project.projectName) {
    	    	    $scope.alreadySaved = true;
    	            console.log("match!");
    	            console.log("project", project.chosenHeader);
    	            generatedCode = project;
                	generatedCode.username = user.username;
                	console.log("old gen code", generatedCode);
    	    	}
    	    	else if ($location.path() === '/use/new') {
    	    	    $scope.alreadySaved = false;
    	    	    newProjectSettings();
    	    	    console.log("other gen code", generatedCode);
    	    	}
	    		else if ($location.path() === '/use/edit/' + project.projectName) {
    	    	    $scope.alreadySaved = true;
    	    	    console.log('project', project);
    	    	    generatedCode.id = project._id;
    	    	    newProjectSettings();
    	    	    console.log("other gen code", generatedCode);
    	    	}
    	});
    }
    else {
        $scope.alreadySaved = false;
        newProjectSettings(); 
        console.log("new gen code", generatedCode);
    }
	
	function newProjectSettings() {
	    generatedCode.chosenHeader = chosenFonts.list()[0];
    	generatedCode.chosenParagraph = chosenFonts.list()[1];
    	generatedCode.headerLink = "<link href='" + $rootScope.style1 + "' rel='stylesheet' type='text/css'>";
    	generatedCode.paragraphLink = "<link href='" + $rootScope.style2 + "' rel='stylesheet' type='text/css'>";
    	generatedCode.username = user.username;
	}
	
	$scope.generatedCode = generatedCode;
	
	var saveModal = $modal({ scope: $scope, templateUrl: "use/save-modal.html", contentTemplate: false, html: true, show: false });

    $scope.showSaveModal = function () {
        saveModal.$promise.then(saveModal.show);
    };
    
	$scope.saved = false;
	
	$scope.saveCode = function(data) {
	 	console.log('generatedCode', $scope.generatedCode, data);
        $http.post('/codefiles', $scope.generatedCode)
        .then(function successCallback(response) {
        	console.log('success');
        	$scope.saved = true;
            // CodeStorage.setData($scope.generatedCode);
        }, function errorCallback(response) {
            console.log("Error");
        });
    };
    
    $scope.saveChanges = function(data) {
        console.log('data', data);
        $http.put('/codefiles/' + data.id, data)
        .then(function successCallback(response) {
        	console.log('success', response);
        	$scope.saved = true;
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