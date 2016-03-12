angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('infosessionschedulingCtrl', ['$scope', '$http', '$q', 'infosessionschedulingFactory', function($scope, $http, $q, infosessionschedulingFactory) {
    
    	var result = document.getElementsByClassName("widgetTitle");
    	result[0].className += " text-center";
        	console.log(result);


    
    	var findInfoSessions = function(){
                     var url = 'https://api.uwaterloo.ca/v2/terms/1163/infosessions.json?key=36802f2c7eab5943ece0bcf8eec07d5a';
        // http.get FUNCTION 
        $http.get(url).success(function(result) {
            // Handle result 
            $scope.infosessions = result.data;
            var infosessions = result.data;
            // console.log(result.data);
            // 
            $scope.portalHelpers.getApiData('student/meets?start=' + "2016-02-05" + '&end=' + "2016-02-06").then(function (result) {    		
	            var classes = result.data;
	            //console.log(infosessions);                
	            for(var i = 0; i < infosessions.length; i++){
	             if(infosessions[i].date != todaysdate){
	                 continue;
	             }                    
	                var currentInfoSession = infosessions[i];                    
	                for(var j = 0; j < classes.length; j++){
	                 var currentClass = classes[j];
                     //console.log(currentClass);
                     var nextClass = classes[j+1];
                        //BEFORE CASE
	                 if(j==0 && currentInfoSession.end_time < currentClass.startDate.substring(11)){
                        //console.log('before case');
                         var course = currentClass.subject_code + " " + currentClass.catalog;
                        currentInfoSession.beforeCase = course;
                         for(var k = 0; k < currentInfoSession.audience.length; k++){
                          	if(currentInfoSession.audience[k].contains(homeSettings.user.Faculty)){
                          	currentInfoSession.targeted = true;
                         	}
                         }                         
						$scope.validInfoSessions.push(currentInfoSession);
                        
	                 }               
                        //MIDDLE CASE                        
                     if(j!=classes.length-1 && currentInfoSession.start_time > currentClass.endDate.substring(11) &&
                       currentInfoSession.end_time <= nextClass.startDate.substring(11)){
                        //console.log('middle case');
                        //console.log(currentInfoSession.employer);
                        var course = currentClass.subject_code + " " + currentClass.catalog;
                        var nextCourse = nextClass.subject_code + " " + nextClass.catalog;                         
                        currentInfoSession.beforeCase = course;
                        currentInfoSession.afterCase = nextCourse;
                         for(var k = 0; k < currentInfoSession.audience.length; k++){
                          	if(currentInfoSession.audience[k].contains(homeSettings.user.Faculty)){
                          	currentInfoSession.targeted = true;
                         	}
                         }
                      	$scope.validInfoSessions.push(currentInfoSession);   
                        
                     }
                        
                     	//END CASE
                     if(j == classes.length-1 && currentInfoSession.start_time >= currentClass.startDate.substring(11)){
                      	//console.log('END CASE');
						var course = currentClass.subject_code + " " + currentClass.catalog;                         
                        currentInfoSession.afterCase = course;
                         for(var k = 0; k < currentInfoSession.audience.length; k++){
                             //console.log(currentInfoSession.audience[k]);
                             //console.log(homeSettings.user.Faculty);
                          	if(currentInfoSession.audience[k].contains(homeSettings.user.Faculty)){
                          	currentInfoSession.targeted = true;
                         	}
                         }
						//console.log(currentInfoSession);
                        $scope.validInfoSessions.push(currentInfoSession);                         
                     }
                         
                        
                       
                        
                        
	                }                                              
	            }
	    	});
        });
    
            
        }
        
        
    	$scope.nextItem = function(){
            //tomorrow
        }
        
        $scope.prevItem = function(){
            //yesterday
        }
    
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
    
    	console.log(homeSettings.user);	
    
     //Todays date
        var currentTime = new Date();
    	var month=currentTime.getMonth()+1;
    	var year=currentTime.getFullYear();
    	var day=currentTime.getDate();
    	var tomorrowsDay = day + 1;
    
    	if (day<10){
            day='0'+day;            
        }
    	if (month<10){
            month='0'+month;
        }
  
    	var todaysdate=year+"-"+month+"-"+day
        var tomorrowsdate = year + "-" + month + "-" + tomorrowsDay;
		//console.log(todaysdate);
    	//$scope.todaysdate = totaldate;
    	$scope.todaysdate = "2016-02-05";
    	var todaysdate = "2016-02-05";
    
    	$scope.validInfoSessions = [];
    
    	findInfoSessions();
   
    	    	
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