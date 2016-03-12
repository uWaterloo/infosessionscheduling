angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('infosessionschedulingCtrl', ['$scope', '$http', '$q', 'infosessionschedulingFactory', function($scope, $http, $q, infosessionschedulingFactory) {

        // Widget Configuration
        $scope.portalHelpers.config = {
            // make 'widgetMenu.html' the template for the top right menu
            "widgetMenu": "widgetMenu.html"
        };

        // Import variables and functions from service

        // initialize the service
        infosessionschedulingFactory.init($scope);

        // Show main view in the first column
        $scope.portalHelpers.showView('main.html', 1);

        var url = 'https://api.uwaterloo.ca/v2/terms/1163/infosessions.json?key=36802f2c7eab5943ece0bcf8eec07d5a';
        // http.get FUNCTION 
        $http.get(url).success(function(result) {
            // Handle result 
            $scope.mydata = result.data;
        });
        // http.get FUNCTION 
        //Todays date
        var currentTime = new Date();
    	var month=currentTime.getMonth()+1;
    	var year=currentTime.getFullYear();
    	var day=currentTime.getDate();
    	if (day<10){
            day='0'+day;
        }
    	if (month<10){
            month='0'+month;
        }
  
    	var totaldate=year+"-"+month+"-"+day
		console.log(totaldate);
    	//$scope.totaldate = totaldate;
    	$scope.totaldate = "2016-03-07";
    	
    }])
    // Factory maintains the state of the widget
    .factory('infosessionschedulingFactory', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

        var initialized = {
            value: false
        };

        // Your variable declarations
        var data = {
            value: null
        };

        var init = function($scope) {
            if (initialized.value)
                return;

            initialized.value = true;

            // Place your init code here:
            data.value = {
                message: "Welcome to Portal SDK!"
            };
        }


        // Expose init(), and variables
        return {
            init: init,
            data: data
        };

    }])
    // Custom directive example
    .directive('infosessionschedulingDirectiveName', ['$http', function($http) {
        return {
            link: function(scope, el, attrs) {

            }
        };
    }])
    // Custom filter example
    .filter('infosessionschedulingFilterName', function() {
        return function(input, arg1, arg2) {
            // Filter your output here by iterating over input elements
            var output = input;
            return output;
        }
    });